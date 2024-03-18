import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
type ToggleButtonProps = {
  isPersonal: boolean;
  setIsPersonal: React.Dispatch<React.SetStateAction<boolean>>;
};
const ToggleButton = ({isPersonal, setIsPersonal}: ToggleButtonProps) => {
  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          isPersonal ? styles.toggleButtonActive : styles.toggleButtonInactive,
        ]}
        onPress={() => setIsPersonal(true)}>
        <Text
          style={[
            styles.toggleText,
            isPersonal ? styles.toggleTextActive : styles.toggleTextInactive,
          ]}>
          Personal
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          !isPersonal ? styles.toggleButtonActive : styles.toggleButtonInactive,
        ]}
        onPress={() => setIsPersonal(false)}>
        <Text
          style={[
            styles.toggleText,
            !isPersonal ? styles.toggleTextActive : styles.toggleTextInactive,
          ]}>
          Professional
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: rh(0.5),
    marginBottom: rh(0.9),
    marginHorizontal: rw(3.6),
    backgroundColor: '#E0E0E0', // Light grey background for the toggle container
    borderRadius: 20,
    overflow: 'hidden', // Ensures the child elements do not overlap the container's rounded corners
    // paddingVertical: rf(0.2),
    // paddingHorizontal: rf(0.6),
  },
  toggleButton: {
    borderRadius: 20,
    paddingVertical: rh(1),
    paddingHorizontal: rw(5),
    flexGrow: 1, // Ensures the buttons take up equal space
    alignItems: 'center', // Centers the text horizontally
  },
  toggleButtonActive: {
    backgroundColor: '#FF3131', // Active button has a distinct background color
  },
  toggleButtonInactive: {
    backgroundColor: 'transparent', // Inactive button remains transparent but still clickable
  },
  toggleText: {
    fontWeight: 'bold',
    fontSize: rf(1.8),
  },
  toggleTextActive: {
    color: '#FFFFFF', // Active text color contrasts with its background
  },
  toggleTextInactive: {
    color: '#000000', // Inactive text color for readability
  },
});
