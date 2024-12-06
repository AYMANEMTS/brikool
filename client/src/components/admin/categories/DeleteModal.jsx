import React from 'react';
import DialogTitle from "@mui/joy/DialogTitle";
import {Modal, ModalDialog,Button} from "@mui/joy";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { Divider} from "@mui/material";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import AdminApi from "../../../api/AdminApi";
import {useQueryClient} from "react-query";
import {useSnackbar} from "notistack";

function DeleteModal({handleOpen, open, category_id}) {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    const deleteCat = async () => {
        try {
            await AdminApi.deleteCategory(category_id);
            await queryClient.invalidateQueries('categories')
            handleOpen()
            enqueueSnackbar("Category deleted successfully",{variant:"success"})
        }catch (e) {
            enqueueSnackbar("Failed to delete category",{variant:"error"})
            console.log(e)
        }
    }
    return (
        <>
            <Modal open={open} onClose={handleOpen}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRoundedIcon />
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Are you sure you want to delete this category ?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={deleteCat}>
                            Delete
                        </Button>
                        <Button variant="plain" color="neutral" onClick={handleOpen}>
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </>
    );
}

export default DeleteModal;