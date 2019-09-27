import React from 'react';
import { StyleSheet, Platform } from 'react-native';

export default styles = StyleSheet.create({
  content: {
    backgroundColor: '#dffad6'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  calendarBackground: {
    backgroundColor: '#dbfad6'
  },
  calendarContainer: {
    paddingTop: 20,
    paddingStart: 15,
    paddingEnd: 15,
    paddingBottom: 15
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
    backgroundColor: '#1d814c',
    padding: 0,
  },
  largeButton: {
    width: 300,
    height: 40,
    margin: 15,
    backgroundColor: '#1d814c',
    alignSelf: 'center'
  },
  footerButton: {
    backgroundColor: '#1d814c',
    padding: 0
  },
  h3s: {
    margin: 10,
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
    width: 90,
    height: 90,
    alignSelf: 'center',
    margin: 10,
  },
  arrowButtons: {
    color: 'white',
    fontSize: 17,
  },
  homeImageButton: {
    width: 300,
    height: 220,
    alignSelf: 'center'
  },
  homeButtonsText: {
    fontSize: 28,
    width: 330,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  homeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaffe3'
  },
  footerButtonText: {
    color: 'white',
    margin: 3,
    fontSize: 16
  },
  whiteButtons: {
    color: 'white',
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
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
    marginTop: 10,
    marginStart: 15
  },
  inputs: {
    marginTop: 5,
    marginBottom: 5,
  },
  tab: {
    backgroundColor: '#1d814c',
  },
  activeTab: {
    backgroundColor: '#1d814c',
    fontStyle: 'italic',
  },
  tabs: {
    borderBottomWidth: 2,
    borderBottomColor: '#1d814c',
    backgroundColor: 'white',
  },
  tabsText: {
      color: 'white'
  },
  accordionHeader: {
    textAlign: 'justify',
    backgroundColor: '#a3e6a1'
  },
  accordionContent: {
    textAlign: 'justify',
    backgroundColor: '#dffad6'
  },
  accordionContainer: {
    marginTop: 0, 
    backgroundColor: '#dffad6'
  }
});
