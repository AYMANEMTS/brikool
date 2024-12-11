import React from 'react';
import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
import JobForm from './JobForm';

function JobModal({ open, handleOpen, user, job = {}, isUpdate }) {
    return (
        <Dialog open={open} handler={handleOpen}>
            <DialogBody className="bg-white dark:bg-gray-800 p-4">
                <DialogHeader>
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        onClick={() => handleOpen()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </DialogHeader>
                <JobForm handleOpen={handleOpen} user={user} context={{ isUpdate, job }} />
            </DialogBody>
        </Dialog>
    );
}

export default JobModal;
