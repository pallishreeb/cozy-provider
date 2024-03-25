import {Linking} from 'react-native';
import messaging from '@react-native-firebase/messaging';
const NAVIGATION_IDS = ['booking', 'chat'];

function buildDeepLinkFromNotificationData(data: any): string | null {
  const navigationId = data?.type;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    // console.warn('Unverified navigationId', navigationId);
    return null;
  }

  if (navigationId === 'chat') {
    const user = data?.user;
    const provider = data?.provider;
    if (user?.id && provider?.id) {
      // Assuming user and provider IDs are sufficient to identify them
      return `myapp://chat/${user}/${provider}`;
    } else {
      return 'myapp://MyTabs/Appointment';
    }
  }
  if (navigationId === 'booking') {
    return 'myapp://MyTabs/Appointment';
  }

  return null;
}
const linking = {
  prefixes: ['myapp://'],
  config: {
    initialRouteName: 'MyTabs',
    screens: {
      MyTabs: {
        path: 'MyTabs',
        screens: {
          Home: 'Home',
          Appointment: 'Appointment',
        },
      },
      Chat: {
        path: 'chat/:user/:provider',
        parse: {
          user: user => `${user}`,
          provider: provider => `${provider}`,
        },
      },
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({url}: {url: string}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === 'string') {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};

export default linking;
