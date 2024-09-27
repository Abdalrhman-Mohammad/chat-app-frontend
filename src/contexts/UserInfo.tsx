import {createContext, useContext, useState} from 'react';
import {Alert} from 'react-native';
import {User , statusAndChatsType} from '../types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Chat} from '../types/Chat';
const BaseURL = 'http://localhost:4000';
export const userInfoContext = createContext<any>(null);

export default function UserInfoState({children}: any) {
  const [userInfo, setUserInfo] = useState<User>({name: '', chats: []});
  function userDataValidation(userData: User) {
    /* 
    Usernames can only have: 
    - Uppercase Letters (A-Z) 
    - Lowercase Letters (a-z) 
    - Numbers (0-9)
    - Dashs (-)
    - Underscores (_)
    - Length must be between 2 and 16
  */
    // console.log('usssssssssssserData', userData);
    const res = /^([a-zA-Z0-9_-]){1,16}$/.exec(userData.name);
    const valid = !!res;
    return valid;
  }
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
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log('error', e, 'eee');
    }
  };
  const login = async (userData: User) => {
    // console.log('userData', userData, 'uuuuuuuuuu');
    const valid = userDataValidation(userData);
    

    let statusAndChats: statusAndChatsType = {status: false, chats: []};
    if (!valid) {
      Alert.alert('Not Valid', 'Not valid username!');
      return statusAndChats;
    }
    await fetch(BaseURL + '/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(data => {
        let found: string = `${data.status}`;
        if (found == 'true') {
          const user: User = data.user;
          statusAndChats = {
            status: true,
            chats: user.chats,
          };
          setUserInfo(user);
        } else if (found == 'false') {
          Alert.alert(
            'Register First!',
            'You must register then you can login',
          );
        }
      })
      .catch(error => {
        Alert.alert('Error happened', 'Please try again');
      });
    if (statusAndChats.status) storeUserData(userData);

    return statusAndChats;
  };

  const register = async () => {
    const valid = userDataValidation(userInfo);
    if (!valid) {
      Alert.alert('NOt Valid', 'Not valid username!');
      return 'not valid';
    }

    let status: boolean = false;

    await fetch(BaseURL + '/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
      .then(response => response.json())
      .then(data => {
        if (data.found) {
          Alert.alert('You have an account!', 'Please choose login');
        } else {
          status = true;
          const user: User = data.user;
          setUserInfo(user);
        }
      })
      .catch(error => {
        Alert.alert('Error happened', 'Please try again');
      });
    if (status) storeUserData(userInfo);
    return status;
  };
  const logout = async () => {
    setUserInfo({name: '', chats: []});
    await AsyncStorage.removeItem('userInfo');
  };
  return (
    <userInfoContext.Provider
      value={{getUserData, userInfo, login, register, setUserInfo, logout}}>
      {children}
    </userInfoContext.Provider>
  );
}
