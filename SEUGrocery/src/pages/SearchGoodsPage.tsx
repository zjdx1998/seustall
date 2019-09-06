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

} from 'react-native';
import {
    Text,
    Button,
    ThemeProvider,
    Image,
    Avatar,
    Header,
    Icon, SearchBar, Divider,
} from 'react-native-elements';
import * as SP from '../Common/ScreenProperty';
import {TouchableOpacity} from "react-native-gesture-handler";
import {postData} from '../Common/FetchHelper';
import UserInfo from '../Common/UserInfo';
import Good from "../Common/ItemBlock";


export default class SearchGoodsPage extends Component {
    private props: any;

    constructor(props) {
        super(props);
    }

    state = {
        search:'',
        goalType:0,
        list:[
            {
                itemid: 1,
                name: 'name1',
                icon_url: ' ',
                price: '10',
                classify: '书',
                info: '这还是一本书，一本很好的书，是一本非常好的书',
            },
            {
                itemid: 2,
                name: 'name2',
                icon_url: ' ',
                price: '20',
                classify: '体育器材',
                info: 'balabalablab',
            },
            {
                itemid: 3,
                name: 'name3',
                icon_url: ' ',
                price: '30',
                classify: '电子产品',
                info: 'balabalablab',
            },
            {
                itemid: 4,
                name: 'name4',
                icon_url: ' ',
                price: '40',
                classify: '食物',
                info: 'balabalablab',
            },
        ],
    };
    componentDidMount() {

    }

    componentDidUpdate() {

    }

    getInfo=()=>{
        console.log(this.props.navigation.state.params.keyword);
        console.log(this.state.list);

        //千万别删
        //  let url='http://inari.ml:8080/item/search';
        // let data={
        //     method:'good',
        //     query:this.props.navigation.state.params.keyword,
        // }
        // postData(url,data)
        //     .then(response=>{
        //         if(response.status=='failure'){
        //             alert('请求错误')
        //         }
        //         console.log(response);
        //     })
        //   .catch(err => {
        //     console.error(err);
        //   });
    }

    updateSearch = search => {
        this.setState({ search });
    };


    render() {
        const { search } = this.state;
        const tips=['商品信息','求购信息'];
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
                                showLoading={true}
                                underlineColorAndroid={'#cc6699'}
                            />
                        </View>
                    }
                />
                <View style={styles.container_row}>
                    {tips.map((i,j)=>{
                        return(
                            <View style={styles.mode}>
                                <Text
                                    style={styles.typeTip}
                                    onPress={()=>{
                                        this.setState({goalType:j,left:-1*SP.WB(100)*j});
                                    }}
                                >{i}</Text>
                                <Divider style={[styles.line,{opacity:j===this.state.goalType?1:0}]}/>
                            </View>
                        )
                    })}
                </View>
                <View style={styles.body}>
                    <Button
                        onPress={this.getInfo}
                        title={'请求数据'}
                    />
                    <ScrollView>
                    <View style={styles.goodsList}>
                        {this.state.list.map(i => (
                            <Good
                                itemid={i.itemid}
                                image={{uri: i.icon_url}}
                                name={i.name}
                                price={i.price}
                                text={i.info}
                                navigation={this.props.navigation}
                            />
                        ))}
                    </View>
                    </ScrollView>
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
        width:SP.WB(80),
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
    justifyContent:'center',
  },

    lists:{

    }




});
