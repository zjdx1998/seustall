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
} from 'react-navigation';
import FirstPage from '../pages/FirstPage';
import {Text} from 'react-native-elements';
import {ScrollView, SafeAreaView, StyleSheet, Image} from 'react-native';
import detailPage from '../pages/detailPage';
import StartPage from '../pages/StartPage';
import * as SP from '../Common/ScreenProperty';
import {TouchableOpacity} from 'react-native-gesture-handler';

const customComponent = props => (
  <ScrollView style={{backgroundColor: '#FFE4E1', flex: 1}}>
    <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

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
    initialRouteName: 'startP',
    initialRouteParams: {
      jumpHomeCallBack: index => {
        this.setState({currentIndex: index});
      },
    },
    drawerLockMode: 'unlocked',
    drawerPosition: 'left',
    contentComponent: customComponent,
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

// const customComponents = props => (
//   <View style={styles.baseContainer}>
//     <View style={styles.roleBaseContainer}>
//       <View style={styles.roleAvatorContainer}>
//         <Image
//           style={{width: SP.WB(1), height: SP.WB(1), borderRadius: SP.WB(1.5)}}
//         />
//         source=
//         {{
//           uri:
//             'http://img5.duitang.com/uploads/item/201512/18/20151218165511_AQW4B.jpeg',
//         }}
//         />
//       </View>
//       <View style={styles.roleInfoContainer}>
//         <Text style={styles.roleInfoNameText}>SEU</Text>
//         <Text style={styles.roleInfoText}>"测试成功"</Text>
//       </View>
//     </View>
//     <View style={styles.menuBaseContainer}>
//       <TouchableOpacity
//         style={styles.menuSingleContainer}
//         onPress={() => {
//           this.setState({currentIndex: 1});
//           props.navigation.navigate('home', {
//             title: '跳转首页',
//             jumpHomeCallBack: index => {
//               this.setState({currentIndex: index});
//             },
//           });
//         }}>
//         <View>
//           <Text style={styles.roleInfoText}>首页</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   </View>
// );

// const styles = StyleSheet.create({
//   baseContainer: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   },
//   roleBaseContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     paddingTop: SP.HB(5),
//   },
//   roleAvatorContainer: {
//     flex: 1,
//     marginHorizontal: SP.WB(5),
//   },
//   roleInfoContainer: {
//     flex: 2,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   roleInfoNameText: {
//     fontSize: 18,
//     color: '#ffffff',
//     marginBottom: SP.HB(2),
//   },
//   roleInfoText: {
//     fontSize: 12,
//     color: '#d4d2d9',
//     fontStyle: 'italic',
//     paddingRight: SP.WB(2),
//   },
//   menuBaseContainer: {
//     flex: 3,
//     flexDirection: 'column',
//     backgroundColor: '#249aa3',
//   },
//   menuSingleContainer: {
//     borderBottomWidth: SP.WB(5),
//     borderBottomColor: '#fff',
//     backgroundColor: this.state.currentIndex === 1 ? '#a52a7c' : '#249aa3',
//   },
// });
