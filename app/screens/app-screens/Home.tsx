import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import {format} from 'date-fns';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../../components/header';
import Button from '../../components/button';
import useProfileData from '../../hooks/useProfileData';
import {updateBusinessHours} from '../../utils/api';
interface Day {
  name: string;
  isEnabled: boolean;
  from: Date | null;
  to: Date | null;
}

interface ShowPickerState {
  visible: boolean;
  index: number;
  type: 'from' | 'to';
}
const Home = () => {
  const {professionalData, personalData} = useProfileData();

  const [isEnabled, setIsEnabled] = useState<boolean | null>(null);

  const [days, setDays] = useState<Day[]>([]);
  const [showPicker, setShowPicker] = useState<ShowPickerState>({
    visible: false,
    index: -1,
    type: 'from',
  });

  useEffect(() => {
    if (professionalData?.business_hours_enabled !== undefined) {
      setIsEnabled(professionalData.business_hours_enabled === 1);
      if (professionalData?.working_hours) {
        let daysString = JSON.parse(professionalData.working_hours);
        let daysObject = JSON.parse(daysString);
        let daysArray = JSON.parse(daysObject);
        setDays(daysArray);
      } else {
        setDays([
          {name: 'Mon', isEnabled: true, from: null, to: null},
          {name: 'Tue', isEnabled: true, from: null, to: null},
          {name: 'Wed', isEnabled: true, from: null, to: null},
          {name: 'Thu', isEnabled: true, from: null, to: null},
          {name: 'Fri', isEnabled: true, from: null, to: null},
          {name: 'Sat', isEnabled: true, from: null, to: null},
          {name: 'Sun', isEnabled: true, from: null, to: null},
        ]);
      }
    }
  }, [professionalData]);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const toggleDay = (index: number) => {
    const newDays = [...days];
    newDays[index].isEnabled = !newDays[index].isEnabled;
    setDays(newDays);
  };

  const setDayTime = (
    event: any,
    selectedDate: Date | undefined,
    index: number,
    type: 'from' | 'to',
  ) => {
    const updatedDays = days.map((day, i) =>
      i === index ? {...day, [type]: selectedDate || day[type]} : day,
    );
    setDays(updatedDays);
    // Ensure that the picker is closed after setting the time
    if (event.type === 'set') {
      // Check if the date was set before closing
      setShowPicker({visible: false, index: -1, type: 'from'});
    } else if (event.type === 'dismissed') {
      // Check if the picker was dismissed
      setShowPicker({visible: false, index: -1, type: 'from'});
    }
  };

  const showTimePicker = (index: number, type: 'from' | 'to') => {
    setShowPicker({visible: true, index, type});
  };

  const handleUpdate = async () => {
    const businessHoursEnabled = isEnabled as boolean;
    const workingHours = JSON.stringify(days);

    try {
      await updateBusinessHours(
        businessHoursEnabled,
        JSON.stringify(workingHours),
        personalData?.id!,
      );
      Alert.alert('Message', 'Business Hours Updated');
    } catch (error) {
      console.log(error, 'error in update buissnes hours');
      Alert.alert('Message', 'Business Hours Updation Failed!');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={{
          paddingTop: rh(2),
          paddingBottom: rh(2),
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
            value={isEnabled as boolean}
          />
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Quick enable or disable business</Text>

        {/* Gray Bar */}
        <View style={styles.grayBar}></View>
        {days?.map((day, index) => (
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
                <Text
                  style={styles.timePickerBox}
                  onPress={() => showTimePicker(index, 'from')}>
                  From: {day.from ? format(day.from, 'p') : 'N/A'}
                </Text>
                <Text
                  style={styles.timePickerBox}
                  onPress={() => showTimePicker(index, 'to')}>
                  To: {day.to ? format(day.to, 'p') : 'N/A'}
                </Text>

                {showPicker.visible && showPicker.index === index && (
                  <DateTimePicker
                    value={new Date(days[index][showPicker.type])}
                    mode="time"
                    is24Hour={false} // Change this to false for AM/PM format
                    display="default"
                    onChange={(event, date) =>
                      setDayTime(event, date, index, showPicker.type)
                    }
                  />
                )}
              </>
            ) : (
              // Display "Closed" in a box that resembles an input
              <View style={[styles.timePickerBox, styles.closedBox]}>
                <Text style={styles.closedText}>Closed</Text>
              </View>
            )}
          </View>
        ))}
        <Button title="Update" onPress={handleUpdate} />
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
    fontSize: rf(2.8),
    textTransform: 'uppercase',
    color: '#FF3131',
    fontWeight: 'bold',
    marginLeft: rw(5),
    marginTop: rh(2),
  },
  headerText2: {
    fontSize: rf(1.7),
    textTransform: 'uppercase',
    color: '#5B5B5B',
    marginLeft: rw(5),
    marginVertical: rh(0.5),
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: rw(5),
    // marginTop: rh(1),
  },
  switchLabel: {
    fontSize: rf(2),
    color: '#333',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: rf(1.7),
    color: '#5B5B5B',
    marginLeft: rw(5),
    marginTop: rh(1),
  },
  grayBar: {
    height: rh(0.2),
    backgroundColor: '#D3D3D3',
    marginVertical: rh(1.7),
    marginHorizontal: rw(1),
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: rw(3),
    marginVertical: rh(1),
    flexWrap: 'wrap', 
  },
  dayName: {
    // Style for the day name text
  },

  timePickerBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: rh(1), // Adjust vertical padding
    paddingHorizontal: rw(2), // Adjust horizontal padding
    borderRadius: rw(2), // Adjust border radius
    marginBottom: rh(1), // Adjust margin bottom
    minWidth: rw(38), // Adjust minimum width
    textAlign: 'center', // Ensure text is centered
    justifyContent: 'center', // Center content vertically for View
    alignItems: 'center', // Center content horizontally for View
  },
  closedBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: rw(75), // Adjust the width based on your layout needs
    height: rh(5), // Adjust the height as needed
    backgroundColor: '#D3D3D3', // A light gray background to resemble a disabled input
    borderRadius: rw(2), // Adjust border radius to match your input boxes
    borderWidth: 0, // Match the border width of your design
  },
  closedText: {
    color: 'gray', // A dark gray color for the text
    fontSize: rf(2), // Adjust font size responsively
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
