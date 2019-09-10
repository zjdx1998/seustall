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
    Alert, FlatList,

} from 'react-native';
import {
    Text,
    Button,
    ThemeProvider,
    Image,
    Avatar,
    Header,
    Icon, SearchBar, Divider, ListItem,
} from 'react-native-elements';
import * as SP from '../Common/ScreenProperty';
import {TouchableOpacity} from "react-native-gesture-handler";
import {postData} from '../Common/FetchHelper';
import Good from "../Common/ItemBlock";
import {goodsInfo} from "../Common/GoodsInfo";
import * as DataBase from '../Common/DataBase';
import RecommendationArea from "../Components/RecommendationArea";

export default class SearchGoodsPage extends Component {
    private props: any;

    constructor(props) {
        super(props);
    }

    state = {
        loading:false,
        search: this.props.navigation.state.params.keyword,
        goalType: 0,
        left: 0,
        list: [ ],
        wantList: [],
        searchHistory: [],// 搜索历史数组
    };

    componentDidMount() {
        this.getHistory();
        this.getInfo(this.props.navigation.state.params.keyword);
    }

    componentDidUpdate() {
        // this.getInfo(this.props.navigation.state.params.keyword);
    }

    getInfo = (keyword) => {
        // console.log('keyword',this.props.navigation.state.params.keyword);
        // console.log('list',this.state.list);
        this.setState({list:[],wantList:[]});

        //千万别删
        let url='http://hanyuu.top:8080/item/search';
        let data={
            method:'good',
            query:keyword,
        }
        postData(url,data)
            .then(response=>{
                if(response.status=='failure'){
                    alert('请求错误');
                    return;
                }
                console.log('response1',response);
                this.updateLists(response.hits.hits);
                this.setState({loading:false});
            })
            .catch(err => {
                console.error(err);
            });
    }

    isOldItem=(id)=>{
        for (let i of this.state.list){
            if(i.id==id){
                return true;
            }
        }
        for (let i of this.state.wantList){
            if(i.id==id){
                return true;
            }
        }
        return false;
    }

    updateLists= (list) => {
        for (let item of list) {
            if(this.isOldItem(item._id)){
                continue;
            }
            let tempObj={
                itemid:item._id,
                name: item._source.title,
                icon_url: ' ',
                price: item._source.price,
                info: item._source.note,
            };
            goodsInfo(item._id)
                .then((response)=> {
                        console.log('imgurl',response.imgurl);
                        if(response.status=='success') {
                            if(response.imgurl==''){
                                tempObj.icon_url = 'http://hanyuu.top:8080/'+'image/item/0.9321619878296834.jpg';
                            }else {
                                tempObj.icon_url = 'http://hanyuu.top:8080/' + response.imgurl.split("++")[0];
                            }
                            if (response.sold === 1) {
                                let tempList = this.state.list;
                                tempList.push(tempObj);
                                this.setState({list: tempList});
                            }
                            if (response.sold === -1) {
                                let tempList = this.state.wantList;
                                tempList.push(tempObj);
                                this.setState({wantList: tempList});
                            }
                        }
                    }
                )
        }
    }



    updateSearch = search => {
        this.setState({search});
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


    render() {
        // const {search} = this.state;
        const tips = ['商品信息', '求购信息'];
        return (
            <ScrollView>
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
                                this.props.navigation.navigate('searchP',{
                                    refresh:(f,keyword)=> {
                                        if(f!='good'){return;}
                                        this.setState({search: keyword});
                                        this.getInfo(keyword);
                                    }
                                })}}
                        />
                    }
                    centerComponent={
                        <View style={styles.container}>
                            <SearchBar
                                placeholder={'Type here...'}
                                onChangeText={this.updateSearch}
                                value={this.state.search}
                                round={true}
                                lightTheme={true}
                                containerStyle={styles.searchBar}
                                inputContainerStyle={styles.input}
                                showLoading={this.state.loading}
                                // underlineColorAndroid={'#cc6699'}
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
                <RecommendationArea
                    navigation={this.props.navigation}
                  list={this.state.list}
                  wantList={this.state.wantList}
                    refresh={()=>this.getInfo()}
                />
            </ScrollView>

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
    line:{
        backgroundColor:'#cc6699',
        height:3,

    },
    typeTip:{
        fontSize:20,
    },
    goodsList: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'flex-start',
    },

    body:{
        flexDirection:'row',
        width:SP.WB(200),
        marginBottom: SP.HB(25),
    },

});
