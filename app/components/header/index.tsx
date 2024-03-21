import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {responsiveFontSize as rf} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {remove} from '../../utils/storage';
import {setSignOut} from '../../redux/slices/authSlice';
export default ({onBackPress = () => {}, isChatScreen = false}) => {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            remove('@auth');
            dispatch(setSignOut());
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#FF3131'} barStyle="light-content" />
      <View style={styles.topHeaderConatiner}>
        {isChatScreen && (
          <TouchableOpacity onPress={onBackPress}>
            <Icon name="arrow-back" size={rf(2.5)} color="#FFF" />
          </TouchableOpacity>
        )}

        {!isChatScreen && (
          <Image
            source={require('../../assets/header-image.png')}
            resizeMode={'stretch'}
            style={{
              width: 70,
              height: 32,
            }}
          />
        )}
        <Icon
          name="logout"
          size={rf(2.5)}
          color={'white'}
          onPress={handleSignOut}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF3131',
    paddingVertical: 12,
  },
  topHeaderConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 21,
  },
});
