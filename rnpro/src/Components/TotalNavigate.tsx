import React from 'react';
import MainPages from '../pages/MainPages';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';
import FirstPage from '../pages/FirstPage';
import {ScrollView, SafeAreaView} from 'react-native';

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
  },
  {
    order: ['home', 'page1'],
    initialRouteName: 'home',
    drawerLockMode: 'unlocked',
    drawerPosition: 'left',
    contentComponent: props => (
      <ScrollView style={{backgroundColor: '#987656', flex: 1}}>
        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
          <DrawerItems {...props} />
        </SafeAreaView>
      </ScrollView>
    ),
  },
);
