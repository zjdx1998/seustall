/*
  @version: 0.1
  @author: 71117133张睦婕
  @date: 2019-8-26
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
} from 'react-native';
import {Icon} from 'react-native-elements';
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);


let Dimensions = require('Dimensions');
let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;
let leftStartPoint = totalWidth * 0.15;
let componentWidth = totalWidth * 0.7;
let heading= totalHeight*0.1;

const state1={
    stateNum:1,
    inputedNum:'',
    inputedPW:'',
    PWInputWidth:componentWidth,
    idButtonAlpha:0,
    sendIDText:'',
    bigButtonText:'登    录',
    registerAlpha:1,
    register:'验证码登录 / 注册'
};

const state2={
    stateNum:2,
    PWInputWidth:componentWidth/2,
    idButtonAlpha:1,
    sendIDText: '发送验证码',
    bigButtonText: '登  录   /   注  册',
    registerAlpha:0,
    register:'密码登录'

};

export default class SignIn extends Component {
    constructor (props){
        super(props);
        this.state = state1;
        //下面两条语句将两个回调函数和成员方法绑定
        this.updateNum = this.updateNum.bind(this);
        this.updatePW = this.updatePW.bind(this);
        this.buttonPressed = this.buttonPressed.bind(this);
    }
    updateNum(newText) {
        this.setState((state) => {
            return {
                inputedNum:newText
            };
        });
    }
    updatePW(newText) {
        this.setState((state) => {
            return {
                inputedPW:newText
            };
        });
    }
    buttonPressed(){
        this.setState((state) => {
            return {
                inputedPW:''
            };
        });
    }
    identifyingCodeLoginButton=()=>{
        LayoutAnimation.spring();
        this.setState((state)=>{
            if (this.state.stateNum==1)
                return state2;
            if(this.state.stateNum==2)
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
                    <View style={[styles.inputStyle,styles.numberInputStyle]}>
                        <Icon
                            name={'mobile-phone'}
                            type={'font-awesome'}
                            color={'grey'}
                        />
                        <TextInput
                            onChangeText={(newText)=>this.updateNum({newText})}
                            placeholder='请输入手机号'
                            // style={styles.numberInputStyle}
                            // value={this.state.inputedNum}
                            aitoFocus={true}
                            maxLength={11}
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={[styles.inputStyle,styles.passwordInputStyle,{width:this.state.PWInputWidth}]}>
                        <Icon
                            name={'lock'}
                            type={'font-awesome'}
                            color={'grey'}
                        />
                        <TextInput
                            onChangeText={(newText) =>this.updatePW({newText})}
                            password={true}
                            placeholder={'请输入密码'}
                            // style={styles.passwordInputStyle}
                            secureTextEntry={true}
                            // value={this.state.inputedPW}
                        />
                        <View style={[styles.idButton,{opacity: this.state.idButtonAlpha}]}>
                            <Text style={{color:'grey'}}>{this.state.sendIDText}</Text>
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
    background:{
        width:'100%',
        height:'100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#F5FCFF',
    },
    numberInputStyle: {
        top: heading+20,
        left: leftStartPoint,
        width: componentWidth,
        backgroundColor:'white',
        borderColor:'#cc6699',
        fontSize: 20,
    },
    passwordInputStyle: {
        top: heading+50,
        left: leftStartPoint,
        // width: componentWidth,
        // backgroundColor:'#cc6699',
        fontSize: 20,
        backgroundColor:'white',
        borderColor:'#cc6699',
    },
    bigTextPrompt: {
        top: heading+70,
        left: leftStartPoint,
        width: componentWidth,
        backgroundColor:'white',
        color:'#cc6699',
        textAlign:'center',
        fontSize:25,
        borderRadius:50,
        padding:10,
    },
    registerText:{
        // width:componentWidth*0.46,
        color:'white',
        fontSize:16,
        // fontStyle:'italic',//斜体
        textDecorationLine:'underline',
    },
    registerButton:{
        top:heading+90,
        left:leftStartPoint,
        width:componentWidth*0.46,
    },
    inputStyle:{
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft:20,
        opacity:0.7,
        borderWidth: 1,
        borderRadius:50,
    },
    idButton:{
        backgroundColor:'white',
        textAlign:'center',
        fontSize:30,
        borderRadius:50,
        padding:15,
        left:totalWidth*0.15,


    }

});

