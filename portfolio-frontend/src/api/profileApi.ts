import api from "./axios";

export type Profile = {
  id?: number;
  fullName: string;
  professionalTitle: string;
  bio: string;
  linkedinUrl: string;
  githubUrl: string;
  cvUrl: string;
  contactEmail: string;
  avatarUrl: string;
};

export const getProfile = async () => {
  const response = await api.get<Profile>("/profile");
  return response.data;
};

export const updateProfile = async (data: Profile) => {
  const response = await api.put<Profile>("/profile", data);
  return response.data;
};