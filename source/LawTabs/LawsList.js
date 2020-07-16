import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Content, Accordion, Text, Button, Icon, ListItem, Left, Right, List, Body } from 'native-base';
import styles from '../styles';
import axios from 'axios';
import { useNavigation } from 'react-navigation-hooks';
import URL_API from '../Config/Constants';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';

export default function LawsList({ apiLink }) {
  const [loadComplete, setLoading] = useState(false);
  const [laws, setLaws] = useState([]);
  const [selected, setSelected] = useState();
  const [urlPdf, setUrlPdf] = useState('');
  const navigation = useNavigation();
  const navigate = useNavigation();

  async function getLawsFromApi() {

    /*try {
      const response = await axios.get(apiLink);
      setLaws(response.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }*/
    setLaws([
      { name: 'Lei do governo 1 bla bla bla bem grande essa lei', uri: 'http://www.africau.edu/images/default/sample.pdf' },
      { name: 'Lei do governo 2', uri: 'http://www.africau.edu/images/default/sample.pdf'  },
      { name: 'Lei do governo 3', uri: 'http://www.africau.edu/images/default/sample.pdf'  },
      { name: 'Lei do governo 4', uri: 'http://www.africau.edu/images/default/sample.pdf'  },
      { name: 'Lei do governo 5', uri: 'http://www.africau.edu/images/default/sample.pdf'  },
    ]);

  }

  useEffect(() => {
    getLawsFromApi();
  }, []);

  return (
    <Content style={styles.accordionContainer}>

      {

        <FlatList
          data={laws}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => { navigation.navigate('LawPdfView', { title: item.name, uri: item.uri }) }} >
                <ListItem>
                  <Left>
                    <Text style={{ fontSize: 16 }} >{item.name}</Text>
                  </Left>
                  <Right>
                    <Icon type="AntDesign" name="filetext1" style={{ fontSize: 30, color: 'black' }}/>
                  </Right>
                </ListItem>
              </TouchableOpacity>
            )
          }}
          keyExtractor={item => item.name}
        />

       /* !loadComplete ?
          <ActivityIndicator size='large' color='#529C52' style={{ paddingTop: 25 }}/>
          :
          <View style={{flex:1,justifyContent:'space-around',alignItems:'stretch',borderColor: '#caebc5', borderWidth: 2}}>
          {laws.map((item, index) => {
            return (
              <View key={index} >

                <TouchableOpacity style={{backgroundColor:'#dbfad6'}}  onPress={() => { setSelected(index !== selected ? index : undefined) }}>
                  <View style={{flex:1,padding:10,flexDirection:'row',justifyContent:'space-between'}}>
                      <Text>{item.name}</Text>
                      {
                        selected === index ? 
                          <Icon name='ios-arrow-up'/>
                          :
                          <Icon name='ios-arrow-down'/>
                      }
                  </View>
                </TouchableOpacity>
                
              
                {
                 index === selected ? 
                    <View style={{backgroundColor:'#eaffe3',padding:5,textAlign:'justify'}} >
                      
                        <Text style={{fontSize:16}}>{item.description}</Text>
                     
                    </View>
                    :
                    null
                  }
              </View>
                  ) 
                })}
          </View>
             */ }
    </Content>
  );
}