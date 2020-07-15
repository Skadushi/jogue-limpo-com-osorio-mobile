import React, { useState, useEffect } from 'react';
import {StyleSheet,Dimensions,View,Text} from 'react-native';
import PdfReader from 'rn-pdf-reader-js';
import { useNavigation } from 'react-navigation-hooks';
import { Container,Header,Left,Button,Icon, Content, Title,Body } from 'native-base';
import styles from '../styles';

export default function LawPdfView(){

    const navigation = useNavigation();

    //observações: componente webView, faz download do pdf mas nao mostra
    return(
        <Container>
            <Header style={styles.anatomy} androidStatusBarColor='#2d914c'>
                <Body style={styles.headerBody}>
                    <Button transparent onPress={() => { navigation.goBack() }}>            
                        <Title style={styles.whiteButtons}>Voltar</Title>   
                    </Button>
                </Body>
            </Header>
            <Content>
                <PdfReader
                    source={{
                        uri:'http://www.africau.edu/images/default/sample.pdf',
                    }}
                />
            </Content>
        </Container>
        
    );
}

