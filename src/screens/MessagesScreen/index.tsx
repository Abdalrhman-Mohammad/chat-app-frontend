import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
  Keyboard,
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
type MessagesProps = NativeStackScreenProps<RootStackParamList, 'Messages'>;

export default function MessageScreen({navigation, route}: MessagesProps) {
  const [message, setMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const {title} = route.params;
  const userContext = useContext(userInfoContext);
  const MessagesContext = useContext(MessagesInfoContext);
  const [keyboardshown, setkeyboardshown] = useState<boolean>(false);
  console.log(
    'messagesInfo : ',
    userContext.userInfo.name,
    MessagesContext.messagesInfo,
  );

  socket.on('newMessage', data => {
    console.log('---------', data);
    MessagesContext.setMessagesInfo(data);
    console.log(' data from new message ', data);
  });
  socket.on('typing', isTyping => {
    setIsTyping(isTyping);
    console.log('isTyping : ----', isTyping);
  });
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setkeyboardshown(false);
      },
    );

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setkeyboardshown(true);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  useEffect(() => {
    console.log('entered here ?!');
    socket.emit('findChat', title);
    socket.on('allMessage', data => {
      console.log('---------', data);
      MessagesContext.setMessagesInfo(data);
      console.log(data);
    });
    navigation.addListener('beforeRemove', e => {
      socket.emit('typing', {title: title, isTyping: false});
    });
  }, [socket, navigation]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'} }>
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
                    if (text.length > 0 && !isTyping) {
                      socket.emit('typing', {title: title, isTyping: true});
                    } else if (text.length == 0 && isTyping) {
                      socket.emit('typing', {title: title, isTyping: false});
                    }
                  }}
                />
                <Image
                  source={require('../../assets/icons/files.png')}
                  style={[styles.icon, styles.filesIcon]}
                />
              </View>
              {/* <Image
                source={require('../../assets/icons/camera01.png')}
                style={styles.icon}
              />
              <Image
                source={require('../../assets/icons/microphone.png')}
                style={styles.icon}
              /> */}
              <View style={styles.sendButtonContainer}>
                <Pressable
                  onPress={() => {
                    if (message.length == 0) return;
                    setMessage(
                      MessagesContext.addMessage(
                        title,
                        message,
                        userContext.userInfo.name,
                      ),
                    );
                    socket.emit('typing', {title: title, isTyping: false});
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
