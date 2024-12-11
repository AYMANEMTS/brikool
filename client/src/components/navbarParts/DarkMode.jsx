import React, { useState, useEffect } from 'react';
import sun from "../../images/sun-svgrepo-com.png";

function DarkMode() {
    const savedMode = localStorage.getItem("darkMode") === "true";
    const [darkMode, setDarkMode] = useState(savedMode);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    const darkModeHandler = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", newMode);
    };

    return (
        <button onClick={darkModeHandler}>
            {darkMode ? (
                <span
                    className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-500 transition duration-300"
                >
                    <img src={sun} alt="light mode" className="w-6 h-6" />
                </span>
            ) : (
                <span
                    className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-full bg-gray-200 hover:bg-blue-500 transition duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="size-6">
                        <path
                            d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
                        />
                    </svg>
                </span>
            )}
        </button>
    );
}

export default DarkMode;
