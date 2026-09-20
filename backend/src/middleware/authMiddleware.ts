import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { db } from "../prisma/db.ts";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;

  if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token provided" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    const { id } = jwt.verify(token, secret!) as JwtPayload;

    const user = await db.orm.public.User.first({
      id,
    });
    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }

    req.user = user;
  } catch (error) {
    return res.status(401).json({ error: "Not authorized, token failed" });
  }

  next();
};
