/*
  @version: 0.1
  @author: 71117133张睦婕
  @date: 2019-8-27
*/

import React, {Component} from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import * as SP from '../Common/ScreenProperty';
import {Icon} from 'react-native-elements';

var photoOptions = {
  //底部弹出框选项
  title: '请选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '选择相册',
  quality: 0.75,
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

let imgurl = '';
export function getImgUrl() {
  return imgurl;
}

export default class PostPhotos extends Component {
  private state: any;
  private props: any;
  constructor(props) {
    super(props);
    this.state = {
      imgURL: '',
    };
  }

  renderImg = () => {
    if (this.state.imgURL != '') {
      return this.state.imgURL
        .split('++')
        .map(i => <Image source={{uri: i}} style={styles.img} />);
    }
  };

  delete=()=>{
    alert('将删除所有选中照片');
    this.setState({
      imgURL: '',
    });
  }

  render = () => {
    return (
      <View>
        <View style={{flexDirection:'row',justifyContent: 'flex-end',margin:20}}>
        <Icon
            name={'delete'}
            type={'antdesign'}
            onPress={this.delete}
        />
        </View>
        <View style={styles.container}>
          {this.renderImg()}
          <TouchableOpacity onPress={this.cameraAction}>
            <View style={[styles.img, styles.button]}>
              <Icon
                name={'md-add'}
                color={'#cc6699'}
                type="ionicon"
                size={60}
              />
            </View>
          </TouchableOpacity>
        </View>
        {/*<Button*/}
        {/*    title="上传照片"*/}
        {/*    onPress={this.cameraAction}*/}
        {/*    color={'#cc6699'}*/}
        {/*    style={styles.button}*/}
        {/*/>*/}
      </View>
    );
  };
  cameraAction = () => {
    ImagePicker.showImagePicker(photoOptions, response => {
      console.log('response' + response);
      if (response.didCancel) {
        return;
      }
      let url = this.state.imgURL;
      if (url == '') {
        url = response.uri;
      } else {
        url = url + '++' + response.uri;
      }
      imgurl = url;
      this.setState({
        imgURL: url,
      });
    });
  };
}
const imgSize = SP.WB(30);
const styles = StyleSheet.create({
  img: {
    width: imgSize,
    height: imgSize,
    margin: SP.WB(1),
  },
  container: {
    flexDirection: 'row',
    // justifyContent: 'center',
    flexWrap: 'wrap',
    margin: SP.WB(2),
  },
  button: {
    backgroundColor: 'grey',
    opacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});
