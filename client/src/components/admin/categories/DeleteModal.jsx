import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography } from '@material-tailwind/react';
import AdminApi from '../../../api/AdminApi';
import { useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import {TriangleAlert} from "lucide-react";

function DeleteModal({ handleOpen, open, category_id }) {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const deleteCat = async () => {
        try {
            await AdminApi.deleteCategory(category_id);
            await queryClient.invalidateQueries('categories');
            handleOpen();
            enqueueSnackbar('Category deleted successfully', { variant: 'success' });
        } catch (e) {
            enqueueSnackbar('Failed to delete category', { variant: 'error' });
            console.log(e);
        }
    };

    return (
        <Dialog open={open} handler={handleOpen} size="sm" className="p-4">
            <DialogHeader className="flex items-center space-x-2">
                <TriangleAlert  className="h-6 w-6 text-red-500" />
                <Typography variant="h6" color="blue-gray">
                    Confirmation
                </Typography>
            </DialogHeader>
            <DialogBody divider>
                <Typography variant="paragraph" className="text-gray-700">
                    Are you sure you want to delete this category?
                </Typography>
            </DialogBody>
            <DialogFooter className="flex space-x-2 justify-end">
                <Button color="red" onClick={deleteCat}>
                    Delete
                </Button>
                <Button variant="outlined" color="blue-gray" onClick={handleOpen}>
                    Cancel
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default DeleteModal;
