import React, { useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import { useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { Loader } from 'lucide-react';
import ClientApi from "../../../api/ClientApi";

function ChangeStatus({ handleDialog, open, job, t }) {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const changeJobStatus = async () => {
        try {
            setLoading(true);
            const id = job._id;
            await ClientApi.changeStatus(id).catch((e) => console.error(e));
            await queryClient.invalidateQueries('userJobs');
            handleDialog();
            enqueueSnackbar(t('success_change_status'), { variant: 'success' });
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Failed to change status', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} handler={handleDialog}>
            <DialogHeader className={"text-teal-blue"}>{t('change_status_title')}</DialogHeader>
            <DialogBody>
                <p className={"font-semibold"}>{t('change_status_description')}</p>
            </DialogBody>
            <DialogFooter className={"flex justify-between items-center"}>
                <Button className={"text-white bg-gray-700 hover:bg-gray-800 hover:text-white"} onClick={handleDialog} >
                    {t('cancel')}
                </Button>
                <Button onClick={changeJobStatus} disabled={loading} >
                    {loading ? <><Loader className="mx-2 animate-spin text-white" /></> : t('save')}
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default ChangeStatus;
