import api from "./api";

export const getConflicts = async () => {
  const response = await api.get("/conflicts");
  return response.data;
};