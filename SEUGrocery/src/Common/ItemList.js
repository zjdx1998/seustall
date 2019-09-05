/*
  @version: 0.2
  @author: 71117124湛钊
  @date: 2019-8-30
*/


import {postData} from './FetchHelper';
import UserInfo from './UserInfo';


const publishedUrl = 'http://inari.ml:8080/user/published'
const finishedUrl = 'http://inari.ml:8080/user/finished'


class ItemList{
    itemList= {
        uuid:'',
        token:'',
        ListLength:'',
     };

     constructor(){
        this.itemList = {
            uuid :'123123',
            token :'',
            ListLength:'',
        }
     }

     static async getIdAndToken(){

         return Promise.all([
             UserInfo.get('uuid'),
             UserInfo.get('token'),
         ])
     }
    /**
   * 获取物品列表(自己)
   * @returns JSON:list
   */

     static async getItemList(){
        // alert('rua');
        const[uid,toke] = await this.getIdAndToken();
         // alert(uid+toke);
        return postData(publishedUrl,{token:toke,
        uuid:uid})

        // return list;
     }

    /**
   * 获取物品列表(别人)
   * @param uuid
   * @returns JSON:list
   */

     async getItemList(uuid){
        // var s_id = ''
        // var s_token = ''
        // var promise1 =UserInfo.get('uuid').then((id)=>{

        // });
        // var promise2 =UserInfo.get('token').then((tok)=>{
        //     s_token=tok;
        // });
        const[uid,toke] = await this.getIdAndToken();
        // alert(uid+'\n'+toke);

        //  alert(this.state.uuid+'\n'+this.state.token)

        const list = await postData(publishedUrl,{token:toke,uuid:uuid});
        //  .then((list)=>{
        //      alert(Object.keys(list).length);
        //     //  this.setState({ListLength:list.length});
        //      return list;
        //  })
        // alert(Object.keys(list).length);
        // alert(JSON.stringify(list));
        return list;
     }
    /**
   * 获取已买到物品列表(自己)
   * @returns JSON:list
   */

     static async getFinishedList(){
       const[uid,toke] = await this.getIdAndToken();
       return postData(finishedUrl,{token:toke})
     }



}

export default ItemList;
