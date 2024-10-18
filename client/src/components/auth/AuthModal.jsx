import React, {useEffect, useState} from 'react';
import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthModal({ open, handleOpen, redirectRoute="/settings" ,swapState}) {
    const [swapForm, setSwapForm] = useState(swapState);
    const handllSwapForm = () => setSwapForm(!swapForm)
    useEffect(() => {
        setSwapForm(swapState);
    }, [swapState]);
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => handleOpen()}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ModalDialog
                sx={{
                    width: '100%',
                    maxWidth: 500,  // Max width for larger screens
                    padding: 2,
                    '@media (max-width: 600px)': {
                        width: '90%',  // Take up 90% of the viewport width on small screens
                        maxWidth: 'none',  // No max width for mobile
                    },
                }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                {swapForm
                    ? <RegisterForm handllSwapForm={handllSwapForm} handleOpen={handleOpen} redirectRoute={redirectRoute} />
                    : <LoginForm handleOpen={handleOpen} handllSwapForm={handllSwapForm} redirectRoute={redirectRoute} />
                }
            </ModalDialog>
        </Modal>
    );
}

export default AuthModal;
