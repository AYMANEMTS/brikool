import React from 'react';
import { useNavigate } from "react-router-dom";
import displayImage from "../../utils/imageFromServer";
import formatDate from "../../utils/formatDate";
import { useTranslation } from "react-i18next";
import { MapPin, Clock8, MessageCircle } from "lucide-react";
import {Avatar} from "@material-tailwind/react";

export default function WorkerCard({ job }) {
    const navigate = useNavigate();
    const { t: tAnnounces, i18n } = useTranslation('announces');
    const { language: lng } = i18n;
    return (
        <div className="flex flex-col max-w-md w-full h-full mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
            {/* Profile Section */}
            <div className="flex flex-col items-center">
                <Avatar size={"xxl"} src={displayImage("", job?.userId)} className={"border-2  cursor-pointer border-teal-blue dark:border-bright-yellow"}
                onClick={() => navigate(`/worker/${job._id}`)}/>
                <h2
                    className="text-xl font-bold text-teal-blue dark:text-bright-yellow mt-3 hover:underline cursor-pointer"
                    onClick={() => navigate(`/worker/${job?._id}`)}
                >
                    {job?.userId?.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{job?.category?.name?.[lng]}</p>
            </div>

            {/* Description Section */}
            <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-teal-blue dark:text-bright-yellow mb-2">
                    {tAnnounces('description')}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                    {job?.description}
                </p>
            </div>

            {/* Footer Section */}
            <div className="mt-6 border-t border-gray-300 dark:border-gray-600 pt-4">
                <div className={"flex flex-col items-center justify-center text-gray-700"}>
                    <span className="flex items-center gap-1 text-teal-blue dark:text-bright-yellow">
                        <MapPin className="w-4 h-4 "/>
                        {job?.userId?.city?.[lng]}
                    </span>
                    <span className="flex items-center gap-1 text-teal-blue dark:text-bright-yellow">
                        <Clock8 className="w-4 h-4 "/>
                            {formatDate(job?.createdAt)}
                    </span>
                </div>

                {/* Comments and Ratings Section */}
                <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-teal-blue dark:text-bright-yellow"/>
                        <span
                            className="text-sm text-gray-700 dark:text-gray-300">{job?.comments?.length || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-6">
                            <path className={"fill-yellow-500 w-5 h-5"} fillRule="evenodd"
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                  clipRule="evenodd"/>
                        </svg>

                        <span className="text-sm text-gray-700 dark:text-gray-300">{job?.averageRating || 0} / 5</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
