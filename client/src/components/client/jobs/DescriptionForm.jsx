import { TextField, Grid } from "@mui/material";
import { Controller } from "react-hook-form";

function DescriptionForm({ control, errors }) {
    return (
        <Grid container spacing={2} className="p-4">
            <Grid item xs={12}>
                <h3 className={"mb-4 font-bold text-gray-800 pl-2"}>Write Description For Your Job</h3>
                <Controller
                    name="description"
                    control={control}
                    rules={{
                        required: "Description is required",
                        validate: {
                            notEmpty: value => value.trim() !== '' || "Description cannot be empty or just spaces",
                            minLength: value => value.trim().length >= 10 || "Description must be at least 10 characters long",
                        }
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Description"
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
