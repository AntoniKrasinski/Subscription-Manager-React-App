import { useContext } from "react";
import { ConfirmModalContext } from "../context/confirmModalContext";

export const useConfirmModal = () => {
  const context = useContext(ConfirmModalContext);

  if (!context) {
    throw new Error("useConfirmModal must be used within ConfirmModalProvider");
  }

  return context;
};
