/*
  @version: 0.1
  @author: 71117103张潇艺
  @date: 2019-8-26
*/
import React, {Component} from 'react';
import {
    ActivityIndicator,
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native';
import {
    Text,
    Button,
    ThemeProvider,
    Image,
    Avatar,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import UserInfo from '../Common/UserInfo';
import ItemList from '../Common/ItemList';


export default class MyGroceryHeader extends Component {
    state: {
        userAvatar: string;
        token:string;
        publishedNum:string;
        soldNum:string;
        saled:string;
        list:any;
     };
    constructor(props){
        super(props);
        this.state = {
            userAvatar:'',
            token:'',
            publishedNum:'0',
            soldNum:'0',
            saled:'',
            list:''
        };
        UserInfo.get('avatarurl').then((url)=>{this.setState({
            userAvatar:url
        })});
        UserInfo.get('token').then((tok)=>{this.setState({
            token:tok
        })});


        // UserInfo.getPulishedList().then((list)=>{
        //     this.setState({
        //         published:list.length
        //     });
        //     alert(this.state.published);
        // })
        // this.setState({publishedNum:Object.keys(new ItemList().getPublishedList()).length});
        // alert(this.state.publishedNum);
        // alert(JSON.stringify(this.getPublishedList));
        // new ItemList().getPublishedList();

        // alert(JSON.stringify(new ItemList().getPublishedList()));
        // this.getPublishedList();
        // alert(this.state.publishedNum);
        // this.getPublishedList();

    }

    static getPublishedList(){
        alert(JSON.stringify(UserInfo.get('itemList')));
        return UserInfo.get('itemList');
    }
    getPublishedNum(list){
        const num =Object.keys(list).length;
        var i:number;
        var soldnum = 0;
        for(i=0;i<num;i++){
          if(list[i].sold == 1){
              soldnum++;
          }
        }
        this.setState({
            publishedNum:num,
            soldNum:soldnum,
        });
    }

    //  componentDidMount() {
    // //   this.getPublishedList();
    // //   alert("componentDidMount");

    // }

    // // componentWillUpdate(){
    // //   this.getPublishedList();
    // // }

    // componentDidUpdate() {
    //     // alert("rua")
    // //    this.getPublishedList();
    // //    this.render();
    //  }

    render() {

        // UserInfo.get('avatarurl').then((url)=>{alert(url)});
        return (
            <View style={styles.container}>
                <View style={styles.viewUserTop}>
                    <Avatar
                        size = {120}
                        rounded
                        source = {{uri:this.state.userAvatar}}
                        // source={{uri: UserInfo.get('avatarurl').avatarurl}}
                        // source={{uri:'https://timgsa.baidu.com/timg?image&quality=8
                        // 0&size=b9999_10000&sec=1566901654326&di=73fc9e1fa2034ae79c8ebe
                        // 9d6ba40200&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploa
                        // ds%2Fitem%2F201409%2F13%2F20140913082342_rsfku.thumb.700_0.png'}}
                        // {Object.keys(JSON.stringify(this.state.list)).length}
                    />
                  </View>
                <View style = {styles.txtArea}>
                    <Text style={styles.txtTitle}>我的铺子</Text>
                    <Text style={styles.txtInfo}>已发布   {this.state.publishedNum} |   已卖出 {this.state.soldNum}</Text>
                </View>
            </View>

        );
    }
    _onClickList = () => {
        //this.props.navigation.openDrawer();
    };
}


const styles = StyleSheet.create({
    container: {
        //height: 220,
        backgroundColor: '#cc6699',
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewUserTop: {
        padding:10,
        margin:10,
        height: 150,
    },
    txtArea:{
        justifyContent: 'center',
        margin: 20
    },
    txtTitle: {
        fontSize: 30,
        alignSelf: 'center',
        color:'#ffffff',
    },
    txtInfo: {
        fontSize: 20,
        alignSelf: 'center',
        color:'#ffffff',
        marginTop: 40
    },
})

