import { connectDB, closeDB } from "../../database/connection.js";
import User from "../../database/models/User.js";

const [, , name, email, password] = process.argv;

async function main() {
  if (!name || !email || !password) {
    console.error(
      'Usage: node createAdmin.js "Full Name" you@example.com "yourPassword"'
    );
    process.exit(1);
  }

  if (password.length < 6) {
    console.error("Password must be at least 6 characters.");
    process.exit(1);
  }

  await connectDB();

  const normalizedEmail = email.trim().toLowerCase();
  let user = await User.findOne({ email: normalizedEmail });

  if (user) {
    user.role = "admin";
    await user.save();
    console.log(`Existing user promoted to admin: ${user.name} <${user.email}>`);
  } else {
    user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role: "admin",
      karmaPoints: 0,
    });
    console.log(`Admin account created: ${user.name} <${user.email}>`);
  }

  await closeDB();
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed to create/promote admin:", err.message);
  process.exit(1);
});
