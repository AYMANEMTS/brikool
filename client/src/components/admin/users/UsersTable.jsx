import React, { useState } from 'react';
import {Avatar, Card, Typography} from "@material-tailwind/react";
import displayImage from "../../../utils/imageFromServer";
import ActionButton from './ActionButton';
import PermissionsModal from "./permissions/PermissionsModal";
import DetailsModal from "./details/DetailsModal";
import DeleteModal from "./DeleteModal";
import {useNavigate} from "react-router-dom";
import {useLoading} from "../../../context/LoadingProvider";
import RoleModal from "./RoleModal";
import {useTranslation} from "react-i18next";


const TABLE_HEAD = ["User","Email","Role", "City","Jobs","Action"];

function UsersTable({ users }) {
    const [permissionModal, setPermissionModal] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [roleModal, setRoleModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    const togglePermissionsModal = () => setPermissionModal(!permissionModal);
    const toggleDetailsModal = () => setDetailsModal(!detailsModal);
    const toggleDeletesModal = () => setDeleteModal(!deleteModal);
    const toggleRoleModal = () => setRoleModal(!roleModal);

    const navigate = useNavigate();
    const {user: connectedUser} = useLoading()

    const {i18n} = useTranslation();
    const {language:lng} = i18n

    return (
        <>
            <Card className="h-full w-full overflow-scroll px-6">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-gray-300 pb-4 pt-10">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold leading-none"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {users
                        ?.filter(user => user?._id !== connectedUser?._id)
                        ?.map((user, index) => {
                        const isLast = index === users.length - 1;
                        const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

                        return (
                            <tr key={user?._id} className="hover:bg-gray-50">
                                <td className={classes}>
                                    <div className={"flex items-center space-x-2"}>
                                        <Avatar src={displayImage("", user)}/>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold"
                                        >
                                            {user?.name}
                                        </Typography>
                                    </div>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        className="font-normal text-gray-600"
                                    >
                                        {user?.email}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        className="font-normal text-gray-600"
                                    >
                                        {user?.role}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        className="font-normal text-gray-600"
                                    >
                                        {user?.city?.[lng]}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    {user.role === 'client' && user.jobs_count > 0 ? (
                                        <span onClick={() => navigate(`/admin/jobs?userId=${user._id}`)}
                                              className="underline cursor-pointer text-blue-500 hover:text-blue-800">
                                            {user.jobs_count}
                                        </span>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td className={classes}>
                                    <ActionButton user={user} setSelectedUser={setSelectedUser}
                                                  toggleDeletesModal={toggleDeletesModal}
                                                  toggleRoleModal={toggleRoleModal}
                                                  toggleDetailsModal={toggleDetailsModal}
                                                  togglePermissionsModal={togglePermissionsModal}/>
                                </td>
                            </tr>
                    );
                    })}
                    </tbody>
                </table>
            </Card>
            {/* Modals */}
            <PermissionsModal
                open={permissionModal}
                handleOpen={togglePermissionsModal}
                user={selectedUser}
            />
            <DetailsModal lng={lng}
                open={detailsModal}
                handleOpen={toggleDetailsModal}
                user={selectedUser}
            />
            <DeleteModal
                open={deleteModal}
                handleOpen={toggleDeletesModal}
                user={selectedUser}
            />
            <RoleModal
                open={roleModal}
                handleOpen={toggleRoleModal}
                user={selectedUser}
            />
        </>
    );
}

export default UsersTable;
