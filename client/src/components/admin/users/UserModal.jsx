import * as React from 'react';
import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import UserForm from "./Form/UserForm";
import {Typography} from "@mui/material";

export default function UserModal({open,handleOpen}) {
    return (
        <React.Fragment>
             <Modal open={open} onClose={handleOpen}
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

                    <ModalClose variant="plain" sx={{margin: -1}} />
                    <Typography align={"center"} variant={"h6"} id="modal-desc">Create new user</Typography>
                    <UserForm handleOpen={handleOpen} />
                </ModalDialog>
            </Modal>
        </React.Fragment>
  );
}
