/*
  @version: 0.1
  @author: 71117133张睦婕
  @date: 2019-9-3
*/

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ImageBackground,
    NativeModules,
    LayoutAnimation,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import {postData} from '../Common/FetchHelper';
import {sha1} from '../Common/SHA-1Encryptor';
import UserInfo from '../Common/UserInfo';
const loginURL = 'http://inari.ml:8080/user/login';
import {Icon} from 'react-native-elements';
import * as SP from '../Common/ScreenProperty';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);


let leftStartPoint = SP.WB(15);
let componentWidth = SP.WB(70);
let heading = SP.HB(10);

export default class SignUpUI extends Component {
    private state: any;
    constructor(props) {
        super(props);
        this.state = {
            inputNum:'',
            inputedPW: '',
            inputedPW2:'',
            inputedCode:'',
            PWInputWidth: componentWidth,
            bigButtonText: '注    册',
            registerAlpha: 1,
            register: '返回登录界面',
            PWplacehold: ' 请输入密码',
            PWIcon: 'lock',
            PWVisible: false,
        }
    }

    checkPW=(input)=>{
        this.setState({inputedPW2:input});
        console.log(this.state.inputedPW2);
        if(input==this.state.inputedPW){
            this.state.PWIcon='checkbox-marked';
        }
        else{
            this.state.PWIcon='lock';
        }
    }

    buttonPressed=()=> {
        if(this.state.inputNum==''){
            alert('请输入手机号');
            return;
        }
        if(this.state.inputedPW==''){
            alert('请输入密码')
        }
        if(this.state.inputedPW!==this.state.inputedPW2){
            alert('两次密码不一致');
            return;
        }
        if(this.state.inputedCode==''){
            alert('请输入验证码');
            return;
        }
        console.log(this.state);
        // postData(loginURL, {
        //     phonenumber: '17551046561', //this.state.inputedNum,
        //     password: sha1('13315585158zz'), //this.state.inputedPW),
        // })
        //     .then(data => {
        //         UserInfo.saveUserInfo(data);
        //         this.props.navigation.navigate('home');
        //         // alert(data.info.username+'\n'+UserInfo.get('username'));
        //         // UserInfo.get('idcard').then(name => {
        //         //   alert(name);
        //         // });
        //     }) // JSON from `response.json()` call
        //     .catch(error => console.error(error));
        // // this.setState(state => {
        // //   return {
        // //     inputedPW: '',
        // //   };
        // // });
    }

    sendVerifyCode=(event)=>{
        alert('验证码已发送')
    }

    identifyingCodeLoginButton = () => {
        LayoutAnimation.spring();
        this.setState(state => {
            if (this.state.stateNum == 1) {
                return state2;
            }
            if (this.state.stateNum == 2) {
                return state1;
            }
        });
    };

