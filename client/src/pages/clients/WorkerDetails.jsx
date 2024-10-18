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
    return (
        <>
            <div className=" py-8">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <img
                            src={displayImage("",job?.userId)}
                            alt="Product"
                            className="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage"/>
                    </div>

                    <div className="w-full md:w-1/2 px-6">
                        <div className={"flex justify-between"}>
                            <h2 className="text-3xl font-bold mb-2">{job?.userId?.name}</h2>
                            <p className="text-gray-600 mb-4">{job?.category?.name}</p>
                        </div>
                        <div>
                            <span className={"pr-5"}><LocationOnIcon  fontSize={"small"}/> {job?.userId?.city}</span>
                            <span><AccessTimeFilledIcon fontSize={"small"} /> {formatDate(job?.createdAt)}</span>
                        </div>
                        <p className="text-gray-700 mb-6">{job?.description}</p>

                        <div className="flex items-center mb-4">
                            <RatingComponent job={job}  />
                        </div>

                        <Contact job={job} />
                    </div>
                </div>
                <Comments jobId={id} commentsData={job?.comments} />
                <AvailableWorkes/>
            </div>
        </>
    );
}

export default WorkerDetails;