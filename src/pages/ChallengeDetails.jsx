import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getChallengeById, joinChallenge, } from "../services/challengeService";

const ChallengeDetails = () => {
    const { id } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getChallengeById(id)
            .then((res) => {
                setChallenge(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading challenge:", err.message);
                setLoading(false);
            });
    }, [id]);

    const handleJoin = () => {
        const userId = "rony@example.com";
        joinChallenge(id, userId)
            .then(() => window.alert("Joined challenge successfully!"))
            .catch((err) => {
                console.error("Error joining challenge:", err.message);
                window.alert("Could not join challenge");
            });
    };

    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg text-emerald-600"></span>
            </div>
        );
    }

    if (!challenge) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-10">
                <p className="text-sm text-gray-500">Challenge not found.</p>
                <Link to="/challenges" className="link link-primary text-sm">
                    ← Back to challenges
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-4">
                <Link to="/challenges" className="btn btn-sm btn-ghost">
                    ← Back
                </Link>
            </div>

            <div className="card bg-base-100 shadow-md border border-emerald-50">
                <div className="card-body">
                    <div className="flex flex-wrap justify-between gap-2 items-start">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-semibold text-emerald-900">
                                {challenge.title}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Category:{" "}
                                <span className="font-medium">
                                    {challenge.category || "General"}
                                </span>
                            </p>
                        </div>
                        <div className="badge badge-outline badge-lg">
                            Participants: {challenge.participants ?? 0}
                        </div>
                    </div>

                    <p className="mt-4 text-sm md:text-base text-gray-700">
                        {challenge.description || "No description provided."}
                    </p>

                    <div className="mt-4 grid gap-3 md:grid-cols-2 text-sm text-gray-600">
                        <div>
                            <p>
                                <span className="font-semibold">Target: </span>
                                {challenge.target || "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">Impact Metric: </span>
                                {challenge.impactMetric || "N/A"}
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className="font-semibold">Start Date: </span>
                                {challenge.startDate
                                    ? new Date(challenge.startDate).toLocaleDateString()
                                    : "N/A"}
                            </p>
                            <p>
                                <span className="font-semibold">End Date: </span>
                                {challenge.endDate
                                    ? new Date(challenge.endDate).toLocaleDateString()
                                    : "N/A"}
                            </p>
                        </div>
                    </div>

                    <div className="card-actions justify-end mt-6">
                        <button className="btn btn-primary" onClick={handleJoin}>
                            Join this Challenge
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeDetails;
