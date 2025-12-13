import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { signInUser, signInGoogle } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleEmailLogin = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            await signInUser(email, password);
            toast.success("Login successful ✅");
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Invalid email or password");
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setSubmitting(true);
            await signInGoogle();
            toast.success("Logged in with Google ✅");
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Google login failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-center mb-2">
                    Login to EcoTrack
                </h1>
                <p className="text-sm text-center text-gray-500 mb-4">
                    Sign in with your email or Google account.
                </p>

                <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                            <Link
                                to="/forgot-password"
                                className="label-text-alt link link-hover"
                            >
                                Forgot password?
                            </Link>
                        </label>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-2"
                        disabled={submitting}
                    >
                        {submitting ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="divider">OR</div>

                <button
                    className="btn btn-outline w-full"
                    onClick={handleGoogleLogin}
                    disabled={submitting}
                >
                    Continue with Google
                </button>

                <p className="text-sm text-center mt-4">
                    New to EcoTrack?{" "}
                    <Link to="/register" className="link link-primary">
                        Join now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
