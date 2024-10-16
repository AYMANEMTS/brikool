import React, { useEffect, useState } from 'react';
import FiltterSecion from "../../components/client/workers-page/FiltterSecion";
import { Pagination } from "@mui/material";
import WorkerCard from "../../components/client/WorkerCard";
import { useQuery } from "react-query";
import ClientApi from "../../api/ClientApi";
import { useAuth } from "../../context/UserProvider";

function Workers() {
    // Fetch workers data from the API
    const { data: workers = [], isLoading } = useQuery("allJobs", ClientApi.getJobs, {
        select: (data => data.data)
    });

    const { setIsLoading } = useAuth();
    useEffect(() => {
        setIsLoading(isLoading);
    }, [isLoading, setIsLoading]);

    // Initialize filtered jobs state
    const [filtredJobS, setFiltredJobS] = useState(workers);

    // Update filtredJobS whenever workers data changes
    useEffect(() => {
        setFiltredJobS(workers);
    }, [workers]);

    return (
        <>
            {/* Filter section */}
            <FiltterSecion
                setFiltredJobS={setFiltredJobS}
                jobs={workers}
                filtredJobS={filtredJobS}
            />

            {/* Workers List */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-4">
                {/* Worker Card */}
                {filtredJobS.map((job, key) => (
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
