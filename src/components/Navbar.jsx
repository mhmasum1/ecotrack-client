import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const navLinks = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/challenges">Challenges</NavLink>
            </li>
            <li>
                <NavLink to="/my-activities">My Activities</NavLink>
            </li>
        </>
    );

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (err) {
            console.error("Logout error:", err.message);
        }
    };

    return (
        <div className="navbar bg-emerald-900 text-emerald-50">
            <div className="navbar-start">
                <div className="dropdown lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 `z-1` p-2 shadow bg-base-100 text-emerald-900 rounded-box w-52"
                    >
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    <span className="font-bold">Eco</span>
                    <span className="text-emerald-300 font-bold">Track</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navLinks}</ul>
            </div>
            <div className="navbar-end">
                {!user && (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-sm btn-outline">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-sm btn-primary">
                            Register
                        </Link>
                    </div>
                )}

                {user && (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-9 rounded-full ring ring-emerald-400 ring-offset-2 ring-offset-emerald-900">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt={user.displayName || "User"} />
                                ) : (
                                    <span className="flex items-center justify-center h-full w-full bg-emerald-700 text-sm font-semibold">
                                        {user.displayName
                                            ? user.displayName.charAt(0)
                                            : "U"}
                                    </span>
                                )}
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="mt-3 `z-1` p-2 shadow menu menu-sm dropdown-content bg-base-100 text-emerald-900 rounded-box w-52"
                        >
                            <li className="font-semibold px-2 py-1">
                                {user.displayName || "EcoTrack User"}
                            </li>
                            <li className="px-2 text-xs text-gray-500 mb-1">
                                {user.email}
                            </li>
                            <li>
                                <Link to="/my-activities">My Activities</Link>
                            </li>
                            <li>
                                <Link to="/challenges/add">Add Challenge</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
