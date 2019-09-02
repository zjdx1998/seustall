/*
  @version: 0.3
  @author: 71117123张建东
  @date: 2019-8-22
*/

import React, {Component} from 'react';
import GlobalHeader from '../Components/GlobalHeader';
import SlideShow from '../Components/SlideShow';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import RecommendationArea from '../Components/RecommendationArea';
import ClassificationOfGoods from '../Components/ClassificationOfGoods';
import {Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ActionButton from 'react-native-action-button';

export default class MainPages extends Component {
  private props: any;

  render() {
    return (
      <View style={styles.baseContainer}>
        <ScrollView style={styles.baseContainer}>
          <View style={styles.headerContainer}>
            <GlobalHeader navigation={this.props.navigation} />
          </View>
          <View style={styles.slideshowContainer}>
            <SlideShow />
          </View>
          <View style={styles.slideshowContainer}>
            <ClassificationOfGoods />
          </View>
          <View style={styles.headerContainer} />
          <View style={styles.slideshowContainer} />
          <View style={styles.slideshowContainer}>
            <SlideShow />
          </View>
          <View style={styles.slideshowContainer}>
            <SlideShow />
          </View>
          <View style={styles.recommendationAreaContainer}>
            <RecommendationArea navigation={this.props.navigation} />
          </View>
          <View style={styles.headerContainer}>
            <Button
              onPress={() => this.props.navigation.navigate('detailPage')}
              title=" MyHomeScreen ----> open drawer"
            />
          </View>
        </ScrollView>
        <ActionButton
          verticalOrientation="up"
          buttonColor="#cc6699"
          size={70}
          renderIcon={() => (
            <View style={styles.actionButtonView}>
              <Icon name="pencil-alt" style={{color: '#ffffff'}} size={30} />
              <Text
                style={{color: '#ffffff', fontSize: 12, alignSelf: 'center'}}>
                发 布
              </Text>
            </View>
          )}>
          <ActionButton.Item
            buttonColor="#e6b6ce"
            title="我想卖"
            textContainerStyle={{backgroundColor: '#ffffff', opacity: 0.75}}
            textStyle={{color: '#7d2954'}}
            onPress={() => {
              this.props.navigation.navigate('release_good', {
                get_back_key: this.props.navigation.state.key,
              });
            }}>
            <Icon
              name="coins"
              style={styles.actionButtonIcon}
              color={'#ffffff'}
              size={30}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#d582ac"
            title="我想买"
            textContainerStyle={{backgroundColor: '#ffffff', opacity: 0.75}}
            textStyle={{color: '#7d2954'}}
            onPress={() => {
              this.props.navigation.navigate('release_want', {
                get_back_key: this.props.navigation.state.key,
              });
            }}>
            <Icon
              name="shopping-basket"
              style={styles.actionButtonIcon}
              color={'#ffffff'}
              size={30}
            />
          </ActionButton.Item>
        </ActionButton>
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
  ClassificationContainer: {
    flex: 3,
  },
  recommendationAreaContainer: {
    flex: 20,
  },
  actionButtonView: {
    justifyContent: 'center',
  },
});
