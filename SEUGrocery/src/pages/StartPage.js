/***启动页
 * 20190823
 * 张潇艺
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
  ImageBackground,
} from 'react-native';

export default class StartPage extends Component {
  state = {
    fadeInOpacity1: new Animated.Value(1), // 启动图1透明度初始值设为0
    fadeInOpacity2: new Animated.Value(0), // 启动图2透明度初始值设为0
    imageNum: 1,
  };

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.fadeInOpacity1, {
        toValue: 0,
        duration: 1500,
        easing: Easing.linear,
      }),
      Animated.timing(this.state.fadeInOpacity2, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
      }),
    ]).start(() => this.props.navigation.navigate('loginP'));
  }

  render() {
    const {fadeInOpacity1} = this.state;
    const {fadeInOpacity2} = this.state;
    return (
      <View style={styles.mainStyle}>
        <Animated.View
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            opacity: fadeInOpacity1,
            position: 'absolute',
          }}>
          <View>
            <StatusBar hidden="true" />
          </View>
          <Image
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}
            source={require('../Common/img/splash_screen1.png')}
          />
        </Animated.View>

        <Animated.View
          style={[
            {
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            },
            {opacity: fadeInOpacity2},
          ]}>
          <View>
            <StatusBar hidden={true} />
          </View>
          <Image
            source={require('../Common/img/splash_screen2.png')}
            style={styles.backgroundImage}
          />
        </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: null,
    height: null,
    backgroundColor: 'transparent',
  },
});
