import React, {useState} from 'react';
import {Loader} from "lucide-react";
import {OTPForm} from "../auth/OTPForm";
import AuthApi from "../../api/AuthApi";
import {useLoading} from "../../context/LoadingProvider";
import {enqueueSnackbar} from "notistack";

function AccountStatus({isVerified}) {
    const [isLoading, setIsLoading] = useState(false)
    const [otpForm, setOtpForm] = useState(false)
    const {user} = useLoading()
    const sendVerificationToken = async () => {
        try {
            setIsLoading(true)
            await AuthApi.verifyUserEmail()
            setOtpForm(true)
        }catch (e) {
            enqueueSnackbar("Failed to send verification to our email",{variant: "error"})
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            {!isVerified && (
                <div className="mb-4 bg-yellow-300 p-4 rounded-2xl">
                    <div className="text-gray-800 font-semibold">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            {/* Account Status */}
                            <div>
                                Account Status: <b className="ml-1 text-red-600">{user?.status}</b>
                            </div>
                        </div>

                        {/* Verify Now button */}
                        <div className="sm:flex-row md:flex  justify-between items-center mt-4 md:mt-0">
                            <div className="text-sm text-gray-600 md:w-2/3">
                                Please ensure your email is verified to fully access all features of your account.
                            </div>
                            <div onClick={sendVerificationToken}
                                 className={`${
                                     isLoading
                                         ? 'text-gray-600 cursor-not-allowed'
                                         : 'text-teal-blue hover:text-dark-teal-blue cursor-pointer'
                                 } underline flex items-center mt-2 md:mt-0`}
                            >
                                Verify Now {isLoading && <Loader className="animate-spin ml-1" />}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {otpForm && <OTPForm setOtpForm={setOtpForm} />}
        </>
    );
}

export default AccountStatus;