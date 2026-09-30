export type Language = "pl" | "en";

export type Theme = "light" | "dark";

export interface Subscription {
  id: string;
  userId: string;
  price: number;
  title: string;
  description: string | null;
  category: string;
  billingCycle: string;
  nextBillingDate: string;
  currency: string
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

