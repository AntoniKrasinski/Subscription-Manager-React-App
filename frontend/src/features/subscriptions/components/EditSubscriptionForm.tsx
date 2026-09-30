import React, { useState } from "react";
import type { Subscription, UpdateSubscription } from "../../../types/api";
import { useUpdateSubscription } from "../api/updateSubscription";
import ModalLayout from "../../../components/layouts/ModalLayout";

const EditSubscriptionForm = ({
  subscription,
  setIsOpen,
}: {
  subscription: Subscription;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const editSubscriptionMutation = useUpdateSubscription();

  const [subscriptionData, setSubscriptionData] = useState<UpdateSubscription>({
    price: subscription.price,
    title: subscription.title,
    billingCycle: subscription.billingCycle,
    category: subscription.category,
    currency: subscription.currency,
    isFreeTrial: subscription.isFreeTrial,
    nextBillingDate: subscription.nextBillingDate?.slice(0, 10),
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    const newValue =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : name === "price"
          ? Number(value)
          : value;

    setSubscriptionData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    editSubscriptionMutation.mutate({
      subscriptionId: subscription.id,
      data: subscriptionData,
    });
  };

  return (
    <ModalLayout onClick={() => setIsOpen(false)}>
      <div className="flex justify-between">
        <h2>Edytuj subskrypcję</h2>

        <button type="button" onClick={() => setIsOpen(false)}>
          X
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="formField">
          <label htmlFor="title">Nazwa subskrypcji</label>

          <input
            id="title"
            name="title"
            type="text"
            value={subscriptionData.title ?? ""}
            onChange={handleChange}
            placeholder="np. Netflix"
            required
          />
        </div>

        <div className="formField">
          <label htmlFor="price">Cena</label>

          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={subscriptionData.price ?? 0}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
        </div>

        <div className="formField">
          <label htmlFor="currency">Waluta</label>

          <select
            id="currency"
            name="currency"
            value={subscriptionData.currency ?? "pln"}
            onChange={handleChange}
          >
            <option value="pln">PLN</option>
            <option value="usd">USD</option>
          </select>
        </div>

        <div className="formField">
          <label htmlFor="billingCycle">Cykl rozliczeniowy</label>

          <select
            id="billingCycle"
            name="billingCycle"
            value={subscriptionData.billingCycle ?? "monthly"}
            onChange={handleChange}
          >
            <option value="weekly">Tygodniowo</option>
            <option value="monthly">Miesięcznie</option>
            <option value="yearly">Rocznie</option>
          </select>
        </div>

        <div className="formField">
          <label htmlFor="category">Kategoria</label>

          <input
            id="category"
            name="category"
            type="text"
            value={subscriptionData.category ?? ""}
            onChange={handleChange}
            placeholder="np. Rozrywka"
            required
          />
        </div>

        <div className="formFieldChckbox">
          <label htmlFor="isFreeTrial">Free Trial</label>

          <input
            id="isFreeTrial"
            name="isFreeTrial"
            type="checkbox"
            checked={subscriptionData.isFreeTrial ?? false}
            onChange={handleChange}
          />
        </div>

        <div className="formField">
          <label htmlFor="nextBillingDate">
            {subscriptionData.isFreeTrial
              ? "Koniec darmowego okresu"
              : "Następna płatność"}
          </label>

          <input
            id="nextBillingDate"
            name="nextBillingDate"
            type="date"
            value={subscriptionData.nextBillingDate ?? ""}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={editSubscriptionMutation.isPending}>
          {editSubscriptionMutation.isPending
            ? "Zapisywanie..."
            : "Zapisz zmiany"}
        </button>
      </form>
    </ModalLayout>
  );
};

export default EditSubscriptionForm;
