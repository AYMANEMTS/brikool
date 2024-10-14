import React from 'react';
import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import JobForm from "./JobForm";


function JobModal({ open, handleOpen, user, job={},isUpdate }) {
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => handleOpen()}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ModalDialog
                sx={{
                    width: '100%',
                    maxWidth: 700,  // Max width for larger screens
                    padding: 2,
                    '@media (max-width: 600px)': {
                        width: '90%',  // Take up 90% of the viewport width on small screens
                        maxWidth: 'none',  // No max width for mobile
                    },
                }}
            >
                <ModalClose variant="plain"  />
                <JobForm handleOpen={handleOpen} user={user} context={{isUpdate: isUpdate,job:job}}/>

            </ModalDialog>
        </Modal>
    );
}

export default JobModal;
