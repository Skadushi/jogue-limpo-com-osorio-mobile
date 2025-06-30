import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import PdfReader from 'rn-pdf-reader-js';
import { useNavigation } from 'react-navigation-hooks';
import { Container, Header, Left, Right, Button, Icon, Content, Title, Body } from 'native-base';
import styles from '../styles';

export default function LawPdfView() {

    const navigation = useNavigation();
    const title = navigation.state.params.title;
    const file = navigation.state.params.file;
    //observações: componente webView, faz download do pdf mas nao mostra

    const getTitle = () => {
        const maxChar = 28;
        let titleTruncated = title.substring(0, maxChar);
        if (title.length > maxChar)
            titleTruncated += " ..."
        return titleTruncated;
    }

    return (
        <Container>

            <Header hasTabs style={styles.anatomy} androidStatusBarColor='#529C52'>
                <Left style={styles.sideHeaderButtonContainer}>
                    <Button transparent onPress={() => { navigation.goBack() }}>
                        <Icon name='arrow-back' style={styles.whiteButtons} />
                    </Button>
                </Left>
                <Body style={styles.headerBody}>
                    <Title style={{color: 'white', marginLeft:-23}}>{getTitle()}</Title>
                </Body>
                {/* <Right style={styles.sideHeaderButtonContainer}>
                    <Button transparent onPress={() => { navigation.openDrawer() }}>
                        <Icon name='menu' style={styles.whiteButtons} />
                    </Button>
                </Right> */}
            </Header>

            <>
                <PdfReader
                    source={{
                        uri: `http://saude.osorio.rs.gov.br:3003/` + file,
                    }}
                    // props={{ useGoogleReader: true, withPinchZoom: false }}                    
                />
            </>
        </Container>

    );
}

