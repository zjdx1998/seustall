/*
  @version: 0.1
  @author: 71117133张睦婕
  @date: 2019-8-27
*/

import React, {Component} from 'react';
import {View, Button, Image} from 'react-native'
import ImagePicker from 'react-native-image-picker'
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
        path: 'images'
    }
}
export default class PostPhotos extends Component{
    private state: any;
    constructor(props) {
        super(props);
        this.state = {
            imgURL: ''
        }
    }
    render(){
        return (
            <View>
                <Image source={{ uri: this.state.imgURL }} style={{ width: 200, height: 200 }}></Image>
                <Button title="拍照" onPress={this.cameraAction}></Button>
            </View>

    );

    }
    cameraAction = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            console.log('response' + response);
            if (response.didCancel) {
                return
            }
            this.setState({
                imgURL: response.uri
            });
        })
    }
}



