import React, {useEffect, useState} from 'react';
import Box from '@mui/joy/Box';
import {Button, Typography} from "@mui/material";
import JobCard from "../../components/client/JobCard";
import JobModal from "../../components/client/jobs/JobModal";
import ClientApi from "../../api/ClientApi";
import {useQuery, useQueryClient} from "react-query";
import {useLoading} from "../../context/LoadingProvider";
import {useSearchParams} from "react-router-dom";

function Announces({user}) {
    const [modalOpen, setModalOpen] = useState(false)
    const {startLoading,stopLoading} = useLoading()
    const queryClient = useQueryClient();
    const cachedWorkers = queryClient.getQueryData('jobs')?.data || [];
    const { data:userJobs, isFetching   } = useQuery('jobs', ClientApi.getJobs, {
        initialData: cachedWorkers.length > 0 ? cachedWorkers : undefined,
        select: ((data) => data.data.filter((job) => job.userId._id === user._id)),
        refetchOnWindowFocus: false,
        retry: false,
        cacheTime: 5 * 60 * 1000,
        staleTime: 1000*60,
        onSuccess: () => stopLoading(),
        onError: () => stopLoading(),
    });
    const [searchParams] = useSearchParams()
    const handleOpen = () => setModalOpen(!modalOpen)
    const showForm = searchParams.get("showForm")
    useEffect(() => {
        if (showForm) {
            setModalOpen(true)
        }
    }, [showForm]);
    useEffect(() => {
        if (isFetching){
            startLoading()
        }
    }, [isFetching, startLoading]);
    return (
        <>
            <div className={"pb-5"}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 1,
                        mb: 2,
                        ml: 1,
                        // Add responsive breakpoints for flex-direction and spacing
                        flexDirection: { xs: 'column', sm: 'row' }, // Stack items vertically on small screens, horizontal on medium+
                    }}
                >
                    <Typography
                        variant={"h5"}
                        sx={{
                            fontSize: { xs: '1.25rem', md: '1.5rem' }, // Adjust font size responsively
                            fontWeight: 'bold',
                            mb: { xs: 1, sm: 0 }, // Add margin for spacing on smaller screens
                        }}
                    >
                        Your Announcement
                    </Typography>

                    <Button
                        size={"large"} onClick={handleOpen}
                        variant={"outlined"}
                        sx={{
                            // Responsive size and colors
                            width: { xs: '100%', sm: 'auto' }, // Button takes full width on small screens, auto on larger
                            mt: { xs: 1, sm: 0 }, // Add margin-top for small screens
                            '&:hover': {
                                backgroundColor: 'blue',
                                color: 'white',
                            },
                        }}
                    >
                        Create new Announces
                    </Button>
                </Box>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5  gap-3 ">
                    {/* Worker Card */}
                    {userJobs?.length > 0 ? userJobs?.map((job,key) => (
                        <JobCard key={key} job={job} user={user} />
                    )) : ""}
                </div>
            </div>
            <JobModal handleOpen={handleOpen} open={modalOpen} user={user} isUpdate={false} />
        </>
    );
}

export default Announces;