import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold text-emerald-800">404</h1>
                <p className="text-lg text-gray-600">
                    Oops! The page you are looking for does not exist.
                </p>
                <Link to="/" className="btn btn-primary mt-2">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
