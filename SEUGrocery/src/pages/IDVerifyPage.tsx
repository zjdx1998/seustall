/*
  @version: 0.1
  @author: 71117133张睦婕
  @date: 2019-9-4
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
const loginURL = 'http://hanyuu.top:8080/user/login';
import {Icon} from 'react-native-elements';
import * as SP from '../Common/ScreenProperty';
import IDVerifySuccess from '../Components/IDVerifySuccess';
import ToolTips from '../Components/ToolTips';

let leftStartPoint = SP.WB(15);
let componentWidth = SP.WB(70);

export default class IDVerifyPage extends Component {
  private state: any;
  private props: any;
  constructor(props) {
    super(props);
    this.state = {
      inputNum: '',
      inputedCode: '',
      modalVisible1: false,
      modalVisible2: false,
    };
  }

  buttonPressed = () => {
    if (this.state.inputNum == '') {
      alert('请输入一卡通号');
      return;
    }
    if (this.state.inputedCode == '') {
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
  };

  sendVerifyCode = event => {
    alert('验证码已发送');
  };

  render() {
    return (
      //background
      <KeyboardAvoidingView
        style={{width: SP.WB(100), height: SP.HB(100)}}
        behavior="position">
        <ImageBackground
          source={require('../Common/img/identify.png')}
          style={styles.background}>
          <View style={styles.container}>
            {/*//一卡通输入*/}
            <View style={[styles.inputStyle]}>
              <Icon name={'user'} type={'font-awesome'} color={'#772850'} />

              <TextInput
                onChangeText={inputNum => this.setState({inputNum: inputNum})}
                placeholder={'请输入一卡通号'}
                placeholderTextColor={'#772850'}
                style={{width: componentWidth}}
                value={this.state.inputedNum}
                autoFocus={true}
                maxLength={9}
                keyboardType={'numeric'}
              />
            </View>

            {/*验证码*/}
            <View style={styles.container_row}>
              <View style={[styles.inputStyle, {width: componentWidth * 0.6}]}>
                <Icon
                  name={'message-processing'}
                  type={'material-community'}
                  color={'#772850'}
                />
                <TextInput
                  onChangeText={newText =>
                    this.setState({inputedCode: newText})
                  }
                  password={true}
                  placeholder={'请输入验证码'}
                  placeholderTextColor={'#772850'}
                  style={{width: componentWidth * 0.6}}
                  value={this.state.inputedCode}
                />
              </View>
              {/*//发送验证码*/}
              <TouchableOpacity
                style={[styles.idButton, {opacity: 1}]}
                onPress={this.sendVerifyCode}>
                <Text style={{color: '#cc6699', size: 30}}>发送验证码</Text>
              </TouchableOpacity>
            </View>

            {/*//认证按钮*/}
            <TouchableOpacity
              // onPress={this.buttonPressed}
              onPress={() => {
                this.setModalVisible2(true);
              }}
              style={styles.bigButton}>
              <Text style={styles.bigTextPrompt}>认 证</Text>
            </TouchableOpacity>
            {/*提示信息*/}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => {
                this.setModalVisible1(true);
              }}>
              <Text style={styles.registerText}>在哪里看验证码？</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <ToolTips
          modalVisible={this.state.modalVisible1}
          content={this.state.content}
          callback={this.setModalVisible1.bind(this)}
        />
        <IDVerifySuccess
          modalVisible={this.state.modalVisible2}
          content={this.state.content}
          callback={this.setModalVisible2.bind(this)}
          navigation={this.props.navigation}
        />
      </KeyboardAvoidingView>
    );
  }

  setModalVisible1(visible) {
    this.setState({modalVisible1: visible});
  }

  setModalVisible2(visible) {
    this.setState({modalVisible2: visible});
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: SP.HB(50),
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
    marginTop: SP.HB(1),
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
    marginTop: SP.HB(1),
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
    marginTop: SP.HB(1),
  },
  idButton: {
    // top: heading + 50,
    backgroundColor: 'white',
    // color:'#cc6699'
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 10,
    // left:totalWidth*0.15,
    marginLeft: SP.WB(18),
    marginTop: SP.HB(1),
  },
});
