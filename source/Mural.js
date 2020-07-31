import React, { useState, useEffect } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useNavigation } from 'react-navigation-hooks';
import { FlatList, View, Modal, RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Card, CardItem, H2, Thumbnail, Spinner } from 'native-base';
import styles from './styles'; 
import axios from 'axios';
import URL_API from './Config/Constants';
import { TouchableOpacity} from 'react-native-gesture-handler';

export default function Mural() {
  const navigation = useNavigation();
  const [ visible, setVisible ] = useState(false);
  const [ images, setImages ] = useState([]);
  const [ albums, setAlbums ] = useState([]);

  const [fetchingAPI, setFetchingApi] = useState(true);
  const [requestSucess,setRequestSucess] = useState(true);
  
  const getEventsFromApi = React.useCallback(async () => {

    try{

      setFetchingApi(true);
      setRequestSucess(true);

      const response = await axios.get(URL_API.muralPhotos);

      if(response.status !== 200){
        setRequestSucess(false);
        setFetchingApi(false);
      }

      setAlbums(response.data.result);
     
      setFetchingApi(false);

    } catch (error) {
      console.log('erro em renderizar lista do mural de fotos: ',error);
      setRequestSucess(false);
      setFetchingApi(false)
    }

  },[fetchingAPI]); 

  useEffect(() => {

    getEventsFromApi();

  }, []);


  function getImagesToView(arrayImages){
      setImages([]);
      const tempImages = [];
      arrayImages.map(img =>{
        tempImages.push('http://saude.osorio.rs.gov.br:3003/' + img);
      })
      setImages(tempImages);
  }

  const keyExtractor = (item) => item._id;
  return (
    <Container style={styles.content}>
      <Header style={styles.anatomy} androidStatusBarColor='#529C52'>    
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={styles.whiteButtons} />
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <Title style={{color: 'white', marginLeft:15}}>Mural de Fotos</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={styles.whiteButtons} />
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
          fetchingAPI ? <Spinner color="green"/> :
            albums.length === 0 ? 
            <Text>{requestSucess ? 'Não existem albuns de eventos cadastrados' : 'Ocorreu um problema no servidor, tente recarregar a página, ou visualizar esses dados mais tarde.'}</Text>
            :
            <View>
              <View style={styles.calendarContainer}>
                     
                    <FlatList
                          data={albums}
                          contentContainerStyle={{ backgroundColor: '#dbfad6', flexGrow: 1 }}
                          renderItem={
                              ({ item }) => {
                                  return(
                                    <Card >
                                      <CardItem bordered style={{backgroundColor:'#dbfad6'}}>
                                        <Body>
                                          <H2 style={styles.h3s}>{item.title}</H2>
                                        </Body>
                                      </CardItem>
                                      <CardItem bordered style={{backgroundColor:'#dbfad6'}}>
                                        <Body style={{display: 'flex', alignItems: 'center'}}>
                                          <TouchableOpacity activeOpacity={.7} style={{display: 'flex', width: '100%'}} onPress={() => { 
                                            getImagesToView(item.images);
                                            setVisible(true); 
                                            }}>
                                              <Thumbnail  square style={styles.calendarThumbnail} source={{ uri:`http://saude.osorio.rs.gov.br:3003/${item.images[0]}`}}/>
                                          </TouchableOpacity>
                                        </Body>
                                      </CardItem>
                                    </Card>
                                  )
                              }
                          }

                          keyExtractor={keyExtractor}                    
                    />       
                  
              </View>
              
              <Modal visible={visible} transparent={true} >
                <Header style={{backgroundColor: 'black'}} androidStatusBarColor='black'>
                  <Left style={{flex: 0}}>
                    <Button style={{backgroundColor: 'black'}} onPress={() => { setVisible(false)}}>
                      <Icon style={styles.whiteButtons} name='arrow-back' />
                    </Button>
                  </Left>
                  <Body style={{flex: 2}}/>
                  <Right />
                </Header>
                <ImageViewer 
                  imageUrls={images.map(e => {return {url: e}})}
                  saveToLocalByLongPress={false}
                  enableSwipeDown={true}
                  failImageSource={'https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-512.png'}
                  onSwipeDown={() => {setVisible(false)}}/>
              </Modal>
            </View>
        }
      </Content>
      </ScrollView>
          </SafeAreaView>
    </Container>
  );    
}
