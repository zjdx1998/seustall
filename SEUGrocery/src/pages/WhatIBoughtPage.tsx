/*
  @version: 0.1
  @author: 71117103张潇艺
  @date: 2019-8-26
*/
import React, {Component} from 'react';
import {
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Text, ThemeProvider, Image, Avatar} from 'react-native-elements';
import BoughtGoodsPanel from '../Components/BoughtGoodsPanel';
import LocalBackHeader from '../Components/LocalBackHeader';
import UserInfo from '../Common/UserInfo';
import {postData} from '../Common/FetchHelper';
import ItemList from '../Common/ItemList';

const finishedURL = "http://inari.ml:8080/user/finished";


export default class WhatIBoughtPage extends Component {
  private props: any;
  state: { 
    userAvatar: string;
    token:string;
 };
constructor(props){
    super(props);
    this.state = {
        userAvatar:'',
        token:'',
    };
    UserInfo.get('avatarurl').then((url)=>{this.setState({
        userAvatar:url
    })});
    UserInfo.get('token').then((tok)=>{this.setState({
        token:tok
    })});
  }



  render() {
    return (
      <ScrollView style={styles.baseContainer}>
        <View style={styles.headerContainer}>
          <LocalBackHeader navigation={this.props.navigation} />
        </View>
        <View style={styles.headerContainer}>
          <View style={styles.headerArea}>
            <View style={styles.viewUserTop}>
              <Avatar
                size={120}
                rounded
                source={{uri:this.state.userAvatar}}
              />
            </View>
            <View style={styles.txtArea}>
              <Text style={styles.txtTitle}>我买到的</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerContainer} />
        <View style={styles.GoodsAreaContainer}>
          <BoughtGoodsPanel navigation={this.props.navigation}
            ref={goodsPanel => (this.goodsPanel = goodsPanel)}
          />
        </View>
      </ScrollView>
    );
  }
  componentDidMount() {
    // alert('rua12421312');
    ItemList.getFinishedList()
    .then(list=>{
      this.goodsPanel.setState({goodsList:list})
    })
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
  headerArea: {
    alignItems: 'center',
    backgroundColor: '#cc6699',
    flexDirection: 'row',
  },
  selectContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  GoodsAreaContainer: {
    flex: 20,
  },
  selectText: {
    color: '#cc6699',
  },
  viewUserTop: {
    padding: 10,
    margin: 10,
    height: 150,
  },
  txtArea: {
    justifyContent: 'center',
    margin: 20,
  },
  txtTitle: {
    fontSize: 30,
    alignSelf: 'center',
    color: '#ffffff',
  },
});
