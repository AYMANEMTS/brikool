import * as React from 'react';
import {Menu, MenuHandler, MenuList, MenuItem, IconButton} from "@material-tailwind/react";
import {useAdminContext} from "../../../context/AdminProvider";
import {useLoading} from "../../../context/LoadingProvider";
import {EllipsisVertical, Pencil, Eye, ShieldCheck, Trash2} from 'lucide-react'


export default function ActionButton({user,togglePermissionsModal,toggleDetailsModal,setSelectedUser,toggleDeletesModal,toggleRoleModal}) {
    const onPermissionsClick = () => {
        setSelectedUser(user)
        togglePermissionsModal()
    }
    const onDetailsClick = () => {
        setSelectedUser(user)
        toggleDetailsModal()
    }
    const onDeleteClick = () => {
        setSelectedUser(user)
        toggleDeletesModal()
    }
    const onEditRoleClick = () => {
        setSelectedUser(user)
        toggleRoleModal()
    }
    const {isAuthorized} = useAdminContext()
    const {user: connectedUser} = useLoading()
    return (
        <Menu>
            <MenuHandler>
                <IconButton disabled={!isAuthorized(connectedUser, 'edit_users')}>
                    <EllipsisVertical />
                </IconButton>
            </MenuHandler>
            <MenuList>
                <MenuItem onClick={onEditRoleClick}>
                    <div className={"flex items-center space-x-2 "}>
                        <Pencil />
                        <span>Role</span>
                    </div>
                </MenuItem>
                {user.role === 'moderator' && (
                    <MenuItem onClick={onPermissionsClick}>
                        <div className={"flex items-center space-x-2 "}>
                            <ShieldCheck />
                            <span>Permissions</span>
                        </div>
                    </MenuItem>
                )}
                <MenuItem onClick={onDetailsClick}>
                    <div className={"flex items-center space-x-2 "}>
                        <Eye />
                        <span>Details</span>
                    </div>
                </MenuItem>

                <MenuItem onClick={onDeleteClick}>
                    <div className={"flex items-center space-x-2 "}>
                        <Trash2 />
                        <span>Delete</span>
                    </div>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
