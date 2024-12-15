import React, {useEffect, useState} from 'react';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {Dialog, Card} from "@material-tailwind/react";

function AuthModal({ open, handleOpen, redirectRoute="/settings" ,swapState}) {
    const [swapForm, setSwapForm] = useState(swapState);
    const handllSwapForm = () => setSwapForm(!swapForm)
    useEffect(() => {
        setSwapForm(swapState);
    }, [swapState]);

    return (
        <Dialog
            size="sm"
            open={open}
            handler={() => handleOpen()}
            className="bg-transparent shadow-none"
        >
            <Card className="mx-auto w-full ">
                {swapForm
                    ? <RegisterForm handllSwapForm={handllSwapForm} handleOpen={handleOpen} redirectRoute={redirectRoute} />
                    : <LoginForm handleOpen={handleOpen} handllSwapForm={handllSwapForm} redirectRoute={redirectRoute} />
                }
            </Card>
        </Dialog>
    );
}

export default AuthModal;
