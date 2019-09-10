/*
  @version: 0.1
  @author: 71117103 张潇艺
  @date: 2019-8-29
*/
import React, { Component } from 'react';
import {
    ActivityIndicator,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    Button,
    Picker,
    TextInput, FlatList, TouchableOpacity,
} from 'react-native';
import LocalBackHeader from '../Components/LocalBackHeader';
import * as SP from '../Common/ScreenProperty';
import { postData } from '../Common/FetchHelper';
import ItemList from '../Common/ItemList';
import Loading from '../Components/Loading';
import { ListItem, Text, } from 'react-native-elements';
import MessageCenter from '../Common/MessageCenter';
import UserInfo from '../Common/UserInfo';

const sendUrl = 'http://hanyuu.top:8080/user/chat/push'
const fetchnewUrl = 'http://hanyuu.top:8080/user/chat/fetchnew'
const fetchallUrl = 'http://hanyuu.top:8080/user/chat/fetchall'
const userDataUrl = 'http://hanyuu.top:8080/user/'


const list = [
    // {
    //     name: 'Amy Farha',
    //     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    //     subtitle: 'Vice President',
    //     news: 0,
    // },
    // {
    //     name: 'Chris Jackson',
    //     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //     subtitle: 'Vice Chairman',
    //     news: 3,
    // },
    // {
    //     name: 'Chris Jackson',
    //     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //     subtitle: 'Vice Chairman',
    //     news: 2,
    // },
    // {
    //     name: 'Chris Jackson',
    //     avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //     subtitle: 'Vice Chairman',
    //     news: 99,
    // },
]

let that: any

export default class NoticesPage extends Component {
    private state: any;
    private Loading: any;
    constructor(props) {
        super(props);
        this.state = {
            data: list,
            info: '',
        };
        that = this
        setInterval(()=>{
            this.refreshNoticeData();

        },5000)
    }

    componentDidMount() {
        var mlist = MessageCenter.getNoticesMap(
            async function (list) {
                // alert(JSON.stringify(list))
                var mlist = [];
                var c = await list.forEach(async function (value) {
                    // alert(JSON.stringify(value));
                    var len = 0;
                    for (var mes in value.value) {
                        len++;
                    }
                    // alert(len)
                    var data = await fetch(userDataUrl + value.key).then(res => res.json())

                    mlist.push({
                        uuid: value.key,
                        name: data.username,
                        avatar_url: "http://hanyuu.top:8080/" + data.avatarurl,
                        news: len,
                        title: "某商品",
                        text: value.value,
                    })
                    // alert(JSON.stringify(mlist))
                    that.setState({ data: mlist })

                })
                // alert(JSON.stringify(mlist));
                return mlist

            })
        // this.setState({data:mlist})
    }

    updateState = data => {
        this.setState(data);
    };

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('chatP', {
                uuid: item.uuid,
                username: item.name,
                title: item.title,
                avatarurl: item.avatar_url,
                text: item.text,
            })}
        >
            <ListItem
                title={item.name}
                subtitle={item.subtitle}
                leftAvatar={{ source: { uri: item.avatar_url } }}
                badge={{ value: item.news, textStyle: { color: 'orange' }, containerStyle: { opacity: item.news == 0 ? 0 : 1 } }}
                bottomDivider
                chevron
            />
        </TouchableOpacity>
    )

    refreshNoticeData() {
        var keyset = new Set();
        var data = this.state.data;
        data.forEach(function(value){
            keyset.add(value.uuid);
        })
        console.log(keyset);

        MessageCenter.getNewMessageMap(function (mlist){
            // console.log(JSON.stringify(mlist))
            mlist.forEach(async function(value){
                if(keyset.has(value.key)){
                    for(var info of data){
                        // console.log(JSON.stringify(info.text))
                        // console.log(JSON.stringify(value.value))
                        if(info.uuid == value.key){
                            var len = 0;
                            for (var mes in value.value) {
                                len++;
                            }
                            info.text = info.text.concat(value.value)
                            // console.log(JSON.stringify(info.text))
                            info.news = info.news + len;
                            that.setState({data:data})
                        }
                    }
                }else{
                    var len = 0;
                    for (var mes in value.value) {
                        len++;
                    }
                    // alert(len)
                    var userinfo = await fetch(userDataUrl + value.key).then(res => res.json())

                    data.push({
                        uuid: value.key,
                        name: userinfo.username,
                        avatar_url: "http://hanyuu.top:8080/" + userinfo.avatarurl,
                        news: len,
                        title: "某商品",
                        text: value.value,
                    })
                    // alert(JSON.stringify(mlist))
                    that.setState({ data: data })

                }
            })
        })



        // var uuid = this.state.uuid_to;
        // var messages = [];
        // MessageCenter.getNewMessageMap(function (mlist) {
        //     var texts = mlist.filter(function (e) {
        //         return e.key == uuid
        //     })
        //     // alert(JSON.stringify(texts))
        //     // alert(JSON.stringify(texts))
        //     // alert(JSON.stringify(texts[0].value))
        //     texts[0].value.forEach(function (data) {
        //         // alert(JSON.stringify(data))
        //         var message = {
        //             text: data.text,
        //             createdAt: new Date(data.time),
        //             user: {
        //                 _id: uuid,
        //                 name: data.username,
        //                 avatar: data.avatarurl,
        //             }
        //         }
        //         // alert(JSON.stringify(message))
        //         messages.push(message)
        //     })
        //     messages.reverse();
        //     // alert(JSON.stringify(messages))
        //     that.setState(previousState => ({
        //         messages: GiftedChat.append(previousState.messages, messages),
        //     }))

        // })
    }

    render() {
        return (
            <View style={styles.baseContainer}>
                <ScrollView style={styles.test}>
                    <LocalBackHeader navigation={this.props.navigation} />
                    <Text h4 style={{ alignSelf: 'center', top: -SP.HB(5) }}>消息中心</Text>
                    <View style={{ top: -SP.HB(4) }}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.data}
                            renderItem={this.renderItem}
                        />

                    </View>


                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    baseContainer: {
        backgroundColor: '#FFF0F5',
        flex: 1,
    },
    buttonContainer: {
        top: -50,
        left: SP.WB(100) * 0.7,
        height: 40,
        width: SP.WB(100) * 0.25,
        justifyContent: 'center',
        padding: 10,
    },
    title: {
        padding: 10,
        fontSize: 40,
        marginTop: 15,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        //borderBottomColor:'white',
        //borderBottomWidth:0.5,
    },
    detailContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        height: 200,
        justifyContent: 'space-between',
    },
    detail: {
        fontSize: 20,
        /*borderTopColor:'white',
            borderTopWidth:0.5,*/
    },
    secondCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
    },

    container_row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 5,
        flex: 1,
        //margin:10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    h4: {
        fontSize: 20,
        margin: 5,

        backgroundColor: 'white',
        borderRadius: 10,
    },
    value: {
        color: '#cc6699',
        fontSize: 30,
        fontWeight: 'bold',
    },
});
