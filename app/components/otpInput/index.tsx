import React from 'react';
import {OtpInput} from 'react-native-otp-entry';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
export default ({
  setCurrentOtp,
}: {
  setCurrentOtp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <OtpInput
      autoFocus
      numberOfDigits={6}
      focusColor="#FF3131"
      focusStickBlinkingDuration={500}
      onTextChange={text => setCurrentOtp(text)}
      onFilled={text => setCurrentOtp(text)}
      theme={{
        containerStyle: {
          marginVertical: hp(3),
          width: wp(90),
        },
        inputsContainerStyle: {},
        pinCodeContainerStyle: {
          height: hp(5.5),
          width: wp(14),
          borderRadius: fp(0.5),
          borderWidth: fp(0.1),
        },
      }}
    />
  );
};
