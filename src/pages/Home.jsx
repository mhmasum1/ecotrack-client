import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeaturedCarousel from "../components/FeaturedCarousel";
import { getChallenges } from "../services/challengeService";
import { getRecentTips } from "../services/tipsService";
import { getUpcomingEvents } from "../services/eventsService";
import { getStats } from "../services/statsService";

const Home = () => {
    const [featuredChallenges, setFeaturedChallenges] = useState([]);
    const [tips, setTips] = useState([]);
    const [events, setEvents] = useState([]);
    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        const loadHomeData = async () => {
            try {
                setLoading(true);
                setStatsLoading(true);

                const [chRes, tipsRes, eventsRes, statsRes] = await Promise.all([
                    getChallenges(),
                    getRecentTips(),
                    getUpcomingEvents(),
                    getStats(),
                ]);

                const challenges = chRes?.data || [];
                setFeaturedChallenges(challenges.slice(0, 3));

                setTips(tipsRes?.data || []);
                setEvents(eventsRes?.data || []);

                setStats(statsRes?.data || null);
            } catch (err) {
                console.error("Error loading home data:", err);
                // fallback so UI doesn't break
                setStats(null);
                setFeaturedChallenges([]);
                setTips([]);
                setEvents([]);
            } finally {
                setLoading(false);
                setStatsLoading(false);
            }
        };

        loadHomeData();
    }, []);

    return (
        <div className="min-h-[calc(100vh-140px)] bg-base-100">
            {/* Hero Carousel */}
            <section className="bg-emerald-900 text-emerald-50">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <FeaturedCarousel challenges={featuredChallenges} />
                </div>
            </section>

            {/* Live Community Statistics */}
            <section className="bg-emerald-50 border-t border-emerald-100">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <div className="flex items-center justify-between gap-3 mb-6">
                        <h2 className="text-xl font-semibold text-emerald-900">
                            Community Impact (Live)
                        </h2>
                        <span className="text-xs text-gray-500">Auto updates from DB</span>
                    </div>

                    {statsLoading ? (
                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="rounded-xl bg-white border border-emerald-100 p-5 shadow-sm animate-pulse"
                                >
                                    <div className="h-3 bg-slate-200 rounded w-1/2 mb-3" />
                                    <div className="h-7 bg-slate-100 rounded w-2/3" />
                                </div>
                            ))}
                        </div>
                    ) : !stats ? (
                        <p className="text-sm text-gray-500">
                            Stats not available right now. Make sure <code>/api/stats</code>{" "}
                            returns data.
                        </p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                            <div className="rounded-xl bg-white border border-emerald-100 p-5 shadow-sm">
                                <p className="text-xs text-gray-500">Total Participants</p>
                                <p className="text-2xl font-bold text-emerald-800">
                                    {stats.totalParticipants ?? 0}
                                </p>
                            </div>

                            <div className="rounded-xl bg-white border border-emerald-100 p-5 shadow-sm">
                                <p className="text-xs text-gray-500">CO₂ Saved</p>
                                <p className="text-2xl font-bold text-emerald-800">
                                    {(stats.totalCO2SavedKg ?? 0).toFixed(1)} kg
                                </p>
                            </div>

                            <div className="rounded-xl bg-white border border-emerald-100 p-5 shadow-sm">
                                <p className="text-xs text-gray-500">Plastic Reduced</p>
                                <p className="text-2xl font-bold text-emerald-800">
                                    {(stats.totalPlasticReducedKg ?? 0).toFixed(1)} kg
                                </p>
                            </div>

                            <div className="rounded-xl bg-white border border-emerald-100 p-5 shadow-sm">
                                <p className="text-xs text-gray-500">Total Challenges</p>
                                <p className="text-2xl font-bold text-emerald-800">
                                    {stats.totalChallenges ?? 0}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
                {/* Featured Challenges */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold text-emerald-900">
                            Featured Challenges
                        </h2>
                        <Link to="/challenges" className="link link-primary text-sm">
                            View all challenges →
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-8">
                            <span className="loading loading-spinner loading-lg text-emerald-600"></span>
                        </div>
                    ) : featuredChallenges.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No challenges yet. Add some from backend / MongoDB.
                        </p>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-3">
                            {featuredChallenges.map((ch) => (
                                <div
                                    key={ch._id}
                                    className="card bg-base-100 shadow-md border border-emerald-50"
                                >
                                    <div className="card-body">
                                        <h3 className="card-title text-emerald-800">{ch.title}</h3>

                                        <div className="flex items-center gap-2 text-xs">
                                            <div className="badge badge-ghost text-emerald-700">
                                                {ch.category || "General"}
                                            </div>
                                            <span className="text-gray-500">
                                                Participants: {ch.participants ?? 0}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                                            {ch.description || "No description provided."}
                                        </p>

                                        <div className="card-actions justify-end mt-4">
                                            <Link
                                                to={`/challenges/${ch._id}`}
                                                className="btn btn-sm btn-outline"
                                            >
                                                View details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Recent Tips */}
                <section>
                    <h2 className="text-2xl font-semibold text-emerald-900 mb-4">
                        Recent Tips from the Community
                    </h2>

                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="rounded-xl border border-emerald-50 p-4 bg-base-100 shadow-sm animate-pulse"
                                >
                                    <div className="h-4 bg-slate-200 rounded w-2/3 mb-2" />
                                    <div className="h-3 bg-slate-100 rounded w-full mb-1" />
                                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : tips.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No tips yet. Join the community and share your first eco tip!
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {tips.map((tip) => (
                                <article
                                    key={tip._id}
                                    className="rounded-xl border border-emerald-50 p-4 bg-base-100 shadow-sm"
                                >
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <h3 className="font-semibold text-emerald-800 text-sm md:text-base">
                                            {tip.title}
                                        </h3>
                                        <span className="badge badge-ghost text-xs">
                                            {tip.category || "General"}
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                        {tip.content}
                                    </p>

                                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                                        <span>By {tip.authorName || "EcoTrack User"}</span>
                                        <span>Upvotes: {tip.upvotes || 0}</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {/* Upcoming Events */}
                <section>
                    <h2 className="text-2xl font-semibold text-emerald-900 mb-4">
                        Upcoming Green Events
                    </h2>

                    {loading ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {[1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="card bg-base-100 shadow-sm border border-emerald-50 animate-pulse"
                                >
                                    <div className="card-body">
                                        <div className="h-4 bg-slate-200 rounded w-2/3 mb-2" />
                                        <div className="h-3 bg-slate-100 rounded w-1/3 mb-1" />
                                        <div className="h-3 bg-slate-100 rounded w-1/2 mb-1" />
                                        <div className="h-3 bg-slate-100 rounded w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : events.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No upcoming events right now. Stay tuned for future clean-ups and
                            workshops.
                        </p>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {events.map((ev) => (
                                <div
                                    key={ev._id}
                                    className="card bg-base-100 shadow-sm border border-emerald-50"
                                >
                                    <div className="card-body">
                                        <h3 className="card-title text-emerald-800 text-base">
                                            {ev.title}
                                        </h3>

                                        <p className="text-xs text-gray-500">
                                            {ev.location || "TBA"} •{" "}
                                            {ev.date
                                                ? new Date(ev.date).toLocaleDateString()
                                                : "Date TBA"}
                                        </p>

                                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                            {ev.description}
                                        </p>

                                        <p className="text-[11px] text-gray-500">
                                            {ev.currentParticipants || 0} / {ev.maxParticipants || 0}{" "}
                                            participants joined
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                {/* Why Go Green */}
                <section className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
                    <h2 className="text-2xl font-semibold text-emerald-900 mb-4">
                        Why Go Green?
                    </h2>

                    <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside">
                        <li>
                            Reduce environmental pollution and protect natural ecosystems.
                        </li>
                        <li>
                            Lower your carbon footprint through small, daily sustainable actions.
                        </li>
                        <li>
                            Save money by reducing waste, energy, and water consumption.
                        </li>
                        <li>
                            Improve community well-being by encouraging responsible living.
                        </li>
                        <li>
                            Create a healthier planet for future generations.
                        </li>
                    </ul>
                </section>

                {/* How It Works */}
                <section className="bg-base-100 rounded-2xl p-8 border border-emerald-50 shadow-sm">
                    <h2 className="text-2xl font-semibold text-emerald-900 mb-6">
                        How EcoTrack Works
                    </h2>

                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                                1
                            </div>
                            <h3 className="font-semibold text-emerald-800 mb-2">
                                Join a Challenge
                            </h3>
                            <p className="text-sm text-gray-600">
                                Browse sustainability challenges and join the one that fits your lifestyle.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                                2
                            </div>
                            <h3 className="font-semibold text-emerald-800 mb-2">
                                Track Progress
                            </h3>
                            <p className="text-sm text-gray-600">
                                Update your progress and see how your actions reduce environmental impact.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                                3
                            </div>
                            <h3 className="font-semibold text-emerald-800 mb-2">
                                Share & Inspire
                            </h3>
                            <p className="text-sm text-gray-600">
                                Share eco-tips, inspire others, and grow together as a green community.
                            </p>
                        </div>
                    </div>
                </section>

            </div>


        </div>
    );
};

export default Home;
