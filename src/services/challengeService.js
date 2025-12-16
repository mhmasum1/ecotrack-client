import api from "../lib/apiClient";

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

export const joinChallenge = (challengeId, userId) =>
    api.post("/api/user-challenges", {
        userId,
        challengeId,
    });

export const getUserChallenges = (userId) =>
    api.get("/api/user-challenges", { params: { userId } });

export const updateUserChallenge = (userChallengeId, data) =>
    api.patch(`/api/user-challenges/${userChallengeId}`, data);
