import React from 'react';
import tw from "twrnc";
import {TextInput, Text, View, TouchableOpacity} from "react-native";
import {useForm, Controller } from "react-hook-form";
import ClientApi from "../../api/ClientApi";
import {showErrorToast, showInfoToast, showSuccessToast} from "../../utils/toasts";

function ChangePassword() {
    const { getValues,reset,control , formState:{errors,isValid}} = useForm({mode:"onChange"});
    const handleChangePassword = async () => {
        const data = getValues()
        try {
            const res = await ClientApi.changePassword(data)
            reset()
            if (res.status === 200){
                showSuccessToast('Password Updated SuccessFully')
            }else{
                showInfoToast('Failed to Change Password')
            }
        }catch (e) {
            console.log(e)
            showErrorToast('Problem in server. please try again later!')
        }
    }
    return (
        <>
            <View style={tw`mb-6`}>
                <Text style={tw`p-1 font-semibold text-lg`}>Current Password: </Text>
                <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={tw`bg-white p-3 border border-gray-700 rounded-lg`}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder={"Current Password"} secureTextEntry
                        />
                    )}
                    name="currentPassword"
                    rules={{ required: {value: true,message: "This field is required"},
                            minLength: {value: 7,message: "Minimum 7 characters long"}}}
                />
                {errors.currentPassword && <Text style={tw`text-red-500 font-semibold pl-2 pt-1 `}>{errors.currentPassword.message}</Text>}

                <Text style={tw`p-1 font-semibold text-lg`}>New Password: </Text>
                <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={tw`bg-white p-3 border border-gray-700 rounded-lg`}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder={"New Password"} secureTextEntry
                        />
                    )}
                    name="newPassword"
                    rules={{ required: {value: true,message: "This field is required"},
                        minLength: {value: 7,message: "Minimum 7 characters long"}}}
                />
                {errors.newPassword && <Text style={tw`text-red-500 font-semibold pl-2 pt-1 `}>{errors.newPassword.message}</Text>}


                <Text style={tw`p-1 font-semibold text-lg`}>Confirm Password: </Text>
                <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{
                        required: { value: true, message: "This field is required" },
                        minLength: { value: 7, message: "Minimum 7 characters long" },
                        validate: value => value === getValues('newPassword') || "Passwords do not match"
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={tw`bg-white p-3 border border-gray-700 rounded-lg`}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder={"Confirm Password"} secureTextEntry
                        />
                    )}
                />
                {errors.confirmPassword && (
                    <Text style={tw`text-red-500 font-semibold pl-2 pt-1`}>{errors.confirmPassword.message}</Text>
                )}

                <TouchableOpacity disabled={!isValid}
                                  onPress={handleChangePassword}
                                  style={tw`mt-3 ${!isValid ? 'bg-gray-700' : 'bg-blue-500' } p-2 rounded-md flex items-center`}>
                    <Text style={tw`text-white font-semibold `} >SAVE PASSWORD</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default ChangePassword;
