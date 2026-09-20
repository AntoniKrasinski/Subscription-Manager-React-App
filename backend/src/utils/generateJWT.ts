import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { Response } from "express";

export const generateJWT = (userId: { id: string }, res: Response) => {
  const payload: JwtPayload = { id: userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000 ,
  });
  return token;
};
