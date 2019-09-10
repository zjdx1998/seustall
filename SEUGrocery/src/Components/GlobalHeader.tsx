/*
  @version: 0.6
  @author: 71117123张建东
  @date: 2019-8-22
*/
import React, {Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native' ;
import {Header, SearchBar,Icon} from 'react-native-elements';
import * as SP from '../Common/ScreenProperty';

export default class extends Component {
    private props: any;
    constructor(props) {
        super(props);
    }
    state = {
        search: '',
    };
    render() {
        const {search} = this.state;
        return (
            <Header
                statusBarProps={{
                    barStyle: 'light-content',
                    backgroundColor: '#CC6699',
                }}
                containerStyle={{marginTop: -10,borderBottomWidth:0}}
                placement="center"
                backgroundColor="#CC6699"
                leftComponent={{
                    icon: 'menu',
                    color: '#030303',
                    onPress: () => this.props.navigation.openDrawer(),
                    size: 30,
                }}
                centerComponent={
                    <View style={{padding:SP.H(20)}}>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('searchP',{
                                refresh: function () {
                            }})
                            }
                            style={{
                                width:SP.WB(70),
                                backgroundColor:'white',
                                flex:1,
                                flexDirection:'row',
                                justifyContent:'center',
                                alignItems:'center',
                                borderRadius:50,
                                opacity:0.9,

                            }}>
                            <Icon name={'search'} type={"font-awesome"} color={'grey'}/>
                            <Text style={{color:'grey'}}>请输入想要搜索的关键词</Text>
                        </TouchableOpacity>
                    </View>
                }
                rightComponent={{
                    icon: 'camera',
                    color: '#030303',
                    backgroundColor: '#CC6699',
                    size: 30,
                }}
            />
        );
    }
    updateSearch = (search: any) => {
        this.setState({search});
        this.props.navigation.navigate('searchP')
    };
}
