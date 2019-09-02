/*
  @version: 0.0.0
  @author: 71117417 卢立强 71117123 张建东
  @date: 2019-8-22
*/
import React, {Component} from 'react';
import {
  ActivityIndicator,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {
  Text,
  Button,
  ThemeProvider,
  Image,
  Avatar,
} from 'react-native-elements';
import LocalBackHeader from '../Components/LocalBackHeader';
import * as SP from '../Common/ScreenProperty';
const itemURL = 'http://inari.ml:8080/item/';
const userURL = 'http://inari.ml:8080/user/';

var {height, width} = Dimensions.get('window');
export default class DetailPage extends Component {
  private props: any;

  constructor(props) {
    super(props);
    this.state.uuid = props;
  }

  fetchData = () => {
    fetch(itemURL + this.props.navigation.state.params.itemid)
      .then(response => response.json())
      .then(rT => {
        // this.setState({
        //   itemid: rT.itemid,
        //   // username: itemURL + this.props.navigation.state.params.itemid,
        //   uuid: rT.uuid,
        //   title: rT.title,
        //   type: rT.type,
        //   price: parseFloat(rT.price),
        //   imgurl: rT.imgurl,
        //   note: rT.note,
        //   depreciatione: rT.depreciatione,
        // });
        fetch(userURL + rT.uuid)
          .then(res => res.json())
          .then(user => {
            this.setState({
              username: user.username,
              avatorurl: user.avatarurl,
              itemid: rT.itemid,
              // username: itemURL + this.props.navigation.state.params.itemid,
              uuid: rT.uuid,
              title: rT.title,
              type: rT.type,
              price: parseFloat(rT.price),
              imgurl: rT.imgurl,
              note: rT.note,
              depreciatione: rT.depreciatione,
            });
          })
          .catch(e => {
            console.log('Oops, error');
            // Alert.alert('cnm');
          });

        console.log(rT);
      })
      .catch(e => {
        console.log('Oops, error');
        // Alert.alert('cnm');
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    this.fetchData();
  }

  state = {
    itemid: '',
    uuid: '',
    title:
      '快乐萌新在线摸鱼(。・ω・。)，测试超长超长超长超长的商品名，给大家表演铁锅炖自己',
    type: -1,
    price: 0.0,
    imgurl: 'https://hanyuufurude.github.io/img/covers.jpg',
    depreciatione: '',
    note:
      '《他改变了中国：江泽民传》的作者罗伯特·劳伦斯·库恩（Robert Lawrence Kuhn）自言著这本书的初衷是：用真实的故事展示中国，让世界了解真实的中国。他在中国十多年，工作、生活，和各界人士交朋友，看到许多东西正在欣欣向荣地发展着。然而美国同胞乃至西方世界的许多人还陷在对中国认识的迷雾中。美国国民知道的东西多数是国内大众传媒反复强调的事情，提起中国，他们往往会片面想到人权，完全不知道中国老百姓已经有了更多的民主和幸福的生活。西方对中国的偏见和误解有时会让作者感到沮丧和愤慨。作者认为：江泽民是他了解中国的载体，江泽民的生平体现了中国的各个历史时期情况，从日本侵华战争到中国的改革开放，有近80年跨度。于是，作者希望通过江泽民的传记向世界讲述中国的历史，并告诉世界是历史造就了中国的现状。2004年中，《他改变了中国：江泽民传》的英文稿出来后，上海世纪出版集团开始组织翻译，同时按程序报上海市新闻出版局批准。也向中共中央办公厅报审，作者称“中办审得非常细致，给的反馈非常及时”。该书中文版样书出来时，作者曾带着中、英文两个版本的书专程拜访了江泽民本人。',
    sold: 0,
    username: 'WakamiyaEve',
    avatorurl: 'https://avatars2.githubusercontent.com/u/45632558?s=400&v=4',
  };

  render() {
    return (
      <ScrollView style={styles.test}>
        <View style={{height: SP.HB(15)}}>
          <LocalBackHeader navigation={this.props.navigation} />
        </View>
        <Image
          source={{uri: this.state.imgurl}}
          style={styles.img}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={styles.priceTag}>￥{this.state.price.toFixed(2)}</Text>
        <Text style={styles.title}>{this.state.title}</Text>
        <View style={styles.userBanner}>
          <View style={styles.avator}>
            <Avatar
              rounded
              size="medium"
              source={{uri: this.state.avatorurl}}
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.username}>{this.state.username}</Text>
          </View>
        </View>
        <Text style={styles.note}>{this.state.note}</Text>
        <View style={styles.contractButton}>
          <ThemeProvider>
            <Button title="立即购买" />
          </ThemeProvider>
          <ThemeProvider>
            <Button title="给我留言" />
          </ThemeProvider>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: 'white',
  },
  img: {
    width: width,
    height: width,
  },
  priceTag: {
    color: 'red',
    fontSize: 40,
    margin: 10,
  },
  title: {
    fontSize: 25,
    margin: 5,
  },
  note: {
    fontSize: 15,
    margin: 5,
  },
  userBanner: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    padding: 5,
    backgroundColor: '#eeeeee',
  },
  avator: {
    marginRight: 20,
  },
  username: {
    fontSize: 20,
    color: '#444444',
  },
  center: {
    justifyContent: 'center',
    margin: 5,
  },
  contractButton: {
    justifyContent: 'center',
    margin: 0,
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
});
