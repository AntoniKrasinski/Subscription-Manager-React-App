import React from "react";
import Button from "../../../components/UI/Button";
import AddSubscriptionForm from "./AddSubscriptionForm";
import { useState } from "react";
const AddSubscriptionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && <AddSubscriptionForm setIsOpen={setIsOpen} />}
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add Subscription
      </Button>
    </>
  );
};

export default AddSubscriptionButton;
