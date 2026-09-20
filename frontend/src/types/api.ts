// This file will be updated as the backend develops.
// Since the backend is still a prototype, these types will use `any` for now.

export interface User {
  id: string;
  name?: string;
  email: string;
}
export interface AuthResponse {
  user: User;
}

type BillingCycle = "weekly" | "monthly" | "yearly";
type Curency = "pln" | "usd";

export interface Subscription {
  userId: string;
  price: number;
  title: string;
  description?: string;
  billingCycle: BillingCycle;
  category: string;
  currency: Curency;
}