import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';

const navigator = () => {
  const isLoggedIn = false; // TODO:
  return (
    <NavigationContainer>
      {/* Conditional stack navigator rendering based on login state */}
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default navigator;
