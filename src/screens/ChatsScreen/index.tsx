import {FlatList, Image, Pressable, Text, TextInput, View} from 'react-native';
import React, {useContext, useEffect, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import styles from './styles';
import OuterChatComponent from './components/OuterChatComponent';
import {chatInfoContext} from '../../contexts/ChatInfo';
import MainButton from '../../components/MainButton';
import MyModal from '../../components/myModal';
import {userInfoContext} from '../../contexts/UserInfo';
type ChatsProps = NativeStackScreenProps<RootStackParamList, 'Chats'>;

const ChatScreen = ({navigation}: ChatsProps) => {
  const userContext = useContext(userInfoContext);
  const chatsContext = useContext(chatInfoContext);
  const {chatsInfo, modalVisible, setModalVisible} = chatsContext;
  const logout = () => {
    userContext.logout();
    chatsContext.setChatsInfo([]);
    navigation.replace('Home');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Pressable onPress={logout} style={styles.titleContainer}>
          <Text style={styles.titleTxt}>Oute</Text>
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
          data={chatsInfo}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() =>
                  navigation.push('Messages', {title: item.title})
                }>
                <OuterChatComponent title={item.title} />
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
          onPress={() => setModalVisible(!modalVisible)}
          title={'New Chat'}
        />
      </View>
    </View>
  );
};

export default ChatScreen;
