import api from "../api/axios";

export const getTransactions = async ({
  page = 1,
  limit = 10,
  type = "ALL",
  search = "",
}) => {
  const { data } = await api.get("/transactions/me", {
    params: {
      page,
      limit,
      type,
      search,
    },
  });

  return data;
};