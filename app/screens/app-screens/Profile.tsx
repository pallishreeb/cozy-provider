import React, {useState} from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';

import useProfileData from '../../hooks/useProfileData';
import Header from '../../components/header';
import ToggleButton from '../../components/toggleButton';
import PersonalProfile from '../../components/personalProfile';
import ProfessionalProfile from '../../components/proffesionalProfile';
import Loader from '../../components/loader';
const Profile = () => {
  const {personalData, professionalData, isLoading, error, updateProfileData} =
    useProfileData();

  const [isPersonal, setIsPersonal] = useState(true);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.headerText1}>
          <Text style={{color: '#333'}}>My</Text> Profile
        </Text>
        <ToggleButton isPersonal={isPersonal} setIsPersonal={setIsPersonal} />
        <Text style={styles.headerText2}>
          {isPersonal
            ? 'Create Your Personal Profile'
            : 'Create Your Professional Profile'}
        </Text>
        {isPersonal ? (
          <PersonalProfile
            initialValues={personalData!}
            updateProfileData={updateProfileData}
          />
        ) : (
          <ProfessionalProfile
            initialValues={professionalData}
            updateProfileData={updateProfileData}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingTop: rh(2),
    paddingBottom: rh(4),
  },
  headerText1: {
    fontSize: rf(2.8),
    textTransform: 'uppercase',
    color: '#FF3131',
    fontWeight: 'bold',
    marginLeft: rw(5),
    marginVertical: rh(0.6),
  },
  headerText2: {
    fontSize: rf(1.7),
    textTransform: 'uppercase',
    color: '#5B5B5B',
    marginLeft: rw(5),
    marginVertical: rh(0.5),
  },
});
