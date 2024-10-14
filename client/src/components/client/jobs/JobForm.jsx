import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import InformationForm from "./InformationForm";
import ContactForm from "./ContactForm";
import DescriptionForm from "./DescriptionForm";
import { useForm } from "react-hook-form";
import ClientApi from "../../../api/ClientApi";
import {useQueryClient} from "react-query";
import {useSnackbar} from "notistack";
import {Loader} from "lucide-react";

function JobForm({ handleOpen ,user,context}) {
    const [formSteper, setFormSteper] = useState(1);
    const { handleSubmit, control, watch, formState: { errors, isValid } } = useForm({
        defaultValues: {
            name: user.name || "",
            city: user.city || "",
            category: context?.job?.category?._id || "",
            description: context?.job?.description || "",
            email: user?.email || "",
            whatssap: context?.job?.contacts?.name || "",
            gmail: context?.job?.contacts?.gmail || "",
            linkedin: context?.job?.contacts?.linkedin || "",
            appel: context?.job?.contacts?.appel || ""
        },
        mode: "onChange"
    })
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false)
    const handleCancel = () => {
        handleOpen();
    };
    const handleBack = () => {
        if (formSteper === 1) {
            return;
        }
        setFormSteper(formSteper - 1);
    };
    console.log(context.job)
    const queryClient = useQueryClient()
    const handleNext = async (data) => {
        const contacts = {appel:data.appel,whatssap:data.whatssap,email:data.email,linkedin:data.linkedin}
        if (formSteper === 3) {
            const formatedData = {
                userId: user._id,
                description: data.description,
                contacts: contacts,
                category: data.category
            }
            try {
                setLoading(true)
                if(context.isUpdate){
                    const id = context.job._id + "1"
                    const res = await ClientApi.updateJob(id,formatedData).catch(e => console.error(e))
                    if(res.status === 200){
                        await queryClient.invalidateQueries('userJobs')
                        handleOpen()
                        enqueueSnackbar("You Announce is updated successfully", {variant:"success"})
                    }
                }else {
                    const res = await ClientApi.createJob(formatedData).catch(e => console.error(e))
                    if(res.status === 201){
                        await queryClient.invalidateQueries('userJobs')
                        handleOpen()
                        enqueueSnackbar("You Announce is created successfully", {variant:"success"})
                    }
                }

            }catch (e) {
                console.error(e)
                enqueueSnackbar("Failed to "+ context.isUpdate ? 'update' : 'create' + +" our announcement", {variant:"error"})
            }finally {
                setLoading(false)
            }
        }
        setFormSteper(formSteper + 1);
    };

    return (
        <form onSubmit={handleSubmit(handleNext)}>
            {formSteper === 1 ? (
                <InformationForm control={control} errors={errors} user={user} job={context.job}/>
            ) : formSteper === 2 ? (
                <DescriptionForm control={control} errors={errors} />
            ) : (
                <ContactForm control={control} errors={errors} watch={watch} user={user} />
            )}

            {/* Buttons Section */}
            <Grid container justifyContent="space-between" className="mt-4">
                <Grid item>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <div className="flex space-x-2">
                        {formSteper !== 1 && (
                            <Button variant="contained" color="primary" onClick={handleBack}>
                                Back
                            </Button>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!isValid || loading}
                        >
                            {formSteper !== 3 ? "Next" : loading ? <><Loader className={" mx-2 animate-spin text-white"} /> loading</> : "Save"}
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

export default JobForm;
