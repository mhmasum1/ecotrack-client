import React, { useEffect, useState } from "react";
import { getChallenges } from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
    const [featuredChallenges, setFeaturedChallenges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getChallenges()
            .then((res) => {
                setFeaturedChallenges(res.data.slice(0, 3)); // top 3
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading challenges:", err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-[calc(100vh-140px)] bg-base-100">
            {/* Hero Section */}
            <section className="hero bg-emerald-900 text-emerald-50">
                <div className="hero-content flex-col lg:flex-row-reverse max-w-6xl mx-auto py-10">
                    <img
                        src="https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg?auto=compress&cs=tinysrgb&w=800"
                        alt="EcoTrack"
                        className="max-w-sm rounded-2xl shadow-2xl"
                    />
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Track Your <span className="text-emerald-300">Eco Journey</span>
                        </h1>
                        <p className="py-4 text-emerald-100 text-sm md:text-base max-w-xl">
                            Join sustainability challenges, reduce your carbon footprint,
                            and see your impact grow over time. EcoTrack helps you turn
                            small actions into big change. 🌍
                        </p>
                        <div className="flex gap-3">
                            <Link to="/challenges" className="btn btn-primary btn-sm md:btn-md">
                                Explore Challenges
                            </Link>
                            <Link to="/my-activities" className="btn btn-outline btn-sm md:btn-md border-emerald-200 text-emerald-50">
                                View My Activities
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Challenges */}
            <section className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold text-emerald-900">
                        Featured Challenges
                    </h2>
                    <Link to="/challenges" className="link link-primary text-sm">
                        View all challenges →
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
                    </div>
                ) : featuredChallenges.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No challenges yet. Add some from backend / MongoDB.
                    </p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-3">
                        {featuredChallenges.map((ch) => (
                            <div key={ch._id} className="card bg-base-100 shadow-md border border-emerald-50">
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
                                            to={`/challenge/${ch._id}`}
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
        </div>
    );
};

export default Home;
