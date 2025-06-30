import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Home from '../screens/Home';
import About from '../screens/About';
import CataTreco from '../screens/CataTreco';
import SideBar from './Sidebar'; 
import Laws from '../screens/Laws';
import Destination from '../screens/Destination';
import Complaints from '../screens/Complaints';
import Mural from '../screens/Mural';
import ComplaintsHelp from '../screens/ComplaintsHelp';
import Scheduling from '../screens/Scheduling';
import Calendar from '../screens/Calendar';
import Gathering from '../screens/Gathering';
//import Developers from '../Developers';
import Scheduled from '../screens/Scheduled';
import CityMap from '../map/Map/CityMap';
import LawPdfView from '../tabs/LawTabs/LawPdfView';

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
    //Developers: { screen: Developers },
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
    //Developers: { screen: Developers },
    Scheduled: { screen: Scheduled },
    CityMap: { screen: CityMap },
    LawPdfView: {screen: LawPdfView}
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