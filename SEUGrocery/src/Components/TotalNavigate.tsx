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
import StartPage from '../pages/StartPage';

const TotalNav = createDrawerNavigator(
  {
    home: {
      screen: MainPages,
      navigationOptions: {
        drawerLabel: '首页',
      },
    },
    page1: {
      screen: FirstPage,
      navigationOptions: {
        drawerLabel: '我的铺子',
      },
    },
    page2: {
      screen: FirstPage,
      navigationOptions: {
        drawerLabel: '我买到的',
      },
    },
    page3: {
      screen: FirstPage,
      navigationOptions: {
        drawerLabel: '我想买的',
      },
    },
    page4: {
      screen: FirstPage,
      navigationOptions: {
        drawerLabel: '收藏夹',
      },
    },
    detailPage: {
      screen: detailPage,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    startP: {
      screen: StartPage,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
  },
  {
    order: ['home', 'detailPage', 'page1', 'page2', 'page3', 'page4', 'startP'],
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
