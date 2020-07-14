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
  const [inputError] = useState(false);
  
  const [validateInputs, setvalidateInputs] = useState(false);

  const [ name, setName ] = useState('');
  const [ item, setItem ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ district, setDistrict ] = useState('');
  const [ validateName, setValidateName ] = useState(false);
  const [ validateItem, setValidateItem ] = useState(false); 
  const [ validateAddress, setValidateAddress ] = useState(false); 
  const [ validateDistrict, setValidateDistrict ] = useState(false); 

  async function sendRequestToApi() {
    
    try {

      axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://saude.osorio.rs.gov.br:3003/';
      axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
      axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

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
              'Requisição enviada com sucesso! \n',
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
      
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Estamos com um problema no servidor.',
        'Tente mais tarde',
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable:false},
      );
    }



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

  function verifyInputs(){
    if(validateName && validateItem && validateAddress && validateDistrict){
      return true;
    }else{
      return false;
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
            <Item error={inputError} style={styles.inputs} error={sent && !validateName ? true : false}>
              <Icon active name='person'/>
              <Input placeholder='Nome Completo' value={name} 
                onChangeText={(text) => {
                  if(text.length < 1) setValidateName(false); else setValidateName(true);
                  setName(text);
                }
              }/>
            </Item>

            <Item error={inputError} style={styles.inputs} error={sent && !validateAddress ? true : false}>
              <Icon active name='pin'/>
              <Input placeholder='Endereço e número' value={address} 
                onChangeText={(text) => {
                  if(text.length < 1) setValidateAddress(false); else setValidateAddress(true);
                  setAddress(text) 
                }
              }/>
            </Item>

            <Item error={inputError} style={styles.inputs} error={sent && !validateDistrict ? true : false}>
              <Icon active name='map'/>
              <Input placeholder='Bairro' value={district}
                onChangeText={(text) => {
                  if(text.length < 1) setValidateDistrict(false); else setValidateDistrict(true); 
                  setDistrict(text) 
                }
              }/>
            </Item>
           
            <Textarea 
              style={[styles.textarea, sent && !validateItem ? {borderColor: 'red'} : {borderColor: '#1d814c'}]} 
              rowSpan={5} bordered placeholder='Descreva o item' 
              value={item} 
              onChangeText={(text) => { 
                if(text.length < 1) setValidateItem(false); else setValidateItem(true);
                setItem(text) 
              }
            }/>
            
          </Form>
        </View>
      </Content>
      
        
      <Footer>
      {
        verifyInputs() ?
        <FooterTab style={styles.anatomy}> 
          <Button  full  style={styles.footerButton} onPress={handleSubmit} >
            <Text style={styles.footerButtonText}>
              <Icon style={styles.footerButtonText} name='calendar' /> Agende agora!
            </Text>
          </Button>  
        </FooterTab>
        :
        <FooterTab style={{margin:0,padding:0}}>
          <Button  full disabled  style={{padding:0}}  >
            <Text style={{fontSize:16,padding:10,color:'white'}}>
              <Icon style={{fontSize:16,padding:10,color:'white'}} name='calendar' /> Agende agora!
            </Text>
          </Button>
        </FooterTab>
      }
      </Footer>
    </Container>
  );
}


