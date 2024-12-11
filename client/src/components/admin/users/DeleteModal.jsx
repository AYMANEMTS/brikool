import React from "react";
import {Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography} from "@material-tailwind/react";
import AdminApi from "../../../api/AdminApi";
import { useQueryClient } from "react-query";
import { useSnackbar } from "notistack";
import {TriangleAlert} from 'lucide-react'

function DeleteModal({ open, handleOpen, user }) {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const deleteCallback = async () => {
        try {
            await AdminApi.deleteUser(user._id);
            await queryClient.invalidateQueries("users");
            await queryClient.invalidateQueries("jobs");
            handleOpen();
            enqueueSnackbar("User Deleted", { variant: "success" });
        } catch (e) {
            enqueueSnackbar("Failed to delete user", { variant: "error" });
            console.log(e);
        }
    };

    return (
        <Dialog open={open} handler={handleOpen} size="sm" className="p-4">
            <DialogHeader className="text-center flex items-center gap-2">
                <TriangleAlert  className="h-6 w-6 text-red-500" />
                <Typography variant="h6" className="font-bold">
                    Confirmation
                </Typography>
            </DialogHeader>
            <DialogBody divider className="text-center">
                Are you sure you want to delete this user?
            </DialogBody>
            <DialogFooter className="flex justify-end gap-2">
                <Button
                    variant="outlined"
                    color="red"
                    onClick={deleteCallback}
                    className="mr-2"
                >
                    Delete
                </Button>
                <Button variant="outlined" color="blue-gray" onClick={handleOpen}>
                    Cancel
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default DeleteModal;
