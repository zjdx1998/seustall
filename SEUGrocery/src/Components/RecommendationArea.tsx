/*
  @version: 0.2
  @author: 71117124湛钊,71117133张睦婕
  @date: 2019-8-23
*/

import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
} from 'react-native';

//import { Image,Text} from 'react-native-elements';
import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width} = Dimensions.get('window'); //解构赋值 获取屏幕宽度

const Goods = [
  {
    name: 'name1',
    icon_url: 'https://avatars2.githubusercontent.com/u/45632558?s=400&v=4',
    price: '10',
    classify: '书',
    info: '这还是一本书，一本很好的书，是一本非常好的书',
  },
  {
    name: 'name2',
    icon_url: 'https://hanyuufurude.github.io/img/covers.jpg',
    price: '20',
    classify: '体育器材',
    info: 'balabalablab',
  },
  {
    name: 'name3',
    icon_url: 'https://hanyuufurude.github.io/img/covers.jpg',
    price: '30',
    classify: '电子产品',
    info: 'balabalablab',
  },
  {
    name: 'name4',
    icon_url: 'https://hanyuufurude.github.io/img/covers.jpg',
    price: '40',
    classify: '食物',
    info: 'balabalablab',
  },
];

export default class RecommendationArea extends Component {
  render() {
    return (
      <View style={styles.goodsList}>
        {Goods.map(i => (
          <Good
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

class Good extends Component {
  private props: any;
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('detailPage')}>
        <View style={styles.block}>
          <Image source={this.props.image} style={{width: width / 2 - 20, height: width / 2 - 20}} />
          <Text style={styles.name}>{this.props.name}</Text>
          <Text>{this.props.text}</Text>
          <Text style={styles.price}>￥ {this.props.price}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: width / 2 - 20,
    alignItems: 'center',
    margin: 10,
    padding: 10,
  },
  goodsList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 20,
    color: '#cc6699',
  },
  name: {
    fontSize: 28,
    color: '#cc6699',
  },
});
