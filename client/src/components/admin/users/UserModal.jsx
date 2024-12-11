import React from "react";
import {Dialog, DialogHeader, DialogBody} from "@material-tailwind/react";
import UserForm from "./Form/UserForm";

function UserModal({ open, handleOpen }) {
    return (
        <Dialog open={open} handler={handleOpen} size="lg" className="p-4">
            <DialogHeader className="text-center text-lg font-bold">
                Create New User
            </DialogHeader>
            <DialogBody>
                <UserForm handleOpen={handleOpen} />
            </DialogBody>
        </Dialog>
    );
}

export default UserModal;
