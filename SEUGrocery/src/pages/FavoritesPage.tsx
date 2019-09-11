/*
  @version: 0.1
  @author: 71117103张潇艺
  @date: 2019-8-28
*/
import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Avatar} from 'react-native-elements';
import GoodsPanel from '../Components/GoodsPanel';
import LocalBackHeader from '../Components/LocalBackHeader';
import UserInfo from '../Common/UserInfo';
import ItemList from '../Common/ItemList';

const favQueryURL = 'fav/query';

export default class FavoritesPage extends Component {
  private goodsPanel: any;
  constructor(props) {
    super(props);
    this.state = {
      showGoodsWay: '0',
      avatarurl: '',
    };
    UserInfo.get('avatarurl').then(data => {
      this.setState({avatarurl: data});
    });
  }

  fetchData = () => {};

  render() {
    return (
      <ScrollView style={styles.baseContainer}>
        <View style={styles.headerContainer}>
          <LocalBackHeader navigation={this.props.navigation} />
        </View>
        <View style={styles.headerContainer}>
          <View style={styles.headerArea}>
            <View style={styles.viewUserTop}>
              <Avatar size={120} rounded source={{uri: this.state.avatarurl}} />
            </View>
            <View style={styles.txtArea}>
              <Text style={styles.txtTitle}>我的收藏</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerContainer} />
        <View style={styles.selectContainer}>
          <TouchableOpacity activeOpacity={0.2} focusedOpacity={0.5}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
              }}
              onPress={() => {
                this.setState({showGoodsWay: '0'});
              }}>
              <Text style={{fontSize:18, color: '#cc6699'}}>全部</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.2} focusedOpacity={0.5}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
              }}
              onPress={() => {
                this.setState({showGoodsWay: '1'});
              }}>
              <Text style={{fontSize:18, color: '#cc6699'}}>未卖出</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.2} focusedOpacity={0.5}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
              }}
              onPress={() => {
                this.setState({showGoodsWay: '2'});
              }}>
              <Text style={{fontSize:18, color: '#cc6699'}}>已卖出</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.GoodsAreaContainer}>
          <GoodsPanel
            showGoodsWay={this.state.showGoodsWay}
            ref={goodsPanel => (this.goodsPanel = goodsPanel)}
            navigation={this.props.navigation}
          />
        </View>
      </ScrollView>
    );
  }
  componentDidMount() {
    // const fetch = require('node-fetch');
    const indexURL = "http://hanyuu.top:8080/";
    // // alert('rua12421312');
    // console.log('didMount');
    ItemList.getFavList()
        .then(list=> {
          // console.log('list',list);
          // let goodsList=[];
          // if(list.status=='success') {
          //   for (let i in list.res) {
          //     fetch(indexURL + 'item/' + i)
          //         .then(res => res.json())
          //         .then(response => {
          //           console.log('reoponse', response)
          //           if(response.sold>0) {
          //             goodsList.push({
          //               itemid: response.itemid,
          //               title: response.title,
          //               imgurl: response.imgurl,
          //               sold: response.sold,
          //               depreciatione: response.depreciatione,
          //               price: response.price,
          //               info: response.note,
          //             });
          //             this.goodsPanel.setState({goodsList: goodsList});
          //           }
          this.goodsPanel.setState({favList:list})
          this.goodsPanel.getFavList();

    } )
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
