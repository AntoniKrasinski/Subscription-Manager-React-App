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
// type SubscriptionCategory =
//   | "streaming"
//   | "music"
//   | "gaming"
//   | "software"
//   | "cloud_storage"
//   | "news"
//   | "education"
//   | "fitness"
//   | "finance"
//   | "shopping"
//   | "productivity"
//   | "food"
//   | "transport"
//   | "communication"
//   | "other";

export interface Subscription {
  id: string;
  price: number;
  title: string;
  billingCycle: BillingCycle;
  category: string;
  currency: Currency;
  isFreeTrial: boolean;
  nextBillingDate: string;
  autopayment: boolean;
}

export interface CreateSubscription {
  price: number;
  title: string;
  billingCycle: BillingCycle;
  category: string;
  currency: Currency;
  isFreeTrial?: boolean;
  nextBillingDate: string | null;
  autopayment?: boolean;
}

export interface UpdateSubscription {
  price?: number;
  title?: string;
  billingCycle?: BillingCycle;
  category?: string;
  currency?: Currency;
  isFreeTrial?: boolean;
  nextBillingDate?: string | null;
  autopayment?: boolean;
}

export interface UserPreferences {
  s: string;
}

export interface SubscriptionsStats {
  activeSubscriptionsCount: string;
  thisMonthSpending: string;
  yearlySpending: string;
}
