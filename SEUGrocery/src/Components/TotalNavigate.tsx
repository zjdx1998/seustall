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
  DrawerItems,
  DrawerNavigator,
} from 'react-navigation';
import {Text} from 'react-native-elements';
import {ScrollView, SafeAreaView, StyleSheet, Image, View} from 'react-native';
import detailPage from '../pages/detailPage';
import StartPage from '../pages/StartPage';
import * as SP from '../Common/ScreenProperty';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SignInUI from '../pages/SignInUI';
import MyGroceryPage from '../pages/MyGroceryPage';
import WhatIBoughtPage from '../pages/WhatIBoughtPage';
import WhatIWantPage from '../pages/WhatIWantPage';
import ReleaseGoodInformation from '../pages/ReleaseGoodInformation';
import ReleaseIWantPage from '../pages/ReleaseIWantPage';
import ReleaseUserInformationPage from '../pages/ReleaseUserInformationPage';
import PostPhotos from './PostPhotos';
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
        <TouchableOpacity
          onPress={() => props.navigation.navigate('release_info')}>
          <Text style={styles.roleInfoNameText}>韩愈</Text>
          <Text style={styles.roleInfoText}>"我是韩愈。"</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.menuBaseContainer}>
      <TouchableOpacity
        style={[
          styles.menuSingleContainer,
          {
            backgroundColor: that.state.currentIndex === 1 ? '#fff' : '#CC6699',
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
        <Text
          style={[
            styles.menuTitleStyle,
            {color: that.state.currentIndex === 1 ? '#CC6699' : '#fff'},
            {
              marginHorizontal:
                that.state.currentIndex === 1 ? SP.WB(10) : SP.WB(3),
            },
          ]}>
          首页
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuSingleContainer,
          {
            backgroundColor: that.state.currentIndex === 2 ? '#fff' : '#CC6699',
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
        <Text
          style={[
            styles.menuTitleStyle,
            {color: that.state.currentIndex === 2 ? '#CC6699' : '#fff'},
            {
              marginHorizontal:
                that.state.currentIndex === 2 ? SP.WB(10) : SP.WB(3),
            },
          ]}>
          我的铺子
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuSingleContainer,
          {
            backgroundColor: that.state.currentIndex === 3 ? '#fff' : '#CC6699',
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
        <Text
          style={[
            styles.menuTitleStyle,
            {color: that.state.currentIndex === 3 ? '#CC6699' : '#fff'},
            {
              marginHorizontal:
                that.state.currentIndex === 3 ? SP.WB(10) : SP.WB(3),
            },
          ]}>
          我买到的
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.menuSingleContainer,
          {
            backgroundColor: that.state.currentIndex === 4 ? '#fff' : '#CC6699',
          },
        ]}
        onPress={() => {
          props.navigation.closeDrawer();
          props.navigation.navigate('page3', {
            go_back_key: props.navigation.state.key,
          });
          that.setState({currentIndex: 4});
        }}>
        <Text
          style={[
            styles.menuTitleStyle,
            {color: that.state.currentIndex === 4 ? '#CC6699' : '#fff'},
            {
              marginHorizontal:
                that.state.currentIndex === 4 ? SP.WB(10) : SP.WB(3),
            },
          ]}>
          我想买的
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuSingleContainer,
          {
            backgroundColor: that.state.currentIndex === 5 ? '#fff' : '#CC6699',
          },
        ]}
        onPress={() => {
          props.navigation.closeDrawer();
          props.navigation.navigate('page4', {
            go_back_key: props.navigation.state.key,
          });
          that.setState({currentIndex: 5});
        }}>
        <Text
          style={[
            styles.menuTitleStyle,
            {color: that.state.currentIndex === 5 ? '#CC6699' : '#fff'},
            {
              marginHorizontal:
                that.state.currentIndex === 5 ? SP.WB(10) : SP.WB(3),
            },
          ]}>
          收藏夹
        </Text>
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
      screen: WhatIBoughtPage,
      navigationOptions: {
        drawerLabel: '我想买的',
      },
    },
    page4: {
      screen: WhatIWantPage,
      navigationOptions: {
        drawerLabel: '收藏夹',
      },
    },
    release_good: {
      screen: ReleaseGoodInformation,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    release_want: {
      screen: ReleaseIWantPage,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    release_info: {
      screen: ReleaseUserInformationPage,
      navigationOptions: {
        drawerLabel: () => null,
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
    loginP: {
      screen: SignInUI,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    postPhoto: {
      screen: PostPhotos,
      navigationOptions: {
        drawerlabel: () => null,
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
      'loginP',
      'release_good',
      'release_want',
      'release_info',
      'postPhoto',
    ],
    initialRouteName: 'startP',
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
    backgroundColor: 'white',
  },
  roleBaseContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: SP.HB(5),
    backgroundColor: '#cc6699',
    marginBottom: SP.HB(0.5),
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
    borderRadius: SP.HB(1),
    marginVertical: SP.HB(1),
    // borderTopWidth: SP.HB(1),
    // borderBottomWidth: SP.HB(1),
    // borderBottomColor: '#CC6699',
    // borderTopColor: '#CC6699',
  },
  menuTitleStyle: {
    fontSize: 24,
    margin: SP.WB(3),
  },
});
