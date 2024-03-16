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
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
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
  const [showPastAppointments, setShowPastAppointments] = useState(false);

  // Function to filter appointments based on date
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const currentDate = new Date();
    return showPastAppointments
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
          onPress={() => setShowPastAppointments(false)}
          style={[
            styles.toggleButton,
            !showPastAppointments && styles.toggleButtonActive,
          ]}>
          <Text
            style={[
              styles.toggleButtonText,
              !showPastAppointments && styles.toggleActiveButtonText,
            ]}>
            Recent Appointments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowPastAppointments(true)}
          style={[
            styles.toggleButton,
            showPastAppointments && styles.toggleButtonActive,
          ]}>
          <Text
            style={[
              styles.toggleButtonText,
              showPastAppointments && styles.toggleActiveButtonText,
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
    paddingTop: hp(2),
    paddingBottom: hp(4),
  },
  flatListContentContainer: {
    paddingBottom: hp(4),
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
  grayBar: {
    height: hp(0.2),
    backgroundColor: '#D3D3D3',
    marginVertical: hp(1.7),
    marginHorizontal: wp(1),
  },
  toggleButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp(1),
  },
  toggleButton: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    marginHorizontal: wp(1),
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
