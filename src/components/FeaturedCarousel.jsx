import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import heroWater from "../assets/hero/hero-water.jpg";
import heroEnergy from "../assets/hero/hero-energy.jpg";
import heroForest from "../assets/hero/hero-forest.jpg";
import heroRecycle from "../assets/hero/hero-recycle.jpg";
import heroTransport from "../assets/hero/hero-transport.jpg";
import heroDefault from "../assets/hero/hero-default.jpg";


const CATEGORY_IMAGE_MAP = {
    "water conservation": heroWater,
    "water": heroWater,
    "energy conservation": heroEnergy,
    "energy": heroEnergy,
    "nature": heroForest,
    "forest": heroForest,
    "biodiversity": heroForest,
    "waste management": heroRecycle,
    "recycling": heroRecycle,
    "plastic reduction": heroRecycle,
    "sustainable transport": heroTransport,
    "transport": heroTransport,
    "green commute": heroTransport,
};

const getImage = (ch) => {
    if (ch.imageUrl) return ch.imageUrl;
    const key = (ch.category || "").toLowerCase().trim();
    return CATEGORY_IMAGE_MAP[key] || heroDefault;
};
// ─────────────────────────────────────────────────────────────────

const FeaturedCarousel = ({ challenges }) => {
    const [index, setIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [dir, setDir] = useState("next");

    const safeChallenges = Array.isArray(challenges) ? challenges : [];
    const total = safeChallenges.length;

    const goTo = useCallback(
        (next, direction = "next") => {
            if (animating || next === index) return;
            setDir(direction);
            setAnimating(true);
            setTimeout(() => { setIndex(next); setAnimating(false); }, 350);
        },
        [animating, index]
    );

    const goNext = useCallback(() => goTo((index + 1) % total, "next"), [goTo, index, total]);
    const goPrev = useCallback(() => goTo((index - 1 + total) % total, "prev"), [goTo, index, total]);

    useEffect(() => {
        if (total === 0) return;
        const id = setInterval(goNext, 5000);
        return () => clearInterval(id);
    }, [goNext, total]);

    if (total === 0) {
        return (
            <div className="rounded-3xl bg-emerald-900/40 border border-emerald-800 flex items-center justify-center py-24">
                <p className="text-emerald-100 text-sm">No featured challenges yet.</p>
            </div>
        );
    }

    const ch = safeChallenges[index] || {};
    const img = getImage(ch);

    const slideClass = animating
        ? dir === "next" ? "opacity-0 translate-x-4" : "opacity-0 -translate-x-4"
        : "opacity-100 translate-x-0";

    return (
        <div className="relative rounded-3xl overflow-hidden bg-emerald-900 shadow-2xl shadow-emerald-950/50">

            {/* Blurred background */}
            <div className="absolute inset-0">
                <img
                    src={img} alt="" aria-hidden
                    className="w-full h-full object-cover opacity-20 blur-sm scale-105 transition-all duration-700"
                    onError={(e) => { e.currentTarget.src = heroDefault; }}
                />
                <div className="absolute inset-0 bg-linear-to-br from-emerald-950/80 via-emerald-900/60 to-emerald-800/40" />
            </div>

            {/* Slide content */}
            <div className={`relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-12
                             px-6 sm:px-10 lg:px-16 py-10 lg:py-14
                             transition-all duration-350 ease-out ${slideClass}`}>

                {/* Image — top on mobile, right on desktop */}
                <div className="w-full lg:w-auto lg:shrink-0 order-1 lg:order-2">
                    <img
                        src={img}
                        alt={ch.title || "EcoTrack Challenge"}
                        className="w-full h-52 sm:h-64 lg:w-95 lg:h-70
                                   rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
                        onError={(e) => { e.currentTarget.src = heroDefault; }}
                    />
                </div>

                {/* Text — bottom on mobile, left on desktop */}
                <div className="flex-1 order-2 lg:order-1 text-center lg:text-left">

                    {ch.category && (
                        <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold
                                         tracking-wider uppercase rounded-full
                                         bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                            {ch.category}
                        </span>
                    )}

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-white line-clamp-2">
                        {ch.title || "Track Your Eco Journey"}
                    </h1>

                    <p className="mt-3 text-sm sm:text-base text-emerald-200/80 line-clamp-2 lg:line-clamp-3 max-w-lg mx-auto lg:mx-0">
                        {ch.description || "Join sustainability challenges, reduce your carbon footprint, and see your impact grow over time."}
                    </p>

                    {(ch.participantCount ?? ch.participants) > 0 && (
                        <p className="mt-2 text-xs text-emerald-400 font-medium">
                            🌿 {ch.participantCount ?? ch.participants} participants joined
                        </p>
                    )}

                    {/* CTA buttons */}
                    <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-3">
                        {ch._id && (
                            <Link to={`/challenges/${ch._id}`}
                                className="px-5 py-2.5 text-sm font-semibold rounded-full
                                           bg-emerald-400 text-emerald-950 hover:bg-emerald-300
                                           transition-all duration-200 shadow-lg shadow-emerald-500/25">
                                View Challenge
                            </Link>
                        )}
                        <Link to="/challenges"
                            className="px-5 py-2.5 text-sm font-semibold rounded-full
                                       border border-emerald-400/40 text-emerald-100
                                       hover:bg-emerald-800/50 hover:border-emerald-400/70 transition-all duration-200">
                            Explore Challenges
                        </Link>
                        <Link to="/my-activities"
                            className="hidden sm:inline-flex px-5 py-2.5 text-sm font-semibold rounded-full
                                       border border-emerald-400/40 text-emerald-100
                                       hover:bg-emerald-800/50 hover:border-emerald-400/70 transition-all duration-200">
                            View My Activities
                        </Link>
                    </div>

                    {/* Dots + Arrows */}
                    {total > 1 && (
                        <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
                            <button onClick={goPrev} aria-label="Previous slide"
                                className="w-8 h-8 rounded-full border border-emerald-600 text-emerald-300
                                           flex items-center justify-center hover:bg-emerald-800 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <div className="flex gap-2">
                                {safeChallenges.map((_, i) => (
                                    <button key={i} aria-label={`Go to slide ${i + 1}`}
                                        onClick={() => goTo(i, i > index ? "next" : "prev")}
                                        className={`rounded-full transition-all duration-300 ${i === index
                                            ? "w-6 h-2.5 bg-emerald-300"
                                            : "w-2.5 h-2.5 bg-emerald-700 hover:bg-emerald-500"
                                            }`}
                                    />
                                ))}
                            </div>

                            <button onClick={goNext} aria-label="Next slide"
                                className="w-8 h-8 rounded-full border border-emerald-600 text-emerald-300
                                           flex items-center justify-center hover:bg-emerald-800 transition-colors duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <span className="text-xs text-emerald-500 font-mono ml-1">{index + 1}/{total}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Progress bar */}
            {total > 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-800/50">
                    <div key={index} className="h-full bg-emerald-400/60 rounded-full"
                        style={{ animation: "carousel-progress 5s linear" }} />
                </div>
            )}

            <style>{`
                @keyframes carousel-progress {
                    from { width: 0% }
                    to   { width: 100% }
                }
            `}</style>
        </div>
    );
};

export default FeaturedCarousel;