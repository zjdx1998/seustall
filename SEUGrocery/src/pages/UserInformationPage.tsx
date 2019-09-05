/*
  @version: 0.1
  @author: 71117103张潇艺
  @date: 2019-8-28
*/
import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Text} from 'react-native-elements';

import LocalBackHeader from '../Components/LocalBackHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import GoodsPanel from '../Components/GoodsPanel';
import RecommendationArea from '../Components/RecommendationArea';

export default class UserInformationPage extends Component {
  private props: any;
  constructor(props) {
    super(props);
    //this.state.uuid = props;
    this.state = {
      showGoodsWay: '0',
    };
  }

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
                source={require('../Common/img/avatar.png')}
              />
            </View>
            <View style={styles.txtArea}>
              <Text style={styles.txtTitle}>这里是名字</Text>
              <View style={styles.viewId}>
                <View style={styles.viewIfId}>
                  <Text style={{color: '#cc6688', fontSize: 10, padding: 1}}>
                    已认证
                  </Text>
                </View>
                <Text style={styles.txtId}>1234567</Text>
              </View>
              <Text numberOfLines={2} style={styles.txtInfo}>
                这里是个人简介How can you benefit with a certificate from the
                American Certification Institute
              </Text>
              <TouchableOpacity style={styles.viewEdit}
              onPress={()=>this.props.navigation.navigate('release_info')}>
                <Icon
                  name="pencil-square-o"
                  style={{color: '#cc6699'}}
                  size={15}
                />
                <Text style={styles.txtEdit}>编辑个人资料</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.selectContainer}>
          <TouchableOpacity
            onPress={() => {
              this.setState({showGoodsWay: '0'});
            }}
            activeOpacity={0.2}
            focusedOpacity={0.5}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
              }}>
              <Text style={{color: '#cc6699'}}>全部</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({showGoodsWay: '1'});
            }}
            activeOpacity={0.2}
            focusedOpacity={0.5}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
              }}>
              <Text style={{color: '#cc6699'}}>未卖出</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({showGoodsWay: '2'});
            }}
            activeOpacity={0.2}
            focusedOpacity={0.5}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
              }}>
              <Text style={{color: '#cc6699'}}>已卖出</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.recommendationAreaContainer}>
          <RecommendationArea navigation={this.props.navigation} />
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
  viewUserTop: {
    padding: 10,
    margin: 10,
    height: 150,
  },
  txtArea: {
    marginLeft: 10,
    padding: 10,
    marginBottom: 10,
  },
  headerArea: {
    alignItems: 'center',
    backgroundColor: '#cc6699',
    flexDirection: 'row',
  },
  selectContainer: {
    flex: 1,
    height: 25,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  GoodsAreaContainer: {
    flex: 20,
  },
  selectText: {
    color: '#cc6699',
  },
  txtTitle: {
    fontSize: 30,
    marginTop: 10,
    color: '#ffffff',
  },
  viewId: {
    width: 100,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewIfId: {
    margin: 5,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  txtId: {
    fontSize: 15,
    color: '#ffffff',
  },
  txtInfo: {
    fontSize: 13,
    marginTop: 5,
    color: '#ffffff',
    width: 250,
  },
  viewEdit: {
    width: 90,
    marginTop: 10,
    height: 20,
    flexDirection: 'row',
    backgroundColor: '#FFF0F5',
    opacity: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  txtEdit: {
    marginLeft: 3,
    alignSelf: 'center',
    color: '#cc6699',
    fontSize: 10,
  },
});
