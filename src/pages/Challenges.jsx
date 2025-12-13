import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getChallenges, joinChallenge } from "../services/challengeService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Challenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("");
    const [minParticipants, setMinParticipants] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");

    const { user } = useAuth();

    const loadChallenges = () => {
        setLoading(true);
        const params = {};
        if (category) params.category = category;
        if (minParticipants) params.minParticipants = minParticipants;
        if (maxParticipants) params.maxParticipants = maxParticipants;

        getChallenges(params)
            .then((res) => {
                setChallenges(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading challenges:", err.message);
                toast.error("Failed to load challenges");
                setLoading(false);
            });
    };

    useEffect(() => {
        loadChallenges();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFilter = (e) => {
        e.preventDefault();
        loadChallenges();
    };

    const handleJoin = async (id) => {
        try {
            if (!user?.email) {
                toast.error("Please login to join a challenge");
                return;
            }

            await joinChallenge(id, user.email);
            toast.success("Joined challenge successfully!");
            loadChallenges();
        } catch (err) {
            console.error("Error joining challenge:", err.message);
            toast.error("Could not join challenge");
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* ✅ Header + Add Challenge button */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
                <div>
                    <h1 className="text-3xl font-semibold text-emerald-900">
                        All Challenges
                    </h1>
                    <p className="text-sm text-gray-600">
                        Filter by category and participants, then join a challenge.
                    </p>
                </div>

                {user && (
                    <Link
                        to="/challenges/add"
                        className="btn btn-sm btn-primary w-full md:w-auto"
                    >
                        Add Challenge
                    </Link>
                )}
            </div>

            {/* Filters */}
            <form
                onSubmit={handleFilter}
                className="bg-base-100 border border-emerald-50 rounded-xl p-4 mb-6 shadow-sm"
            >
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="form-control">
                        <label className="label py-1">
                            <span className="label-text text-sm">Category</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Waste Reduction"
                            className="input input-sm input-bordered"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label py-1">
                            <span className="label-text text-sm">Min Participants</span>
                        </label>
                        <input
                            type="number"
                            className="input input-sm input-bordered"
                            value={minParticipants}
                            onChange={(e) => setMinParticipants(e.target.value)}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label py-1">
                            <span className="label-text text-sm">Max Participants</span>
                        </label>
                        <input
                            type="number"
                            className="input input-sm input-bordered"
                            value={maxParticipants}
                            onChange={(e) => setMaxParticipants(e.target.value)}
                        />
                    </div>

                    <div className="flex items-end">
                        <button type="submit" className="btn btn-sm btn-primary w-full">
                            Apply Filters
                        </button>
                    </div>
                </div>
            </form>

            {/* Challenge List */}
            {loading ? (
                <div className="flex justify-center py-10">
                    <span className="loading loading-spinner loading-lg text-emerald-600"></span>
                </div>
            ) : challenges.length === 0 ? (
                <p className="text-sm text-gray-500">No challenges found.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-3">
                    {challenges.map((ch) => (
                        <div
                            key={ch._id}
                            className="card bg-base-100 border border-emerald-50 shadow-sm flex flex-col"
                        >
                            <div className="card-body flex-1">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="card-title text-emerald-800 text-lg">
                                        {ch.title}
                                    </h3>
                                    <div className="badge badge-ghost text-xs text-emerald-700">
                                        {ch.category || "General"}
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500">
                                    Participants: {ch.participants ?? 0}
                                </p>

                                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                                    {ch.description || "No description provided."}
                                </p>

                                <div className="mt-4 flex justify-between items-center">
                                    {/* ✅ route ঠিক করলাম */}
                                    <Link
                                        to={`/challenges/${ch._id}`}
                                        className="btn btn-xs btn-outline btn-emerald"
                                    >
                                        Details
                                    </Link>

                                    <button
                                        type="button"
                                        className="btn btn-xs btn-primary"
                                        onClick={() => handleJoin(ch._id)}
                                    >
                                        Join
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

export default Challenges;
