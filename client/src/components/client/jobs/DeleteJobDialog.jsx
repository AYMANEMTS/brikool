import React, { useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import { useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { Loader } from 'lucide-react';
import ClientApi from "../../../api/ClientApi";

function DeleteJobDialog({ handleDialog, open, job, t }) {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const deleteJob = async () => {
        try {
            setLoading(true);
            const id = job._id;
            await ClientApi.deleteJob(id).catch((e) => console.error(e));
            await queryClient.invalidateQueries('userJobs');
            handleDialog();
            enqueueSnackbar(t('success_delete_message'), { variant: 'success' });
        } catch (e) {
            console.error(e);
            enqueueSnackbar(t('failed_delete_message'), { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} handler={handleDialog}>
            <DialogHeader>{t('delete_title')}</DialogHeader>
            <DialogBody>
                <p>{t('delete_description')}</p>
            </DialogBody>
            <DialogFooter>
                <Button onClick={handleDialog} variant="text">{t('cancel')}</Button>
                <Button
                    onClick={deleteJob}
                    disabled={loading}
                    variant="filled"
                    color="red"
                    className="mt-2 mb-1"
                >
                    {loading ? <><Loader className="mx-2 animate-spin text-white" /></> : t('delete')}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default DeleteJobDialog;
