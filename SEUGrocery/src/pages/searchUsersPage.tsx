/*
  @version: 0.1
  @author: 71117133张睦婕
  @date: 2019-9-6
*/
import React, {Component} from 'react';
import {
    ActivityIndicator,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    Alert,
    Text,
} from 'react-native';
import {
    Button,
    ThemeProvider,
    Image,
    Avatar,
    Header,
    Icon, SearchBar, Divider,ListItem,
} from 'react-native-elements';
import * as SP from '../Common/ScreenProperty';
import {TouchableOpacity} from "react-native-gesture-handler";
import {postData} from '../Common/FetchHelper';
import UserInfo from '../Common/UserInfo';
import * as DataBase from '../Common/DataBase';

const commonURL='http://inari.ml:8080/';
export default class SearchUsersPage extends Component {
    private props: any;

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.getHistory();
        this.getInfo(this.props.navigation.state.params.keyword);
    }

    state = {
        search:this.props.navigation.state.params.keyword,
        goalType:0,
        left:0,
        searchHistory: [],// 搜索历史数组
        list:[],
    };

    updateSearch = search => {
        this.setState({ search });
    };

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

    getAvatar=(uuid,index)=>{
        const fetch = require('node-fetch');
        fetch('http://inari.ml:8080/user/'+uuid)
            .then((response) => response.json())
            .then(response=>{
                    if(response.status=="success" ){
                        console.log(response.avatarurl);
                        this.setState({list: this.changeAvatar(this.state.list,index,response.avatarurl)})
                    }
                }
            )
    }
    changelist(hits){
        let list=[];
        for (let item of hits) {
            let tempObj = {
                uuid:item._id,
                name: item._source.username,
                info:item._source.info,
                add:item._source.address,
                avatar_url:'',
            };
            list.push(tempObj);

        }
        this.setState({list:list})
    }

    changeAvatar(list,index,uri){
        list[index].avatar_url=commonURL+uri;
        return list;
    }

    getInfo=(keyword)=>{
        console.log(keyword);
        this.setState({list:[]});
        let url='http://inari.ml:8080/item/search';
        let data={
            method:'user',
            query:keyword,
        }
        postData(url,data)
            .then(response=>{
                if(response.status=='failure'){
                    alert('请求错误')
                }
                else{
                    console.log(response);
                    this.changelist(response.hits.hits);
                    for(let i in this.state.list){
                        this.getAvatar(this.state.list[i].uuid,i);
                    }
                }

            })
            .catch(err => {
                console.error(err);
            });
    }


    render() {
        const { search } = this.state;
        const tips=['用户筛选条件1','用户筛选条件2'];
        return (
            <View >
                <Header
                    containerStyle={{
                        backgroundColor: '#eee',
                        justifyContent: 'center',
                    }}
                    leftComponent={
                        <Icon
                            name="left"
                            size={36}
                            type={'antdesign'}
                            color={"#030303"}
                            onPress={() => {
                                this.props.navigation.navigate('searchP');
                            }}
                        />
                    }
                    centerComponent={
                        <View style={styles.container}>
                            <SearchBar
                                placeholder="Type Here..."
                                onChangeText={this.updateSearch}
                                value={search}
                                round={true}
                                lightTheme={true}
                                containerStyle={styles.searchBar}
                                inputContainerStyle={styles.input}
                            />
                        </View>
                    }
                    rightComponent={
                        <Button
                            buttonStyle={{backgroundColor:'#cc6699',borderRadius:15}}
                            onPress={()=>{
                                // alert(this.state.search)
                                this.setState({loading:true});
                                this.insertSearch(this.state.search);
                                this.getInfo(this.state.search);
                                // this.setState({loading:false})
                            }}
                            title={'搜索'}
                        />
                    }
                />

                <View style={styles.body}>
                    <Button
                        buttonStyle={{backgroundColor:'#cc6699'}}
                        onPress={()=>{this.getInfo(this.state.search)}}
                        title={'刷新'}
                    />
                    {
                        this.state.list.map((l, i) => {
                            return(
                            <TouchableOpacity
                                onPress={()=> {
                                    this.props.navigation.navigate('showUser',{
                                        uuid:this.state.list[i].uuid,
                                    })
                                }}
                            >
                                <ListItem
                                    leftAvatar={{ source: { uri: l.avatar_url } }}
                                    title={l.name}
                                    subtitle={
                                        <View>
                                                <Text>{l.address}</Text>
                                                <Text>{l.info}</Text>
                                        </View>
                                    }
                                    bottomDivider
                                />
                            </TouchableOpacity>
                        )})
                    }
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container_row:{
        flexDirection:'row',
        justifyContent: 'center',
    },
    container:{
        flex:1,
        justifyContent:'center',
    },
    searchBar:{
        width:SP.WB(70),
        backgroundColor:'#eee',
        borderTopWidth:0,
        borderBottomWidth:0,

    },
    input:{
        backgroundColor:'#ddd',
    },
    mode:{
        justifyContent:'center',
        marginTop:SP.HB(1),
        marginBottom:SP.HB(2),
        marginLeft:SP.WB(5),
        marginRight:SP.WB(5),
    },
    typeTip:{
        fontSize:20,
    },
    body:{
        justifyContent:'center',
        // flex:1,
    },

    lists:{

    }




});
