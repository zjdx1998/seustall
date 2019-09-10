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
} from 'react-native';
import LocalBackHeader from '../Components/LocalBackHeader';
import * as SP from '../Common/ScreenProperty';
import {postData} from '../Common/FetchHelper';
import ItemList from '../Common/ItemList';
import Loading from '../Components/Loading';

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
const addItemURL = 'http://hanyuu.top:8080/item/add';
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

export default class ReleaseIWantPage extends Component {
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

  updateState = data => {
    this.setState(data);
  };

  checkNewDegree = () => {
    let value = Number(this.state.newDegree);
    if (isNaN(value)) {
      alert('请输入新旧程度');
      return false;
    } else if (value === 0) {
      alert('新旧程度不能等于零');
      return false;
    } else if (value > 100) {
      alert('新旧程度不能大于100%');
      return false;
    }
    return true;
  };
  checkInput = () => {
    console.log(this.checkNewDegree());
    if (this.checkNewDegree()) {
      if (this.state.title == '') {
        alert('请输入求购物品名！');
        return false;
      }
      return true;
      /*if(this.computeValue()<=0){
                alert('最高可接受价格还没设置哦^_^');
                return false;
            }*/
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
    const commonURL = 'http://hanyuu.top:8080/';

    let data = {
      token: token,
      title: this.state.title,
      type: this.state.classes, //1-8
      price: this.computeValue(),
      depreciatione: this.state.newDegree,
      note: this.state.campus + ',' + this.state.detail,
      sold: '-1',
    };

    console.log(data);
    const addItemURL = 'http://hanyuu.top:8080/item/add';

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
        console.error(err);
        alert('上传数据失败');
        this.Loading.close();
      });
  };

  confirm = () => {
    if (this.checkInput()) {
      this.uploadItemData();
    }
  };
  render() {
    return (
      <View style={styles.baseContainer}>
        <ScrollView style={styles.test}>
          {/*<Loading/>*/}
          {/*顶端返回和确认按钮*/}
          <View style={{height: SP.HB(12)}}>
            <LocalBackHeader navigation={this.props.navigation} />
            <View style={styles.buttonContainer}>
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
          <View style={styles.secondCard}>
            <View style={styles.container_row}>
              <Text style={styles.h4}>最低可接受新旧程度：</Text>
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
                onValueChange={itemValue =>
                  this.setState({classes: itemValue})
                }>
                {classes.map((i, j) => (
                  <Picker.Item label={i} value={String(j + 1)} />
                ))}
              </Picker>
            </View>

            <View style={styles.container_row}>
              <Text style={styles.h4}>最高可接受价：</Text>
              <Text style={styles.value}>￥</Text>
              <TextInput
                placeholder="0"
                onChangeText={firstValue =>
                  this.setState({firstValue: firstValue})
                }
                keyboardType={'numeric'}
                style={styles.value}
                value={this.state.firstValue}
              />
              <Text style={styles.value}> . </Text>
              <TextInput
                placeholder="00"
                onChangeText={secondValue =>
                  this.setState({secondValue: secondValue})
                }
                keyboardType={'numeric'}
                maxLength={2}
                style={styles.value}
                value={this.state.secondValue}
              />
            </View>
          </View>
          <View style={styles.detailContainer}>
            <TextInput
              style={styles.detail}
              onChangeText={detail => this.setState({detail})}
              value={this.state.detail}
              placeholder={'为你想要的物品添加一些更详细的描述吧！'}
              multiline={true}
              maxLength={100}
            />
            <Text style={{alignSelf: 'flex-end', margin: 10}}>
              {100 - this.state.detail.length}/100
            </Text>
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
    top: -50,
    left: width * 0.7,
    height: 40,
    width: width * 0.25,
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    padding: 10,
    fontSize: 40,
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    //borderBottomColor:'white',
    //borderBottomWidth:0.5,
  },
  detailContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 200,
    justifyContent: 'space-between',
  },
  detail: {
    fontSize: 20,
    /*borderTopColor:'white',
        borderTopWidth:0.5,*/
  },
  secondCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  container_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
    flex: 1,
    //margin:10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  h4: {
    fontSize: 20,
    margin: 5,

    backgroundColor: 'white',
    borderRadius: 10,
  },
  value: {
    color: '#cc6699',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
