import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {
  responsiveHeight as hp,
  responsiveWidth as wp,
  responsiveFontSize as fp,
} from 'react-native-responsive-dimensions';
import Header from '../../components/header';
import ToggleButton from '../../components/toggleButton';
import PersonalProfile from '../../components/personalProfile';
import ProfessionalProfile from '../../components/proffesionalProfile';
import Button from '../../components/button';
const Profile = () => {
  const [isPersonal, setIsPersonal] = useState(true);
  const handleFormSubmit = () => {};
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
        {isPersonal ? <PersonalProfile /> : <ProfessionalProfile />}
        <View style={styles.buttonContainer}>
          {<Button title="Cancel" />}
          <Button title="Update" onPress={handleFormSubmit} />
        </View>
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
    paddingTop: hp(2),
    paddingBottom: hp(4),
  },
  headerText1: {
    fontSize: fp(2.8),
    textTransform: 'uppercase',
    color: '#FF3131',
    fontWeight: 'bold',
    marginLeft: wp(5),
    marginVertical: hp(0.6),
  },
  headerText2: {
    fontSize: fp(1.7),
    textTransform: 'uppercase',
    color: '#5B5B5B',
    marginLeft: wp(5),
    marginVertical: hp(0.5),
  },
  buttonContainer: {
    marginVertical: hp(1),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: wp(2),
  },
});
