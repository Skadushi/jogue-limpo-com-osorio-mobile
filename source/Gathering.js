import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { ActivityIndicator, StyleSheet, View, Image, Platform, StatusBar, Alert } from 'react-native';
import { Container, Header, Content, Tabs, Tab, ScrollableTab, Footer, H1, FooterTab, Button, Title, Left, Right, Body, Icon, Text } from 'native-base';
import styles from './styles';

export default function Gathering() {
  const navigation = useNavigation();
  const { navigate } = useNavigation();
  const [ districts, setDistricts ] = useState([]);
  const [ selected, setSelected ] = useState();

  async function getDistrictsFromApi() {
    try {
      let response = await fetch(
        'https://api.myjson.com/bins/1h08s0'
      );
      let responseJson = await response.json();
      setDistricts(responseJson.districts);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDistrictsFromApi();
  }, []);

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
      <Content style={styles.content}>
        {  
          districts.length === 0 ? 
            <ActivityIndicator size='large' color='#529C52' style={{ paddingTop: 25 }}/>
            :
            <View style={styles.container}>
                <H1 style={[styles.title, {marginBottom: 5}]}>Selecione seu Bairro</H1>
                {districts.map((item, index) => {
                  return (
                    <View key={index} style={styles.districtsListView}>
                      <Button style={styles.districtsListButton} onPress={() => { if(selected !== index){ setSelected(index) } else { setSelected(undefined) } }}>
                        <Text>{item.name}</Text>
                      </Button>
                      {
                        index === selected ? 
                          <View style={styles.districtsListInsideView} >
                            <Text style={styles.generalTexts}>Coleta Seletiva:</Text>
                            <Text style={styles.generalTexts}>○{item.selective}</Text>
                            <Text style={styles.generalTexts}>Coleta Orgânica:</Text>
                            <Text style={styles.generalTexts}>○{item.organic}</Text>
                          </View>
                          :
                          null
                      }
                    </View>
                  ) 
                })}
            </View>
        }
      </Content>
      <Footer>
        <FooterTab style={styles.anatomy}>
          <Button full style={styles.footerButton} onPress={() => { navigate('CityMap') }}>
            <Text style={styles.footerButtonText}>
              <Icon style={styles.footerButtonText} name='navigate' /> Caminhões
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );    
}