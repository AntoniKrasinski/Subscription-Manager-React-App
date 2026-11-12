import { createContext } from "react";

export type ConfirmAction = () => void;

export interface ConfirmModalContextValue {
  confirmModal: (onConfirm: ConfirmAction, text?: string) => void;
}

export const ConfirmModalContext =
  createContext<ConfirmModalContextValue | null>(null);
