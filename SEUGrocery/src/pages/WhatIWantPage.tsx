/*
  @version: 0.0.1
  @author: 71117103 张潇艺
  @date: 2019-8-28
*/

import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  Text,
} from 'react-native';
import {Avatar} from 'react-native-elements';

import Swipeout from 'react-native-swipeout';
import LocalBackHeader from '../Components/LocalBackHeader';
import UserInfo from '../Common/UserInfo';
import ItemList from '../Common/ItemList';
import {postData} from '../Common/FetchHelper';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class WhatIWantPage extends Component {
  private props: any;
  constructor(props) {
    super(props);
    this.state = {
      data: '', //data.result为模拟的数据或服务端得到的数据
      sectionID: '',
      rowID: '',
      page: 1,
      refreshing: true,
      loading: false,
      userAvatar: '',
      token: '',
    };
    this.renderRowList = this.renderRowList.bind(this);
    UserInfo.get('avatarurl').then(url => {
      this.setState({
        userAvatar: url,
      });
    });
    UserInfo.get('token').then(tok => {
      this.setState({
        token: tok,
      });
    });
  }

  componentDidMount() {
    // alert('rua12421312');
    ItemList.getItemList().then(list => {
      //   alert(JSON.stringify(list));
      var wList = list.filter(function(e) {
        return e.sold == -1;
      });
      //wlist.forEach(item => item.select = false);
      //   this.renderRowList(wList);
      //   alert(wList);
      this.setState({data: wList});
    });
  }

  deleteWantItem = async itemid => {
    //this.Loading.show();
    const [uid, token] = await ItemList.getIdAndToken();

    let data = {
      token: token,
      itemid: itemid,
    };
    // console.log(data);
    const commonURL = 'http://inari.ml:8080/';
    const modifyURL = commonURL + 'item/delete';
    // alert(data);
    console.log(data);

    await postData(modifyURL, data)
      .then(response => {
        console.log(response);
        // Loading.close();
        alert('删除成功');
      })
      .catch(err => {
        console.error(err);
        // Loading.close();
        alert('sorry,删除失败');
      });
    //this.Loading.close();
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
                source={{uri: this.state.userAvatar}}
              />
            </View>
            <View style={styles.txtArea}>
              <Text style={styles.txtTitle}>我想买的</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerContainer} />
        <FlatList
          style={{marginTop: 12}}
          data={this.state.data}
          renderItem={this.renderRowList}
          ItemSeparatorComponent={this.separator}
          enableEmptySections={true}
          //refreshing：表明list是否在refresh的状态。
          // onRefresh：开始refresh的事件。在这个方法里开始设置refresh的时候组件的state，并在setState方法的回调里开始请求后端的数据。
          // onEndReached: 上拉加载跟个多的事件。在这里设置加载更多对应的组件状态，并在setState方法的回调里请求后端数据。
          // onEndReachedThreshold：这个值是触发onEndReached方法的阈值。值是RN的逻辑像素。
          /*refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}*/
        />
      </ScrollView>
    );
  }

  //请求数据
  //暂时没用这个函数
  requestData = () => {
    const url = 'https://api.github.com/users/futurechallenger/repos';
    fetch(url)
      .then(res => {
        console.log('started fetch');
        return res.json();
      })
      .then(res => {
        this.setState({
          data: [...this.state.data, ...res],
          error: res.error || null,
          loading: false,
          refreshing: false,
        });
      })
      .catch(err => {
        console.log('==> fetch error', err);
        this.setState({error: err, loading: false, refreshing: false});
      });
  };

  //每一栏的空袭
  separator = () => {
    return <View style={{height: 2}} />;
  };

  //刷新函数
  //暂时没用
  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
        loading: false,
        data: [],
      },
      () => {
        this.requestData();
      },
    );
  };

  //flatlist导入数据到控件
  renderRowList = item => {
    //滑动删除按钮
    const swipeoutBtns = [
      {
        backgroundColor: '#cc6699',
        color: '#ffffff',
        text: '删除',
        onPress: () =>
          Alert.alert('', '确定要删除该物品？', [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {
              text: 'OK',
              onPress: async () => {
                await this.deleteWantItem(item.item.itemid);

                ItemList.getItemList().then(list => {
                  //   alert(JSON.stringify(list));
                  var wList = list.filter(function(e) {
                    return e.sold == -1;
                  });
                  //   this.renderRowList(wList);
                  //   alert(wList);
                  this.setState({data: wList});
                });
              },
            },
          ]),
      },
    ];
    //文字内容
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('wantDetailP', {
            itemid: item.item.itemid,
            go_back_key: this.props.navigation.state.key,
          });
        }}>
        <Swipeout
          right={swipeoutBtns}
          style={{
            justifyContent: 'center',
            height: 120,
            backgroundColor: '#ffffff',
          }}
          buttonWidth={120}>
          <View style={styles.item}>
            <Text numberOfLines={1} style={styles.txtName}>
              {item.item.title}
            </Text>
            <Text numberOfLines={2} style={styles.txtDetail}>
              {item.item.note}
            </Text>
            <Text numberOfLines={1} style={styles.txtDetail}>
              最高接受价：￥{item.item.price}
            </Text>
            <Text numberOfLines={1} style={styles.txtTime}>
              {item.item.time}
            </Text>
          </View>
        </Swipeout>
      </TouchableOpacity>
    );
  };
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
  viewUserTop: {
    padding: 10,
    margin: 10,
    height: 150,
  },
  txtArea: {
    margin: 30,
  },
  txtTitle: {
    fontSize: 30,
    alignSelf: 'center',
    color: '#ffffff',
  },

  item: {
    height: 120,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5, //圆角
  },

  columnStyle: {
    margin: 10,
  },
  txtName: {
    fontSize: 20,
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 30,
    marginRight: 50,
  },
  txtDetail: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginRight: 40,
  },
  txtTime: {
    fontSize: 12,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    margin: 10,
  },
});
