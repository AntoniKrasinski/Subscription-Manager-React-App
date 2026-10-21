import React from "react";
import EditSubscriptionForm from "./EditSubscriptionForm";
import { useState } from "react";
import type { Subscription } from "../../../types/api";
const EditSubscriptionButton = ({
  subscription,
}: {
  subscription: Subscription;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <EditSubscriptionForm
          setIsOpen={setIsOpen}
          subscription={subscription}
        />
      )}
      <button className="min-h-9 cursor-pointer rounded-xl border-0 bg-primary-soft px-4 py-2 text-primary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Edit
      </button>
    </>
  );
};

export default EditSubscriptionButton;
