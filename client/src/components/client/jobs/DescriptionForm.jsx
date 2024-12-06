import { TextField, Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import {useTranslation} from "react-i18next";

function DescriptionForm({ control, errors,t }) {
    const {t:tValidation} = useTranslation("validation");
    return (
        <Grid container spacing={2} className="p-4">
            <Grid item xs={12}>
                <h3 className={"mb-4 font-bold text-gray-800 pl-2"}>{t('descriptionTitle')}</h3>
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
                        <TextField
                            {...field}
                            label={t('description')}
                            fullWidth
                            multiline // Add this to enable multiline text
                            rows={7}  // Now this will work
                            variant="outlined" // Ensure the variant is set if needed
                            error={!!errors.description}
                            helperText={errors.description ? errors.description.message : ''}
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
}

export default DescriptionForm;
