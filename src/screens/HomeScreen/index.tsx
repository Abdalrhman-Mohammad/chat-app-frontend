import React, {useContext, useEffect, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';

import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/NavigationContainerComponent';
import WelcomeOptions from './components/Welcome';
import RegistrationOptions from './components/RegistrationOptions';
import KeyboardAvoidingViewComponent from '../../components/KeyboardAvoidingViewComponent';
import {userInfoContext} from '../../contexts/UserInfo';
import {User} from '../../types/User';
import {chatInfoContext} from '../../contexts/ChatInfo';
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({navigation}: HomeProps) {
  const [welcomeStatment, setWelcomeStatment] = useState<boolean>(true);
  const userContext = useContext(userInfoContext);
  const chatsContext = useContext(chatInfoContext);
  const navigateToChats = () => navigation.replace('Chats');
  useEffect(() => {
    userContext
      .getUserData()
      .then(async (user: User) => {
        console.log(
          // data,
          // data.name,
          '-----------------------------------------------------',
        );
        if (user != null && user.name != null && user.name.length != 0) {
          const {status, chats} = await userContext.login(user);
          if (status) {
            chatsContext.setChatsInfo(chats);
            navigateToChats();
          }
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);
  return (
    <KeyboardAvoidingViewComponent>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Text style={styles.chat}>Chat</Text>
          <Text style={styles.app}>App</Text>
        </View>
        <View style={styles.options}>
          {welcomeStatment ? (
            <WelcomeOptions onPress={() => setWelcomeStatment(false)} />
          ) : (
            <RegistrationOptions navigateToChats={navigateToChats} />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingViewComponent>
  );
}

export default HomeScreen;
