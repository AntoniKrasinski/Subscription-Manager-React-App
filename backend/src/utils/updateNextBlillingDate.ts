import { db } from "../prisma/db";
import { Char } from "@prisma/orm-postgres/target/codec-types";
import { Subscription } from "../types/db";

export const updateBillings = async () => {
  const today = new Date().toISOString();

  const outDateBillings: Subscription[] =
    await db.orm.public.Subscription.where((s) =>
      s.nextBillingDate.lte(today),
    ).all();

  try {
    for (const subscription of outDateBillings) {
      const nextBilling = new Date(subscription.nextBillingDate);

      switch (subscription.billingCycle) {
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

      await db.orm.public.Subscription.where({
        id: subscription.id as Char<36>,
      }).update({
        nextBillingDate: nextBilling.toISOString(),
      });
    }
  } catch (error) {
    console.log("Error on updating next billing date of subscription.");
  }
};
