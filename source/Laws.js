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
  const navigate = useNavigation();

  const [tabSelected, setTabSelected] = useState(0);
  let tabNumber = 0;

  const [keyLawsMunicipais,setKeyLawsMunicipais] = useState(0);
  const [keyLawsEstaduais,setKeyLawsEstaduais] = useState(0);
  const [keyLawsFederais,setKeyLawsFederais] = useState(0);

  if(navigation.state.params != undefined) {

    tabNumber = navigation.state.params.tabInfo;
    let tabKey = navigate.state.params.tabKey;

    if(keyLawsFederais != tabKey && tabNumber == 2){
      setKeyLawsFederais(tabKey);
      setKeyLawsMunicipais(tabKey + 1);
    }else if(keyLawsEstaduais != tabKey && tabNumber == 1){
      setKeyLawsEstaduais(tabKey);
      setKeyLawsMunicipais(tabKey + 1);
    }

    if(tabSelected != tabNumber){
      setTabSelected(tabNumber);
    }

  }

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

      <Tabs initialPage={tabSelected} tabBarUnderlineStyle={styles.tabs} renderTabBar={() => <ScrollableTab style={styles.tab}/>}>
        <Tab heading='Municipal' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <LawsListMunicipal  key={keyLawsMunicipais}/>
        </Tab>
        <Tab heading='Estadual' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <LawsListEstadual key={keyLawsEstaduais} />
        </Tab>
        <Tab heading='Federal' textStyle={styles.tabsText} tabStyle={styles.tab} activeTextStyle={styles.tabsText} activeTabStyle={styles.activeTab}>
          <LawsListFederal key={keyLawsFederais} />
        </Tab>
      </Tabs>
    </Container>
  );    
}