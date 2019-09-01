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
import GoodsPanel from '../Components/GoodsPanel';
import LocalBackHeader from '../Components/LocalBackHeader';
import MyGroceryHeader from '../Components/MyGroceryHeader';
import UserInfo from '../Common/UserInfo';
import ItemList from '../Common/ItemList';

export default class MyGroceryPage extends Component {
  private props: any;
  constructor(props) {
    super(props);
    this.state = {
      showGoodsWay: '0',
    };
  }
  render() {
    return (
      <ScrollView style={styles.baseContainer}>
        <View style={styles.headerContainer}>
          <LocalBackHeader navigation={this.props.navigation} />
        </View>
        <View style={styles.headerContainer}>
          <MyGroceryHeader
            ref={myGroceryHeader => (this.myGroceryHeader = myGroceryHeader)}
          />
        </View>
        <View style={styles.headerContainer} />
        <View style={styles.selectContainer}>
          <TouchableOpacity
            onPress={() => {
              this.setState({showGoodsWay: '0'});
            }}
            activeOpacity={0.2}
            focusedOpacity={0.5}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
              }}>
              <Text style={{color: '#cc6699'}}>全部</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({showGoodsWay: '1'});
            }}
            activeOpacity={0.2}
            focusedOpacity={0.5}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
              }}>
              <Text style={{color: '#cc6699'}}>未卖出</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({showGoodsWay: '2'});
            }}
            activeOpacity={0.2}
            focusedOpacity={0.5}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
              }}>
              <Text style={{color: '#cc6699'}}>已卖出</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.GoodsAreaContainer}>
          <GoodsPanel
            showGoodsWay={this.state.showGoodsWay}
            navigation={this.props.navigation}
            ref={goodsPanel => (this.goodsPanel = goodsPanel)}
          />
        </View>
      </ScrollView>
    );
  }
  componentDidMount() {
    // alert('rua12421312');
    ItemList.getItemList().then(list => {
      this.myGroceryHeader.getPublishedNum(list);
      this.goodsPanel.setState({goodsList: list});
    });
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
});
