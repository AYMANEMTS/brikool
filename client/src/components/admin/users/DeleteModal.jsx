import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import AdminApi from "../../../api/AdminApi";
import {useQueryClient} from "react-query";
import {useSnackbar} from "notistack";

export default function DeleteModal({open, handleOpen,user}) {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    const deleteCallback = async () => {
        try {
            await AdminApi.deleteUser(user._id)
            await queryClient.invalidateQueries('users')
            handleOpen()
            enqueueSnackbar("User Deleted",{variant:"success"})
        }catch (e) {
            enqueueSnackbar("Failed to delete user",{variant:"error"})
            console.log(e)
        }
    }
    return (
        <React.Fragment>
            <Modal open={open} onClose={handleOpen}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRoundedIcon />
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Are you sure you want to delete this user?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={deleteCallback} >
                            Delete
                        </Button>
                        <Button variant="plain" color="neutral" onClick={handleOpen}>
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
