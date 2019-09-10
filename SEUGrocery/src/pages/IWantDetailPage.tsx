/*
  @version: 0.0.1
  @author: 71117417张潇艺
  @date: 2019-9-9
*/
import React, {Component} from 'react';
import {
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {
  Text,
  Button,
  ThemeProvider,
  Image,
  Avatar,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LocalBackHeader from '../Components/LocalBackHeader';
import * as SP from '../Common/ScreenProperty';
import {TouchableOpacity} from 'react-native-gesture-handler';
import UserInfo from '../Common/UserInfo';
import {postData} from '../Common/FetchHelper';
import ItemList from '../Common/ItemList';

const itemURL = 'http://hanyuu.top:8080/item/';
const userURL = 'http://hanyuu.top:8080/user/';
const addFavUrl = 'http://hanyuu.top:8080/fav/add';
const queryFavUrl = 'http://hanyuu.top:8080/fav/query';
const deleteFavUrl = 'http://hanyuu.top:8080/fav/delete';

var {height, width} = Dimensions.get('window');
export default class IWantDetailPage extends Component {
  private props: any;

  constructor(props) {
    super(props);
    this.state.uuid = props;
    this.state = {
      isCustomer: true,
      isFavorite: false,
      button: 'other',
      itemid: '',
      uuid: '',
      title: '',
      type: -1,
      price: 0.0,
      imgurl: '',
      depreciatione: '',
      note: '',
      sold: 0,
      username: '',
      avatorurl: '',
    };
  }

  fetchData = async () => {
    // setTimeout(() => {
    //     alert(this.props.navigation.state.params.itemid)

    // }, 100);

    if (this.props.navigation.state.params.itemid == this.state.itemid) {
      //     console.log('para',this.props.navigation.state.params.itemid);
      //     console.log('state',this.state.itemid);
      return;
    } else {
      let my_uuid = await UserInfo.get('uuid');
      let token = await UserInfo.get('token');
      this.setState({token: token});
      fetch(itemURL + this.props.navigation.state.params.itemid)
        .then(response => response.json())
        .then(rT => {
          if (rT.status == 'success') {
            this.setState({
              itemid: rT.itemid,
              uuid: rT.uuid,
              title: rT.title,
              price: rT.price,
              imgurl: rT.imgurl,
              note: rT.note,
              depreciatione: rT.depreciatione,
            });
            fetch(userURL + rT.uuid)
              .then(res => res.json())
              .then(user => {
                console.log(user);
                this.setState({
                  username: user.username,
                  avatorurl: 'http://hanyuu.top:8080/' + user.avatarurl,
                  itemid: rT.itemid,
                });
                if (my_uuid == rT.uuid) {
                  this.setState({button: 'me'});
                } else {
                  this.setState({button: 'other'});
                }
                ItemList.getFavList().then(list => {
                  let isfav = false;
                  for (var i of list.res) {
                    if (i.itemid == rT.itemid) {
                      isfav = true;
                    }
                  }
                  this.setState({
                    isFavorite: isfav,
                  });
                });
                //  alert("http://hanyuu.top:8080/"+rT.imgurl.value);
              })
              .catch(e => {
                console.log('Oops, error');
                // Alert.alert('cnm');
              });
          }
          console.log(rT);
        })
        .catch(e => {
          console.log('Oops, error');
          // Alert.alert('cnm');
        });
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    this.fetchData();
  }

  state = {
    itemid: '',
    uuid: '',
    title: '',
    type: -1,
    price: 0.0,
    imgurl: '',
    depreciatione: '',
    note: '',
    sold: 0,
    username: '',
    avatorurl: '',
  };

  addFav() {
    UserInfo.get('token').then(toke => {
      postData(addFavUrl, {
        token: toke,
        data: '[' + this.state.itemid + ']',
      }).then();
    });
  }

  deleteFav() {
    UserInfo.get('token').then(toke => {
      postData(deleteFavUrl, {
        token: toke,
        data: '[' + this.state.itemid + ']',
      }).then();
    });
  }

  render() {
    return (
      <ScrollView style={styles.test}>
        <View style={{height: SP.HB(15)}}>
          <LocalBackHeader navigation={this.props.navigation} />
        </View>
        <Text style={styles.infoTitle}>求购物品名： </Text>
        <Text style={styles.title}>{this.state.title}</Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('userInformation')}>
          <View style={styles.userBanner}>
            <View style={styles.avator}>
              <Avatar
                rounded
                size="medium"
                source={{uri: this.state.avatorurl}}
              />
            </View>
            <View style={styles.center}>
              <Text style={styles.username}>{this.state.username}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>最高可接受价： </Text>
          <Text style={styles.priceTag}>￥ {this.state.price.toFixed(2)}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>最低可接受商品折旧：</Text>
          <Text style={styles.infoTitle}>{this.state.depreciatione} 成新</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>校区：</Text>
          <Text style={styles.infoTitle}>{'九龙湖'}</Text>
        </View>
        <Text style={styles.infoTitle}>详细描述:</Text>
        <Text style={styles.note}>{this.state.note}</Text>
        {/*{this.state.isCustomer ?*/}
        <View style={{opacity: this.state.button == 'other' ? 1 : 0}}>
          <View style={styles.contractButton}>
            {/*<TouchableOpacity
                        style={[styles.buttonStyle, {backgroundColor: '#cc6699'}]}
                        onPress={() => {
                            //
                            //
                        }}>
                        <Text
                            style={
                                [styles.textStyle, {color: 'white'}]
                            }>
                            提供商品
                        </Text>
                    </TouchableOpacity>*/}

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                this.props.navigation.navigate('chatP', {
                  uuid_chat: this.state.uuid,
                  username_chat: this.state.username,
                  title_chat: this.state.title,
                  avatarurl_chat: this.state.avatorurl,
                  type_chat: 1,
                });
              }}>
              <Text style={styles.textStyle}>联系买家</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.favoriteStyle}
              onPress={() => {
                if (!this.state.isFavorite) {
                  this.addFav();
                } else {
                  this.deleteFav();
                }
                this.setState({isFavorite: !this.state.isFavorite});
                //
              }}>
              <Icon
                solid={this.state.isFavorite}
                name="star"
                color={'#cc6699'}
                size={20}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: '#cc6699',
                  margin: 5,
                }}>
                {this.state.isFavorite === true ? '取消收藏' : '收藏'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*:
                    <View style={styles.contractButton}>
                        <TouchableOpacity
                            style={styles.favoriteStyle}
                            onPress={() => {
                                //
                                //
                            }}>
                            <Icon
                                name="pen"
                                color={'#cc6699'}
                                size={20}
                                style={{marginLeft: 20}}
                            />
                            <Text
                                style={
                                    styles.textStyle
                                }>
                                编辑
                            </Text>
                        </TouchableOpacity>
                    </View>
                }*/}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: '#fff0f5',
  },
  img: {
    width: width - 10,
    height: width - 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  priceTag: {
    color: '#cc6699',
    fontSize: 40,
    margin: 10,
  },
  title: {
    fontSize: 25,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 20,
    marginHorizontal: 10,
    color: '#cc6699',
  },
  note: {
    fontSize: 15,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  userBanner: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  avator: {
    marginRight: 20,
  },
  username: {
    fontSize: 20,
    color: '#444444',
  },
  center: {
    justifyContent: 'center',
    margin: 5,
  },
  contractButton: {
    justifyContent: 'space-evenly',
    margin: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-end',
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 5,
    width: width / 3 + 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteStyle: {
    padding: 10,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    color: '#cc6699',
    fontSize: 20,
    padding: 10,
    marginHorizontal: 10,
  },
});
