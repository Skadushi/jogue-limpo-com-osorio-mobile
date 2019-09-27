import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Content, Text, List, ListItem, Icon, Container, Left, Right, Badge } from 'native-base';
import style from './style';

const drawerCover = require('../../assets/drawerBackground.png');
const buttons = [
  {
    name: "Calendário",
    route: "Calendar",
    icon: "calendar"
  },
  {
    name: "Cata-Treco",
    route: "CataTreco",
    icon: "cart"
  },
  {
    name: "Coleta",
    route: "Gathering",
    icon: "trash"
  },
  {
    name: "Denúncias",
    route: "Complaints",
    icon: "megaphone"
  },
  {
    name: "Destinação de Resíduos",
    route: "Destination",
    icon: "paper-plane"
  },
  {
    name: "Leis",
    route: "Laws",
    icon: "paper"
  },
  {
    name: "Mural",
    route: "Mural",
    icon: "images"
  },
  {
    name: "Sobre o Programa",
    route: "About",
    icon: "information-circle"
  }
];

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container style={style.content}>
        <Content bounces={false} style={{ flex: 1, top: -1 }}>
          <TouchableOpacity activeOpacity={.7} onPress={() => this.props.navigation.navigate('Home')}>
            <Image source={drawerCover} style={style.drawerCover} />
          </TouchableOpacity>
          
          <List
            dataArray={buttons}
            renderRow={(data, index) =>
              <ListItem
                key={index}
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={style.icon}
                  />
                  <Text style={style.text}>
                    {data.name}
                  </Text>
                </Left>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;