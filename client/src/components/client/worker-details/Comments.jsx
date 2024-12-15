import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import ClientApi from "../../../api/ClientApi";
import formatDate from "../../../utils/formatDate";
import {useQueryClient} from "react-query";
import AuthModal from "../../auth/AuthModal";
import {useLoading} from "../../../context/LoadingProvider";
import {useTranslation} from "react-i18next";
import displayImage from "../../../utils/imageFromServer";
import {Button, Textarea} from "@material-tailwind/react";

function Comments({jobId,job={}}) {
    const {user} = useLoading()
    const {register,handleSubmit,reset,formState:{errors}} = useForm({defaultValues:{
            userId: user ? user._id : null,
            comment: ""
        }})
    const queryClient = useQueryClient()
    const {t} = useTranslation("jobDetails");
    const handleComment = async (data) => {
        try {
            if (!user){
                return setLoginForm(true)
            }
            if (job.userId._id === user._id){
                return window.alert(t('noCommentRight'))
            }
            await ClientApi.addComment(jobId,data).catch(e => console.error(e))
            await queryClient.invalidateQueries(['job', jobId])
            reset()
        }catch (e) {
            console.error(e)
        }
    }
    const [loginForm, setLoginForm] = useState(false)
    const [commentsCount, setCommentsCount] = useState(4);
    const incrementCommentsCount = (commentsLength) => {
        if (commentsCount < commentsLength) {
            setCommentsCount((prev) => Math.min(prev + 4, commentsLength));
        }
    };
    const decrementCommentsCount = () => {
        if (commentsCount > 4) {
            setCommentsCount((prev) => Math.max(prev - 4, 4));
        }
    };
    const {t:tValidation} = useTranslation("validation");

    return (
        <>
            <div className="container mt-8">
                {job?.comments?.length > 0 && (
                    <span
                        className="text-xl font-semibold p-4 mb-2 text-gray-800 dark:text-white">{t('comments')}</span>
                )}
                <div className="space-y-4">
                    {job?.comments?.slice(0, commentsCount)?.map((item, key) => (
                        <div className="bg-gray-200 dark:bg-gray-800 p-4 mt-3 rounded-lg shadow dark:shadow-gray-700"
                             key={key}>
                            <div className="flex items-center mb-2">
                                <img
                                    src={displayImage("", item?.userId)}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <h3 className="font-semibold text-teal-blue dark:text-white">{item?.userId?.name}</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">{formatDate(item?.createdAt)}</p>
                                </div>
                            </div>
                            <p className="text-gray-800 text-md  dark:text-gray-300 line-clamp-3">{item?.comment}</p>
                            {/* <div className="flex items-center mt-2"> */}
                            {/*    <button className="text-red-500 hover:text-red-700 mr-2"> */}
                            {/*        <FavoriteBorderIcon/> */}
                            {/*    </button> */}
                            {/* </div> */}
                        </div>
                    ))}

                    {/* Buttons for Showing More or Less */}
                    <div className="flex justify-center mt-4 space-x-4">
                        {/* Show More Button */}
                        {commentsCount < (job?.comments?.length || 0) && (
                            <Button onClick={() => incrementCommentsCount(job?.comments?.length)}>
                                {t('showMore')}
                            </Button>
                        )}

                        {/* Show Less Button */}
                        {commentsCount > 4 && (
                            <Button
                                onClick={decrementCommentsCount}
                                className="bg-gray-500 text-white hover:text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                {t('showLess')}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Add Comment Form */}
                <form className="mt-2 bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow dark:shadow-gray-700">
                    <h3 className="text-lg font-semibold mb-2 text-teal-blue dark:text-bright-yellow">{t('addComment')}</h3>
                    <div className="mb-4">

                        <Textarea label={t('comment')} error={errors.comment} {...register('comment', {
                            required: {value: true, message: tValidation('requiredField')},
                            maxLength: {
                                value: 500,
                                message: tValidation('maxLength', {field: t('comment'), min: 1, max: 500}),
                            },
                            minLength: {
                                value: 1,
                                message: tValidation('maxLength', {field: t('comment'), min: 1, max: 500}),
                            },
                        })}></Textarea>
                        {errors.comment && (
                            <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
                        )}
                    </div>
                    <Button type="submit" onClick={handleSubmit(handleComment)}>
                        {t('postComment')}
                    </Button>
                </form>
            </div>
            <AuthModal open={loginForm} handleOpen={() => setLoginForm(!loginForm)} redirectRoute={"/worker/" + jobId}
                       swapState={false}/>
        </>
    );
}

export default Comments;
