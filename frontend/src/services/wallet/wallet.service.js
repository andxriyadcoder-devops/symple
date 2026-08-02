import api from "../api/axios";

export const getMyWallet = async () => {
  const { data } = await api.get("/wallet/me");
  return data;
};

export const sendCoin = async (payload) => {
  const { data } = await api.post("/wallet/send", payload);
  return data;
};