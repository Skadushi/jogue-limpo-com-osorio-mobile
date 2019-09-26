import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
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
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  pickerIosListItemContainer: {
    flex: 1,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerIosListItemText: {
    fontSize: 16,
  },
  internalPickerContainer: {
    flex: Platform.OS === 'ios' ? 1 : null,
    width: Platform.OS === 'ios' ? undefined : 120,
  },
});

const options = [ "Selecione uma opção", "Lixo irregular", "Descarte de materiais incorreto", "Lâmpadas de mercúrio" ];

export default function Complaints() {
  const navigation = useNavigation();
  const { navigate } = useNavigation();
  const [ text, setText ] = useState('');
  const [ inputError, setInputError ] = useState(false);
  const [ selected, setSelected ] = useState("0");

  return (
    <Container>
      <Header style={styles.anatomy} androidStatusBarColor='#529C52'>
        <Left style={{flex: 0}}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={{color: 'white'}} />
          </Button>
        </Left>
        <Body style={{flex: 1, alignItems: 'center', paddingStart: 30}}>
          <Title style={{color: 'white'}}>Denúncias</Title>
        </Body>
        <Right style={{flex: 0}}>
          <Button transparent onPress={() => { navigate('ComplaintsHelp') }}>
            <Icon name='help' style={{color: 'white'}} />
          </Button>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={{color: 'white'}} />
          </Button>
        </Right>
      </Header>
      <Content padder>
        <View style={styles.container}>
          <Form>
            <Text style={styles.title}>Dados do Usuário</Text>
            <Item error={inputError} style={styles.inputs}>
              <Icon active name='person'/>
              <Input placeholder='Nome'/>
            </Item>
            <Item error={inputError} style={styles.inputs}>
              <Icon active name='mail'/>
              <Input placeholder='E-mail'/>
            </Item>
            <Text style={styles.title}> Dados da Denúncia</Text>
            <Item error={inputError} style={styles.inputs}>
              <Icon active name='pin'/>
              <Input placeholder='Endereço e número'/>
            </Item>
            <Item error={inputError} style={styles.inputs}>
              <Icon active name='map'/>
              <Input placeholder='Bairro'/>
            </Item>
            <View style={styles.pickerContainer}>
              <Icon name='clipboard'/> 
              <Text style={{ paddingBottom: 1.5, paddingStart: 5 }}> Qual o tipo da denúncia?</Text>
              <Picker
                mode='dropdown'
                iosIcon={<Icon name='arrow-down' />}
                style={styles.internalPickerContainer}
                selectedValue={selected}
                onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
                itemStyle={styles.pickerIosListItemContainer}
                itemTextStyle={styles.pickerIosListItemText}
              >
                {options.map((item, index) => {
                  return (<Picker.Item label={item} value={index} key={index} />) 
                })}
              </Picker>
            </View>
            <Textarea style={styles.textarea} rowSpan={3} bordered placeholder='Descreva sua denúncia' />
          </Form>
        </View>
      </Content>
      <Footer>
        <FooterTab style={styles.anatomy}>
          <Button full style={styles.button}>
            <Text style={styles.buttonText}>
              <Icon style={styles.buttonText} name='megaphone' /> Denuncie
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}


