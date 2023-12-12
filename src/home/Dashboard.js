import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { tw, AsyncStorage, lebar, tinggi, Icons, moment } from "./../style/style";
import { dataApi } from "./../api/Api";


const Dashboard = ({ navigation }) => {

    const [akun, setakun] = useState('');
    const [loading, setloading] = useState(false);
    const currentDate = moment();
    const formattedDate = currentDate.format('dddd, D MMMM YYYY HH:mm');

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




    return (
        <>
            {
                loading ? (
                    <View style={{
                        ...tw`absolute w-full h-full z-50 flex items-center justify-center`
                    }}>
                        <ActivityIndicator size="50" color="#3b82f6" />
                        <Text style={{ ...tw`text-slate-400 font-medium text-base mt-6` }}>Sedang memuat data ...</Text>
                    </View>
                ) : (
                    <Animatable.View animation="zoomInUp" style={{ ...tw`bg-white flex-1` }}>
                        <View style={{
                            ...tw`bg-white pt-12 pb-3 px-6 shadow-lg`
                        }}>
                            <Text style={{ ...tw`font-medium text-xl text-slate-500` }}>Selamat Datang</Text>
                            <Text style={{ ...tw`font-medium text-base text-slate-500` }}>{akun != '' ? akun.user.nama_gelar : ''}</Text>
                        </View>
                        <ScrollView style={{ ...tw`p-6 bg-white 00` }}>
                            <Text style={{ ...tw`font-medium text-base text-slate-600 mb-6` }}>Catatan Kegiatan</Text>
                            <View style={{ ...tw`p-6 bg-white rounded-md shadow-xl border border-slate-300` }}>
                                <View style={{ ...tw`mb-3` }}>
                                    <Text style={{ ...tw`font-medium text-[14px] text-slate-600` }}>Nama Lengkap</Text>
                                    <Text style={{ ...tw`font-normal text-[14px] text-slate-500` }}>{akun != '' ? akun.user.nama_gelar : ''}</Text>
                                </View>
                                <View style={{ ...tw`mb-3` }}>
                                    <Text style={{ ...tw`font-medium text-[14px] text-slate-600` }}>Waktu Kegiatan</Text>
                                    <Text style={{ ...tw`font-normal text-[14px] text-slate-500` }}>{formattedDate}</Text>
                                </View>
                                <View style={{ ...tw`mb-3` }}>
                                    <Text style={{ ...tw`font-medium text-[14px] text-slate-600` }}>Status Kegiatan</Text>
                                    <Text style={{ ...tw`font-normal text-[14px] text-slate-500` }}>Check in dapat dilakukan hingga pukul 18:00:00</Text>
                                </View>
                                <View style={{ ...tw`mb-3` }}>
                                    <Text style={{ ...tw`font-medium text-[14px] text-slate-600` }}>Status Geolocation</Text>
                                    <Text style={{ ...tw`font-normal text-[14px] text-slate-500` }}>Lokasi anda berada pada range lokasi absensi</Text>
                                </View>
                                <View style={{ ...tw`mb-3` }}>
                                    <Text style={{ ...tw`font-medium text-[14px] text-slate-600` }}>Lokasi Absen</Text>
                                    <Text style={{ ...tw`font-normal text-[14px] text-slate-500` }}>Gedung Lab TS, TI dan TL</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </Animatable.View>
                )
            }

        </>
    )
}

export default Dashboard