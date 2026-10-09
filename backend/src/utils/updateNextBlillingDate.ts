import { db } from "../prisma/db";
import { Char } from "@prisma/orm-postgres/target/codec-types";

const getNextBillingDate = (billingDate: string, billingCycle: string) => {
  const nextBilling = new Date(billingDate);

  switch (billingCycle) {
    case "weekly":
      nextBilling.setDate(nextBilling.getDate() + 7);
      break;

    case "monthly":
      nextBilling.setMonth(nextBilling.getMonth() + 1);
      break;

    case "yearly":
      nextBilling.setFullYear(nextBilling.getFullYear() + 1);
      break;
  }
  return nextBilling.toISOString();
};

export const updateBillings = async () => {
  const today = new Date().toISOString();

  const outDateBillings = await db.orm.public.Subscription.where((s) =>
    s.nextBillingDate.lte(today),
  ).all();

  await db.transaction(async (tx) => {
    try {
      for (const subscription of outDateBillings) {
        await tx.orm.public.SubscriptionsHistory.create({
          billingDate: subscription.nextBillingDate,
          currency: subscription.currency,
          price: subscription.price,
          subscriptionId: subscription.id as Char<36>,
        });

        await tx.orm.public.Subscription.where({
          id: subscription.id as Char<36>,
        }).update({
          nextBillingDate: getNextBillingDate(
            subscription.nextBillingDate,
            subscription.billingCycle,
          ),
        });
      }
    } catch (error) {
      console.log("Error on updating next billing date of subscription.");
    }
  });
};
