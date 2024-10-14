import React from 'react';
import { TextField, Grid, InputAdornment } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Controller } from "react-hook-form";

function ContactForm({ control, errors, user }) {
    return (
        <div className={"p-4"}>
            <h3 className="mb-4 font-bold text-gray-800 pl-2">Contact Information</h3>

            <Grid container spacing={2}>
                {/* Appel Field */}
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="appel"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Appel is required",
                            pattern: {
                                value: /^0\d{9}$/, // Ensures number starts with 0 and is followed by exactly 9 digits
                                message: "Appel must start with 0 and be exactly 10 digits long"
                            },
                        }}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="Appel *"
                                fullWidth
                                type={"number"}
                                variant="outlined"
                                error={!!errors.appel}
                                helperText={errors.appel ? errors.appel.message : '0123456789'}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                </Grid>


                {/* WhatsApp Field */}
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="whatssap"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="WhatsApp "
                                type={"number"}
                                fullWidth
                                variant="outlined"
                                error={!!errors.whatssap}
                                helperText={errors.whatssap ? errors.whatssap.message : '0123456789'}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <WhatsAppIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                </Grid>

                {/* Email Field */}
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue={user?.email}
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="Email "
                                fullWidth
                                type={"email"}
                                variant="outlined"
                                value={user?.email}
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                </Grid>

                {/* LinkedIn Field */}
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="linkedin"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <TextField
                                {...field}
                                label="LinkedIn "
                                fullWidth
                                type={"text"}
                                variant="outlined"
                                error={!!errors.linkedin}
                                helperText={errors.linkedin ? errors.linkedin.message : ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LinkedInIcon/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                </Grid>

                {/* Display Error for the Whole Contact Section */}
                {errors.contact && (
                    <Grid item xs={12}>
                        <p className="error-message">At least one contact is required</p>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

export default ContactForm;
