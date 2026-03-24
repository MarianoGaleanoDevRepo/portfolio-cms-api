import api from "./axios";

export type AuditLog = {
  id: number;
  action: string;
  entityName: string;
  entityId: string;
  userEmail: string;
  createdAt: string;
};

export const getRecentAuditLogs = async () => {
  const response = await api.get<AuditLog[]>("/audit");
  return response.data;
};