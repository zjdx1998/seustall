/*
  @version: 0.3
  @author: 71117123张建东
  @date: 2019-8-22
*/
import React, {Component} from 'react';
import MainPages from './src/pages/MainPages';
//import TotalNavigate from './src/Components/TotalNavigate';

export default class App extends Component {
  state = {
    isShowingNav: false,
  };

  render() {
    return (
      <MainPages />
      //<TotalNavigate />
    );
  }
}
