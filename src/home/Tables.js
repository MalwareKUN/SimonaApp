import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  tw,
  AsyncStorage,
  lebar,
  tinggi,
  Icons,
  moment,
  Animated,
} from './../style/style';
import {dataApi} from './../api/Api';

const Tables = () => {
    const [modal, setmodal] = useState(false);
    const [textkegiatan, settextkegiatan] = useState('');
  const currentDate = moment();
  const formattedDate = currentDate.format('dddd, D MMMM YYYY');
  const [textInputValue, setTextInputValue] = useState('');
  const handleSaveButtonPress = () => {
    alert(`Saving: ${textInputValue}`);
  };

  

  useEffect(() => {
    async function ambilKegiatan(){
        try {
            const silogin = await AsyncStorage.getItem('userId');
            fetch(`${dataApi}/absen?userid=${silogin}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(async function (data) {
                console.log(data)
            })
            .catch(error => {
                console.error(error);
            });
        } catch (error) {
            
        }
    }
    ambilKegiatan();
  }, [])
  


  async function simpanKegiatan(){
        console.log(textkegiatan);
  }

  return (
    <Animatable.View
      animation="fadeInDownBig"
      style={{
        ...tw`bg-white flex-1`,
      }}>

        {/* Modal */}
        {
            modal ? (
                <View style={{  ...tw`absolute flex items-center p-8 justify-center bg-red-500 w-full h-full z-50 bg-[rgba(0,0,0,0.2)]` }}>
                    <View style={{ ...tw`bg-white p-6 w-full rounded-md` }}>
                        <TextInput
                            placeholder="Masukan rencana kegiatan ..."
                            style={{ ...tw`border border-slate-200 p-3` }}
                            onChangeText={(text) => settextkegiatan(text)}
                        />
                        <View style={{ ...tw`flex flex-row items-center justify-center gap-2 pt-5` }}>
                            <TouchableOpacity style={{ ...tw`bg-slate-500 px-6 py-2 rounded-md` }} onPress={() => setmodal(!modal)}>
                                <Text style={{ ...tw`text-white font-medium` }}>BATAL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ ...tw`bg-blue-500 px-6 py-2 rounded-md` }} onPress={() => simpanKegiatan()}>
                                <Text style={{ ...tw`text-white font-medium` }}>SIMPAN KEGIATAN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : null
        }
        {/* END Modal */}
      <View
        style={{
          ...tw`bg-white flex items-center flex-row justify-between pt-12 pb-3 px-6 shadow-lg`,
        }}>
        <Text style={{...tw`font-medium text-xl text-slate-500`}}>
          CATATAN KEGIATAN
        </Text>
        <TouchableOpacity
            onPress={() => setmodal(!modal)}
        >
            <Icons name="plus" size={24} color="blue" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{...tw`p-6`}}>
        <View style={{...tw`bg-white mb-[48px] rounded-md border border-slate-300`}}>
        <View
            style={{
              ...tw`flex flex-row items-center justify-between p-3 bg-white`,
            }}>
            <View style={{...tw`w-1/2`}}>
              <Text style={{...tw`font-medium text-[12px] text-slate-600`}}>
                KEGIATAN HARI
              </Text>
              <Text style={{...tw`font-medium text-[12px] text-slate-600`}}>
                {formattedDate}
              </Text>
            </View>
            <View
              style={{
                ...tw`flex items-center justify-center bg-slate-200 px-3 py-2 rounded-md`,
              }}>
              <Text style={{...tw`font-medium text-[12px] text-slate-800`}}>
                Total Jam Kerja
              </Text>
              <Text style={{...tw`font-normal text-[12px]`}}>
                00 Jam 00 Menit
              </Text>
            </View>
          </View>
            <View style={{...tw`bg-white`}}>
                <ScrollView horizontal style={{...tw``}} showsHorizontalScrollIndicator={false}>
                    <View style={{ ...tw``, width: lebar }}>
                        <View style={{...tw`bg-slate-700 px-3 py-2 flex flex-row items-center justify-between`}}>
                            <Text style={{ ...tw`font-medium text-[12px] text-slate-300 w-1/3 text-center` }}>  CHECK IN </Text>
                            <Text style={{ ...tw`font-medium text-[12px] text-slate-300 w-1/3 text-center` }}>  CHECK OUT </Text>
                            <Text style={{ ...tw`font-medium text-[12px] text-slate-300 w-1/3 text-center` }}>  RENCANA KEGIATAN </Text>
                        </View>
                        <View style={{...tw`bg-slate-100 px-3 py-2 flex flex-row items-center justify-between`}}>
                            <Text style={{ ...tw`font-medium text-[12px] text-slate-500 w-1/3 text-center px-2` }}>12 Des 2023, 12.12.12</Text>
                            <Text style={{ ...tw`font-medium text-[12px] text-slate-500 w-1/3 text-center px-2` }}>12 Des 2023, 12.12.12</Text>
                            <Text style={{ ...tw`font-medium text-[12px] text-slate-500 w-1/3 text-center px-2` }}>skdjgjasgdjhgashjdgjasgdjasgdjh</Text>
                        </View>
                        
                    </View>
                </ScrollView>
            </View>
            </View>
      </ScrollView>
    </Animatable.View>
  );
};

export default Tables;
