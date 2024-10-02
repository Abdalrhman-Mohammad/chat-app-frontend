
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
const requestNotificationPermission = async function() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};
const requestUserPermission = async function() {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};
export {requestNotificationPermission, requestUserPermission}