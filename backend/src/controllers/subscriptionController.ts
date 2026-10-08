import { db } from "../prisma/db.ts";
import { type Request, type Response } from "express";
import { Char } from "@prisma/orm-postgres/target/codec-types";
import axios from "axios";

interface SubscriptionParams {
  id: Char<36>;
}
interface LogoParmas {
  name: string;
}

export const addSubscription = async (req: Request, res: Response) => {
  const {
    price,
    showImage,
    title,
    description,
    billingCycle,
    category,
    currency,
    isFreeTrial,

    nextBillingDate,
  } = req.body;
  const { user } = req;
  await db.orm.public.Subscription.create({
    userId: user.id,
    showImage,
    price,
    title,
    description,
    billingCycle,
    category,
    currency,
    isFreeTrial,
    nextBillingDate,
  });
  res.status(201).json({
    status: "success",
    data: {
      subscription: {
        userId: user.id,
        price,
        title,
        description,
        billingCycle,
        category,
        currency,
        isFreeTrial,
        nextBillingDate,
      },
    },
  });
};

export const getAllSubscriptions = async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  const userSubscriptions = await db.orm.public.Subscription.where({
    userId,
  }).all();

  res.status(200).json({ status: "success", data: { userSubscriptions } });
};

export const getSubscription = async (
  req: Request<SubscriptionParams>,
  res: Response,
) => {};

export const deleteSubscription = async (
  req: Request<SubscriptionParams>,
  res: Response,
) => {
  const subscription = await db.orm.public.Subscription.where({
    id: req.params.id,
  }).first();

  if (!subscription) {
    return res.status(404).json({ error: "Subscription not found." });
  }

  if (subscription.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this subscription" });
  }

  await db.orm.public.Subscription.where({
    id: req.params.id,
  }).delete();

  res
    .status(200)
    .json({ status: "success", message: "Subscription successfully  removed" });
};

export const editSubscription = async (
  req: Request<SubscriptionParams>,
  res: Response,
) => {
  const subscription = await db.orm.public.Subscription.where({
    id: req.params.id,
  }).first();

  if (!subscription) {
    return res.status(404).json({ error: "Subscription not found." });
  }

  if (subscription.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this subscription" });
  }

  const {
    title,
    showImage,
    price,
    description,
    billingCycle,
    category,
    currency,
    isActive,
    isFreeTrial,
    nextBillingDate,
  } = req.body;

  await db.orm.public.Subscription.where({
    id: req.params.id,
  }).update({
    title,
    showImage,
    price,
    description,
    billingCycle,
    category,
    currency,
    isActive,
    isFreeTrial,
    nextBillingDate,
  });
  res
    .status(200)
    .json({ status: "success", message: "Subscription successfully updated." });
};

export const getLogo = async (req: Request<LogoParmas>, res: Response) => {
  const imageUrl = `https://img.logo.dev/name/${encodeURIComponent(req.params.name)}?token=${process.env.LOGO_DEV_TOKEN}&size=96&format=webp&theme=dark&retina=true`;
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    res.set("Content-Type", "image/webp");
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch logo." });
  }
};
