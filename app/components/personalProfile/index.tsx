import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import ProfileInput from '../profileInput';
interface ProfileImage {
  uri: string;
}

const PersonalProfile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<ProfileImage | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      if (response.assets) {
        setProfileImage({uri: response.assets[0].uri});
      }
    });
  };
  const handleFormSubmit = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        {profileImage ? (
          <>
            <Image
              source={{uri: profileImage.uri}}
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.cameraIcon}
              onPress={handleChoosePhoto}>
              <Icon name="camera-alt" size={20} color="#fff" />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.profileImagePlaceholder}
            onPress={handleChoosePhoto}>
            <Icon name="camera-alt" size={20} color="#fff" />
            <Text style={styles.placeholderText}>Add Photo</Text>
          </TouchableOpacity>
        )}
      </View>

      <ProfileInput
        value={name}
        onChangeText={text => setName(text)}
        label="Name"
        placeholder="John Doe"
      />
      <ProfileInput
        value={phone}
        onChangeText={text => setPhone(text)}
        label="Phone"
        placeholder="+1234567890"
      />
      <ProfileInput
        value={address}
        onChangeText={text => setAddress(text)}
        label="Address"
        placeholder="123 Main St"
      />

      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>Zip Code</Text>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="12345"
          />
        </View>

        <View style={styles.half}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Anytown"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.half}>
          <Text style={styles.label}>State</Text>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Anystate"
          />
        </View>

        <View style={styles.half}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Any Country"
          />
        </View>
      </View>
    </View>
  );
};

export default PersonalProfile;

const styles = StyleSheet.create({
  container: {
    padding: rh(2),
  },
  profileImageContainer: {
    marginBottom: rh(2),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  profileImagePlaceholder: {
    width: rw(30),
    height: rh(12),
    borderRadius: rw(2),
    backgroundColor: '#e1e4e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#fff',
    marginTop: rh(1),
  },
  profileImage: {
    width: rw(30),
    height: rh(12),
    borderRadius: rw(2),
    backgroundColor: '#e1e4e8',
  },
  cameraIcon: {
    position: 'absolute',
    right: rw(2),
    bottom: rh(1),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: rw(1),
    borderRadius: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: rw(2.5),
    marginBottom: rh(1),
    borderRadius: rw(1.2),
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '100%', // Adjusting for margin/padding might require a slight reduction in width
  },
  label: {
    fontSize: rf(2),
    color: '#000',
    marginBottom: rh(1),
    marginLeft: rw(2),
  },
  half: {
    width: '48.5%',
  },
});
