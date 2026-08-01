import api from "../api/axios";

export const getDashboard = async () => {
  const { data } = await api.get("/dashboard");

  console.log(JSON.stringify(data, null, 2));

  return data;
};