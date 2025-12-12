import api from "../lib/apiClient";

// CHALLENGE APIs
export const getChallenges = (params = {}) =>
    api.get("/api/challenges", { params });

export const getChallengeById = (id) =>
    api.get(`/api/challenges/${id}`);

export const createChallenge = (data) =>
    api.post("/api/challenges", data);

export const updateChallenge = (id, data) =>
    api.patch(`/api/challenges/${id}`, data);

export const deleteChallenge = (id) =>
    api.delete(`/api/challenges/${id}`);

export const joinChallenge = (id, userId) =>
    api.post(`/api/challenges/join/${id}`, { userId });
