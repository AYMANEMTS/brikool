import React, { useEffect, useState } from 'react';
import FiltterSecion from "../../components/client/workers-page/FiltterSecion";
import WorkerCard from "../../components/client/WorkerCard";
import {useClientContext} from "../../context/ClientProvider";

function Workers() {
    const {workers} = useClientContext()
    const [filtredJobS, setFiltredJobS] = useState(workers);

    useEffect(() => {
        setFiltredJobS(workers);
    }, [workers]);
    return (
        <div className={"mt-20 md:mt-0"}>
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


        </div>
    );
}

export default Workers;
