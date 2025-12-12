import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const navLinkClass = ({ isActive }) =>
        `px-3 py-1 rounded-md text-sm font-medium ${isActive
            ? "bg-emerald-600 text-white"
            : "text-emerald-50 hover:bg-emerald-700 hover:text-white"
        }`;

    return (
        <div className="navbar bg-emerald-900 text-emerald-50 px-4 md:px-8">
            {/* Left: Brand + Mobile Menu */}
            <div className="navbar-start">
                {/* Mobile dropdown */}
                <div className="dropdown">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost lg:hidden"
                        aria-label="Open navigation menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-emerald-900 rounded-box w-52"
                    >
                        <li>
                            <NavLink to="/" className={navLinkClass}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/challenges" className={navLinkClass}>
                                Challenges
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/my-activities" className={navLinkClass}>
                                My Activities
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Brand */}
                <Link
                    to="/"
                    className="btn btn-ghost normal-case text-xl font-bold tracking-wide"
                >
                    <span className="text-emerald-200">Eco</span>
                    <span className="text-emerald-400">Track</span>
                </Link>
            </div>

            {/* Center: Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-1 px-1">
                    <li>
                        <NavLink to="/" className={navLinkClass}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/challenges" className={navLinkClass}>
                            Challenges
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/my-activities" className={navLinkClass}>
                            My Activities
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Right: Placeholder for Login/Profile */}
            <div className="navbar-end">
                <button className="btn btn-sm md:btn-md btn-outline border-emerald-300 text-emerald-50 hover:bg-emerald-500 hover:border-emerald-500">
                    Login
                </button>
            </div>
        </div>
    );
};

export default Navbar;
