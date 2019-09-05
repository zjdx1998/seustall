/*
  @version: 0.1
  @author: 71117133张睦婕
  @date: 2019-9-4
*/
import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, Dimensions,StyleSheet } from "react-native";

export default class IDReminder extends Component {
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
                            <Text >感谢您对东大杂货铺的支持</Text>
                            <Text >为了更好地为您提供服务</Text>
                            <Text >我们希望您能进行个人身份验证</Text>
                        </View>
                        <TouchableHighlight
                            onPress={() => {
                                this._setModalVisible(!this.props.modalVisible);
                                this.props.navigation.navigate('verifyP')
                            }}
                            style={styles.button}
                        >
                            <Text>前去认证</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={() => {
                                this._setModalVisible(!this.props.modalVisible);
                            }}
                            style={styles.button}
                        >
                            <Text>我再想想</Text>
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
    button:{
        height:50,
        justifyContent:'center',
        alignItems:'center',
    },
})
