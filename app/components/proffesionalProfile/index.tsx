import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import Button from '../button';
import Dropdown from '../dropdown';
interface CategoryItem {
  label: string;
  value: string;
}
const PersonalProfile: React.FC = () => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [subCategory, setSubCategory] = useState<string | undefined>(undefined);
  const [experience, setExperience] = useState<string | undefined>(undefined);
  const [rate, setRate] = useState<string | undefined>(undefined);
  const [skills, setSkills] = useState<string>('');
  const [specialization, setSpecialization] = useState<string>('');
  const [portfolio, setPortfolio] = useState<string | null>(null);
  const handleFormSubmit = () => {};
  const categories: CategoryItem[] = [
    {label: 'IT & Software', value: 'it_software'},
    {label: 'Design', value: 'design'},
    // Add other categories as needed
  ];

  const handleSelectPortfolioFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // Assuming you want to store the URI of the first selected file
      setPortfolio(result[0].uri);
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
        setValue={setCategory}
        list={categories}
        placeholder="Choose a category"
      />
      <Dropdown
        label="Subcategory"
        value={subCategory}
        setValue={setSubCategory}
        list={categories}
        placeholder="Choose a subcategory"
      />
      <Dropdown
        label="Experience"
        value={experience}
        setValue={setExperience}
        list={categories}
        placeholder="Select experience"
      />
      <Dropdown
        label="Rate"
        value={rate}
        setValue={setRate}
        list={categories}
        placeholder="Select rate"
      />
      <Text style={styles.label}>Add your Skills</Text>
      <TextInput
        multiline
        numberOfLines={3}
        style={styles.input}
        onChangeText={setSkills}
        value={skills}
        placeholder="Describe your skills"
      />
      <Text style={styles.label}>Portfolio</Text>
      <TouchableOpacity
        style={styles.fileInput}
        onPress={handleSelectPortfolioFile}>
        <Text style={styles.fileInputText}>
          {portfolio ? 'File selected' : 'Select a file'}
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
        value={specialization}
        placeholder="Your specialization"
      />
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
});
