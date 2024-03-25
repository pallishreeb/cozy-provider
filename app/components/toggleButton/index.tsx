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
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    overflow: 'hidden',
    // paddingVertical: rf(0.2),
    // paddingHorizontal: rf(0.6),
  },
  toggleButton: {
    borderRadius: 20,
    paddingVertical: rh(1),
    paddingHorizontal: rw(5),
    flexGrow: 1,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#FF3131',
  },
  toggleButtonInactive: {
    backgroundColor: 'transparent',
  },
  toggleText: {
    fontWeight: 'bold',
    fontSize: rf(1.8),
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  toggleTextInactive: {
    color: '#000000',
  },
});
