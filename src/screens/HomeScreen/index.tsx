import React, {useContext, useEffect, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';

import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
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
          const {status, chatsID} = await userContext.login(user);
          if (status) {
            console.log('chatsID', chatsID);
            let handleChatsID: any = [];
            chatsID.forEach((chat: string) => {
              handleChatsID.push({title: chat});
            });
            chatsContext.setChatsInfo(handleChatsID);
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
