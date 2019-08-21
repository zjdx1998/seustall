import React, {Component} from 'react';
import GlobalHeader from './src/pages/GlobalHeader';
import SlideShow from './src/pages/SlideShow';
import {View} from "react-native";
export default class App extends Component {
  render() {
    return (
      <View>
        <GlobalHeader />
        <SlideShow />
      </View>
    );
  }
}
