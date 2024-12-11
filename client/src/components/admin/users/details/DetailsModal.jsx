import React from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
} from "@material-tailwind/react";
import { Typography, Avatar, List, ListItem, ListItemSuffix } from "@material-tailwind/react";
import displayImage from "../../../../utils/imageFromServer";


function DetailsModal({ open, handleOpen, user, lng }) {
    if (!user) return null;


    return (
        <Dialog open={open} handler={handleOpen} size="lg" className="p-4">
            <DialogHeader className="text-center text-lg font-bold">
                User Details
            </DialogHeader>
            <DialogBody divider>
                {/* User Image */}
                <div className="flex justify-center my-4">
                    <Avatar
                        src={displayImage("", user)}
                        alt={user.name}
                        size="xxl"
                        className="border"
                    />
                </div>

                {/* User Information */}
                <List className="space-y-2">
                    <ListItem>
                        <Typography variant="small" className="font-bold">
                            Name:
                        </Typography>
                        <ListItemSuffix>{user.name}</ListItemSuffix>
                    </ListItem>
                    <ListItem>
                        <Typography variant="small" className="font-bold">
                            Email:
                        </Typography>
                        <ListItemSuffix>{user.email}</ListItemSuffix>
                    </ListItem>
                    <ListItem>
                        <Typography variant="small" className="font-bold">
                            Role:
                        </Typography>
                        <ListItemSuffix>{user.role}</ListItemSuffix>
                    </ListItem>
                    <ListItem>
                        <Typography variant="small" className="font-bold">
                            City:
                        </Typography>
                        <ListItemSuffix>{user.city?.[lng]}</ListItemSuffix>
                    </ListItem>
                    {user.permissions && user.permissions.length > 1 && (
                        <ListItem>
                            <Typography variant="small" className="font-bold">
                                Permissions:
                            </Typography>
                            <ListItemSuffix>{user.permissions.join(", ")}</ListItemSuffix>
                        </ListItem>
                    )}
                </List>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="outlined"
                    color="blue-gray"
                    onClick={handleOpen}
                    className="mr-2"
                >
                    Close
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default DetailsModal;
