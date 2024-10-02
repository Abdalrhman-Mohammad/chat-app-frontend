import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');
type chatsProps = {
  title: string;
  messageRecevied: boolean;
};
export default function OuterChatComponent({
  title,
  messageRecevied,
}: chatsProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={
            require('../../../assets/images/chatAppIcon.jpeg')
            }
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleTxt}>{title}</Text>
        </View>
        <View style={styles.pointContainer}>
          <View
            style={messageRecevied ? styles.receivedMessagePoint : {}}></View>
        </View>
      </View>
      <View style={styles.line}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    backgroundColor: '#F2F7FB',
    // paddingLeft: 20,
    alignItems: 'center',
  },
  imageContainer: {flex: 2},
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 25,
    height: '100%',
    flex: 7,
    alignItems: 'flex-start',
  },
  titleTxt: {
    fontSize: 18,
    fontWeight: '800',
  },
  line: {
    height: 1,
    width: '100%',
    borderColor: '#d1d1d1',
    opacity: 0.17,
    borderWidth: 1.4,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
  },
  pointContainer: {
    flex: 1,
  },
  receivedMessagePoint: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: '#55DDFF',
  },
});
