import api from "../lib/apiClient";

export const getUpcomingEvents = () => api.get("/api/events");
