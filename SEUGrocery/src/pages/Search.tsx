/*
  @version: 0.2
  @author: 71117133 张睦婕
  @date: 2019-9-5
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
import * as DataBase from '../Common/DataBase';
import {Icon,Header,SearchBar} from "react-native-elements";
import * as SP from '../Common/ScreenProperty';

export default class Search extends Component {
    private state: any;
    private props: any;
    constructor(props) {
        super(props);
        this.state = {
            searchVal: "",// 搜索文字
            searchHistory: [],// 搜索历史数组
            searchFor:'good',
            sgbc:'#fff',
            subc:'#cc6699',
            sgs:10,
            sus:0,
            sgtc:'#cc6699',
            sutc:'#fff',
        }
    }
    changeSearchGoal=(index)=>{
        if(index==1){
            this.setState({
                  searchFor:'good',
                sgbc:'#fff',
                subc:'#cc6699',
                sgs:10,
                sus:0,
                sgtc:'#cc6699',
                sutc:'#fff',
            })
        }
        if(index==2){
            this.setState({
                  searchFor:'user',
                subc:'#fff',
                sgbc:'#cc6699',
                sus:10,
                sgs:0,
                sutc:'#cc6699',
                sgtc:'#fff',
            })
        }
    }
    componentDidMount() {
      this.getHistory();
    }
    componentDidUpdate(){
        // this.getHistory();
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
        const params = this.props.navigation.state.params || {};
        return (
            <View style={styles.container}>
                <Header
                    containerStyle={{
                        backgroundColor: '#cc6699',
                        justifyContent: 'space-around',
                        borderBottomWidth:0,
                    }}
                    leftComponent={
                        <Icon
                            name="left"
                            size={36}
                            type={'antdesign'}
                            color={"#030303"}
                            onPress={() => {
                                try {
                                    this.props.navigation.state.params.refresh();
                                } catch (e) {}
                                if (params.go_back_key == null) {
                                    this.props.navigation.navigate('home');
                                } else {
                                    this.props.navigation.navigate(params.go_back_key);
                                }
                            }}
                        />
                    }
                    centerComponent={
                        <View style={styles.container_row}>
                            <View style={[styles.mode,
                                {backgroundColor:this.state.sgbc}]}>
                                <Text
                                    style={[styles.text,
                                        {color:this.state.sgtc,textShadowRadius:this.state.sgs}]}
                                    onPress={()=>this.changeSearchGoal(1)}
                                >搜商品 </Text>
                            </View>
                            <View style={[styles.mode,
                                {backgroundColor:this.state.subc}]}>
                                <Text
                                    style={[styles.text,
                                        {color:this.state.sutc,textShadowRadius:this.state.sus}]}
                                    onPress={()=>this.changeSearchGoal(2)}
                                > 搜用户 </Text>
                            </View>
                        </View>
                    }
                />

                <View style={{
                    backgroundColor:'#fff',
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center',
                    width:SP.WB(100),
                    height:SP.H(100),
                    borderBottomColor: '#bbb',
                    borderBottomWidth:1,
                }}>
                    <View style={styles.searchInp}>
                        <Icon  name={'search1'} type={'antdesign'}/>
                        <TextInput
                            style={styles.TextInput}
                            returnKeyType={"search"}// 键盘确定按钮类型 done/go/next/search/send
                            placeholder="请输入要搜索的内容"
                            placeholderTextColor="#999"
                            keyboardType="default"
                            onSubmitEditing={() => {
                                // 保存搜索内容
                                if(this.state.searchVal===''){
                                    alert('你还没有输入搜索条件哦');
                                    return;
                                }
                                this.insertSearch(this.state.searchVal);
                                if(this.state.searchFor=='good') {

                                    this.props.navigation.navigate('searchGP', {
                                        keyword: this.state.searchVal,
                                        update:()=>this.getHistory()
                                    });
                                    this.props.navigation.state.params.refresh(this.state.searchFor,this.state.searchVal);
                                }
                                else{
                                     this.props.navigation.navigate('searchUP', {
                                        keyword: this.state.searchVal,
                                         update:()=>this.getHistory()
                                    });
                                    this.props.navigation.state.params.refresh(this.state.searchFor,this.state.searchVal);
                                }

                                this.setState({
                                    searchVal: ''
                                });

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
                                this.setState({
                                    searchVal: ''
                                })
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
                                        this.setState({
                                            searchHistory:[],
                                        })
                                }}
                            >
                                <Icon name={'delete'} type={'antdesign'}/>
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

                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    mode:{
        width:SP.WB(35),
        justifyContent:'center',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    header:{
        flex:1,
        backgroundColor:'#cc6699',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container_row:{
        flex:1,
        flexDirection:'row',
    },
    text:{
        fontSize:20,
        textAlign:'center',
        padding:10,
        color:'#fff',
    },
    search:{
        backgroundColor:'#fff',
        borderWidth:0,
    },
    searchInp: {
        width: SP.WB(70),
        height: SP.H(70),
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: '#ddd',
        marginLeft: SP.W(50),
        paddingLeft:SP.W(20),
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
        // lineHeight: 44,
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
    searchMainLabel: {
        flexDirection: "row",
        flexWrap: 'wrap',
        maxHeight: 210,
        overflow: 'hidden',
    },
    searchLabelBox: {
        borderRadius: 20,
        backgroundColor: '#cc669922',
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
