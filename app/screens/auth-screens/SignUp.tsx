import React, {useState} from 'react';
import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Input from '../../components/input';
import SubmitButton from '../../components/button';
const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <StatusBar backgroundColor={'#FF3131'} barStyle="light-content" />
        <View
          style={{
            height: hp(90),
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
            <Text style={styles.label}>Email</Text>
            <Input
              placeholder="johndoe@gmail.com"
              keyboardType="email-address"
              autoCompleteType="email"
              leftIconName="envelope"
              value={email}
              setValue={setEmail}
            />
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
          </View>
          <View style={styles.submitButtonConatiner}>
            <SubmitButton
              onPress={() => navigation.navigate('VerificationCode')}
              title="Sign Up"
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
    width: wp(100),
    height: hp(30),
    backgroundColor: '#FF3130',
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottomStartRadius: 80,
    borderBottomEndRadius: 80,
  },
  illustrationImg: {
    height: fp(30),
    width: fp(30),
    marginTop: hp(-3),
  },

  headingText: {
    textAlign: 'left',
    top: fp(10),
    left: fp(-6),
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
    width: wp(100),
    height: hp(30),
    position: 'absolute',
    backgroundColor: '#FF3120',
    opacity: 0.7,
  },
  fieldContainer: {
    marginTop: 20,
    marginHorizontal: wp(6),
  },
  label: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
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