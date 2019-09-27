import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Form, Label, Picker, Textarea, Item, Button, Input, Title, Left, Right, Body, Icon, Text, ListItem, H1, H2 } from 'native-base';
import styles from './styles';

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
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={styles.whiteButtons} />
          </Button>
        </Left>
        <Body style={{flex: 1, alignItems: 'center', paddingStart: 30}}>
          <Title style={styles.whiteButtons}>Denúncias</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigate('ComplaintsHelp') }}>
            <Icon name='help' style={styles.whiteButtons} />
          </Button>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={styles.whiteButtons} />
          </Button>
        </Right>
      </Header>
      <Content padder style={styles.content}>
        <View style={{padding: 10}}>
          <Form>
            <H2 style={styles.title}>Dados do Usuário</H2>
            <Item error={inputError} style={styles.inputs}>
              <Icon active name='person'/>
              <Input placeholder='Nome'/>
            </Item>
            <Item error={inputError} style={styles.inputs}>
              <Icon active name='mail'/>
              <Input placeholder='E-mail'/>
            </Item>
            <H2 style={styles.title}>Dados da Denúncia</H2>
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
          <Button full style={styles.footerButton}>
            <Text style={styles.footerButtonText}>
              <Icon style={styles.footerButtonText} name='megaphone' /> Denuncie
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}


