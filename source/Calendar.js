import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, Modal,StatusBar, ActivityIndicator, RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import { Container, Header, Title, Footer, FooterTab, Content, Button, H1, Left, Right, Body, Icon, Text, H3, List, ListItem, Card, CardItem, Thumbnail, H2, Spinner } from 'native-base';
import styles from './styles';
import axios from 'axios';
import URL_API from './Config/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ItemListCalendar from './Components/ItemListCalendar';

export default function Calendar() {
  const navigation = useNavigation();
  const [ visible, setVisible ] = useState(false);
  const [ events, setEvents ] = useState([]);
  const [urlImageModal, seturlImageModal] = useState('');
  const [ month, setMonth ] = useState('');
  const [ current, setCurrent ] = useState(new Date());

  const [fetchingAPI, setFetchingApi] = useState(true);
  const [requestSucess,setRequestSucess] = useState(true);

  const getEventsFromApi = React.useCallback(async () => {

    try {

      setFetchingApi(true);
      setRequestSucess(true);

      const response = await axios.get(URL_API.calendars + `/${current.getFullYear()}/${current.getMonth() + 1}`);
      
      if(response.status !== 200){
        setRequestSucess(false);
        setFetchingApi(false);
      }
      
      setEvents(response.data);

      setFetchingApi(false);
      
    } catch (err) {
      console.log('erro em renderizar lista de calendario de eventos: ',err);
      setRequestSucess(false);
      setFetchingApi(false)
      setEvents([]);   
    }

  },[fetchingAPI]); 

  useEffect(() => {
    getEventsFromApi();
  }, []);

  useEffect(() => {
    console.log(current.toString());
  }, [current])

  const prevMonth = () => {
    setCurrent(new Date(current.setMonth(current.getMonth() - 1)));
    getEventsFromApi();
  }

  const nextMonth = () => {
    setCurrent(new Date(current.setMonth(current.getMonth() + 1)));
    getEventsFromApi();
  }

  const getFormattedDate = () => {
    return `${('0' + (current.getMonth() + 1)).slice(-2)}/${current.getFullYear()}`;
  };

  function showModal(){
      return(
        <Modal visible={visible} 
          transparent={false} 
          >
          <Header style={{backgroundColor: 'black'}} androidStatusBarColor='black'>
            <Left style={{flex: 0}}>
                <Button style={{backgroundColor: 'black'}} onPress={() => { setVisible(false)}}>
                    <Icon style={styles.whiteButtons} name='arrow-back' />
                </Button>
            </Left>
                <Body style={{flex: 2}}/>
                <Right />
          </Header>
          <View style={{flex:1, backgroundColor:'black'}}>
          {
            <Image resizeMode='contain' style={{flex:1}} source={{uri:urlImageModal}}/>
          }
          </View> 
        </Modal>
      );
  }

  return (
    <Container>
      <Header style={styles.anatomy} androidStatusBarColor='#2d914c'>
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={{color: 'white'}} />
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <Title style={{color: 'white', marginLeft:15}}>Calendário</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={{color: 'white'}} />
          </Button>
        </Right>
      </Header>

      <SafeAreaView style={styles.content}>
          <ScrollView
              refreshControl={
              <RefreshControl
                refreshing={fetchingAPI}
                onRefresh={getEventsFromApi}
              />}
              >

      <Content style={styles.content}>
        {
          fetchingAPI ?
            <Spinner color="green"/>
            :
            <View style={styles.calendarContainer}>
              <H1 style={styles.aboutTitle}>{`Eventos ${getFormattedDate()}`}</H1>
              <View style={{marginTop: 10}}>
                {
                  events.length > 0 ? 
                  <List
                    dataArray={events}
                    renderRow={(data, index) =>
                      <Card key={index}>
                        <CardItem bordered style={{backgroundColor:'#dbfad6'}}>
                          <Body>
                            <H2 style={styles.h3s}>{data.title}</H2>
                          </Body>
                        </CardItem>
                        <CardItem bordered style={{backgroundColor:'#dbfad6'}}>
                          <Body style={{display: 'flex', alignItems: 'center'}} >
                            <TouchableOpacity activeOpacity={.7} style={{display: 'flex', width: '100%'}} onPress={() => {
                                seturlImageModal('http://saude.osorio.rs.gov.br:3003/'+data.image);
                                setVisible(true);
                              }} >
                              <Thumbnail square style={styles.calendarThumbnail} source={{ uri:`http://saude.osorio.rs.gov.br:3003/${data.image}`}}/>  
                            </TouchableOpacity>
                          </Body>
                        </CardItem>
                        <CardItem bordered style={{backgroundColor:'#dbfad6'}}>
                          <Body> 
                            <ItemListCalendar dataText={data.description}/>
                          </Body>
                        </CardItem>
                      </Card>
                    }
                  />
                  : 
                  <View>
                    <H3 style={{textAlign: 'center'}}>Este mês não possui eventos cadastrados.</H3>
                  </View>
                }
              </View>
            </View>
            
        }
        {
          showModal()
        }
      </Content>
      </ScrollView>
          </SafeAreaView>
      <Footer style={styles.footerbackground}>
        <FooterTab>
          <Button iconLeft style={styles.buttonCalendar} onPress={prevMonth}>
            <Text>
              <Icon name='return-left' style={styles.arrowButtons}/>
            </Text>
          </Button>
          <Button disabled style={styles.footerButton}>
            {
              !requestSucess ? 
                <Text style={styles.footerButtonText}>Mês/Ano</Text>
                :
            <Text style={styles.footerButtonText}>{getFormattedDate()}</Text>
            }
          </Button>
          <Button iconRight style={styles.buttonCalendar} onPress={nextMonth}>
            <Text>
              <Icon name='return-right' style={styles.arrowButtons}/>
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );    
}