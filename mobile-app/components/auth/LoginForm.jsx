import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import tw from 'twrnc';
import {useForm} from "react-hook-form";
import {useUserContext} from "../../context/UserContext";
import {setFormErrors} from "../../utils/setFormErrors";
import Toast from "react-native-root-toast";
import {showSuccessToast} from "../../utils/toasts";


const LoginForm = ({handleAuthForm}) => {
    const {getValues,setValue,setError,clearErrors,formState:{errors}} = useForm()
    const [message, setMessage] = useState("")
    const {login} = useUserContext()
    const handleLogin = async () => {
        clearErrors()
        const data = getValues()
        try {
            await login(data);
        } catch (error) {
            if (!error.response) {
                setMessage('Server is currently unavailable. Please try again later.');
            } else {
                const { message, errors: serverErrors } = error.response.data;
                if (message) setMessage(message);
                setFormErrors(serverErrors,setError)
            }
        }
    };

    const handleGoogleLogin = () => {
        showSuccessToast("test message")
    };

    return (
        <ScrollView >
            <View style={tw`flex-1 justify-center p-4`}>
                <Text style={tw`text-2xl font-bold mb-6 text-center`}>Login</Text>
                {message !== '' && <Text style={tw`flex justify-center bg-red-400 p-4 text-white font-bold rounded-lg mb-2`}>
                    {message}</Text>}
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
                <Button mode="contained" onPress={handleLogin} style={tw`mb-4`}>
                    Submit
                </Button>
                <Button icon="google" mode="outlined" onPress={handleGoogleLogin} style={tw`mb-4`}>
                    Login with Google
                </Button>

                {/* Links for Forgot Password and Register */}
                <View style={tw`flex-row justify-between mt-4`}>
                    <TouchableOpacity >
                        <Text style={tw`text-blue-500`}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleAuthForm}>
                        <Text style={tw`text-blue-500`}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default LoginForm;
