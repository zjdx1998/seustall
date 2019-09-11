/*
  @version: 0.0.1
  @author: 71117133 张睦婕
  @date: 2019-9-10
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
import LocalBackHeader from '../Components/LocalBackHeader';
import * as SP from '../Common/ScreenProperty';
import {TouchableOpacity} from 'react-native-gesture-handler';
import UserInfo from '../Common/UserInfo';
import {postData} from '../Common/FetchHelper';
import ItemList from '../Common/ItemList';

export default class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.navigation.state.params.orderForm;
  }
  render() {
    return (
      <View>
        <Text h3>{this.state.title}</Text>
      </View>
    );
  }
}
