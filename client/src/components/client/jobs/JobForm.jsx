import React, { useState } from "react";
import InformationForm from "./InformationForm";
import ContactForm from "./ContactForm";
import DescriptionForm from "./DescriptionForm";
import { useForm } from "react-hook-form";
import ClientApi from "../../../api/ClientApi";
import {useQueryClient} from "react-query";
import {useSnackbar} from "notistack";
import {Loader} from "lucide-react";
import {useTranslation} from "react-i18next";
import {Button} from "@material-tailwind/react"

function JobForm({ handleOpen ,user,context}) {
    const [formSteper, setFormSteper] = useState(1);
    const {t,i18n} = useTranslation('announces')
    const {language:lng} = i18n
    const { handleSubmit, control, watch, formState: { errors, isValid } } = useForm({
        defaultValues: {
            name: user.name || "",
            city: user.city?.[lng] || "",
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
                    const id = context.job._id
                    const res = await ClientApi.updateJob(id,formatedData).catch(e => console.error(e))
                    if(res.status === 200){
                        await queryClient.invalidateQueries('userJobs')
                        handleOpen()
                        enqueueSnackbar(t('success_updated_msg'), {variant:"success"})
                    }
                }else {
                    const res = await ClientApi.createJob(formatedData).catch(e => console.error(e))
                    if(res.status === 201){
                        await queryClient.invalidateQueries('userJobs')
                        handleOpen()
                        enqueueSnackbar(t('success_created_msg'), {variant:"success"})
                    }
                }

            }catch (e) {
                console.error(e)
                enqueueSnackbar(t('failed_msg'), {variant:"error"})
            }finally {
                setLoading(false)
            }
        }
        setFormSteper(formSteper + 1);
    };

    return (
        <form onSubmit={handleSubmit(handleNext)}>
            {formSteper === 1 ? (
                <InformationForm t={t} lng={lng} control={control} errors={errors} user={user} job={context.job}/>
            ) : formSteper === 2 ? (
                <DescriptionForm t={t} control={control} errors={errors} />
            ) : (
                <ContactForm t={t} control={control} errors={errors} watch={watch} user={user} />
            )}

            {/* Buttons Section */}
            <div className="mt-4 flex justify-between">
                <div>
                    <Button onClick={handleCancel} className={"text-white bg-gray-700 hover:bg-gray-800 hover:text-white"}>
                        {t('cancel')}
                    </Button>
                </div>
                <div className="flex space-x-2">
                    {formSteper !== 1 && (
                        <Button onClick={handleBack} className={"text-black bg-bright-yellow hover:bg-gray-800 hover:text-white"}>
                            {t('back')}
                        </Button>
                    )}
                    <Button type="submit"
                        className={`px-4 py-2  ${
                            (!isValid || loading)
                                && 'bg-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!isValid || loading}
                    >
                        {formSteper !== 3 ? t('next') : (
                            loading ? (
                                <><Loader className="mx-2 animate-spin " /></>
                            ) : t('save')
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default JobForm;
