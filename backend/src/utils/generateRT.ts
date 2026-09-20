import bcrypt from "bcryptjs";
import { db } from "../prisma/db.ts";
import type { Response } from "express";

export const generateRT = async (userId: string, res: Response) => {
  const token = crypto.randomUUID();
  const salt = await bcrypt.genSalt(10);
  const tokenHash = await bcrypt.hash(token, salt);
  const expiresAt = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000,
  ).toISOString();

  await db.orm.public.RefreshToken.where({ userId: userId as any }).updateAll({
    revokedAt: new Date(Date.now()).toISOString(),
  });

  await db.orm.public.RefreshToken.create({
    userId: userId as any,
    tokenHash,
    expiresAt,
  });
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
