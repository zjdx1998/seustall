/*
  @version: 0.1
  @author: 71117103 张潇艺
  @date: 2019-8-29
*/
import React, {Component} from 'react';
import {
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
  Picker,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import LocalBackHeader from '../Components/LocalBackHeader';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
//import {postData} from '../Common/FetchHelper';

var {height, width} = Dimensions.get('window');
const classes = [
  '电子产品',
  '服饰鞋包',
  '交通工具',
  '美妆个护',
  '日常用品',
  '图书文具',
  '运动健身',
  '其他',
];
const addItemURL = 'http://inari.ml:8080/item/add';
// const addItemURL = 'http://10.203.252.131/item/add';
let imgurl;

/*export default class Loading extends Component{
    state={
        show:true
    }
    render(){
        if(this.state.show){
            return (
                <View style={{width:width,height:height}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
    }
}*/
const majorNum = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '21',
  '22',
  '24',
  '25',
  '26',
  '29',
  '30',
  '31',
  '33',
  '41',
  '42',
  '43',
  '44',
  '57',
  '61',
  '66',
  '71',
  '75',
  'D1',
  'D2',
  'G1',
  'G2',
  'G3',
  'GS',
  'JS',
  'LK',
  'TJ',
];

export default class ReleaseIWantPage extends Component {
  private state: any;

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      password2: '',
      major: '',
      detail: '',
      campus: '九龙湖',
    };
  }

  /*updateState = (data) => {
        this.setState(data);
    }
*/
  checkUserName = () => {
    if (this.state.userName == '') {
      alert('请输入昵称！');
      return false;
    }
    return true;
  };

  checkPassWord = () => {
    let pass1 = String(this.state.password);
    let pass2 = String(this.state.password2);
    if (pass1 == '' || pass1 != pass2) {
      alert('请正确输入密码和确认密码！');
      return false;
    }
    return true;
  };

  checkMajor = () => {
    let ma = String(this.state.major);
    if (!(ma in majorNum)) {
      alert('请输入正确的院系编号！');
      return false;
    }
    return true;
  };

  checkInput = () => {
    if (this.checkUserName() && this.checkPassWord() && this.checkMajor()) {
      return true;
    }
    return false;
  };

  ifPostDataSucceed = () => {
    let data = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjozLCJnZW5' +
        'lcmF0ZSI6MTU2NzA0MTI3ODcxMSwiaWF0IjoxNTY3MDQxMjc4fQ.X48-FXKuBOK6f_PBDE4E2jfB457739iAe3dEQKs2mzY',
      uuid: '3',
      title: 'pagetest',
      type: '1',
      price: '87',
      imgurl: 'url',
      depreciatione: '6',
      note: 'dsfasdg',
    };

    // postData(addItemURL,data)
    //     .then(res=>console.log(res))
    //     .catch(err=>console.error(err))
  };
  confirm = () => {
    // this.checkNewDegree();
    // if(this.checkInput()){}
    this.checkInput();
  };

  render() {
    return (
      <View style={styles.baseContainer}>
        <ScrollView style={styles.test}>
          <View style={{height: 50}}>
            <LocalBackHeader navigation={this.props.navigation} />
          </View>
          <View style={styles.viewUserTop}>
            <Avatar
              size={120}
              rounded
              source={require('../Common/img/avatar.png')}
            />
            <TouchableOpacity
              onPress={() => {this.props.navigation.navigate('postPhoto')}}
              activeOpacity={0.2}
              focusedOpacity={0.5}>
              <View style={styles.txtArea}>
                <View style={styles.viewEdit}>
                  <Icon
                    name="pencil-square-o"
                    style={{color: 'white'}}
                    size={15}
                  />
                  <Text style={styles.txtEdit}>上传头像</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.container_row}>
            <Text style={styles.h4}>昵称：</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'请输入昵称'}
                value={this.state.userName}
                editable={true}
                onChangeText={userName => this.setState({userName})}
                keyboardType={'numeric'}
                maxLength={15}
                style={styles.h4}
              />
            </View>
          </View>
          <View style={styles.container_row}>
            <Text style={styles.h4}>密码：</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'请输入密码'}
                value={this.state.password}
                editable={true}
                onChangeText={password => this.setState({password})}
                keyboardType={'numeric'}
                maxLength={20}
                secureTextEntry={true}
                style={styles.h4}
              />
            </View>
          </View>
          <View style={styles.container_row}>
            <Text style={styles.h4}>确认密码：</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'请再次输入密码'}
                value={this.state.password2}
                editable={true}
                onChangeText={password2 => this.setState({password2})}
                keyboardType={'numeric'}
                maxLength={20}
                secureTextEntry={true}
                style={styles.h4}
              />
            </View>
          </View>
          <View style={styles.container_row}>
            <Text style={styles.h4}>校区：</Text>
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={this.state.campus}
                style={{width: width * 0.3, fontSize: 20}}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({campus: itemValue});
                }}>
                <Picker.Item label="九龙湖校区" value="九龙湖" />
                <Picker.Item label="四牌楼校区" value="四牌楼" />
                <Picker.Item label="丁家桥校区" value="丁家桥" />
              </Picker>
            </View>
          </View>
          <View style={styles.container_row}>
            <Text style={styles.h4}>院系：</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'院系编号'}
                value={this.state.major}
                editable={true}
                onChangeText={major => this.setState({major})}
                keyboardType={'numeric'}
                maxLength={2}
                style={styles.h4}
              />
              <Text style={styles.h4}>系</Text>
            </View>
          </View>
          <View style={styles.detailContainer}>
            <TextInput
              style={styles.detail}
              onChangeText={detail => this.setState({detail})}
              value={this.state.detail}
              placeholder={'个人简介……'}
              multiline={true}
              maxLength={50}
            />
            <Text style={{alignSelf: 'flex-end', margin: 10}}>
              {50 - this.state.detail.length}/50
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="确 认"
              type="clear"
              color={'#cc6699'}
              onPress={() => {
                return this.checkInput();
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: '#FFF0F5',
    flex: 1,
  },
  buttonContainer: {
    height: 50,
    width: width * 0.5,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  viewUserTop: {
    marginBottom: 5,
    height: 200,
    backgroundColor: '#cc6699',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  txtArea: {
    justifyContent: 'center',
    margin: 20,
  },
  detailContainer: {
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 150,
    justifyContent: 'space-between',
  },
  detail: {
    fontSize: 15,
    /*borderTopColor:'white',
        borderTopWidth:0.5,*/
  },

  inputContainer: {
    //margin:1,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
  },

  container_row: {
    flexDirection: 'row',
    //justifyContent: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,

    //flex: 1,
  },
  h4: {
    alignSelf: 'center',
    fontSize: 15,
    margin: 5,
  },
  value: {
    color: '#cc6699',
    fontSize: 30,
    fontWeight: 'bold',
  },
  viewEdit: {
    width: 90,
    //marginTop: 10,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtEdit: {
    marginLeft: 3,
    alignSelf: 'center',
    color: 'white',
    fontSize: 12,
  },
});
