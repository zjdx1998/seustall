import {StyleSheet, View, Dimensions, Image, Text} from 'react-native';
import * as SP from '../Common/ScreenProperty';
//import { Image,Text} from 'react-native-elements';
import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class Good extends Component {
  private props: any;
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('detailPage', {
            itemid: this.props.itemid,
            go_back_key: this.props.navigation.state.key,
          })
        }>
        <View style={styles.block}>
          <Image
            source={this.props.image}
            style={{width: SP.WB(45), height: SP.WB(45), flex: 4}}
          />
          <Text style={styles.name}>{this.props.name}</Text>
          <Text style={styles.textdes} numberOfLines={2}>
            {' ' + this.props.text}
          </Text>
          <Text style={styles.price}>￥ {this.props.price}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: SP.WB(45),
    height: SP.HB(35),
    alignItems: 'center',
    margin: SP.WB(1),
    padding: SP.WB(1),
    flexDirection: 'column',
    flex: 1,
  },
  goodsList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 20,
    color: '#cc6699',
    flex: 1,
  },
  textdes: {
    fontSize: 12,
    color: '#000',
    flex: 1,
  },
  name: {
    fontSize: 28,
    color: '#cc6699',
    flex: 1,
  },
});
