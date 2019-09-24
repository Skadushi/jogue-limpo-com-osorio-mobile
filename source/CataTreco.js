import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Title, H1, Left, Right, Body, Icon, Text } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  texts: {
    fontSize: 18,
    marginTop: 20,
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
  icon: {
    color: 'white',
    margin: 3,
    fontSize: 16
  }
});

export default function CataTreco() { 
  const navigation = useNavigation();
  const { navigate } = useNavigation();

  return (
    <Container>
      <Header style={styles.anatomy} androidStatusBarColor='#529C52'>
        <Left>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Cata-Treco</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <View style={styles.container}>
          <H1>Cata-Treco</H1>
          <Text style={styles.texts}>Serviço de Coleta de descartes de grande volume (exceto eletrônicos) tais como móveis, fogões, geladeiras, sofás velhos, etc... Encaminhando-os ao destino correto. Seu agendamento é feito pelo aplicativo utilizando o botão abaixo ou pelo telefone. E o recolhimento ocorre nas quartas-feiras pela manhã, conforme o agendamento prévio.</Text>
          <Text style={styles.texts}>Telefone para Agendamento: 3663-1947</Text>
        </View>
      </Content>
      <Footer>
        <FooterTab style={styles.anatomy}>
          <Button full style={styles.button} onPress={() => { navigate('Scheduling') }}>
            <Text style={styles.buttonText}>
              <Icon style={styles.buttonText} name='calendar' /> Agendamento
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );    
}


