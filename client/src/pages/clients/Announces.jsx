import React, {useEffect, useState} from 'react';
import Box from '@mui/joy/Box';
import {Button, Typography} from "@mui/material";
import JobCard from "../../components/client/JobCard";
import JobModal from "../../components/client/jobs/JobModal";
import ClientApi from "../../api/ClientApi";
import {useQuery} from "react-query";
import {useAuth} from "../../context/UserProvider";

function Announces({user}) {
    const [modalOpen, setModalOpen] = useState(false)
    const handleOpen = () => setModalOpen(!modalOpen)
    const {data:userJobs=[],isLoading} = useQuery("userJobs",ClientApi.getJobs,{
        select: ((data) => data.data.filter((job) => job.userId._id === user._id))
    })
    const {setIsLoading} = useAuth()
    useEffect(() => {
        setIsLoading(isLoading)
    }, [isLoading, setIsLoading]);
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
                    {userJobs.length > 0 ? userJobs.map((job,key) => (
                        <JobCard key={key} job={job} user={user} />
                    )) : ""}
                </div>
            </div>
            <JobModal handleOpen={handleOpen} open={modalOpen} user={user} isUpdate={false} />
        </>
    );
}

export default Announces;