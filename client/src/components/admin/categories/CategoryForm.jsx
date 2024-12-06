import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import Button from "@mui/joy/Button";
import AdminApi from "../../../api/AdminApi";
import {useSnackbar} from "notistack";
import {useQueryClient} from "react-query";

function CategoryForm({selectedCategory,handleOpen}) {
    const {register,handleSubmit,setValue,formState:{isValid}} = useForm({mode:"onChange",defaultValues: {
            name: selectedCategory.name || '',
            image: selectedCategory.image || null,
        }});
    const { enqueueSnackbar } = useSnackbar();
    const [imagePreview, setImagePreview] = useState(selectedCategory.image ?
        `http://localhost:8000/${selectedCategory.image}` : null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue('image', file, { shouldValidate: true })
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const queryClient = useQueryClient()
    const saveCategory = async (data) => {
        try {
            if (selectedCategory.name) {
                await AdminApi.updateCategory(selectedCategory._id, data)
                await queryClient.invalidateQueries('categories')
                handleOpen()
                enqueueSnackbar("Category Updated!", {variant: "success"})
            }else {
                await AdminApi.createCategory(data)
                await queryClient.invalidateQueries('categories')
                handleOpen()
                enqueueSnackbar("Category created!", {variant: "success"})
            }
        }catch (e) {
            enqueueSnackbar("Failed to create category",{variant:"error"})
            console.log(e)
        }
    }
    return (
        <>
            <div className="mb-4">
                <label className="block font-medium mb-1">Category Name</label>
                <input {...register('name', { required: true })}
                    type="text"
                    placeholder="Enter category name"
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-1">Upload Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                />
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-4 w-32 h-32 object-cover rounded"
                    />
                )}
            </div>
            <Button onClick={handleSubmit(saveCategory)}
                disabled={!isValid} variant="solid" color={"primary"}>
                Save
            </Button>
        </>
    );
}

export default CategoryForm;