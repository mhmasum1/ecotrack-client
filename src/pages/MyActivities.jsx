import React, { useState } from "react";
import { getUserChallenges, updateProgress } from "../services/userChallengeService";

const MyActivities = () => {
    const userId = "rony@example.com"; // temp user identifier
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadActivities = () => {
        setLoading(true);
        getUserChallenges(userId)
            .then((res) => {
                setActivities(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading activities:", err.message);
                setLoading(false);
            });
    };

    const handleUpdateProgress = (activity) => {
        const newProgress = Math.min((activity.progress || 0) + 10, 100);

        updateProgress(activity._id, { progress: newProgress })
            .then(() => {
                window.alert("Progress updated!");
                loadActivities();
            })
            .catch((err) => {
                console.error("Error updating progress:", err.message);
                window.alert("Could not update progress");
            });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold text-emerald-900 mb-2">
                My Activities
            </h1>
            <p className="text-sm text-gray-600 mb-6">
                These are the challenges you have joined. Track and update your progress.
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
                <div className="grid gap-5 md:grid-cols-2">
                    {activities.map((act) => (
                        <div
                            key={act._id}
                            className="card bg-base-100 shadow-sm border border-emerald-50"
                        >
                            <div className="card-body">
                                <h2 className="card-title text-emerald-800">
                                    {act.challengeId?.title || "Unknown Challenge"}
                                </h2>
                                <p className="text-xs text-gray-500">
                                    Status:{" "}
                                    <span className="font-medium">
                                        {act.status || "Ongoing"}
                                    </span>
                                </p>
                                <p className="text-xs text-gray-500">
                                    Joined:{" "}
                                    {act.joinDate
                                        ? new Date(act.joinDate).toLocaleDateString()
                                        : "N/A"}
                                </p>

                                <div className="mt-3">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span>Progress</span>
                                        <span>{act.progress ?? 0}%</span>
                                    </div>
                                    <progress
                                        className="progress progress-success w-full"
                                        value={act.progress ?? 0}
                                        max="100"
                                    ></progress>
                                </div>

                                <div className="card-actions justify-end mt-4">
                                    <button
                                        className="btn btn-sm btn-outline btn-primary"
                                        onClick={() => handleUpdateProgress(act)}
                                    >
                                        +10% Progress
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyActivities;
