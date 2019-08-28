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

} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import * as SP from '../Common/ScreenProperty'



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
            imgURL:''
        }
    }
    render=()=>{
        return (
            <View >
                <View style={styles.container}>
                    {
                        this.state.imgURL.split('++').map((i) =>
                            (<Image
                                source={{uri: i}}
                                style={styles.img}/>)
                        )
                    }
                </View>
                <Button
                    title="上传照片"
                    onPress={this.cameraAction}
                    color={'#cc6699'}
                    style={styles.button}
                />
            </View>

    );

    }
    cameraAction = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            console.log('response' + response);
            if (response.didCancel) {
                return
            }
            let url=this.state.imgURL;
            if(url==''){
                url=response.uri;
            }
            else{
                url=url+'++'+response.uri;
            }

                this.setState({
                    imgURL:url,
                });
        })
    }
}
const imgSize=SP.WB(30);
const styles=StyleSheet.create({
    img:{
        width:imgSize,
        height:imgSize,
        margin:SP.WB(1),
    },
    container:{
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'wrap',
        margin:SP.WB(2),
    },
    button:{
        height: SP.HB(10),
    }


})


