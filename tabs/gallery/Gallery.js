import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import {PermissionsAndroid, Platform, FlatList} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import React, {useEffect, useState} from 'react';

const Gallery = () => {
  const [state, setState] = useState(null);

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }

  async function savePicture() {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    CameraRoll.getPhotos({
      first: 200,
      assetType: 'Photos',
    })
      .then(r => {
        setState({photos: r.edges});
      })
      .catch(err => {
        //Error Loading Images
      });
  }
  const Item = ({title, index}) => {
    return (
      <View style={{padding: 2}}>
        <Image
          key={index}
          style={{
            width: 190,
            height: 190,
            borderra: '1px solid red',
            borderRadius: 5,
          }}
          source={{uri: title.node.image.uri}}
        />
      </View>
    );
  };

  React.useEffect(() => {
    savePicture();
  }, []);

  return (
    <View style={{backgroundColor: '#c7f2e8', flex: 1}}>
      <FlatList
        data={state?.photos}
        renderItem={({item, index}) => <Item title={item} index={index} />}
        keyExtractor={(item, index) => index}
        numColumns={2}
        // initialNumToRender={20}
      />
    </View>
  );
};

export default Gallery;
