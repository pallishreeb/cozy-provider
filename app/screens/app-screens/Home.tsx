import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
import Header from '../../components/header';
import {Picker} from '@react-native-picker/picker';
import Button from '../../components/button';
const Home = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [days, setDays] = useState([
    {name: 'Monday', isEnabled: true, from: '', to: ''},
    {name: 'Tuesday', isEnabled: true, from: '', to: ''},
    {name: 'Wednesday', isEnabled: true, from: '', to: ''},
    {name: 'Thursday', isEnabled: true, from: '', to: ''},
    {name: 'Friday', isEnabled: true, from: '', to: ''},
    {name: 'Saturday', isEnabled: false, from: '', to: ''},
    {name: 'Sunday', isEnabled: false, from: '', to: ''},
    // Add all days...
  ]);
  const hours = [
    {label: '9:00 AM', value: '9:00 AM'},
    {label: '9:00 AM', value: '9:00 AM'},
  ];
  const toggleDay = index => {
    const newDays = [...days];
    newDays[index].isEnabled = !newDays[index].isEnabled;
    setDays(newDays);
  };
  const setDayTime = (index, type, value) => {
    const updatedDays = days.map((day, i) =>
      i === index ? {...day, [type]: value} : day,
    );
    setDays(updatedDays); // Assuming you have a state setter for your days array
  };
  // Placeholder for handling time selection
  // const setTime = (index, time, timeType) => {
  //   // Implementation depends on the type of picker you choose
  // };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={{
          paddingTop: hp(2),
          paddingBottom: hp(2),
        }}>
        <Text style={styles.headerText1}>
          <Text style={{color: '#333'}}>Set Your </Text> Business Hours
        </Text>
        <Text style={styles.headerText2}>Your Business Hours</Text>
        <View style={styles.grayBar}></View>
        {/* Switch and Label */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Enable</Text>
          <Switch
            trackColor={{false: '#767577', true: '#FF3131'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Quick enable or disable business</Text>

        {/* Gray Bar */}
        <View style={styles.grayBar}></View>
        {days.map((day, index) => (
          <View key={day.name} style={styles.dayRow}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.dayName}>{day.name}</Text>
              <Switch
                value={day.isEnabled}
                onValueChange={() => toggleDay(index)}
              />
            </View>

            {day.isEnabled ? (
              <>
                {/* Picker for "From" Time */}
                <View style={styles.timePickerContainer}>
                  <Text style={styles.timeLabel}>From</Text>
                  <View style={styles.timePickerBox}>
                    <Picker
                      selectedValue={day.from}
                      style={styles.timePicker}
                      onValueChange={itemValue =>
                        setDayTime(index, 'from', itemValue)
                      }>
                      {/* Dynamically render Picker.Items based on your hours array */}
                      {hours.map((hour, hourIndex) => (
                        <Picker.Item
                          key={hourIndex}
                          label={hour.label}
                          value={hour.value}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                {/* Picker for "To" Time */}
                <View style={styles.timePickerContainer}>
                  <Text style={styles.timeLabel}>To</Text>
                  <View style={styles.timePickerBox}>
                    <Picker
                      selectedValue={day.to}
                      style={styles.timePicker}
                      onValueChange={itemValue =>
                        setDayTime(index, 'to', itemValue)
                      }>
                      {/* Dynamically render Picker.Items based on your hours array */}
                      {hours.map((hour, hourIndex) => (
                        <Picker.Item
                          key={hourIndex}
                          label={hour.label}
                          value={hour.value}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              </>
            ) : (
              // Display "Closed" in a box that resembles an input
              <View style={[styles.timePickerBox, styles.closedBox]}>
                <Text style={styles.closedText}>Closed</Text>
              </View>
            )}
          </View>
        ))}
        <Button title="Update" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText1: {
    fontSize: fp(2.8),
    textTransform: 'uppercase',
    color: '#FF3131',
    fontWeight: 'bold',
    marginLeft: wp(5),
    marginTop: hp(2),
  },
  headerText2: {
    fontSize: fp(1.7),
    textTransform: 'uppercase',
    color: '#5B5B5B',
    marginLeft: wp(5),
    marginVertical: hp(0.5),
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
    // marginTop: hp(1),
  },
  switchLabel: {
    fontSize: fp(2),
    color: '#333',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: fp(1.7),
    color: '#5B5B5B',
    marginLeft: wp(5),
    marginTop: hp(1),
  },
  grayBar: {
    height: hp(0.2),
    backgroundColor: '#D3D3D3',
    marginVertical: hp(1.7),
    marginHorizontal: wp(1),
  },
  timePickerContainer: {
    flexDirection: 'column', // Change from row to column
    alignItems: 'center',
    marginVertical: 5,
    width: wp(37),
    // Adjust width as necessary to fit your layout
  },
  timeLabel: {
    fontSize: 16,
    marginBottom: 5, // Adjust space between label and picker
  },
  timePicker: {
    width: '100%', // Ensure picker uses full width of its container
  },
  timePickerBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#5B5B5B',
    borderRadius: 10,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(3),
    marginVertical: hp(1),
    flexWrap: 'wrap', // Allow items to wrap if necessary
  },
  dayName: {
    // Style for the day name text
  },
  dropdown: {
    // Basic styling for dropdown placeholder
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  closedBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(75), // Adjust the width to match your layout
    height: hp(6), // Adjust the height as needed
    backgroundColor: '#D3D3D3',
    // A light gray background to resemble a disabled input
    borderRadius: 10,
    borderWidth: 0, // Match the borderRadius of your input boxes
  },
  closedText: {
    color: 'gray', // A dark gray color for the text
    fontSize: fp(2),
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
