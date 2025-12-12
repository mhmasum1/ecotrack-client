import api from "../lib/apiClient";

// GET upcoming 4 events
export const getUpcomingEvents = () => api.get("/api/events");
