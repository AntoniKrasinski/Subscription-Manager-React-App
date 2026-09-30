import "express";
import { Char } from "@prisma/orm-postgres/target/codec-types";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: Char<36>;
        name: string;
        email: string;
      };
    }
  }
}

export {};
