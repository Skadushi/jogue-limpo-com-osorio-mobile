import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Image, Platform, StatusBar } from 'react-native';
import { Container, Header, Title, Footer, FooterTab, Content, Button, H1, Left, Right, Body, Icon, Text, H3, List, ListItem } from 'native-base';

import Events from './Events';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  anatomy: {
    margin: 0,
    backgroundColor: '#5CB85C',
    padding: 0,
  },
  button: {
    backgroundColor: '#5CB85C',
    padding: 0
  },
  buttonActive: {
    color: 'white',
    fontSize: 16
  },
  title: {
    margin: 15,
  }
});

export default function Calendar() {
  const navigation = useNavigation();
  const [ month, setMonth ] = useState(Events.list[1].month);
  const [ monthEvents, setMonthEvents ] = useState(Events.list[1].events);
  const [ current, setCurrent ] = useState(0);

  useEffect(() => {
    console.log('rerender');
    if(current === -1){
      setCurrent(Events.list.length - 1);
    } else if(current === Events.list.length){
      setCurrent(0);
    } else {
      setMonth(Events.list[current].month);
      setMonthEvents(Events.list[current].events);
    }
  });

  return (
    <Container>
      <Header style={{backgroundColor: '#5cb85c'}} androidStatusBarColor='#529C52'>
        <Left style={{flex: 0}}>
          <Button transparent onPress={() => { navigation.goBack() }}>
            <Icon name='arrow-back' style={{color: 'white'}} />
          </Button>
        </Left>
        <Body style={{flex: 1, alignItems: 'center'}}>
          <Title style={{color: 'white'}}>Calendário</Title>
        </Body>
        <Right style={{flex: 0}}>
          <Button transparent onPress={() => { navigation.openDrawer() }}>
            <Icon name='menu' style={{color: 'white'}} />
          </Button>
        </Right>
      </Header>
      <Content>
        <View style={styles.container}>
          <H3></H3>
          <H1 style={styles.title}>Eventos {month}</H1>
          <View>
            <List
              dataArray={monthEvents}
              renderRow={(data) =>
                <ListItem itemDivider>
                  <View>
                    <H3>{data.title}</H3>
                    <Text>{data.description}</Text>
                  </View>
                </ListItem> }
            />
          </View>
        </View>
      </Content>
      <Footer>
        <FooterTab style={styles.anatomy}>
          <Button iconLeft style={styles.button} onPress={() => { setCurrent(current-1) }}>
            <Icon name='arrow-dropleft' style={{color: 'white'}}/>
          </Button>
          <Button disabled style={styles.button}>
            <Text style={styles.buttonActive}>{month.slice(0, 3) + '/' + month.slice(-2)}</Text>
          </Button>
          <Button iconRight style={styles.button} onPress={() => { setCurrent(current+1) }}>
            <Icon name='arrow-dropright' style={{color: 'white'}}/>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );    
}


