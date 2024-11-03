import axiosInstance from "./axiosConfig";

interface TaskCreate {
    title: string;
    description?: string;
    dueDate?: string;
    priority: "Low" | "Medium" | "High";
}

export const login = async (username: string, password: string) => {
    const response = await axiosInstance.post("/api/Auth/login", { username, password });
    return response.data;
};

export const register = async (username: string, email: string, password: string) => {
    const response = await axiosInstance.post("/api/Auth/register", { username, email, password });
    return response.data;
};
export const fetchProtectedData = async () => {
    const response = await axiosInstance.get("/api/Tasks/All");
    return response.data;
};

export const addTask = async (task: TaskCreate) => {
    const response = await axiosInstance.post("/api/Tasks/Add", task);
    return response.data;
};

export const deleteTask = async (id: number) => {
    const response = await axiosInstance.delete(`/api/Tasks/${id}`);
    return response.data;
};

export const updateTask = async (id: number, updatedTaskData: any) => {
    const response = await axiosInstance.put(`/api/Tasks/Edit/${id}`, updatedTaskData);
    return response.data;
};