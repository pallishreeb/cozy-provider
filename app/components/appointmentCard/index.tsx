import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

// Define TypeScript interfaces for props
interface Appointment {
  providerImage: string;
  providerName: string;
  location: string;
  date: string;
  time: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({appointment}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: appointment.providerImage}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.providerName}>{appointment.providerName}</Text>
        <Text style={styles.location}>{appointment.location}</Text>
        <View style={styles.dateTimeRow}>
          <Text>{appointment.date}</Text>
          <Text>{appointment.time}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: '#E3E3E3', // Border color
    borderWidth: 2, // Border width
    borderRadius: 5,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 20,
  },
  details: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'space-around',
  },
  providerName: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 18,
  },
  location: {
    color: '#666',
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 8,
    backgroundColor: '#D7D7D7',
  },
  button: {
    backgroundColor: '#E3E3E3',
    width: 120,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#5B5B5B',
    fontWeight: 'bold',
  },
});
