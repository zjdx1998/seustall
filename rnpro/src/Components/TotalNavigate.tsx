import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import FirstPage from '../pages/FirstPage';
import MainPages from '../pages/MainPages';

let drawerWidth = Dimensions.get('window').width;

const CustomDrawerNavigation = props => (
  <View
    style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
    {/*row1*/}
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 30,
        backgroundColor: '#e76482',
      }}>
      <View style={{flex: 1, marginHorizontal: 15, justifyContent: 'center'}}>
        <Image
          style={{width: 80, height: 80, borderRadius: 90}}
          source={{
            uri:
              'http://img5.duitang.com/uploads/item/201512/18/20151218165511_AQW4B.jpeg',
          }}
        />
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, color: '#ffffff', marginBottom: 5}}>
          稳重的西红柿
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: '#d4d2d9',
            fontStyle: 'italic',
            paddingRight: 5,
          }}>
          人生没有什么烦恼是一个西红解决不了的！如果有那就是两个...
        </Text>
      </View>
    </View>
    {/*row2*/}
    <View
      style={{
        flex: 3,
        flexDirection: 'column',
        backgroundColor: '#249aa3',
      }}>
      <TouchableOpacity
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: '#fff',
          backgroundColor:
            that.state.currentIndex === 1 ? '#a52a7c' : '#249aa3',
        }}
        onPress={() => {
          that.setState({currentIndex: 1});
          props.navigation.navigate('home', {
            title: '跳转首页',
            jumpHomeCallBack: index => {
              that.setState({currentIndex: index});
            },
          });
        }}>
        <View>
          <Text style={{fontSize: 18, color: '#fff', paddingVertical: 15}}>
            首页
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: '#fff',
          backgroundColor:
            that.state.currentIndex === 2 ? '#a52a7c' : '#249aa3',
        }}
        onPress={() => {
          that.setState({currentIndex: 2});
          props.navigation.navigate('licai', {
            title: '跳转理财',
            jumpLicaiCallBack: index => {
              that.setState({currentIndex: index});
            },
          });
        }}>
        <View>
          <Text style={{fontSize: 18, color: '#fff', paddingVertical: 15}}>
            理财
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: '#fff',
          backgroundColor:
            that.state.currentIndex === 3 ? '#a52a7c' : '#249aa3',
        }}
        onPress={() => {
          that.setState({currentIndex: 3});
          props.navigation.navigate('wallet', {
            title: '跳转钱包',
            jumpWalletCallBack: index => {
              that.setState({currentIndex: index});
            },
          });
        }}>
        <View>
          <Text style={{fontSize: 18, color: '#fff', paddingVertical: 15}}>
            钱包
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: '#fff',
          backgroundColor:
            that.state.currentIndex === 4 ? '#a52a7c' : '#249aa3',
        }}
        onPress={() => {
          that.setState({currentIndex: 4});
          props.navigation.navigate('setting', {
            title: '跳转设置',
            jumpSettingCallBack: index => {
              that.setState({currentIndex: index});
            },
          });
        }}>
        <View>
          <Text style={{fontSize: 18, color: '#fff', paddingVertical: 15}}>
            设置
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: '#fff',
          backgroundColor:
            that.state.currentIndex === 4 ? '#a52a7c' : '#249aa3',
        }}
        onPress={() => {
          that.setState({currentIndex: 5});
          props.navigation.navigate('stack', {
            title: '跳转嵌套StackNavigation',
            jumpSettingCallBack: (index: any) => {
              that.setState({currentIndex: index});
            },
          });
        }}>
        <View>
          <Text style={{fontSize: 18, color: '#fff', paddingVertical: 15}}>
            嵌套StackNavigation使用
          </Text>
        </View>
      </TouchableOpacity>
    </View>
    {/*row3*/}
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: 20,
        paddingRight: 10,
        backgroundColor: '#3cb0f8',
      }}>
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <Image
            style={{width: 20, height: 20, marginBottom: 2}}
            source={require('../../images/close.png')}
          />
          <Text style={{color: '#fff', fontSize: 18, marginLeft: 8}}>注销</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);




const DrawerNavigation = createDrawerNavigator(
  // RouterConfigs
  {
    home: {
      screen: MainPages,
    },
    page1: {
      screen: FirstPage,
    },
  },
  //NavigationConfigs
  {
    /**
     * routeNames数组，用于定义抽屉项目的顺序。
     */
    order: ['home', 'page1'],
    /**
     * 初始路由的routeName。
     */
    initialRouteName: 'home',
    /**
     * 初始化路由的参数
     */
    initialRouteParams: {
      jumpHomeCallBack: index => {
        that.setState({currentIndex: index});
      },
    },
    /**
     * 设置是否响应手势
     * 'unlocked'   可以通过手势和代码 打开关闭抽屉
     * 'locked-closed' 抽屉关闭状态  不能通过手势打开  只能通过代码实现
     * 'locked-open'  抽屉打开状态  不能通过手势关闭  只能通过代码实现
     */
    drawerLockMode: 'unlocked',
    drawerWidth: drawerWidth * 0.7, //设置抽屉策划页面宽度
    drawerPosition: 'left', //选项是left或right。默认是left位置。
    useNativeAnimations: true, //启用原生动画。默认是true。
    // drawerBackgroundColor: '#c85e25',      //设置抽屉页面背景颜色（默认是white）
    contentComponent: CustomDrawerNavigation, //自定义抽屉导航布局
    /**
     * contentOptions 配置抽屉内容  items相关（如果contentComponent不为空则失效）
     */
    // contentOptions: {
    //     items: [OtherScreen],//可以修改或覆盖路由数组  不知道干嘛用的
    //     activeItemKey: 'AppInfo', //识别活动路线的关键  也不知道干嘛用的
    //     activeBackgroundColor: 'blue',  //选中item背景颜色
    //     activeTintColor: '#bc933b',       //选中item内标签文字和图标颜色
    //     inactiveBackgroundColor: 'red', //非选中item背景颜色
    //     inactiveTintColor: 'black',     //非选中item内标签文字和图标颜色
    //     //按下项目时要调用的函数 不知道是否使用错误 一直没反应github上面有答案 在自定义视图的时候 会有用
    //     onItemPress(route) {
    //         console.log('onItemPress'+route);
    //     },
    //     itemsContainerStyle: '', //内容部分的样式对象
    //     itemStyle: '', //单个项目的样式对象，可以包含图标和 / 或标签
    //     labelStyle: '', //Text当标签是字符串时，样式对象在内容部分内覆盖样式
    //     activeLabelStyle: '', //Text当标签是字符串（与之合并labelStyle）时，样式对象覆盖活动标签的样式
    //     inactiveLabelStyle: '', //Text当标签是字符串（与之合并labelStyle）时，样式对象覆盖非活动标签的样式
    //     iconContainerStyle: '', //样式对象以覆盖View图标容器样式。
    // },
  },
);
