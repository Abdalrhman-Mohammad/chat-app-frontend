import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  mainContainer: {
    backgroundColor: '#20A090',
    height: height,
  },
  container: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1.5,
    backgroundColor: '#20A090',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  image: {
    zIndex: 0,
    height: 44,
    width: 44,
    borderRadius: 50,
  },
  logoutContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  titleContainer: {
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#20A090',
  },
  titleTxt: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },

  list: {
    backgroundColor: '#F2F7FB',
    marginTop: 4,
    paddingTop: 16,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    flex: 14,
  },
  buttonContainer: {
    backgroundColor: '#F2F7FB',
    paddingTop: 20,
    flex: 2,
  },
});
