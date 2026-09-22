import axios from "axios";
import { toast } from "react-hot-toast";
import { MutationCache } from "@tanstack/react-query";

export const mutationConfig = new MutationCache({
  onError: (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        toast.error(error.response?.data.error);
      } else {
        toast.error(error.message);
      }
    } else {
      toast.error("Something went wrong");
    }
  },
});

export const queriesConfig = { staleTime: 5 * 60 * 1000, retry: 0 };
