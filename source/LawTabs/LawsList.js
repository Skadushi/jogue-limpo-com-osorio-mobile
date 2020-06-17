import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Content, Accordion } from 'native-base';
import styles from '../styles';
import axios from 'axios';
import URL_API from '../Config/Constants';

export default function LawsList() {
  const [ loadComplete, setLoading ] = useState(false);
  const [ laws, setLaws ] = useState();

  async function getLawsFromApi() {
    /*try {
      let response = await fetch(
        apiLink
      );
      let responseJson = await response.json();
      setLaws(responseJson.laws);
      setLoading(true);
    } catch (error) {
      console.error(error);
    }*/
    
    try {
      const response = await axios.get(URL_API.leis);
      setLaws(response.data);
      //console.log(laws);
      console.log(response.data[0].name);
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
        !loadComplete ?
          <ActivityIndicator size='large' color='#529C52' style={{ paddingTop: 25 }}/>
          :
          <Accordion style={styles.accordionComponent} dataArray={laws} headerStyle={styles.accordionHeader} contentStyle={styles.accordionContent}/>
      }
    </Content>
  );
}