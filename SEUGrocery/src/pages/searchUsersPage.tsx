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
    Icon, SearchBar, Divider,ListItem,
} from 'react-native-elements';
import * as SP from '../Common/ScreenProperty';
import {TouchableOpacity} from "react-native-gesture-handler";
import {postData} from '../Common/FetchHelper';
import UserInfo from '../Common/UserInfo';

const commonURL='http://inari.ml:8080/';
export default class SearchUsersPage extends Component {
    private props: any;

    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }

    componentDidUpdate() {

    }

    state = {
        search:'',
        goalType:0,
        left:0,
        list:[
            {
                name: 'Amy Farha',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'Vice President'
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Vice Chairman'
            },
        ]
    };

    updateSearch = search => {
        this.setState({ search });
    };

    changelist(hits){
        let list=[];
        for (i of hits){
            list.push({
                name:i._source.username,
                // 这里没写完
            })
        }
    }

    changeName(list,index,name){
        list[index].name=name;
        return list;
    }
    changeAvatar(list,index,uri){
        list[index].avatar_url=commonURL+uri;
        return list;
    }
    changeSubtitle(list,index,info){
        list[index].subtitle=info;
        return list;
    }

    getInfo=()=>{
        console.log(this.props.navigation.state.params.keyword);
        this.setState({list:this.changeName(this.state.list,0,'hanyuu')
            })
        // let url='http://inari.ml:8080/item/search';
        // let data={
        //     method:'user',
        //     query:this.props.navigation.state.params.keyword,
        // }
        // postData(url,data)
        //     .then(response=>{
        //         if(response.status=='failure'){
        //             alert('请求错误')
        //         }
        //         console.log(response);
        //         this.state.list=response.hits.hits;
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });
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
                                showLoading={true}
                                underlineColorAndroid={'#fff'}
                            />
                        </View>
                    }
                />

                <View style={styles.body}>
                    <Button
                        onPress={this.getInfo}
                        title={'发送请求'}
                    />
                    {
                        this.state.list.map((l, i) => (
                            <TouchableOpacity>
                            <ListItem
                                key={i}
                                leftAvatar={{ source: { uri: l.avatar_url } }}
                                title={l.name}
                                subtitle={l.subtitle}
                                bottomDivider
                            />
                            </TouchableOpacity>
                        ))
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
        width:SP.WB(80),
        backgroundColor:'#eee',
        borderTopWidth:0,
        borderBottomWidth:0,

    },
    input:{
        backgroundColor:'#000',
    },
    mode:{
        justifyContent:'center',
        marginTop:SP.HB(1),
        marginBottom:SP.HB(2),
        marginLeft:SP.WB(5),
        marginRight:SP.WB(5),
    },
    line:{
        backgroundColor:'#000',
        height:3,

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
