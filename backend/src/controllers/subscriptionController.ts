import e from "express";
import { db } from "../prisma/db.ts";
import { subscribe } from "node:diagnostics_channel";
import type { Request, Response } from "express";
import { Char } from "@prisma/orm-postgres/target/codec-types";

interface SubscriptionParams {
  id: Char<36>;
}

export const addSubscription = async (req: Request, res: Response) => {
  const {
    price,
    title,
    description,
    billingCycle,
    category,
    currency,
    isFreeTrial,
    freeTrialEnd,
    nextBillingDate,
  } = req.body;
  const { user } = req;
  await db.orm.public.Subscription.create({
    userId: user.id,
    price,
    title,
    description,
    billingCycle,
    category,
    currency,
    isFreeTrial,
    freeTrialEnd,
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
        freeTrialEnd,
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
    price,
    description,
    billingCycle,
    category,
    currency,
    isActive,
    isFreeTrial,
    freeTrialEnd,
    nextBillingDate,
  } = req.body;

  await db.orm.public.Subscription.where({
    id: req.params.id,
  }).update({
    title,
    price,
    description,
    billingCycle,
    category,
    currency,
    isActive,
    isFreeTrial,
    freeTrialEnd,
    nextBillingDate,
  });
  res
    .status(200)
    .json({ status: "success", message: "Subscription successfully updated." });
};

export const getSubscriptionsStats = async (req: Request, res: Response) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const { user } = req;
  const userSubscriptions = await db.orm.public.Subscription.where({
    userId: user.id,
  }).all();
  const activeSubscriptions = userSubscriptions.filter(
    (e) => e.isActive === true,
  );
  const activeSubscriptionsCount = activeSubscriptions.length;
  const thisMonthSpending = activeSubscriptions.reduce(
    (total, subscription) => {
      const billingDate = new Date(subscription.nextBillingDate as string);

      if (subscription.billingCycle === "weekly") {
        while (
          billingDate.getMonth() === currentMonth &&
          billingDate.getFullYear() === currentYear
        ) {
          total += subscription.price;

          billingDate.setDate(billingDate.getDate() + 7);
        }
      } else if (subscription.billingCycle === "monthly") {
        if (
          billingDate.getMonth() === currentMonth &&
          billingDate.getFullYear() === currentYear
        ) {
          total += subscription.price;
        }
      } else if (subscription.billingCycle === "yearly") {
        if (
          billingDate.getMonth() === currentMonth &&
          billingDate.getFullYear() === currentYear
        ) {
          total += subscription.price;
        }
      }

      return total;
    },
    0,
  );

  const yearlySpending = activeSubscriptions.reduce((total, subscription) => {
    switch (subscription.billingCycle) {
      case "weekly":
        return total + subscription.price * 52;

      case "monthly":
        return total + subscription.price * 12;

      case "yearly":
        return total + subscription.price;

      default:
        return total;
    }
  }, 0);

  res.status(200).json({
    status: "success",
    data: {
      activeSubscriptionsCount,
      thisMonthSpending: thisMonthSpending.toFixed(2),
      yearlySpending: yearlySpending.toFixed(2),
    },
  });
};
