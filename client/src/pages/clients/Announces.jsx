import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import JobCard from "../../components/client/JobCard";
import JobModal from "../../components/client/jobs/JobModal";
import { useLoading } from "../../context/LoadingProvider";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useClientContext } from "../../context/ClientProvider";

function Announces() {
    const { user } = useLoading();
    const [modalOpen, setModalOpen] = useState(false);
    const { userJobs } = useClientContext();
    const [searchParams] = useSearchParams();
    const handleOpen = () => setModalOpen(!modalOpen);
    const showForm = searchParams.get("showForm");

    useEffect(() => {
        if (showForm) {
            setModalOpen(true);
        }
    }, [showForm]);

    const { t } = useTranslation('announces');

    return (
        <>
            <div className={"pb-5"}>
                <div className="flex justify-between items-center flex-wrap gap-3 mb-5">
                    <Typography
                        variant="h5"
                        className="font-bold text-xl sm:text-2xl"
                    >
                        {t('yourAnnouncement')}
                    </Typography>

                    <Button
                        size="sm"
                        onClick={handleOpen}
                        variant="outlined"
                        className="sm:w-auto w-full mt-3 sm:mt-0 sm:text-base text-sm hover:bg-blue-600 hover:text-white"
                    >
                        {t('createNewAnnounces')}
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3">
                    {/* Worker Card */}
                    {userJobs?.length > 0 ? userJobs?.map((job, key) => (
                        <JobCard key={key} t={t} job={job} user={user} />
                    )) : ""}
                </div>
            </div>

            <JobModal handleOpen={handleOpen} open={modalOpen} user={user} isUpdate={false} />
        </>
    );
}

export default Announces;
