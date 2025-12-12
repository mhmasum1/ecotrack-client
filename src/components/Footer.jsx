import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer
            style={{
                background: "#065f46",
                color: "white",
                padding: "30px 0",
                marginTop: "40px",
            }}
        >
            <div
                className="container"
                style={{
                    width: "90%",
                    maxWidth: "1100px",
                    margin: "0 auto",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >
                {/* Brand */}
                <div style={{ flex: "1 1 250px", marginBottom: "20px" }}>
                    <h2 style={{ fontWeight: "bold", marginBottom: "10px" }}>EcoTrack</h2>
                    <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
                        Track your eco-friendly journey and join sustainability challenges to make our planet greener, together. 🌱
                    </p>
                </div>

                {/* Quick Links */}
                <div style={{ flex: "1 1 150px", marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "18px", marginBottom: "12px" }}>Quick Links</h3>
                    <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
                        <li>
                            <Link to="/" style={{ color: "#bbf7d0", textDecoration: "none" }}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/challenges"
                                style={{ color: "#bbf7d0", textDecoration: "none" }}
                            >
                                Challenges
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/my-activities"
                                style={{ color: "#bbf7d0", textDecoration: "none" }}
                            >
                                My Activities
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div style={{ flex: "1 1 200px", marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "18px", marginBottom: "12px" }}>Contact</h3>
                    <p style={{ margin: "4px 0", fontSize: "14px" }}>
                        Email: support@ecotrack.com
                    </p>
                    <p style={{ margin: "4px 0", fontSize: "14px" }}>
                        Phone: +880-1234-567890
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div
                style={{
                    borderTop: "1px solid #0d9488",
                    marginTop: "20px",
                    padding: "10px 0",
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#d1fae5",
                }}
            >
                © {new Date().getFullYear()} EcoTrack. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
