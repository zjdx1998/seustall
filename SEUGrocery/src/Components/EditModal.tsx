import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import * as SP from '../Common/ScreenProperty';
const screenW = Dimensions.get('window').width;

export default class EditView extends Component {
  constructor(props) {
    super(props);
    this.show = this.show.bind(this);
    this._close = this._close.bind(this);
    this.state = {
      isShow: false,
      inputText: '',
      opacityAnimationValue: new Animated.Value(0),
      scaleAnimationValue: new Animated.Value(0),
    };
  }

  // 打开对话框
  show() {
    this.setState({
      isShow: true,
    });

    //Animated.parallel == 同时执行多个动画
    Animated.parallel([
      //Animated.timing == 推动一个值按照一个过渡曲线而随时间变化
      Animated.timing(this.state.opacityAnimationValue, {
        toValue: 1,
        duration: 200 + 100,
      }),

      Animated.spring(this.state.scaleAnimationValue, {
        toValue: 1,
        duration: 200,
        friction: 5,
      }),
    ]).start();
  }

  // 关闭对话框
  _close() {
    this.setState({isShow: false});
    this.state.opacityAnimationValue.setValue(0);
    this.state.scaleAnimationValue.setValue(0);
  }

  render() {
    if (!this.state.isShow) {
      return null;
    }

    const {ensureCallback, titleTxt} = this.props;

    return (
      // 最外层是一个半透明的黑色蒙版背景,点击的时候对话框也会消失
      <Animated.View
        style={[styles.container, {opacity: this.state.opacityAnimationValue}]}>
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 1, alignItems: 'center', paddingTop: 100}}
          onPress={this._close}>
          <Animated.View
            style={[
              styles.contentContainer,
              {transform: [{scale: this.state.scaleAnimationValue}]},
            ]}>
            <TouchableOpacity activeOpacity={1} style={styles.promptContainer}>
              <Text style={{fontSize: 15, color: 'black'}}>{titleTxt}</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.75}
                style={[styles.center, {flex: 4.5}]}
                onPress={this._close}>
                <Text style={{fontSize: 16, color: 'black'}}>取消</Text>
              </TouchableOpacity>
              <View style={[styles.line]} />
              <TouchableOpacity
                activeOpacity={0.75}
                style={[styles.center, {flex: 4.5}]}
                onPress={() => {
                  this._close();
                  // 子组件传递数据到父组件
                  ensureCallback();
                }}>
                <Text style={{fontSize: 16, color: 'black'}}>确定</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(1, 1, 1, 0.5)',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#d9d9d9',
    borderWidth: 1,
    height: 150,
    width: screenW * 0.75,
    backgroundColor: '#fff',
    // backgroundColor: 'rgb(234, 234, 235)',
    borderRadius: 5,
  },
  promptContainer: {
    height: 100,
    width: screenW * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 50,
    width: screenW * 0.75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#d9d9d9',
  },
  line: {
    height: 46,
    width: 1,
    backgroundColor: '#d9d9d9',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
