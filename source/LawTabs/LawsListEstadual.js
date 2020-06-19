import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Content, Accordion ,Text,Button, Icon, ListItem, Left, Right} from 'native-base';
import styles from '../styles';
import axios from 'axios';
import URL_API from '../Config/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function LawsListEstadual() {
  const [ loadComplete, setLoading ] = useState(false);
  const [ laws, setLaws ] = useState([]);
  let [ lawsEstaduais, setLawsEstaduais ] = useState([]);
  const [ selected,setSelected ] = useState();

  async function getLawsFromApi() {
    
    try {
      const response = await axios.get(URL_API.leis);
      setLaws(response.data);
      //console.log(response.data);
      setLawsEstaduais(
        laws.filter((law)=>{
            return law.typeLei == 'Estadual';
        })
      );
      console.log('leis estaduais...');
      console.log(lawsEstaduais);
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
          <View style={{flex:1,justifyContent:'space-around',alignItems:'stretch',borderColor: '#caebc5', borderWidth: 2}}>
          {lawsEstaduais.map((item, index) => {
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
              }
    </Content>
  );
}