import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar, Alert, Linking } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Form, Label, Picker, Textarea, Item, Button, Input, Title, Left, Right, Body, Icon, Text, ListItem, H1, Spinner } from 'native-base';
import axios from 'axios';
import styles from './styles';
import URL_API from './Config/Constants';
import requestsConfigList from './Config/requestsConfig';

export default function Scheduling() {

  const navigation = useNavigation();
  const [loading,setLoading] = useState(false);
  const [ name, setName ] = useState('');
  const [ item, setItem ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ district, setDistrict ] = useState('');
  
  async function sendRequestToApi() {
    
    try {
      setLoading(true);
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
            setLoading(false);
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
            }else{
              setLoading(false);
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
              setLoading(false);
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
      setLoading(false);
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

  const handleSubmit = () => {
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
            sendRequestToApi();
          }},
        ],
        {cancelable: false},
      );
    
  }

  function verifyInputs(){
    if(name.length > 0 && item.length > 0 && address.length > 0 && district.length > 0 ){
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
        <View style={{padding: 5}}>
          <Form>
            <H1 style={styles.title}>Agende a busca!</H1>
            <Item  style={styles.inputs}>
              <Text style={styles.requiredInputs}>*</Text>
              <Icon active name='person'/>
              <Input placeholder='Nome Completo' value={name} 
                onChangeText={(text) => {
                  setName(text);
                }
              }/>
            </Item>
            
            <Item style={styles.inputs} >
              <Text style={styles.requiredInputs}>*</Text>
              <Icon active name='pin'/>
              <Input placeholder='Endereço e número' value={address} 
                onChangeText={(text) => {
                  setAddress(text) 
                }
              }/>
            </Item>

            <Item style={styles.inputs} >
              <Text style={styles.requiredInputs}>*</Text>
              <Icon active name='map'/>
              <Input placeholder='Bairro' value={district}
                onChangeText={(text) => {     
                  setDistrict(text) 
                }
              }/>
            </Item>
           
            <Text style={{color:'red',paddingLeft:15,fontSize:22,marginTop:10}}>*</Text>
            <Textarea 
              style={[styles.textarea,{borderColor: '#1d814c'}]} 
              rowSpan={5} bordered placeholder='Descreva o item' 
              value={item} 
              onChangeText={(text) => { 
                setItem(text) 
              }
            }/>
            <Text style={{color:'red',fontSize:16,paddingLeft:15,marginTop:5,marginBottom:20}}>Os campos marcados com (*) são de preenchimento obrigatório.</Text>
            
          </Form>
        </View>
      </Content>
      
        
      <Footer>
      {
        verifyInputs() ?
        <FooterTab style={styles.anatomy}>        
            {
              loading ?
              <Button full  style={styles.footerButton}>
                <Spinner color="white"/>
              </Button>     
              :
              <Button  full  style={styles.footerButton} onPress={handleSubmit} >
                <Text style={styles.footerButtonText}>
                  <Icon style={styles.footerButtonText} name='calendar' /> Agende agora!
                </Text>
              </Button>  
            }   
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


