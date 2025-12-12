import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{ padding: "10px 20px", background: "#0f766e", color: "white" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link to="/" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}>
                    EcoTrack
                </Link>

                <div style={{ display: "flex", gap: "15px" }}>
                    <NavLink
                        to="/"
                        style={({ isActive }) => ({
                            color: isActive ? "#facc15" : "white",
                            textDecoration: "none",
                        })}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/challenges"
                        style={({ isActive }) => ({
                            color: isActive ? "#facc15" : "white",
                            textDecoration: "none",
                        })}
                    >
                        Challenges
                    </NavLink>

                    <NavLink
                        to="/my-activities"
                        style={({ isActive }) => ({
                            color: isActive ? "#facc15" : "white",
                            textDecoration: "none",
                        })}
                    >
                        My Activities
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
