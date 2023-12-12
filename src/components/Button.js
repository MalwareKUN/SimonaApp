import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import tw from "twrnc";
const lebar = Dimensions.get("window").width;
const tinggi = Dimensions.get("window").height;


const Button = ({ label, action }) => {
    return (
        <TouchableOpacity
            onPress={action}
            style={{
                ...tw`w-full h-[48px] mt-3 flex items-center justify-center bg-blue-500 rounded-md shadow-md`,
                width: lebar - 65
            }}
        >
            <Text style={{ ...tw`font-medium text-base text-white` }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default Button