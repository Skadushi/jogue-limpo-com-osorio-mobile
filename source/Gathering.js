import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar, Alert } from 'react-native';
import { Container, Header, Content, Tabs, Tab, ScrollableTab, Footer, FooterTab, Button, Title, Left, Right, Body, Icon, Text } from 'native-base';
import styles from './styles';

import Selective from './GatheringTabs/Selective';
import Organic from './GatheringTabs/Organic';

export default function Gathering() {
  const navigation = useNavigation();
  const { navigate } = useNavigation();

  return (
    <Container>
      <Header hasTabs style={styles.anatomy} androidStatusBarColor='#529C52'>
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={styles.whiteButtons} />
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <Title style={styles.whiteButtons}>Coleta de Lixo</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={styles.whiteButtons} />
          </Button>
        </Right>
      </Header>
      <Tabs tabBarUnderlineStyle={styles.tabs} renderTabBar={() => <ScrollableTab style={styles.tab}/>}>
        <Tab heading='Orgânica' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <Organic />
        </Tab>
        <Tab heading='Seletiva' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <Selective />
        </Tab>
      </Tabs>
      <Footer>
        <FooterTab style={styles.anatomy}>
          <Button full style={styles.footerButton} onPress={() => { Alert.alert('Localização', 'Aqui irá a localização dos caminhões', [ { text: 'Ok' } ]) }}>
            <Text style={styles.footerButtonText}>
              <Icon style={styles.footerButtonText} name='navigate' /> Caminhões
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );    
}