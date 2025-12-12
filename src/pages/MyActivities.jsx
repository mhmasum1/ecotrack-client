import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    getUserChallenges,
    updateUserChallenge,
} from "../services/userChallengeService";
import toast from "react-hot-toast";

const MyActivities = () => {
    const { user } = useAuth();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        if (!user?.email) return;

        const loadActivities = async () => {
            try {
                setLoading(true);
                const res = await getUserChallenges(user.email);
                setActivities(res.data || []);
            } catch (err) {
                console.error("Error loading user activities:", err.message);
                toast.error("Failed to load your challenges");
            } finally {
                setLoading(false);
            }
        };

        loadActivities();
    }, [user]);

    const handleProgressUpdate = async (activity) => {
        try {
            setUpdatingId(activity._id);

            const newProgress = Math.min((activity.progress || 0) + 10, 100);
            const newStatus =
                newProgress >= 100 ? "Finished" : activity.status || "Ongoing";

            const res = await updateUserChallenge(activity._id, {
                progress: newProgress,
                status: newStatus,
            });

            setActivities((prev) =>
                prev.map((item) =>
                    item._id === activity._id ? res.data : item
                )
            );

            toast.success(
                newProgress >= 100
                    ? "Challenge marked as finished! 🎉"
                    : "Progress updated ✅"
            );
        } catch (err) {
            console.error("Error updating progress:", err.message);
            toast.error("Failed to update progress");
        } finally {
            setUpdatingId(null);
        }
    };

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-2xl font-semibold mb-2 text-emerald-900">
                    My Activities
                </h1>
                <p className="text-sm text-gray-600">
                    Please login to view your joined challenges.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-3 text-emerald-900">
                My Activities
            </h1>
            <p className="text-sm text-gray-600 mb-6">
                These are the challenges you have joined. Track and update your
                progress.
            </p>

            {loading ? (
                <div className="flex justify-center py-10">
                    <span className="loading loading-spinner loading-lg text-emerald-600"></span>
                </div>
            ) : activities.length === 0 ? (
                <p className="text-sm text-gray-500">
                    You have not joined any challenges yet.
                </p>
            ) : (
                <div className="space-y-4">
                    {activities.map((act) => (
                        <div
                            key={act._id}
                            className="rounded-xl border border-emerald-50 bg-base-100 shadow-sm p-4 md:p-5"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
                                <div>
                                    <h2 className="text-lg font-semibold text-emerald-800">
                                        {act.challengeId?.title ||
                                            "Joined Challenge"}
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        {act.challengeId?.category ||
                                            "Sustainability"}
                                    </p>
                                </div>
                                <div className="text-xs text-gray-500">
                                    <span className="badge badge-ghost mr-2">
                                        {act.status || "Ongoing"}
                                    </span>
                                    <span>
                                        Joined:{" "}
                                        {act.joinDate
                                            ? new Date(
                                                act.joinDate
                                            ).toLocaleDateString()
                                            : "N/A"}
                                    </span>
                                </div>
                            </div>

                            {/* progress bar */}
                            <div className="mb-3">
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Progress</span>
                                    <span>{act.progress || 0}%</span>
                                </div>
                                <progress
                                    className="progress progress-success w-full"
                                    value={act.progress || 0}
                                    max="100"
                                ></progress>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => handleProgressUpdate(act)}
                                    className="btn btn-sm btn-primary"
                                    disabled={
                                        updatingId === act._id ||
                                        (act.progress || 0) >= 100
                                    }
                                >
                                    {updatingId === act._id
                                        ? "Updating..."
                                        : act.progress >= 100
                                            ? "Completed"
                                            : "+10% Progress"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyActivities;
