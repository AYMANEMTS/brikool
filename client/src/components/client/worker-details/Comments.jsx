import React, {useState} from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useForm} from "react-hook-form";
import {TextField} from "@mui/material";
import ClientApi from "../../../api/ClientApi";
import formatDate from "../../../utils/formatDate";
import {useQueryClient} from "react-query";
import AuthModal from "../../auth/AuthModal";
import {useLoading} from "../../../context/LoadingProvider";

function Comments({jobId,job={}}) {
    const {user} = useLoading()
    const {register,handleSubmit,reset,formState:{errors}} = useForm({defaultValues:{
            userId: user ? user._id : null,
            comment: ""
        }})
    const queryClient = useQueryClient()
    const handleComment = async (data) => {
        try {
            if (!user){
                return setLoginForm(true)
            }
            if (job.userId._id === user._id){
                return window.alert("You don't have right to comment on your announcement")
            }
            await ClientApi.addComment(jobId,data).catch(e => console.error(e))
            await queryClient.invalidateQueries(['job', jobId])
            reset()
        }catch (e) {
            console.error(e)
        }
    }
    const [loginForm, setLoginForm] = useState(false)
    return (
        <>
            <section className=" py-8">
                <div className="container ">
                    <h2 className="text-2xl font-bold mb-4">Customer Comments</h2>

                    <div className="space-y-4">
                        {job?.comments?.map((item,key) => (
                            <div className="bg-white p-4 rounded-lg shadow" key={key}>
                                <div className="flex items-center mb-2">
                                    <img src="https://via.placeholder.com/40" alt="User Avatar"
                                         className="w-10 h-10 rounded-full mr-3"/>
                                    <div>
                                        <h3 className="font-semibold">{item?.userId?.name}</h3>
                                        <p className="text-sm text-gray-500">{formatDate(item?.createdAt)}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">{item?.comment}</p>
                                <div className="flex items-center mt-2">
                                    <button className="text-red-500 hover:text-red-700 mr-2">
                                        <FavoriteBorderIcon/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/*// <!-- Add Comment Form -->*/}
                    <form className="mt-8 bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>
                            <div className="mb-4">
                                <TextField {...register('comment', {
                                    required: {value: true, message: "This Field Is Required"},
                                    maxLength: {value: 500, message: "Comment must be between 1 and 500 characters"},
                                    minLength: {value: 1, message: "Comment must be between 1 and 500 characters"}
                                })}
                                           label="Comment"
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
                                Post Comment
                            </button>
                        </form>
                </div>
            </section>
            <AuthModal open={loginForm} handleOpen={() => setLoginForm(!loginForm)} redirectRoute={"/worker/" + jobId}
                       swapState={false}/>
        </>
    );
}

export default Comments;
