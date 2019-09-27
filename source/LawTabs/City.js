import React from 'react';
import { StyleSheet } from 'react-native';
import { Content, Accordion } from 'native-base';
import styles from '../styles';

const cityLaws = [
  { title: 'Licenciamento Ambiental', content: 'Lei Municipal nº5416/2014 – Institui o Licenciamento Ambiental Municipal' },
  { title: 'Política de Saneamento Básico', content: 'Lei Municipal nº5301/2014 – Dispõe a Política Municipal de Saneamento Básico' },
  { title: 'Política de Educação Ambiental', content: 'Lei Municipal nº4839/2011 – Institui a Política Municipal de Educação Ambiental' },
  { title: 'Emissão de Ruídos e Sossego Público', content: 'Lei Municipal nº4891/2011 – Dispõe sobre a Emissão de Ruídos e Sossego Público' },
  { title: 'Gestão de Resíduos Volumosos e da Construção Civil', content: 'Lei Municipal nº 4457/2009 – Institui o sistema de Gestão de Resíduos Volumosos e da Construção Civil' },
  { title: 'Plano Diretor Municipal', content: 'Lei Municipal nº 3902/2006 – Institui o Plano Diretor Municipal' },
  { title: 'Área de Proteção Ambiental do Morro de Osório', content: 'Lei Municipal nº2665/1995 – Cria a Área de Proteção Ambiental do Morro de Osório (APA da Borrússia)' },
  { title: 'Plano de Manejo da APA Morro de Osório', content: 'Decreto Municipal nº 213/2008 – Institui o Plano de Manejo da APA Morro de Osório' },
  { title: 'Plano de Manejo da APA Morro de Osório (2012)', content: 'Decreto Municipal nº 194/2012 – Altera o Plano de Manejo da APA Morro de Osório' },
  { title: 'Plano de Manejo da APA Morro de Osório (2014)', content: 'Decreto Municipal nº 227/2014 – Altera o Plano de Manejo da APA Morro de Osório' },
];

export default function City() {
  return (
    <Content padder style={styles.accordionContainer}>
      <Accordion dataArray={cityLaws} headerStyle={styles.accordionHeader} contentStyle={styles.accordionContent}/>
    </Content>
  );
}