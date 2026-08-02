import api from "../api/axios";

export const getMyRewardClaims = async () => {
  const { data } = await api.get("/reward-claims/me");
  return data;
};