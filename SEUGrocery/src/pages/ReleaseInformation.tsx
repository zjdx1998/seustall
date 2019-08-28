/*
  @version: 0.1
  @author: 71117133 张睦婕
  @date: 2019-8-27
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
    Text
} from 'react-native';
import {
    Divider
} from 'react-native-elements';
import LocalBackHeader from '../Components/LocalBackHeader';
import PostPhoto from '../Components/PostPhotos'

var {height, width} = Dimensions.get('window');
const classes=['电子产品','服饰鞋包','交通工具','美妆个护','日常用品','图书文具','运动健身','其他'];
export default class DetailPage extends Component {
    private state: any;
    constructor(props: string) {
        super(props);
        this.state = {
            title: '' ,
            detail:'',
            campus:'九龙湖',
            newDegree:'',
            firstValue:'',
            secondValue:'',
            classes:'电子产品',

        };

    }

    checkNewDegree=(newText)=>{
        this.setState({newDegree:newText});
        let value=Number(newText);
        if(isNaN(value)){
            alert('请输入新旧程度');
        }
        else if(value===0){
            alert('新旧程度不能等于零');
        }
        else if(value>100){
            alert('新旧程度不能大于100%');
        }
    }
    updateFirstValue=(value)=>{
        this.setState({firstValue:value});
    }
    updateSecondValue=(value)=>{
        this.setState({secondValue:value});
    }
    render() {
        return (
            <ScrollView style={styles.test}>
                {/*顶端返回和确认按钮*/}
                <View style={{height: 50}}>
                    <LocalBackHeader navigation={this.props.navigation} />
                    <View style={styles.buttonContainer}>
                        <Button
                            title="确认"
                            type="clear"
                            color={'#cc6699'}
                        />
                    </View>
                </View>
                {/*<View style={styles.titleContainer}>*/}
                    <TextInput
                    style={styles.title}
                    onChangeText={(title) => this.setState({title})}
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
                        editable = {true}
                        onChangeText={(newDegree)=>this.setState({newDegree})}
                        keyboardType={'numeric'}
                        maxLength={4}
                        style={styles.h4}
                    />
                    <Text style={styles.h4}>%</Text>
                </View>
                <View style={styles.container_row}>
                    <Text style={styles.h4}>校区：</Text>
                    <Picker
                        selectedValue={this.state.campus}
                        style={{ width: width*0.3 ,fontSize:20}}
                        onValueChange={(itemValue, itemIndex) => this.setState({campus: itemValue})}>
                        <Picker.Item label="九龙湖校区" value="九龙湖" />
                        <Picker.Item label="四牌楼校区" value="四牌楼" />
                        <Picker.Item label="丁家桥校区" value="丁家桥" />
                    </Picker>
                </View>

                <View style={styles.container_row}>
                    <Text style={styles.h4}>商品分类：</Text>
                    <Picker
                        selectedValue={this.state.classes}
                        style={{ width: width*0.35 ,fontSize:20}}
                        onValueChange={(itemValue) => this.setState({classes: itemValue})}>
                        {classes.map((i)=>(
                            <Picker.Item label={i} value={i} />
                            ))
                        }
                    </Picker>
                </View>

                <View style={styles.container_row}>
                    <Text style={styles.value}>￥</Text>
                    <TextInput
                        placeholder='0'
                        onChangeText={(newText)=>this.updateFirstValue({newText})}
                        keyboardType={'numeric'}
                        style={styles.value}
                        value={this.state.firstValue}
                    />
                    <Text style={styles.value}> . </Text>
                    <TextInput
                        placeholder='00'
                        onChangeText={(newText)=>this.updateSecondValue({newText})}
                        keyboardType={'numeric'}
                        maxLength={2}
                        style={styles.value}
                        value={this.state.secondValue}
                    />
                </View>
                <View >
                    <TextInput
                        style={styles.detail}
                        onChangeText={(detail) => this.setState({detail})}
                        value={this.state.detail}
                        placeholder={'为你的商品添加一些更详细的描述吧！'}
                        multiline={true}
                        maxLength={100}
                    />
                    <Text style={{alignSelf: 'flex-end'}}>{100-this.state.detail.length}/100</Text>
                </View>
                <PostPhoto/>

            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    buttonContainer:{
        top:-50,
        left:width*0.7,
        height:40,
        width:width*0.25,
        justifyContent:'center',
        padding:10,
    },
    title:{
        fontSize:40,
        borderBottomColor:'grey',
        borderBottomWidth:0.5,
    },
    detail:{
        fontSize:20,
        borderTopColor:'grey',
        borderTopWidth:0.5,
    },

    container_row:{
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        margin:10,
        flex:1,

    },
    h4:{
        fontSize:20,
    },
    value:{
        color:'#cc6699',
        fontSize:30,
        fontWeight:'bold',

    },
});
