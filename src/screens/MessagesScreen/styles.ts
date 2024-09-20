import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFF',
    height: height,
  },
  appBar: {
    width: width,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 24,
    marginVertical: 16,
    flex: 0.6,
    // justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
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
  list: {
    flex: 8,
  },
  sendingMessageContainer: {
    flex: 1,
    marginLeft:7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textInputContainer: {
    justifyContent: 'center',
  },
  textInput: {
    paddingHorizontal: 12,
    backgroundColor: '#F3F6F6',
    borderRadius: 45,
    height: 50,
    width: 250,
    fontSize: 12,
    zIndex: 0,
  },
  sendButtonContainer: {
    // flex: 1,
    marginHorizontal: 10,
    // backgroundColor: 'black',
  },
  filesIcon: {
    position: 'absolute',
    right: 4,
    zIndex: 1,
  },
  sendButton: {

    // alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
    height: 40,
    width: 40,
    backgroundColor: '#20A090',
  },
  isTypingContainer: {
    paddingHorizontal: 20,
  },
});
