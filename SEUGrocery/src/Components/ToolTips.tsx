/*
  @version: 0.1
  @author: 71117133张睦婕
  @date: 2019-9-4
*/
import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, Dimensions,StyleSheet } from "react-native";

export default class ToolTips extends Component {
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
                    <View style={{height:250,  width:300, margin:20, backgroundColor:'white'}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'#eee'}}>
                                <Text>点击“发送验证码”按钮后</Text>
                                <Text>我们将会给你的seu邮箱</Text>
                                <Text>发送一封带有验证码的邮件</Text>
                                <Text>东南大学邮件系统网址为</Text>
                                <Text>http://mail.seu.edu.cn/</Text>
                                <Text>用户名为一卡通号</Text>
                                <Text>密码为信息门户统一认证密码</Text>
                        </View>
                        <TouchableHighlight
                            onPress={() => {
                                this._setModalVisible(!this.props.modalVisible);
                            }}
                            style={{height:50, justifyContent:'center', alignItems:'center'}}
                        >
                            <Text>关 闭</Text>
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
