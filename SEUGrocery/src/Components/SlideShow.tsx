/*
  @version: 0.3
  @author: 71117123张建东
  @date: 2019-8-22
*/
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import React, {Component} from 'react';
const {width} = Dimensions.get('window'); //解构赋值 获取屏幕宽度

export default class SlideShow extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*
        <Swiper
          style={styles.wrapper}
          height={200}
          horizontal={false}
          autoplay
          autoplayTimeout={1}>
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Swiper>
        */}
        <Swiper
          style={styles.wrapper}
          height={240}
          autoplay
          // onMomentumScrollEnd={(e, state, context) =>
          //   console.log('--------------index:----------------', state.index)
          // }
          dot={
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.5)',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: 'yellow',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
          paginationStyle={{
            bottom: 23,
            left: null,
            right: 10,
          }}
          loop>
          <View style={styles.slide}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={require('../Common/img/banner1.png')}
            />
            <Text numberOfLines={1} />
          </View>
          <View style={styles.slide}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={require('../Common/img/banner2.png')}
            />
            <Text numberOfLines={1} />
          </View>
          <View style={styles.slide}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={require('../Common/img/banner3.png')}
            />
            <Text numberOfLines={1} />
          </View>
          <View style={styles.slide}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={require('../Common/img/banner4.png')}
            />
            <Text numberOfLines={1} />
          </View>
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: width,
    flex: 1,
  },
});
