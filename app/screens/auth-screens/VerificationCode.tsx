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
const SignIn = ({navigation, route}) => {
  const {email, previousRoute} = route.params;
  const [currentOtp, setCurrentOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPublic.post(`${endpoints.VERIFY_OTP}`, {
        email,
        otp: currentOtp,
      });
      Alert.alert('Info', `Verification Successfull`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SignIn'),
        },
      ]);
    } catch (error) {
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

export default SignIn;

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
    marginBottom: 45,
    borderBottomStartRadius: 80,
    borderBottomEndRadius: 80,
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
    marginTop: 20,
    color: 'white',
  },
  headingText1: {
    fontSize: 24, // Adjust the size as needed
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  headingText2: {
    fontSize: 18, // Adjust for smaller text
    fontWeight: 'normal', // Or specify the desired weight
    textTransform: 'none', // Default, but explicitly stated for clarity
    marginTop: 5, // Add some space between the two texts
  },
  overlayView: {
    width: rw(100),
    height: rh(30),
    position: 'absolute',
    backgroundColor: '#FF3120',
    opacity: 0.7,
  },
  fieldContainer: {
    marginTop: 20,
    marginHorizontal: rw(6),
  },
  label: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },

  forgotPasswordContainer: {
    marginVertical: 20,
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: '#FF3131',
    textDecorationLine: 'none',
  },
  submitButtonConatiner: {
    marginBottom: 20,
    marginTop: 20,
  },
  footer: {
    marginTop: 'auto', // Pushes the footer to the bottom
    paddingTop: 20, // Adjust based on your design
    paddingBottom: 20, // Adjust based on your design
    paddingHorizontal: 20,
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
