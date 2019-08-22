import {Header, SearchBar} from 'react-native-elements';
import {Component} from 'react';
import * as React from 'react';
export default class App extends Component {
  state = {
    search: '',
  };

  updateSearch = (search: any) => {
    this.setState({search});
  };

  searchBar = () => {
    const {search} = this.state;
    return (
      <SearchBar
        placeholder="请输入您要购买的商品"
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  };

  render() {
    return (
      <Header
        placement="left"
        leftComponent={{icon: 'menu', color: '#fff'}}
        //centerComponent={this.searchBar()}
        rightComponent={{icon: 'home', color: '#fff'}}
      />
    );
  }
}
