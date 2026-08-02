import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deposit } from "../../services/wallet/wallet.service";

const useDeposit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deposit,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

export default useDeposit;