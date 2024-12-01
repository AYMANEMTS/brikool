import React, { useState } from 'react';
import Table from '@mui/joy/Table';
import Tooltip from '@mui/joy/Tooltip';
import displayImage from "../../../utils/imageFromServer";
import ActionButton from './ActionButton';
import PermissionsModal from "./permissions/PermissionsModal";
import DetailsModal from "./details/DetailsModal";
import DeleteModal from "./DeleteModal";
import {useNavigate} from "react-router-dom";

function UsersTable({ users }) {
    const [permissionModal, setPermissionModal] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    const togglePermissionsModal = () => setPermissionModal(!permissionModal);
    const toggleDetailsModal = () => setDetailsModal(!detailsModal);
    const toggleDeletesModal = () => setDeleteModal(!deleteModal);

    const navigate = useNavigate();
    return (
        <>
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <Table
                    sx={{
                        '& th': {
                            backgroundColor: '#f3f4f6',
                            fontSize: '0.875rem',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            padding: '12px',
                        },
                        '& td': {
                            padding: '16px',
                            fontSize: '0.875rem',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                        },
                        '& tbody tr:hover': {
                            backgroundColor: '#f9fafb',
                        },
                        '& tr > *:not(:first-of-type)': {
                            textAlign: 'right',
                        },
                    }}
                    size="lg"
                    hoverRow
                >
                    <thead>
                    <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>City</th>
                        <th>Jobs</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users?.map((user, key) => (
                        <tr key={key}>
                            {/* User Info */}
                            <td style={{ width: '15%' }} className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src={displayImage('', user)}
                                        alt={user.name}
                                        className="w-10 h-10 object-cover rounded-full"
                                    />
                                    <Tooltip title={user.name} placement="top">
                                            <span className="font-medium text-gray-700 truncate max-w-[120px] block">
                                                {user.name}
                                            </span>
                                    </Tooltip>
                                </div>
                            </td>

                            {/* Email */}
                            <td style={{ width: '40%' }} className="px-6 py-4 font-semibold">
                                <Tooltip title={user.email} placement="top">
                                        <span className="text-gray-600 truncate max-w-[180px] block">
                                            {user.email}
                                        </span>
                                </Tooltip>
                            </td>

                            {/* Role */}
                            <td style={{ width: '10%' }} className="px-6 py-4 font-semibold">
                                {user.role}
                            </td>

                            {/* City */}
                            <td style={{ width: '10%' }} className="px-6 py-4 font-semibold">
                                {user.city}
                            </td>

                            {/* Jobs */}
                            <td style={{ width: '10%' }} className="px-6 py-4 font-semibold">
                                {user.role === 'client' && user.jobs_count > 0 ? (
                                    <span onClick={() => navigate(`/admin/jobs?userId=${user._id}`)}
                                        className="underline cursor-pointer text-blue-500 hover:text-blue-800">
                                            {user.jobs_count}
                                        </span>
                                ) : (
                                    '-'
                                )}
                            </td>

                            {/* Action */}
                            <td style={{ width: '15%' }} className="px-6 py-4 text-center">
                                <ActionButton
                                    togglePermissionsModal={togglePermissionsModal}
                                    toggleDetailsModal={toggleDetailsModal}
                                    user={user}
                                    setSelectedUser={setSelectedUser}
                                    toggleDeletesModal={toggleDeletesModal}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>

            {/* Modals */}
            <PermissionsModal
                open={permissionModal}
                handleOpen={togglePermissionsModal}
                user={selectedUser}
            />
            <DetailsModal
                open={detailsModal}
                handleOpen={toggleDetailsModal}
                user={selectedUser}
            />
            <DeleteModal
                open={deleteModal}
                handleOpen={toggleDeletesModal}
                user={selectedUser}
            />
        </>
    );
}

export default UsersTable;
