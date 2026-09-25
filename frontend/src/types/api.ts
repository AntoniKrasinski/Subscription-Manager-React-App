export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
}

type BillingCycle = "weekly" | "monthly" | "yearly";
type Currency = "pln" | "usd";

export interface Subscription {
  id: string;
  price: number;
  title: string;
  billingCycle: BillingCycle;
  category: string;
  currency: Currency;
  isFreeTrial: boolean;
  freeTrialEnd: string | null;
  nextBillingDate: string | null;
  autopayment: boolean;
}

export interface CreateSubscription {
  price: number;
  title: string;
  billingCycle: BillingCycle;
  category: string;
  currency: Currency;
  isFreeTrial?: boolean;
  freeTrialEnd?: string | null;
  nextBillingDate?: string | null;
  autopayment?: boolean;
}

export interface UpdateSubscription {
  price?: number;
  title?: string;
  billingCycle?: BillingCycle;
  category?: string;
  currency?: Currency;
  isFreeTrial?: boolean;
  freeTrialEnd?: string | null;
  nextBillingDate?: string | null;
  autopayment?: boolean;
}
