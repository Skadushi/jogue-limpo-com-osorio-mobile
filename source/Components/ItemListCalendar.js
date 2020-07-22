import React, { useState, useEffect } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Body, Text, H3, Card, CardItem, Thumbnail, View, Header, Left, Right, Icon, Button, Image } from 'native-base';
import styles from '../styles';
import {Modal} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ItemListCalendar({dataText}) {

    const [visibleText, setvisibleText] = useState(false);
    const maxLenghtDescription = 100;

  
  return (
    <View>
        {
            visibleText ? 
            <Text style={styles.generalTexts}>{dataText}</Text>
            :
            <View>
                <Text style={styles.generalTexts}>{dataText.substring(0,maxLenghtDescription) + (dataText.length > maxLenghtDescription ?  "..." :"")}</Text>
                    <TouchableOpacity activeOpacity={.7} onPress={()=>{
                            setvisibleText(true);
                        }}>
                        <Text style={{color:'#1d814c',textAlign:'center',fontSize:18}}>ver mais</Text>
                    </TouchableOpacity>
            </View>    
        }
    </View>
                

    
    
  );    
}


