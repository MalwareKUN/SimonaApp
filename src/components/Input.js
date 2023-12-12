import React, { useState } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import tw from "twrnc";
import Icons from "react-native-vector-icons/Feather";
const lebar = Dimensions.get("window").width;
const tinggi = Dimensions.get("window").height;

const Input = ({
    label,
    placeholder,
    leading,
    trailing,
    onChangeText,
    variant
}) => {

    const [focusInput, setFocusInput] = useState(false);
    const [pass, setpass] = useState(true);

    if(variant == 'default'){
        return (
            <View style={{ ...tw`mb-6` }}>
                <View
                    style={{
                        ...tw`flex items-center justify-center absolute z-10 top-0 h-[48px] w-[48px]`
                    }}
                >
                    <Icons name={leading} size={20} color={focusInput ? 'blue' : 'grey'} />
                </View>
                <TextInput
                    style={{
                        ...tw`border-2 border-slate-300 rounded-md px-[48px] bg-white py-2 ${focusInput ? 'border-blue-500' : null}`,
                        width: lebar - 64
                    }}
                    placeholder={placeholder}
                    onFocus={() => setFocusInput(true)}
                    onBlur={() => setFocusInput(false)}
                    placeholderTextColor={'grey'}
                    onChangeText={onChangeText}
                />
                
            </View>
        )
    }
    if(variant == 'password'){
        return (
            <View style={{ ...tw`mb-6` }}>
                <View
                    style={{
                        ...tw`flex items-center justify-center absolute z-10 top-0 h-[48px] w-[48px]`
                    }}
                >
                    <Icons name={leading} size={20} color={focusInput ? 'blue' : 'grey'} />
                </View>
                <TextInput
                    style={{
                        ...tw`border-2 border-slate-300 rounded-md px-[48px] bg-white py-2 ${focusInput ? 'border-blue-500' : null}`,
                        width: lebar - 64
                    }}
                    placeholder={placeholder}
                    onFocus={() => setFocusInput(true)}
                    onBlur={() => setFocusInput(false)}
                    placeholderTextColor={'grey'}
                    onChangeText={onChangeText}
                    secureTextEntry={pass}
                />
                <TouchableOpacity
                    onPress={() =>setpass(!pass)}
                    style={{
                        ...tw`flex items-center justify-center absolute z-10 top-0 right-0 h-[48px] w-[48px]`
                    }}
                >
                    <Icons name={!pass ? 'eye' : 'eye-off'} size={20} color={!pass ? 'blue' : 'grey'} />
                </TouchableOpacity>
            </View>
        )
    }
   
}

export default Input