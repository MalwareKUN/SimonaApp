
import { Dimensions } from 'react-native';
import tw from "twrnc";
import Icons from "react-native-vector-icons/Feather";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';

import moment from 'moment';
import 'moment/locale/id';


const lebar = Dimensions.get("window").width;
const tinggi = Dimensions.get("window").height;


export {
    tw,
    Icons,
    moment,
    lebar,
    tinggi,
    AsyncStorage,
    Animated,
}