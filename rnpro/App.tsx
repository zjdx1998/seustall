import React, {Component} from 'react';
import GlobalHeader from './src/pages/GlobalHeader';
import SlideShow from './src/pages/SlideShow';
import {View, StyleSheet} from 'react-native';
export default class MainPages extends Component {
  render() {
    return (
      <View style={styles.baseContainer}>
        <View style={styles.headerContainer}>
          <GlobalHeader />
        </View>
        <View style={styles.slideshowContainer}>
          <SlideShow />
        </View>
        <View style={styles.slideshowContainer}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF0F5',
  },
  headerContainer: {
    flex: 1,
  },
  slideshowContainer: {
    flex: 5,
  },
});
