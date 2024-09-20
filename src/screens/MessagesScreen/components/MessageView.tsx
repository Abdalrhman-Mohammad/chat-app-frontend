import {Dimensions, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useContext} from 'react';
import {Message} from '../../../types/Message';
import {userInfoContext} from '../../../contexts/UserInfo';
const {width, height} = Dimensions.get('window');
type MessageViewProps = {
  message: Message;
};
export default function MessageView({message}: MessageViewProps) {
  const userContext = useContext(userInfoContext);
  const messageDirection: ViewStyle =
    userContext.userInfo.name == message.from
      ? {
          borderTopLeftRadius: 14,
          alignSelf: 'flex-end',
        }
      : {
          borderTopRightRadius: 14,
          alignSelf: 'flex-start',
        };
  const messageColor: ViewStyle =
    userContext.userInfo.name == message.from
      ? {
          backgroundColor: '#20A090',
        }
      : {
          backgroundColor: '#F2F7FB',
        };

  return (
    <View style={styles.container}>
      <Text style={[styles.userName, messageDirection]}>{message.from}</Text>
      <View style={[styles.textContainer, messageDirection, messageColor]}>
        <Text style={styles.text}>{message.text}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    paddingHorizontal: 6,
  },
  text: {
    fontFamily: 'serif',
    fontSize: 14,
    fontWeight: '900',
    paddingHorizontal: 20,
  },
  textContainer: {
    margin: 5,
    padding: 10,
    // backgroundColor: '#2255FF',
    maxWidth: width * 0.5,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
  },
});
