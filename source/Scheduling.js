import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar, Alert } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Form, Label, Picker, Textarea, Item, Button, Input, Title, Left, Right, Body, Icon, Text, ListItem, H1 } from 'native-base';
import styles from './styles';

export default function Scheduling() {
  const navigation = useNavigation();
  const [ name, setName ] = useState('');
  const [ item, setItem ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ district, setDistrict ] = useState('');

  async function sendRequestToApi() {
    fetch('https://api.myjson.com/bins', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        userName: name,
        userAddress: address,
        userDistrict: district,
        userItem: item,
      }),
    })
    .then((response) => {
      console.log(response);
      Alert.alert(
        'Sucesso!',
        'Requisição enviada com sucesso!',
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: false},
      );
      setName('');
      setAddress('');
      setDistrict('');
      setItem('');
    })
    .catch((error) => {
      console.error(error);
      Alert.alert(
        'Oops!',
        'Ocorreu um erro ao fazer a requisição!',
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: false},
      );
    });
  }

  const handleInput = () => {
    if(name !== '' && address !== '' && district !== '' && item !== ''){
      Alert.alert(
        'Enviar com esses dados:',
        'Nome: ' + name + '\n' + 
        'Endereço: ' + address + '\n' + 
        'Bairro: ' + district + '\n' + 
        'Descrição: ' + item, 
        [
          {
            text: 'Não',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {
            sendRequestToApi();
          }},
        ],
        {cancelable: false},
      );
    }
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
          <Title style={styles.whiteButtons}>Agendamento</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={styles.whiteButtons} />
          </Button>
        </Right>
      </Header>
      <Content padder style={styles.content}>
        <View style={{padding: 10}}>
          <Form>
            <H1 style={styles.title}>Agende a busca!</H1>
            <Item style={styles.inputs}>
              <Icon active name='person'/>
              <Input placeholder='Nome' value={name} onChangeText={(text) => { setName(text) }} />
            </Item>
            <Item style={styles.inputs}>
              <Icon active name='pin'/>
              <Input placeholder='Endereço e número' value={address} onChangeText={(text) => { setAddress(text) }} />
            </Item>
            <Item style={styles.inputs}>
              <Icon active name='map'/>
              <Input placeholder='Bairro' value={district} onChangeText={(text) => { setDistrict(text) }} />
            </Item>
            <Textarea style={styles.textarea} rowSpan={5} bordered placeholder='Descreva o item' value={item} onChangeText={(text) => { setItem(text) }}/>
          </Form>
        </View>
      </Content>
      <Footer>
        <FooterTab style={styles.anatomy}>
          <Button full style={styles.footerButton} onPress={handleInput} >
            <Text style={styles.footerButtonText}>
              <Icon style={styles.footerButtonText} name='calendar' /> Agende agora!
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}


