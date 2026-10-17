import jwt from "jsonwebtoken";
import ENV from "../config/env.js";

export const generateToken = (id, role = "donor") => {
  return jwt.sign({ id, role }, ENV.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
