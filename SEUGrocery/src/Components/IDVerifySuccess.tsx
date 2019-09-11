/*
  @version: 0.1
  @author: 71117133张睦婕
  @date: 2019-9-4
*/
import React, {Component} from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import * as SP from '../Common/ScreenProperty';

export default class IDVerifySuccess extends Component {
  private props: any;

  _setModalVisible(visible) {
    this.props.callback(visible);
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={styles.container}>
          <View
            style={{
              height: SP.HB(33),
              width: SP.WB(80),
              margin: SP.H(50),
              backgroundColor: 'white',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#eee',
              }}>
              <Image
                style={{top: SP.H(-160), width: SP.W(320), height: SP.H(320)}}
                source={require('../Common/img/CatWithFlower.png')}
              />
              <Text style={{fontSize: 26, color: '#cc6699', top: SP.H(-160)}}>
                恭喜您，认证成功
              </Text>
            </View>
            <TouchableHighlight
              onPress={() => {
                this._setModalVisible(!this.props.modalVisible);
                this.props.navigation.navigate('home');
              }}
              style={{
                height: SP.H(80),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>返回首页</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
