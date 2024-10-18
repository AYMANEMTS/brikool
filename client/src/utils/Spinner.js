// Spinner.js
import React from "react";
import { useLoading } from "../context/LoadingProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

function Spinner() {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Spinner;
