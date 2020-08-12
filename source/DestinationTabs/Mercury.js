import React,  { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { Content, Accordion, H1, Text, Container, Left, Right, Body, Icon, ListItem } from "native-base";
import styles from '../styles';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import URL_API from '../Config/Constants';

export default function Mercury({ apiLink }) {
  const navigation = useNavigation();
  const {navigate} = useNavigation();
  const [ laws, setLaws ] = useState();

  async function getLawsFromApi() {
    try {
      const response = await axios.get(URL_API.leisFederais);
      setLaws(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLawsFromApi();
  }, []);

  return (
    <Content style={styles.content}>
      <View style={styles.container}>
        <H1 style={styles.aboutTitle}>Logística Reversa de Lâmpadas de Mercúrio:</H1>
        <Text style={styles.generalTexts}>As lâmpadas de mercúrio (fluorescentes) apresentam alto potencial poluidor, e o processo de neutralização de seus resíduos é bastante custoso. Assim, o governo Federal e o Estadual, instituíram legislação específica para a logística reversa destes materiais. O que é a Logística Reversa? É um compromisso entre o governo, os fabricantes e os comerciantes de determinado produto. Neste compromisso os fabricantes e os comerciantes devem receber de volta produtos com alto potencial poluidor. Assim, para realizar o descarte destas lâmpadas deve-se procurar o local de venda e devolvê-la ao vendedor que é obrigada a aceitá-la.</Text>
        <Text style={styles.generalTexts}>Caso haja recusa em receber informe a Fiscalização Municipal: 3663-8310.</Text>
        
      </View>

      <View style={styles.accordionContainer}>
        <FlatList style={styles.content}
            data={laws}
            renderItem={({ item }) => {
            return (
                item.title === 'Lei da Logística Reversa' ?
                <TouchableOpacity onPress={() =>  navigate('LawPdfView', { title: item.title, file: item.file })} >
                <ListItem>
                  <Left>
                    <Text style={{ fontSize: 16 }} >{item.title}</Text>
                  </Left>
                  <Right>
                    <Icon type="AntDesign" name="filetext1" style={{ fontSize: 30, color: 'black' }}/>
                  </Right>
                </ListItem>
                </TouchableOpacity>
              :
              null          
              )
            }}
            keyExtractor={item => item._id}
          />
      </View>

    </Content>
  );
}