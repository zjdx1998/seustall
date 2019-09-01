// /*
//   @version: 0.3
//   @author: 71117123张建东
//   @date: 2019-8-22
// */
import React, {Component} from 'react';
import MainPages from '../pages/MainPages';
import {
  createAppContainer,
  createDrawerNavigator,
  DrawerItems, DrawerNavigator,
} from 'react-navigation';
import FirstPage from '../pages/FirstPage';
import {Text} from 'react-native-elements';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Alert,
} from 'react-native';
import detailPage from '../pages/detailPage';
import StartPage from '../pages/StartPage';
import * as SP from '../Common/ScreenProperty';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SignInUI from '../pages/SignInUI';
import MyGroceryPage from '../pages/MyGroceryPage';
import WhatIBoughtPage from '../pages/WhatIBoughtPage';
// const customComponent = props => (
//   <ScrollView style={{backgroundColor: '#FFE4E1', flex: 1}}>
//     <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
//       <DrawerItems {...props} />
//     </SafeAreaView>
//   </ScrollView>
// );

const customComponents = props => (
  <View style={styles.baseContainer}>
    <View style={styles.roleBaseContainer}>
      <View style={styles.roleAvatorContainer}>
        <Image
          style={{
            width: SP.WB(23),
            height: SP.WB(23),
            borderRadius: SP.WB(26),
          }}
          source={{
            uri:
              'http://img5.duitang.com/uploads/item/201512/18/20151218165511_AQW4B.jpeg',
          }}
        />
      </View>
      <View style={styles.roleInfoContainer}>
        <Text style={styles.roleInfoNameText}>韩愈</Text>
        <Text style={styles.roleInfoText}>
          "我是韩愈，我最牛皮，球衣有我牛皮吗？"
        </Text>
      </View>
    </View>
    <View style={styles.menuBaseContainer}>
      <TouchableOpacity
        style={[
          styles.menuSingleContainer,
          {
            backgroundColor:
              that.state.currentIndex === 1 ? '#a52a7c' : '#249aa3',
          },
        ]}
        onPress={() => {
          // if (that.state.currentIndex === 1) {
          //   props.navigation.closeDrawer();
          // } else {
          //   props.navigation.navigate('home');
          // }

          props.navigation.closeDrawer();
          props.navigation.navigate('home', {
            go_back_key: props.navigation.state.key,
          });
          that.setState({currentIndex: 1});
        }}>
        <Text style={styles.menuTitleStyle}>首页</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuSingleContainer,
          {
            backgroundColor:
              that.state.currentIndex === 2 ? '#a52a7c' : '#249aa3',
          },
        ]}
        onPress={() => {
          // if (that.state.currentIndex === 2) {
          //   props.navigation.closeDrawer();
          // } else {
          //   props.navigation.navigate('page1');
          // }
          props.navigation.closeDrawer();
          props.navigation.navigate('page1', {
            go_back_key: props.navigation.state.key,
          });
          that.setState({currentIndex: 2});
        }}>
        <Text style={styles.menuTitleStyle}>我的铺子</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuSingleContainer,
          {
            backgroundColor:
              that.state.currentIndex === 3 ? '#a52a7c' : '#249aa3',
          },
        ]}
        onPress={() => {
          // if (that.state.currentIndex === 3) {
          //   props.navigation.closeDrawer();
          // } else {
          //   props.navigation.navigate('page2');
          // }
          props.navigation.closeDrawer();
          props.navigation.navigate('page2', {
            go_back_key: props.navigation.state.key,
          });
          that.setState({currentIndex: 3});
          // props.navigation.navigate('firstPage', {
          //   title: 'Home',
          //   jumpHomeCallBack: index => {
          //     this.setState({currentIndex: index});
          //   },
          // });
        }}>
        <Text style={styles.menuTitleStyle}>我买到的</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const TotalNav = createDrawerNavigator(
  {
    signin: {
      screen: SignInUI,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    home: {
      screen: MainPages,
      navigationOptions: {
        drawerLabel: '首页',
      },
    },
    page1: {
      screen: MyGroceryPage,
      navigationOptions: {
        drawerLabel: '我的铺子',
      },
    },
    page2: {
      screen: WhatIBoughtPage,
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
    order: [
      'home',
      'signin',
      'detailPage',
      'page1',
      'page2',
      'page3',
      'page4',
      'startP',
    ],
    initialRouteName: 'home',
    backBehavior: 'initialRoute',
    // initialRouteParams: {
    //   jumpHomeCallBack: index => {
    //     this.setState({currentIndex: index});
    //   },
    // },
    drawerLockMode: 'unlocked',
    drawerWidth: SP.WB(70),
    drawerPosition: 'left',
    drawerBackgroundColor: 'transparent',
    overlayColor: 'transparent',
    contentComponent: customComponents,
  },
);

const AppNavigation = createAppContainer(TotalNav);
let that;
export default class AppTotalNavigation extends Component {
  public state: {currentIndex: number};
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 1,
    };
    that = this;
  }

  render() {
    return <AppNavigation />;
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  roleBaseContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: SP.HB(5),
    backgroundColor: '#cc6699',
  },
  roleAvatorContainer: {
    flex: 1,
    marginHorizontal: SP.WB(5),
  },
  roleInfoContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: SP.HB(1),
  },
  roleInfoNameText: {
    fontSize: 30,
    color: '#fff',
    marginBottom: SP.HB(2),
  },
  roleInfoText: {
    fontSize: 18,
    color: '#fff',
    fontStyle: 'italic',
    paddingRight: SP.WB(2),
  },
  menuBaseContainer: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#CC6699',
  },
  menuSingleContainer: {
    borderBottomWidth: SP.HB(0.1),
    borderBottomColor: '#fff',
  },
  menuTitleStyle: {
    fontSize: 24,
    color: '#fff',
    marginLeft: SP.WB(3),
  },
});
