import { useQuery } from "@tanstack/react-query";
import { getMyWallet } from "../../services/wallet/wallet.service";

const useWallet = () => {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: getMyWallet,
  });
};

export default useWallet;