import type { Response, Request } from "express";
import { db } from "../prisma/db";
export const setPreferences = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { currency, language, monthlyBudget, reminders } = req.body;
  await db.orm.public.UserPreferences.where({ userId }).update({
    currency,
    language,
    monthlyBudget,
    reminders,
  });
};

export const getPreferences = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const preferences = await db.orm.public.UserPreferences.where({
    userId,
  }).first();
  if (!preferences) {
    res.status(404).json({ error: "User preferences not found." });
  }
  res.status(200).json({ status: "success", data: preferences });
};

export const editPreferences = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const { currency } = req.body;
  await db.orm.public.UserPreferences.where({ userId }).update({ currency });
  res
    .status(200)
    .json({ status: "success", message: "Subscription successfully updated." });
};
