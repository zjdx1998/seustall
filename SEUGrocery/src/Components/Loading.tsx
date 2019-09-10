/*
  @version: 0.1
  @author: 71117133张睦婕
  @date: 2019-8-29
*/
import React, {Component} from 'react';
import {Platform, View, ActivityIndicator, Modal} from 'react-native';

export default class Loading extends Component {
  private props: any;
  private state: any;
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: !this.props.hide,
    };
  }

  close() {
    if (Platform.OS === 'android') {
      setTimeout(() => {
        this.setState({modalVisible: false});
      }, 1000);
    } else {
      this.setState({modalVisible: false});
    }
  }

  show() {
    this.setState({modalVisible: true});
  }

  render() {
    if (!this.state.modalVisible) {
      return null;
    }
    return (
      <Modal
        animationType={'none'}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: 'rgba(0,0,0,0.5)',
              width: 100,
              height: 100,
              alignItems: 'center',
            }}>
            <ActivityIndicator
              animating={true}
              color="white"
              style={{
                marginTop: 20,
                width: 60,
                height: 60,
              }}
              size="large"
            />
          </View>
        </View>
      </Modal>
    );
  }
}
