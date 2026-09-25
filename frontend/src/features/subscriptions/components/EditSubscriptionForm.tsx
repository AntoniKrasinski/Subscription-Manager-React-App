import React, { useState } from "react";
import { useUpdateSubscription } from "../api/updateSubscription";
import type { UpdateSubscriptionData } from "../../../types/api";
import ModalLayout from "../../../components/layouts/ModalLayout";
const EditSubscriptionForm = ({
  subscriptionId,
  setIsOpen,
}: {
  subscriptionId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [subscriptionEditData, setSubscriptionEditData] =
    useState<UpdateSubscriptionData>({});
  const editSubscriptionMutation = useUpdateSubscription();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSubscriptionEditData({ ...subscriptionEditData, [name]: value });
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    editSubscriptionMutation.mutate({
      data: subscriptionEditData,
      subscriptionId,
    });
  };

  return (
    <ModalLayout
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <button
        onClick={() => {
          setIsOpen(false);
        }}
      >
        X
      </button>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="price">Cena</label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={subscriptionEditData.price}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </ModalLayout>
  );
};

export default EditSubscriptionForm;
