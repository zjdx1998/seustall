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
  Text,
  ImageBackground,
} from 'react-native';
import React, {Component} from 'react';
const {width} = Dimensions.get('window');

import {TouchableOpacity} from 'react-native-gesture-handler';
import UserInfo from '../Common/UserInfo';


const Goods = [
  {
    itemid:'1',
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
    itemid:'2',
    title: 'MAC口红diva有小票仅手臂试色',
    imgurl: 'https://avatars2.githubusercontent.com/u/45632558?s=400&v=4',
    sold: 0,
    depreciatione: '9.5',
    price: '150',
    campus: '九龙湖校区',
    classify: '服饰鞋子包',
  },
  {
    itemid:'3',
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
  state:{
    CurrentGoods: any,
    goodsList:any,
    showGoodsWay:any,
  }
  constructor(props){
    super(props);
    this.state={
      CurrentGoods:Goods,
      goodsList:Goods,
      showGoodsWay:this.props.showGoodsWay
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      //...this.state, nextProps
      showGoodsWay: nextProps.showGoodsWay,
    });

  }
  getOnSaleList(){

    var list = this.state.goodsList.filter(function (e) { return e.sold == 0; });

    // var allList = JSON.stringify(this.state.goodsList);
    // for(i = 0;i<num;i++){
    //   if(this.state.goodsList[i].sold==0){
    //     list = list+JSON.parse(allList[i]);
    //   }
    // }
    // alert(JSON.stringify(list));
    
    return list;
  }
  getSoldList(){
    var list = this.state.goodsList.filter(function (e) { return e.sold == 2; });

    return list;
  }



  render() {
    if(this.state.showGoodsWay=='0'){
      this.state.CurrentGoods=this.state.goodsList;
    }
    else if(this.state.showGoodsWay=='1'){
      this.state.CurrentGoods=this.getOnSaleList();
      // alert(JSON.stringify(this.getOnSaleList()));
      // this.getOnSaleList();
    }
    else {
      this.state.CurrentGoods=this.getSoldList();
      // alert(this.getSoldList());
      // this.getSoldList();
    }
    return (
      <View style={styles.goodsList}>
        {this.state.CurrentGoods.map(i => (
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
        onPress={() => this.props.navigation.navigate('detailPage',{
          itemid:this.props.itemid
        })}>
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
