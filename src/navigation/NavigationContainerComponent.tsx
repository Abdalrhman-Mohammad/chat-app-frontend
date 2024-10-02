import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  requestNotificationPermission,
  requestUserPermission,
} from '../utils/NotificationService';
import messeing from '@react-native-firebase/messaging';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatsScreen';
import MessageScreen from '../screens/MessagesScreen';
import PushNotification from 'react-native-push-notification';
import {userInfoContext} from '../contexts/UserInfo';
export type RootStackParamList = {
  Home: undefined;
  Chats: undefined;
  Messages: {title: string; rerenderFlatList: () => void};
};
function handlenotification(message: any, userName: string) {
  if (userName != '' && userName != message!.data!.fromUser)
    PushNotification.localNotification({
      title: message.notification?.title,
      message: message.notification?.body!,
      channelId: '1',
    });
}
const NavigationContainerComponent = () => {
  requestUserPermission();
  requestNotificationPermission();
  const UserContext = useContext(userInfoContext);
  messeing().setBackgroundMessageHandler(async message => {
    console.log('backgroudn notification');
  });
  messeing().onMessage(async message => {
    console.log('foreground notification', message);
    handlenotification(message, UserContext.userInfo.name);
  });
  useEffect(() => {
    messeing()
      .getToken()
      .then(token => {
        UserContext.setUserInfo({
          name: UserContext.userInfo.name,
          chats: UserContext.userInfo.chats,
          notificationToken: token,
        });
      });
  }, []);
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chats" component={ChatScreen} />
        <Stack.Screen name="Messages" component={MessageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationContainerComponent;

const styles = StyleSheet.create({});
