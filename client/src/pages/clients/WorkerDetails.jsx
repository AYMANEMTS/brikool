import React, {useEffect} from 'react';
import AvailableWorkers from "../../components/client/home-page/AvailableWorkers";
import {useNavigate, useParams} from "react-router-dom";
import ClientApi from "../../api/ClientApi";
import Contact from "../../components/client/worker-details/Contact";
import formatDate from "../../utils/formatDate";
import Comments from "../../components/client/worker-details/Comments";
import RatingComponent from "../../components/client/worker-details/RatingComponent";
import {useQuery} from "react-query";
import displayImage from "../../utils/imageFromServer";
import {useLoading} from "../../context/LoadingProvider";
import {useTranslation} from "react-i18next";
import {MapPin, Clock8, ChartBarStacked} from 'lucide-react'

function WorkerDetails() {
    const {id} = useParams()
    const navigate = useNavigate()
    const {startLoading,stopLoading} = useLoading()
    const {data:job={},isFetching} = useQuery(['job',id], () =>  ClientApi.getJob(id),{
        select: (data => data?.data?.job),
        retry: false,
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
    const {t,i18n} = useTranslation('home')
    const {language:lng} = i18n
    return (
        <>
            <div className="px-4 py-6">
                <div
                    className="flex flex-col md:flex-row items-center justify-between bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-gray-700">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <img
                            src={displayImage("", job?.userId)}
                            alt="Worker Image"
                            className="w-80 h-80 object-cover rounded-lg"
                        />
                    </div>

                    <div className="w-full md:w-2/3 md:pl-6">
                        <h2 className="text-2xl font-semibold text-teal-blue dark:text-white">{job?.userId?.name}</h2>
                        <br />
                        <div className="text-lg text-gray-500 dark:text-gray-300 flex items-center space-x-2 mb-2">
                            <MapPin className={"h-6 w-6 text-teal-blue"}/>
                            <span className="text-gray-700 pl-1 dark:text-gray-200">
                                {job?.userId?.city?.[lng]}
                            </span>
                        </div>

                        <div className="text-lg text-gray-500 dark:text-gray-300 flex items-center space-x-2 mb-2">
                            <ChartBarStacked className={"h-6 w-6 text-teal-blue"}/>
                            <span className="text-gray-700 pl-1 dark:text-gray-200">
                                {job?.category?.name?.[lng]}
                            </span>
                        </div>

                        <div className="text-lg text-gray-500 dark:text-gray-300 flex items-center space-x-2 mb-2">
                            <Clock8 className={"h-6 w-6 text-teal-blue"}/>
                            <span className="text-gray-700 pl-1 dark:text-gray-200">
                                {formatDate(job?.createdAt)}
                            </span>
                        </div>

                        <p className="mt-4 text-gray-800 dark:text-gray-400">
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
                <Comments job={job} jobId={id}/>
            </div>
            <AvailableWorkers t={t}/>
        </>
    );
}

export default WorkerDetails;