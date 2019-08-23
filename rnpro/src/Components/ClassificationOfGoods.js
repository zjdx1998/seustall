import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Divider, Text} from 'react-native-elements';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={styles.container_col}>
        <View style={styles.title}>
          <Icon name="pagelines" type="font-awesome" />
          <Text h4> 杂货百般</Text>
        </View>
        <Divider style={styles.line} />
        <View style={styles.container_row}>
          <View>
            <Icon
              reverse
              name="phonelink"
              // type='font-awesome'
              color={'#517fa4'}
              onPress={() => {}}
            />
            <Text>电子产品</Text>
          </View>

          <View>
            <Icon
              reverse
              name="shopping-bag"
              type="font-awesome"
              color={'#CC6655'}
              onPress={() => {}}
            />
            <Text>服饰鞋包</Text>
          </View>

          <View>
            <Icon
              reverse
              name="bicycle"
              type="font-awesome"
              color={'#5154a4'}
              onPress={() => {}}
            />
            <Text>交通工具</Text>
          </View>

          <View>
            <Icon
              reverse
              name="magic"
              type="font-awesome"
              color={'#f50'}
              onPress={() => {}}
            />
            <Text>美妆个护</Text>
          </View>
        </View>

        <View style={styles.container_row}>
          <View>
            <Icon
              reverse
              name="umbrella"
              type="font-awesome"
              color={'#989976'}
              onPress={() => {}}
            />
            <Text>日常用品</Text>
          </View>

          <View>
            <Icon
              reverse
              name="book"
              type="font-awesome"
              color={'#ab4387'}
              onPress={() => {}}
            />
            <Text>书本文具</Text>
          </View>

          <View>
            <Icon
              reverse
              name="directions-run"
              // type='font-awesome'
              color={'#98cc99'}
              onPress={() => {}}
            />
            <Text>运动健身</Text>
          </View>

          <View>
            <Icon
              reverse
              name="ellipsis-h"
              type="font-awesome"
              color={'#980403'}
              onPress={() => {}}
            />
            <Text>其他商品</Text>
          </View>
        </View>
        <Divider style={styles.line} />
        <Text>
          这是一句用来测试分割线的文本，他看起来没什么用，但是如果没有它，就看不到下面的分割线
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container_row: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container_col: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  line: {
    height: 4,
    backgroundColor: '#CC6699',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
