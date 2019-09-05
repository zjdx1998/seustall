/*
  @version: 0.1
  @author: 71117133 张睦婕
  @date: 2019-8-30
*/
import React, { Component } from 'react';
import { StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    StatusBar,
    TextInput } from 'react-native';
// import { NavigationEvents } from "react-navigation";
import * as DataBase from '../Common/DataBase';
import {Icon} from "react-native-elements";

export default class Search extends Component {
    private state: any;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            searchVal: "",// 搜索文字
            hasData: false,// 删除确认弹框
            searchHistory: [],// 搜索历史数组
            hotTagsArr: [],// 热门搜索标签数组
        }
    }
    componentDidMount() {

        // 获取热门搜索标签
        this.setState({
            isLoading: true,
        })
    }
    //获取历史记录
    getHistory() {
        // 查询本地历史
        DataBase.getItem("searchHistory").then(data => {
            if (data == null) {
                this.setState({
                    searchHistory: [],
                })
            } else {
                this.setState({
                    searchHistory: data,
                })
            }
        })
    }
    // 保存搜索标签
    insertSearch(text) {
        if (this.state.searchHistory.indexOf(text) != -1) {
            // 本地历史 已有 搜索内容
            let index = this.state.searchHistory.indexOf(text);
            let tempArr = DataBase.arrDelete(this.state.searchHistory, index)
            tempArr.unshift(text);
            DataBase.setItem("searchHistory", tempArr);
        } else {
            // 本地历史 无 搜索内容
            let tempArr = this.state.searchHistory;
            tempArr.unshift(text);
            DataBase.setItem("searchHistory", tempArr);
        }
    }
    render() {
        // const { navigate, goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                {/* 监听页面 刷新搜索本地历史 */}
                {/*<NavigationEvents*/}
                {/*    onWillFocus={() => {*/}
                {/*        // 查询本地搜索历史*/}
                {/*        this.getHistory();*/}
                {/*    }}*/}
                {/*/>*/}
                <StatusBar
                    animated={true}//是否动画
                    hidden={false}//是否隐藏
                    backgroundColor={'#000'}//android 设置状态栏背景颜色
                    translucent={false}//android 设置状态栏是否为透明
                    showHideTransition="fade"//IOS状态栏改变时动画 fade:默认 slide
                    networkActivityIndicatorVisible={this.state.isLoading}//IOS设定网络活动指示器(就是那个菊花)是否显示在状态栏。
                    statusBarStyle={"default"}//状态栏样式 default	默认（IOS为白底黑字、Android为黑底白字）
                    barStyle={"default"}// 状态栏文本的颜色。
                />
                <View style={styles.headContent}>
                    <View style={styles.searchInp}>
                        {/*<Image style={styles.searchInpIcon} source={require('../../images/search.png')} />*/}
                        <Icon  name={'search1'}/>
                        <TextInput
                            style={styles.TextInput}
                            returnKeyType={"search"}// 键盘确定按钮类型 done/go/next/search/send
                            placeholder="请输入要搜索的内容"
                            placeholderTextColor="#999"
                            keyboardType="default"
                            onSubmitEditing={() => {
                                // 保存搜索内容
                                this.insertSearch(this.state.searchVal);
                                // 跳转到搜索结果页，并传搜索内容searchText
                                // navigate("SearchResult", { "searchText": this.state.searchVal })
                            }}// 确定事件
                            defaultValue={this.state.searchVal}
                            onChangeText={(text) => {
                                this.setState({
                                    searchVal: text
                                })
                            }}
                            autoFocus={true}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            // goBack();
                        }}
                        activeOpacity={.8}
                        style={styles.cancleClick}
                    >
                        <Text style={styles.cancleBtn}>取消</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.searchMain}>
                        <View style={styles.searchMake}>
                            <Text style={styles.searchMainTits}>最近搜索</Text>
                            {/* 删除本地搜索历史按钮 */}
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    // 判断是否有本地搜索历史
                                    if (this.state.searchHistory.length > 0) {
                                        this.setState({
                                            hasData: true,
                                        })
                                    }
                                }}
                            >
                                <Icon name={'delete'} type={'antdesign'}/>
                                {/*<Image source={require('../../images/searchDelete.png')} />*/}
                            </TouchableOpacity>
                        </View>
                        {
                            this.state.searchHistory.length > 0 ?
                                <View style={styles.searchMainLabel}>
                                    {this.state.searchHistory.map((item, index) => {
                                        if (index > 9) {
                                            return null
                                        } else {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({
                                                            searchVal: item,
                                                        })
                                                        // 保存搜索内容
                                                        this.insertSearch(item);
                                                        // navigate("SearchResult", { "searchText": item })
                                                    }}
                                                    activeOpacity={.8}
                                                    style={styles.searchLabelBox}
                                                    key={index}>
                                                    <Text numberOfLines={1} style={styles.searchLabelText}>{item}</Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                    })
                                    }
                                </View>
                                : <View style={styles.noData}>
                                    <Text style={styles.noDataTxt}>暂无搜索历史</Text>
                                </View>
                        }
                        <Text style={styles.searchMainTit}>热门搜索</Text>
                        <View style={styles.searchMainLabel}>
                            {/* 热门搜索标签渲染 */}
                            {this.state.hotTagsArr.map((item, i) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        style={styles.searchLabelBox}
                                        key={i}
                                        onPress={() => {
                                            this.setState({
                                                searchVal: item.name,
                                            })
                                            // 保存搜索内容
                                            this.insertSearch(item.name);
                                            // navigate("SearchResult", { "label": item })
                                        }}
                                    >
                                        <Text style={styles.searchLabelText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
                {/* 删除历史记录确认弹框 */}
                {/*<Confirm visible={this.state.hasData}*/}
                {/*         text="确定删除全部搜索历史吗？"*/}
                {/*         yesClick={() => {*/}
                {/*             this.setState({*/}
                {/*                 searchVal: '',*/}
                {/*                 searchHistory: [],*/}
                {/*                 hasData: false,*/}
                {/*             })*/}
                {/*             DataBase.removeItem("searchHistory");*/}
                {/*         }}*/}
                {/*         noClick={() => {*/}
                {/*             this.setState({*/}
                {/*                 hasData: false*/}
                {/*             })*/}
                {/*         }}*/}
                {/*/>*/}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    // 头部搜索框
    headContent: {
        backgroundColor: 'white',
        paddingTop: 100,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 100,
        borderBottomColor: '#ECECEC'
    },
    searchInp: {
        width: 304,
        height: 30,
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: 'grey',
        marginLeft: 16,
    },
    searchInpIcon: {
        width: 14,
        height: 15,
        marginLeft: 16,
        marginRight: 8
    },
    TextInput: {
        flex: 1,
        height: 30,
        fontSize: 14,
        padding: 0,
    },
    cancleClick: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancleBtn: {
        fontSize: 14,
        color: '#666',
        lineHeight: 44,
    },
    // 搜索标签内容盒子
    searchMain: {
        paddingLeft: 16,
        paddingRight: 16
    },
    searchMainTit: {
        fontSize: 14,
        color: '#888',
        marginTop: 16,
    },
    searchMainTits: {
        fontSize: 14,
        color: '#888',
    },
    // 最近搜索
    noData: {
        height: 55,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16
    },
    noDataTxt: {
        fontSize: 15,
        color: '#666',
        lineHeight: 21
    },
    searchMake: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 16,
    },
    // 热门搜索
    searchMainLabel: {
        flexDirection: "row",
        flexWrap: 'wrap',
        maxHeight: 210,
        overflow: 'hidden',
    },
    searchLabelBox: {
        borderRadius: 2,
        backgroundColor: 'gray',
        marginRight: 10,
        marginTop: 10,
        height: 32,
        justifyContent: 'center',
    },
    searchLabelText: {
        fontSize: 15,
        color: '#666',
        paddingLeft: 18,
        paddingRight: 18,
    },
});
