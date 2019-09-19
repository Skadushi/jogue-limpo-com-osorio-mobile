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
  image: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    margin: 10,
  },
  photoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  texts: {
    fontSize: 18,
    marginTop: 20,
  }
});

export default function About() {
  const navigation = useNavigation();
  
  return (
    <Container>
      <Header style={{backgroundColor: '#5cb85c'}} androidStatusBarColor='#529C52'>
        <Left>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Sobre o Programa</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <View style={styles.container}>
          <H1>Jogue Limpo com Osório</H1>
          <Text style={styles.texts}>    O Programa Jogue Limpo com Osório foi criado no ano de 2013, tendo por objetivo central a conscientização e sensibilização da população para o descarte correto do lixo e cuidado com a limpeza de nossa cidade. Já no primeiro ano, foi destaque pelo trabalho desenvolvido, recebendo o prêmio Gestor Público 2014 e menção honrosa 2015.  Foi apresentado no 1º Encontro de Experiências em Sustentabilidade em 2015 na cidade de Barranquilha / Colômbia, sendo referência para as cidades de Santa Maria, Pinhal e Alegrete.</Text>
          <Text style={styles.texts}>    O Jogue Limpo vem realizando inúmeras ações, como: criação do cata-treco; a triagem e limpeza nos pontos mais críticos, relacionados ao descarte incorreto do lixo; colocação de banners educativos; distribuição de materiais e implementação da coleta noturna de lixo seco no perímetro central da cidade; criação do hino do Jogue Limpo pelo Coral Pequenos Cantores de Osório; colocação do papa pilhas no Largo dos Estudantes; mutirões de limpeza nos bairros, distritos, lagoas e subida do Morro da Borússia, intensificação do trabalho da central de fiscalização; Oficinas de Restauração de Móveis  e Estofados retirados do espaço público, aplicação na rede municipal de ensino dos projetos: De olho no óleo, papa pilhas, hortas, compostagem e reciclagem.</Text>
          <Text style={styles.texts}>    O projeto pedagógico das escolas municipais contempla educação ambiental aplicada da educação infantil ao 9º ano, desenvolvendo inúmeras ações e projetos nesta área, tendo em vista uma mudança de comportamento.</Text>
          <Text style={styles.texts}>    Salientamos que o Jogue Limpo é um programa de conscientização, não visando à prestação de serviços. O Programa conta com o apoio e o trabalho das Secretarias Municipais, assim como a parceria com empresas e entidades não governamentais através do desenvolvimento de diversos projetos.</Text>
          <Text style={styles.texts}>    Contamos com sua participação para que juntos possamos manter nossa cidade cada vez mais limpa.</Text>
          <View style={styles.photoContainer} >
            <Image source={require('../assets/logo.png')} style={styles.image} resizeMode='center'/>
            <Image source={require('../assets/osorio.png')} style={styles.image} resizeMode='center' />
          </View>
        </View>
      </Content>
    </Container>
  );    
}


