import React from 'react';
import {Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography} from '@material-tailwind/react';
import {OTPForm} from "./OTPForm";


function VerifyEmail({ open, handleOpen }) {
    const [otp, setOtp] = React.useState(Array(6).fill(""));
    const isOtpComplete = otp.every((digit) => digit.trim() !== "");
    console.log(isOtpComplete)
    return (
        <Dialog open={open} handler={handleOpen} size="sm">
            <DialogHeader>
                <Typography variant="h6" color="teal" className="text-center">
                    Verify your email address
                </Typography>
            </DialogHeader>
            <DialogBody divider>
                <div className={"justify-center"}>
                    <OTPForm otp={otp} setOtp={setOtp} />
                </div>
            </DialogBody>
            <DialogFooter>
                <Button fullWidth disabled={!isOtpComplete}>
                    Confirm
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default VerifyEmail;
