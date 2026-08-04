import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import api from "../../services/api/axios";

const claimDailyReward = async () => {
  const { data } = await api.post("/wallet/daily-login");
  return data;
};

const useDailyReward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: claimDailyReward,

    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["wallet"],
      });

      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
};

export default useDailyReward;