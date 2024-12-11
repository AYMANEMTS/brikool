import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import AdminApi from '../../../api/AdminApi';

function DeleteJobModal({open,toggleModal,jobId}) {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const deleteJob = async () => {
        try {
            await AdminApi.deleteJob(jobId);
            await queryClient.invalidateQueries('jobs');
            toggleModal();
            enqueueSnackbar('Job deleted successfully', { variant: 'success' });
        } catch (e) {
            enqueueSnackbar('Failed to delete job', { variant: 'error' });
            console.log(e);
        }
    };

    return (
        <Dialog open={open} handler={toggleModal} size="sm">
            <DialogHeader className="flex items-center space-x-2">
                <span className="text-red-500">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <span>Confirmation</span>
            </DialogHeader>
            <DialogBody divider>
                Are you sure you want to <strong>delete</strong> this job?
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button color="red" onClick={deleteJob}>
                    Delete
                </Button>
                <Button color="gray" variant="outlined" onClick={toggleModal}>
                    Cancel
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default DeleteJobModal;