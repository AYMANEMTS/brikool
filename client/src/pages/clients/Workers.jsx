import React, {useEffect} from 'react';
import FiltterSecion from "../../components/client/workers-page/FiltterSecion";
import {Pagination} from "@mui/material";
import WorkerCard from "../../components/client/WorkerCard";
import {useQuery} from "react-query";
import ClientApi from "../../api/ClientApi";
import {useAuth} from "../../context/UserProvider";

function Workers() {
    const {data:workers=[],isLoading} = useQuery("allJobs",ClientApi.getJobs,{
        select: (data => data.data)
    })
    const {setIsLoading} = useAuth()
    useEffect(() => {
        setIsLoading(isLoading)
    }, [isLoading, setIsLoading]);
    return (
        <>
            <FiltterSecion />
            {/* Workers List */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4  gap-4 ">
                {/* Worker Card */}
                {workers.map((job,key) => (
                    <div key={key} className={"m2"}>
                        <WorkerCard job={job} />
                    </div>
                ))}
            </div>
            <div className={"flex justify-center my-6"}>
                <Pagination count={10} />
            </div>

        </>
    );
}

export default Workers;