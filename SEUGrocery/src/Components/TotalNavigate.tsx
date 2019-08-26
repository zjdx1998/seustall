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
// import {View, StatusBar, TouchableOpacity, Text} from 'react-native';
// import ScalingDrawer from 'react-native-scaling-drawer';
// import LeftMenu from './LeftMenu';
// import {
//   createNavigator,
//   createNavigationContainer,
//   StackRouter,
//   addNavigationHelpers,
// } from 'react-navigation';
//
// let defaultScalingDrawerConfig = {
//   scalingFactor: 0.6,
//   minimizeFactor: 0.6,
//   swipeOffset: 20,
// };
//
// class CustomDrawerView extends Component {
//   constructor(props) {
//     super(props);
//   }
//
//   componentWillReceiveProps(nextProps) {
//     /** Active Drawer Swipe **/
//     if (nextProps.navigation.state.index === 0) {
//       this._drawer.blockSwipeAbleDrawer(false);
//     }
//
//     if (
//       nextProps.navigation.state.index === 0 &&
//       this.props.navigation.state.index === 0
//     ) {
//       this._drawer.blockSwipeAbleDrawer(false);
//       this._drawer.close();
//     }
//
//     /** Block Drawer Swipe **/
//     if (nextProps.navigation.state.index > 0) {
//       this._drawer.blockSwipeAbleDrawer(true);
//     }
//   }
//
//   setDynamicDrawerValue = (type, value) => {
//     defaultScalingDrawerConfig[type] = value;
//     /** forceUpdate show drawer dynamic scaling example **/
//     this.forceUpdate();
//   };
//
//   render() {
//     const {routes, index} = this.props.navigation.state;
//     const ActiveScreen = this.props.router.getComponentForState(
//       this.props.navigation.state,
//     );
//
//     return (
//       <ScalingDrawer
//         ref={ref => (this._drawer = ref)}
//         content={<LeftMenu navigation={this.props.navigation} />}
//         {...defaultScalingDrawerConfig}
//         onClose={() => console.log('close')}
//         onOpen={() => console.log('open')}>
//         <ActiveScreen
//           navigation={addNavigationHelpers({
//             ...this.props.navigation,
//             state: routes[index],
//             openDrawer: () => this._drawer.open(),
//           })}
//           dynamicDrawerValue={(type, val) =>
//             this.setDynamicDrawerValue(type, val)
//           }
//         />
//       </ScalingDrawer>
//     );
//   }
// }
//
// const AppNavigator = StackRouter(
//   {
//     home: {
//       screen: MainPages,
//       navigationOptions: {
//         drawerLabel: '首页',
//       },
//     },
//     page1: {
//       screen: FirstPage,
//       navigationOptions: {
//         drawerLabel: '我的铺子',
//       },
//     },
//     page2: {
//       screen: FirstPage,
//       navigationOptions: {
//         drawerLabel: '我买到的',
//       },
//     },
//     page3: {
//       screen: FirstPage,
//       navigationOptions: {
//         drawerLabel: '我想买的',
//       },
//     },
//     page4: {
//       screen: FirstPage,
//       navigationOptions: {
//         drawerLabel: '收藏夹',
//       },
//     },
//     detailPage: {
//       screen: detailPage,
//       navigationOptions: {
//         drawerLabel: () => null,
//       },
//     },
//     startP: {
//       screen: StartPage,
//       navigationOptions: {
//         drawerLabel: () => null,
//       },
//     },
//   },
//   {
//     order: ['home', 'detailPage', 'page1', 'page2', 'page3', 'page4', 'startP'],
//     initialRouteName: 'home',
//   },
// );
//
// const AppTotalNavigation = createNavigationContainer(
//   createNavigator(CustomDrawerView, AppNavigator),
// );
//
// export default class extends Component {
//   render() {
//     return <AppTotalNavigation />;
//   }
// }
