import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: (height / 4) * 3,
    paddingVertical: 150,
  },
  chat: {
    fontFamily: 'serif',
    fontSize: 80,
    fontWeight: 'bold',
    color: 'black',
  },
  app: {
    fontFamily: 'serif',
    fontSize: 60,
    fontWeight: 'bold',
    color: 'black',
  },
  options: {
    width: width,
    height: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
  },
});
