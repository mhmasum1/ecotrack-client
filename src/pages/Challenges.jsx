import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getChallenges, joinChallenge } from "../services/challengeService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CATEGORIES = [
    "",
    "Waste Reduction",
    "Energy Conservation",
    "Water Conservation",
    "Sustainable Transport",
    "Green Living",
];

const Challenges = () => {
    const { user } = useAuth();

    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [category, setCategory] = useState("");
    const [minParticipants, setMinParticipants] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");

    const params = useMemo(() => {
        const p = {};
        if (category) p.category = category;
        if (minParticipants !== "") p.minParticipants = minParticipants;
        if (maxParticipants !== "") p.maxParticipants = maxParticipants;
        return p;
    }, [category, minParticipants, maxParticipants]);

    const loadChallenges = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await getChallenges(params);
            setChallenges(res?.data || []);
        } catch (err) {
            console.error("Error loading challenges:", err);
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to load challenges";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadChallenges();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const handleFilter = (e) => {
        e.preventDefault();
        loadChallenges();
    };

    const handleReset = () => {
        setCategory("");
        setMinParticipants("");
        setMaxParticipants("");
    };

    const handleJoin = async (challengeId) => {
        try {
            if (!user?.email) {
                toast.error("Please login to join a challenge");
                return;
            }

            await joinChallenge(challengeId, user.email);
            toast.success("Joined challenge successfully!");
            loadChallenges();
        } catch (err) {
            console.error("Error joining challenge:", err);
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Could not join challenge";
            toast.error(msg);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
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

            <form
                onSubmit={handleFilter}
                className="bg-base-100 border border-emerald-50 rounded-xl p-4 mb-6 shadow-sm"
            >
                <div className="grid gap-4 md:grid-cols-5">
                    <div className="form-control md:col-span-2">
                        <label className="label py-1">
                            <span className="label-text text-sm">Category</span>
                        </label>
                        <select
                            className="select select-sm select-bordered"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c}>
                                    {c === "" ? "All Categories" : c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label py-1">
                            <span className="label-text text-sm">Min Participants</span>
                        </label>
                        <input
                            type="number"
                            min="0"
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
                            min="0"
                            className="input input-sm input-bordered"
                            value={maxParticipants}
                            onChange={(e) => setMaxParticipants(e.target.value)}
                        />
                    </div>

                    <div className="flex items-end gap-2">
                        <button type="submit" className="btn btn-sm btn-primary w-full">
                            Apply
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-ghost w-full"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </form>

            {loading && (
                <div className="flex justify-center py-10">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}

            {!loading && error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
                    <p className="font-medium">Couldn’t load challenges</p>
                    <p className="text-sm mt-1">{error}</p>
                    <button
                        className="btn btn-sm btn-outline mt-3"
                        onClick={loadChallenges}
                    >
                        Try again
                    </button>
                </div>
            )}

            {!loading && !error && challenges.length === 0 && (
                <p className="text-sm text-gray-500">No challenges found.</p>
            )}

            {!loading && !error && challenges.length > 0 && (
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
                                    <Link
                                        to={`/challenges/${ch._id}`}
                                        className="btn btn-xs btn-outline"
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