    render() {
        return (
            //background
            <ImageBackground
                source={require('../Common/img/loginBackground.png')}
                style={styles.background}>
                {/*//五个条形框*/}
                <KeyboardAvoidingView style={styles.container} behaver={'position'}>
                <View >
                    {/*//手机号输入*/}
                    <View style={[styles.inputStyle]}>
                        <Icon
                            name={'phone-square'}
                            type={'font-awesome'}
                            color={'#772850'}
                        />

                        <TextInput
                            onChangeText={inputNum => this.setState({inputNum:inputNum})}
                            placeholder={'请输入手机号'}
                            placeholderTextColor={'#772850'}
                            style={{width: componentWidth}}
                            value={this.state.inputedNum}
                            autoFocus={true}
                            maxLength={11}
                            keyboardType={'numeric'}
                        />
                    </View>
                    {/*//密码输入*/}
                    <View style={styles.container_row}>
                        <View
                            style={[
                                styles.inputStyle,
                            ]}>
                            <Icon
                                name={'lock'}
                                type={'material-community'}
                                color={'#772850'}
                            />
                            <TextInput
                                onChangeText={newText => this.setState({inputedPW:newText})}
                                password={true}
                                placeholder={this.state.PWplacehold}
                                placeholderTextColor={'#772850'}
                                style={{width: this.state.PWInputWidth}}
                                secureTextEntry={!this.state.PWVisible}
                                value={this.state.inputedPW}
                            />
                        </View>
                    </View>

                    {/*重复输入密码*/}
                    <View style={[styles.inputStyle]}>
                        <Icon
                            name={this.state.PWIcon}
                            type={'material-community'}
                            color={'#772850'}
                        />

                        <TextInput
                            onChangeText={newText => this.checkPW(newText)}
                            placeholder={'请再次输入密码'}
                            placeholderTextColor={'#772850'}
                            style={{width: componentWidth}}
                            value={this.state.inputedPW2}
                            secureTextEntry={!this.state.PWVisible}
                        />
                    </View>

                    {/*验证码*/}
                    <View style={styles.container_row}>
                        <View
                            style={[
                                styles.inputStyle,
                                {width: componentWidth*0.6},
                            ]}>
                            <Icon
                                name={'message-processing'}
                                type={'material-community'}
                                color={'#772850'}
                            />
                            <TextInput
                                onChangeText={newText => this.setState({inputedCode:newText})}
                                password={true}
                                placeholder={'请输入验证码'}
                                placeholderTextColor={'#772850'}
                                style={{width: componentWidth*0.6}}
                                value={this.state.inputedCode}
                            />
                        </View>
                        {/*//发送验证码*/}
                        <TouchableOpacity
                            style={[styles.idButton, {opacity: 1}]}
                            onPress={this.sendVerifyCode}
                        >
                            <Text style={{color: '#cc6699', size: 30}}>
                                发送验证码
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/*//注册按钮*/}
                    <TouchableOpacity
                        onPress={this.buttonPressed}
                        style={styles.bigButton}>
                        <Text style={styles.bigTextPrompt}>{this.state.bigButtonText}</Text>
                    </TouchableOpacity>
                    {/*//切换页面的按键*/}
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={this.identifyingCodeLoginButton}>
                        {/*<View style={{backgroundColor:'#cc9966', top:heading+90}}>*/}
                        <Text style={styles.registerText}>{this.state.register}</Text>
                        {/*</View>*/}
                    </TouchableOpacity>
                    {/*<View style={{backgroundColor:'red',width:this.state.PWInputWidth,height:50}}></View>*/}
                </View>
                </KeyboardAvoidingView>
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
        justifyContent: 'flex-end',
        marginBottom:heading,
        // backgroundColor: '#F5FCFF',
    },
    container_row: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },

    numberInputStyle: {
        // top: heading + 20,
    },
    passwordInputStyle: {
        // top: heading + 50,

    },
    bigButton: {
        // top: heading + 70,
        backgroundColor: 'white',
        left: leftStartPoint,
        width: componentWidth,
        borderRadius: 50,
        padding: 10,
        marginTop:SP.HB(1)
    },
    bigTextPrompt: {
        color: '#cc6699',
        fontSize: 25,
        textAlign: 'center',
    },
    registerText: {
        // width:componentWidth*0.46,
        color: 'white',
        fontSize: 16,
        // fontStyle:'italic',//斜体
        textDecorationLine: 'underline',
    },
    registerButton: {
        // top: heading + 90,
        left: leftStartPoint,
        width: componentWidth,
        marginTop: SP.HB(1)
    },
    inputStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 20,
        opacity: 0.7,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#cc6699',
        left: leftStartPoint,
        width: componentWidth,
        backgroundColor: 'white',
        fontSize: 20,
        marginTop:SP.HB(1)
    },
    idButton: {
        // top: heading + 50,
        backgroundColor: 'white',
        // color:'#cc6699'
        textAlign: 'center',
        justifyContent:'center',
        borderRadius: 50,
        padding: 10,
        // left:totalWidth*0.15,
        marginLeft: SP.WB(18),
        marginTop:SP.HB(1),
    },
});
