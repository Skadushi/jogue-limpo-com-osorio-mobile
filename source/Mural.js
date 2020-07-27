import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { ActivityIndicator, StyleSheet, View, Image, Platform, StatusBar, Modal } from 'react-native';
import { Container, Header, Title, Content, Button, H1, Left, Right, Body, Icon, Text } from 'native-base';
import styles from './styles'; 
import axios from 'axios';
import URL_API from './Config/Constants';
import CarouselModal from './Components/CarouselModal';

export default function About() {
  const navigation = useNavigation();
  const [ visible, setVisible ] = useState(false);
  const [ images, setImages ] = useState([]);
  const [ albums, setAlbums ] = useState([]);
  
  async function getEventsFromApi() {
  
    try{

      const response = await axios.get(URL_API.muralPhotos);
      setAlbums(response.data.result);
      console.log('array de albums');
      console.log(albums);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEventsFromApi();
  }, []);

  function getImagesToView(arrayImages){
     
      const tempImages = [];
      arrayImages.map(img =>{
        tempImages.push('http://saude.osorio.rs.gov.br:3003/' + img);
      })
      setImages(tempImages);
      console.log('images do modal');
      console.log(images);
  }

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
        {  
          albums.length === 0 ? 
            <ActivityIndicator size='large' color='#529C52' style={{ paddingTop: 25 }}/>
            :
            <View>
              <View style={styles.container}>
                  {albums.map((item, index) => {       
                    return (
                      <Button key={index} style={styles.largeButton} key={index} onPress={() => { getImagesToView(item.images); setVisible(true) }}><Text> {item.title}</Text></Button>
                    )
                  })}
              </View>
              <Modal visible={visible} transparent={false} >
                <Header style={{backgroundColor: 'black'}} androidStatusBarColor='black'>
                  <Left style={{flex: 0}}>
                    <Button style={{backgroundColor: 'black'}} onPress={() => {  setImages([]); setVisible(false)}}>
                      <Icon style={styles.whiteButtons} name='arrow-back' />
                    </Button>
                  </Left>
                  <Body style={{flex: 2}}/>
                  <Right />
                </Header>
                  <CarouselModal imagesCarousel={images} />
              </Modal>
            </View>
        }
      </Content>
    </Container>
  );    
}
