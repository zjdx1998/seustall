/*
  @version: 0.1
  @author: 71117133张睦婕
  @date: 2019-9-4
*/
import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, Dimensions,StyleSheet,Image } from "react-native";

export default class IDVerifySuccess extends Component {
    private props: any;

    _setModalVisible(visible) {
        this.props.callback(visible)
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                }}
            >
                <View style={styles.container}>
                    <View style={{height:130,  width:300, margin:20, backgroundColor:'white'}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'#eee'}}>
                            <Image
                                style={{top:-100,width: 200, height: 200}}
                                source={require('../Common/img/CatWithFlower.png')}/>
                            <Text style={{fontSize:26,color:'#cc6699',top:-100}}>恭喜您，认证成功</Text>
                        </View>
                        <TouchableHighlight
                            onPress={() => {
                                this._setModalVisible(!this.props.modalVisible);
                                this.props.navigation.navigate('home')
                            }}
                            style={{height:50, justifyContent:'center', alignItems:'center'}}
                        >
                            <Text>返回首页</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        height:Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
})
