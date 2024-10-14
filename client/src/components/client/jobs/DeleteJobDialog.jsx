import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ClientApi from "../../../api/ClientApi";
import {useQueryClient} from "react-query";
import {useSnackbar} from "notistack";
import {useState} from "react";
import {Loader} from "lucide-react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteJobDialog({handleDialog,open,job}) {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false)
    const deleteJob = async () => {
        try {
            setLoading(true)
            const id = job._id
            await ClientApi.deleteJob(id).catch(e => console.error(e))
            await queryClient.invalidateQueries("userJobs")
            handleDialog()
            enqueueSnackbar("You deleted your job successfully",{variant:"success"})
        }catch (e) {
            console.error(e)
            enqueueSnackbar("Failed to update this job",{variant:"error"})
        }finally {
            setLoading(true)
        }
    }
    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you sure you want to delete this job? ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Deleting this job is a permanent action and cannot be undone. Once deleted, all information related to this job will be lost.
                        Please confirm if you wish to proceed with the deletion.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialog}>Cancel</Button>
                    <Button onClick={deleteJob} disabled={loading}
                            type="submit"
                            variant="contained"
                            color="primary"

                            sx={{ mt: 2, mb: 1}}
                    >
                        {loading ? <><Loader className={" mx-2 animate-spin text-white"} /> loading</> : "Yes"}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default DeleteJobDialog;




