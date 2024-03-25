import React, {useEffect, useState} from 'react';
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
import Input from '../../components/input';
import SubmitButton from '../../components/button';
import OtpInput from '../../components/otpInput';
import {axiosPublic} from '../../utils/axiosConfig';
import {endpoints} from '../../constants';
import {AuthStackParamList} from '../../navigations/auth-navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
type ResetPasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'ResetPassword'
>;
const SignIn = ({navigation, route}: ResetPasswordScreenProps) => {
  const {email} = route.params;
  const [currentOtp, setCurrentOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{
    password: string | null;
    confirmPassword: string | null;
  }>();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const validateForm = () => {
    let errors: {
      password: string | null;
      confirmPassword: string | null;
    } = {
      password: null,
      confirmPassword: null,
    };

    // Validate password field
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Confirm Password must be equals to Password';
    }
    // Set the errors and update form validity
    // Check if both errors.email and errors.password are null
    setErrors(errors);
    const isErrors =
      errors.confirmPassword === null && errors.password === null;
    setIsFormValid(isErrors);
  };
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, confirmPassword]);
  const handleSubmit = async () => {
    if (!isFormValid) {
      // Form is invalid, display error messages
      console.log('Form has errors. Please correct them.');
      Alert.alert('Errors', 'Form has errors. Please correct them.');
    }
    try {
      setIsLoading(true);
      const response = await axiosPublic.post(`${endpoints.RESET_PASSWORD}`, {
        otp: currentOtp,
        email,
        password,
      });
      Alert.alert('Info', `${response?.data?.message}`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('SignIn'),
        },
      ]);
    } catch (error: Error | any) {
      console.log('inside catch', error?.response);
      Alert.alert(
        'Information',
        `Reset Password Failed \nPlease try again later`,
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
                Reset Password
              </Text>
              <Text style={[styles.headingText, styles.headingText2]}>
                {
                  'Enter the verification code\nSent to johndoe@gmail.com\nTo Reset Password'
                }
              </Text>
            </ImageBackground>
          </View>

          <View style={styles.fieldContainer}>
            <OtpInput setCurrentOtp={setCurrentOtp} />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Password</Text>
            <Input
              placeholder="*************"
              value={password}
              setValue={setPassword}
              leftIconName="lock"
              secureTextEntry={!passwordVisible}
              rightIconName={passwordVisible ? 'eye' : 'eye-slash'}
              iconRightPress={togglePasswordVisibility}
            />
            <Text style={styles.errorMSg}>{errors?.password}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}> Confirm Password</Text>
            <Input
              placeholder="*************"
              value={confirmPassword}
              setValue={setConfirmPassword}
              leftIconName="lock"
              secureTextEntry={!confirmPasswordVisible}
              rightIconName={confirmPasswordVisible ? 'eye' : 'eye-slash'}
              iconRightPress={toggleConfirmPasswordVisibility}
            />
            <Text style={styles.errorMSg}>{errors?.confirmPassword}</Text>
          </View>
          <View style={styles.submitButtonConatiner}>
            <SubmitButton
              title={isLoading ? 'Submitting' : 'Reset'}
              onPress={handleSubmit}
              disabled={!isFormValid || isLoading}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate('SignUp')}>
              Sign Up
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
  errorMSg: {
    color: 'red',
    fontSize: rf(1.75),
    marginBottom: rh(1),
  },
  illustrationContainer: {
    width: rw(100),
    height: rh(30),
    backgroundColor: '#FF3130',
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottomStartRadius: rw(20),
    borderBottomEndRadius: rw(20),
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
    marginBottom: rh(2.5), // Adjusted for responsiveness
    marginTop: rh(2.5), // Adjusted for responsiveness
  },
  footer: {
    marginTop: 'auto',
    paddingTop: rh(2.5), // Adjusted for responsiveness
    paddingBottom: rh(2.5), // Adjusted for responsiveness
    paddingHorizontal: rw(5), // Adjusted for responsiveness
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
