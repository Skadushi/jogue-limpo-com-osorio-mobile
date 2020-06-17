import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar, Alert, Linking } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Form, Label, Picker, Textarea, Item, Button, Input, Title, Left, Right, Body, Icon, Text, ListItem, H1 } from 'native-base';
import axios from 'axios';
import styles from './styles';
import URL_API from './Config/Constants';
import requestsConfigList from './Config/requestsConfig';

export default function Scheduling() {
  const navigation = useNavigation();
  const [ internet, setInternet ] = useState(); 
  const [ sent, setSent ] = useState(false);
  const [ name, setName ] = useState('');
  const [ item, setItem ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ district, setDistrict ] = useState('');
  const [ validateName, setValidateName ] = useState(false);
  const [ validateItem, setValidateItem ] = useState(false); 
  const [ validateAddress, setValidateAddress ] = useState(false); 
  const [ validateDistrict, setValidateDistrict ] = useState(false); 

  async function sendRequestToApi() {    

    axios.post(URL_API.catatreco,{
        name: name,
        local: district ,
        adressOcurr: address,
        description: item,
    },requestsConfigList.reqPostWithoutImage)
      .then((response)=>{
        
        if(response.status === 200){
          Alert.alert(
            'Sucesso!',
            'Requisição enviada com sucesso! \n' +
            'Número da requisição: 13',
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
          setValidateAddress(false);
          setValidateDistrict(false);
          setValidateItem(false);
          setValidateName(false);
        }else{
          Alert.alert(
            'Oops!',
            'Ocorreu um erro no servidor!',
            [
              {
                text: 'Ok',
              },
            ],
            { cancelable: false },
          );
        }
      }).catch((error)=>{
          console.log(error);
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


  const checkInternet = () => {
    Linking.canOpenURL("https://google.com").then(connection => {
      if (!connection) {
        setInternet(false);
        Alert.alert(
          'Oops!',
          'Conecte-se à internet para mandar a requisição!',
          [
            {
              text: 'Ok',
            },
          ],
          {cancelable: false},
        );
      } else {
        console.log('oie');
        setInternet(true);
        sendRequestToApi();
      }
    });
  };

  const handleSubmit = () => {
    setSent(true);
    if(validateName && validateItem && validateAddress && validateDistrict){
      Alert.alert(
        'Enviar com esses dados:',
        'Nome: ' + name + '\n' + 
        'Endereço: ' + address + '\n' + 
        'Bairro: ' + district + '\n' + 
        'Descrição: ' + item, 
        [
          {
            text: 'Não',
          },
          {text: 'OK', onPress: () => {
            checkInternet();
            setSent(false);
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
            <Item style={styles.inputs} error={sent && !validateName ? true : false}>
              <Icon active name='person'/>
              <Input placeholder='Nome Completo' value={name} 
                onChangeText={(text) => {
                  if(text.length < 8) setValidateName(false); else setValidateName(true);
                  setName(text);
                }
              }/>
            </Item>
            <Item style={styles.inputs} error={sent && !validateAddress ? true : false}>
              <Icon active name='pin'/>
              <Input placeholder='Endereço e número' value={address} 
                onChangeText={(text) => {
                  if(text.length < 12) setValidateAddress(false); else setValidateAddress(true);
                  setAddress(text) 
                }
              }/>
            </Item>
            <Item style={styles.inputs} error={sent && !validateDistrict ? true : false}>
              <Icon active name='map'/>
              <Input placeholder='Bairro' value={district}
                onChangeText={(text) => {
                  if(text.length < 8) setValidateDistrict(false); else setValidateDistrict(true); 
                  setDistrict(text) 
                }
              }/>
            </Item>
            <Textarea 
              style={[styles.textarea, sent && !validateItem ? {borderColor: 'red'} : {borderColor: '#1d814c'}]} 
              rowSpan={5} bordered placeholder='Descreva o item' 
              value={item} 
              onChangeText={(text) => { 
                if(text.length < 20) setValidateItem(false); else setValidateItem(true);
                setItem(text) 
              }
            }/>
            {
              sent && !validateItem ?
                <Text style={[styles.generalTexts, {color: 'red', marginStart: 15}]}>Por favor, detalhe melhor o item a ser buscado</Text>
                :
                null
            }
          </Form>
        </View>
      </Content>
      <Footer>
        <FooterTab style={styles.anatomy}>
          <Button full style={styles.footerButton} onPress={handleSubmit} >
            <Text style={styles.footerButtonText}>
              <Icon style={styles.footerButtonText} name='calendar' /> Agende agora!
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}


