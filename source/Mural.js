import React, { useState, useEffect } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useNavigation } from 'react-navigation-hooks';
import { ActivityIndicator, StyleSheet, View, Image, Platform, StatusBar, Modal } from 'react-native';
import { Container, Header, Title, Content, Button, H1, Left, Right, Body, Icon, Text } from 'native-base';
import styles from './styles'; 

export default function About() {
  const navigation = useNavigation();
  const [ visible, setVisible ] = useState(false);
  const [ images, setImages ] = useState([]);
  const [ albums, setAlbums ] = useState([]);
  
  async function getEventsFromApi() {
    try {
      let response = await fetch(
        'https://api.myjson.com/bins/189oal'
      );
      let responseJson = await response.json();
      setAlbums(responseJson.albums);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getEventsFromApi();
  }, []);

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
                    return (<Button style={styles.largeButton} key={index} onPress={() => { setImages(item.images); setVisible(true) }}><Text> {item.eventTitle}</Text></Button>) 
                  })}
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
                  imageUrls={images}
                  saveToLocalByLongPress={false}
                  enableSwipeDown={true}
                  failImageSource={'https://cdn4.iconfinder.com/data/icons/ui-beast-4/32/Ui-12-512.png'}
                  onSwipeDown={() => {setVisible(false)}}/>
              </Modal>
            </View>
        }
      </Content>
    </Container>
  );    
}
