import api from "../lib/apiClient";

export const getStats = () => api.get("/api/stats");
