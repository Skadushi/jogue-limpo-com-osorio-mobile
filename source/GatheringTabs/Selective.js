import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Content, H1, Text } from 'native-base';
import styles from '../styles';

export default function Selective() {
  return (
    <Content style={styles.content}>
      <View style={styles.container}>
        <H1 style={styles.aboutTitle}>Horários de Coleta</H1>
        <Text style={styles.generalTexts}>Aqui irão os horários da coleta seletiva.</Text>
      </View>
    </Content>
  );
}