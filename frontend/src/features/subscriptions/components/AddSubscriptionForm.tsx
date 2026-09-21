import React, { useState } from "react";
import type { Subscription } from "../../../types/api";
import { useAddSubscription } from "../api/addSubscription";
const AddSubscriptionForm = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const addSubscriptionMutation = useAddSubscription();
  const [subscriptionData, setSubscriptionData] = useState<Subscription>({
    price: 0,
    title: "",
    billingCycle: "monthly",
    category: "",
    currency: "pln",
    isFreeTrial: false,
    freeTrialEnd: null,
    nextBillingDate: null,
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

    addSubscriptionMutation.mutate(subscriptionData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="border bg-black">
        <h2>Dodaj subskrypcję</h2>
        <button onClick={() => setIsOpen(false)}>X</button>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Nazwa subskrypcji</label>
            <input
              id="title"
              name="title"
              type="text"
              value={subscriptionData.title}
              onChange={handleChange}
              placeholder="np. Netflix"
              required
            />
          </div>

          <div>
            <label htmlFor="price">Cena</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={subscriptionData.price}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label htmlFor="currency">Waluta</label>
            <select
              id="currency"
              name="currency"
              value={subscriptionData.currency}
              onChange={handleChange}
            >
              <option value="pln">PLN</option>
              <option value="usd">USD</option>
            </select>
          </div>

          <div>
            <label htmlFor="billingCycle">Cykl rozliczeniowy</label>
            <select
              id="billingCycle"
              name="billingCycle"
              value={subscriptionData.billingCycle}
              onChange={handleChange}
            >
              <option value="weekly">Tygodniowo</option>
              <option value="monthly">Miesięcznie</option>
              <option value="yearly">Rocznie</option>
            </select>
          </div>

          <div>
            <label htmlFor="category">Kategoria</label>
            <input
              id="category"
              name="category"
              type="text"
              value={subscriptionData.category}
              onChange={handleChange}
              placeholder="np. Rozrywka"
              required
            />
          </div>

          <div>
            <label htmlFor="isFreeTrial">Free Trial</label>
            <input
              id="isFreeTrial"
              name="isFreeTrial"
              type="checkbox"
              checked={subscriptionData.isFreeTrial}
              onChange={handleChange}
            />
          </div>
          {subscriptionData.isFreeTrial ? (
            <div>
              <label htmlFor="freeTrialEnd">Koniec okresu próbnego</label>
              <input
                id="freeTrialEnd"
                name="freeTrialEnd"
                type="date"
                value={subscriptionData.freeTrialEnd ?? ""}
                onChange={handleChange}
                required
              />
            </div>
          ) : (
            <div>
              <label htmlFor="nextBillingDate">Następna płatność</label>
              <input
                id="nextBillingDate"
                name="nextBillingDate"
                type="date"
                value={subscriptionData.nextBillingDate ?? ""}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" disabled={addSubscriptionMutation.isPending}>
            {addSubscriptionMutation.isPending
              ? "Dodawanie..."
              : "Dodaj subskrypcję"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubscriptionForm;
