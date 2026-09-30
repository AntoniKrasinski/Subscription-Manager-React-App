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
    (e) => e.isActive === true && e.isFreeTrial === false,
  );
  const activeSubscriptionsCount = activeSubscriptions.length;

  const subscriptionsWithUserCurrency =
    await currencyExchange(activeSubscriptions);

  const thisMonthSpending = subscriptionsWithUserCurrency.reduce(
    (total, subscription) => {
      const billingDate = new Date(subscription.nextBillingDate as string);

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

  res.status(200).json({
    status: "success",
    data: {
      activeSubscriptionsCount,
      thisMonthSpending: thisMonthSpending.toFixed(2),
      yearlySpending: yearlySpending.toFixed(2),
    },
  });
};
