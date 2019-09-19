import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Title, Content, Button, H1, Left, Right, Body, Icon, Text } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 22,
    alignSelf: 'center',
    marginTop: 5,
  },
  texts: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10
  }
});

export default function ComplaintsHelp() {
  const navigation = useNavigation();
  
  return (
    <Container>
      <Header style={{backgroundColor: '#5cb85c'}} androidStatusBarColor='#529C52'>
        <Left>
          <Button transparent onPress={() => { navigation.pop() }}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Ajuda</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <View style={styles.container}>
          <Text style={styles.title}>Dados Pessoais</Text>
          <Text style={styles.texts}>É possível fazer uma denúncia sem esses dados, de forma anônima. Porém você não receberá nenhuma informação sobre o andamento da averiguação por parte dos responsáveis. Caso você queira saber o resultado da investigação, disponibilize Nome e E-mail nos campos para que ocorra o aviso.</Text>
          <Text style={styles.title}>Dados da Denúncia</Text>
          <Text style={styles.texts}>Com esses dados que os responsáveis pelo Programa irão descobrir qual o problema que está ocorrendo e onde. É importante que o endereço e o bairro sejam bem especificados para que o local seja encontrado de forma mais fácil. Também é importante que a descrição seja bem clara para que o processo seja rápido.</Text>
          <Text style={styles.texts}>Caso o tipo da denúncia não se encontra nos tipos especificados, é por que não faz parte do escopo de denúncias aceitas pelo Programa. Denúncias que sejam feitas sem que tenha uma ligação com o Programa não terão prioridade de atendimento. Caso você ache que sua denúncia poderia fazer parte das disponíveis, ligue para: 3663-1947.</Text>
       </View>
      </Content>
    </Container>
  );    
}


