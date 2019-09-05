/*
  @version: 0.1
  @author: 71117133张睦婕
  @date: 2019-9-4
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
    KeyboardAvoidingView,
} from 'react-native';
import * as CC from '../Common/collegeCode';
import * as SP from '../Common/ScreenProperty';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from "../Components/Loading";
import {postData} from '../Common/FetchHelper';
import {uploadImage} from '../Common/UplodeImageTool';
import ItemList from '../Common/ItemList';
import ImagePicker from 'react-native-image-picker'
import UserInfo from '../Common/UserInfo';
import {sha1}from '../Common/SHA-1Encryptor';

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
        path: '东大杂货铺',
    },
};
const commonURL='http://inari.ml:8080/';


export default class AfterSignUpPage extends Component {
    private state: any;
    private Loading: any;
    private props: any;

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            major: '',
            majorNum:'',
            detail: '',
            campus: '九龙湖校区',
            imgURL: {uri:commonURL+'image/avatar/default.jpg'},
            avatarChanged:false,
        };
    }

    checkUserName = () => {
        if (this.state.userName == '') {
            alert('请输入昵称！');
            return false;
        }
        return true;
    };


    checkMajor = () => {
        if (this.state.majorNum==='0') {
            alert('请输入正确的院系编号！');
            return false;
        }
        return true;
    };

    checkInput = () => {
        if (this.checkUserName() && this.checkMajor()) {
            return true;
        }
        return false;
    };

    // @ts-ignore
    uploadUserData = async () => {
        this.Loading.show();
        // const [uid, token] = await ItemList.getIdAndToken();
            let uploadAvatarURL=commonURL+'user/avatar';
            let paras={
                token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1d' +
                    'WlkIjo0LCJnZW5lcmF0ZSI6MTU2NzU2NTQzODAxMSwiaWF0I' +
                    'joxNTY3NTY1NDM4fQ.fW-80s4Biex9Cxl-0mIhacz5lgkZLD7kzXVz4Y8dc1c',
                path:this.state.imgURL.uri,
            }
            uploadImage(uploadAvatarURL,paras)
                .then(response=>{
                    if(response.status=='success'){
                        alert('头像上传成功');
                    }
                    else{
                        alert('头像上传失败');
                    }
                })
                .catch(err=>{
                    alert('头像上传失败')
                })


        let data = {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjo0L' +
                'CJnZW5lcmF0ZSI6MTU2NzU2NTQzODAxMSwiaWF0IjoxNTY3NTY' +
                '1NDM4fQ.fW-80s4Biex9Cxl-0mIhacz5lgkZLD7kzXVz4Y8dc1c',
            username:this.state.userName,
            idcard:'1',
            studentid:this.state.majorNum,
            address:this.state.campus,
            info:this.state.detail,

        };
        console.log(data);
        const modifyUserURL=commonURL+'user/modify';

        postData(modifyUserURL, data)
            .then(response => {
                this.Loading.close();
                alert('发布成功');
            })
            .catch(err => {
                console.error(err);
                this.Loading.close();
                alert('上传数据失败');
            });
    };

    confirm = () => {
        // this.checkNewDegree();
        // if(this.checkInput()){}
        this.checkInput();
    };

    cameraAction = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            console.log('response' + response);
            if (response.didCancel) {
                return;
            }
            this.setState({
                imgURL:{uri:response.uri},
                avatarChanged:true,
            });

        })

    }

    updateMajor=(major)=>{
        this.setState({major:CC.modify(major)});
        this.setState({majorNum:CC.modifyNum(major)});
    }

    buttonPressed=()=>{
        // this.checkInput();
        this.props.navigation.navigate('home');
    }


    render() {
        return (
            <View style={styles.baseContainer}>
                <ScrollView style={styles.test}>
                    <View style={styles.viewUserTop}>
                        <Avatar
                            size={120}
                            rounded
                            source={this.state.imgURL}
                        />
                        <TouchableOpacity
                            onPress={this.cameraAction}
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
                        <Text style={styles.h4}>校区：</Text>
                        <View style={styles.inputContainer}>
                            <Picker
                                selectedValue={this.state.campus}
                                style={{width: SP.WB(30), fontSize: 20}}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({campus: itemValue});
                                }}>
                                <Picker.Item label="九龙湖校区" value="九龙湖校区" />
                                <Picker.Item label="四牌楼校区" value="四牌楼校区" />
                                <Picker.Item label="丁家桥校区" value="丁家桥校区" />
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
                                onChangeText={major => this.updateMajor(major)}
                                style={styles.h4}
                            />
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
                            title="确 认 提 交"
                            type="clear"
                            color={'#cc6699'}
                            onPress={this.buttonPressed}
                        />
                    </View>
                    <Loading
                        ref={r => {
                            this.Loading = r;
                        }}
                        hide={true}
                    />
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
        width: SP.WB(50),
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
