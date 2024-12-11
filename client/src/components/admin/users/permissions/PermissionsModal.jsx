import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import PermissionsForm from "../Form/PermissionsForm";
import { useForm } from "react-hook-form";
import AdminApi from "../../../../api/AdminApi";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";

function PermissionsModal({ open, handleOpen, user }) {
    const { setValue, watch } = useForm();
    const permissions = watch("permissions");
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const savePermissions = async () => {
        try {
            await AdminApi.updatePermissions({ permissions }, user._id);
            handleOpen();
            await queryClient.invalidateQueries("users");
            enqueueSnackbar("Permissions updated", { variant: "success" });
        } catch (e) {
            enqueueSnackbar("Error while updating permissions", { variant: "error" });
            console.log(e);
        }
    };

    return (
        <Dialog open={open} handler={handleOpen} size="lg" className="p-4">
            <DialogHeader className="text-lg font-bold">Update Permissions</DialogHeader>
            <DialogBody divider>
                <PermissionsForm setValue={setValue} user={user} />
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="outlined"
                    color="blue-gray"
                    onClick={handleOpen}
                    className="mr-2"
                >
                    Cancel
                </Button>
                <Button
                    variant="filled"
                    color="blue"
                    onClick={savePermissions}
                    disabled={
                        (permissions &&
                            [...permissions].sort().join() === [...user?.permissions].sort().join()) ||
                        permissions?.length < 1
                    }
                >
                    Save
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default PermissionsModal;
