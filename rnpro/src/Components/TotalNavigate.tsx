/*
  @version: 0.3
  @author: 71117123张建东
  @date: 2019-8-22
*/
import React, {Component} from 'react';
import MainPages from '../pages/MainPages';
import {
  createAppContainer,
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation';
import FirstPage from '../pages/FirstPage';
import {ScrollView, SafeAreaView} from 'react-native';
import detailPage from '../pages/detailPage';

const TotalNav = createDrawerNavigator(
  {
    home: {
      screen: MainPages,
      navigationOptions: {
        drawerLabel: 'Home',
      },
    },
    page1: {
      screen: FirstPage,
      navigationOptions: {
        drawerLabel: 'FirstPage',
      },
    },
    detailPage: {
      screen: detailPage,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    page2: {
      screen: FirstPage,
      navigationOptions: {
        drawerLabel: 'SecondPage',
      },
    },
  },
  {
    order: ['home', 'page1', 'detailPage', 'page2'],
    initialRouteName: 'home',
    drawerLockMode: 'unlocked',
    drawerPosition: 'left',
    contentComponent: props => (
      <ScrollView style={{backgroundColor: '#FFE4E1', flex: 1}}>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
          <DrawerItems {...props} />
        </SafeAreaView>
      </ScrollView>
    ),
  },
);

const AppNavigation = createAppContainer(TotalNav);

export default class AppTotalNavigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AppNavigation />;
  }
}
