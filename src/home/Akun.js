import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { tw, AsyncStorage, lebar, tinggi, Icons } from "./../style/style";
import { dataApi } from "./../api/Api";

const Akun = ({ navigation }) => {

    const [akun, setakun] = useState('');
    const [loading, setloading] = useState(false);

    useEffect(() => {
        ambilData()
    }, [])



    async function ambilData() {
        try {
            setloading(true)
            const id = await AsyncStorage.getItem('userId');
            fetch(`${dataApi}/me?userid=${id}`)
                .then(response => response.json())
                .then(async function (data) {
                    setloading(false)
                    if (data.status == 'success') {
                        const dx = data.data;
                        setakun(dx)

                    } else {
                        setloading(false)
                    }
                })
                .catch(error => {
                    setloading(false)
                    console.error(error);
                });
        } catch (error) {
            setloading(false)
        }
    }


    async function aksilogout() {
        navigation.navigate('Login')
    }

    async function logout() {

        Alert.alert('Yakin Ingin Logout Dari Akun Ini ?', '', [
            {
                text: 'BATAL',
                style: 'cancel',
            },
            { text: 'YAKIN', onPress: () => aksilogout() },
        ]);

    }

    return (
        <View style={{ ...tw`relative` }}>
            <View style={{
                ...tw`bg-blue-500 pt-12 pb-3 px-6 shadow-lg`
            }}>
                <Text style={{ ...tw`font-medium text-xl text-white` }}>AKUN</Text>
            </View>

            {
                loading ? (
                    <View style={{
                        ...tw`absolute w-full  z-50 flex items-center justify-center `,
                        height: tinggi
                    }}>
                        <ActivityIndicator size="50" color="#3b82f6" />
                        <Text style={{ ...tw`text-slate-400 font-medium text-base mt-6` }}>Sedang memuat data ...</Text>
                    </View>
                ) : (
                    <View style={{ ...tw`bg-white h-full` }}>
                        <View style={{ ...tw`p-6 bg-white rounded-md` }}>
                            <View style={{ ...tw`mb-3 border-b border-b-slate-300 py-3` }}>
                                <Text style={{ ...tw`font-medium text-[14px] text-slate-600` }}>Nama</Text>
                                <Text style={{ ...tw`font-normal text-[14px] text-slate-500` }}>{akun != '' ? akun.user.nama : ''}</Text>
                            </View>
                            <View style={{ ...tw`mb-3 border-b border-b-slate-300 py-3` }}>
                                <Text style={{ ...tw`font-medium text-[14px] text-slate-600` }}>Nama Gelar</Text>
                                <Text style={{ ...tw`font-normal text-[14px] text-slate-500` }}>{akun != '' ? akun.user.nama_gelar : ''}</Text>
                            </View>
                            <View style={{ ...tw`mb-3 border-b border-b-slate-300 py-3` }}>
                                <Text style={{ ...tw`font-medium text-[14px] text-slate-600` }}>Jenis Kelamin</Text>
                                <Text style={{ ...tw`font-normal text-[14px] text-slate-500` }}>{akun != '' ? akun.user.jenis_kelamin : ''}</Text>
                            </View>
                            <View style={{ ...tw`mb-3 border-b border-b-slate-300 py-3` }}>
                                <Text style={{ ...tw`font-medium text-[14px] text-slate-600` }}>NIP Label</Text>
                                <Text style={{ ...tw`font-normal text-[14px] text-slate-500` }}>{akun != '' ? akun.user.nip_label : ''}</Text>
                            </View>
                            <View style={{ ...tw`mb-3 border-b border-b-slate-300 py-3` }}>
                                <Text style={{ ...tw`font-medium text-[14px] text-slate-600` }}>NIP Value</Text>
                                <Text style={{ ...tw`font-normal text-[14px] text-slate-500` }}>{akun != '' ? akun.user.nip_value : ''}</Text>
                            </View>
                            <View style={{ ...tw`mb-3 flex items-end py-3` }}>
                                <TouchableOpacity
                                    onPress={() => logout()}
                                    style={{ ...tw`flex items-center justify-center px-6 py-4 bg-red-500 rounded-md` }}
                                >
                                    <Text style={{ ...tw`font-medium text-base text-white uppercase` }}>LOGOUT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            }
        </View>
    )
}

export default Akun