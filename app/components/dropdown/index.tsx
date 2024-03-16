import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
interface ListItem {
  label: string;
  value: string;
}
interface Props {
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  list: Array<ListItem>;
  label: string;
  placeholder: string;
}
const Dropdown = ({value, setValue, list, label, placeholder}: Props) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={itemValue => {
            console.log(itemValue);

            setValue(itemValue);
          }}
          style={styles.picker}
          dropdownIconColor={'gray'}>
          <Picker.Item label={placeholder} value={undefined} />
          {list?.map(category => (
            <Picker.Item
              key={category.value}
              label={category.label}
              value={category.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  label: {
    fontSize: rf(2),
    color: '#000',
    marginLeft: rw(2),
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: rh(1),
    marginTop: rh(1),
  },
  picker: {
    height: rh(6), // Adjust the height
  },
});
