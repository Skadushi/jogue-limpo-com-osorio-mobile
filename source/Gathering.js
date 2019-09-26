import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Content, Tabs, Tab, ScrollableTab, Footer, FooterTab, Button, Title, Left, Right, Body, Icon, Text } from 'native-base';

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
  },
  anatomy: {
    margin: 0,
    backgroundColor: '#5CB85C',
    padding: 0,
  },
  button: {
    backgroundColor: '#5CB85C',
    padding: 0
  },
  buttonText: {
    color: 'white',
    margin: 3,
    fontSize: 16
  },
});

export default function Gathering() {
  const navigation = useNavigation();
  const { navigate } = useNavigation();

  return (
    <Container>
      <Header hasTabs style={{backgroundColor: '#5cb85c'}} androidStatusBarColor='#529C52'>
        <Left style={{flex: 0}}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={{color: 'white'}} />
          </Button>
        </Left>
        <Body style={{flex: 1, alignItems: 'center'}}>
          <Title style={{color: 'white'}}>Coleta de Lixo</Title>
        </Body>
        <Right style={{flex: 0}}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={{color: 'white'}} />
          </Button>
        </Right>
      </Header>
      <Tabs tabBarUnderlineStyle={styles.tabs} renderTabBar={() => <ScrollableTab style={styles.tab}/>}>
        <Tab heading='Orgânica' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
        </Tab>
        <Tab heading='Seletiva' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
        </Tab>
      </Tabs>
      <Footer>
      <FooterTab style={styles.anatomy}>
          <Button full style={styles.button} onPress={() => { navigate('Scheduling') }}>
            <Text style={styles.buttonText}>
              <Icon style={styles.buttonText} name='trash' /> Onde os caminhões estão?
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );    
}