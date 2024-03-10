import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/app-screens/Home';

export type AppStackParamList = {
  Home: undefined;
};
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}
      // screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
export default AppNavigator;
