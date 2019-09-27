import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Content, Accordion, H1, Text } from 'native-base';
import styles from '../styles';

export default function Electronic() {
  return (
    <Content style={styles.content}>
      <View style={styles.container}>
        <H1 style={styles.aboutTitle}>Lixo Eletrônico</H1>
        <Text style={styles.generalTexts}>Serviço de recebimento de lixo eletrônico, tais como televisores, aparelhos de rádio, computadores, microondas, etc... Ocorre todas as sextas-feiras das 14:00 às 16:00 na Garagem Municipal, Rua Albatroz s/n Bairro Albatroz. A destinação final deste material é feita através de empresas de reciclagem que dão destino correto ao material eletrônico.</Text>
      </View>
    </Content>
  );
}