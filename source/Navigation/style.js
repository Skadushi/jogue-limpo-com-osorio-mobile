const React = require('react-native');
const { Platform, Dimensions, StatusBar } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  content: {
    backgroundColor: '#eaffe3'
  },
  drawerCover: {
    alignSelf: 'stretch',
    resizeMode: 'contain',
    height: deviceHeight / 5.25,
    width: null,
    position: 'relative',
    marginBottom: 10
  },
  text: {
    fontWeight: Platform.OS === 'ios' ? '500' : '400',
    fontSize: 16,
    marginLeft: 20
  },
  badgeText: {
    fontSize: Platform.OS === 'ios' ? 13 : 11,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? -3 : undefined
  },
  icon: { 
    fontSize: 26, 
    width: 30,
    justifyContent: 'center',
  }
};