/*
  @version: 0.1
  @author: 71117103张潇艺
  @date: 2019-8-28
*/
import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity,ImageBackground} from 'react-native';
import {Avatar, Text} from 'react-native-elements';

import LocalBackHeader from '../Components/LocalBackHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import GoodsPanel from '../Components/GoodsPanel';
import RecommendationArea from '../Components/RecommendationArea';
import UserInfo from '../Common/UserInfo';

export default class UserInformationPage extends Component {
    private props: any;
    constructor(props) {
        super(props);
        //this.state.uuid = props;
        this.state = {
            showGoodsWay: '0',
            uuid : '',
            password :'',
            username :'',
            phonenumber:'',
            idcard:'',
            studentid:'',
            address:'',
            avatarurl:'',
            verified:'',
            score:'',
            token:'',
            itemList : '',
            info : '',
        };
        UserInfo.get('username').then(data=>{this.setState({username:data})});
        UserInfo.get('info').then(data=>{this.setState({info:data})});
        UserInfo.get('verified').then(data=>{this.setState({verified:data})});
        UserInfo.get('avatarurl').then(data=>{this.setState({avatarurl:data})});
    }
    getVerify(){
        if(this.state.verified=='0'){
            return'未认证'
        }else{
            return'已认证'
        }
    }

    render() {
    return (
      <ScrollView style={styles.baseContainer}>
        <View style={styles.headerContainer}>
          <LocalBackHeader navigation={this.props.navigation} />
        </View>
        {/*<View style={styles.headerContainer}>*/}
          <View style={styles.headerArea}>
            <View style={styles.viewUserTop}>
              <ImageBackground source={require('../Common/img/userinfoB.png')} style={{alignItems:'center',justifyContent:'center',width: '100%', height: '100%'}}>
              <Avatar
                size={210}
                rounded
                source={{uri:this.state.avatarurl}}
              />
              </ImageBackground>
            </View>
            <View style={styles.txtArea}>
              <Text style={styles.txtTitle}>{this.state.username}</Text>
                <View style={styles.viewIfId}>
                  <Text style={{color: '#ffffff', fontSize: 17, padding: 1}}>
                      {this.getVerify()}
                  </Text>
              </View>
              <Text style={{fontSize:25,color:'#cc6699',alignSelf:'center',marginTop: 15}}>
                个人简介
              </Text>
              <Text numberOfLines={5} style={styles.txtInfo}>
                {this.state.info}
              </Text>
              <TouchableOpacity style={styles.viewEdit}
              onPress={()=>this.props.navigation.navigate('release_info')}>
                <Icon
                  name="pencil-square-o"
                  style={{color: '#cc6699'}}
                  size={20}
                />
                <Text style={styles.txtEdit}>编辑个人资料</Text>
              </TouchableOpacity>
            </View>
          </View>
        {/*</View>*/}
        <View style={styles.selectContainer}>
          <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('page1')}
            activeOpacity={0.2}
            focusedOpacity={0.5}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#cc6699',
                marginLeft:10,
                borderRadius:10
              }}>
              <Text style={styles.selectText}> 我的铺子 </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('page2')}
            activeOpacity={0.2}
            focusedOpacity={0.5}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#cc6699',
                //marginLeft:10,
                borderRadius:10
              }}>
              <Text style={styles.selectText}> 我想买的 </Text>
            </View>
          </TouchableOpacity>
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
    //backgroundColor: '#cc6699',
  },
  viewUserTop: {
    //flex:1,
   /* padding: 10,*/

    height: 360,
    alignItems:'center',
    justifyContent:'center',
    //backgroundColor:'#cc6699',
  },
  txtArea: {
    marginTop:15,
    //padding: 10,
    backgroundColor:'#fff',
    alignItems:'center',
    alignSelf: 'stretch',
    //height:250
  },
  headerArea: {
    //margin:5,
    backgroundColor: '#fff0f5',
    //flexDirection: 'row',
  },
  selectContainer: {
    flex: 1,
    //height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  selectText: {
    color: '#ffffff',
    fontSize: 27,
    margin:10

  },
  txtTitle: {
    fontSize: 35,
    margin: 15,
    color: '#cc6699',
    backgroundColor:'#fff'
  },
  viewIfId: {
    marginHorizontal: 15,
    backgroundColor: '#cc6699',
    justifyContent: 'center',
    width:100,
    flex:1,
    alignItems: 'center',
    borderRadius: 5,
  },
  txtInfo: {
    fontSize: 20,
    margin: 15,
    marginBottom:25,
    color: '#cc6699',
    backgroundColor:'#fff0f5',
    borderRadius:10,
  },
  viewEdit: {
    margin: 15,
    flexDirection: 'row',
    //backgroundColor: '',
    opacity: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf:'flex-end',
  },
  txtEdit: {
    marginLeft: 3,
    alignSelf: 'center',
    color: '#cc6699',
    fontSize: 15,
  },
});

