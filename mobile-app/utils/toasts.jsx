import React from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-root-toast';

// Function to display a toast with custom content
const showCustomToast = (content, options = {}) => {
    Toast.show(content, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        ...options,
    });
};

// Success toast with emoji
export const showSuccessToast = (message) => {
    showCustomToast(
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#FFFFFF' }}>✅</Text>
            <Text style={{ marginLeft: 8, fontSize: 16,fontWeight: 'bold', color: '#FFFFFF' }}>{message}</Text>
        </View>,
        {
            backgroundColor: '#4CAF50',
            textColor: '#FFFFFF',
        }
    );
};

// Info toast with emoji
export const showInfoToast = (message) => {
    showCustomToast(
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#FFFFFF' }}>ℹ️</Text>
            <Text style={{ marginLeft: 8, fontSize: 16, color: '#FFFFFF' }}>{message}</Text>
        </View>,
        {
            backgroundColor: '#2196F3',
            textColor: '#FFFFFF',
        }
    );
};

// Error toast with emoji
export const showErrorToast = (message) => {
    showCustomToast(
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#FFFFFF' }}>❌</Text>
            <Text style={{ marginLeft: 8, fontSize: 16, color: '#FFFFFF' }}>{message}</Text>
        </View>,
        {
            backgroundColor: '#F44336',
            textColor: '#FFFFFF',
        }
    );
};
