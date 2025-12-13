import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-center mb-2">
                    Forgot Password
                </h1>
                <p className="text-sm text-gray-600 mb-4 text-center">
                    For this assignment, password reset is not required.
                    Please login using Google or try again with your correct password.
                </p>

                <div className="flex justify-center gap-3 mt-4">
                    <Link to="/login" className="btn btn-sm btn-primary">
                        Back to Login
                    </Link>
                    <Link to="/" className="btn btn-sm btn-outline">
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
