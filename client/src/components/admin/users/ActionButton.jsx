import * as React from 'react';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Edit from '@mui/icons-material/Edit';
import ViewListIcon from '@mui/icons-material/ViewList';
import SecurityIcon from '@mui/icons-material/Security';
import DeleteForever from '@mui/icons-material/DeleteForever';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import {useAdminContext} from "../../../context/AdminProvider";
import {useLoading} from "../../../context/LoadingProvider";
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
        <Dropdown>
            <MenuButton style={{width: "2rem"}} disabled={!isAuthorized(connectedUser, 'edit_users')}>
                <MoreVertIcon />
            </MenuButton>

            <Menu placement="bottom-end" >
                <MenuItem onClick={onEditRoleClick} >
                    <ListItemDecorator>
                        <Edit />
                    </ListItemDecorator>
                    Role
                </MenuItem>

                <MenuItem onClick={onPermissionsClick}>
                    <ListItemDecorator>
                        <SecurityIcon />
                    </ListItemDecorator>
                    Permissions
                </MenuItem>

                <MenuItem onClick={onDetailsClick}>
                    <ListItemDecorator>
                        <ViewListIcon />
                    </ListItemDecorator>
                    Details
                </MenuItem>

                <ListDivider />

                <MenuItem variant="soft" color="danger" onClick={onDeleteClick}>
                    <ListItemDecorator sx={{ color: 'inherit' }}>
                        <DeleteForever />
                    </ListItemDecorator>
                    Delete
                </MenuItem>
            </Menu>
        </Dropdown>
    );
}
