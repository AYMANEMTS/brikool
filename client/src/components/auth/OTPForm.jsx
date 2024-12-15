import React from "react";
import {Button, IconButton, Input, Typography} from "@material-tailwind/react";
import {useLoading} from "../../context/LoadingProvider";
import {Send} from "lucide-react";
import AuthApi from "../../api/AuthApi";
import {useSnackbar} from "notistack";

export function OTPForm({setOtpForm}) {
    const [otp, setOtp] = React.useState(Array(6).fill(""));
    const inputRefs = React.useRef([]);
    const {user, setUser} = useLoading()
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value.replace(/[^0-9]/g, "");
        setOtp(newOtp);

        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    function handleBackspace(event, index) {
        if (event.key === "Backspace" && !event.target.value && index > 0) {
            console.log(inputRefs.current[index - 1]);
            inputRefs.current[index - 1].focus();
        }
    }
    const isValid = otp.every((digit) => digit.trim() !== "");
    const otpString = otp.join("");
    const verifyEmail = async () => {
        try {
            const res = await AuthApi.verifyEmail({token: otpString})
            if (res.data.user) {
                setUser(res.data.user);
            }
            enqueueSnackbar("You Account is verified successfully",{variant: "success"})
        }catch (e) {
            console.log(e)
            enqueueSnackbar("Failed to verify email",{variant: "error"})
        } finally {
            setOtpForm(false)
        }
    }
    return (
        <div className="w-full ">
            <Typography
                variant="small"
                color="blue-gray"
                className="flex items-center justify-center gap-1 text-center font-medium"
            >
                Enter the 6-digit OTP sent to{" "}
                <span className="font-bold text-teal-blue">{user?.email}</span>
            </Typography>

            <div className="my-4 flex items-center justify-center gap-2 ">
                {otp.map((digit, index) => (
                    <React.Fragment key={index}>
                        <Input variant={"outlined"}
                            type="text"
                            maxLength={1}
                            className="!w-10 appearance-none !border-t-blue-gray-200 text-center !text-lg placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            containerProps={{
                                className: "!min-w-0 !w-10 !shrink-0",
                            }}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleBackspace(e, index)}
                            inputRef={(el) => (inputRefs.current[index] = el)}
                        />
                        {index === 2 && <span className="text-2xl text-slate-700">-</span>}
                    </React.Fragment>
                ))}
                <IconButton size={"md"} disabled={!isValid} className={"hidden md:flex"}
                            onClick={verifyEmail}>
                    <Send className={"h-5 w-5"} />
                </IconButton>
            </div>
            <div className={"flex justify-center items-center mb-2 md:hidden "}>
                <Button disabled={!isValid} onClick={verifyEmail}>
                    Verify Account
                </Button>
            </div>

            <Typography
                variant="small"
                className="text-center font-normal text-blue-gray-500"
            >
                Did not receive the code? <span className="font-bold">Resend</span>
            </Typography>
        </div>
    );
}