import React, { useState, useEffect } from 'react';
import {StyleSheet,Dimensions,View,Text} from 'react-native';
import PdfReader from 'rn-pdf-reader-js';

export default function LawPdfView(){

    //observações: componente webView, faz download do pdf mas nao mostra
    return(
        <PdfReader
            source={{
                uri:'http://www.africau.edu/images/default/sample.pdf',
            }}
        />
    );
}

