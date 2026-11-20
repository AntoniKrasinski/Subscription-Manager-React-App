import type { Subscription } from "../types/db";
import axios from "axios";
import { db } from "../prisma/db";
import type { Char } from "@prisma/orm-postgres/target/codec-types";

interface NbpExchangeRateResponse {
  table: "A" | "B" | "C";
  currency: string;
  code: string;
  rates: NbpExchangeRate[];
}

interface NbpExchangeRate {
  no: string;
  effectiveDate: string;
  mid: number;
}

const getExchangeRate = async (currency: string) => {
  // Store currency data to reduce dependency on third-party APIs.
  const cachedCurrency = await db.orm.public.CurrencyExchanges.where({
    currency,
  })
    .orderBy((p) => p.effectiveDate.desc())
    .first();

  const response = await axios.get<NbpExchangeRateResponse>(
    `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/`,
  );

  const { mid: rate, effectiveDate } = response.data.rates[0];

  if (effectiveDate !== cachedCurrency?.effectiveDate) {
    await db.orm.public.CurrencyExchanges.create({
      currency,
      effectiveDate,
      rate,
    });
  } else if (cachedCurrency) {
    return cachedCurrency.rate;
  }

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
