import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import {chatInfoContext} from '../contexts/ChatInfo';
import UserInfoState, {userInfoContext} from '../contexts/UserInfo';
import MainButton from './MainButton';
const App = () => {
  const chatsContext = useContext(chatInfoContext);
  const userContext = useContext(userInfoContext);
  const {modalVisible, setModalVisible, addChatMethod} = chatsContext;
  const [chatTitle, setChatTitle] = useState<string>('');
  const addChat = async () => {
    console.log('IMPOOOOOOOOOOOOOO', userContext.userInfo);
    const x = await addChatMethod(chatTitle, userContext.userInfo);
    // userContext.userInfo.chatsID.push(chatTitle);
    userContext.setUserInfo({
      name: userContext.userInfo.name,
      chats: [
        ...userContext.userInfo.chats,
        {title: chatTitle, messageRecevied: false},
      ],
      notificationToken: userContext.userInfo.notificationToken,
    });
    console.log(x, chatTitle, '-----------------', chatsContext.chatsInfo);
    setModalVisible(!modalVisible);
  };
  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    console.log('modalVisible', modalVisible);
    if (modalVisible) {
      // Delay focusing to ensure modal has fully rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [modalVisible]);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter chat name : </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter chat name"
              onChangeText={value => setChatTitle(value)}
              ref={inputRef} // Assign the input reference
            />
            <View style={styles.buttonContainer}>
              <MainButton onPress={addChat} title={'Add Chat'} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
    borderRadius: 7,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default App;
