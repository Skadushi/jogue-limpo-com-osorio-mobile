import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Title, Content, Button, H1, Left, Right, Body, Icon, Text, H2 } from 'native-base';
import styles from './styles';

export default function Developers() {
  const navigation = useNavigation();
  
  return (
    <Container>
      <Header style={styles.anatomy} androidStatusBarColor='#2d914c'>
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={{color: 'white'}} />
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <Title style={{color: 'white', marginLeft:15}}>Sobre a Aplicação</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={styles.whiteButtons} />
          </Button>
        </Right>
      </Header>
      <Content style={styles.content}>
        <View style={styles.container}>
          <H2 style={styles.h3s}>Desenvolvimento da Aplicação:</H2>
          <Text style={styles.generalTexts}>Aplicativo: Andrei Gabriel Santos Deniz</Text>
          <Text style={styles.generalTexts}>Aplicativo: Luis Rodrigo Pereira Cardoso</Text>
          <Text style={styles.generalTexts}>Servidor: Diego José da Silva Ribeiro</Text>
          
          <H2 style={styles.h3s}>Orientação:</H2>
          <Text style={styles.generalTexts}>Bruno Chagas Alves Fernandes</Text>
          <Text style={styles.generalTexts}>Vinícius Fritzen Machado</Text>
        </View>
        <View style={styles.developersPhotoContainer} >
            <Image source={require('../assets/logo_ifrs3.gif')} style={styles.developersImages} resizeMode='center'/>
          </View>
      </Content>
    </Container>
  );
}   