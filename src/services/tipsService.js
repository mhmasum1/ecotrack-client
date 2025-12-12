import api from "../lib/apiClient";

// GET latest 5 tips
export const getRecentTips = () => api.get("/api/tips");
