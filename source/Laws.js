import React from 'react';
import { AppLoading } from 'expo';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Content, Tabs, Tab, ScrollableTab, Button, Title, Left, Right, Body, Icon, Text } from 'native-base';

import City from './LawTabs/City';
import State from './LawTabs/State';
import Federal from './LawTabs/Federal';

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#5CB85C',
  },
  activeTab: {
    backgroundColor: '#5CB85C',
    fontStyle: 'italic',
  },
  tabs: {
    borderBottomWidth: 2,
    borderBottomColor: '#5CB85C',
    backgroundColor: 'white',
  },
  tabsText: {
      color: 'white'
  }
});

export default function Laws() {
  const navigation = useNavigation();

  return (
    <Container>
      <Header hasTabs style={{backgroundColor: '#5cb85c'}} androidStatusBarColor='#529C52'>
        <Left style={{flex: 0}}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={{color: 'white'}} />
          </Button>
        </Left>
        <Body style={{flex: 1, alignItems: 'center'}}>
          <Title style={{color: 'white'}}>Leis</Title>
        </Body>
        <Right style={{flex: 0}}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={{color: 'white'}} />
          </Button>
        </Right>
      </Header>
      <Tabs tabBarUnderlineStyle={styles.tabs} renderTabBar={() => <ScrollableTab style={styles.tab}/>}>
        <Tab heading='Municipal' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <City />
        </Tab>
        <Tab heading='Estadual' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <State />
        </Tab>
        <Tab heading='Federal' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <Federal />
        </Tab>
      </Tabs>
    </Container>
  );    
}