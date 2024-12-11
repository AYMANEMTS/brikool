import React, { useState, useEffect } from 'react';
import ClientApi from "../../../api/ClientApi";
import { useQueryClient } from "react-query";
import AuthModal from "../../auth/AuthModal";
import { useLoading } from "../../../context/LoadingProvider";
import { useTranslation } from "react-i18next";

const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function RatingComponent({ job }) {
    const [value, setValue] = useState(null); // Initially null to avoid empty stars
    const [hover, setHover] = useState(-1);
    const { user } = useLoading();

    useEffect(() => {
        if (job && typeof job.averageRating === 'number') {
            setValue(job.averageRating); // Ensure it's a valid number
        } else {
            setValue(0); // Default to 0 if no average rating
        }
    }, [job]);

    const queryClient = useQueryClient();
    // Function to submit the rating to the backend
    const submitRating = async (newValue) => {
        try {
            const id = job._id;
            if (user) {
                const response = await ClientApi.addRating(id, { userId: user._id, rating: newValue });
                if (response.status === 200) {
                    await queryClient.invalidateQueries(['job', job._id]);
                }
            }
        } catch (err) {
            console.error("Error submitting rating:", err);
        }
    };

    const { t } = useTranslation('jobDetails');

    // Handle rating change
    const handleRatingChange = (newValue) => {
        if (job.userId._id === user._id) {
            return window.alert(t('noRatingRight'));
        }
        setValue(newValue);
        submitRating(newValue); // Call the submit function
    };

    const [loginForm, setLoginForm] = useState(false);

    return (
        <>
            <div className="flex items-center space-x-2">
                {/* Star rating component using Tailwind */}
                <div className="flex space-x-1">
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        const isFilled = ratingValue <= value;
                        const isHovered = ratingValue <= hover;

                        return (
                            <svg
                                key={ratingValue}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-6 h-6 cursor-pointer ${isFilled || isHovered ? 'text-yellow-500' : 'text-gray-300'}`}
                                fill={isFilled ? "currentColor" : "none"}
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(-1)}
                                onClick={() => (user ? handleRatingChange(ratingValue) : setLoginForm(true))}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 5l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7l3-7z"
                                />
                            </svg>
                        );
                    })}
                </div>
                {/* Rating text */}
                {value !== null && (
                    <div className="ml-2 text-sm text-gray-700">
                        {value} ({job?.ratings?.length} reviews)
                    </div>
                )}
            </div>

            {/* AuthModal to prompt user login if not logged in */}
            <AuthModal
                open={loginForm}
                handleOpen={() => setLoginForm(!loginForm)}
                redirectRoute={`/worker/${job._id}`}
            />
        </>
    );
}

export default RatingComponent;
