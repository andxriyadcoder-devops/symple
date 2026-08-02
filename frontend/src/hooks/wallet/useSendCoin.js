import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendCoin } from "../../services/wallet/wallet.service";

const useSendCoin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendCoin,

    onSuccess: () => {
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

export default useSendCoin;