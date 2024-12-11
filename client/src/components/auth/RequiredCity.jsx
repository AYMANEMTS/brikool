import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography } from '@material-tailwind/react';
import citiesInMorocco from '../../utils/citiesInMorocco';
import ClientApi from '../../api/ClientApi';
import { useLoading } from '../../context/LoadingProvider';
import {useTranslation} from "react-i18next";

function RequiredCity({ open, handleOpen }) {
    const [city, setCity] = useState(null);
    const [error, setError] = useState('');
    const { user, setUser } = useLoading();
    const {i18n} = useTranslation()
    const {language:lng} = i18n
    const handleSubmit = async () => {
        try {
            const res = await ClientApi.updateClient({ city, name: user.name });
            if (res.status === 200 && res.data) {
                setUser(res.data);
                handleOpen();
            }
        } catch (e) {
            setError('Failed to add city! Try again.');
            console.error(e);
        }
    };

    return (
        <Dialog open={open} handler={handleOpen} size="sm">
            <DialogHeader>
                <Typography variant="h6" color="blue-gray" className="text-center">
                    Select Your City
                </Typography>
            </DialogHeader>
            <DialogBody divider>
                {error && (
                    <Typography variant="small" color="red" className="mb-4">
                        {error}
                    </Typography>
                )}
                <div className="w-full">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                    </label>
                    <select id="city" value={JSON.stringify(city)}
                        onChange={(e) => {
                            const selectedCity = JSON.parse(e.target.value);
                            setCity(selectedCity);
                        }}
                        className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="" disabled>
                            Select a city
                        </option>
                        {citiesInMorocco?.map((city, index) => (
                            <option key={index} value={JSON.stringify(city)}>
                                {city?.[lng]}
                            </option>
                        ))}
                    </select>

                </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    color="blue"
                    onClick={handleSubmit}
                    disabled={city === null}
                    fullWidth
                >
                    Confirm
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default RequiredCity;
