import type { Request, Response } from "express";
import { db } from "../prisma/db.ts";
import { currencyExchange } from "../utils/currencyExchange.ts";

export const getSubscriptionsStats = async (req: Request, res: Response) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const { user } = req;

  const userSubscriptions = await db.orm.public.Subscription.where({
    userId: user.id,
  }).all();

  let activeSubscriptions = userSubscriptions.filter(
    (e) => e.isActive && !e.isFreeTrial,
  );

  const subscriptionsWithUserCurrency = await currencyExchange(
    activeSubscriptions,
    user.id,
  );

  let thisMonthSpending = subscriptionsWithUserCurrency.reduce(
    (total, subscription) => {
      const billingDate = new Date(subscription.nextBillingDate);

      if (subscription.billingCycle === "weekly") {
        while (
          billingDate.getFullYear() < currentYear ||
          (billingDate.getFullYear() === currentYear &&
            billingDate.getMonth() < currentMonth)
        ) {
          billingDate.setDate(billingDate.getDate() + 7);
        }

        while (
          billingDate.getFullYear() === currentYear &&
          billingDate.getMonth() === currentMonth
        ) {
          total += subscription.price;
          billingDate.setDate(billingDate.getDate() + 7);
        }
      }

      if (
        subscription.billingCycle === "monthly" ||
        subscription.billingCycle === "yearly"
      ) {
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

  const now = new Date();
  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  ).toISOString();

  const startOfNextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1,
  ).toISOString();

  const paidInThisMounth = await db.orm.public.SubscriptionsHistory.include(
    "subscription",
    (s) => s.where({ userId: user.id }),
  )
    .where(
      (h) =>
        h.billingDate.gte(startOfMonth) && h.billingDate.lt(startOfNextMonth),
    )
    .all();
  const paidInThisMounthWithUserCurrency = await currencyExchange(
    paidInThisMounth,
    user.id,
  );
thisMonthSpending = paidInThisMounthWithUserCurrency.reduce(
  (total, paid) => total + paid.price,
  thisMonthSpending,
);

  const yearlySpending = subscriptionsWithUserCurrency.reduce(
    (total, subscription) => {
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
    },
    0,
  );

  const activeSubscriptionsCount = activeSubscriptions.length;

  res.status(200).json({
    status: "success",
    data: {
      activeSubscriptionsCount,
      thisMonthSpending: thisMonthSpending.toFixed(2),
      yearlySpending: yearlySpending.toFixed(2),
    },
  });
};
