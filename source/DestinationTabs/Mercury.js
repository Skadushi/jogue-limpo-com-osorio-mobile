import React,  { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Content, Accordion, H1, Text, Container } from "native-base";
import styles from '../styles';

export default function Mercury({ apiLink }) {
  const [ loadComplete, setLoading ] = useState(false);
  const [ laws, setLaws ] = useState();

  /*async function getLawsFromApi() {
    try {
      let response = await fetch(
        apiLink
      );
      let responseJson = await response.json();
      setLaws(responseJson.laws);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLawsFromApi();
  }, []);
  */

  return (
    <Content style={styles.content}>
      <View style={styles.container}>
        <H1 style={styles.aboutTitle}>Logística Reversa de Lâmpadas de Mercúrio:</H1>
        <Text style={styles.generalTexts}>As lâmpadas de mercúrio (fluorescentes) apresentam alto potencial poluidor, e o processo de neutralização de seus resíduos é bastante custoso. Assim, o governo Federal e o Estadual, instituíram legislação específica para a logística reversa destes materiais. O que é a Logística Reversa? É um compromisso entre o governo, os fabricantes e os comerciantes de determinado produto. Neste compromisso os fabricantes e os comerciantes devem receber de volta produtos com alto potencial poluidor. Assim, para realizar o descarte destas lâmpadas deve-se procurar o local de venda e devolvê-la ao vendedor que é obrigada a aceitá-la.</Text>
        <Text style={styles.generalTexts}>Caso haja recusa em receber informe a Fiscalização Municipal: 3663-8310.</Text>
        
      </View>

      {
        /*
        //texto para ser incluido quando funcionar o accordion das leis pra descarte de mercurio
        <Text style={styles.generalTexts}>Legislação que define a Logística Reversa de Lâmpadas de Mercúrio:</Text>

         <Content style={styles.accordionContainer}>
            {
              !loadComplete ?
                <ActivityIndicator size='large' color='#529C52' style={{ paddingTop: 25 }}/>
                :
                <Accordion style={styles.accordionComponent} dataArray={laws} headerStyle={styles.accordionHeader} contentStyle={styles.accordionContent}/>
            }
          </Content>
        */
      }
     
    </Content>
  );
}