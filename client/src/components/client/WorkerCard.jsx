import React from 'react';
import { useNavigate } from "react-router-dom";
import displayImage from "../../utils/imageFromServer";
import formatDate from "../../utils/formatDate";
import { useTranslation } from "react-i18next";
import { MapPin, Clock8 } from "lucide-react";

export default function WorkerCard({ job }) {
    const navigate = useNavigate();
    const { t: tAnnounces, i18n } = useTranslation('announces');
    const { language: lng } = i18n;

    return (
        <div className="flex flex-col max-w-lg w-full h-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 transition-all duration-300">
            {/* Profile Image */}
            <img
                className="w-32 h-32 rounded-full mx-auto cursor-pointer border-4 border-teal-blue hover:border-teal-blue transition-all"
                onClick={() => navigate(`/worker/${job?._id}`)}
                src={displayImage("", job?.userId)}
                alt="Profile picture"
            />

            {/* Name and Category */}
            <h2
                className="text-center text-2xl font-semibold mt-3 cursor-pointer text-teal-blue dark:text-bright-yellow hover:text-teal-blue dark:hover:text-white transition-colors"
                onClick={() => navigate(`/worker/${job?._id}`)}
            >
                {job?.userId?.name}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mt-1">{job?.category?.name?.[lng]}</p>

            {/* Bio Section */}
            <div className="mt-5 flex-grow">
                <h3 className="text-xl font-semibold text-teal-blue dark:text-bright-yellow">{tAnnounces('description')}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-3">{job?.description}</p>
            </div>

            {/* Footer (Location and Date) */}
            <div className="border-t-2 border-gray-300 dark:border-gray-600 mt-5"></div>
            <div className="mt-2 flex flex-wrap justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="pr-2 flex items-center truncate max-w-xs sm:max-w-sm md:max-w-md">
                    <MapPin fontSize="small" className="w-4 h-4 text-teal-blue dark:text-bright-yellow"/>
                    {job?.userId?.city?.[lng]}
                </span>
                <span className="flex items-center truncate max-w-xs sm:max-w-sm md:max-w-md">
                    <Clock8 fontSize="small" className="h-4 w-4 text-teal-blue dark:text-bright-yellow"/>
                    {formatDate(job?.createdAt)}
                </span>
            </div>
        </div>
    );
}
