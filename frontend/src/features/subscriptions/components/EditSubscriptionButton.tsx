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
      <button
        className="min-h-10 flex-1 cursor-pointer rounded-xl border-0 bg-primary-soft px-3 py-2 text-sm text-primary md:min-h-9 md:flex-none md:px-4 md:text-base"
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
