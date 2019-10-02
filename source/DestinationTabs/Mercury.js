import React from "react";
import { StyleSheet, View } from 'react-native';
import { Content, Accordion, H1, Text, Container } from "native-base";
import styles from '../styles';

const mercuryLaws = [
  { title: 'Lei Federal nº 12305/2010', content: 'Lei Federal nº 12305/2010' },
  { title: 'Lei Estadual nº 14528/2014', content: 'Lei Estadual nº 14528/2014' },
  { title: 'Diretriz Técnica FEPAM nº 02/2015', content: 'Diretriz Técnica FEPAM nº 02/2015' }
];

export default function Mercury() {
  return (
    <Content style={styles.content}>
      <View style={styles.container}>
        <H1 style={styles.aboutTitle}>Logística Reversa de Lâmpadas de Mercúrio:</H1>
        <Text style={styles.generalTexts}>As lâmpadas de mercúrio (fluorescentes) apresentam alto potencial poluidor, e o processo de neutralização de seus resíduos é bastante custoso. Assim, o governo Federal e o Estadual, instituíram legislação específica para a logística reversa destes materiais. O que é a Logística Reversa? É um compromisso entre o governo, os fabricantes e os comerciantes de determinado produto. Neste compromisso os fabricantes e os comerciantes devem receber de volta produtos com alto potencial poluidor. Assim, para realizar o descarte destas lâmpadas deve-se procurar o local de venda e devolvê-la ao vendedor que é obrigada a aceitá-la.</Text>
        <Text style={styles.generalTexts}>Caso haja recusa em receber informe a Fiscalização Municipal: 3663-8310.</Text>
        <Text style={styles.generalTexts}>Legislação que define a Logística Reversa de Lâmpadas de Mercúrio:</Text>
      </View>
      <Content padder style={{ marginTop: 5}}>
        <Accordion style={styles.accordionComponent} dataArray={mercuryLaws} headerStyle={styles.accordionHeader} contentStyle={styles.accordionContent} />
      </Content>
    </Content>
  );
}