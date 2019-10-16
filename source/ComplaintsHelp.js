import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Title, Content, Button, H1, Left, Right, Body, Icon, Text } from 'native-base';
import styles from './styles';

export default function ComplaintsHelp() {
  const navigation = useNavigation();
  
  return (
    <Container>
      <Header style={styles.anatomy} androidStatusBarColor='#529C52'>
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.pop() }}>
            <Icon name='arrow-back' style={styles.whiteButtons} />
          </Button>
        </Left>
        <Body style={{flex: 1, alignItems: 'center', paddingEnd: 30}}>
          <Title style={styles.whiteButtons}>Ajuda</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer} />
      </Header>
      <Content style={styles.content}>
        <View style={styles.container}>
          <H1 style={styles.title}>Dados Pessoais</H1>
          <Text style={styles.generalTexts}>É possível fazer uma denúncia sem esses dados, de forma anônima. Porém você não receberá nenhuma informação sobre o andamento da averiguação por parte dos responsáveis. Caso você queira saber o resultado da investigação, disponibilize Nome e Telefone nos campos para que ocorra o aviso.</Text>
          <H1 style={styles.title}>Dados da Denúncia</H1>
          <Text style={styles.generalTexts}>Com esses dados que os responsáveis pelo Programa irão descobrir qual o problema que está ocorrendo e onde. É importante que o endereço e o bairro sejam bem especificados para que o local seja encontrado de forma mais fácil. Também é importante que a descrição seja bem clara para que o processo seja rápido.</Text>
          <Text style={styles.generalTexts}>Caso o tipo da denúncia não se encontra nos tipos especificados, é por que não faz parte do escopo de denúncias aceitas pelo Programa. Denúncias que sejam feitas sem que tenha uma ligação com o Programa não terão prioridade de atendimento. Caso você ache que sua denúncia poderia fazer parte das disponíveis, ligue para: 3663-1947.</Text>
       </View>
      </Content>
    </Container>
  );    
}


