import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import React, {useContext, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {socket} from '../../utils';
import {userInfoContext} from '../../contexts/UserInfo';
import {MessagesInfoContext} from '../../contexts/MessagesInfo';
import styles from './styles';
import MessageView from './components/MessageView';
import KeyboardAvoidingViewComponent from '../../components/KeyboardAvoidingViewComponent';
import AppBar from './components/AppBar';
import {chatInfoContext} from '../../contexts/ChatInfo';
import {Chat} from '../../types/Chat';
type MessagesProps = NativeStackScreenProps<RootStackParamList, 'Messages'>;

export default function MessageScreen({navigation, route}: MessagesProps) {
  const [message, setMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const {title, rerenderFlatList} = route.params;
  const userContext = useContext(userInfoContext);
  const chatContext = useContext(chatInfoContext);
  const MessagesContext = useContext(MessagesInfoContext);

  socket.on('typing', data => {
    console.log('data', data);
    if (data.title === title) {
    console.log('data in ', data);
      setIsTyping(data.isNowTyping);
    }
  });

  const handleMessage = (data: any) => {
    console.log('data', data);
    if (data.title === title) {
      MessagesContext.setMessagesInfo(data.messages);
    }
  };

  useEffect(() => {
    socket.on('newMessage', handleMessage);
    socket.emit('findChat', title);
    socket.once('allMessage', data => {
      MessagesContext.setMessagesInfo(data);
    });

    navigation.addListener('beforeRemove', e => {
      socket.emit('typing', {title: title, isTyping: false});
    });
    return () => {
      socket.emit('typing', {title: title, isTyping: false});
      socket.off('newMessage', handleMessage); // Removes the listener
    };
  }, [socket, navigation]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingViewComponent>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={[styles.mainContainer]}>
            <AppBar backNavigation={() => navigation.pop()} title={title} />

            <View style={styles.list}>
              <FlatList
                data={MessagesContext.messagesInfo}
                renderItem={({item}) => <MessageView message={item} />}
                scrollEnabled
                onScrollToIndexFailed={info => {
                  console.log(info);
                }}
                inverted
              />
            </View>
            <View
              style={[
                styles.isTypingContainer,
                isTyping ? {flex: 0.5} : {flex: 0, height: 0},
              ]}>
              <Text>Typing ... </Text>
            </View>
            <View style={styles.sendingMessageContainer}>
              <Image
                source={require('../../assets/icons/ClipAttachment.png')}
                style={styles.icon}
              />
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Write your message"
                  placeholderTextColor="#CCCCCC"
                  value={message}
                  onChangeText={text => {
                    setMessage(text);
                    console.log(text, text.length, isTyping);
                    if (text.length > 0) {
                      socket.emit('typing', {title: title, isTyping: true});
                    } else if (text.length == 0) {
                      socket.emit('typing', {title: title, isTyping: false});
                    }
                  }}
                />
                <Image
                  source={require('../../assets/icons/files.png')}
                  style={[styles.icon, styles.filesIcon]}
                />
              </View>

              <View style={styles.sendButtonContainer}>
                <Pressable
                  onPress={() => {
                    if (message.length == 0) return;
                    ////////////////////////////////////
                    setMessage(
                      MessagesContext.addMessage(
                        title,
                        message,
                        userContext.userInfo.name,
                      ),
                    );
                    ////////////////////////////////////
                    socket.emit('typing', {title: title, isTyping: false});
                    ////////////////////////////////////
                    let id = -1;
                    const chats: Chat[] = chatContext.chatsInfo;
                    const foundChat: Chat[] = chats.filter(
                      (chat: any, index: number) => {
                        console.log('chat : ', chat.title, 'data : ', title);
                        if (chat.title === title) id = index;
                        return chat.title === title;
                      },
                    );
                    const tmp = {
                      title: foundChat[0].title,
                      messageRecevied: foundChat[0].messageRecevied,
                    };
                    chats.splice(id, 1);
                    chats.unshift(tmp);
                    chatContext.updateStoredUserInfoWhenMessageStateChanged(
                      chats,
                      userContext.userInfo.name,
                    );
                    rerenderFlatList();
                  }}>
                  <View style={styles.sendButton}>
                    <Image
                      source={require('../../assets/icons/Send.png')}
                      style={[styles.icon]}
                    />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingViewComponent>
    </SafeAreaView>
  );
}
