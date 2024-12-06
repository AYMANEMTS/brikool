import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {TextField} from "@mui/material";
import ClientApi from "../../../api/ClientApi";
import formatDate from "../../../utils/formatDate";
import {useQueryClient} from "react-query";
import AuthModal from "../../auth/AuthModal";
import {useLoading} from "../../../context/LoadingProvider";
import {useTranslation} from "react-i18next";
import displayImage from "../../../utils/imageFromServer";

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
            <div className="container mt-2 ">
                {job?.comments?.length > 0 && <span className={"text-xl font-semibold p-4 mb-2"}>{t('comments')}</span>}
                    <div className="space-y-4">
                        {job?.comments?.slice(0,commentsCount)?.map((item,key) => (
                            <div className="bg-white p-4 mt-3 rounded-lg shadow" key={key}>
                                <div className="flex items-center mb-2">
                                    <img src={displayImage("",item?.userId)} alt="User Avatar"
                                         className="w-10 h-10 rounded-full mr-3"/>
                                    <div>
                                        <h3 className="font-semibold">{item?.userId?.name}</h3>
                                        <p className="text-sm text-gray-500">{formatDate(item?.createdAt)}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 line-clamp-3">{item?.comment}</p>
                                {/*<div className="flex items-center mt-2">*/}
                                {/*    <button className="text-red-500 hover:text-red-700 mr-2">*/}
                                {/*        <FavoriteBorderIcon/>*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </div>
                        ))}
                        {/* Buttons for Showing More or Less */}
                        <div className="flex justify-center mt-4 space-x-4">
                            {/* Show More Button */}
                            {commentsCount < (job?.comments?.length || 0) && (
                                <button
                                    onClick={() => incrementCommentsCount(job?.comments?.length)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    {t('showMore')}
                                </button>
                            )}

                            {/* Show Less Button */}
                            {commentsCount > 4 && (
                                <button
                                    onClick={decrementCommentsCount}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                                >
                                    {t('showLess')}
                                </button>
                            )}
                        </div>
                    </div>

                    {/*// <!-- Add Comment Form -->*/}
                    <form className="mt-2 bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">{t('addComment')}</h3>
                        <div className="mb-4">
                        <TextField {...register('comment', {
                                    required: {value: true, message: tValidation('requiredField')},
                                    maxLength: {value: 500, message: tValidation('maxLength',{field:t('comment'),min:1,max:500})},
                                    minLength: {value: 1, message: tValidation('maxLength',{field:t('comment'),min:1,max:500})}
                                })}
                                           label={t('comment')}
                                           fullWidth
                                           multiline
                                           rows={5}
                                           variant="outlined"
                                           error={!!errors.comment}
                                           helperText={errors.comment ? errors.comment.message : ''}
                                />
                            </div>
                            <button type="submit" onClick={handleSubmit(handleComment)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                {t('postComment')}
                            </button>
                        </form>
                </div>
            <AuthModal open={loginForm} handleOpen={() => setLoginForm(!loginForm)} redirectRoute={"/worker/" + jobId}
                       swapState={false}/>
        </>
    );
}

export default Comments;
