import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Home from '../Home';
import About from '../About';
import CataTreco from '../CataTreco';
import SideBar from './Sidebar'; 
import Laws from '../Laws';
import Destination from '../Destination';
import Complaints from '../Complaints';
import Mural from '../Mural';
import ComplaintsHelp from '../ComplaintsHelp';
import Scheduling from '../Scheduling';
import Calendar from '../Calendar';
import Gathering from '../Gathering';
import Developers from '../Developers';
import Scheduled from '../Scheduled';

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home, },
    About: { screen: About, },
    CataTreco: { screen: CataTreco },
    Laws: { screen: Laws },
    Destination: { screen: Destination },
    Complaints: { screen: Complaints },
    Mural: { screen: Mural },
    Scheduling: { screen: Scheduling },
    Calendar: { screen: Calendar },
    Gathering: { screen: Gathering },
    Developers: { screen: Developers },
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#5CB85C'
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const RootStack = createStackNavigator(
  {
    Drawer : { screen: Drawer },
    Home: { screen: Home, },
    About: { screen: About, },
    CataTreco: { screen: CataTreco },
    Laws: { screen: Laws },
    Destination: { screen: Destination },
    Complaints: { screen: Complaints },
    ComplaintsHelp: { screen: ComplaintsHelp },
    Mural: { screen: Mural },
    Scheduling: { screen: Scheduling },
    Calendar: { screen: Calendar },
    Gathering: { screen: Gathering },
    Developers: { screen: Developers },
    Scheduled: { screen: Scheduled }
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
    navigationOptions: {
     header: null
    },
  }
);

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;