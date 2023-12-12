import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Icons from "react-native-vector-icons/Feather";


const Bottombar = ({ state, descriptors, navigation }) => {

    return (
        <View style={{
            ...tw`flex flex-row items-center justify-center bg-white`
        }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            ...tw`flex-1 items-center justify-center py-3`
                        }}
                    >
                        {
                            label == 'Dashboard' ? (
                                <Icons name="home" size={20} color={isFocused ? '#3b82f6' : '#64748b'} />
                            ) : null
                        }
                        {
                            label == 'Tables' ? (
                                <Icons name="calendar" size={20} color={isFocused ? '#3b82f6' : '#64748b'} />
                            ) : null
                        }
                        {
                            label == 'Akun' ? (
                                <Icons name="user" size={20} color={isFocused ? '#3b82f6' : '#64748b'} />
                            ) : null
                        }
                        <Text style={{ ...tw`font-medium text-sm uppercase ${isFocused ? 'text-blue-500' : 'text-slate-500'}` }}>
                            {label == 'Dashboard' ? 'HOME' : null}
                            {label == 'Tables' ? 'KEGIATAN' : null}
                            {label == 'Akun' ? 'Akun' : null}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default Bottombar