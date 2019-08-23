import {TouchableOpacity, View, Text} from "react-native";
import React from 'react';
import {createAppContainer, createDrawerNavigator} from 'react-navigation'
import FirstPage from '../pages/FirstPage';
class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={this.props.navigation.openDrawer}>
          <Text>Open Drawer</Text>
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', marginTop: 20}}>Home</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={this.props.navigation.openDrawer}>
          <Text>Open Drawer</Text>
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold', marginTop: 20}}>Settings</Text>
      </View>
    );
  }
}

const DrawerNavigator = createDrawerNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen,
    page1: FirstPage,
  },
  {
    hideStatusBar: true,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: '#6b52ae',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
  },
);

export default createAppContainer(DrawerNavigator);
