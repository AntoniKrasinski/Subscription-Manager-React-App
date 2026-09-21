import React from "react";
import Button from "../../../components/UI/Button";
import EditSubscriptionForm from "./EditSubscriptionForm";
import { useState } from "react";
const EditSubscriptionButton = ({
  subscriptionId,
}: {
  subscriptionId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <EditSubscriptionForm
          setIsOpen={setIsOpen}
          subscriptionId={subscriptionId}
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
