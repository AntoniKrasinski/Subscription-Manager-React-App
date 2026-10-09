import type { Subscription } from "../types/db";
import axios from "axios";
import { db } from "../prisma/db";
import type { Char } from "@prisma/orm-postgres/target/codec-types";

const getExchangeRate = async (currency: string) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const cachedCurrency = await db.orm.public.CurrencyExchanges.where({
    currency,
    effectiveDate: today.toISOString(),
  }).first();
  if (cachedCurrency) {
    return cachedCurrency.rate;
  }
  const response = await axios.get(
    `https://api.nbp.pl/api/exchangerates/rates/c/${currency}/today/`,
  );
  let { bid: rate, effectiveDate } = response.data.rates[0];
  effectiveDate = new Date(effectiveDate);
  await db.orm.public.CurrencyExchanges.create({
    currency,
    effectiveDate,
    rate,
  });
  return rate;
};

export const currencyExchange = async <
  T extends { currency: string; price: number },
>(
  subscriptions: T[],
  userId: Char<36>,
): Promise<T[]> => {
  if (subscriptions.length === 0) {
    return [];
  }

  const preferences = await db.orm.public.UserPreferences.where({
    userId,
  }).first();

  const targetCurrency = preferences?.currency as string;

  const result = await Promise.all(
    subscriptions.map(async (subscription) => {
      if (subscription.currency === targetCurrency) {
        return subscription;
      }

      const subscriptionCurrencyToPln =
        subscription.price *
        (subscription.currency === "pln"
          ? 1
          : await getExchangeRate(subscription.currency));

      const plnToTargetCurrency =
        subscriptionCurrencyToPln *
        (targetCurrency === "pln"
          ? 1
          : 1 / (await getExchangeRate(targetCurrency)));

      return {
        ...subscription,
        price: plnToTargetCurrency,
        currency: targetCurrency,
      };
    }),
  );

  return result;
};
