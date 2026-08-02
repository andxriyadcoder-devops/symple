import api from "../api/axios";

export const getMyWallet = async () => {
  const { data } = await api.get("/wallet/me");
  return data;
};