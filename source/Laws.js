import React, {useState} from 'react';
import { AppLoading } from 'expo';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Content, Tabs, Tab, ScrollableTab, Button, Title, Left, Right, Body, Icon, Text } from 'native-base';
import styles from './styles';

import LawsListMunicipal from './LawTabs/LawsListMunicipal';
import LawsListEstadual from './LawTabs/LawsListEstadual';
import LawsListFederal from './LawTabs/LawsListFederal';

export default function Laws() {

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
          <Title style={styles.whiteButtons}>Leis</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={styles.whiteButtons} />
          </Button>
        </Right>
      </Header>

      <Tabs  tabBarUnderlineStyle={styles.tabs} renderTabBar={() => <ScrollableTab style={styles.tab}/>}>
        <Tab heading='Municipal' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <LawsListMunicipal  />
        </Tab>
        <Tab heading='Estadual' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <LawsListEstadual  />
        </Tab>
        <Tab heading='Federal' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <LawsListFederal  />
        </Tab>
      </Tabs>
    </Container>
  );    
}