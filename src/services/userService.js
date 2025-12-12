import api from "../lib/apiClient";
export const getUsers = () => api.get("/users");

export const createUser = (data) => api.post("/users", data);
