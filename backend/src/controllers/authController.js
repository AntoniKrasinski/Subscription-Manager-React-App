import { db } from "../prisma/db.ts";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/generateJWT.ts";
import { generateRT } from "../utils/generateRT.ts";

const clearCookies = (res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const isEmailTaken = await db.orm.public.User.where({ email: email }).first();
  if (isEmailTaken) {
    return res
      .status(400)
      .json({ error: "User with this email already exists." });
  }
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await db.orm.public.User.create({
    name,
    email,
    passwordHash,
  });

  generateJWT(user.id, res);
  await generateRT(user.id, res);
  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: name,
        email: email,
      },
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.orm.public.User.where({ email: email }).first();
  if (!user) {
    return res
      .status(401)
      .json({ error: "User with this email does not exists." });
  }
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  generateJWT(user.id, res);
  await generateRT(user.id, res);

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: email,
      },
    },
  });
};

export const logout = async (req, res) => {
  clearCookies(res);
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export const refresh = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  const tokens = await db.orm.public.RefreshToken.where({
    revokedAt: null,
  }).all();

  let tokenRecord = null;

  for (const token of tokens) {
    const isTokenValid = await bcrypt.compare(refreshToken, token.tokenHash);
    if (isTokenValid) {
      tokenRecord = token;
      break;
    }
  }

  if (!refreshToken || !tokenRecord) {
    clearCookies(res);
    return res.status(400).json({ error: "Session expired." });
  }

  const isRevoked = tokenRecord.revokedAt !== null;
  const isExpired = new Date(tokenRecord.expiresAt) <= new Date();
  const validToken = tokenRecord?.tokenHash;

  if (!validToken || isRevoked || isExpired) {
    clearCookies(res);
    return res.status(400).json({ error: "Session expired." });
  }

  const userId = tokenRecord.userId;

  generateJWT(userId, res);
  await generateRT(userId, res);
  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: userId,
      },
    },
  });
};

export const me = async (req, res) => {
  const { user } = req;

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });
};
