/*
  @version: 0.3
  @author: 71117123张建东
  @date: 2019-8-22
*/
import React, {Component} from 'react';
import {Header, SearchBar} from 'react-native-elements';
import {Alert} from 'react-native';
import TotalNavigate from "./TotalNavigate";
export default class extends Component {
  state = {
    search: '',
    isClicked: false,
  };
  render() {
    const {search} = this.state;
    if(this.state.isClicked){
      this.setState({isClicked: false});
      return <TotalNavigate />;
    }
    return (
      <Header
        barStyle="light-content"
        containerStyle={{marginTop: -20}}
        placement="center"
        backgroundColor="#EED2EE"
        leftComponent={{
          icon: 'menu',
          color: '#030303',
          onPress: this._onClickList,
        }}
        centerComponent={
          <SearchBar
            containerStyle={{
              backgroundColor: '#EED2EE',
              flex: 1,
              flexDirection: 'row',
            }}
            inputContainerStyle={{
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
            }}
            placeholder="请输入您要购买的商品"
            inputStyle={{fontSize: 16}}
            onChangeText={this.updateSearch}
            lightTheme={true}
            value={search}
            showLoading={true}
          />
        }
        centerContainerStyle={{flex: 10, alignSelf: 'stretch'}}
        rightComponent={{icon: 'camera', color: '#030303'}}
      />
    );
  }
  _onClickList = () => {
    this.setState({isClicked: true});
  };
  updateSearch = (search: any) => {
    this.setState({search});
  };
}
