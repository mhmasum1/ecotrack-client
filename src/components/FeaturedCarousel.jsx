import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedCarousel = ({ challenges }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!challenges.length) return;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % challenges.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [challenges]);

    if (!challenges.length) return null;

    const ch = challenges[index];

    return (
        <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
                <h1 className="text-4xl font-bold text-white mb-4">
                    {ch.title}
                </h1>
                <p className="text-emerald-100 mb-6">
                    {ch.description}
                </p>
                <Link
                    to={`/challenges/${ch._id}`}
                    className="btn btn-primary"
                >
                    View Challenge
                </Link>
            </div>

            <img
                src={ch.imageUrl}
                alt={ch.title}
                className="rounded-2xl shadow-lg max-h-[320px] object-cover"
            />
        </div>
    );
};

export default FeaturedCarousel;
