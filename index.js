/**
 * @format
 */

import {AppRegistry, LogBox, PermissionsAndroid} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';

import {name as appName} from './app.json';
import App from './src/App';
LogBox.ignoreLogs([/[VN]/]);
AppRegistry.registerComponent(appName, () => App);
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
PushNotification.createChannel(
    {
      channelId: '1',             // (required)
      channelName: 'My channel',  // (required)
      channelDescription:
          'A channel to categorise your notifications',  // (optional) default:
                                                         // undefined.
      playSound: false,      // (optional) default: true
      soundName: 'default',  // (optional) See `soundName` parameter of
                             // `localNotification` function
      importance:
          Importance.HIGH,  // (optional) default: Importance.HIGH. Int value of
                            // the Android notification importance
      vibrate: true,  // (optional) default: true. Creates the default vibration
                      // pattern if true.
    },
    (created) => console.log(`createChannel returned '${
        created}'`)  // (optional) callback returns whether the channel was
                     // created, false means it already existed.
);

PushNotification.configure({
  onRegister: function(token) {
    console.log('TOKEN:', token);
  },

  onNotification: function(notification) {
    console.log('NOTIFICATION:', notification);
  },

  channelId: '1',

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: true,
  requestPermissions: Platform.OS === 'ios',
});
