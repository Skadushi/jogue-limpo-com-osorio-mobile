import React, { useState, useEffect } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar, Modal } from 'react-native';
import { Container, Header, Title, Content, Button, H1, Left, Right, Body, Icon, Text } from 'native-base';
import styles from './styles'; 

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
      <Header style={styles.anatomy} androidStatusBarColor='#529C52'>    
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={styles.whiteButtons} />
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <Title style={styles.whiteButtons}>Mural de Fotos</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={styles.whiteButtons} />
          </Button>
        </Right>
      </Header>
      <Content style={styles.content}>
        <View style={styles.container}>
            {albums.map((item, index) => {
              return (<Button style={styles.largeButton} key={index} onPress={() => { setVisible(true) }}><Text> {item} {index} </Text></Button>) 
            })}
        </View>
        <Modal visible={visible} transparent={true} >
          <Header style={{backgroundColor: 'black'}} androidStatusBarColor='black'>
            <Left>
              <Button style={{backgroundColor: 'black'}} onPress={() => { setVisible(false)}}>
                <Icon style={styles.whiteButtons} name='arrow-back' />
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
