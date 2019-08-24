/*
  @version: 0.6
  @author: 71117123张建东
  @date: 2019-8-22
*/
import React, {Component} from 'react';
import {Header, SearchBar} from 'react-native-elements';
export default class extends Component {
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
          backgroundColor: '#EED2EE',
        }}
        containerStyle={{marginTop: -25}}
        placement="center"
        backgroundColor="#EED2EE"
        leftComponent={{
          icon: 'menu',
          color: '#030303',
          onPress: () => this.props.navigation.openDrawer(),
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
    //this.props.navigation.openDrawer();
  };
  updateSearch = (search: any) => {
    this.setState({search});
  };
}
