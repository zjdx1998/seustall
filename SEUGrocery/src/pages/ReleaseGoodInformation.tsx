/*
  @version: 0.1
  @author: 71117133 张睦婕
  @date: 2019-8-27
*/
import React, {Component} from 'react';
// @ts-ignore
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Button,
  Picker,
  TextInput,
  Text,
} from 'react-native';
import {Icon} from "react-native-elements";
import LocalBackHeader from '../Components/LocalBackHeader';
import * as SP from '../Common/ScreenProperty';
import PostPhoto from '../Components/PostPhotos';
import {uploadImage} from '../Common/UplodeImageTool';
import {getImgUrl} from '../Components/PostPhotos';
import Loading from '../Components/Loading';
import ItemList from '../Common/ItemList';
import {postData} from '../Common/FetchHelper';
import {TouchableOpacity} from "react-native-gesture-handler";


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


export default class ReleaseInformation extends Component {
  private state: any;
  private Loading: any;
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      detail: '',
      campus: '九龙湖',
      newDegree: '',
      firstValue: '',
      secondValue: '',
      classes: '1',
    };
  }

  // getIdAndToken=()=>{
  //
  //   return Promise.all([
  //     UserInfo.get('uuid'),
  //     UserInfo.get('token'),
  //   ])
  // }

  checkNewDegree = () => {
    let value = Number(this.state.newDegree);
    let flag=true;
    if (isNaN(value)) {
      alert('请输入新旧程度');
      flag=false;
    } else if (value === 0) {
      alert('新旧程度不能等于零');
      flag=false;
    } else if (value > 100) {
      alert('新旧程度不能大于100%');
      flag=false;
    }
    console.log('new degree:', value);
    console.log(flag);
    return flag;
  };

  checkInput = () => {
    if (this.checkNewDegree()) {
      if (this.state.title == '') {
        alert('请输入商品标题！');
        return false;
      }
      if (this.computeValue() <= 0) {
        alert('商品价格还没设置哦^_^');
        return false;
      }
      console.log('title', this.state.title);
      console.log('value', this.computeValue());
      return true;
    }

  };

  computeValue = () => {
    console.log(this.state.firstValue);

    return Number(this.state.firstValue) + Number(this.state.secondValue) / 100;
  };

  // @ts-ignore
  uploadItemData = async () => {
    this.Loading.show();
    const [uid, token] = await ItemList.getIdAndToken();
    const commonURL='http://inari.ml:8080/';

    let params = {
      token:token,
      itemid: '3',
      path: getImgUrl(), //本地文件地址
    };
    let data = {
      token:token,
      uuid: uid,
      title: this.state.title,
      type: '1',
      price: this.computeValue(),
      imgurl: 'image/item/0.9321619878296834.jpg',
      depreciatione: this.state.newDegree,
      note: this.state.campus+this.state.detail,
      sold:1,
    };

    const addImageURL = 'http://inari.ml:8080/item/image';
    const addItemURL = 'http://inari.ml:8080/item/add';

    console.log(params);
    console.log(data);

    if(getImgUrl()==''){
      postData(addItemURL, data)
          .then(response => {
            console.log('uploadData', response);
            if (response.status == 'success') {
            this.Loading.close();
            alert('发布成功');
          }else{
              alert('上传数据失败');
              this.Loading.close();
            }
          })
          .catch(err => {
            console.error(err);
            alert('上传数据失败');
            this.Loading.close();
          });
    }
    else {
      uploadImage(addImageURL, params)
          .then(responseData => {
            console.log('uploadImage', responseData);
            if (responseData.status == 'success') {
              data.imgurl = responseData.imgurl;
              postData(addItemURL, data)
                  .then(response => {
                    console.log('uploadData', response);
                    if (response.status == 'success') {
                      this.Loading.close();
                      alert('发布成功');
                    } else {
                      alert('上传数据失败');
                      this.Loading.close();
                    }
                  })
                  .catch(err => {
                    console.log('err', err);
                    alert('上传图片失败');
                    this.Loading.close();
                  });
            }
            })
    }
  }

  confirm = () => {
    console.log(this.checkInput())
    if (this.checkInput()) {
      this.uploadItemData();
    }
  };
  render() {
    return (
      <ScrollView style={styles.test}>
        {/*顶端返回和确认按钮*/}
        <View style={{height: SP.HB(12)}}>
          <LocalBackHeader navigation={this.props.navigation} />
          <View style={styles.buttonContainer}>
            {/*<TouchableOpacity*/}
            {/*style={styles.button}*/}
            {/*onPress={this.confirm}*/}
            {/*>*/}
            {/*  <Icon name={'upload'} type={'font-awesome'} color={'#cc6699'}/>*/}
            {/*  <Text style={{color:'#cc6699'}}>确认发布</Text>*/}
            {/*</TouchableOpacity>*/}
            <Button
              title="确认"
              type="clear"
              color={'#cc6699'}
              onPress={this.confirm}
            />
          </View>
        </View>
        {/*<View style={styles.titleContainer}>*/}
        <TextInput
          style={styles.title}
          onChangeText={title => this.setState({title})}
          value={this.state.title}
          placeholder={'标题'}
          multiline={true}
          maxLength={40}
        />
        {/*</View>*/}
        <View style={styles.container_row}>
          <Text style={styles.h4}>新旧程度：</Text>
          <TextInput
            placeholder={'90'}
            value={this.state.newDegree}
            editable={true}
            onChangeText={newDegree => this.setState({newDegree})}
            keyboardType={'numeric'}
            maxLength={3}
            style={styles.h4}
          />
          <Text style={styles.h4}>%</Text>
        </View>
        <View style={styles.container_row}>
          <Text style={styles.h4}>校区：</Text>
          <Picker
            selectedValue={this.state.campus}
            style={{width: width * 0.3, fontSize: 20}}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({campus: itemValue});
            }}>
            <Picker.Item label="九龙湖校区" value="九龙湖校区，" />
            <Picker.Item label="四牌楼校区" value="四牌楼校区，" />
            <Picker.Item label="丁家桥校区" value="丁家桥校区，" />
          </Picker>
        </View>

        <View style={styles.container_row}>
          <Text style={styles.h4}>商品分类：</Text>
          <Picker
            selectedValue={this.state.classes}
            style={{width: width * 0.35, fontSize: 20}}
            onValueChange={itemValue => this.setState({classes: itemValue})}>
            {classes.map((i,j) => (
              <Picker.Item label={i} value={j} />
            ))}
          </Picker>
        </View>

        <View style={styles.container_row}>
          <Text style={styles.value}>￥</Text>
          <TextInput
            placeholder="0"
            onChangeText={firstValue => this.setState({firstValue})}
            keyboardType={'numeric'}
            style={styles.value}
            value={this.state.firstValue}
          />
          <Text style={styles.value}> . </Text>
          <TextInput
            placeholder="00"
            onChangeText={secondValue => this.setState({secondValue})}
            keyboardType={'numeric'}
            maxLength={2}
            style={styles.value}
            value={this.state.secondValue}
          />
        </View>
        <View>
          <TextInput
            style={styles.detail}
            onChangeText={detail => this.setState({detail})}
            value={this.state.detail}
            placeholder={'为你的商品添加一些更详细的描述吧！'}
            multiline={true}
            maxLength={100}
          />
          <Text style={{alignSelf: 'flex-end'}}>
            {100 - this.state.detail.length}/100
          </Text>
        </View>
        <PostPhoto />

        <Loading
          ref={r => {
            this.Loading = r;
          }}
          hide={true}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    top: -50,
    left: width * 0.7,
    height: 40,
    width: width * 0.25,
    justifyContent: 'center',
    padding: 10,
  },
  button:{
    flexDirection: 'row',
    backgroundColor:"#000",
    borderRadius:50,
    flex:1,
  },
  title: {
    fontSize: 40,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  detail: {
    fontSize: 20,
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
  },

  container_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
    flex: 1,
  },
  h4: {
    fontSize: 20,
  },
  value: {
    color: '#cc6699',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
