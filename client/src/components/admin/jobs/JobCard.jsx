import React, {useState} from 'react';
import displayImage from "../../../utils/imageFromServer";
import { Menu, MenuHandler, MenuList, MenuItem, Chip, Tooltip, IconButton } from "@material-tailwind/react";
import formatDate from "../../../utils/formatDate";
import ChangeStatusModal from "./ChangeStatusModal";
import DeleteJobModal from "./DeleteJobModal";
import {useLoading} from "../../../context/LoadingProvider";
import {useAdminContext} from "../../../context/AdminProvider";
import {useTranslation} from "react-i18next";
import {EllipsisVertical} from 'lucide-react'
function JobCard({job,calculateAverageRating}) {
    const [changeStatusModal, setChangeStatusModal] = useState(false)
    const [deleteJobModal, setDeleteJobModal] = useState(false)
    const [newStatus, setNewStatus] = useState(null)
    const changeStatus = (status) => {
        setNewStatus(status)
        setChangeStatusModal(true)
    }
    const {user} = useLoading()
    const {isAuthorized} = useAdminContext()

    const {i18n} = useTranslation()
    const {language:lng} = i18n

    return (
        <>
            <div className="relative p-4 border border-gray-200 rounded-lg shadow-lg bg-white">
                <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center space-x-2">
                        <img
                            src={displayImage('', job?.userId)}
                            alt={job?.userId?.name}
                            className="w-10 h-10 object-cover rounded-full"
                        />
                        <Tooltip content={job.userId?.name} placement="top">
                            <span onClick={() => window.open(`http://localhost:3000/worker/${job._id}`, "_blank")}
                                className="cursor-pointer font-medium text-gray-700 truncate max-w-[120px] block">
                                {job?.userId?.name}
                            </span>
                        </Tooltip>
                    </div>
                    <Menu>
                        <MenuHandler>
                            <IconButton size={"sm"} variant={"outlined"}>
                                <EllipsisVertical />
                            </IconButton>
                        </MenuHandler>
                        <MenuList>
                            {(job?.status === 'suspended' || job?.status === 'inactive') && (
                                <MenuItem disabled={!isAuthorized(user,'edit_jobs')} onClick={() => changeStatus("active")}>
                                    Active
                                </MenuItem>
                            )}
                            {(job?.status !== 'suspended' && job?.status !== 'inactive') && (
                                <MenuItem disabled={!isAuthorized(user,'edit_jobs')} onClick={() => changeStatus("suspended")}>
                                    Suspend
                                </MenuItem>
                            )}
                            <MenuItem disabled={!isAuthorized(user,'delete_jobs')} onClick={() => setDeleteJobModal(true)}>Delete</MenuItem>
                            <MenuItem onClick={() => window.open(`http://localhost:3000/worker/${job._id}`, '_blank')}>
                                View
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>

                <div className="flex justify-between items-center mb-2">
                    {/* Category */}
                    <div className="text-base font-medium text-blue-gray-900">{job?.category?.name?.[lng]}</div>

                    {/* Status */}
                    <div>
                        <Chip size={"sm"} value={job?.status} color={
                            job.status === 'active' ? 'green' : job.status === "inactive" ? 'amber' : 'red'
                        } />
                    </div>
                </div>
                {/* City */}
                <div className="text-sm text-gray-700 border-b pb-2 border-gray-200">{job?.userId?.city?.[lng]}</div>


                {/* Description */}
                <p className="text-sm text-gray-700 mb-4 pt-2 line-clamp-3">{job?.description}</p>

                <div className="flex justify-between items-center pt-4 mt-6 border-t border-gray-200">
                    {/* Reviews */}
                    <div className="flex items-center gap-1">
                        <span className="text-sm text-yellow-500">⭐</span>
                        <span className="text-sm text-gray-700">{calculateAverageRating(job?.ratings)}</span>
                    </div>

                    {/* Date */}
                    <div className="text-sm text-gray-700">{formatDate(job?.createdAt)}</div>
                </div>
            </div>
            <ChangeStatusModal open={changeStatusModal} toggleModal={() => setChangeStatusModal(!changeStatusModal)} jobId={job?._id} newStatus={newStatus} />
            <DeleteJobModal toggleModal={() => setDeleteJobModal(!deleteJobModal)} jobId={job?._id} open={deleteJobModal} />
        </>
    );
}

export default JobCard;