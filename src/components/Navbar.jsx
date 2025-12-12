import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const navLinkClass = ({ isActive }) =>
        `px-3 py-1 rounded-md text-sm font-medium ${isActive
            ? "bg-emerald-600 text-white"
            : "text-emerald-50 hover:bg-emerald-700 hover:text-white"
        }`;

    return (
        <div className="navbar bg-emerald-900 text-emerald-50 px-4 md:px-8">
            <div className="navbar-start">
                <Link
                    to="/"
                    className="btn btn-ghost normal-case text-xl font-bold tracking-wide"
                >
                    <span className="text-emerald-200">Eco</span>
                    <span className="text-emerald-400">Track</span>
                </Link>
            </div>

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

            <div className="navbar-end gap-2">
                {!user && (
                    <>
                        <Link to="/login" className="btn btn-sm btn-outline">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-sm btn-primary">
                            Register
                        </Link>
                    </>
                )}

                {user && (
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-sm btn-ghost flex items-center gap-2"
                        >
                            {user.photoURL && (
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            )}
                            <span className="hidden md:inline text-sm">
                                {user.displayName || user.email}
                            </span>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 `z-50` p-2 shadow bg-emerald-900 rounded-box w-52"
                        >
                            <li>
                                <Link to="/my-activities">My Activities</Link>
                            </li>
                            <li>
                                <button onClick={logOut}>Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
