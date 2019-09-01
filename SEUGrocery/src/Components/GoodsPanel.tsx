/*
  @version: 0.0.1
  @author: 71117103 张潇艺
  @date: 2019-8-26
*/

import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Alert,
  Text,
  ImageBackground,
} from 'react-native';
import React, {Component} from 'react';
const {width} = Dimensions.get('window');

import {TouchableOpacity} from 'react-native-gesture-handler';
import UserInfo from '../Common/UserInfo';

const Goods = [
  {
    title: '米色针织开衫+牛仔裤带吊牌',
    imgurl: 'https://avatars2.githubusercontent.com/u/45632558?s=400&v=4',
    sold: 1,
    depreciatione: '10',
    price: '100',
    campus: '九龙湖校区',
    classify: '服饰鞋包',
    //info: '这还是一本书，一本很好的书，是一本非常好的书',
  },
  {
    title: 'MAC口红diva有小票仅手臂试色',
    imgurl: 'https://avatars2.githubusercontent.com/u/45632558?s=400&v=4',
    sold: 0,
    depreciatione: '9.5',
    price: '150',
    campus: '九龙湖校区',
    classify: '服饰鞋子包',
  },
  {
    title: 'MAC口红diva有小票仅手臂试色',
    imgurl: 'https://avatars2.githubusercontent.com/u/45632558?s=400&v=4',
    sold: 0,
    depreciatione: '9.5',
    price: '150',
    campus: '九龙湖校区',
    classify: '美妆护肤',
    //info: '这还是一本书，一本很好的书，是一本非常好的书',
  },
];

export default class GoodsPanel extends Component {
  private props: any;
  state: {
    goodsList: any;
  };
  constructor() {
    super();
    this.state = {
      goodsList: Goods,
    };
  }
  render() {
    return (
      <View style={styles.goodsList}>
        {this.state.goodsList.map(i => (
          <Good
            itemid={i.itemid}
            image={{uri: i.imgurl}}
            name={i.title}
            price={i.price}
            howNew={i.depreciatione}
            campus={i.campus}
            isSold={i.sold}
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
        onPress={() => {
          this.props.navigation.navigate('detailPage', {
            itemid: this.props.itemid,
            go_back_key: this.props.navigation.state.key,
          });
          Alert.alert('cnm' + this.props.navigation.state.key);
        }}>
        <View style={styles.block}>
          <ImageBackground
            style={{flex: 1, height: 150, flexDirection: 'row'}}
            source={
              this.props.isSold
                ? require('../Common/img/isSold.png')
                : require('../Common/img/notSold.png')
            }>
            <Image
              source={this.props.image}
              style={{width: 150, height: 150}}
            />
            <View style={styles.textBlock}>
              <Text numberOfLines={1} style={styles.name}>
                {this.props.name}
              </Text>
              <Text numberOfLines={1} style={styles.howNewAndCampus}>
                {this.props.howNew}成新
              </Text>
              <Text numberOfLines={1} style={styles.howNewAndCampus}>
                {this.props.campus}
              </Text>
              <Text numberOfLines={1} style={styles.price}>
                ￥ {this.props.price}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: width - 20,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textBlock: {
    margin: 10,
    padding: 10,
    width: width - 20 - 20 - 150 - 20,
  },
  goodsList: {
    flex: 1,
    //flexDirection: 'row',
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 28,
    color: '#cc6699',
  },
  name: {
    fontSize: 20,
    color: '#000000',
  },
  howNewAndCampus: {
    fontSize: 14,
    color: '#000000',
    opacity: 70,
  },
});
