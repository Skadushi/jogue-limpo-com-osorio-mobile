import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Content, Accordion, Text, Button, Icon, ListItem, Left, Right, List, Body } from 'native-base';
import styles from '../styles';
import axios from 'axios';
import { useNavigation } from 'react-navigation-hooks';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';

interface Law {
  _id: string;
  title: string;
  file: string;
}

export default function LawsList({ apiLink }: { apiLink: string }) {
  const [loadComplete, setLoading] = useState<boolean>(false);
  const [laws, setLaws] = useState<Law[]>([]);
  const [selected, setSelected] = useState<string | undefined>();
  const [urlPdf, setUrlPdf] = useState<string>('');
  const {navigate} = useNavigation();

  async function getLawsFromApi() {

    try {
      const response = await axios.get(apiLink);
      setLaws(response.data);
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