//ToDo: export validation with zod and implement in forms
import toast from "react-hot-toast";
import type { AuthResponse } from "../types/api";
import { api } from "./apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const userQueryKey = ["user"];

export const useRegister = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerWithEmailAndPassword,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data.user);
      onSuccess?.();
    },
    onError: () => {
      toast.error("error");
    },
  });
};

export const useLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: (data) => {
      queryClient.setQueryData(userQueryKey, data.user);
      onSuccess?.();
    },
  });
};

const registerURL = "auth/register";
export type RegisterInput = { name: string; email: string; password: string };

const registerWithEmailAndPassword = async (
  data: RegisterInput,
): Promise<AuthResponse> => {
  const response = await api.post(registerURL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const loginURL = "auth/login";
export type LoginInput = { email: string; password: string };

const loginWithEmailAndPassword = async (
  data: LoginInput,
): Promise<AuthResponse> => {
  const response = await api.post(loginURL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
