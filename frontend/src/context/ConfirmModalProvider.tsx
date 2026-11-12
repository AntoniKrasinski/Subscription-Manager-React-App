import { useState, type ReactNode } from "react";
import ConfirmModal from "../components/UI/ConfirmModal";
import { ConfirmModalContext, type ConfirmAction } from "./confirmModalContext";

interface PendingConfirm {
  onConfirm: ConfirmAction;
  text: string;
}

const deafultText = "Are you sure you want to do this?";

export const ConfirmModalProvider = ({ children }: { children: ReactNode }) => {
  const [pending, setPending] = useState<PendingConfirm | null>(null);

  const confirmModal = (onConfirm: ConfirmAction, text = deafultText) =>
    setPending({ onConfirm, text });

  const closeModal = () => setPending(null);

  const handleConfirm = () => {
    closeModal();
    pending?.onConfirm();
  };

  return (
    <ConfirmModalContext.Provider value={{ confirmModal }}>
      {children}
      {pending && (
        <ConfirmModal
          onConfirm={handleConfirm}
          onCancel={closeModal}
          text={pending.text}
        />
      )}
    </ConfirmModalContext.Provider>
  );
};
