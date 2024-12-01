import React, { useEffect, useState } from 'react';
import FiltterSecion from "../../components/client/workers-page/FiltterSecion";
import { Pagination } from "@mui/material";
import WorkerCard from "../../components/client/WorkerCard";
import {useQuery, useQueryClient} from "react-query";
import ClientApi from "../../api/ClientApi";

function Workers() {
    // const {startLoading, stopLoading} = useLoading()
    const queryClient = useQueryClient();
    const cachedWorkers = queryClient.getQueryData('jobs')?.data || [];
    const [workers, setWorkers] = useState(cachedWorkers || []);

    const { data } = useQuery('jobs', ClientApi.getJobs, {
        initialData: cachedWorkers.length > 0 ? cachedWorkers : undefined,
        select: (response) => response.data,
        refetchOnWindowFocus: false,
        retry: false,
        cacheTime: 5 * 60 * 1000,
        staleTime: 1000*60,
    });

    useEffect(() => {
        if (data && data.length > 0) {
            setWorkers(data);
        }
    }, [data]);


    const [filtredJobS, setFiltredJobS] = useState(workers);

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
