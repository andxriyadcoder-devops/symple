import { useMutation, useQueryClient } from "@tanstack/react-query";
import { withdraw } from "../../services/wallet/wallet.service";

const useWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: withdraw,

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

export default useWithdraw;