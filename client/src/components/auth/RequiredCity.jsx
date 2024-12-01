import React, {useState} from 'react';
import {Modal, ModalDialog} from "@mui/joy";
import citiesInMorocco from "../../utils/citiesInMorocco";
import {Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import ClientApi from "../../api/ClientApi";
import {useLoading} from "../../context/LoadingProvider";
import Alert from "@mui/material/Alert";


function RequiredCity({open, handleOpen}) {
    const [city, setCity] = useState("");
    const [error, setError] = useState("")
    const {user,setUser} = useLoading()
    const handleSubmit = async () => {
        try {
            const res = await ClientApi.updateClient({city,name: user.name})
            if (res.status === 200 && res.data) {
                setUser(res.data)
                handleOpen()
            }
        }catch (e) {
            setError("Failed to add city! try again ")
            console.error(e)
        }
    }
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
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
                <Typography id="modal-title" variant="h6" textAlign="center" mb={2}>
                    Select Your City
                </Typography>
                {error !== "" &&
                    <Alert severity="error">
                        {error}
                    </Alert>
                }
                <FormControl fullWidth>
                    <InputLabel id="city-label">City *</InputLabel>
                    <Select
                        labelId="city-label"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        label="City *"
                    >
                        {citiesInMorocco?.map((city, index) => (
                            <MenuItem key={index} value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    disabled={city === ""}
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 3, width: "100%" }}
                >
                    Confirm
                </Button>
            </ModalDialog>
        </Modal>
    );
}

export default RequiredCity;
