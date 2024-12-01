import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Select, MenuItem } from '@mui/material';
import citiesInMorocco from "../../../../utils/citiesInMorocco";

function SecondForm({control,errors,setValue}) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue('image', file);
    setImage(file);
  };

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Row 1: Role and City */}
        <div>
          <Controller
            name="role"
            control={control}
            defaultValue=""
            rules={{ required: 'Role is required' }}
            render={({ field }) => (
              <Select {...field} fullWidth displayEmpty error={!!errors.role}
                className="bg-white border rounded-md w-full">
                <MenuItem value="" disabled>Select Role</MenuItem>
                <MenuItem value="client">Client</MenuItem>
                <MenuItem value="moderator">Moderator</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            )}
          />
          {errors.role ? <p className="text-red-500 text-sm">{errors.role.message}</p> : <p className={"text-gray-500 ml-3 text-sm"}>required</p>}
        </div>
        <div>
            <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{ required: 'City is required' }}
                render={({ field }) => (
                    <Select {...field} fullWidth displayEmpty error={!!errors.city}
                            className="bg-white border rounded-md w-full">
                        <MenuItem value="" disabled>Select City</MenuItem>
                        {citiesInMorocco?.map((city, key) => (
                            <MenuItem key={key} value={city}>
                                {city}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            />
            {errors.city ? <p className="text-red-500 text-sm">{errors.city.message}</p> : <p className={"text-gray-500 ml-3 text-sm"}>required</p>}
        </div>

        {/* Row 2: Image Input and Preview */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-center">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <p className="text-gray-500">No image selected</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SecondForm;
