import {createContext, useState} from 'react';
import {Chat} from '../types/Chat';
import {User} from '../types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BaseURL = 'http://localhost:4000';

export const chatInfoContext = createContext<any>(null);
export default function ChatInfoState({children}: any) {
  const [chatsInfo, setChatsInfo] = useState<Chat[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const storeUserData = async (value: User) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('userInfo', jsonValue);
    } catch (e) {
      // saving error
      console.log('error', e, 'eee');
      return null;
    }
  };
  async function addChatMethod(title: string, userInfo: User) {
    return await fetch(BaseURL + '/chat/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title: title, user: userInfo}),
    })
      .then(response => response.json())
      .then(data => {
        setChatsInfo([...chatsInfo, {title: title, messageRecevied: false}]);
        console.log('data', data);
        return data;
      })
      .catch(error => {
        console.log('error', error);
        return {error: error.message};
      });
    //add to array for appearing
    //add to server
    //...
  }
  return (
    <chatInfoContext.Provider
      value={{
        chatsInfo,
        setChatsInfo,
        modalVisible,
        setModalVisible,
        addChatMethod,
      }}>
      {children}
    </chatInfoContext.Provider>
  );
}
