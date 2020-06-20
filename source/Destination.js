import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Content, Tabs, Tab, ScrollableTab, Button, Title, Left, Right, Body, Icon, Text } from 'native-base';
import styles from './styles';

import Mercury from './DestinationTabs/Mercury';
import Electronic from './DestinationTabs/Electronic';
import Transhipment from './DestinationTabs/Transhipment';

export default function Destination() {
  const navigation = useNavigation();

  return (
    <Container>
      <Header hasTabs style={styles.anatomy} androidStatusBarColor='#529C52'>
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={styles.whiteButtons} />
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <Title style={styles.whiteButtons}>Destinação de Resíduos</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={styles.whiteButtons} />
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