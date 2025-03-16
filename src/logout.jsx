import React, { useState } from "react";
import axios from "axios";

const Logout = () => {
    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:8000/logout");
            window.location.href = "/"; // Redirige a la página de inicio
        } catch (error) {
            console.error("Error logging out", error);
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
