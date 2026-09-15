import { db } from "../prisma/db.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const isEmailTaken = await db.;
  console.log(`Hello, ${name} ${email}! Your password is save: ${password}`);
  res.send(`Hello, ${name} ${email}! Your password is save: ${password}`);
};
export const login = async (req, res) => {};
