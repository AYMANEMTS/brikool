import React from 'react';
import {Modal, ModalClose, ModalDialog} from "@mui/joy";
import PermissionsForm from "../Form/PermissionsForm";
import {useForm} from "react-hook-form";
import Button from "@mui/joy/Button";
import AdminApi from "../../../../api/AdminApi";
import {useSnackbar} from "notistack";
import {useQueryClient} from "react-query";

function PermissionsModal({open,handleOpen,user}) {
    const {setValue,watch} = useForm();
    const permissions = watch('permissions')
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const savePermissions = async () => {
        try {
            await AdminApi.updatePermissions({permissions}, user._id)
            handleOpen()
            await queryClient.invalidateQueries('users')
            enqueueSnackbar("Permissions updated",{variant:"success"})
        }catch (e) {
            enqueueSnackbar("Error while updating permissions",{variant:"error"})
            console.log(e)
        }
    }
    return (
        <React.Fragment>
            <Modal open={open} onClose={handleOpen}
                   aria-labelledby="modal-title"
                   aria-describedby="modal-desc"
                   sx={{
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                   }}
            >
                <ModalDialog
                    sx={{
                        width: '100%',
                        maxWidth: 700,
                        padding: 2,
                        '@media (max-width: 600px)': {
                            width: '90%',
                            maxWidth: 'none',
                        },
                    }}
                >

                    <ModalClose variant="plain" sx={{margin: -1}} />
                    <PermissionsForm setValue={setValue} user={user} />
                    <Button variant={"solid"} color={"primary"} onClick={savePermissions}
                            disabled={(permissions && [...permissions].sort().join() === [...user?.permissions].sort().join()) || permissions?.length < 1 }>
                        Save
                    </Button>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}

export default PermissionsModal;