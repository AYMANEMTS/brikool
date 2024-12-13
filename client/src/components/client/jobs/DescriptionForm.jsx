import { Controller } from "react-hook-form";
import {useTranslation} from "react-i18next";
import {Textarea,Typography} from "@material-tailwind/react";

function DescriptionForm({ control, errors,t }) {
    const {t:tValidation} = useTranslation("validation");
    return (
        <div className="">
            <div>
                <Controller
                    name="description"
                    control={control}
                    rules={{
                        required: tValidation('requiredField'),
                        validate: {
                            notEmpty: value => value.trim() !== '' || tValidation('notEmpty'),
                            minLength: value => value.trim().length >= 10 || tValidation('minLength',{field:t('description'),min:10,max:500}),
                            maxLength: value => value.trim().length <= 500 || tValidation('maxLength',{field:t('description'),min:10,max:500}),
                        }
                    }}
                    render={({ field }) => (
                        <Textarea
                            {...field}
                            label={t('description')}
                            error={errors.description}
                        />
                    )}
                />
                {errors.description && <Typography variant={"small"} color={"red"}>{errors.description.message}</Typography>}
            </div>
        </div>
    );
}

export default DescriptionForm;
