import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
interface ListItem {
  id: number | string;
  name: string;
}
interface Props {
  value: string | number | null;
  setValue: (value: string | number) => void;
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
              key={category?.id}
              label={category.name}
              value={category.id}
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
