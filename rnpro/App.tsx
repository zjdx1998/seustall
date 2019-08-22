import React, {Component} from 'react';
import MainPages from './src/pages/MainPages';
import TotalNavigate from './src/Components/TotalNavigate';

export default class App extends Component {
  state = {
    isShowingNav: false,
  };

  render() {
    let MP = MainPages;
    return (
      <MainPages />
      //<TotalNavigate />
    );
  }
}
