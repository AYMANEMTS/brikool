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

function ChangeStatus({handleDialog,open,job}) {
    const queryClient = useQueryClient()
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false)
    const changeJobStatus = async () => {
        try {
            setLoading(true)
            const id = job._id
            await ClientApi.changeStatus(id).catch(e => console.error(e))
            await queryClient.invalidateQueries("userJobs")
            handleDialog()
            enqueueSnackbar("You change status successfully",{variant:"success"})

        }catch (e) {
            console.error(e)
            enqueueSnackbar("Failed to change status",{variant:"error"})
        }finally {
            setLoading(false)
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
                <DialogTitle>{"Are you sure you want to change the status of this job ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Please note that changing the status may affect visibility and other related settings. If you proceed, the current status will be updated.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialog}>Cancel</Button>
                    <Button onClick={changeJobStatus} disabled={loading}
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

export default ChangeStatus;




