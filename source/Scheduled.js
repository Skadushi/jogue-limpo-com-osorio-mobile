import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { ActivityIndicator, View, RefreshControl, SafeAreaView, ScrollView  } from 'react-native';
import { Container, Header, List, ListItem, Title, Content, Button, H1, Left, Right, Body, Icon, Text, Spinner } from 'native-base';
import styles from './styles';
import axios from 'axios';
import URL_API from './Config/Constants';
import { shortDate } from './Helper/date';

export default function Scheduled() {
  const navigation = useNavigation();
  //const [ loadComplete, setLoading ] = useState(false);
  const [ items, setItems ] = useState([]);

  const [fetchingAPI, setFetchingApi] = useState(true);
  const [requestSucess,setRequestSucess] = useState(true);
  
  const getScheduledFromApi = React.useCallback(async () => {
    
    try {

      setFetchingApi(true);
      setRequestSucess(true);
     
      const response = await axios.get(URL_API.catatreco);

      if(response.status !== 200){
        setRequestSucess(false);
        setFetchingApi(false);
      }

      setItems(response.data);

      setFetchingApi(false);
      //setLoading(true);
    } catch (error) {
      console.log('erro em renderizar lista de cataTreco agendados: ',error);
      setRequestSucess(false);
      setFetchingApi(false)
    }

  },[fetchingAPI]);

  useEffect(() => {
    getScheduledFromApi();
  }, []);

  return (
    <Container style={styles.content}>
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

      <SafeAreaView style={styles.content}>
          <ScrollView
              refreshControl={
              <RefreshControl
                refreshing={fetchingAPI}
                onRefresh={getScheduledFromApi}
              />}
              >

      <Content style={styles.content}>
        <H1 style={styles.title}>Agendamentos Confirmados</H1>
        {
          fetchingAPI ? <Spinner color="green"/> :
            items.length === 0 ?
            <Text>{requestSucess ? 'Não existem cataTreco agendados cadastrados' : 'Ocorreu um problema no servidor, tente recarregar a página, ou visualizar esses dados mais tarde.'}</Text>
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
      </ScrollView>
          </SafeAreaView>
    </Container>
  );    
}