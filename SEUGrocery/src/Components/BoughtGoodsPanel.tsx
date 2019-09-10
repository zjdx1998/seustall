/*
  @version: 0.0.1
  @author: 71117103 张潇艺
  @date: 2019-8-27
*/

import {StyleSheet, View, Dimensions, Image, Text} from 'react-native';
import React, {Component} from 'react';
const {width} = Dimensions.get('window');

import {TouchableOpacity} from 'react-native-gesture-handler';

const Goods = [
  {
    title: '米色针织开衫+牛仔裤带吊牌',
    imgurl: 'https://avatars2.githubusercontent.com/u/45632558?s=400&v=4',
    sold: 1,
    depreciatione: '10',
    price: '100',
    // campus: '九龙湖校区',
    type: '服饰鞋包',
    //info: '这还是一本书，一本很好的书，是一本非常好的书',
  },
  {
    title: '咖啡色运动鞋',
    imgurl: 'https://avatars2.githubusercontent.com/u/45632558?s=400&v=4',
    sold: 2,
    depreciatione: '9.5',
    price: '100',
    // campus: '九龙湖校区',
    type: '服饰鞋子包',
  },
  {
    title: 'MAC口红diva有小票仅手臂试色',
    imgurl: 'https://avatars2.githubusercontent.com/u/45632558?s=400&v=4',
    sold: 1,
    depreciatione: '9.5',
    price: '150',
    // campus: '九龙湖校区',
    type: '美妆护肤',
  },
];

export default class GoodsPanel extends Component {
  private props;
  state:{
    goodsList:any
  }
  constructor(props){
    super(props);
    this.state={
      goodsList:Goods,
    }
  }

  render() {
    return (
      <View style={styles.goodsList}>
        {this.state.goodsList.map(i => (
          <Good
            itemid ={i.itemid}
            imgurl={{uri: "http://hanyuu.top:8080/"+i.imgurl}}
            title={i.title}
            price={i.price}
            depreciatione={i.depreciatione}
            // campus={i.campus}
            sold={i.sold}
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
        onPress={() =>
          this.props.navigation.navigate('detailPage', {
            itemid: this.props.itemid,
            go_back_key: this.props.navigation.state.key,
          })
        }>
        <View style={styles.block}>
          <Image source={this.props.imgurl} style={{width: 150, height: 150}} />
          <View style={styles.textBlock}>
            <Text numberOfLines={1} style={styles.name}>
              {this.props.title}
            </Text>
            <Text numberOfLines={1} style={styles.howNewAndCampus}>
              {this.props.depreciatione}成新
            </Text>
            <Text numberOfLines={1} style={styles.howNewAndCampus}>
              {/* {this.props.campus} */}
            </Text>
            <Text numberOfLines={1} style={styles.price}>
              ￥ {this.props.price}
            </Text>
          </View>
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
