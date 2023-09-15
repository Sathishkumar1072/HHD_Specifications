import {View, Text, TextInput,TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

const LandingPage = ({navigation}) => {
  const arrowIcon = (
    <Icon
      name="arrow-right"
      size={18}
      color="white"
      style={{height: 20, width: '80px'}}
    />
  );
  return (
    <>
      <View
        style={{
          backgroundColor: '#c7f2e8',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'yellow', fontSize: 28, color: '#014746'}}>
          Welcome to my HHD
        </Text>
        <View>
          <Text style={{color: 'yellow', fontSize: 18, color: '#014746'}}>
            Click to Access Device Specification
          </Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('TabsComponent') }>
          <View
            style={{
              backgroundColor: 'green',
              height: 50,
              width: 50,
              borderRadius: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            {arrowIcon}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LandingPage;
