import { db } from "../prisma/db.ts";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/generateJWT.ts";
import { generateRT } from "../utils/generateRT.ts";

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
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export const refresh = async (req, res) => {
  const { user } = req.body;
  const refreshToken = req.cookies.refreshToken;

  const tokenRecord = await db.orm.public.RefreshToken.where({
    userId: user.id,
  }).first();

  if (!refreshToken || !tokenRecord) {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.cookie("refreshToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res.status(400).json({ error: "Session expired." });
  }

  const isRevoked = tokenRecord.revokedAt !== null;
  const isExpired = new Date(tokenRecord.expiresAt) <= new Date();
  const validToken = tokenRecord?.tokenHash;

  if (!validToken || isRevoked || isExpired) {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.cookie("refreshToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res.status(400).json({ error: "Session expired." });
  }

  const isTokenValid = await bcrypt.compare(refreshToken, validToken);
  if (isTokenValid) {
    generateJWT(user.id, res);
    await generateRT(user.id, res);
    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
      },
    });
  }
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
