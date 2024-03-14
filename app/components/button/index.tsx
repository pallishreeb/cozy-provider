import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
export default ({onPress = () => {}, title = '', disabled = false}) => {
  return (
    <TouchableOpacity
      style={[styles.submitButton, {opacity: disabled ? 0.5 : 1}]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.submmitButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#FF3131',
    borderRadius: 5,
    padding: 15,
    marginHorizontal: wp(6),
    shadowColor: '#FF31311A',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
  },
  submmitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
