import api from "./axios";

export type Category = {
    id: number;
    name: string;
};

export const getCategories = async () => {
    const response = await api.get<Category[]>("/categories");
    return response.data;
};

export const createCategory = async (name: string) => {
    const response = await api.post<Category>("/categories", { name });
    return response.data;
};
