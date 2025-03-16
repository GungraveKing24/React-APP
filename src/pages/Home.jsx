import { Link } from "react-router-dom";
import React from "react";

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>Home</h1>
            <Link to="/about">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ir a About</button>
            </Link>
        </div>
    );
}

export default Home;
