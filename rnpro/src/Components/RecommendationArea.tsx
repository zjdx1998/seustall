/*
  @version: 0.1
  @author: 71117124湛钊
  @date: 2019-8-22
*/

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import React, {Component} from 'react';
const {width} = Dimensions.get('window'); //解构赋值 获取屏幕宽度

const Goods = [
  {
    name: 'name1',
    icon_url: 'https://avatars2.githubusercontent.com/u/45632558?s=400&v=4',
    price: '10',
    classify: '书',
  },
  {
    name: 'name2',
    icon_url: 'https://hanyuufurude.github.io/img/covers.jpg',
    price: '20',
    classify: '体育器材',
  },
  {
    name: 'name3',
    icon_url: 'https://hanyuufurude.github.io/img/covers.jpg',
    price: '30',
    classify: '电子产品',
  },
  {
    name: 'name4',
    icon_url: 'https://hanyuufurude.github.io/img/covers.jpg',
    price: '40',
    classify: '食物',
  },
];

export default class RecommendationArea extends Component {
  render() {
    return (
      <View>
        {Goods.map((i, j) => (
          <ListItem
            key={j}
            leftAvatar={{
              size: 'large',
              source: {uri: i.icon_url},
            }}
            title={i.name}
            titleStyle={{fontSize: 20}}
            subtitle={'￥' + i.price}
            subtitleStyle={{color: 'orange', fontSize: 30}}
            badge={{
              value: i.classify,
              textStyle: {fontSize: 20, color: 'orange'},
              containerStyle: {marginTop: -10},
            }}
          />
        ))}
      </View>
    );
  }
}
