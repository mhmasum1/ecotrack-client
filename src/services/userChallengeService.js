import api from "../lib/apiClient";

export const getUserChallenges = (userId) =>
    api.get(`/api/user-challenges`, {
        params: { userId },
    });

export const updateUserChallenge = (id, data) =>
    api.patch(`/api/user-challenges/${id}`, data);
