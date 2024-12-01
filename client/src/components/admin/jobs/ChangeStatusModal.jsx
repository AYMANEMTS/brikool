import React from 'react';
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import {Modal, ModalDialog} from "@mui/joy";
import {Button, Divider} from "@mui/material";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import AdminApi from "../../../api/AdminApi";
import {useQueryClient} from "react-query";
import {useSnackbar} from "notistack";

function ChangeStatusModal({open,toggleModal,newStatus,jobId}) {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const changeStatusCallBack = async () => {
        try {
            await AdminApi.changeJobStatus(jobId,{newStatus});
            await queryClient.invalidateQueries("jobs")
            toggleModal()
            enqueueSnackbar("Change status successfully",{variant:"success"})
        }catch (e) {
            enqueueSnackbar("Failed to change status",{variant:"error"})
            console.log(e)
        }
    }
    if (!newStatus){
        return;
    }
    return (
        <>
            <Modal open={open} onClose={toggleModal}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRoundedIcon />
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Are you sure you want to {newStatus} this job ?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={changeStatusCallBack}>
                            Change
                        </Button>
                        <Button variant="plain" color="neutral" onClick={toggleModal}>
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </>
    );
}

export default ChangeStatusModal;