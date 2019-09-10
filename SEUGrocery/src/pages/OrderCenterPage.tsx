/*
  @version: 0.1
  @author: 71117133 张睦婕
  @date: 2019-9-10
*/
import React, {Component} from 'react';
import {ScrollView, StyleSheet, View,} from 'react-native';
import {Button, Text,} from 'react-native-elements';
import LocalBackHeader from '../Components/LocalBackHeader';
import UserInfo from '../Common/UserInfo';
import {postData} from '../Common/FetchHelper';
import * as SP from '../Common/ScreenProperty';

export default class OrderCenterPage extends Component {
    private props: any;
    constructor(props) {
        super(props);
        this.state = {
           orderList:[],
            token:'',
            uuid:'',
        };
    }

    async componentDidMount() {
        console.log('DidMount');
        let uuid = await UserInfo.get('uuid');
        // console.log(uuid);
        this.setState({uuid: uuid});
        let token =await UserInfo.get('token');
        this.setState({token: token});
        this.getInfo();

    }

    getInfo=()=>{
        postData('http://hanyuu.top:8080/user/chat/fetchall', {token: this.state.token})
            .then(response => {
                console.log('news', response);
                let list = [];
                for (let i of response.data) {
                    if (i.type == '0' && i.to == this.state.uuid) {
                        fetch('http://hanyuu.top:8080/item/'+i.data)
                            .then(response=>response.json())
                            .then(item=>{
                                console.log('item',item);
                                if(response.status=='success'){
                                    fetch('http://hanyuu.top:8080/user/'+i.from)
                                        .then(re=>re.json())
                                        .then(user=>{
                                            console.log('user',user);
                                            list.push({user:user,item:item});

                                        })
                                }
                            })
                        // list.push(i);
                    }
                }
                this.setState({orderList: list});
            })
    }

    render() {
        return (
            <ScrollView style={styles.baseContainer}>
                <View style={styles.headerContainer}>
                    <LocalBackHeader navigation={this.props.navigation} />
                </View>
                <Text h3 style={{alignSelf:'center',color:'white',top:-SP.HB(5)}}>订单中心</Text>
               <View style={{top:-SP.HB(3)}}>
                   {this.state.orderList.map((i,j)=>{
                       return(
                           <View style={styles.orderContainer}>
                               <Text style={{margin:SP.WB(1)}}>用户 {i.user.username} 想要购买你的 {i.item.title} 是否同意呢？</Text>
                               <View style={{flexDirection:'row'}}>
                                   <Button title='拒绝' onPress={()=>{

                                   }} buttonStyle={styles.button}/>
                                    <Button title='同意' onPress={()=>{}} buttonStyle={styles.button}/>
                                    <Button title='跟TA聊天' onPress={()=>{}} buttonStyle={styles.button}/>
                               </View>
                           </View>
                       )
                   })}
               </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF0F5',
    },
    headerContainer: {
        flex: 5,
        backgroundColor: '#cc6699',
    },
   orderContainer:{
        backgroundColor:'white',
       justifyContent:'center',
       margin:SP.WB(1),
       padding:SP.WB(2),
       borderRadius:10,
       alignItems:'center',
   },
    button:{
        marginLeft:SP.WB(2),
        marginRight:SP.WB(2),
        backgroundColor:'#cc6699',
    }
});
