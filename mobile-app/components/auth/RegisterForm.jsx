import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import tw from 'twrnc';
import {useForm} from "react-hook-form";
import {Picker} from "@react-native-picker/picker";
import cities from "../../utils/citiesInMorocco";
import {useUserContext} from "../../context/UserContext";
import {setFormErrors} from "../../utils/setFormErrors";

const RegisterForm = ({handleAuthForm}) => {
    const {getValues,setValue,setError,clearErrors,formState:{errors}} = useForm()
    const [selectedCity, setSelectedCity] = useState('');
    const [message, setMessage] = useState('')
    const {register} = useUserContext()
    const handleRegister = async () => {
        clearErrors()
        setMessage('')
        const data = getValues()
        data.city = selectedCity
        try {
            const res = await register(data)
            console.log("try",res)
        }catch (error) {
            if (!error.response) {
                setMessage('Server is currently unavailable. Please try again later.');
            } else {
                const { message, errors: serverErrors } = error.response.data;
                if (message) setMessage(message);
                setFormErrors(serverErrors,setError)
            }
        }
    };

    const handleGoogleRegister = () => {
        // Handle Google register logic here
        console.log('Register with Google');
    };

    return (
        <ScrollView>
            <View style={tw`flex-1 justify-center p-4`}>
                <Text style={tw`text-2xl font-bold mb-6 text-center`}>Register</Text>
                {message !== '' && <Text style={tw`flex justify-center bg-red-400 p-4 text-white font-bold rounded-lg mb-2`}>
                    {message}</Text>}
                <TextInput
                    label="Name"
                    onChangeText={text => setValue('name',text)}
                    style={tw``}
                    mode="outlined"
                />
                <Text style={tw`pl-2 pb-3 pt-1 text-red-500 font-semibold`}>{errors.name && errors.name.message}</Text>
                <TextInput
                    label="Email"
                    onChangeText={text => setValue('email',text)}
                    style={tw``}
                    mode="outlined"
                />
                <Text style={tw`pl-2 pb-3 pt-1 text-red-500 font-semibold`}>{errors.email && errors.email.message}</Text>
                <TextInput
                    label="Password"
                    onChangeText={text => setValue('password',text)}
                    secureTextEntry
                    style={tw``}
                    mode="outlined"
                />
                <Text style={tw`pl-2 pb-3 pt-1 text-red-500 font-semibold`}>{errors.password && errors.password.message}</Text>
                <View style={tw`bg-white border border-gray-500 rounded-lg `}>
                    <Picker selectedValue={selectedCity}
                            onValueChange={(value) => setSelectedCity(value)}
                            style={tw`text-gray-700`}>
                        <Picker.Item label="Select City" value={"All Cities"} />
                        {cities?.map((city,key) => (
                            <Picker.Item key={key} label={city} value={city} />
                        ))}
                    </Picker>
                </View>
                <Text style={tw`pl-2 pt-1 text-red-500 font-semibold`}>{errors.city && errors.city.message}</Text>

                <Button mode="contained" onPress={handleRegister} style={tw`my-4`}>
                    Submit
                </Button>
                <Button icon="google" mode="outlined" onPress={handleGoogleRegister} style={tw`mb-4`}>
                    Register with Google
                </Button>

                {/* Link for Login */}
                <TouchableOpacity onPress={handleAuthForm} style={tw`mt-4`}>
                    <Text style={tw`text-blue-500 text-center`}>Already have an account? Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default RegisterForm;
