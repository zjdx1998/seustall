/*
  @version: 0.3
  @author: 71117123张建东
  @date: 2019-8-22
*/
import React, {Component} from 'react';
import AppTotalNavigation from './src/Components/TotalNavigate';
import AfterSignUpPage from "./src/pages/AfterSignUpPage";

export default class App extends Component {
  state = {
    isShowingNav: false,
  };

  render() {
    return <AppTotalNavigation />;
    // return <AfterSignUpPage/>
  }

}
