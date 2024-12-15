import React from "react";
import { Typography} from "@material-tailwind/react";
import UpdateInformationForm from "../../components/settings/UpdateInformationForm";
import PasswordUpdateForm from "../../components/settings/PasswordUpdateForm";
import {useLoading} from "../../context/LoadingProvider";
import AccountStatus from "../../components/settings/AccountStatus";

function Settings() {
    const {user} = useLoading()
    const isVerified = user && user.status === "verified";

    return (
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-md shadow-md p-8 mt-20 md:mt-0">

            <AccountStatus isVerified={isVerified} />

            <Typography variant="h5" className="mb-4 text-teal-blue dark:text-bright-yellow">
                Account Settings
            </Typography>
            <div className="border-b border-dark-teal-blue mb-6"></div>

            {isVerified && (
                <Typography variant="lead"   className="mb-4 text-dark-teal-blue dark:text-bright-yellow">
                    Account Status: <b className={"ml-1 text-teal-blue dark:text-bright-yellow"}>{user?.status}</b>
                </Typography>
            )}

            {/* update info */}
            <UpdateInformationForm />

            {/*  email   */}
            <Typography variant={"lead"} className={"text-dark-teal-blue dark:text-bright-yellow mt-4"}>Email Address</Typography>
            <div className={"flex justify-between mt-2"}>
                <div className={"text-gray-800 dark:text-bright-yellow"}>
                    Your email address is <b className={"text-teal-blue dark:text-bright-yellow"}>{user?.email}</b>
                </div>
                <div className={"text-teal-blue hover:text-dark-teal-blue underline cursor-pointer"}>
                    Change
                </div>
            </div>

            {/*  change password  */}
            <PasswordUpdateForm />

            {/*  delete account  */}
            <Typography variant={"lead"} className={"text-dark-teal-blue dark:text-bright-yellow mt-4"}>Delete Account</Typography>
            <div className={"mt-2"}>
                <div className={"bg-red-100 rounded-full inline-flex space-x-2 p-3 "}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path className={"fill-red-800 "} fillRule="evenodd"
                              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                              clipRule="evenodd"/>
                    </svg>
                    <div className={"text-red-800"}>Proceed with caution</div>
                </div>
                <Typography variant={"paragraph"} className={"mt-2 ml-2"}>
                    Make sure you have taken backup of your account in case you ever need to get access to your data. We
                    will completely wipe your data. There is no way to access your account after this action.
                </Typography>
                <div className={"text-red-600 hover:text-red-900 cursor-pointer underline ml-2 mt-2"}>
                    Continue with deletion
                </div>
            </div>
        </div>
    );
}

export default Settings;

