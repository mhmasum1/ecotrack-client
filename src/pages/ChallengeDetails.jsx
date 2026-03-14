import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getChallengeById, joinChallenge } from "../services/challengeService";
import { auth } from "../firebase";

const ChallengeDetails = () => {
    const { id } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [alreadyJoined, setAlreadyJoined] = useState(false);

    useEffect(() => {
        setLoading(true);
        getChallengeById(id)
            .then((res) => {
                setChallenge(res.data);
            })
            .catch((err) => {
                console.error("Error loading challenge:", err?.message);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const handleJoin = async () => {
        try {
            setJoining(true);

            const userId = auth?.currentUser?.email;

            if (!userId) {
                toast.error("Please login first to join a challenge.");
                return;
            }

            await joinChallenge(id, userId);

            toast.success("Joined challenge successfully!");
            setAlreadyJoined(true);

            setChallenge((prev) =>
                prev ? { ...prev, participants: (prev.participants ?? 0) + 1 } : prev
            );
        } catch (err) {
            const status = err?.response?.status;
            const msg = err?.response?.data?.message;

            if (status === 409) {
                setAlreadyJoined(true);
                toast.error("You already joined this challenge.");
                return;
            }

            toast.error(msg || "Could not join challenge");
            console.error("Error joining challenge:", err);
        } finally {
            setJoining(false);
        }
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
                                <span className="font-medium">{challenge.category || "General"}</span>
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
                        <button
                            className="btn btn-primary"
                            onClick={handleJoin}
                            disabled={joining || alreadyJoined}
                        >
                            {alreadyJoined ? "Already Joined" : joining ? "Joining..." : "Join this Challenge"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeDetails;
