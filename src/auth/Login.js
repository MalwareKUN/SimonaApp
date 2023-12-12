import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, Dimensions, Image } from 'react-native';
import tw from "twrnc";
import Icons from "react-native-vector-icons/Feather";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dataApi } from "./../api/Api";
import { Button, Input } from "./../components";

const lebar = Dimensions.get("window").width;
const tinggi = Dimensions.get("window").height;

const Login = ({ navigation }) => {

    useEffect(() => {
        cekLogin();
    }, []);


    async function cekLogin() {
        try {
            const i = await AsyncStorage.getItem('userId');
            console.log(i)
            if (i !== null) {
                navigation.navigate("Base")
            }
        } catch (e) {
            console.log(e)
        }
    }



    const [userid, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [notif, setnotif] = useState(false);

    async function aksiLogin() {

        try {
            const datas = {
                userid: userid,
                password: password,
            }

            console.log(datas)
            fetch(`${dataApi}/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datas),
            })
                .then(response => response.json())
                .then(async function (data) {
                    if (data.status == 'success') {
                        const dx = data.data.id;

                        await AsyncStorage.setItem('userId', dx);
                        navigation.navigate('Base')
                    } else {
                        setnotif(true)
                        setTimeout(() => {
                            setnotif(false)
                        }, 3000);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } catch (err) {
            console.log(err.message)
        }
    }


    return (
        <>
            {
                notif ? (
                    <View
                        style={{
                            ...tw`absolute bottom-0 left-0 right-0 bg-red-500 flex items-center z-50 px-3 py-3 shadow-lg`,
                        }}
                    >
                        <Text style={{ ...tw`font-medium text-base text-slate-400 text-white` }}>LOGIN FAILED</Text>
                        <Text style={{ ...tw`font-normal text-sm text-slate-400 text-white` }}>Login gagal silahkan ulangi kembali</Text>
                    </View>
                ) : null
            }
            <ScrollView>
                <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />

                <View
                    style={{
                        ...tw`p-8 bg-white flex items-center justify-center`,
                        width: lebar,
                        height: tinggi + 50,
                    }}
                >
                    <Image
                        source={require('./../../assets/logo.png')}
                        resizeMode='contain'
                        style={{
                            width: lebar,
                            height: 300,
                            zIndex: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}
                    />
                    <View>
                        <Input
                            leading="user"
                            placeholder="Masukan User ID ..."
                            onChangeText={(text) => setusername(text)}
                            variant="default"
                        />
                        <Input
                            leading="lock"
                            placeholder="Masukan Password ..."
                            onChangeText={(text) => setpassword(text)}
                            variant="password"
                        />
                        <Button label="SIGN-IN" action={() => aksiLogin()} />
                    </View>
                </View>
            </ScrollView>
        </>

    )
}

export default Login