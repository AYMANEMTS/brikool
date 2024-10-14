import React from 'react';

function FiltterSecion() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
            <h2 className="text-2xl font-semibold mb-4">Filter Workers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="city" className="block text-gray-600 mb-2">Select City</label>
                    <select id="city" className="block w-full p-2 border border-gray-300 rounded-lg">
                        <option value="">All Cities</option>
                        <option value="city1">City 1</option>
                        <option value="city2">City 2</option>
                        {/* Add more cities here */}
                    </select>
                </div>
                <div>
                    <label htmlFor="category" className="block text-gray-600 mb-2">Select Category</label>
                    <select id="category" className="block w-full p-2 border border-gray-300 rounded-lg">
                        <option value="">All Categories</option>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        {/* Add more categories here */}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default FiltterSecion;