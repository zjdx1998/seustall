/**
 zmj
 2019/9/8
 **/
import React, {Component} from 'react';
import {View, ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import * as SP from '../Common/ScreenProperty';

export default class LoadingMore extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      isLoading: false,
    };
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            size={'small'}
            color={'#cc6699'}
            animating={true}
            style={{width: SP.WB(15), height: SP.WB(15)}}
          />
          <Text
            style={{
              color: '#bbb',
              fontSize: 15,
              marginLeft: SP.WB(10),
            }}>
            正在加载...
          </Text>
        </View>
      );
    } else if (this.props.onLoading) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.setState({
              isLoading: true,
            });
            this.props.onLoading && this.props.onLoading();
            setTimeout(() => {
              this.setState({
                isLoading: false,
              });
            }, 5000);
          }}>
          <Text
            style={{
              color: '#bbb',
              fontSize: 15,
              alignSelf: 'center',
              padding: SP.WB(5),
            }}>
            点击加载更多...
          </Text>
        </TouchableOpacity>
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoading: nextProps.isLoading,
    });
  }
}
