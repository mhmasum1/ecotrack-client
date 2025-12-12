import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const { signInUser, signInGoogle, setLoading } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleEmailLogin = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSubmitting(true);

        signInUser(email, password)
            .then(() => {
                navigate(from, { replace: true });
            })
            .catch((err) => {
                setErrorMsg(err.message);
            })
            .finally(() => {
                setSubmitting(false);
                setLoading(false);
            });
    };

    const handleGoogleLogin = () => {
        setErrorMsg("");
        setSubmitting(true);

        signInGoogle()
            .then(() => {
                navigate(from, { replace: true });
            })
            .catch((err) => {
                setErrorMsg(err.message);
            })
            .finally(() => {
                setSubmitting(false);
                setLoading(false);
            });
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-center mb-2">Login to EcoTrack</h1>
                <p className="text-sm text-center text-gray-500 mb-4">
                    Sign in with your email or Google account.
                </p>

                {errorMsg && (
                    <p className="text-error text-xs mb-2 text-center">{errorMsg}</p>
                )}

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
