/*
  @version: 0.1
  @author: 71117103张潇艺
  @date: 2019-9-4
*/


import React, {Component} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';
import {
    Text,
} from 'react-native-elements';
import {GiftedChat,
    Bubble,
} from 'react-native-gifted-chat';
import LocalBackHeader from '../Components/LocalBackHeader';
import * as SP from "../Common/ScreenProperty";

export default class ChatPage extends Component{
    private props: any;

    constructor(props) {
        super(props);
        //this.state.uuid = props;
        this.state = {
            uuid : props,
        messages: [],
    }
    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    renderBubble = props => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#cc6699',
                    },
                    left:{
                        backgroundColor: 'white',
                    }
                }}
            />
        )
    }



    render()
{
    return (
        <View style={styles.container}>
            <View style={{height: SP.HB(10)}}>
                <LocalBackHeader navigation={this.props.navigation}/>
            </View>
            <View style={styles.title}>
            <Text numberOfLines={1} style={{color:'#fff',margin:10,fontSize:20}}>
                与 {'某某某'} 关于 {'某商品'} 的聊天
            </Text>
            </View>

        <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
                _id: 1,
            }}
            renderBubble={this.renderBubble}
            alignTop={true}
            showAvatarForEveryMessage={true}
            maxInputLength={200}
        />
        </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1 ,
        backgroundColor:'#fff0f5'
    },
    title:{
        backgroundColor:'#cc6699',
        opacity:0.85
        //borderRadius:10,

    }
})
