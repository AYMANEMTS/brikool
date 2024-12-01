import React from 'react';
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import {Modal, ModalDialog, Button, Divider, DialogTitle, DialogContent, DialogActions} from "@mui/joy";
import AdminApi from "../../../api/AdminApi";
import {useQueryClient} from "react-query";
import {useSnackbar} from "notistack";

function ChangeStatusModal({open,toggleModal,jobId}) {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    const deleteJob = async () => {
        try {
            await AdminApi.deleteJob(jobId)
            await queryClient.invalidateQueries("jobs")
            toggleModal()
            enqueueSnackbar("Job deleted successfully",{variant:"success"})
        }catch (e) {
            enqueueSnackbar("Failed to delete job",{variant:"error"})
            console.log(e)
        }
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
                        Are you sure you want to Delete this job ?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={deleteJob}>
                            Delete
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