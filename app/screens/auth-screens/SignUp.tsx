import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
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
const SignIn = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{
    name: string | null;
    email: string | null;
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
      name: string | null;
      email: string | null;
      password: string | null;
      confirmPassword: string | null;
    } = {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
    };
    // Validate email field
    if (!name) {
      errors.name = 'Name is required.';
    } else if (name.length < 3) {
      errors.password = 'Password must be at least 3 characters.';
    }
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }
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
      errors.email === null &&
      errors.password === null &&
      errors.confirmPassword === null &&
      errors.name === null;
    setIsFormValid(isErrors);
  };
  useEffect(() => {
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, confirmPassword, name]);
  const handleSubmit = async () => {
    if (!isFormValid) {
      // Form is invalid, display error messages
      console.log('Form has errors. Please correct them.');
      Alert.alert('Errors', 'Form has errors. Please correct them.');
    }
    try {
      setIsLoading(true);
      const response = await axiosPublic.post(`${endpoints.SIGN_UP}`, {
        email,
        password,
        name,
      });
      Alert.alert('Info', `${response.data.message}`, [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('VerificationCode', {
              email: email,
              previousRoute: 'SignUp',
            }),
        },
      ]);
    } catch (error) {
      console.log('inside catch', error.response);
      Alert.alert('Information', `Sign Up failed \nPlease try again later`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <StatusBar backgroundColor={'#FF3131'} barStyle="light-content" />
        <ScrollView
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
                Register
              </Text>
              <Text style={[styles.headingText, styles.headingText2]}>
                Create a New Account
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Name</Text>
            <Input
              placeholder="johndoe"
              leftIconName="user"
              value={name}
              setValue={setName}
            />
            <Text style={styles.errorMSg}>{errors?.name}</Text>
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
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Password</Text>
            <Input
              placeholder="*************"
              value={password}
              setValue={setPassword}
              leftIconName="lock"
              secureTextEntry={!passwordVisible}
              isRightIcon={true}
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
              isRightIcon={true}
              secureTextEntry={!confirmPasswordVisible}
              rightIconName={confirmPasswordVisible ? 'eye' : 'eye-slash'}
              iconRightPress={toggleConfirmPasswordVisibility}
            />
            <Text style={styles.errorMSg}>{errors?.confirmPassword}</Text>
          </View>
          <View style={styles.submitButtonConatiner}>
            <SubmitButton
              title={isLoading ? 'Submitting' : 'Sign Up'}
              onPress={handleSubmit}
              disabled={!isFormValid || isLoading}
            />
          </View>
        </ScrollView>
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
    height: rh(25),
    backgroundColor: '#FF3130',
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottomStartRadius: 80,
    borderBottomEndRadius: 80,
  },
  illustrationImg: {
    height: rf(25),
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
    marginTop: 10,
    marginHorizontal: rw(6),
  },
  label: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  errorMSg: {
    color: 'red',
    fontSize: 14,
    // marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  icon: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
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
