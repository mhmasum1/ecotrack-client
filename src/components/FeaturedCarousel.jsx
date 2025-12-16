import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FALLBACK_HERO_IMG =
    "https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg?auto=compress&cs=tinysrgb&w=1200";

const FeaturedCarousel = ({ challenges }) => {
    const [index, setIndex] = useState(0);

    const safeChallenges = Array.isArray(challenges) ? challenges : [];

    useEffect(() => {
        if (safeChallenges.length === 0) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % safeChallenges.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [safeChallenges.length]);

    if (safeChallenges.length === 0) {
        return (
            <div className="h-[460px] rounded-3xl bg-emerald-900/40 border border-emerald-800 flex items-center justify-center">
                <p className="text-emerald-100 text-sm">No featured challenges yet.</p>
            </div>
        );
    }

    const ch = safeChallenges[index] || {};

    return (
        <div className="h-[460px] rounded-3xl overflow-hidden bg-emerald-900">
            <div className="h-full flex flex-col lg:flex-row-reverse items-center justify-between gap-8 px-6 lg:px-16 py-10">
                <img
                    src={ch.imageUrl || FALLBACK_HERO_IMG}
                    alt={ch.title || "EcoTrack"}
                    className="w-full lg:w-[420px] h-[240px] lg:h-[320px] rounded-2xl object-cover shadow-2xl"
                />

                <div className="max-w-xl">
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight text-emerald-50 line-clamp-2">
                        {ch.title || "Track Your Eco Journey"}
                    </h1>

                    <p className="mt-4 text-emerald-100 text-sm md:text-base line-clamp-3">
                        {ch.description ||
                            "Join sustainability challenges, reduce your carbon footprint, and see your impact grow over time."}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        {ch._id && (
                            <Link
                                to={`/challenges/${ch._id}`}
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

                    {safeChallenges.length > 1 && (
                        <div className="mt-6 flex gap-2">
                            {safeChallenges.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setIndex(i)}
                                    className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-emerald-300" : "bg-emerald-700"
                                        }`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeaturedCarousel;
