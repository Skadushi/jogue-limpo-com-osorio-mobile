import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import PdfReader from 'rn-pdf-reader-js';
import { useNavigation } from 'react-navigation-hooks';
import { Container, Header, Left, Right, Button, Icon, Content, Title, Body } from 'native-base';
import styles from '../styles';

export default function LawPdfView() {

    const navigation = useNavigation();
    const title = navigation.state.params.title;
    const uri = navigation.state.params.uri;

    //observações: componente webView, faz download do pdf mas nao mostra
    return (
        <Container>

            <Header hasTabs style={styles.anatomy} androidStatusBarColor='#529C52'>
                <Left style={styles.sideHeaderButtonContainer}>
                    <Button transparent onPress={() => { navigation.goBack() }}>
                        <Icon name='arrow-back' style={styles.whiteButtons} />
                    </Button>
                </Left>
                <Body style={styles.headerBody}>
                    <Title style={styles.whiteButtons}>{title}</Title>
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
                        uri: uri,
                    }}
                    // props={{ useGoogleReader: true, withPinchZoom: false }}                    
                />
            </>
        </Container>

    );
}

