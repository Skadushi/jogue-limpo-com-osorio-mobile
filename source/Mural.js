import React, { useState, useEffect } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useNavigation } from 'react-navigation-hooks';
import { ActivityIndicator, FlatList, StyleSheet, SafeAreaView, View, Image, Platform, StatusBar, Modal, RefreshControl, Alert } from 'react-native';
import { Container, Header, Title, Content, Button, H1, Left, Right, Body, Icon, Text, Card, CardItem, H2, Thumbnail, Spinner } from 'native-base';
import styles from './styles'; 
import axios from 'axios';
import URL_API from './Config/Constants';
import { TouchableOpacity} from 'react-native-gesture-handler';

export default function Mural() {
  const navigation = useNavigation();
  const [ visible, setVisible ] = useState(false);
  const [ images, setImages ] = useState([]);
  const [ albums, setAlbums ] = useState([]);

  const source = axios.CancelToken.source();

  const [fetchingAPI, setFetchingApi] = useState(true);

  const [skip, setSkip] = useState(0);

  const [total, setTotal] = useState(0);

  const [listLoading, setListLoading] = useState(false);

  const [regOffset] = useState(3); //quantidade de registros  que são baixados de cada vez no scroll infinito

  const [end, setEnd] = useState(false);

  
  async function getEventsFromApi(firstCall) {
  
    try{
      console.log('GETTING ALBUNS FROM API');
      setListLoading(true);

      const url = `${URL_API.muralPhotos}?skip=${firstCall ? 0 : skip}&limit=${regOffset}`;
      console.log(url);

      const response = await axios.get(url,{
        cancelToken: source.token
      }).catch(err => {
        console.log("Albuns sretrieving operation aborted. User change the window.", err)
        Alert.alert(
            'Estamos com um problema no servidor.',
            'Tente mais tarde',
            [
              {
                text: 'Ok',
              },
            ],
            {cancelable: false},
          );
        setListLoading(false);
        setFetchingApi(false);
        return;
    });

    console.log("Numeros of albuns retrieved from API" + response.data.result.length)
    if (response.data.result.length == 0) {
        //no more albuns available
        setEnd(true);
    }
    const albunsToAdd = response.data.result.filter(alb =>
         albums.indexOf(alb) < 0
    )

    firstCall ? setAlbums([...albunsToAdd]) : setAlbums([...albums, ...albunsToAdd]);

    firstCall ? setSkip(regOffset) : setSkip(skip + regOffset);

    setListLoading(false);
    setFetchingApi(false);

      //const response = await axios.get(URL_API.muralPhotos);
      /*setAlbums(response.data.result);
      console.log('array de albums');
      console.log(albums);*/

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    getEventsFromApi(true);

  }, []);

  
  const reload = React.useCallback(async () => {

    console.log("RELOADING")

    setEnd(false);
    setListLoading(true);
    setFetchingApi(true);

    getEventsFromApi(true);


  }, [fetchingAPI])

  function getImagesToView(arrayImages){
      setImages([]);
      const tempImages = [];
      arrayImages.map(img =>{
        tempImages.push('http://saude.osorio.rs.gov.br:3003/' + img);
      })
      setImages(tempImages);
      console.log('images do modal');
      console.log(images);
  }

  //const keyExtractor = (item, index) => item._id;
  return (
    <Container>
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
      <Content style={styles.content}>
        <SafeAreaView>
        {  
          fetchingAPI ? <Spinner color="green"/> :
            albums.length === 0 ? 
            <Text> Não existem albuns de eventos cadastrados </Text>
            :
            <View>
              <View style={styles.calendarContainer}>
                     
                    <FlatList
                      refreshControl={
                          <RefreshControl
                              refreshing={fetchingAPI}
                              onRefresh={reload}
                          />}
                          data={albums}
                          contentContainerStyle={{ backgroundColor: '#dbfad6', flexGrow: 1 }}
                          renderItem={
                              ({ item,index }) => {
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

                          keyExtractor={(item, index) => String(index)}

                          onEndReached={() => { if (end != true) getEventsFromApi(false) }}

                          onEndReachedThreshold={0.1}

                          ListFooterComponent={() => {
                              return (
                                  listLoading ? <Spinner color="green" /> : null
                                )
                              }}

                    
                    ></FlatList>       
                  
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
        </SafeAreaView>
      </Content>
    </Container>
  );    
}
