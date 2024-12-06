import React, {useEffect} from 'react';
import AvailableWorkes from "../../components/client/home-page/AvailableWorkers";
import {useNavigate, useParams} from "react-router-dom";
import ClientApi from "../../api/ClientApi";
import Contact from "../../components/client/worker-details/Contact";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import formatDate from "../../utils/formatDate";
import Comments from "../../components/client/worker-details/Comments";
import RatingComponent from "../../components/client/worker-details/RatingComponent";
import {useQuery} from "react-query";
import displayImage from "../../utils/imageFromServer";
import {useLoading} from "../../context/LoadingProvider";
import CategoryIcon from '@mui/icons-material/Category';
import {useTranslation} from "react-i18next";

function WorkerDetails() {
    const {id} = useParams()
    const navigate = useNavigate()
    const {startLoading,stopLoading} = useLoading()
    const {data:job={},isFetching} = useQuery(['job',id], () =>  ClientApi.getJob(id),{
        select: (data => data?.data?.job),
        retry: false,
        refetchOnWindowFocus: false,
        onError:(err => {
            stopLoading()
            navigate("/")
        }),
        onSuccess: () => stopLoading()
    })
    useEffect(() => {
        if (isFetching){
            startLoading()
        }
    }, [isFetching,startLoading]);
    const {t} = useTranslation('home')
    return (
        <>
            <div className=" px-4 py-6">
                <div
                    className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-lg">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <img
                            src={displayImage("", job?.userId)}
                            alt="Worker Image"
                            className="w-80 h-80 object-cover rounded-lg"
                        />
                    </div>

                    <div className="w-full md:w-2/3 md:pl-6">
                        <h2 className="text-2xl font-semibold text-gray-800">{job?.userId?.name}</h2>

                        <p className="text-lg text-gray-500">
                            <LocationOnIcon/>
                            <span className="text-gray-700 pl-1">
                                {job?.userId?.city}
                            </span>
                        </p>

                        <p className="text-lg text-gray-500">
                            <CategoryIcon/>
                            <span className="text-gray-700 pl-1">
                                {job?.category?.name}
                            </span>
                        </p>

                        <p className="text-lg text-gray-500">
                            <AccessTimeFilledIcon />
                            <span className="text-gray-700 pl-1">
                                {formatDate(job?.createdAt)}
                            </span>
                        </p>

                        <p className="mt-4 text-gray-600">
                            {job?.description}
                        </p>

                        <div className="flex items-center mt-4">
                            <RatingComponent job={job}/>
                        </div>

                        <div className="flex space-x-4 mt-6">
                            <Contact job={job}/>
                        </div>
                    </div>
                </div>

                <div className="mt-10 bg-white rounded-lg shadow-lg p-3">
                    <Comments job={job} jobId={id} />
                </div>
            </div>
            <AvailableWorkes t={t} />
        </>
    );
}

export default WorkerDetails;