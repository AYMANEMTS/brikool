import React, {useState} from 'react';
import tw from "twrnc";
import {Alert, Image, TextInput, Text, TouchableOpacity, View} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {useForm, Controller } from "react-hook-form";
import {useUserContext} from "../../context/UserContext";
import displayImage from "../../utils/DisplayImage";
import {Picker} from "@react-native-picker/picker";
import cities from "../../utils/citiesInMorocco";
import ClientApi from "../../api/ClientApi";
import {showErrorToast, showInfoToast, showSuccessToast} from "../../utils/toasts";

function UpdateInformation() {
    const [imagePreview, setImagePreview] = useState("");
    const {user} = useUserContext()
    const { getValues,reset,setValue,control , formState:{errors,isValid,isDirty}} = useForm({mode:"onChange",
        defaultValues: {
            name: user.name || "",
            email: user.email || "",
            city: user.city || "",
            image: user.image
        }
    });
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("Permission required", "Please grant camera roll permissions to upload an image.");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setValue('image',result.assets[0])
            setImagePreview(result.assets[0].uri);
        }
    };

    const handleUpdateInformation = async () => {
        try {
            const data = getValues()
            const formData = new FormData()
            formData.append('name',data.name)
            formData.append('city',data.city)
            if (user.image !== data.image){
                formData.append('image', {
                    // uri: (Platform.OS === 'android' ? data.image.uri : data.image.uri.replace('file://', '')),
                    uri: data.image.uri,
                    type: data.image.mimeType,
                    name: data.image.fileName
                });
            }
            const res = await ClientApi.updateInformation(formData)
            if (res.status === 200){
                showSuccessToast('Information Updated SuccessFully')
            }else{
                reset()
                showInfoToast('Failed to updated information')
            }
        }catch (e) {
            console.log(e)
            showErrorToast('Problem in server. please try again later!')
        }
    }
    return (
        <>
            <View style={tw`mb-6`}>
                <Text style={tw`text-lg font-bold mb-4`}>Update Information</Text>
                <TouchableOpacity onPress={pickImage} style={tw`mb-4`}>
                    <Image source={{ uri: displayImage(imagePreview,user) }} style={tw`w-24 h-24 rounded-full`} />
                </TouchableOpacity>
                <Text style={tw`p-1 font-semibold text-lg`}>Full Name: </Text>
                <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={tw`bg-white p-3 border border-gray-700 rounded-lg`}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                        />
                    )}
                    name="name"
                    rules={{ required: {value: true,message: "This field is required"} }}
                />
                {errors.name && <Text style={tw`text-red-500 font-semibold pl-2 pt-1 `}>{errors.name.message}</Text>}

                <Text style={tw`p-1 font-semibold text-lg mt-3`}>Email: </Text>
                <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                        <TextInput
                            style={tw`bg-white p-3 border border-gray-700 rounded-lg`}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            editable={false} readOnly={true}
                        />
                    )}
                    name="email"
                />
                <Text style={tw`p-1 font-semibold text-lg mt-3`}>City: </Text>
                <Controller
                    control={control}
                    name="city" // Name should match the field you want to register
                    rules={{ required: { value: true, message: "This field is required" } }}
                    render={({ field: { onChange, value } }) => (
                        <View style={tw`bg-white border border-gray-500 rounded-lg`}>
                            <Picker
                                selectedValue={value}
                                onValueChange={(value) => onChange(value)}
                                style={tw`text-gray-700`}
                            >
                                {cities?.map((city, key) => (
                                    <Picker.Item key={key} label={city} value={city} />
                                ))}
                            </Picker>
                        </View>
                    )}
                />
                {errors.city && <Text style={tw`text-red-500 font-semibold pl-2 pt-1`}>{errors.city.message}</Text>}

                <TouchableOpacity disabled={!isValid || !isDirty}
                    onPress={handleUpdateInformation}
                    style={tw`mt-3 ${!isValid || !isDirty ? 'bg-gray-700' : 'bg-blue-500' } p-2 rounded-md flex items-center`}>
                    <Text style={tw`text-white font-semibold `} >SAVE CHANGES</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default UpdateInformation;
