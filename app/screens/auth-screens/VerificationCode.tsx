import React, {useState} from 'react';
import {
  Alert,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OtpInput from '../../components/otpInput';
import SubmitButton from '../../components/button';
import {axiosPublic} from '../../utils/axiosConfig';
import {endpoints} from '../../constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigations/auth-navigator';
type VerificationCodeScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'VerificationCode'
>;
const VerificationCode = ({navigation, route}: VerificationCodeScreenProps) => {
  const {email} = route.params;
  const [currentOtp, setCurrentOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      // const response =
      await axiosPublic.post(`${endpoints.VERIFY_OTP}`, {
        email,
        otp: currentOtp,
      });
      Alert.alert('Info', `Verification Successfull`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SignIn'),
        },
      ]);
    } catch (error: Error | any) {
      console.log('inside catch', error?.response);
      Alert.alert(
        'Information',
        `Verification Failed Due To ${error?.response?.data?.otp}  \nPlease try again later`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <StatusBar backgroundColor={'#FF3131'} barStyle="light-content" />
        <View
          style={{
            height: rh(90),
            backgroundColor: 'white',
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 80,
          }}>
          <View style={styles.illustrationContainer}>
            <ImageBackground
              source={require('../../assets/auth-image.png')}
              style={styles.illustrationImg}>
              <View style={styles.overlayView} />
              <Text style={[styles.headingText, styles.headingText1]}>
                Verification Code
              </Text>
              <Text style={[styles.headingText, styles.headingText2]}>
                {`Enter the verification code \nSent to  ${email}`}
              </Text>
            </ImageBackground>
          </View>

          <View style={styles.fieldContainer}>
            <OtpInput setCurrentOtp={setCurrentOtp} />
          </View>
          <View style={styles.submitButtonConatiner}>
            <SubmitButton
              title={isLoading ? 'Verifing' : 'Verify'}
              onPress={handleVerifyOtp}
              disabled={isLoading}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate('SignIn')}>
              Login
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default VerificationCode;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FF3131',
  },
  illustrationContainer: {
    width: rw(100),
    height: rh(30),
    backgroundColor: '#FF3130',
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: rh(5.625),
    borderBottomStartRadius: rw(10),
    borderBottomEndRadius: rw(10),
  },
  illustrationImg: {
    height: rf(30),
    width: rf(30),
    marginTop: rh(-3),
  },

  headingText: {
    textAlign: 'left',
    top: rf(10),
    left: rf(-6),
    marginTop: rh(2.5),
    color: 'white',
  },
  headingText1: {
    fontSize: rf(3),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  headingText2: {
    fontSize: rf(2.25),
    fontWeight: 'normal',
    textTransform: 'none',
    marginTop: rh(0.625),
  },
  overlayView: {
    width: rw(100),
    height: rh(30),
    position: 'absolute',
    backgroundColor: '#FF3120',
    opacity: 0.7,
  },
  fieldContainer: {
    marginTop: rh(2.5),
    marginHorizontal: rw(6),
  },
  label: {
    fontSize: rf(2),
    color: 'gray',
    marginBottom: rh(0.625),
  },

  forgotPasswordContainer: {
    marginVertical: rh(2.5),
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: '#FF3131',
    textDecorationLine: 'none',
  },
  submitButtonConatiner: {
    marginBottom: rh(2.5),
    marginTop: rh(2.5),
  },
  footer: {
    marginTop: 'auto',
    paddingTop: rh(2.5),
    paddingBottom: rh(2.5),
    paddingHorizontal: rw(5),
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    textAlign: 'center',
  },
  signUpText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
