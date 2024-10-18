import React, {useEffect, useState} from 'react';
import {FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import ClientApi from "../../../api/ClientApi";
import {Controller} from "react-hook-form";
import displayImage from "../../../utils/imageFromServer";
import {useQueryClient} from "react-query";

function InformationForm({control,user,errors,job}) {
    const queryClient = useQueryClient()
    const categories = queryClient.getQueryData('categories')?.data?.category || []
    return (
        <>
            <h2 className={"mb-4 font-bold text-gray-800 pl-2 flex justify-center"}>Information </h2>
            <Grid container spacing={2} className="p-4 ">
                {/* Image Preview */}
                <Grid item xs={12} md={6} container justifyContent="center" alignItems="center">
                    <img
                        src={displayImage("",user)}
                        className="object-cover w-36 h-36 rounded-full border-4 border-gray-300"
                        alt="avatar"
                    />
                </Grid>

                {/* Input Fields */}
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Full Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                disabled={true}
                                value={user?.name}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="City"
                                type="text"
                                fullWidth
                                variant="outlined"
                                disabled={true}
                                value={user?.city}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={!!errors.category}>
                                <InputLabel id="category-label">Category *</InputLabel>
                                <Controller
                                    name="category"
                                    control={control}
                                    defaultValue={job?.category?._id || ""}
                                    rules={{ required: "Category field is required" }}
                                    render={({ field }) => (
                                        <Select
                                            labelId="category-label"
                                            label="Category *"
                                            {...field}
                                        >
                                            {categories?.map((category,key) => (
                                                <MenuItem key={key} value={category._id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                {errors.category && (
                                    <FormHelperText>{errors.category.message}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default InformationForm;