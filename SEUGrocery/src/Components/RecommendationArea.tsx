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
  ScrollView,
  RefreshControl,
} from 'react-native';
import * as SP from '../Common/ScreenProperty';
//import { Image,Text} from 'react-native-elements';
import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Good from '../Common/ItemBlock';
import {Divider, ListItem} from 'react-native-elements';
import LoadingMore from './LoadingMore';
const {width} = Dimensions.get('window'); //解构赋值 获取屏幕宽度

const tips = ['商品信息', '求购信息'];

export default class RecommendationArea extends Component {
  state = {
    left: 0,
    goalType: 0,
    left: 0,
    loadMore: false,
  };

  constructor() {
    super();
  }

  /**
   * scrollview滑动的时候
   * @private
   */
  _onScroll(event) {
    if (this.state.loadMore) {
      return;
    }
    let y = event.nativeEvent.contentOffset.y;
    let height = event.nativeEvent.layoutMeasurement.height;
    let contentHeight = event.nativeEvent.contentSize.height;
    console.log('offsetY-->' + y);
    console.log('height-->' + height);
    console.log('contentHeight-->' + contentHeight);
    if (y + height >= contentHeight - 20) {
      this.setState({
        loadMore: true,
      });
    }
  }

  /**
   * 显示上啦加载view
   * @private
   */
  _renderLoadMore() {
    return (
      <LoadingMore
        isLoading={this.state.loadMore}
        onLoading={() => {
          this.props.refresh();
        }}
      />
    );
  }

  _onRefresh = () => {
    this.props.refresh();
    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 5000);
  };

  private props: any;
  render() {
    return (
      <ScrollView
        onScroll={this._onScroll.bind(this)}
        scrollEventThrottle={50}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor={'#ff0000'}
            title="Loading..."
            titleColor={'#00ff00'}
            colors={['#cc6699', '#6699cc', '#99cc66']}
            progressBackgroundColor={'#fff'}
          />
        }>
        <View style={styles.container_row}>
          {tips.map((i, j) => {
            return (
              <View style={styles.mode}>
                <Text
                  style={styles.typeTip}
                  onPress={() => {
                    this.setState({goalType: j, left: -1 * SP.WB(100) * j});
                  }}>
                  {i}
                </Text>
                <Divider
                  style={[
                    styles.line,
                    {opacity: j === this.state.goalType ? 1 : 0},
                  ]}
                />
              </View>
            );
          })}
        </View>
        <View style={[styles.body, {left: this.state.left}]}>
          <ScrollView>
            <View style={{width: SP.WB(100)}}>
              <View style={styles.goodsList}>
                {this.props.list.map(i => (
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
            </View>
          </ScrollView>
          <View>
            <ScrollView style={{width: SP.WB(100)}}>
              <View style={{marginHorizontal: 10}}>
                {this.props.wantList.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('wantDetailP', {
                          itemid: item.itemid,
                          go_back_key: this.props.navigation.state.key,
                        });
                      }}>
                      <ListItem
                        title={item.name}
                        subtitle={
                          <View>
                            <View style={{}}>
                              <Text>{item.info}</Text>
                              <Text style={{color: '#cc6699'}}>
                                最高接受价：￥{item.price}
                              </Text>
                            </View>
                          </View>
                        }
                        leftAvatar={{source: require('../Common/img/need.png')}}
                        bottomDivider
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
        {this._renderLoadMore()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container_row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  searchBar: {
    width: SP.WB(70),
    backgroundColor: '#eee',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  input: {
    backgroundColor: '#ddd',
  },
  mode: {
    justifyContent: 'center',
    marginTop: SP.HB(1),
    marginBottom: SP.HB(2),
    marginLeft: SP.WB(5),
    marginRight: SP.WB(5),
  },
  line: {
    backgroundColor: '#cc6699',
    height: 3,
  },
  typeTip: {
    fontSize: 20,
  },
  goodsList: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginLeft: SP.WB(2.5),
  },

  body: {
    flexDirection: 'row',
    width: SP.WB(200),
  },
});
