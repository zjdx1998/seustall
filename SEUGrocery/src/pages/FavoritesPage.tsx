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

export default class FavoritesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGoodsWay: '2',
    };
  }

  fetchData = () => {
    fetch(itemURL + this.props.navigation.state.params.itemid)
      .then(response => response.json())
      .then(rT => {
        this.setState({
          itemid: rT.itemid,
          username: itemURL + this.props.navigation.state.params.itemid,
          uuid: rT.uuid,
          title: rT.title,
          type: rT.type,
          price: parseFloat(rT.price),
          imgurl: rT.imgurl,
          note: rT.note,
          depreciatione: rT.depreciatione,
        });
        console.log(rT);
      })
      .catch(e => {
        console.log('Oops, error');
      });
  };

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
                source={require('../Common/img/avatar.png')}
              />
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
              <Text style={{color: '#cc6699'}}>全部</Text>
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
              <Text style={{color: '#cc6699'}}>未卖出</Text>
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
              <Text style={{color: '#cc6699'}}>已卖出</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.GoodsAreaContainer}>
          <GoodsPanel
            showGoodsWay={this.state.showGoodsWay}
            navigation={this.props.navigation}
          />
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
