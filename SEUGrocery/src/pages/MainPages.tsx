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
import IDReminder from "../Components/IDReminder";
import * as TL from '../Common/testItemList';
import {list} from "../Common/testItemList";

export default class MainPages extends Component {
  private props: any;
  state={
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  refresh(){
      alert('刷新')
  }


  render() {
    return (
        <View style={styles.baseContainer}>
          <ScrollView
              style={styles.baseContainer}
          >
            <View style={styles.headerContainer}>
              <GlobalHeader navigation={this.props.navigation} />
            </View>
            <View style={styles.slideshowContainer}>
              <SlideShow />
            </View>
            <View style={styles.ClassificationContainer}>
              <ClassificationOfGoods navigation={this.props.navigation}/>
            </View>
            <View style={styles.headerContainer} />
            <View style={styles.slideshowContainer} />
            <View style={{backgroundColor:'#fff',justifyContent: 'center',marginHorizontal:10}}>
              <Text style={{fontSize:20,color:'#cc6699', alignSelf:'center'}}>为你推荐</Text>
            </View>
            <View style={styles.recommendationAreaContainer}>
              <RecommendationArea
                  navigation={this.props.navigation}
                  list={TL.list}
                  wantList={TL.list}
              />
            </View>
            <View style={styles.headerContainer}>
              <Button
                  onPress={() => this.setModalVisible(true)}
                  title="去认证"
                  buttonStyle={{backgroundColor:'#cc6699'}}
              />
            </View>
              <IDReminder
              modalVisible={this.state.modalVisible}
              content={this.state.content}
              callback={this.setModalVisible.bind(this)}
              navigation={this.props.navigation}
          >
          </IDReminder>
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
                textContainerStyle={{backgroundColor: '#ffffff', opacity: 0.8}}
                textStyle={{color: '#7d2954'}}
                onPress={() => {
                  this.props.navigation.navigate('release_good', {
                    get_back_key: this.props.navigation.state.key,
                  });
                }}>
              <View style = {styles.actionButtonView}>
                <Icon
                    name="coins"
                    style={styles.actionButtonIcon}
                    color={'#ffffff'}
                    size={20}
                />
                <Text style={{fontSize: 20, color:'white'}}>SELL</Text>
              </View>
            </ActionButton.Item>
            <ActionButton.Item
                buttonColor="#d582ac"
                title="我想买"
                textContainerStyle={{backgroundColor: '#ffffff', opacity: 0.8}}
                textStyle={{color: '#7d2954'}}
                onPress={() => {
                  this.props.navigation.navigate('release_want', {
                    get_back_key: this.props.navigation.state.key,
                  });
                }}>
              <View style = {styles.actionButtonView}>
                <Icon
                    name="shopping-basket"
                    style={styles.actionButtonIcon}
                    color={'#ffffff'}
                    size={20}
                />
              </View>
              <Text style={{fontSize: 20, color:'white'}}>WANT</Text>
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
    // flex: 1,
  },
  slideshowContainer: {
    flex: 5,
  },
  ClassificationContainer: {
    flex: 2,
  },
  recommendationAreaContainer: {
    flex: 20,
  },
  actionButtonView: {
    justifyContent: 'center',
    alignItems:'center',
  },
});
