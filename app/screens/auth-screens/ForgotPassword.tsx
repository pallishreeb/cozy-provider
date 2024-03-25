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
import {axiosPublic} from '../../utils/axiosConfig';
import {endpoints} from '../../constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigations/auth-navigator';
type ForgotPasswordScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'ForgotPassword'
>;
const SignIn = ({navigation}: ForgotPasswordScreenProps) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{
    email: string | null;
  }>();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const validateForm = () => {
    let errors: {email: string | null} = {
      email: null,
    };
    // Validate email field
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    setErrors(errors);
    const isErrors = errors.email === null;
    setIsFormValid(isErrors);
  };
  const handleSubmit = async () => {
    if (!isFormValid) {
      // Form is invalid, display error messages
      console.log('Form has errors. Please correct them.');
      Alert.alert('Errors', 'Form has errors. Please correct them.');
    }
    try {
      setIsLoading(true);
      const response = await axiosPublic.post(`${endpoints.FORGOT_PASSWORD}`, {
        email,
      });
      // console.log('forgot pass response', response?.data);
      Alert.alert('Info', `${response?.data?.message}`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('ResetPassword', {email}),
        },
      ]);
    } catch (error: Error | any) {
      console.log('inside catch', error?.response);
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
                Forgot Password
              </Text>
              <Text style={[styles.headingText, styles.headingText2]}>
                Enter your email address
              </Text>
            </ImageBackground>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            <Input
              placeholder="johndoe@gmail.com"
              keyboardType="email-address"
              autoCompleteType="email"
              leftIconName="envelope"
              value={email}
              setValue={setEmail}
            />
            <Text style={styles.errorMSg}>{errors?.email}</Text>
          </View>
          <View style={styles.submitButtonConatiner}>
            <SubmitButton
              title={isLoading ? 'Submitting' : 'Submit'}
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
    marginBottom: rh(5.625),
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  icon: {
    marginHorizontal: rw(2.5),
  },
  input: {
    flex: 1,
    paddingVertical: rh(1.25),
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
