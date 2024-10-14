import React, {useState} from 'react';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import {Chip} from "@mui/joy";
import formatDate from "../../utils/formatDate";
import displayImage from "../../utils/imageFromServer";
import ChangeStatus from "./jobs/ChangeStatus";
import JobModal from "./jobs/JobModal";
import DeleteJobDialog from "./jobs/DeleteJobDialog";

function JobCard({ job,user }) {
    const jobStatus = (status) => {
        switch (status) {
            case "active":
                return "inactive";
            case "inactive":
                return "active";
            case "suspend":
                return "suspend";
            default:
                return ""
        }
    }
    const jobStatusVariant = (status) => {
        switch (status) {
            case "active":
                return "success";
            case "inactive":
                return "warning";
            case "suspended":
                return "danger";
            default:
                return ""
        }
    }
    const [statusDialog, setStatusDialog] = useState(false)
    const [updateForm, setUpdateForm] = useState(false)
    const handleDialog = () => setStatusDialog(!statusDialog)
    const [deleteDialog, setDeleteDialog] = useState(false)
    return (
        <>
            <div className="relative p-4 border border-gray-200 rounded-lg shadow-lg bg-white">
                <div className="flex items-center justify-between gap-4 mb-2">
                    <img
                        src={displayImage("", job.userId)}
                        alt="tania andrew"
                        className="w-12 h-12 rounded-full object-cover object-center"
                    />
                    <Dropdown>
                        <MenuButton
                            slots={{root: IconButton}}
                            slotProps={{root: {variant: 'outlined', color: 'neutral'}}}
                        >
                            <MoreVert/>
                        </MenuButton>
                        <Menu>
                            <MenuItem onClick={() => setUpdateForm(!updateForm)}>Edit</MenuItem>
                            <MenuItem disabled={job?.status === "suspended"}
                                      onClick={handleDialog}
                            >{jobStatus(job?.status)}</MenuItem>
                            <MenuItem onClick={() => setDeleteDialog(!deleteDialog)}>Delete</MenuItem>
                        </Menu>
                    </Dropdown>
                </div>
                <div className="flex justify-between">
                    <div className="text-base font-medium text-blue-gray-900">{job?.category?.name}</div>
                    <div>
                        <Chip color={jobStatusVariant(job?.status)}>{job?.status}</Chip>
                    </div>
                </div>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">{job?.description}</p>
                <div className="flex items-center gap-8 pt-4 mt-6 border-t border-gray-200">
                    <span className={"text-sm text-gray-700"}>{formatDate(job?.createdAt)}</span>
                </div>
            </div>
            <ChangeStatus open={statusDialog} handleDialog={handleDialog} job={job}/>
            <JobModal handleOpen={() => setUpdateForm(!updateForm)} open={updateForm} user={user} isUpdate={true} job={job}/>
            <DeleteJobDialog handleDialog={() => setDeleteDialog(!deleteDialog)} open={deleteDialog} job={job} />
        </>

    );
}

export default JobCard;
