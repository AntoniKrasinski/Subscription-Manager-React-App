import type { User, AuthResponse } from "../types/api";
import { api } from "./apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./TanStackConfig/queryKeys";



export const useRegister = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerWithEmailAndPassword,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user, data.user);
      onSuccess?.();
    },
  });
};

export const useLogin = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user, data.user);
      onSuccess?.();
    },
  });
};

export const useLogout = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: queryKeys.user });
      onSuccess?.();
    },
  });
};

export const useUser = () =>
  useQuery({ queryKey: queryKeys.user, queryFn: getUser });

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
  return response?.data;
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

const logoutURL = "auth/logout";

const logout = async (): Promise<void> => {
  return await api.post(logoutURL);
};

const getuserURL = "auth/me";

const getUser = async (): Promise<User> => {
  const response = await api.get(getuserURL);
  return response.data.data.user;
};


