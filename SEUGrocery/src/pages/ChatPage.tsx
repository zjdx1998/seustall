/*
  @version: 0.1
  @author: 71117103张潇艺
  @date: 2019-9-4
*/

import React, {Component} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import LocalBackHeader from '../Components/LocalBackHeader';
import * as SP from '../Common/ScreenProperty';
import {postData} from '../Common/FetchHelper';
import UserInfo from '../Common/UserInfo';
import MessageCenter from '../Common/MessageCenter';
import {func} from 'prop-types';

const sendChatUrl = 'http://hanyuu.top:8080/user/chat/push';
let that: any;

export default class ChatPage extends Component {
  private props: any;

  constructor(props) {
    super(props);
    //this.state.uuid = props;

    this.state = {
      uuid_to: this.props.navigation.state.params.uuid_chat,
      title: this.props.navigation.state.params.title_chat,
      username_to: this.props.navigation.state.params.username_chat,
      avatarurl_to: this.props.navigation.state.params.avatarurl_chat,
      chat_messages: this.props.navigation.state.params.text_chat,
      messages: [],
    };
    UserInfo.get('token').then(data => {
      this.setState({token: data});
    });
    UserInfo.get('uuid').then(data => {
      this.setState({uuid: data});
    });
    UserInfo.get('username').then(data => {
      this.setState({username: data});
    });
    UserInfo.get('avatarurl').then(data => {
      this.setState({avatarurl: data});
    });
    that = this;

    setInterval(() => {
      // alert("ruar")
      this.refreshMessage();
    }, 5000);
  }
  componentWillUpdate(nextProps) {
    this.state = {
      uuid_to: nextProps.navigation.state.params.uuid_chat,
      title: nextProps.navigation.state.params.title_chat,
      username_to: nextProps.navigation.state.params.username_chat,
      avatarurl_to: nextProps.navigation.state.params.avatarurl_chat,
    };
  }

  componentDidMount() {
    var mList = [];
    var user = {
      _id: this.props.navigation.state.params.uuid_chat,
      name: this.props.navigation.state.params.username_chat,
      avatar: this.props.navigation.state.params.avatarurl_chat,
    };
    var count = 1;

    if (this.props.navigation.state.params.text_chat !== undefined) {
      // alert(JSON.stringify(this.props.navigation.state.params.text))
      this.props.navigation.state.params.text_chat.forEach(function(value) {
        // alert(JSON.stringify(value))
        // alert(JSON.stringify(user))
        // alert(value.time)
        var message = {
          _id: count++,
          text: value.text,
          createdAt: new Date(value.time),
          user: user,
        };
        mList.push(message);
        // alert(JSON.stringify(mList))
      });
      mList.reverse();
      this.setState({
        messages: mList,
        chat_messages: this.props.navigation.state.params.text_chat,
      });
    }
  }
  componentDidUpdate() {
    this.resetUI();
  }
  resetUI() {
    if (this.state.uuid_to != this.props.navigation.state.params.uuid_chat) {
      console.log(this.state.uuid_to);
      this.setState({
        uuid_to: this.props.navigation.state.params.uuid_chat,
        title: this.props.navigation.state.params.title_chat,
        username_to: this.props.navigation.state.params.username_chat,
        avatarurl_to: this.props.navigation.state.params.avatarurl_chat,
        messages: [],
      });
      if (
        this.props.navigation.state.params.text_chat !== undefined &&
        this.props.navigation.state.params.type_chat === 2
      ) {
        var mList = [];
        var user = {
          _id: this.props.navigation.state.params.uuid_chat,
          name: this.props.navigation.state.params.username_chat,
          avatar: this.props.navigation.state.params.avatarurl_chat,
        };
        var count = 1;
        // alert(JSON.stringify(this.props.navigation.state.params.text))
        this.props.navigation.state.params.text_chat.forEach(function(value) {
          // alert(JSON.stringify(value))
          // alert(JSON.stringify(user))
          // alert(value.time)
          var message = {
            _id: count++,
            text: value.text,
            createdAt: new Date(value.time),
            user: user,
          };
          mList.push(message);
          // alert(JSON.stringify(mList))
        });
        mList.reverse();
        this.setState({
          messages: mList,
          chat_messages: this.props.navigation.state.params.text_chat,
        });
      }
    }
  }
  refreshMessage() {
    var uuid = this.state.uuid_to;
    var messages = [];
    MessageCenter.getNewMessageMap(function(mlist) {
      var texts = mlist.filter(function(e) {
        return e.key == uuid;
      });
      // alert(JSON.stringify(texts))
      // alert(JSON.stringify(texts))
      // alert(JSON.stringify(texts[0].value))
      texts[0].value.forEach(function(data) {
        // alert(JSON.stringify(data))
        var message = {
          text: data.text,
          createdAt: new Date(data.time),
          user: {
            _id: uuid,
            name: data.username,
            avatar: data.avatarurl,
          },
        };
        // alert(JSON.stringify(message))
        messages.push(message);
      });
      messages.reverse();
      // alert(JSON.stringify(messages))
      that.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
    });
  }

  onSend(messages = []) {
    // alert(JSON.stringify(messages));

    var newdata = {
      // type:1,
      text: messages[0].text,
      // username:messages[0].user.name,
      // avatarurl:messages[0].user.avatar,
    };

    postData(sendChatUrl, {
      token: this.state.token,
      to: this.state.uuid_to,
      data: JSON.stringify(newdata),
    }).then(data => {
      // alert(JSON.stringify(data))
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
      // alert(JSON.stringify(this.state.messages));
    });
  }

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#cc6699',
          },
          left: {
            backgroundColor: 'white',
          },
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: SP.HB(10)}}>
          <LocalBackHeader navigation={this.props.navigation} />
        </View>
        <View style={styles.title}>
          <Text
            numberOfLines={1}
            style={{color: '#fff', margin: 10, fontSize: 20}}>
            与 {this.state.username_to}的聊天
          </Text>
        </View>

        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.uuid,
            name: this.state.username,
            avatar: this.state.avatarurl,
          }}
          renderBubble={this.renderBubble}
          alignTop={true}
          showAvatarForEveryMessage={true}
          maxInputLength={200}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
  },
  title: {
    backgroundColor: '#cc6699',
    opacity: 0.85,
    //borderRadius:10,
  },
});
