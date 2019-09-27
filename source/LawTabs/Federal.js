import React from 'react';
import { StyleSheet } from 'react-native';
import { Content, Accordion } from 'native-base';
import styles from '../styles';

const federalLaws = [
  { title: 'Novo Código Florestal Brasileiro', content: 'Lei Federal nº 12651/2012 – Dispõe sobre o Novo Código Florestal Brasileiro' },
  { title: 'Parcelamento de Solo Rural', content: 'Lei Federal nº 5868/1972 – Regulamenta o Parcelamento de Solo na Zona Rural' },
  { title: 'Disposição sobre o Estatuto da Terra', content: 'Lei Federal nº 4504/1964 – Dispõe sobre o Estatuto da Terra' },
  { title: 'Parcelamento do Solo Urbano', content: 'Lei Federal nº 6766/1979 – Dispõe sobre o Parcelamento do Solo Urbano' },
  { title: 'Regulamento do Estatuto da Terra', content: 'Decreto Federal nº62504/1968 – Regulamenta a Lei Federal nº 4504/1964 (Estatuto da Terra)' },
  { title: 'Cadastro Ambiental Rural', content: 'Decreto Federal nº 7830/2012 – Dispõe sobre o Sistema Cadastro Ambiental Rural – CAR' },
];

export default function Federal(){
  return (
    <Content padder style={styles.accordionContainer}>
      <Accordion dataArray={federalLaws} headerStyle={styles.accordionHeader} contentStyle={styles.accordionContent}/>
    </Content>
  );
}