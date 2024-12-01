import React from 'react';
import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import { Typography, Avatar, Box, List, ListItem, ListItemText } from "@mui/material";
import displayImage from "../../../../utils/imageFromServer";

function DetailsModal({ open, handleOpen, user }) {
    if (!user) return null;

    return (
        <React.Fragment>
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
                    <Typography align={"center"} variant={"h6"} id="modal-desc">
                        User Details
                    </Typography>

                    {/* User Image */}
                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Avatar
                            src={displayImage("",user)}
                            alt={user.name}
                            sx={{ width: 100, height: 100 }}
                        />
                    </Box>

                    {/* User Information */}
                    <List sx={{ marginTop: 2 }}>
                        <ListItem>
                            <ListItemText primary="Name" secondary={user.name} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Email" secondary={user.email} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Role" secondary={user.role} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="City" secondary={user.city} />
                        </ListItem>
                        {user.permissions && (
                            <ListItem>
                                <ListItemText primary="Permissions" secondary={user?.permissions?.join(', ')} />
                            </ListItem>
                        )}
                    </List>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}

export default DetailsModal;
