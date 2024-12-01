import React, {useState} from 'react';
import displayImage from "../../../utils/imageFromServer";
import Tooltip from "@mui/joy/Tooltip";
import {Chip, Dropdown, IconButton, Menu, MenuButton, MenuItem} from "@mui/joy";
import MoreVert from "@mui/icons-material/MoreVert";
import formatDate from "../../../utils/formatDate";
import ChangeStatusModal from "./ChangeStatusModal";
import DeleteJobModal from "./DeleteJobModal";

function JobCard({job,calculateAverageRating}) {
    const [changeStatusModal, setChangeStatusModal] = useState(false)
    const [deleteJobModal, setDeleteJobModal] = useState(false)
    const [newStatus, setNewStatus] = useState(null)
    const changeStatus = (status) => {
        setNewStatus(status)
        setChangeStatusModal(true)
    }

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
                        <Tooltip title={job.userId.name} placement="top">
                                            <span className="font-medium text-gray-700 truncate max-w-[120px] block">
                                                {job?.userId?.name}
                                            </span>
                        </Tooltip>
                    </div>
                    <Dropdown>
                        <MenuButton
                            slots={{root: IconButton}}
                            slotProps={{root: {variant: 'outlined', color: 'neutral'}}}
                        >
                            <MoreVert/>
                        </MenuButton>
                        <Menu>
                            {job?.status === 'suspended' && (
                                <MenuItem onClick={() => changeStatus("active")}>Active</MenuItem>
                            )}
                            <MenuItem onClick={() => changeStatus("suspended")}>Suspend</MenuItem>
                            <MenuItem onClick={() => setDeleteJobModal(true)}>Delete</MenuItem>
                        </Menu>
                    </Dropdown>
                </div>

                <div className="flex justify-between items-center mb-2">
                    {/* Category */}
                    <div className="text-base font-medium text-blue-gray-900">{job?.category?.name}</div>

                    {/* Status */}
                    <div>
                        <Chip color={
                            job.status === 'active' ? 'success' : job.status === "inactive" ? 'warning' : 'danger'
                        }>{job?.status}</Chip>
                    </div>
                </div>
                {/* City */}
                <div className="text-sm text-gray-700 border-b pb-2 border-gray-200">{job?.userId?.city}</div>


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
            <ChangeStatusModal open={changeStatusModal} toggleModal={() => setChangeStatusModal(!changeStatusModal)} jobId={job._id} newStatus={newStatus} />
            <DeleteJobModal toggleModal={() => setDeleteJobModal(!deleteJobModal)} jobId={job._id} open={deleteJobModal} />
        </>
    );
}

export default JobCard;