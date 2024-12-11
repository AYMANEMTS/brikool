import React from "react";

function Spinner({ open }) {
    if (!open) return null; // Do not render the spinner if it's not open

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-t-solid border-white rounded-full animate-spin"></div>
        </div>
    );
}

export default Spinner;
