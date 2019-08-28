/*
  @version: 0.1
  @author: 71117133张睦婕
  @date: 2019-8-26
*/

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ImageBackground,
    NativeModules,
    LayoutAnimation,
    TouchableOpacity,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements';
import {postData} from '../Common/FetchHelper';
import {sha1} from '../Common/SHA-1Encryptor';
import UserInfo from '../Common/UserInfo';
const { UIManager } = NativeModules;
const loginURL = 'http://inari.ml:8080/user/login';
// const fetch = require('node-fetch');

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);


let Dimensions = require('Dimensions');
let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;
let leftStartPoint = totalWidth * 0.15;
let componentWidth = totalWidth * 0.7;
let heading = totalHeight * 0.1;

const state1 = {
    stateNum: 1,
    inputedPW: '',
    PWInputWidth: componentWidth,
    idButtonAlpha: 0,
    sendIDText: '',
    bigButtonText: '登    录',
    registerAlpha: 1,
    register: '验证码登录 / 注册'
};

const state2 = {
    stateNum: 2,
    inputedPW: '',
    PWInputWidth: componentWidth / 2,
    idButtonAlpha: 1,
    sendIDText: '发送验证码',
    bigButtonText: '登  录   /   注  册',
    registerAlpha: 0,
    register: '密码登录'

};

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = state1;
        this.setState({inputedNum:''});
        
    }
    updateNum=(newText) =>{
        this.setState((state) => {
            return {
                inputedNum: newText 
            };
        });
    }
    updatePW=(newText)=> {
        this.setState((state) => {
            return {
                inputedPW: newText
            };
        });
    }
    buttonPressed=()=> {
        // let request = new FormData();
        // request.append("phonenumber","97551046561");
        // request.append("password","6d4cdc90634085cdfbb5f16e17a8373ba8244980");

        // // var fetchOptions = {
        // //     method:'POST',
        // //     headers:{
        // //         'Accept': 'application/json',
        // //         'Content-Type': 'multipart/form-data;boundary=6ff46e0b6b5148d984f148b6542e5a5d'
        // //     },
        // //     body:request
        // // };
        // this.state.bigButtonText=loginURL;

        // fetch(loginURL,{
        //     method:'POST',
        //     headers:{
        //         'Accept': 'application/json',
        //         'Content-Type': 'multipart/form-data;boundary=6ff46e0b6b5148d984f148b6542e5a5d'
        //     },
        //     body:request
        // })
        // .then((response)=>{
        //     this.setState(bigButtonText='test1');
        //     return response.json()
        // }
        // )
        // .then((responseText)=>{
        //     this.setState(bigButtonText='test1');
        //     console.log(responseText);
        // }).catch(function(e) {
        //     console.log("Oops, error");
        //   }).done();

        //      const fetch = require('node-fetch');
        postData(loginURL, { phonenumber: this.state.inputedNum, password: sha1(this.state.inputedPW) })
           
            .then((data) => {

                UserInfo.saveUserInfo(data);    
                // alert(data.info.username+'\n'+UserInfo.get('username'));
                UserInfo.get('idcard').then((name)=>{
                    alert(name);
                })
            }) // JSON from `response.json()` call
            .catch(error => console.error(error))



    }
    identifyingCodeLoginButton = () => {
        LayoutAnimation.spring();
        this.setState((state) => {
            if (this.state.stateNum == 1)
                return state2;
            if (this.state.stateNum == 2)
                return state1;
        });
    }

    render() {
        return (
            <ImageBackground
                source={require('../Common/img/loginBackground.png')}
                style={styles.background}
            >
                <View style={styles.container}>
                    <View style={[styles.inputStyle, styles.numberInputStyle]}>
                        <Icon
                            name={'mobile-phone'}
                            type={'font-awesome'}
                            color={'grey'}
                        />
                        <TextInput
                            onChangeText={(inputedNum) => this.setState({ inputedNum })}
                            placeholder='请输入手机号'
                            // style={styles.numberInputStyle}
                            // value={this.state.inputedNum}
                            aitoFocus={true}
                            maxLength={11}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={[styles.inputStyle, styles.passwordInputStyle, { width: this.state.PWInputWidth }]}>
                        <Icon
                            name={'lock'}
                            type={'font-awesome'}
                            color={'grey'}
                        />
                        <TextInput
                            onChangeText={(inputedPW) => this.setState({ inputedPW })}
                            password={true}
                            placeholder={'请输入密码'}
                            // style={styles.passwordInputStyle}
                            secureTextEntry={true}
                        // value={this.state.inputedPW}
                        />
                        <View style={[styles.idButton, { opacity: this.state.idButtonAlpha }]}>
                            <Text style={{ color: 'grey' }}>{this.state.sendIDText}</Text>
                        </View>
                    </View>
                    <Text onPress={this.buttonPressed} style={styles.bigTextPrompt}>
                        {this.state.bigButtonText}
                    </Text>
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={this.identifyingCodeLoginButton}>
                        {/*<View style={{backgroundColor:'#cc9966', top:heading+90}}>*/}
                        <Text style={styles.registerText}>
                            {this.state.register}
                        </Text>
                        {/*</View>*/}
                    </TouchableOpacity>
                    {/*<View style={{backgroundColor:'red',width:this.state.PWInputWidth,height:50}}></View>*/}

                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#F5FCFF',
    },
    numberInputStyle: {
        top: heading + 20,
        left: leftStartPoint,
        width: componentWidth,
        backgroundColor: 'white',
        borderColor: '#cc6699',
        fontSize: 20,
    },
    passwordInputStyle: {
        top: heading + 50,
        left: leftStartPoint,
        // width: componentWidth,
        // backgroundColor:'#cc6699',
        fontSize: 20,
        backgroundColor: 'white',
        borderColor: '#cc6699',
    },
    bigTextPrompt: {
        top: heading + 70,
        left: leftStartPoint,
        width: componentWidth,
        backgroundColor: 'white',
        color: '#cc6699',
        textAlign: 'center',
        fontSize: 25,
        borderRadius: 50,
        padding: 10,
    },
    registerText: {
        // width:componentWidth*0.46,
        color: 'white',
        fontSize: 16,
        // fontStyle:'italic',//斜体
        textDecorationLine: 'underline',
    },
    registerButton: {
        top: heading + 90,
        left: leftStartPoint,
        width: componentWidth * 0.46,
    },
    inputStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 20,
        opacity: 0.7,
        borderWidth: 1,
        borderRadius: 50,
    },
    idButton: {
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 30,
        borderRadius: 50,
        padding: 15,
        left: totalWidth * 0.15,


    }

});


// function postData(url, data) {
//     // Default options are marked with *
//     return fetch(url, {
//         body: JSON.stringify(data), // must match 'Content-Type' header
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, same-origin, *omit
//         headers: {
//             'user-agent': 'Mozilla/4.0 MDN Example',
//             'content-type': 'application/json'
//         },
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, cors, *same-origin
//         redirect: 'follow', // manual, *follow, error
//         referrer: 'no-referrer', // *client, no-referrer
//     })
//         .then(response => response.json()) // parses response to JSON
// }

