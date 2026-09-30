import React from "react";
import Button from "../../../components/UI/Button";
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
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Edit
      </Button>
    </>
  );
};

export default EditSubscriptionButton;
