import React, { useState, useEffect } from 'react';
import { Body, Text, H3, Card, CardItem, Thumbnail, View } from 'native-base';
import styles from '../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ItemListCalendar({dataList}) {

    const [visibleText, setvisibleText] = useState(false);
    const [ visible, setVisible ] = useState(false);

    const maxLenghtDescription = 100;

  
  return (
    <Card >
        <CardItem bordered style={{backgroundColor:'#dbfad6'}}>
            <Body>
                <H3 style={styles.h3s}>{dataList.title}</H3>
            </Body>
        </CardItem>
        <CardItem bordered style={{backgroundColor:'#dbfad6'}}>
            <Body>
                <Thumbnail square style={{height:300,width:300}} source={{uri:'http://saude.osorio.rs.gov.br:3003/'+dataList.image}}/>  
            </Body>
        </CardItem>
        <CardItem bordered style={{backgroundColor:'#dbfad6'}}>
            <Body> 
                {
                   visibleText ? 
                   <Text style={styles.generalTexts}>{dataList.description}</Text>
                   :
                   <View>
                        <Text style={styles.generalTexts}>{dataList.description.substring(0,maxLenghtDescription) + (dataList.description.length > maxLenghtDescription ?  "..." :"")}</Text>
                        <TouchableOpacity activeOpacity={.7} onPress={()=>{
                            setvisibleText(true);
                        }}>
                            <Text style={{color:'#1d814c',textAlign:'center',fontSize:18}}>ver mais</Text>
                        </TouchableOpacity>
                   </View>    
                }
            </Body>
        </CardItem>
    </Card>
  );    
}


