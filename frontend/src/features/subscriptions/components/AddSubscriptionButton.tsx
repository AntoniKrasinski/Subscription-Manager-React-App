import AddSubscriptionForm from "./AddSubscriptionForm";
import { useState } from "react";
const AddSubscriptionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && <AddSubscriptionForm setIsOpen={setIsOpen} />}
      <button
        className="bigButton"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add Subscription
      </button>
    </>
  );
};

export default AddSubscriptionButton;
