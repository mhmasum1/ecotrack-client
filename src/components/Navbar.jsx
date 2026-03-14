import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logOut();
            setMenuOpen(false);
        } catch (err) {
            console.error("Logout error:", err.message);
        }
    };

    const navLinkClass = ({ isActive }) =>
        `relative text-sm font-medium tracking-wide transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:rounded-full after:bg-emerald-300 after:transition-all after:duration-300 ${isActive
            ? "text-emerald-300 after:w-full"
            : "text-emerald-100 hover:text-white after:w-0 hover:after:w-full"
        }`;

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-emerald-950/95 backdrop-blur-md shadow-lg shadow-emerald-950/40"
                    : "bg-emerald-900"
                    }`}
            >
                {/* Main navbar row */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* LEFT — Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 shrink-0 group"
                        >
                            {/* Leaf icon */}
                            <span className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors duration-200">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4 text-emerald-300"
                                >
                                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                                </svg>
                            </span>
                            <span className="text-xl font-bold">
                                <span className="text-white">Eco</span>
                                <span className="text-emerald-300">Track</span>
                            </span>
                        </Link>

                        {/* CENTER — Desktop Nav Links */}
                        <div className="hidden lg:flex items-center gap-8">
                            <NavLink to="/" className={navLinkClass} end>
                                Home
                            </NavLink>
                            <NavLink to="/challenges" className={navLinkClass}>
                                Challenges
                            </NavLink>
                            <NavLink to="/my-activities" className={navLinkClass}>
                                My Activities
                            </NavLink>
                        </div>

                        {/* RIGHT — Auth Buttons / Avatar */}
                        <div className="hidden lg:flex items-center gap-3">
                            {!user ? (
                                <>
                                    <Link
                                        to="/login"
                                        className="px-4 py-1.5 text-sm font-medium text-emerald-100 border border-emerald-600 rounded-full hover:bg-emerald-800 hover:border-emerald-400 transition-all duration-200"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-4 py-1.5 text-sm font-medium text-emerald-950 bg-emerald-400 rounded-full hover:bg-emerald-300 transition-all duration-200 shadow-sm shadow-emerald-500/30"
                                    >
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <UserMenu user={user} onLogout={handleLogout} />
                            )}
                        </div>

                        {/* Mobile: right side (avatar or hamburger) */}
                        <div className="flex lg:hidden items-center gap-2">
                            {user && <UserMenu user={user} onLogout={handleLogout} mobile />}
                            <button
                                onClick={() => setMenuOpen((v) => !v)}
                                className="p-2 rounded-lg text-emerald-200 hover:bg-emerald-800 transition-colors duration-200"
                                aria-label="Toggle menu"
                            >
                                {menuOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile dropdown menu */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="bg-emerald-950/95 backdrop-blur-md border-t border-emerald-800/50 px-4 py-4 space-y-1">
                        {[
                            { to: "/", label: "Home", end: true },
                            { to: "/challenges", label: "Challenges" },
                            { to: "/my-activities", label: "My Activities" },
                        ].map(({ to, label, end }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={end}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${isActive
                                        ? "bg-emerald-800/60 text-emerald-300"
                                        : "text-emerald-100 hover:bg-emerald-800/40 hover:text-white"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}

                        {!user && (
                            <div className="pt-3 flex gap-2 border-t border-emerald-800/50 mt-3">
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex-1 text-center px-4 py-2 text-sm font-medium text-emerald-100 border border-emerald-600 rounded-full hover:bg-emerald-800 transition-all duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex-1 text-center px-4 py-2 text-sm font-medium text-emerald-950 bg-emerald-400 rounded-full hover:bg-emerald-300 transition-all duration-200"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Spacer so page content doesn't hide under fixed navbar */}
            <div className="h-16" />
        </>
    );
};

/* ── UserMenu sub-component ── */
const UserMenu = ({ user, onLogout, mobile = false }) => {
    const [open, setOpen] = useState(false);

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        const close = (e) => {
            if (!e.target.closest("#user-menu")) setOpen(false);
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, [open]);

    const initial = user.displayName
        ? user.displayName.charAt(0).toUpperCase()
        : "U";

    return (
        <div className="relative" id="user-menu">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 focus:outline-none"
                aria-label="User menu"
            >
                <div className="w-9 h-9 rounded-full ring-2 ring-emerald-400 ring-offset-2 ring-offset-emerald-900 overflow-hidden flex items-center justify-center bg-emerald-700 text-sm font-semibold text-white">
                    {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" />
                    ) : (
                        <span>{initial}</span>
                    )}
                </div>
                {!mobile && (
                    <span className="hidden lg:block text-sm text-emerald-100 max-w-25 truncate">
                        {user.displayName || "User"}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-emerald-950 rounded-2xl shadow-xl border border-emerald-100 dark:border-emerald-800 z-50 overflow-hidden">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-emerald-100 dark:border-emerald-800">
                        <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100 truncate">
                            {user.displayName || "EcoTrack User"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-emerald-400 truncate mt-0.5">
                            {user.email}
                        </p>
                    </div>
                    {/* Menu items */}
                    <div className="py-1">
                        {[
                            { to: "/my-activities", label: "My Activities", icon: "📊" },
                            { to: "/challenges/add", label: "Add Challenge", icon: "➕" },
                        ].map(({ to, label, icon }) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-emerald-800 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900 transition-colors duration-150"
                            >
                                <span>{icon}</span>
                                {label}
                            </Link>
                        ))}
                        <div className="border-t border-emerald-100 dark:border-emerald-800 mt-1 pt-1">
                            <button
                                onClick={onLogout}
                                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors duration-150"
                            >
                                <span>🚪</span>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;