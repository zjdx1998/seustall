/*
  @version: 0.3
  @author: 71117133张睦婕
  @date: 2019-8-23
*/

import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import {Icon, Divider, Text, ListItem} from 'react-native-elements';
const {width} = Dimensions.get('window'); //解构赋值 获取屏幕宽度

export default class GoodsClassification extends Component {
  render() {
    return (
      <View style={styles.container_col}>
        <View style={styles.title}>
          <Icon name="pagelines" type="font-awesome" color={'#cc6699'} />
          <Text h4 style={styles.titleFont}>
            {' '}
            杂货百般
          </Text>
        </View>
        <View style={styles.block}>
          <View style={styles.container_row}>
            {classes1.map(x => (
              <Item
                iconName={x.iconName}
                type={x.type}
                color={x.color}
                goodsName={x.goodsName}
              />
            ))}
          </View>
          <View style={styles.container_row}>
            {classes2.map(x => (
              <Item
                iconName={x.iconName}
                type={x.type}
                color={x.color}
                goodsName={x.goodsName}
              />
            ))}
          </View>
        </View>
        <Divider style={styles.line} />
        <Text />
      </View>
    );
  }
}

class Item extends Component {
  render() {
    return (
      <View style={styles.container_col}>
        <Icon
          reverse
          name={this.props.iconName}
          type={this.props.type}
          color={this.props.color}
        />
        <Text style={styles.goodsFont}>{this.props.goodsName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container_row: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container_col: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
    padding: 5,
  },
  line: {
    height: 3,
    backgroundColor: '#CC6699',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  block: {
    backgroundColor: '#EED2EE',
    borderRadius: 10,
    width: width - 20,
  },
  titleFont: {
    color: '#cc6699',
  },
  goodsFont: {
    color: '#000',
  },
});

const classes1 = [
  {
    iconName: 'phonelink',
    type: '',
    color: '#517fa4',
    goodsName: '电子产品',
  },
  {
    iconName: 'shopping-bag',
    type: 'font-awesome',
    color: '#CC6655',
    goodsName: '服饰鞋包',
  },
  {
    iconName: 'bicycle',
    type: 'font-awesome',
    color: '#5154a4',
    goodsName: '交通工具',
  },
  {
    iconName: 'magic',
    type: 'font-awesome',
    color: '#f50',
    goodsName: '美妆个护',
  },
];

const classes2 = [
  {
    iconName: 'umbrella',
    type: 'font-awesome',
    color: '#989976',
    goodsName: '日常用品',
  },
  {
    iconName: 'book',
    type: 'font-awesome',
    color: '#ab4387',
    goodsName: '图书文具',
  },
  {
    iconName: 'futbol-o',
    type: 'font-awesome',
    color: '#98cc99',
    goodsName: '运动健身',
  },
  {
    iconName: 'ellipsis-h',
    type: 'font-awesome',
    color: '#980403',
    goodsName: '其他',
  },
];
