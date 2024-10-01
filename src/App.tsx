import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatsScreen';
import MessageScreen from './screens/MessagesScreen';
import UserInfoState from './contexts/UserInfo';
import ChatInfoState from './contexts/ChatInfo';
import MessagesInfoState from './contexts/MessagesInfo';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
export type RootStackParamList = {
  Home: undefined;
  Chats: undefined;
  Messages: {title: string; rerenderFlatList: () => void};
};

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <UserInfoState>
      <ChatInfoState>
        <MessagesInfoState>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Chats" component={ChatScreen} />
              <Stack.Screen name="Messages" component={MessageScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </MessagesInfoState>
      </ChatInfoState>
    </UserInfoState>
  );
}

export default App;
