import * as React from 'react';
import {useNavigate} from "react-router-dom";
import displayImage from "../../utils/imageFromServer";
import Contact from "./worker-details/Contact";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import formatDate from "../../utils/formatDate";

export default function WorkerCard({ job }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col max-w-lg w-full h-full  mx-auto bg-white rounded-lg shadow-md p-3 ">
            {/* Profile Image */}
            <img
                className="w-32 h-32 rounded-full mx-auto cursor-pointer"
                onClick={() => navigate(`/worker/${job?._id}`)}
                src={displayImage("", job?.userId)}
                alt="Profile picture"
            />

            {/* Name and Category */}
            <h2
                className="text-center text-2xl font-semibold mt-3 cursor-pointer"
                onClick={() => navigate(`/worker/${job?._id}`)}
            >
                {job?.userId?.name}
            </h2>
            <p className="text-center text-gray-600 mt-1">{job?.category?.name}</p>

            {/*/!* Contact Icons *!/*/}
            {/*<div className="flex justify-center mt-5">*/}
            {/*    <Contact job={job} />*/}
            {/*</div>*/}

            {/* Bio Section */}
            <div className="mt-5 flex-grow">
                <h3 className="text-xl font-semibold">Bio</h3>
                <p className="text-sm text-gray-700 mb-2 line-clamp-3">{job?.description}</p>
            </div>

            {/* Footer (Location and Date) */}
            <div className="border-t-2 border-black mt-5"></div>
            <div className="mt-2 flex justify-between items-center text-sm">
                <span className="pr-2 flex items-center">
                    <LocationOnIcon fontSize="small" /> {job?.userId?.city}
                </span>
                <span className="flex items-center">
                    <AccessTimeFilledIcon fontSize="small" /> {formatDate(job?.createdAt)}
                </span>
            </div>
        </div>
    );
}
