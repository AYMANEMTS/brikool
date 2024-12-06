import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import ClientApi from "../../../api/ClientApi";
import {useQueryClient} from "react-query";
import AuthModal from "../../auth/AuthModal";
import {useLoading} from "../../../context/LoadingProvider";
import {useTranslation} from "react-i18next";

const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function RatingComponent({ job }) {
    const [value, setValue] = useState(null);  // Initially null to avoid empty stars
    const [hover, setHover] = useState(-1);
    const {user} = useLoading()

    useEffect(() => {
        if (job && typeof job.averageRating === 'number') {
            setValue(job.averageRating); // Ensure it's a valid number
        } else {
            setValue(0); // Default to 0 if no average rating
        }
    }, [job]);

    const queryClient = useQueryClient()
    // Function to submit the rating to the backend
    const submitRating = async (newValue) => {
        try {
            const id = job._id;
            if (user){
                const response = await ClientApi.addRating(id, { userId: user._id, rating: newValue });
                if (response.status === 200) {
                    await queryClient.invalidateQueries(['job',job._id])
                }
            }
        } catch (err) {
            console.error("Error submitting rating:", err);
        }
    };

    const {t} = useTranslation('jobDetails')

    // Handle rating change
    const handleRatingChange = (newValue) => {
        if (job.userId._id === user._id){
            return window.alert(t('noRatingRight'))
        }
        setValue(newValue);
        submitRating(newValue); // Call the submit function
    };
    const [loginForm, setLoginForm] = useState(false)
    return (
        <>
            <Box sx={{ width: 'full', display: 'flex', alignItems: 'center' }}>
                <Rating
                    name="hover-feedback"
                    value={value || 0}  // Default to 0 to avoid empty stars
                    precision={1}  // Allows half-stars
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                        return user ? handleRatingChange(newValue) : setLoginForm(true)
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {value !== null && (
                    <Box sx={{ml: 2}}>{value}  ({job?.ratings?.length} reviews)</Box>
                )}
            </Box>
            <AuthModal open={loginForm} handleOpen={() => setLoginForm(!loginForm)} redirectRoute={"/worker/"+job._id} />
        </>
    );
}

export default RatingComponent;
