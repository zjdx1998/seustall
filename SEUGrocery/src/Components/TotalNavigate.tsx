// /*
//   @version: 0.9
//   @author: 71117123张建东
//   @date: 2019-8-22
// */
import React, {Component} from 'react';
import MainPages from '../pages/MainPages';
import {createAppContainer, createDrawerNavigator} from 'react-navigation';
import {Text} from 'react-native-elements';
import {StyleSheet, Image, View} from 'react-native';
import detailPage from '../pages/detailPage';
import StartPage from '../pages/StartPage';
import * as SP from '../Common/ScreenProperty';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SignInUI from '../pages/SignInUI';
import SignUpUI from '../pages/SignUpUI';
import MyGroceryPage from '../pages/MyGroceryPage';
import WhatIBoughtPage from '../pages/WhatIBoughtPage';
import WhatIWantPage from '../pages/WhatIWantPage';
import ReleaseGoodInformation from '../pages/ReleaseGoodInformation';
import ReleaseIWantPage from '../pages/ReleaseIWantPage';
import ReleaseUserInformationPage from '../pages/ReleaseUserInformationPage';
import PostPhotos from './PostPhotos';
import FavoritesPage from "../pages/FavoritesPage";
import ChatPage from "../pages/ChatPage";
import Search from "../pages/Search";
import UserInformationPage from "../pages/UserInformationPage";
import AfterSignUpPage from '../pages/AfterSignUpPage';
import IDVerifyPage from '../pages/IDVerifyPage';
import ClassificationPage from '../pages/ClassificationPage';
import SearchGoodsPage from "../pages/SearchGoodsPage";
import NoticesPage from "../pages/NoticesPage";
import SearchUsersPage from "../pages/searchUsersPage";
import UserInfo from '../Common/UserInfo';
import ShowUserInfoPage from "../pages/ShowUserInfoPage";
import OrderCenterPage from "../pages/OrderCenterPage";
import IWantDetailPage from "../pages/IWantDetailPage";

// const customComponent = props => (
//   <ScrollView style={{backgroundColor: '#FFE4E1', flex: 1}}>
//     <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
//       <DrawerItems {...props} />
//     </SafeAreaView>
//   </ScrollView>
// );

var username = '';
var info = '';
var avatarurl = '';
UserInfo.get('username').then(data=>{username = data});
UserInfo.get('info').then(data=>{info = data});
UserInfo.get('avatarurl').then(data=>{avatarurl = data});



const customComponents = props => (
    <View style={styles.baseContainer}>
        <View style={styles.roleBaseContainer}>
            <TouchableOpacity
                style={styles.roleAvatorContainer}
                onPress={() =>props.navigation.navigate('userInformation')}>
                <Image
                    style={{
                        width: SP.WB(23),
                        height: SP.WB(23),
                        borderRadius: SP.WB(26),
                    }}
                    source={{
                        uri:
                           avatarurl,
                    }}
                />
            </TouchableOpacity>
            <View style={styles.roleInfoContainer}>
                <TouchableOpacity
                    onPress={() =>props.navigation.navigate('userInformation')}>
                    <Text style={styles.roleInfoNameText}>{username}</Text>
                    <Text style={styles.roleInfoText}>{info}</Text>
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
                        refresh: () => {
                            that.setState({currentIndex: 1});
                        },
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
                        refresh: function() {
                            that.setState({currentIndex: 1});
                        },
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
                        refresh: () => {
                            that.setState({currentIndex: 1});
                        },
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
                        refresh: () => {
                            that.setState({currentIndex: 1});
                        },
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
                    props.navigation.navigate('page5', {
                        go_back_key: props.navigation.state.key,
                        refresh: () => {
                            that.setState({currentIndex: 1});
                        },
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
                    消息中心
                </Text>
            </TouchableOpacity>

             <TouchableOpacity
                style={[
                    styles.menuSingleContainer,
                    {
                        backgroundColor: that.state.currentIndex === 6 ? '#fff' : '#CC6699',
                    },
                ]}
                onPress={() => {
                    props.navigation.closeDrawer();
                    props.navigation.navigate('page6', {
                        go_back_key: props.navigation.state.key,
                        refresh: () => {
                            that.setState({currentIndex: 1});
                        },
                    });
                    that.setState({currentIndex: 6});
                }}>
                <Text
                    style={[
                        styles.menuTitleStyle,
                        {color: that.state.currentIndex === 6 ? '#CC6699' : '#fff'},
                        {
                            marginHorizontal:
                                that.state.currentIndex === 6 ? SP.WB(10) : SP.WB(3),
                        },
                    ]}>
                    订单中心
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.menuSingleContainer,
                    {
                        backgroundColor: that.state.currentIndex === 7 ? '#fff' : '#CC6699',
                    },
                ]}
                onPress={() => {
                    props.navigation.closeDrawer();
                    props.navigation.navigate('page4', {
                        go_back_key: props.navigation.state.key,
                        refresh: () => {
                            that.setState({currentIndex: 1});
                        },
                    });
                    that.setState({currentIndex: 7});
                }}>
                <Text
                    style={[
                        styles.menuTitleStyle,
                        {color: that.state.currentIndex === 7 ? '#CC6699' : '#fff'},
                        {
                            marginHorizontal:
                                that.state.currentIndex === 7 ? SP.WB(10) : SP.WB(3),
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
            screen: WhatIWantPage,
            navigationOptions: {
                drawerLabel: '我想买的',
            },
        },
        page4: {
            screen: FavoritesPage,
            navigationOptions: {
                drawerLabel: '收藏夹',
            },
        },
        page5: {
            screen: NoticesPage,
            navigationOptions: {
                drawerLabel: '消息中心',
            },
        },
        page6: {
            screen: OrderCenterPage,
            navigationOptions: {
                drawerLabel: '订单中心',
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
        signUpP: {
            screen: SignUpUI,
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
        afterSignUp: {
            screen: AfterSignUpPage,
            navigationOptions: {
                drawerlabel: () => null,
            },
        },
        verifyP: {
            screen: IDVerifyPage,
            navigationOptions: {
                drawerlabel: () => null,
            },
        },
        classificationP: {
            screen: ClassificationPage,
            navigationOptions: {
                drawerlabel: () => null,
            },
        },
        chatP: {
            screen: ChatPage,
            navigationOptions: {
                drawerlabel: () => null,
            },
        },
        searchP: {
            screen: Search,
            navigationOptions: {
                drawerlabel: () => null,
            },
        },
        searchGP: {
            screen: SearchGoodsPage,
            navigationOptions: {
                drawerlabel: () => null,
            },
        },
        searchUP: {
            screen: SearchUsersPage,
            navigationOptions: {
                drawerlabel: () => null,
            },
        },
        userInformation: {
            screen: UserInformationPage,
            navigationOptions: {
                drawerlabel: () => null,
            },
        },
        showUser: {
            screen: ShowUserInfoPage,
            navigationOptions: {
                drawerlabel: () => null,
            },
        },
        wantDetailP: {
            screen: IWantDetailPage,
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
            'page5',
            'page6',
            'startP',
            'loginP',
            'signUpP',
            'afterSignUp',
            'release_good',
            'release_want',
            'release_info',
            'postPhoto',
            'verifyP',
            'chatP',
            'searchP',
            'searchGP',
             'searchUP',
            'userInformation',
            'classificationP',
            'showUser',
            'wantDetailP',
        ],
        initialRouteName: 'startP',
        backBehavior: 'home',
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
