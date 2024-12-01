import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import ViewListIcon from '@mui/icons-material/ViewList';
import SecurityIcon from '@mui/icons-material/Security';
import DeleteForever from '@mui/icons-material/DeleteForever';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';

export default function ActionButton({user,togglePermissionsModal,toggleDetailsModal,setSelectedUser,toggleDeletesModal}) {
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
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{
                root: {
                    sx: { backgroundColor: 'blue', '&:hover': { backgroundColor: 'darkblue' } },},
                }} >
                <MoreVert sx={{ color: 'white' }} />
            </MenuButton>
            <Menu placement="bottom-end" >
                <MenuItem>
                    <ListItemDecorator>
                        <Edit />
                    </ListItemDecorator>
                    Edit
                </MenuItem>

                <MenuItem disabled={user.role !== 'moderator'} onClick={onPermissionsClick}>
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
