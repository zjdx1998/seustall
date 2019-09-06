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
    TextInput, FlatList, TouchableOpacity,
} from 'react-native';
import LocalBackHeader from '../Components/LocalBackHeader';
import * as SP from '../Common/ScreenProperty';
import {postData} from '../Common/FetchHelper';
import ItemList from '../Common/ItemList';
import Loading from '../Components/Loading';
import { ListItem, Text, } from 'react-native-elements';

const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President',
        news:0,
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
          news:3,
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
          news:2,
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
          news:99,
    },
]



export default class NoticesPage extends Component {
    private state: any;
    private Loading: any;
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    updateState = data => {
        this.setState(data);
    };

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('chatP')}
        >
        <ListItem
            title={item.name}
            subtitle={item.subtitle}
            leftAvatar={{ source: { uri: item.avatar_url } }}
            badge={{ value:item.news, textStyle: { color: 'orange' }, containerStyle: { opacity:item.news==0?0:1 } }}
            bottomDivider
            chevron
        />
        </TouchableOpacity>
    )

    render() {
        return (
            <View style={styles.baseContainer}>
                <ScrollView style={styles.test}>
                    <LocalBackHeader navigation={this.props.navigation} />
                    <Text h4 style={{alignSelf:'center',top:-SP.HB(5)}}>消息中心</Text>
                    <View style={{top:-SP.HB(4)}}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={list}
                            renderItem={this.renderItem}
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
        top: -50,
        left: SP.WB(100) * 0.7,
        height: 40,
        width: SP.WB(100)* 0.25,
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
