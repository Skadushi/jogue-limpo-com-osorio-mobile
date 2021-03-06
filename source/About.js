import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Title, Content, Button, H1, H2, Left, Right, Body, Icon, Text } from 'native-base';
import styles from './styles';

export default function About() {
  const navigation = useNavigation();
  
  return (
    <Container style={styles.content}>
      <Header style={styles.anatomy} androidStatusBarColor='#2d914c'>
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={{color: 'white'}} />
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <Title style={{color: 'white', marginLeft:15}}>Sobre o Aplicativo</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={styles.whiteButtons} />
          </Button>
        </Right>
      </Header>
      <Content style={styles.content}>
        <View style={styles.container}>
          <H1 style={styles.aboutTitle}>Jogue Limpo com Osório</H1>
          <Text style={styles.generalTexts}>    O Programa Jogue Limpo com Osório foi criado no ano de 2013, tendo por objetivo central a conscientização e sensibilização da população para o descarte correto do lixo e cuidado com a limpeza de nossa cidade. Já no primeiro ano, foi destaque pelo trabalho desenvolvido, recebendo o prêmio Gestor Público 2014 e menção honrosa 2015.  Foi apresentado no 1º Encontro de Experiências em Sustentabilidade em 2015 na cidade de Barranquilha / Colômbia, sendo referência para as cidades de Santa Maria, Pinhal e Alegrete.</Text>
          <Text style={styles.generalTexts}>    O Jogue Limpo vem realizando inúmeras ações, como: criação do cata-treco; a triagem e limpeza nos pontos mais críticos, relacionados ao descarte incorreto do lixo; colocação de banners educativos; distribuição de materiais e implementação da coleta noturna de lixo seco no perímetro central da cidade; criação do hino do Jogue Limpo pelo Coral Pequenos Cantores de Osório; colocação do papa pilhas no Largo dos Estudantes; mutirões de limpeza nos bairros, distritos, lagoas e subida do Morro da Borússia, intensificação do trabalho da central de fiscalização; Oficinas de Restauração de Móveis  e Estofados retirados do espaço público, aplicação na rede municipal de ensino dos projetos: De olho no óleo, papa pilhas, hortas, compostagem e reciclagem.</Text>
          <Text style={styles.generalTexts}>    O projeto pedagógico das escolas municipais contempla educação ambiental aplicada da educação infantil ao 9º ano, desenvolvendo inúmeras ações e projetos nesta área, tendo em vista uma mudança de comportamento.</Text>
          <Text style={styles.generalTexts}>    Salientamos que o Jogue Limpo é um programa de conscientização, não visando à prestação de serviços. O Programa conta com o apoio e o trabalho das Secretarias Municipais, assim como a parceria com empresas e entidades não governamentais através do desenvolvimento de diversos projetos.</Text>
          <Text style={styles.generalTexts}>    Contamos com sua participação para que juntos possamos manter nossa cidade cada vez mais limpa.</Text>
          <View style={styles.aboutPhotoContainer} >
            <Image source={require('../assets/logo.png')} style={styles.aboutImages} resizeMode='contain'/>
            <Image source={require('../assets/osorio.png')} style={styles.aboutImages} resizeMode='contain' />
          </View>
          <View style={styles.developersPhotoContainer} >
            <Image source={require('../assets/logo_ifrs.gif')} style={styles.developersImages} resizeMode='contain'/>
          </View>
          <H1 style={styles.aboutTitle, {marginTop: 35, marginBottom: 10}}>Equipe envolvida</H1>
          <Text style={styles.personName}>Eduardo Aluísio Cardoso Abrahão</Text>
          <Text style={styles.personAtribute}>Prefeito</Text>

          <Text style={styles.personName}>Soraia Abrahão</Text>
          <Text style={styles.personAtribute}>Idealizadora do Programa Jogue Limpo com Osório</Text>

          <Text style={styles.personName}>Edilson Nunes Pires</Text>
          <Text style={styles.personAtribute}>Secretário de Meio Ambiente, Agricultura e Pecuária</Text>

          <Text style={styles.personName}>Bruno Chagas Alves Fernandes</Text>
          <Text style={styles.personAtribute}>Professor do IFRS Campus Osório</Text>

          <Text style={styles.personName}>Vinícius Fritzen Machado</Text>
          <Text style={styles.personAtribute}>Professor do IFRS Campus Osório</Text>

          <Text style={styles.personName}>Andrei Gabriel Santos Deniz</Text>
          <Text style={styles.personAtribute}>Aluno do IFRS Campus Osório</Text>

          <Text style={styles.personName}>Luis Rodrigo Pereira Cardoso</Text>
          <Text style={styles.personAtribute}>Aluno do IFRS Campus Osório</Text>

          <Text style={styles.personName}>Diego José da Silva Ribeiro</Text>
          <Text style={styles.personAtribute}>Aluno do IFRS Campus Osório</Text>

        </View>
      </Content>
    </Container>
  );    
}


