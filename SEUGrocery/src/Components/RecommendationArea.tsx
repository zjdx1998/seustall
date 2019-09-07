/*
  @version: 0.2
  @author: 71117124湛钊,71117133张睦婕
  @date: 2019-8-23
*/

import {StyleSheet, View, Dimensions, Image, Text} from 'react-native';
import * as SP from '../Common/ScreenProperty';
//import { Image,Text} from 'react-native-elements';
import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Good from '../Common/ItemBlock';
const {width} = Dimensions.get('window'); //解构赋值 获取屏幕宽度

const Goods = [
  {
    itemid: 1,
    name: 'name1',
    icon_url: 'https://avatars2.githubusercontent.com/u/45632558?s=400&v=4',
    price: '10',
    classify: '书',
    info: '这还是一本书，一本很好的书，是一本非常好的书',
  },
  {
    itemid: 2,
    name: 'name2',
    icon_url: 'https://hanyuufurude.github.io/img/covers.jpg',
    price: '20',
    classify: '体育器材',
    info: 'balabalablab',
  },
  {
    itemid: 3,
    name: 'name3',
    icon_url: 'https://hanyuufurude.github.io/img/covers.jpg',
    price: '30',
    classify: '电子产品',
    info: 'balabalablab',
  },
  {
    itemid: 4,
    name: 'name4',
    icon_url: 'https://hanyuufurude.github.io/img/covers.jpg',
    price: '40',
    classify: '食物',
    info: 'balabalablab',
  },
];

export default class RecommendationArea extends Component {
  state:{
    goodsList:any,
  }
  constructor(){
    super();
    this.state={
      goodsList:Goods,
    }
  }
  private props: any;
  render() {
    return (
      <View style={styles.goodsList}>
        {Goods.map(i => (
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
    );
  }
}



const styles = StyleSheet.create({
  block: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: width / 2 - 20,
    height: SP.HB(35),
    alignItems: 'center',
    margin: 10,
    padding: 10,
    flexDirection: 'column',
    flex: 1,
  },
  goodsList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center',
  },
  price: {
    fontSize: 20,
    color: '#cc6699',
    flex: 1,
  },
  textdes: {
    fontSize: 12,
    color: '#000',
    flex: 1,
  },
  name: {
    fontSize: 28,
    color: '#cc6699',
    flex: 1,
  },
});
