import api from "./axios";

export type DashboardStats = {
  totalProjects: number;
  totalViews: number;
};

export const getDashboardStats = async () => {
  const response = await api.get<DashboardStats>("/dashboard/stats");
  return response.data;
};
