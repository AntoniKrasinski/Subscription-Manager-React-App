// npx prisma@latest contract emit -> Updates files, npx prisma@latest db update -> Updates db by emitted files (This step will delete current data from db)
import {
  defineContract,
  enumType,
  member,
} from "@prisma/orm-postgres/contract-builder";

const Language = enumType(
  "Language",
  {
    codecId: "pg/text@1",
    nativeType: "text",
  } as const,
  member("PL", "pl"),
  member("EN", "en"),
);

const Currency = enumType(
  "Currency",
  {
    codecId: "pg/text@1",
    nativeType: "text",
  } as const,
  member("PLN", "pln"),
  member("USD", "usd"),
);

const Theme = enumType(
  "Theme",
  {
    codecId: "pg/text@1",
    nativeType: "text",
  } as const,
  member("LIGHT", "light"),
  member("DARK", "dark"),
);

export const contract = defineContract({}, ({ field, model, rel }) => {
  const User = model("User", {
    fields: {
      id: field.id.uuidv7String(),
      name: field.text(),
      email: field.text().unique(),
      passwordHash: field.text(),
      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  const Subscription = model("Subscription", {
    fields: {
      id: field.id.uuidv7String(),
      title: field.text(),
      description: field.text().optional(),
      category: field.text(),
      userId: field.uuidString(),
      price: field.float(),
      curency: field.namedType(Currency),
      billingCycle: field.text(),
      isActive: field.boolean(),
      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  const UserPreferences = model("UserPreferences", {
    fields: {
      id: field.id.uuidv7String(),
      userId: field.uuidString(),
      language: field.namedType(Language).default(Language.members.EN),
      curency: field.namedType(Currency),
      reminders: field.boolean(),
      timezone: field.text(),
      monthlyBudget: field.float().optional(),
      theme: field.namedType(Theme).default(Theme.members.LIGHT),
      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  const RefreshToken = model("RefreshToken", {
    fields: {
      id: field.id.uuidv7String(),
      userId: field.uuidString(),
      tokenHash: field.text().unique(),
      expiresAt: field.temporal.timestamp(),
      revokedAt: field.temporal.timestamp().optional(),
      createdAt: field.temporal.createdAtString(),
      updatedAt: field.temporal.updatedAtString(),
    },
  });

  return {
    enums: {
      Language,
      Currency,
      Theme,
    },

    models: {
      User: User.relations({
        subscriptions: rel.hasMany(Subscription, {
          by: "userId",
        }),

        refreshTokens: rel.hasMany(RefreshToken, {
          by: "userId",
        }),

        preferences: rel.hasOne(UserPreferences, {
          by: "userId",
        }),
      }),

      Subscription: Subscription.relations({
        user: rel.belongsTo(User, {
          from: "userId",
          to: "id",
        }),
      }),

      UserPreferences: UserPreferences.relations({
        user: rel.belongsTo(User, {
          from: "userId",
          to: "id",
        }),
      }),

      RefreshToken: RefreshToken.relations({
        user: rel.belongsTo(User, {
          from: "userId",
          to: "id",
        }),
      }),
    },
  };
});
