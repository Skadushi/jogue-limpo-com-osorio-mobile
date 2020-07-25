import React from 'react';
import { StyleSheet, Platform } from 'react-native';

const mainColor = '#1d814c';
const secondaryColor = '#eaffe3';
const accentColor = '#dffad6';
const cardColor = '#dbfad6';
const bordersColor = '#caebc5';

export default styles = StyleSheet.create({
  content: {
    backgroundColor: secondaryColor
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  calendarBackground: {
    backgroundColor: cardColor,
    marginBottom: 8,
    borderTopStartRadius: 25,
    borderBottomEndRadius: 25,
    borderBottomWidth: 2,
    borderEndWidth: 2,
    borderColor: bordersColor
  },
  calendarContainer: {
    paddingTop: 20,
    paddingStart: 10,
    paddingEnd: 10,
    paddingBottom: 10
  },
  sideHeaderButtonContainer: {
    flex: 0,
  },
  headerBody: {
    flex: 1, 
    alignItems: 'center',
  },
  anatomy: {
    margin: 0,
    backgroundColor: mainColor,
    padding: 0,
  },
  largeButton: {
    width: 300,
    height: 40,
    margin: 10,
    backgroundColor: mainColor,
    alignSelf: 'center'
  },
  smallButton: {
    margin: 5,
    paddingStart: 5,
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    color: 'red',
  },
  footerButton: {
    backgroundColor: mainColor,
    padding: 0
  },
  h3s: {
    margin: 10,
    textAlign:'center'
  },
  aboutTitle: {
    marginBottom: 10,
    textAlign: 'center'
  },
  title: {
    marginTop: 10,
    textAlign: 'center'
  },
  generalTexts: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'justify'
  },
  aboutPhotoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  aboutImages: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    margin: 10,
  },
  developersPhotoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  developersImages: {
    width: 400,
    height: 100,
    alignSelf: 'center',
    margin: 5,
  },
  arrowButtons: {
    color: 'white',
    fontSize: 17,
  },
  homeImageButton: {
    width: 300,
    height: 210,
    alignSelf: 'center'
  },
  homeButtonsText: {
    width: 330,
  },
  smallButtonsText: {
    fontSize: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  homeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: accentColor
  },
  footerButtonText: {
    color: 'white',
    fontSize: 16,
    padding: 10,
  },
  whiteButtons: {
    color: 'white',
  },
  greenButtons: {
    color: mainColor,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingStart: 15,
  },
  pickerIosListItemContainer: {
    flex: 1,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerIosListItemText: {
    fontSize: 16,
  },
  internalPickerContainer: {
    flex: Platform.OS === 'ios' ? 1 : null,
    width: Platform.OS === 'ios' ? undefined : 120,
  },
  textarea: {
    marginTop: 0,
    marginStart: 15,
    fontSize: 18,
    borderColor: mainColor
  },
  requiredInputs:{
    color:'red',
    paddingRight:5,
    fontSize:22
  },
  inputs: {  
    marginTop: 5,
    marginBottom: 5,
    borderColor: mainColor
  },
  tab: {
    backgroundColor: mainColor,
  },
  activeTab: {
    backgroundColor: mainColor,
    fontStyle: 'italic',
  },
  tabs: {
    borderBottomWidth: 2,
    borderBottomColor: mainColor,
    backgroundColor: 'white',
  },
  tabsText: {
      color: 'white'
  },
  accordionHeader: {
    textAlign: 'justify',
    backgroundColor: cardColor,
  },
  accordionContent: {
    borderColor: secondaryColor,
    textAlign: 'justify',
    backgroundColor: secondaryColor
  },
  accordionContainer: {
    marginTop: 0,
    padding: 15,
    backgroundColor: secondaryColor
  },
  accordionComponent: {
    borderColor: bordersColor, 
    borderWidth: 2
  },
  imageVisualizerView: { 
    flex: 1,
    marginStart: 15,
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'space-evenly', 
    backgroundColor: bordersColor
  },
  imagePreview: { 
    width: 60, 
    height: 105, 
    marginBottom: 3,
  },
  imagesView: { 
    flex: 0, 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 5,
  },
  namesListBody: {
    flex: 1,
    alignItems: 'flex-start',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
     ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapBackButton: {
    color: 'black',
    marginStart: 5,
    position: 'absolute',
    top: 50,
    left: 0,
    backgroundColor: 'white',
    borderRadius: 90,
  },
  mapBackButtonIcon: {
    color: 'black',
  },
  districtsListView: {
    marginStart: 5,
    marginEnd: 5,
    marginBottom: 5,
    marginTop: 10,
    padding: 0,
  },
  districtsListButton: {
    width: 300,
    height: 40,
    margin: 0,
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:20,
    paddingTop:5,
    backgroundColor: mainColor,
    alignSelf: 'center',
  },
  districtsListInsideView: {
    width: 300,
    backgroundColor: accentColor,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10
  },
  districtsListSelective: {
    backgroundColor: bordersColor,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10
  },
  districtsListTexts: {
    padding: 5,
    fontSize: 16,
    textAlign: 'justify'
  },
  textInputMask:{
    height: 48, 
    width: 200, 
    fontSize:17.3, 
    marginLeft:7,
  }
});
