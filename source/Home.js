import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';
import styles from './styles';

export default function Home() { 
  const navigation = useNavigation();

  return (
    <Container>
      <Header style={{backgroundColor: '#1d814c'}} androidStatusBarColor='#2d914c'>
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={styles.whiteButtons} />
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <Title style={styles.whiteButtons}>Jogue Limpo</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.navigate('Developers') }}>
            <Icon name='ribbon' style={{color: '#1d844c'}}/>
          </Button>
        </Right>
      </Header>
      <Container style={styles.homeContainer}>
        <View>
          <TouchableOpacity activeOpacity={.7} style={{ marginBottom: 15 }} onPress={() => { navigation.navigate('About') }}>
            <Image source={require('../assets/logo.png')} style={styles.homeImageButton} resizeMode='center'/>  
          </TouchableOpacity>
          <Button iconLeft style={styles.largeButton} onPress={() => { navigation.navigate('CataTreco') }}>
            <Icon name='cart'/>  
            <Text style={styles.homeButtonsText}>Cata-Treco</Text>
          </Button>
          <Button iconLeft style={styles.largeButton} onPress={() => { navigation.navigate('Gathering') }}>
            <Icon name='trash'/>
            <Text style={styles.homeButtonsText}>Coleta</Text>
          </Button>
          <Button iconLeft style={styles.largeButton} onPress={() => { navigation.navigate('Complaints') }}>
            <Icon name='megaphone'/> 
            <Text style={styles.homeButtonsText}>Denúncias</Text> 
          </Button> 
          <Button iconLeft style={styles.largeButton} onPress={() => { navigation.navigate('Mural') }}>
            <Icon name='images'/>
            <Text style={styles.homeButtonsText}>Mural</Text>
          </Button>
        </View>
      </Container>
    </Container>
  );    
}