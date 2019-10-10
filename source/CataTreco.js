import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Title, H1, Left, Right, Body, Icon, Text } from 'native-base';
import styles from './styles';

export default function CataTreco() { 
  const navigation = useNavigation();
  const { navigate } = useNavigation();

  return (
    <Container>
      <Header style={styles.anatomy} androidStatusBarColor='#529C52'>
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={styles.whiteButtons} />
          </Button>
        </Left>
        <Body style={{flex: 1, alignItems: 'center', paddingStart: 30}}>
          <Title style={styles.whiteButtons}>Cata-Treco</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigate('Scheduled') }}>
            <Icon name='checkmark' style={styles.whiteButtons} />
          </Button>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={styles.whiteButtons} />
          </Button>
        </Right>
      </Header>
      <Content style={styles.content}>
        <View style={styles.container}>
          <H1 style={styles.aboutTitle}>Cata-Treco</H1>
          <Text style={styles.generalTexts}>Serviço de Coleta de descartes de grande volume (exceto eletrônicos) tais como móveis, fogões, geladeiras, sofás velhos, etc... Encaminhando-os ao destino correto. Seu agendamento é feito pelo aplicativo utilizando o botão abaixo ou pelo telefone. E o recolhimento ocorre nas quartas-feiras pela manhã, conforme o agendamento prévio.</Text>
          <Text style={styles.generalTexts}>Telefone para Agendamento: 3663-1947</Text>
        </View>
      </Content>
      <Footer>
        <FooterTab style={styles.anatomy}>
          <Button full style={styles.footerButton} onPress={() => { navigate('Scheduling') }}>
            <Text style={styles.footerButtonText}>
              <Icon style={styles.footerButtonText} name='calendar' /> Agendamento
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );    
}


