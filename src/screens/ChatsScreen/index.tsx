import {FlatList, Image, Pressable, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/NavigationContainerComponent';
import styles from './styles';
import OuterChatComponent from './components/OuterChatComponent';
import {chatInfoContext} from '../../contexts/ChatInfo';
import MainButton from '../../components/MainButton';
import MyModal from '../../components/myModal';
import {userInfoContext} from '../../contexts/UserInfo';
import {socket} from '../../utils';
import messeing from '@react-native-firebase/messaging';
import {Chat} from '../../types/Chat';
import PushNotification from 'react-native-push-notification';
type ChatsProps = NativeStackScreenProps<RootStackParamList, 'Chats'>;

const ChatScreen = ({navigation}: ChatsProps) => {
  const userContext = useContext(userInfoContext);
  const chatsContext = useContext(chatInfoContext);
  const [selectedID, setSelectedID] = useState<string>('');
  const {chatsInfo, modalVisible, setModalVisible} = chatsContext;
  const logout = () => {
    userContext.logout();
    chatsContext.setChatsInfo([]);
    navigation.replace('Home');
  };

  function rerenderFlatList() {
    setSelectedID(`${Math.random() * 1000}`);
  }
  function changeState(title: string, newValue: boolean, chats: Chat[]) {
    let id = -1;
    const foundChat = chats.filter((chat: any, index: number) => {
      if (chat.title === title) id = index;
      return chat.title === title;
    });
    if (foundChat.length > 0) {
      foundChat[0].messageRecevied = newValue;
    }
    if (newValue) {
      const tmp = {title: title, messageRecevied: newValue};
      chats.splice(id, 1);
      chats.unshift(tmp);
    }
    // chatsContext.setChatsInfo(chats);
    chatsContext.updateStoredUserInfoWhenMessageStateChanged(
      chats,
      userContext.userInfo.name,
      userContext.userInfo.notificationToken,
    );
    rerenderFlatList();
  }

  async function handlenotification(message: any) {
    const userName = userContext.userInfo.name;
    console.log(
      'handlenotification',
      message,
      '-----------',
      userName,
      '--------',
      message!.data!.fromUser,
    );
    if (userName != '' && userName != message!.data!.fromUser)
      PushNotification.localNotification({
        title: message.notification?.title,
        message: message.notification?.body!,
        channelId: '1',
      });
  }
  useEffect(() => {
    console.log('useEffect');
    function handleNewMessage(data: any) {
      console.log('handleNewMessage', chatsContext.chatsInfo);
      changeState(data.title, true, chatsContext.chatsInfo);
    }
    // socket.off('newMessage');
    setTimeout(() => {
      socket.on('newMessage', handleNewMessage);
    }, 100);
    messeing().onMessage(handlenotification);
    return () => {
      socket.off('newMessage'); // Removes the listener
    };
  }, [chatsContext.chatsInfo]);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Pressable onPress={logout} style={styles.logoutContainer}>
          <Text style={styles.titleTxt}>Logout</Text>
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.titleTxt}>Home</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/myPhoto.jpg')}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.list}>
        <FlatList
          data={chatsContext.chatsInfo}
          extraData={selectedID}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() => {
                  if (item.messageRecevied) {
                    changeState(item.title, false, chatsContext.chatsInfo);
                  }
                  navigation.push('Messages', {
                    title: item.title,
                    updateFlatList: () => {
                      changeState(item.title, false, chatsContext.chatsInfo);
                    },
                  });
                }}>
                <OuterChatComponent
                  title={item.title}
                  messageRecevied={item.messageRecevied}
                />
              </Pressable>
            );
          }}
        />
      </View>
      <View style={{height: 0}}>
        <MyModal />
      </View>
      <View style={styles.buttonContainer}>
        <MainButton
          onPress={() =>
            chatsContext.setModalVisible(!chatsContext.modalVisible)
          }
          title={'New Chat'}
        />
      </View>
    </View>
  );
};

export default ChatScreen;
