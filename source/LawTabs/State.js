import React from 'react';
import { StyleSheet } from 'react-native';
import { Content, Accordion } from 'native-base';
import styles from '../styles';

const stateLaws = [
  { title: 'Código Florestal - RS', content: 'Lei Estadual nº 9519/2000 – Dispõe sobre o Código Florestal do Estado do Rio Grande do Sul' },
  { title: 'Licenciamento Ambiental Estadual', content: 'Resolução CONSEMA nº 372/2018 – Dispõe sobre a competência do Licenciamento Ambiental Estadual' }
];

export default function State() {
  return (
    <Content padder style={styles.accordionContainer}>
      <Accordion dataArray={stateLaws} headerStyle={styles.accordionHeader} contentStyle={styles.accordionContent}/>
    </Content>
    );
}