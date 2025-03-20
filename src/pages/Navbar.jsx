import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center bg-gray-800 p-4 shadow-lg">
            <h1 className="text-white text-xl font-bold">Mi App</h1>
            <div className="flex space-x-4">
                <Button>
                    <Link to="/login" className="text-white">Login</Link>
                </Button>
                <Button>
                    <Link to="/register" className="text-white">Register</Link>
                </Button>
                <Button>
                    <Link to="/profile" className="text-white">Profile</Link>
                </Button>
                <Button>
                    <Link to="/auth" className="text-white">Auth</Link>
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
