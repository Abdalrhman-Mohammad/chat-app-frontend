import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');
type chatsProps = {
  title: string;
};
export default function OuterChatComponent({title}: chatsProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png',
          }}
          style={styles.imageStyle}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleTxt}>{title}</Text>
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
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 25,
    height: '100%',
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
});
