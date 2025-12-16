import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getChallenges } from "../services/challengeService";
import { getRecentTips } from "../services/tipsService";
import { getUpcomingEvents } from "../services/eventsService";

const FALLBACK_HERO_IMG =
    "https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg?auto=compress&cs=tinysrgb&w=800";

const Home = () => {
    const [featuredChallenges, setFeaturedChallenges] = useState([]);
    const [tips, setTips] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // hero carousel index
    const [heroIndex, setHeroIndex] = useState(0);

    useEffect(() => {
        const loadHomeData = async () => {
            try {
                setLoading(true);

                const [chRes, tipsRes, eventsRes] = await Promise.all([
                    getChallenges(),
                    getRecentTips(),
                    getUpcomingEvents(),
                ]);

                const challenges = chRes?.data || [];
                const featured = challenges.slice(0, 3);

                setFeaturedChallenges(featured);
                setTips(tipsRes?.data || []);
                setEvents(eventsRes?.data || []);
            } catch (err) {
                console.error("Error loading home data:", err?.message || err);
            } finally {
                setLoading(false);
            }
        };

        loadHomeData();
    }, []);

    // auto-rotate hero when featured loaded
    useEffect(() => {
        if (!featuredChallenges.length) return;

        const interval = setInterval(() => {
            setHeroIndex((prev) => (prev + 1) % featuredChallenges.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [featuredChallenges]);

    const activeHero = featuredChallenges[heroIndex];

    return (
        <div className="min-h-[calc(100vh-140px)] bg-base-100">
            {/* Hero Section (Carousel) */}
            <section className="hero bg-emerald-900 text-emerald-50">
                <div className="hero-content flex-col lg:flex-row-reverse max-w-6xl mx-auto py-10">
                    <img
                        src={activeHero?.imageUrl || FALLBACK_HERO_IMG}
                        alt={activeHero?.title || "EcoTrack"}
                        className="max-w-sm rounded-2xl shadow-2xl object-cover"
                    />

                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold">
                            {activeHero?.title ? (
                                <>
                                    {activeHero.title}{" "}
                                    <span className="text-emerald-300">Challenge</span>
                                </>
                            ) : (
                                <>
                                    Track Your{" "}
                                    <span className="text-emerald-300">Eco Journey</span>
                                </>
                            )}
                        </h1>

                        <p className="py-4 text-emerald-100 text-sm md:text-base max-w-xl">
                            {activeHero?.description ||
                                "Join sustainability challenges, reduce your carbon footprint, and see your impact grow over time. EcoTrack helps you turn small actions into big change. 🌍"}
                        </p>

                        <div className="flex gap-3 flex-wrap">
                            {activeHero?._id && (
                                <Link
                                    to={`/challenges/${activeHero._id}`}
                                    className="btn btn-primary btn-sm md:btn-md"
                                >
                                    View Challenge
                                </Link>
                            )}

                            <Link
                                to="/challenges"
                                className="btn btn-outline btn-sm md:btn-md border-emerald-200 text-emerald-50"
                            >
                                Explore Challenges
                            </Link>

                            <Link
                                to="/my-activities"
                                className="btn btn-outline btn-sm md:btn-md border-emerald-200 text-emerald-50"
                            >
                                View My Activities
                            </Link>
                        </div>

                        {/* dots */}
                        {featuredChallenges.length > 1 && (
                            <div className="mt-5 flex gap-2">
                                {featuredChallenges.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setHeroIndex(i)}
                                        className={`h-2.5 w-2.5 rounded-full ${i === heroIndex ? "bg-emerald-300" : "bg-emerald-700"
                                            }`}
                                        aria-label={`Go to slide ${i + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
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
                                                className="btn btn-sm btn-outline btn-emerald"
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
            </div>
        </div>
    );
};

export default Home;
