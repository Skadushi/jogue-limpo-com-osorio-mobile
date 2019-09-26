import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Content, Tabs, Tab, ScrollableTab, Button, Title, Left, Right, Body, Icon, Text } from 'native-base';

import Mercury from './DestinationTabs/Mercury';
import Electronic from './DestinationTabs/Electronic';
import Transhipment from './DestinationTabs/Transhipment';

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

export default function Destination() {
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
          <Title style={{color: 'white'}}>Destinação de Resíduos</Title>
        </Body>
        <Right style={{flex: 0}}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={{color: 'white'}} />
          </Button>
        </Right>
      </Header>
      <Tabs tabBarUnderlineStyle={styles.tabs} renderTabBar={() => <ScrollableTab style={styles.tab}/>}>
        <Tab heading='Transbordo' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <Transhipment />
        </Tab>
        <Tab heading='Lixo Eletrônico' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <Electronic />
        </Tab>
        <Tab heading='Lâmpadas de Mercúrio' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <Mercury />
        </Tab>
      </Tabs>
    </Container>
  );
}