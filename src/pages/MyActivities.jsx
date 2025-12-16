import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
    getUserChallenges,
    updateUserChallenge,
} from "../services/challengeService";
import { Link } from "react-router-dom";

const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));

const MyActivities = () => {
    const { user } = useAuth();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // local edits per item (progress input)
    const [progressDraft, setProgressDraft] = useState({});
    const [savingId, setSavingId] = useState("");

    const load = async () => {
        try {
            setLoading(true);
            setError("");

            const userId = user?.email;
            if (!userId) {
                setItems([]);
                setLoading(false);
                return;
            }

            const res = await getUserChallenges(userId);
            const data = res?.data || [];
            setItems(data);

            const draft = {};
            data.forEach((uc) => {
                draft[uc._id] = uc.progress ?? 0;
            });
            setProgressDraft(draft);
        } catch (err) {
            console.error("Error loading activities:", err);
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to load activities";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.email]);

    const handleChangeProgress = (id, value) => {
        const num = clamp(Number(value));
        setProgressDraft((prev) => ({ ...prev, [id]: num }));
    };

    const handleSave = async (uc) => {
        try {
            setSavingId(uc._id);

            const nextProgress = clamp(Number(progressDraft[uc._id] ?? 0));
            const nextStatus =
                nextProgress >= 100 ? "Finished" : uc.status || "Ongoing";

            await updateUserChallenge(uc._id, {
                progress: nextProgress,
                status: nextStatus,
            });

            toast.success("Progress updated");
            await load();
        } catch (err) {
            console.error("Error updating progress:", err);
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to update progress";
            toast.error(msg);
        } finally {
            setSavingId("");
        }
    };

    const handleFinish = async (uc) => {
        try {
            setSavingId(uc._id);

            await updateUserChallenge(uc._id, {
                progress: 100,
                status: "Finished",
            });

            toast.success("Marked as finished");
            await load();
        } catch (err) {
            console.error("Error finishing:", err);
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to finish";
            toast.error(msg);
        } finally {
            setSavingId("");
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex items-end justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-semibold text-emerald-900">
                        My Activities
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Track your joined challenges and update progress.
                    </p>
                </div>

                <button className="btn btn-outline btn-sm" onClick={load}>
                    Refresh
                </button>
            </div>

            {loading && (
                <div className="flex justify-center py-14">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}

            {!loading && error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
                    <p className="font-medium">Couldn’t load activities</p>
                    <p className="text-sm mt-1">{error}</p>
                    <button className="btn btn-sm btn-outline mt-3" onClick={load}>
                        Try again
                    </button>
                </div>
            )}

            {!loading && !error && items.length === 0 && (
                <div className="bg-base-200 p-8 rounded-2xl text-center">
                    <h3 className="text-lg font-semibold">No joined challenges yet</h3>
                    <p className="text-sm text-base-content/70 mt-1">
                        Go to Challenges and join one to start tracking progress.
                    </p>
                    <Link to="/challenges" className="btn btn-primary btn-sm mt-4">
                        Explore Challenges
                    </Link>
                </div>
            )}

            {!loading && !error && items.length > 0 && (
                <div className="grid gap-5 md:grid-cols-2">
                    {items.map((uc) => {
                        const ch = uc.challengeId; // populated doc
                        const progress = clamp(Number(progressDraft[uc._id] ?? uc.progress ?? 0));
                        const status = uc.status || "Ongoing";

                        return (
                            <div
                                key={uc._id}
                                className="bg-base-100 border border-emerald-50 rounded-2xl shadow-sm overflow-hidden"
                            >
                                {ch?.imageUrl ? (
                                    <img
                                        src={ch.imageUrl}
                                        alt={ch.title}
                                        className="w-full h-44 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-44 bg-base-200" />
                                )}

                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="text-lg font-semibold text-emerald-900">
                                                {ch?.title || "Challenge"}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Status:{" "}
                                                <span className="font-medium">{status}</span>
                                            </p>
                                        </div>

                                        {ch?._id && (
                                            <Link
                                                to={`/challenges/${ch._id}`}
                                                className="btn btn-xs btn-outline"
                                            >
                                                Details
                                            </Link>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                                            <span>Progress</span>
                                            <span className="font-medium">{progress}%</span>
                                        </div>

                                        <progress
                                            className="progress progress-success w-full"
                                            value={progress}
                                            max="100"
                                        />

                                        <div className="mt-3 flex items-center gap-3">
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                className="input input-sm input-bordered w-28"
                                                value={progress}
                                                onChange={(e) =>
                                                    handleChangeProgress(uc._id, e.target.value)
                                                }
                                            />

                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => handleSave(uc)}
                                                disabled={savingId === uc._id}
                                            >
                                                {savingId === uc._id ? "Saving..." : "Save"}
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline"
                                                onClick={() => handleFinish(uc)}
                                                disabled={savingId === uc._id}
                                            >
                                                Mark Finished
                                            </button>
                                        </div>

                                        <p className="text-[11px] text-gray-500 mt-3">
                                            Joined:{" "}
                                            {uc.joinDate
                                                ? new Date(uc.joinDate).toLocaleDateString()
                                                : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyActivities;
