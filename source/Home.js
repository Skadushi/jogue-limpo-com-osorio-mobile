import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';

const styles = StyleSheet.create({
  containerColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#446D44'
  },
  button: {
    width: 300,
    height: 40,
    margin: 15,
    alignSelf: 'center'
  },
  image: {
    width: 300,
    height: 220,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 28,
    width: 330,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default function Home() { 
  const { navigate } = useNavigation();
  const navigation = useNavigation();

  return (
    <Container>
      <Header style={{backgroundColor: '#5CB85C'}} androidStatusBarColor='#529C52'>
        <Left style={{flex: 0}}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body style={{flex: 1, alignItems: 'center'}}>
          <Title>Jogue Limpo</Title>
        </Body>
        <Right style={{flex: 0}}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='planet' style={{color: '#5CB84C'}}/>
          </Button>
        </Right>
      </Header>
      <Container style={styles.containerColumn}>
        <View>
          <TouchableOpacity activeOpacity={.7} style={{ marginBottom: 15 }} onPress={() => { navigate('About') }}>
            <Image source={require('../assets/logo.png')} style={styles.image} resizeMode='center'/>  
          </TouchableOpacity>
          <Button iconLeft success style={styles.button} onPress={() => { navigate('CataTreco') }}>
            <Icon name='cart'/>  
            <Text style={styles.buttonText}>Cata-Treco</Text>
          </Button>
          <Button iconLeft success style={styles.button} onPress={() => { navigate('Gathering') }}>
            <Icon name='trash'/>
            <Text style={styles.buttonText}>Coleta</Text>
          </Button>
          <Button iconLeft success style={styles.button} onPress={() => { navigate('Complaints') }}>
            <Icon name='megaphone'/> 
            <Text style={styles.buttonText}>Denúncias</Text> 
          </Button> 
          <Button iconLeft success style={styles.button} onPress={() => { navigate('Mural') }}>
            <Icon name='images'/>
            <Text style={styles.buttonText}>Mural</Text>
          </Button>
        </View>
      </Container>
    </Container>
  );    
}