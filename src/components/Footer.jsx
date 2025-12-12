import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-emerald-900 text-base-100 mt-10">
            {/* main footer */}
            <div className="footer p-10 max-w-6xl mx-auto">
                {/* Brand */}
                <aside>
                    <span className="text-2xl font-bold tracking-wide">
                        EcoTrack
                    </span>
                    <p className="text-sm mt-2 max-w-xs">
                        Track your eco-friendly journey and join sustainability challenges
                        to make our planet greener, together. 🌱
                    </p>
                </aside>

                {/* Quick Links */}
                <nav>
                    <h6 className="footer-title">Quick Links</h6>
                    <Link to="/" className="link link-hover">
                        Home
                    </Link>
                    <Link to="/challenges" className="link link-hover">
                        Challenges
                    </Link>
                    <Link to="/my-activities" className="link link-hover">
                        My Activities
                    </Link>
                </nav>

                {/* Contact */}
                <nav>
                    <h6 className="footer-title">Contact</h6>
                    <p className="text-sm">Email: support@ecotrack.com</p>
                    <p className="text-sm">Phone: +880-1234-567890</p>
                </nav>
            </div>

            {/* bottom bar */}
            <div className="border-t border-emerald-700">
                <div className="max-w-6xl mx-auto px-4 py-3 text-center text-xs text-emerald-100">
                    © {new Date().getFullYear()} EcoTrack. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
