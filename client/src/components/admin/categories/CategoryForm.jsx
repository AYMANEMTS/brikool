import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Button,Input} from "@material-tailwind/react";
import AdminApi from "../../../api/AdminApi";
import {useSnackbar} from "notistack";
import {useQueryClient} from "react-query";

function CategoryForm({selectedCategory,handleOpen,isUpdate}) {
    const {register,handleSubmit,setValue,formState:{isValid,errors}} = useForm({mode:"onChange",defaultValues: {
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
            if (isUpdate) {
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
            {/* Multilingual Category Name */}
            <div className="mb-4">
                <Input label={"Category Name (English)"} required
                    {...register('name.en', { required: 'English name is required' })}
                    type="text"
                    placeholder="Enter category name in English"
                    className="w-full border rounded px-3 py-2"
                />
                {errors.name?.en && <p className="text-red-500 text-sm">{errors.name.en.message}</p>}
            </div>
            <div className="mb-4">
                <Input label={"Category Name (French)"} required
                    {...register('name.fr', { required: 'French name is required' })}
                    type="text"
                    placeholder="Enter category name in French"
                    className="w-full border rounded px-3 py-2"
                />
                {errors.name?.fr && <p className="text-red-500 text-sm">{errors.name.fr.message}</p>}
            </div>
            <div className="mb-4">
                <Input label={"Category Name (Arabic)"} required
                    {...register('name.ar', { required: 'Arabic name is required' })}
                    type="text"
                    placeholder="Enter category name in Arabic"
                    className="w-full border rounded px-3 py-2"
                />
                {errors.name?.ar && <p className="text-red-500 text-sm">{errors.name.ar.message}</p>}
            </div>

            {/* Image Upload */}
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

            {/* Save Button */}
            <div className={"flex justify-between"}>
                <Button
                    onClick={handleOpen}
                    variant="outlined"
                    color="black"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit(saveCategory)}
                    disabled={!isValid}
                    variant="solid"
                    color="blue"
                >
                    Save
                </Button>
            </div>

        </>
    );
}

export default CategoryForm;