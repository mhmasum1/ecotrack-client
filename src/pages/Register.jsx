import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const { registerUser, signInGoogle, updateUserProfile } = useAuth();

    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [passwordError, setPasswordError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const validatePassword = (value) => {
        if (value.length < 6) return "Password must be at least 6 characters";
        if (!/[A-Z]/.test(value)) return "At least one uppercase letter required";
        if (!/[a-z]/.test(value)) return "At least one lowercase letter required";
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
            return "At least one special character required";
        return "";
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(validatePassword(value));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const err = validatePassword(password);
        if (err) {
            setPasswordError(err);
            return;
        }

        try {
            setSubmitting(true);

            await registerUser(email, password);
            await updateUserProfile(name, photoURL);

            toast.success("Account created successfully ✅");
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Registration failed");
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            setSubmitting(true);
            await signInGoogle();
            toast.success("Signed in with Google ✅");
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Google sign-in failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-center mb-2">Join EcoTrack</h1>
                <p className="text-sm text-center text-gray-500 mb-4">
                    Create your account and start tracking your sustainable journey.
                </p>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL (optional)</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            placeholder="https://..."
                        />
                    </div>

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
                        </label>
                        <input
                            type="password"
                            className={`input input-bordered w-full ${passwordError ? "input-error" : ""}`}
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        {passwordError && (
                            <span className="text-xs text-error mt-1">{passwordError}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-2"
                        disabled={submitting}
                    >
                        {submitting ? "Creating account..." : "Register"}
                    </button>
                </form>

                <div className="divider">OR</div>

                <button
                    className="btn btn-outline w-full"
                    onClick={handleGoogleRegister}
                    disabled={submitting}
                >
                    Continue with Google
                </button>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="link link-primary">
                        Login
                    </Link>
                </p>

                <p className="text-xs text-gray-500 text-center mt-2">
                    By registering, you agree to EcoTrack’s community guidelines.
                </p>
            </div>
        </div>
    );
};

export default Register;
