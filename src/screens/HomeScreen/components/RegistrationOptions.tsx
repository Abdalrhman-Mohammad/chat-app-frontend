import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {userInfoContext} from '../../../contexts/UserInfo';
import {User} from '../../../types/User';
import MainButton from '../../../components/MainButton';
import {chatInfoContext} from '../../../contexts/ChatInfo';
const {width} = Dimensions.get('window');
type RegistrationOptionsProps = {navigateToChats: any};
export default function RegistrationOptions({
  navigateToChats,
}: RegistrationOptionsProps) {
  const userContext = useContext(userInfoContext);
  const [userInfo, setUserInfo] = useState<User>({name: '', chatsID: []});
  const chatsContext = useContext(chatInfoContext);
  const login = async () => {
    const {status, chatsID} = await userContext.login(userInfo);
    if (status) {
      let handleChatsID: any = [];
      chatsID.forEach((chat: string) => {
        handleChatsID.push({title: chat});
      });
      chatsContext.setChatsInfo(handleChatsID);
      navigateToChats();
    }
  };
  const register = async () => {
    const status = await userContext.register();
    if (status) {
      navigateToChats();
    }
  };

  return (
    <>
      <Text style={styles.welcomeTxt}>Enter Your Name</Text>
      <TextInput
        style={styles.inputText}
        onChangeText={value => {
          setUserInfo({name: value, chatsID: []});
          userContext.setUserInfo({name: value, chatsID: []});
        }}
        placeholder="Enter your name"
      />
      <View style={styles.EnterBtnsContainer}>
        <View style={styles.EnterBtns}>
          <MainButton title={'Login'} onPress={login} />
        </View>
        <View style={styles.EnterBtns}>
          <MainButton title={'Register'} onPress={register} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  welcomeTxt: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  EnterBtnsContainer: {
    marginVertical: 16,
    paddingHorizontal: 30,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  EnterBtns: {
    flex: 1,
  },
  inputText: {
    width: width / 2,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    borderColor: 'black',
    borderRadius: 50,
    borderWidth: 1,
  },
});
