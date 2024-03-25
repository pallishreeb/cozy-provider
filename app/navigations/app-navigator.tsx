import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyTabs from './bottom-navigator';
import Chat from '../screens/app-screens/Chat';
import {Alert, PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {loadString, saveString} from '../utils/storage';
import {axiosPrivate} from '../utils/axiosConfig';
import {endpoints} from '../constants';
import {getNewFCMToken} from '../utils/getFCMToken';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
const TOKEN_SENT_KEY = 'ProviderTokenSent';
export type AppStackParamList = {
  MyTabs: undefined;
  Chat: {user: any; provider: any; serviceId: number};
};
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const sendTokenToBackend = async (token: string) => {
    const tokenSent = await loadString(TOKEN_SENT_KEY);
    if (!tokenSent || tokenSent !== token) {
      try {
        const response = await axiosPrivate.post(endpoints.SAVE_TOKEN, {
          device_token: token,
        });
        // console.log(response, 'device_token response');

        if (response.status === 200) {
          await saveString(TOKEN_SENT_KEY, token);
        } else {
          console.error('Failed to send token to backend.');
        }
      } catch (error) {
        console.error('Error sending token to backend:', error);
      }
    }
  };
  React.useEffect(() => {
    const initializeFCM = async () => {
      try {
        const token = await getNewFCMToken();
        if (token) {
          sendTokenToBackend(token);
        }
      } catch (error) {
        console.error('Error during FCM initialization:', error);
      }
      try {
        const unsubscribeTokenRefresh = messaging().onTokenRefresh(
          async newToken => {
            sendTokenToBackend(newToken);
          },
        );
        const unsubscribeOnMessage = messaging().onMessage(
          async remoteMessage => {
            Alert.alert(
              'New Notification!',
              remoteMessage?.data?.message as string,
            );
          },
        );
        return () => {
          unsubscribeTokenRefresh();
          unsubscribeOnMessage();
        };
      } catch (error) {
        console.error('Error setting up FCM listeners:', error);
      }
    };

    initializeFCM();

    // Since we're now returning a cleanup function inside `initializeFCM`, we don't need a separate return here
  }, []); // Ensure dependencies are correctly managed. Empty array means this effect runs once on mount.

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
