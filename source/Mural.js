import React, { useState, useEffect } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar, Modal } from 'react-native';
import { Container, Header, Title, Content, Button, H1, Left, Right, Body, Icon, Text } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    margin: 10,
  },
  photoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  texts: {
    fontSize: 18,
    marginTop: 20,
  },
  button: {
    width: 300,
    height: 40,
    margin: 10,
    backgroundColor: '#5CB85C'
  },
});

const albums = ["Evento", "Evento", "Evento", "Evento", "Evento", "Evento", "Evento", "Evento", "Evento", "Evento", "Evento", "Evento", "Evento", "Evento", "Evento",];
const images = [
  {
    url: '',
    props: {
      source: require('../assets/drawerBackground.png')
    }
  },
  {
    url: '',
    props: {
      source: require('../assets/osorio.png')
    }
  }
];

export default function About() {
  const navigation = useNavigation();
  const { navigate } = useNavigation();
  const [ visible, setVisible ] = useState(false);
  
  return (
    <Container>
      <Header style={{backgroundColor: '#5CB85C'}} androidStatusBarColor="#5CB85C">
        <Left>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Mural de fotos</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <View style={styles.container}>
            {albums.map((item, index) => {
              return (<Button style={styles.button} key={index} onPress={() => { setVisible(true) }}><Text> {item} {index} </Text></Button>) 
            })}
        </View>
        <Modal visible={visible} transparent={true} >
          <Header style={{backgroundColor: 'black'}} androidStatusBarColor='black'>
            <Left>
              <Button style={{backgroundColor: 'black'}} onPress={() => { setVisible(false)}}>
                <Icon style={{color: 'white'}} name='arrow-back' />
              </Button>
            </Left>
            <Body />
            <Right />
          </Header>
          <ImageViewer 
            imageUrls={images} 
            enableSwipeDown={true}
            onSwipeDown={() => {setVisible(false)}}/>
        </Modal>
      </Content>
    </Container>
  );    
}
