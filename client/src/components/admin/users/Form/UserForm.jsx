import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PermissionsForm from "./PermissionsForm";
import InformationsForm from "./InformationsForm";
import SecondForm from "./SecondForm";
import { Button } from "@material-tailwind/react";
import { useQueryClient } from "react-query";
import AdminApi from "../../../../api/AdminApi";
import { useSnackbar } from "notistack";

function UserForm({ handleOpen }) {
    const {control, watch, setValue, formState: { errors, isValid }, handleSubmit,} = useForm({mode: "onChange",
        defaultValues: {
            name: null,
            email: null,
            password: null,
            city: { ar: "", fr: "", en: "" },
            role: "",
            image: null,
            permissions: [],
        },
    });

    const [formStep, setFormStep] = useState(1);
    const [role, permissions] = watch(["role", "permissions"]);

    const handleNext = () => formStep < 3 && setFormStep(formStep + 1);
    const handlePrevious = () => formStep > 1 && setFormStep(formStep - 1);

    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (data) => {
        try {
            const res = await AdminApi.createUser(data);
            if (res.status === 200) {
                await queryClient.invalidateQueries("users");
                enqueueSnackbar("You created a new user successfully", {
                    variant: "success",
                });
            }
            handleOpen();
        } catch (e) {
            handleOpen();
            enqueueSnackbar("Failed to create new user", { variant: "error" });
            console.error(e);
        }
    };

    const renderStep = () => {
        switch (formStep) {
            case 1:
                return <InformationsForm control={control} errors={errors} />;
            case 2:
                return <SecondForm setValue={setValue} control={control} errors={errors} />;
            case 3:
                return <PermissionsForm setValue={setValue} />;
            default:
                return null;
        }
    };

    return (
        <div>
            {renderStep()}
            <div className="flex justify-between mt-4">
                <div>
                    <Button
                        variant="outlined"
                        color="blue-gray"
                        onClick={handleOpen}
                        className="mr-2"
                    >
                        Cancel
                    </Button>
                </div>
                <div className="flex space-x-2">
                    {formStep !== 1 && (
                        <Button
                            variant="filled"
                            color="blue"
                            onClick={handlePrevious}
                            className="mr-2"
                        >
                            Back
                        </Button>
                    )}

                    {formStep === 3 || (formStep === 2 && role !== "moderator") ? (
                        <Button
                            disabled={!isValid || (role === "moderator" && permissions.length < 1)}
                            variant="filled"
                            color="green"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Save
                        </Button>
                    ) : (
                        <Button
                            disabled={!isValid}
                            variant="filled"
                            color="blue"
                            onClick={handleNext}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserForm;
