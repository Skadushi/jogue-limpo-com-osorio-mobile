import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Content, H1, Text } from 'native-base';
import styles from '../styles';

export default function Transhipment() {
  return (
    <Content style={styles.content}>
      <View style={styles.container}>
        <H1 style={styles.aboutTitle}>Central de Transbordo</H1>
        <Text style={styles.generalTexts}>Local onde a população pode destinar os entulhos e caliças provenientes de pequenas reformas e obras, além de podas de árvores e móveis velhos. Os materiais podem ser levados através de caminhonetes, carrinhos e reboques. Os materiais de origem doméstica são separados e destinados à cooperativa de triagem de resíduos sólidos para reciclagem. Os materiais não recicláveis são enviados ao destino correto através de empresas credenciadas.</Text>
        <Text style={{fontSize:18,marginTop:15,textAlign:'center',fontWeight:'bold'}}>Endereço: Rua Rainha Ginga Maria Teresa, 87, Caravágio</Text>
        <Text style={{fontSize:18,marginTop:10,marginBottom:10,textAlign:'center',fontWeight:'bold'}}>Horário de funcionamento: Segunda-feira à Sábado, das 7h30min às 11h30min e das 13h30min às 17h30min</Text>

      </View>
    </Content>
  );
}