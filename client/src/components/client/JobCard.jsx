import React, {useState} from 'react';
import formatDate from "../../utils/formatDate";
import displayImage from "../../utils/imageFromServer";
import ChangeStatus from "./jobs/ChangeStatus";
import JobModal from "./jobs/JobModal";
import DeleteJobDialog from "./jobs/DeleteJobDialog";
import {useTranslation} from "react-i18next";
import {Menu,IconButton, MenuHandler, MenuList, MenuItem, Chip} from "@material-tailwind/react";
import {EllipsisVertical} from 'lucide-react';

function JobCard({ job, user, t }) {
    const jobStatus = (status) => {
        switch (status) {
            case "active":
                return t('inactive');
            case "inactive":
                return t('active');
            case "suspend":
                return t('suspended');
            default:
                return ""
        }
    }
    const jobStatusVariant = (status) => {
        switch (status) {
            case "active":
                return "green";
            case "inactive":
                return "amber";
            case "suspended":
                return "red";
            default:
                return ""
        }
    }
    const [statusDialog, setStatusDialog] = useState(false)
    const [updateForm, setUpdateForm] = useState(false)
    const handleDialog = () => setStatusDialog(!statusDialog)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const {i18n} = useTranslation()
    const {language:lng} = i18n
    return (
        <>
            <div
                className="relative p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between gap-4 mb-2">
                    <img
                        src={displayImage("", job.userId)}
                        alt="tania andrew"
                        className="w-12 h-12 rounded-full object-cover object-center"
                    />

                    <Menu>
                        <MenuHandler>
                            <IconButton>
                                <EllipsisVertical />
                            </IconButton>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem onClick={() => setUpdateForm(!updateForm)}>{t('edit')}</MenuItem>
                            <MenuItem disabled={job?.status === "suspended"} onClick={handleDialog}>
                                {jobStatus(job?.status)}
                            </MenuItem>
                            <MenuItem onClick={() => setDeleteDialog(!deleteDialog)}>{t('delete')}</MenuItem>
                        </MenuList>
                    </Menu>


                </div>
                <div className="flex justify-between mb-1">
                    <div className="text-base font-medium text-blue-gray-900 dark:text-gray-100">
                        {job?.category?.name?.[lng]}
                    </div>
                    <div>
                        <Chip color={jobStatusVariant(job?.status)} value={t(job?.status)} size={"sm"}/>
                    </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{job?.description}</p>
                <div className="flex items-center gap-8 pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{formatDate(job?.createdAt)}</span>
                </div>
            </div>
            <ChangeStatus t={t} open={statusDialog} handleDialog={handleDialog} job={job}/>
            <JobModal handleOpen={() => setUpdateForm(!updateForm)} open={updateForm} user={user} isUpdate={true} job={job}/>
            <DeleteJobDialog t={t} handleDialog={() => setDeleteDialog(!deleteDialog)} open={deleteDialog} job={job} />
        </>

    );
}

export default JobCard;
