/*
  @version: 0.6
  @author: 71117123张建东
  @date: 2019-8-22
*/
import React, {Component} from 'react';
import {Header} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default class extends Component {
  private props: any;
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Header
        statusBarProps={{
          barStyle: 'light-content',
          backgroundColor: '#CC6699',
        }}
        placement="center"
        backgroundColor="#CC6699"
        leftComponent={
          <AntDesign
            name="left"
            size={36}
            color="#030303"
            onPress={() => this.props.navigation.goBack()}
          />
        }
      />
    );
  }
}
