import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import Header from '../../components/header'; // Assuming you have a header component

// Mock data for notifications
const notifications = [
  {
    id: '1',
    title: 'New Message',
    description: 'You have received a new message from John Doe.',
    iconUrl: 'https://via.placeholder.com/50',
    timestamp: '10 mins ago',
    read: false,
  },
  {
    id: '2',
    title: 'New Message',
    description: 'You have received a new message from John Doe.',
    iconUrl: 'https://via.placeholder.com/50',
    timestamp: '10 mins ago',
    read: false,
  },
  {
    id: '3',
    title: 'New Message',
    description: 'You have received a new message from John Doe.',
    iconUrl: 'https://via.placeholder.com/50',
    timestamp: '10 mins ago',
    read: false,
  },
  {
    id: '4',
    title: 'New Message',
    description: 'You have received a new message from John Doe.',
    iconUrl: 'https://via.placeholder.com/50',
    timestamp: '10 mins ago',
    read: false,
  },
  {
    id: '5',
    title: 'New Message',
    description: 'You have received a new message from John Doe.',
    iconUrl: 'https://via.placeholder.com/50',
    timestamp: '10 mins ago',
    read: false,
  },
  {
    id: '6',
    title: 'New Message',
    description: 'You have received a new message from John Doe.',
    iconUrl: 'https://via.placeholder.com/50',
    timestamp: '10 mins ago',
    read: false,
  },
  // Add more notifications as needed
];

// A single notification card
const NotificationCard = ({notification}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{uri: notification.iconUrl}} style={styles.icon} />
      <View style={styles.content}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.description}>{notification.description}</Text>
        <Text style={styles.timestamp}>{notification.timestamp}</Text>
      </View>
      {/* {!notification.read && <View style={styles.unreadIndicator} />} */}
    </TouchableOpacity>
  );
};

// The Notifications screen
const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.headerText1}>
        <Text style={{color: '#333'}}>Your </Text> Notifications
      </Text>
      <Text style={styles.headerText2}>Your Recent Notifications</Text>
      <View style={styles.grayBar}></View>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <NotificationCard notification={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 10,
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
  card: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: rf(2.2),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: rf(2),
    color: '#333',
    marginBottom: 5,
  },
  timestamp: {
    fontSize: rf(1.8),
    color: '#666',
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000',
  },
});
