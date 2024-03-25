import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text, // Import Text from 'react-native'
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {remove} from '../../utils/storage';
import {setSignOut} from '../../redux/slices/authSlice';

export default ({onBackPress = () => {}, isChatScreen = false, user = {}}) => {
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
        {isChatScreen ? (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Icon name="arrow-back" size={rf(3)} color="#FFF" />
            {/* Display the user's name next to the back button if isChatScreen is true */}
            <Text style={styles.userName}>{user?.name}</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}

        {!isChatScreen ? (
          <Image
            source={require('../../assets/header-image.png')}
            resizeMode={'stretch'}
            style={styles.headerImage}
          />
        ) : null}
        <Icon
          name="logout"
          size={rf(3)}
          color={'white'}
          onPress={handleSignOut}
          style={styles.logoutIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF3131',
    paddingVertical: rh(1.5),
  },
  topHeaderConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: rw(5.8),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: 'white',
    fontSize: rf(2.2),
    marginLeft: rw(2.8),
  },
  headerImage: {
    width: rw(19.4),
    height: rh(4.5),
  },
  logoutIcon: {},
});
