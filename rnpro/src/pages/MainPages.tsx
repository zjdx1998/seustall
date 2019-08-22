import React, {Component} from 'react';
import GlobalHeader from '../Components/GlobalHeader';
import SlideShow from '../Components/SlideShow';
import {View, StyleSheet, ScrollView} from 'react-native';
export default class MainPages extends Component {
  render() {
    return (
      <ScrollView style={styles.baseContainer}>
        <View style={styles.headerContainer}>
          <GlobalHeader />
        </View>
        <View style={styles.slideshowContainer}>
          <SlideShow />
        </View>
        <View style={styles.slideshowContainer}>
          <SlideShow />
        </View>
        <View style={styles.slideshowContainer}>
          <SlideShow />
        </View>
        <View style={styles.slideshowContainer}>
          <SlideShow />
        </View>
      </ScrollView>
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
