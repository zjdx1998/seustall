# react-native调用摄像头拍照

[react-native-image-picker简书](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fmarcshilling%2Freact-native-image-picker)

[官网](https://github.com/react-native-community/react-native-image-picker)

```
yarn add react-native-image-picker
react-native link react-native-image-picker
```


打开项目中的android->app->src->main->AndroidManifest.xml文件，在第8行添加如下配置：
```
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

打开项目中的android->app->src->main->java->com->当前项目名称文件夹->MainActivity.java文件，修改配置如下：
```java
package com.native_camera;
import com.facebook.react.ReactActivity;

// 1. 添加以下两行：
import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
import com.facebook.react.modules.core.PermissionListener; // <- add this import

public class MainActivity extends ReactActivity {
    // 2. 添加如下一行：
    private PermissionListener listener; // <- add this attribute

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "native_camera";
    }
}
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

