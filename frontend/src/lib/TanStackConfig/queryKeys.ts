export const queryKeys = {
  user: ["user"] as const,
  subscriptions: ["subscriptions"] as const,
  subscriptionsStats: ["subscriptions", "stats"] as const,
  subscriptionsCategoriesStats: [
    "subscriptions",
    "stats",
    "categories",
  ] as const,
  statistics: ["statistics"] as const,
  preferences: ["preferences"] as const,
};
