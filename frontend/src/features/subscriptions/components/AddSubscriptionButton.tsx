import AddSubscriptionForm from "./AddSubscriptionForm";
import { useState } from "react";
const AddSubscriptionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && <AddSubscriptionForm setIsOpen={setIsOpen} />}
      <button
        className="font-semibold cursor-pointer  rounded-xl border-0 bg-primary px-5 py-3 text-white"
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
