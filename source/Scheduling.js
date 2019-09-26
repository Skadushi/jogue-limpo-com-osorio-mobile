import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar, Alert } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Form, Label, Picker, Textarea, Item, Button, Input, Title, Left, Right, Body, Icon, Text, ListItem } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    alignSelf: 'center',
    marginTop: 5,
  },
  anatomy: {
    margin: 0,
    backgroundColor: '#5CB85C',
    padding: 0,
  },
  button: {
    backgroundColor: '#5CB85C',
    padding: 0
  },
  buttonText: {
    color: 'white',
    margin: 3,
    fontSize: 16
  },
  textarea: {
    marginTop: 10,
    marginStart: 15
  },
  inputs: {
    marginTop: 5,
    marginBottom: 5,
  },
});

export default function Scheduling() {
  const navigation = useNavigation();
  const { navigate } = useNavigation();
  const [ name, setName ] = useState('');
  const [ item, setItem ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ district, setDistrict ] = useState('');
  const [ done, setDone ] = useState(false);

  useEffect(function handleInput(){
    if(done && name !== '' && address !== '' && district !== '' && item !== ''){
      Alert.alert(
        'Enviar com esses dados:',
        name + ' ' + address + ' ' + district + ' ' + item, 
        [
          {
            text: 'Cancel',
            onPress: () => {console.log('Cancel Pressed'); setDone(false)},
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {
            console.log('OK Pressed');
            setDone(false);
            setName('');
            setAddress('');
            setDistrict('');
            setItem('');
          }},
        ],
        {cancelable: false},
      );
    } else {
      setDone(false);
    }
  });

  return (
    <Container>
      <Header style={styles.anatomy} androidStatusBarColor='#529C52'>
        <Left style={{flex: 0}}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={{color: 'white'}} />
          </Button>
        </Left>
        <Body style={{flex: 1, alignItems: 'center'}}>
          <Title style={{color: 'white'}}>Agentamento</Title>
        </Body>
        <Right style={{flex: 0}}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={{color: 'white'}} />
          </Button>
        </Right>
      </Header>
      <Content padder>
        <View style={styles.container}>
          <Form>
            <Text style={styles.title}>Agende a busca!</Text>
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
          <Button full style={styles.button} onPress={() => {setDone(true)}} >
            <Text style={styles.buttonText}>
              <Icon style={styles.buttonText} name='calendar' /> Agende agora!
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}


