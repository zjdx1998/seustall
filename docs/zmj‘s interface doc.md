# react-native调用摄像头拍照

[react-native-image-picker简书](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fmarcshilling%2Freact-native-image-picker)

[官网](https://github.com/react-native-community/react-native-image-picker)

```
yarn add react-native-image-picker
react-native link react-native-image-picker
```

# 弹出编辑对话框

```js
import EditView from './src/Components/EditModal'
```

```jsp
 <View>

        <TouchableOpacity onPress=	{()=>this.refs.editView.show()}     
            style={[{height:200,width:200,backgroundColor:'blue'},{marginTop:20}]}>
          <View style={[{height:100,width:100},{backgroundColor:'red'}]}>
            <Text style={{fontSize:30}}>点击编辑</Text>
          </View>
        </TouchableOpacity>

     //放在最外层view最下面
          <EditView
              // 在组件中使用this.editView即可访拿到EditView组件
              ref="editView"
              inputText={this.state.name}
              titleTxt={'请填写你的一卡通号'}
              ensureCallback={name => this.setState({name})}
          />

</View>
```

# Loading

```
import Loading from '../Components/Loading';
```

```jsp
<Loading ref={r=>{this.Loading = r}} hide = {true}/>
```

同上，要放在最外层view的最下面

```
this.Loading.close()//关闭
this.Loading.show()//打开，不会自动关闭
```

