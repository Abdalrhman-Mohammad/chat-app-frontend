import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  requestNotificationPermission,
  requestUserPermission,
} from '../utils/NotificationService';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatsScreen';
import MessageScreen from '../screens/MessagesScreen';
export type RootStackParamList = {
  Home: undefined;
  Chats: undefined;
  Messages: {title: string; rerenderFlatList: () => void};
};
const NavigationContainerComponent = () => {
  requestUserPermission();
  requestNotificationPermission();
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
