import { useEffect, useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StatusBar,Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info'

const Wifi = () => {
  const [serialNumber, setSerialNumber] = useState('');

  useEffect(() => {
    const fetchSerialNumber = async () => {
      const serial = await DeviceInfo.getSerialNumber();
      setSerialNumber(serial);
    };

    fetchSerialNumber();
  }, []);
  let brand = DeviceInfo.getBrand();
  console.log("serialNumber-->",serialNumber,brand)
  console.log("Answer-->",Platform.constants)
  return (
    <View>
      <Text>Wifi</Text>
      <Text>{Platform.constants.Serial}</Text>
      <Text>serialNumber---{serialNumber}</Text>
    </View>
  );
};

export default Wifi;
