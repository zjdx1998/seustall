/*
  @version: 0.6
  @author: 71117123张建东
  @date: 2019-8-22
*/
import React, {Component} from 'react';
import {Header, SearchBar} from 'react-native-elements';
export default class extends Component {
  private props: any;
  constructor(props) {
    super(props);
  }
  state = {
    search: '',
  };
  render() {
    const {search} = this.state;
    return (
      <Header
        statusBarProps={{
          barStyle: 'light-content',
          backgroundColor: '#CC6699',
        }}
        containerStyle={{marginTop: 0}}
        placement="center"
        backgroundColor="#CC6699"
        leftComponent={{
          icon: 'menu',
          color: '#030303',
          onPress: () => this.props.navigation.openDrawer(),
          size: 30,
        }}
        centerComponent={
          <SearchBar
            searchIcon={{size: 30}}
            containerStyle={{
              backgroundColor: '#CC6699',
              flex: 1,
              flexDirection: 'row',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            inputContainerStyle={{
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
            }}
            placeholder="请输入您要购买的商品"
            inputStyle={{fontSize: 16}}
            onChangeText={this.updateSearch}
            lightTheme="Default"
            value={search}
            showLoading={true}
          />
        }
        centerContainerStyle={{flex: 9, marginTop: -8}}
        rightComponent={{
          icon: 'camera',
          color: '#030303',
          backgroundColor: '#CC6699',
          size: 30,
        }}
      />
    );
  }
  _onClickList = () => {
    //this.props.navigation.openDrawer();
  };
  updateSearch = (search: any) => {
    this.setState({search});
  };
}
