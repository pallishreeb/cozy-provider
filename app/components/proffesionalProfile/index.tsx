import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import Button from '../button';
import Dropdown from '../dropdown';
import {ProfessionalProfileData} from '../../hooks/useProfileData';
import {fetchCategories} from '../../utils/api';
import {experiencesList} from '../../constants';

interface ProffesionalProfileFormProps {
  initialValues: ProfessionalProfileData | null;
  updateProfileData: (updatedData: any, isPersonal: boolean) => boolean;
}
const PersonalProfile: React.FC<ProffesionalProfileFormProps> = ({
  initialValues,
  updateProfileData,
}) => {
  const [category, setCategory] = useState<number | null>(
    initialValues?.category_id!,
  );
  const [subCategory, setSubCategory] = useState<number | null>(
    initialValues?.service_id!,
  );
  const [experience, setExperience] = useState<number | null>(
    initialValues?.experience!,
  );
  const [rate, setRate] = useState<number | null>(initialValues?.rate!);
  const [skills, setSkills] = useState<string | null>(initialValues?.skills!);
  const [specialization, setSpecialization] = useState<string | null>(
    initialValues?.specialization!,
  );
  const [portfolio, setPortfolio] = useState<string | null>(
    initialValues?.portfolio!,
  );
  const [portfolioFile, setportfolioFile] = useState<{
    name: string | null;
    uri: string | null;
    type: string | null;
  } | null>(null);
  const [categoriesList, setCategoriesList] = useState<any>([]);
  const [subcategories, setSubcategories] = useState<any>([]);

  const handleFormSubmit = async () => {
    const updatedData = {
      experience,
      rate,
      specialization,
      portfolio: portfolioFile,
      category_id: category,
      service_id: subCategory,
      skills,
    };
    const isPersonal = false;
    // console.log(updatedData, 'updatedData');
    const isSuccess = await updateProfileData(updatedData, isPersonal);
    if (isSuccess) {
      // console.log('Profile updated successfully');
      Alert.alert('Message', 'Profile updated successfully');
    } else {
      // console.error('Failed to update profile');
      Alert.alert('Message', 'Failed to update profile');
    }
  };
  const handleSubcategories = () => {
    if (category && categoriesList.length > 0) {
      let list = categoriesList?.find((c: any) => c?.id === category)!.services;
      setSubcategories(list);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      const fetchedCategories = await fetchCategories();
      setCategoriesList(() => fetchedCategories);
      handleSubcategories();
    };
    loadData();
  }, []);
  useEffect(() => {
    handleSubcategories();
  }, [categoriesList.length]);

  const handleSelectPortfolioFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setPortfolio(result[0].name);
      setportfolioFile({
        type: result[0].type,
        name: result[0].name,
        uri: result[0].uri,
      });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User canceled the picker');
      } else {
        throw error;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Dropdown
        label="Category"
        value={category}
        setValue={value => {
          setCategory(value as number);
          let list = categoriesList.find((c: any) => c?.id === value)!
            .services!;
          console.log(list, 'services');

          setSubcategories(list);
        }}
        list={categoriesList}
        placeholder="Choose a category"
      />
      <Dropdown
        label="Subcategory"
        value={subCategory}
        setValue={value => {
          setSubCategory(value as number);
        }}
        list={subcategories}
        placeholder="Choose a subcategory"
      />
      <Dropdown
        label="Experience"
        value={experience as number}
        setValue={value => {
          setExperience(value as number);
        }}
        list={experiencesList}
        placeholder="Select experience"
      />

      <Text style={styles.label}>Your Rate</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric" // Set keyboard type to numeric for better user experience
        onChangeText={text => {
          // Convert text back to number when changing, handle empty string as null
          const newValue = text.length > 0 ? Number(text) : null;
          setRate(newValue);
        }}
        value={rate !== null && rate !== undefined ? rate.toString() : ''} // Convert number to string or empty string if null
        placeholder="Enter Rate"
      />
      <Text style={styles.label}>Add your Skills</Text>
      <TextInput
        multiline
        numberOfLines={3}
        style={styles.input}
        onChangeText={setSkills}
        value={skills as string}
        placeholder="Describe your skills"
      />
      <Text style={styles.label}>Portfolio</Text>
      <TouchableOpacity
        style={styles.fileInput}
        onPress={handleSelectPortfolioFile}>
        <Text style={styles.fileInputText}>
          {portfolio ? portfolio : 'Select a file'}
        </Text>
        <Image
          source={require('../../assets/media-add.png')}
          style={styles.mediaIcon}
        />
      </TouchableOpacity>

      <Text style={styles.label}>Specialization</Text>
      <TextInput
        multiline
        numberOfLines={3}
        style={styles.input}
        onChangeText={setSpecialization}
        value={specialization as string}
        placeholder="Your specialization"
      />
      <View style={styles.buttonContainer}>
        <Button title="Update" onPress={handleFormSubmit} />
      </View>
    </View>
  );
};

export default PersonalProfile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rh(2),
    paddingVertical: rh(1.3),
  },
  label: {
    fontSize: rf(2),
    color: 'black',
    marginTop: rh(1),
    marginLeft: rw(2),
    marginBottom: rh(1),
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: rw(2),
    textAlignVertical: 'top', // Align text at the top for multiline input
    marginBottom: rh(1),
  },
  fileInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: rw(2),
    height: rh(6),
    marginBottom: rh(1),
  },
  fileInputText: {
    fontSize: rf(2),
    color: 'black',
  },
  mediaIcon: {
    width: rw(5),
    height: rw(5),
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginVertical: rh(1),
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // marginHorizontal: rw(2),
  },
});
