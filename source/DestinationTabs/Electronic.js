import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Content, Accordion, H1, Text } from 'native-base';

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
  }
});

export default function Electronic() {
  return (
    <Content style={{ marginTop: 0 }}>
      <View style={styles.container}>
        <H1>Lixo Eletrônico</H1>
        <Text style={styles.texts}>Serviço de recebimento de lixo eletrônico, tais como televisores, aparelhos de rádio, computadores, microondas, etc... Ocorre todas as sextas-feiras das 14:00 às 16:00 na Garagem Municipal, Rua Albatroz s/n Bairro Albatroz. A destinação final deste material é feita através de empresas de reciclagem que dão destino correto ao material eletrônico.</Text>
      </View>
    </Content>
  );
}