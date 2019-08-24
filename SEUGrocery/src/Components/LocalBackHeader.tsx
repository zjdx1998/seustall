/*
  @version: 0.6
  @author: 71117123张建东
  @date: 2019-8-22
*/
import React, {Component} from 'react';
import {Header} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default class extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Header
        statusBarProps={{
          barStyle: 'light-content',
          backgroundColor: '#EED2EE',
        }}
        containerStyle={{marginTop: -25}}
        placement="center"
        backgroundColor="#EED2EE"
        leftComponent={
          <AntDesign
            name="left"
            size={30}
            color="#030303"
            onPress={() => this.props.navigation.navigate('home')}
          />
        }
      />
    );
  }
}
