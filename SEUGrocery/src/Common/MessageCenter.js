/*
  @version: 0.1
  @author: 71117124湛钊
  @date: 2019-9-9
*/

import UserInfo from './UserInfo'
import {postData} from './FetchHelper'
import ItemList from './ItemList'
import AsyncStorage from '@react-native-community/async-storage';

const sendUrl = 'http://hanyuu.top:8080/user/chat/push'
const fetchnewUrl = 'http://hanyuu.top:8080/user/chat/fetchnew'
const fetchallUrl = 'http://hanyuu.top:8080/user/chat/fetchall'
const userDataUrl = 'http://hanyuu.top:8080/user/'

class MessageCenter{
  
  static fetchAllMessage(toke){
    
    return postData(fetchallUrl,{token:toke})
  }

  static fetchNewMessage(toke){
    return postData(fetchnewUrl,{token:toke})
  }

  static getNoticesMap(callback) {
    UserInfo.get('token').then(toke => {
      this.fetchAllMessage(toke).then(list => {
        if(!list.data){
          return
        }

        var uidmap = new Map()
        console.log("resData:"+JSON.stringify(list))

        for(var i of list.data){
          var newData = i.data;
          var newTime = i.createdAt;
          if (uidmap.has(i.from)) {
            uidmap.get(i.from).push({newData,newTime})
          } else {
            uidmap.set(i.from, [{newData,newTime}])
          }
          
        }
        // alert(JSON.stringify(uidmap.get(5)))
        var mList = [];

        uidmap.forEach(function(value,key){
          // var username;
          // var avatarurl;
          // fetch(userDataUrl+key).then(res=>res.json)
          // .then(data=>{
          //   username = data.info.username;
          //   avatarurl = data.info.avatarurl
          // })
          mList.push({key:key,value:value})
        })
        callback(mList)
      })
    })
  }

  static getNewMessageMap(callback) {
    UserInfo.get('token').then(toke => {
      this.fetchNewMessage(toke).then(list => {

        var uidmap = new Map()
        if(!list.data){
          return
        }

        for(var i of list.data){
          var newData = i.data;
          var newTime = i.createdAt;
          if (uidmap.has(i.from)) {
            uidmap.get(i.from).push({newData,newTime})
          } else {
            uidmap.set(i.from, [{newData,newTime}])
          }
        }
        var mList = [];

        uidmap.forEach(function(value,key){

          mList.push({key:key,value:value})
        })
        callback(mList)
      })
    })
  }

}

export default MessageCenter