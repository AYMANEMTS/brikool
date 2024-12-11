import React, { useState } from "react";
import {Dialog, DialogHeader, DialogBody, DialogFooter, Button, Select, Option} from "@material-tailwind/react";
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
                await queryClient.invalidateQueries("users");
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
        <Dialog open={open} handler={handleOpen} size="lg" className="p-4">
            <DialogHeader className="text-center text-lg font-bold">
                Change Role for {user?.name}
            </DialogHeader>
            <DialogBody divider>
                <div className="flex flex-col space-y-4">
                    <Select
                        value={newRole}
                        onChange={(e) => setNewRole(e)}
                        className="w-full"
                        label="Select Role"
                    >
                        <Option disabled={user.role === 'admin'} value="admin">Admin</Option>
                        <Option disabled={user.role === 'moderator'} value="moderator">Moderator</Option>
                        <Option disabled={user.role === 'client'} value="client">Client</Option>
                    </Select>
                </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    onClick={handleOpen}
                    variant="outlined"
                    color="blue-gray"
                    className="mr-2"
                >
                    Cancel
                </Button>
                <Button
                    onClick={changeRole}
                    disabled={newRole === user?.role}
                    variant="filled"
                    color="blue"
                >
                    Save
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default RoleModal;
