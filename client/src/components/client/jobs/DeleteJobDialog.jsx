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
            <DialogHeader className={"text-teal-blue"}>{t('delete_title')}</DialogHeader>
            <DialogBody>
                <p className={"font-semibold"}>{t('delete_description')}</p>
            </DialogBody>
            <DialogFooter className={"flex justify-between items-center"}>
                <Button onClick={handleDialog} className={"text-white bg-gray-700 hover:bg-gray-800 hover:text-white"}>
                    {t('cancel')}
                </Button>
                <Button onClick={deleteJob} disabled={loading}>
                    {loading ? <><Loader className="mx-2 animate-spin text-white" /></> : t('delete')}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default DeleteJobDialog;
