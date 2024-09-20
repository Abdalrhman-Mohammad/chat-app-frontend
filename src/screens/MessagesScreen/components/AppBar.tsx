import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');

export default function AppBar({backNavigation, title}: any) {
  return (
    <View style={styles.appBar}>
      <Pressable onPress={backNavigation}>
        <View>
          <Image
            style={styles.icon}
            source={require('../../../assets/icons/Back.png')}
          />
        </View>
      </Pressable>
      <View style={styles.imageContainer}>
        <View style={styles.point}></View>
        <Image
          source={require('../../../assets/images/myPhoto.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleTxt}>{title}</Text>
        <Text style={styles.subTitleTxt}>Group</Text>
      </View>
      <View style={{width: 80}} />
      <Image
        style={[styles.icon]}
        source={require('../../../assets/icons/Call.png')}
      />
      <Image
        style={styles.icon}
        source={require('../../../assets/icons/Group.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFF',
    height: height,
  },
  appBar: {
    width: width,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    flex: 0.6,
    // justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 13,
    height: 26,
    width: 26,
  },
  titleTxt: {
    fontFamily: 'serif',
    color: 'black',
    fontSize: 16,
    fontWeight: '900',
    paddingHorizontal: 20,
  },
  titleContainer: {
    // alignItems: 'center',
  },
  subTitleTxt: {
    fontFamily: 'serif',
    fontSize: 12,
    fontWeight: '900',
    color: '797C7B',
    paddingHorizontal: 20,
  },
  imageContainer: {},
  image: {
    // position: 'absolute',
    zIndex: 0,
    height: 44,
    width: 44,
    // marginHorizontal: 10,
    borderRadius: 50,
  },
  point: {
    position: 'absolute',
    right: height / 70,
    bottom: 1,
    zIndex: 1,
    height: 8,
    width: 8,
    backgroundColor: '#2BEF83',
    borderRadius: 50,
  },
});
