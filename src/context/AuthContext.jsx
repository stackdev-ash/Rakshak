import { createContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  updateProfile as updateProfileApi,
} from "../services/authService";
import { getStoredItem, setStoredItem } from "../utils/helpers";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check logged-in user when app starts
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = getStoredItem("rakshak_user", null);
      if (!storedUser?.token) { setLoading(false); return; }
      try {
        const data = await getCurrentUser();
        const freshUser = { ...data.user, token: storedUser.token };
        setStoredItem("rakshak_user", freshUser);
        setUser(freshUser);
      } catch {
        localStorage.removeItem("rakshak_user");
        setUser(null);
      } finally { setLoading(false); }
    };
    loadUser();
  }, []);

  // Login — requires a real response (and real signed token) from the backend.
  // Errors are surfaced to the caller (e.g. the Login page) so the UI can show
  // "invalid credentials" / "server unreachable" instead of silently faking a
  // session with a made-up token the backend would no longer accept.
  const login = async (loginData) => {
    const data = await loginUser(loginData);

    if (!data?.token) {
      throw new Error("Login response did not include an auth token");
    }

    const userPayload = data.user || data;
    const finalUser = { ...userPayload, token: data.token };

    setStoredItem("rakshak_user", finalUser);
    setUser(finalUser);
    return finalUser;
  };

  // Register — same principle: no fabricated local-only accounts.
  const register = async (userData) => {
    const data = await registerUser(userData);

    if (data?.token) {
      const userPayload = data.user || data;
      const finalUser = { ...userPayload, token: data.token };
      setStoredItem("rakshak_user", finalUser);
      setUser(finalUser);
    }

    return data;
  };

  // Update user profile in state & localStorage only (used for lightweight,
  // non-sensitive edits that don't need a round trip — see saveMediaConsent
  // below for fields that must be persisted server-side).
  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      setStoredItem("rakshak_user", updated);
      return updated;
    });
  };

  // Persist media/press consent preferences to the backend, then sync local
  // state. Consent is meaningful only if it's actually saved — never just
  // stored client-side and forgotten.
  const saveMediaConsent = async (mediaConsent) => {
    const data = await updateProfileApi({ mediaConsent });
    const updatedUser = { ...user, ...data.user, token: user?.token };
    setStoredItem("rakshak_user", updatedUser);
    setUser(updatedUser);
    return updatedUser;
  };

  // Logout
  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // Ignore API logout failures in offline mode
    }

    localStorage.removeItem("rakshak_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        updateUser,
        saveMediaConsent,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
