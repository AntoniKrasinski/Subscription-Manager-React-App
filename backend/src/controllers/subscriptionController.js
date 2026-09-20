import { db } from "../prisma/db.ts";

export const addSubscription = async (req, res) => {
  const { userId, price, title, description, billingCycle, category, currency } =
    req.body;
  await db.orm.public.Subscription.create({
    userId,
    price,
    title,
    description,
    billingCycle,
    category,
    currency,
  });
  res.status(201).json({
    status: "success",
    data: {
      subscription: {
        userId,
        price,
        title,
        description,
        billingCycle,
        category,
        currency
      },
    },
  });
};
