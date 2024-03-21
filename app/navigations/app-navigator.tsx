import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTabs from './bottom-navigator';
import Chat from '../screens/app-screens/Chat';
export type AppStackParamList = {
  MyTabs: undefined;
  Chat: undefined;
};
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyTabs"
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}
      // screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default AppNavigator;
