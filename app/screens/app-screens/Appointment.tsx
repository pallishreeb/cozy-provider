import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import Header from '../../components/header';
import AppointmentCard from '../../components/appointmentCard';

// Sample appointments array including both past and future dates
const appointments = [
  {
    id: 1,
    providerImage: 'https://via.placeholder.com/150',
    providerName: 'John Doe',
    location: 'New York',
    date: '2024-03-20',
    time: '2:00 PM',
  },
  {
    id: 2,
    providerImage: 'https://via.placeholder.com/150',
    providerName: 'Jane Smith',
    location: 'Los Angeles',
    date: '2024-03-22',
    time: '4:00 PM',
  },
  // Assuming the current date is close to the dates above, add some past appointments
  {
    id: 3,
    providerImage: 'https://via.placeholder.com/150',
    providerName: 'Michael Brown',
    location: 'Chicago',
    date: '2023-12-15',
    time: '1:00 PM',
  },
  {
    id: 4,
    providerImage: 'https://via.placeholder.com/150',
    providerName: 'Sarah Connor',
    location: 'San Francisco',
    date: '2023-11-10',
    time: '3:30 PM',
  },
  {
    id: 5,
    providerImage: 'https://via.placeholder.com/150',
    providerName: 'Sarah Gregor',
    location: 'San Francisco',
    date: '2023-11-10',
    time: '3:30 PM',
  },
  {
    id: 6,
    providerImage: 'https://via.placeholder.com/150',
    providerName: 'Micheal Greg',
    location: 'Las Vegas',
    date: '2023-11-10',
    time: '3:30 PM',
  },
];

const Appointment = ({navigation}) => {
  const [shorwastAppointments, setShorwastAppointments] = useState(false);

  // Function to filter appointments based on date
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const currentDate = new Date();
    return shorwastAppointments
      ? appointmentDate < currentDate
      : appointmentDate >= currentDate;
  });
  const renderHeader = () => (
    <>
      <Text style={styles.headerText1}>
        <Text style={{color: '#333'}}>Your</Text> Appointments
      </Text>
      <Text style={styles.headerText2}>Your Appointments List</Text>
      <View style={styles.grayBar}></View>
      <View style={styles.toggleButtonsContainer}>
        <TouchableOpacity
          onPress={() => setShorwastAppointments(false)}
          style={[
            styles.toggleButton,
            !shorwastAppointments && styles.toggleButtonActive,
          ]}>
          <Text
            style={[
              styles.toggleButtonText,
              !shorwastAppointments && styles.toggleActiveButtonText,
            ]}>
            Recent Appointments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShorwastAppointments(true)}
          style={[
            styles.toggleButton,
            shorwastAppointments && styles.toggleButtonActive,
          ]}>
          <Text
            style={[
              styles.toggleButtonText,
              shorwastAppointments && styles.toggleActiveButtonText,
            ]}>
            Past Appointments
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={filteredAppointments}
        renderItem={({item}) => <AppointmentCard appointment={item} />}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        // Add padding at the bottom to ensure nothing is cut off
        contentContainerStyle={styles.flatListContentContainer}
      />
    </SafeAreaView>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingTop: rh(2),
    paddingBottom: rh(4),
  },
  flatListContentContainer: {
    paddingBottom: rh(4),
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
  grayBar: {
    height: rh(0.2),
    backgroundColor: '#D3D3D3',
    marginVertical: rh(1.7),
    marginHorizontal: rw(1),
  },
  toggleButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: rh(1),
  },
  toggleButton: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    paddingVertical: rh(1.5),
    paddingHorizontal: rw(4),
    marginHorizontal: rw(1),
  },
  toggleButtonActive: {
    backgroundColor: '#FF3131',
  },
  toggleButtonText: {
    color: '#333',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  toggleActiveButtonText: {
    color: '#fff',
  },
});
