import React, { useState } from 'react';
import { Modal, ModalClose, ModalDialog, Option, Select } from "@mui/joy";
import { Typography } from "@mui/material";
import Button from "@mui/joy/Button";
import AdminApi from "../../../api/AdminApi";
import { useQueryClient } from "react-query";
import { useSnackbar } from "notistack";

function RoleModal({ open, handleOpen, user }) {
    const [newRole, setNewRole] = useState(user.role || null);
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const changeRole = async () => {
        try {
            if (newRole !== user?.role) {
                await AdminApi.editRole(user._id, { role: newRole });
                await queryClient.invalidateQueries('users');
                enqueueSnackbar("Role updated successfully", { variant: "success" });
            }
            handleOpen();
        } catch (e) {
            enqueueSnackbar("Failed to change role", { variant: "error" });
            handleOpen();
            console.error(e);
        }
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ModalDialog
                    sx={{
                        width: '100%',
                        maxWidth: 700,
                        padding: 2,
                        '@media (max-width: 600px)': {
                            width: '90%',
                            maxWidth: 'none',
                        },
                    }}
                >
                    <ModalClose variant="plain" sx={{ margin: -1 }} />
                    <Typography align="center" variant="h6" id="modal-desc">
                        Change Role for {user?.name}
                    </Typography>
                    <div className="flex space-x-2">
                        <Select
                            defaultValue={user.role}
                            sx={{ width: '100%' }}
                            onChange={(e, v) => setNewRole(v)}
                        >
                            <Option value="admin">Admin</Option>
                            <Option value="moderator">Moderator</Option>
                            <Option value="client">Client</Option>
                        </Select>
                        <Button
                            onClick={changeRole}
                            disabled={newRole === user?.role}
                            variant="solid"
                            color="primary"
                        >
                            Save
                        </Button>
                    </div>
                </ModalDialog>
            </Modal>
        </>
    );
}

export default RoleModal;
