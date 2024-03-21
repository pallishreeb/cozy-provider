import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Appointment} from '../../types';
import {IMAGE_URL} from '../../constants';
import {format} from 'date-fns';

import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface AppointmentCardProps {
  appointment: Appointment;
  onComplete?: () => void;
  onCancel?: () => void;
  onChat?: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onComplete,
  onCancel,
  onChat,
}) => {
  const providerProfilePic = appointment?.service?.images
    ? `${IMAGE_URL}${appointment?.service?.images[0]}`
    : 'https://via.placeholder.com/150';

  return (
    <View style={styles.card}>
      <Image source={{uri: providerProfilePic}} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.providerName}>{appointment.provider.name}</Text>
          <TouchableOpacity style={styles.chatButton} onPress={onChat}>
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.locationRow}>
          <Icon name="location-on" size={20} color="#5B5B5B" />
          <Text style={styles.location}>{appointment.address}</Text>
        </View>
        <View style={styles.phoneRow}>
          <Icon name="phone" size={20} color="#5B5B5B" />
          <Text style={styles.phoneNumber}>{appointment.mobile_number}</Text>
        </View>
        <View style={styles.dateTimeRow}>
          <Text>{appointment.booking_date}</Text>
          <Text>{format(new Date(appointment.booking_time), 'p')}</Text>
        </View>
        <View style={styles.actionButtonContainer}>
          {appointment.status === 'cancelled' ||
          appointment.status === 'completed' ? (
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.disabledButton,
                appointment.status === 'completed' && styles.completedButton,
              ]}
              disabled>
              <Text
                style={[
                  styles.buttonText,
                  appointment.status === 'completed' &&
                    styles.completedButtontext,
                ]}>
                {appointment.status.charAt(0).toUpperCase() +
                  appointment.status.slice(1)}
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.actionButton} onPress={onCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={onComplete}>
                <Text style={styles.buttonText}>Complete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(2.5),
    paddingVertical: responsiveHeight(1),
    marginVertical: responsiveHeight(0.5),
    marginHorizontal: responsiveWidth(2),
    borderColor: '#E3E3E3',
    borderWidth: 1,
    borderRadius: responsiveWidth(1),
  },
  image: {
    width: responsiveWidth(30),
    height: responsiveHeight(18), // Adjust based on your aspect ratio requirements
    borderRadius: responsiveWidth(5),
  },
  details: {
    marginLeft: responsiveWidth(4),
    flex: 1,
    justifyContent: 'space-between',
  },
  providerName: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: responsiveFontSize(2),
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(2.5),
    borderRadius: responsiveWidth(1),
    marginVertical: responsiveHeight(0.5),
    backgroundColor: '#D7D7D7',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: responsiveHeight(1),
  },
  actionButton: {
    backgroundColor: '#E3E3E3',
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(5),
    borderRadius: responsiveWidth(1),
    marginRight: responsiveWidth(2),
  },
  disabledButton: {
    backgroundColor: '#BEBEBE',
  },
  buttonText: {
    textAlign: 'center',
    color: '#5B5B5B',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  chatButton: {
    paddingVertical: responsiveHeight(0.75),
    paddingHorizontal: responsiveWidth(3),
    borderRadius: responsiveWidth(1),
    backgroundColor: '#E3E3E3',
    alignSelf: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(0.5),
  },
  location: {
    marginLeft: responsiveWidth(1),
    color: '#666',
  },
  phoneNumber: {
    marginLeft: responsiveWidth(1),
    color: '#666',
  },
  completedButton: {
    backgroundColor: '#9ACC5A',
  },
  completedButtontext: {
    color: '#fff',
  },
});
