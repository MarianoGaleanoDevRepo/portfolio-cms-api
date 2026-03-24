import api from "./axios";

export type ProjectRequest = {
  title: string;
  shortDescription: string;
  description: string;
  githubUrl: string;
  demoUrl: string;
  imageUrl: string;
  featured: boolean;
  published: boolean;
  categoryId: number | null;
};

export type Project = {
  id: number;
  title: string;
  shortDescription: string;
  description?: string;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  published?: boolean;
  views?: number;
  categoryId?: number | null;
  categoryName?: string | null;
  videoUrl?: string;
gallery?: string;
};

export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

export const createProject = async (data: ProjectRequest) => {
  const response = await api.post("/projects", data);
  return response.data;
};

export const updateProject = async (id: number, data: ProjectRequest) => {
  const response = await api.put(`/projects/${id}`, data);
  return response.data;
};

export const deleteProject = async (id: number) => {
  await api.delete(`/projects/${id}`);
};