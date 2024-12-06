import React from 'react';
import {Modal, ModalClose, ModalDialog} from "@mui/joy";
import {Typography} from "@mui/material";
import CategoryForm from "./CategoryForm";

function CategoryModal({open, handleOpen,selectedCategory}) {
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
                    <Typography align={"center"} variant={"h6"} id="modal-desc">
                        {selectedCategory.name ? `Edit (${selectedCategory.name})` : 'Create New Category'}
                    </Typography>
                    <CategoryForm handleOpen={handleOpen} selectedCategory={selectedCategory} />
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}

export default CategoryModal;