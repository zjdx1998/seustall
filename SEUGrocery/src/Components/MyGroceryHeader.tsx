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

export default class MyGroceryHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewUserTop}>
                    <Avatar
                        size = {120}
                        rounded
                        source={require('../Common/img/avatar.png')}
                    />
                  </View>
                <View style = {styles.txtArea}>
                    <Text style={styles.txtTitle}>我的铺子</Text>
                    <Text style={styles.txtInfo}>已发布 3   |   已卖出 1</Text>
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

