import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Title, Footer, FooterTab, Content, Button, H1, Left, Right, Body, Icon, Text, H3, List, ListItem } from 'native-base';
import styles from './styles';

import Events from './Events';

export default function Calendar() {
  const navigation = useNavigation();
  const [ month, setMonth ] = useState(Events.list[0].month);
  const [ monthEvents, setMonthEvents ] = useState(Events.list[0].events);
  const [ current, setCurrent ] = useState(0);

  useEffect(() => {
    setMonth(Events.list[current].month);
    setMonthEvents(Events.list[current].events);
  });

  const prevMonth = () => {
    if(current - 1 === -1){
      setCurrent(Events.list.length - 1);
    } else {
      setCurrent(current - 1);
    }
  }

  const nextMonth = () => {
    if(current + 1 === Events.list.length){
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  }

  return (
    <Container>
      <Header style={styles.anatomy} androidStatusBarColor='#2d914c'>
        <Left style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={{color: 'white'}} />
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <Title style={{color: 'white'}}>Calendário</Title>
        </Body>
        <Right style={styles.sideHeaderButtonContainer}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={{color: 'white'}} />
          </Button>
        </Right>
      </Header>
      <Content style={styles.content}>
        <View style={styles.calendarContainer}>
          <H1 style={styles.aboutTitle}>Eventos {month}</H1>
          <View style={{marginTop: 10}}>
            <List
              dataArray={monthEvents}
              renderRow={(data) =>
                <ListItem itemDivider style={styles.calendarBackground}>
                  <View>
                    <View style={styles.titleBorder}>
                      <H3 style={styles.h3s}>{data.title}</H3>
                    </View>
                    <Text style={styles.generalTexts}>{data.description}</Text>
                  </View>
                </ListItem> }
            />
          </View>
        </View>
      </Content>
      <Footer>
        <FooterTab style={styles.anatomy}>
          <Button iconLeft style={styles.button} onPress={prevMonth}>
            <Text>
              <Icon name='return-left' style={styles.arrowButtons}/>
            </Text>
          </Button>
          <Button disabled style={styles.footerButton}>
            <Text style={styles.footerButtonText}>{month.slice(0, 3) + '/' + month.slice(-2)}</Text>
          </Button>
          <Button iconRight style={styles.button} onPress={nextMonth}>
            <Text>
              <Icon name='return-right' style={styles.arrowButtons}/>
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );    
}


