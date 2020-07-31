import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Content, Accordion, Text, Button, Icon, ListItem, Left, Right, List, Body } from 'native-base';
import styles from '../styles';
import axios from 'axios';
import { useNavigation } from 'react-navigation-hooks';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';

export default function LawsList({ apiLink }) {
  const [loadComplete, setLoading] = useState(false);
  const [laws, setLaws] = useState([]);
  const [selected, setSelected] = useState();
  const [urlPdf, setUrlPdf] = useState('');
  const {navigate} = useNavigation();

  async function getLawsFromApi() {

    try {
      const response = await axios.get(apiLink);
      //a rota filtrada não está funcionando, então para testar use a rota de baixo
      //const response = await axios.get('http://saude.osorio.rs.gov.br:3003/leis')
      setLaws(response.data);
      console.log(response.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLawsFromApi();
  }, []);

  return (
    <Content style={styles.accordionContainer}>

      {

        <FlatList style={styles.content}
          data={laws}
          renderItem={({ item }) => {
            return (
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
            )
          }}
          keyExtractor={item => item._id}
        />
    }
    </Content>
  );
}