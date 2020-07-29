import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { ActivityIndicator, View, } from 'react-native';
import { Container, Header, List, ListItem, Title, Content, Button, H1, Left, Right, Body, Icon, Text } from 'native-base';
import styles from './styles';
import axios from 'axios';
import URL_API from './Config/Constants';
import { shortDate } from './Helper/date';

export default function Scheduled() {
  const navigation = useNavigation();
  const [ loadComplete, setLoading ] = useState(false);
  const [ items, setItems ] = useState([]);
  
  async function getScheduledFromApi() {
  
    try {
     
      const response = await axios.get(URL_API.catatreco);
      setItems(response.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getScheduledFromApi();
  }, []);

  return (
    <Container>
      <Header style={styles.anatomy} androidStatusBarColor='#529C52'>
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.pop() }}>
            <Icon name='arrow-back' style={styles.whiteButtons} />
          </Button>
        </Left>
        <Body style={{flex: 1, alignItems: 'center', paddingEnd: 30}}>
          <Title style={styles.whiteButtons}>Agendados</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer} />
      </Header>
      <Content style={styles.content}>
        <H1 style={styles.title}>Agendamentos Confirmados</H1>
        {
          !loadComplete ?
            <ActivityIndicator size='large' color='#529C52' ssstyle={{ paddingTop: 25 }}/>
            :
            <Content style={{padding: 20}}>
              <ListItem itemDivider style={[styles.calendarBackground, {marginBottom: 5}]}>
                <Left style={{flex: 0, alignItems: 'flex-start'}}>
                  <Text style={{width: 65, textAlign: 'left', fontWeight: 'bold'}}>Data da Coleta</Text>
                </Left>
                <Body style={styles.namesListBody}>
                  <Text style={{fontWeight: 'bold'}}>Nome do Solicitante</Text>
                </Body>
              </ListItem>
              <List
                  dataArray={items}
                  renderRow={(item, {}, index,) =>
                    <ListItem itemDivider style={[styles.calendarBackground, {marginBottom: 0}]} key={index}>
                      <Left style={{flex: 0, alignItems: 'flex-start'}}>
                        <Text style={{width: 65, textAlign: 'left'}}>{shortDate(item.dateToCollect)}</Text>
                      </Left>
                      <Body style={styles.namesListBody}>
                        <Text>{item.name}</Text>
                      </Body>
                    </ListItem>}
                  
                  keyExtractor={item => item._id}
                  
                />
            </Content>
        }
      </Content>
    </Container>
  );    
}