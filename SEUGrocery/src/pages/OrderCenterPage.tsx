/*
  @version: 0.1
  @author: 71117133 张睦婕
  @date: 2019-9-10
*/
import React, {Component} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import LocalBackHeader from '../Components/LocalBackHeader';
import UserInfo from '../Common/UserInfo';
import {postData} from '../Common/FetchHelper';
import * as SP from '../Common/ScreenProperty';

export default class OrderCenterPage extends Component {
  private props: any;

  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      refuseList: [],
      agreeList: [],
      finishedList: [],
      token: '',
      uuid: '',
      isRefreshing: false,
    };
  }

  async componentDidMount() {
    console.log('DidMount');
    let uuid = await UserInfo.get('uuid');
    // console.log(uuid);
    this.setState({uuid: uuid});
    let token = await UserInfo.get('token');
    this.setState({token: token});
    this.getInfo();
  }

  getInfo = () => {
    this.setState({orderList: []});
    this.setState({refuseList: []});
    this.setState({agreeList: []});
    this.setState({finishedList: []});
    postData('http://hanyuu.top:8080/user/chat/fetchall', {
      token: this.state.token,
    }).then(response => {
      console.log('news', response);
      for (let i of response.data) {
        //request item message
        if (i.type == '0' && i.to == this.state.uuid) {
          fetch('http://hanyuu.top:8080/item/' + i.data)
            .then(response => response.json())
            .then(item => {
              // console.log('item', item);
              if (item.status == 'success') {
                fetch('http://hanyuu.top:8080/user/' + i.from)
                  .then(re => re.json())
                  .then(user => {
                    let list = this.state.orderList;
                    console.log('list', list);
                    console.log('user', user);
                    list.push({message: i, user: user, item: item});
                    this.setState({orderList: list});
                  });
              }
            });
        }

        //refuse buy request
        if (i.type == '-1' && i.to == this.state.uuid) {
          fetch('http://hanyuu.top:8080/item/' + i.data)
            .then(response => response.json())
            .then(item => {
              // console.log('item', item);
              if (item.status == 'success') {
                fetch('http://hanyuu.top:8080/user/' + i.from)
                  .then(re => re.json())
                  .then(user => {
                    let list = this.state.refuseList;
                    console.log('list', list);
                    console.log('user', user);
                    list.push({message: i, user: user, item: item});
                    this.setState({refuseList: list});
                  });
              }
            });
        }

        //agree messages
        if (i.type == '-2' && i.to == this.state.uuid) {
          fetch('http://hanyuu.top:8080/item/' + i.data)
            .then(response => response.json())
            .then(item => {
              // console.log('item', item);
              if (item.status == 'success') {
                fetch('http://hanyuu.top:8080/user/' + i.from)
                  .then(re => re.json())
                  .then(user => {
                    let list = this.state.agreeList;
                    console.log('list', list);
                    console.log('user', user);
                    list.push({message: i, user: user, item: item});
                    this.setState({agreeList: list});
                  });
              }
            });
        }

        //finish messages
        if (i.type == '-3' && i.to == this.state.uuid) {
          fetch('http://hanyuu.top:8080/item/' + i.data)
            .then(response => response.json())
            .then(item => {
              // console.log('item', item);
              if (item.status == 'success') {
                fetch('http://hanyuu.top:8080/user/' + i.from)
                  .then(re => re.json())
                  .then(user => {
                    let list = this.state.finishedList;
                    console.log('list', list);
                    console.log('user', user);
                    list.push({message: i, user: user, item: item});
                    this.setState({finishedList: list});
                  });
              }
            });
        }
      }
    });
  };

  _onRefresh = () => {
    this.getInfo();
  };

  render() {
    return (
      <ScrollView
        style={styles.baseContainer}
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
        <View style={styles.headerContainer}>
          <LocalBackHeader navigation={this.props.navigation} />
        </View>
        <Text h3 style={{alignSelf: 'center', color: 'white', top: -SP.HB(5)}}>
          订单中心
        </Text>
        <View style={{top: -SP.HB(3)}}>
          {this.state.orderList.map((i, j) => {
            return (
              <View style={styles.orderContainer}>
                <Text style={{alignSelf: 'center', fontSize: 20}}>
                  交易请求
                </Text>
                <Text style={{color: '#cc6699'}}>{i.user.username} </Text>
                <Text>想要购买您的 </Text>
                <Text style={{color: '#cc6699'}}>{i.item.title} </Text>
                <Text>您是否同意呢？</Text>
                <View style={{flexDirection: 'row'}}>
                  <Button
                    title="拒绝"
                    onPress={() => {
                      let data = {
                        token: this.state.token,
                        id: i.message.id,
                      };
                      console.log('data', data);
                      let data1 = {
                        type: -1,
                        data: i.item.itemid,
                        token: this.state.token,
                        to: i.message.from,
                      };
                      postData(
                        'http://hanyuu.top:8080/user/chat/push',
                        data1,
                      ).then(response => {
                        console.log(response);
                        if (response.status == 'success') {
                          alert('成功拒绝对方的购买请求');
                        }
                      });
                      postData(
                        'http://hanyuu.top:8080/user/want/delete',
                        data,
                      ).then(res => {
                        console.log('delete', res);
                        this.getInfo();
                      });
                    }}
                    buttonStyle={styles.button}
                  />
                  <Button
                    title="同意"
                    onPress={() => {
                      let data = {
                        token: this.state.token,
                        to: i.message.from,
                        itemid: i.message.data,
                      };
                      console.log('order', data);
                      postData('http://hanyuu.top:8080/item/order', data).then(
                        response => {
                          console.log('res', response);
                          if (response.status == 'success') {
                            alert('您已经同意交易，请尽快发货~');
                            postData(
                              'http://hanyuu.top:8080/user/want/delete',
                              data,
                            ).then(res => {
                              console.log('delete', res);
                              this.getInfo();
                            });
                          }
                        },
                      );
                      let data1 = {
                        type: -2,
                        data: i.item.itemid,
                        token: this.state.token,
                        to: i.message.from,
                      };
                      postData(
                        'http://hanyuu.top:8080/user/chat/push',
                        data1,
                      ).then(response => {
                        console.log(response);
                        if (response.status == 'success') {
                          console.log('message -2 send success');
                        }
                      });
                    }}
                    buttonStyle={styles.button}
                  />
                  <Button
                    title="跟TA聊天"
                    onPress={() => {
                      // this.props.navigation.navigate('chatP',{
                      //     uuid: i.user.uuid,
                      //     username: i.user.username,
                      //     title: i.item.title,
                      //     avatarurl: i.user.avatarurl,
                      // })
                    }}
                    buttonStyle={styles.button}
                  />
                </View>
              </View>
            );
          })}
        </View>

        <View style={{top: -SP.HB(3)}}>
          {this.state.refuseList.map((i, j) => {
            return (
              <View style={styles.orderContainer}>
                <Text style={{alignSelf: 'center', fontSize: 20}}>
                  订单被拒
                </Text>
                <Text style={{color: '#cc6699'}}>{i.user.username} </Text>
                <Text>拒绝了关于</Text>
                <Text style={{color: '#cc6699'}}>{i.item.title} </Text>
                <Text>的交易请求</Text>
                <View style={{flexDirection: 'row'}}>
                  <Button
                    title="我知道了"
                    onPress={() => {
                      let data = {
                        token: this.state.token,
                        id: i.message.id,
                      };
                      postData(
                        'http://hanyuu.top:8080/user/want/delete',
                        data,
                      ).then(res => {
                        console.log('delete', res);
                        this.getInfo();
                      });
                    }}
                    buttonStyle={styles.button}
                  />

                  <Button
                    title="跟TA聊天"
                    onPress={() => {
                      // this.props.navigation.navigate('chatP',{
                      //     uuid: i.user.uuid,
                      //     username: i.user.username,
                      //     title: i.item.title,
                      //     avatarurl: i.user.avatarurl,
                      // })
                    }}
                    buttonStyle={styles.button}
                  />
                </View>
              </View>
            );
          })}
        </View>

        <View style={{top: -SP.HB(3)}}>
          {this.state.agreeList.map((i, j) => {
            return (
              <View style={styles.orderContainer}>
                <Text style={{alignSelf: 'center', fontSize: 20}}>
                  等待收货
                </Text>
                <Text style={{color: '#cc6699'}}>{i.user.username} </Text>
                <Text>同意了关于</Text>
                <Text style={{color: '#cc6699'}}>{i.item.title} </Text>
                <Text>的交易请求</Text>
                <View style={{flexDirection: 'row'}}>
                  <Button
                    title="已收到货"
                    onPress={() => {
                      let data = {
                        token: this.state.token,
                        itemid: i.item.itemid,
                      };
                      postData('http://hanyuu.top:8080/item/trade', data).then(
                        res => {
                          let data1 = {
                            token: this.state.token,
                            to: i.message.from,
                            type: -3,
                            data: i.item.itemid,
                          };
                          postData(
                            'http://hanyuu.top:8080/user/chat/push',
                            data1,
                          ).then(res => {
                            console.log('delete', res);
                            this.getInfo();
                          });
                        },
                      );
                    }}
                    buttonStyle={styles.button}
                  />

                  <Button
                    title="终止交易"
                    onPress={() => {
                      let data = {
                        token: this.state.token,
                        itemid: i.message.data,
                      };
                      postData('http://hanyuu.top:8080/item/reset', data);
                      let data1 = {
                        token: this.state.token,
                        id: i.message.id,
                      };
                      postData(
                        'http://hanyuu.top:8080/user/want/delete',
                        data1,
                      ).then(res => {
                        console.log('delete', res);
                        this.getInfo();
                      });
                    }}
                    buttonStyle={styles.button}
                  />
                </View>
              </View>
            );
          })}
        </View>

        <View style={{top: -SP.HB(3)}}>
          {this.state.finishedList.map((i, j) => {
            return (
              <View style={styles.orderContainer}>
                <Text style={{color: '#cc6699'}}>{i.user.username} </Text>
                <Text>已经收到您的</Text>
                <Text style={{color: '#cc6699'}}>{i.item.title} </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
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
  orderContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    margin: SP.WB(1),
    padding: SP.WB(2),
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    marginLeft: SP.WB(2),
    marginRight: SP.WB(2),
    backgroundColor: '#cc6699',
    borderRadius: 20,
  },
});
