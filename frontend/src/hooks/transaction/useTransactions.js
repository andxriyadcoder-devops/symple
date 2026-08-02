import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/transaction/transaction.service";

const useTransactions = ({
  page,
  limit,
  type,
  search,
}) => {
  return useQuery({
    queryKey: [
      "transactions",
      page,
      limit,
      type,
      search,
    ],

    queryFn: () =>
      getTransactions({
        page,
        limit,
        type,
        search,
      }),
  });
};

export default useTransactions;