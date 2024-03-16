import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
type Props = {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  label: string;
};
const ProfileInput = ({
  value,
  onChangeText,
  placeholder,
  label,
}: Props): JSX.Element => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default ProfileInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: rw(2.5),
    marginBottom: rh(1),
    borderRadius: rw(1.2),
    width: '100%',
  },
  label: {
    fontSize: rf(2),
    color: '#000',
    marginBottom: rh(1),
    marginLeft: rw(2),
  },
});
