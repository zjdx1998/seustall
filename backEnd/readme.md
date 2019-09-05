# FOOF Background Service

[TOC]
## Version

* version: v6.4.2 alpha
* updated: 2019/09/05 17:12
* author: Hanyuu Furude

## Characteristics

- Docker
- Nginx
- WebPack
- koa
- Sequelize
- jwt

## Run docker

* listening port: 4000

``` docker
docker run --network host -d -v [locationOfAvatarOnPhysicsMachine]:[locationOfAvatarOnContainer] hanyuufurude/foofserver:v[x]
```
- e.g.
``` docker
docker run --network host -d -v /home/.../avatar:/foof/avatar hanyuufurude/foofserver:v3
```
## Warning
1. If you meet Exception like this
	> Error: Client does not support authentication protocol requested by server; consider upgrading MySQL client

	You are suggested to change the type of your password, please typing like this:
	``` SQL
	alter user 'USER'@'localhost' identified with mysql_native_password by 'PASSWORD'
	flush privileges;
	```
2. If you try to pack the back end your self, you may meet error like this:

   > require is not a function

   You are suggest to stop the use of the ‘gently’, and  we suggest you can add a config in your **webpack.conf.ts** to resolve the error.

   ```
   module.exports = {
   	plugins: [
   		new webpack.DefinePlugin({ "global.GENTLY": false })
   	],
   };
   ```

   

## SQL table fields
#### users
```
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| uuid        | int(11)      | NO   | PRI | NULL    | auto_increment |
| password    | varchar(255) | NO   |     | NULL    |                |
| username    | varchar(255) | NO   |     | NULL    |                |
| phonenumber | varchar(255) | NO   |     | NULL    |                |
| idcard      | varchar(255) | NO   |     | NULL    |                |
| studentid   | int(11)      | NO   |     | NULL    |                |
| address     | varchar(255) | NO   |     | NULL    |                |
| avatarurl   | varchar(255) | NO   |     | NULL    |                |
| verified    | int(11)      | NO   |     | NULL    |                |
| score       | int(11)      | NO   |     | NULL    |                |
| info        | varchar(255) | NO   |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
```
#### items
```
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| itemid        | int(11)      | NO   | PRI | NULL    | auto_increment |
| uuid          | int(11)      | NO   |     | NULL    |                |
| title         | varchar(255) | NO   |     | NULL    |                |
| type          | int(11)      | NO   |     | NULL    |                |
| price         | double       | NO   |     | NULL    |                |
| imgurl        | varchar(255) | NO   |     | NULL    |                |
| depreciatione | int(11)      | NO   |     | NULL    |                |
| note          | varchar(255) | NO   |     | NULL    |                |
| sold          | int(11)      | NO   |     | NULL    |                |
| to            | int(11)      | YES  |     | NULL    |                |
+---------------+--------------+------+-----+---------+----------------+
```
#### favorites

```

+--------+---------+------+-----+---------+----------------+
| Field  | Type    | Null | Key | Default | Extra          |
+--------+---------+------+-----+---------+----------------+
| id     | int(11) | NO   | PRI | NULL    | auto_increment |
| itemid | int(11) | NO   |     | NULL    |                |
| uuid   | int(11) | NO   |     | NULL    |                |
+--------+---------+------+-----+---------+----------------+
```

#### chats
```
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| from      | int(11)      | NO   |     | NULL    |                |
| to        | int(11)      | NO   |     | NULL    |                |
| data      | varchar(255) | NO   |     | NULL    |                |
| fetched   | tinyint(1)   | NO   |     | NULL    |                |
| createdAt | datetime     | NO   |     | NULL    |                |
| updatedAt | datetime     | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
```

# Interface to frond end.

## Test page
* china: [hanyuu.top:8080](http://hanyuu.top:8080)
* international:[inari.ml:8080](http://inari.ml:8080)

## Users

### public query

```
GET /user/[uuid]
```
```
None
```

```
None
```

``` json
//success
{
  "uuid": 1,
  "username": "新手咸鱼人员",
  "avatarurl": "image\\avatar\\default.jpg",
  "verified": 0,
  "score": 10,
  "info": "这家伙很懒，什么都没有写＞︿＜",
  "status": "success"
}
```
### me

```
POST /user/me
```

```
Content-Type:application/x-www-form-urlencoded
```

```json
{"表单数据":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzU5NjMwMjIwMCwiaWF0IjoxNTY3NTk2MzAyfQ.ijUssByflHjPqWOMMcJMvqroJCaS1PKOBXUYYaS6dYU"}}
```

```json
//success
{
  "uuid": 1,
  "username": "新手咸鱼人员",
  "phonenumber": "1",
  "idcard": "",
  "studentid": "0",
  "address": "",
  "avatarurl": "image\\avatar\\default.jpg",
  "verified": 0,
  "score": 10,
  "info": "这家伙很懒，什么都没有写＞︿＜",
  "status": "success"
}
//wrong token
403 Forbidden
```


### published

```
POST /user/published
```

```
Content-Type:application/x-www-form-urlencoded
```

``` json
{"表单数据":{"uuid":"1"}}
```

``` json
[
  {
    "itemid": 5,
    "uuid": 1,
    "title": "未命名商品1",
    "type": 1,
    "price": 1.23,
    "imgurl": "[     \"image\\\\item\\\\0.35113526938054584.jpg\",     \"image\\\\item\\\\0.5106340873338395.jpg\",     \"image\\\\item\\\\0.37461623290026935.jpg\",     \"image\\\\item\\\\0.887643214342515.jpg\"   ]",
    "depreciatione": 99,
    "note": "然而并没什么描述",
    "sold": -1,
    "to": null
  },
  {
    "itemid": 6,
    "uuid": 1,
    "title": "未命名商品2",
    "type": 2,
    "price": 3.99,
    "imgurl": "[     \"image\\\\item\\\\0.35113526938054584.jpg\",     \"image\\\\item\\\\0.5106340873338395.jpg\",     \"image\\\\item\\\\0.37461623290026935.jpg\",     \"image\\\\item\\\\0.887643214342515.jpg\"   ]",
    "depreciatione": 99,
    "note": "这里也没什么描述",
    "sold": -2,
    "to": null
  }
]
```
### finished
```
POST /user/finished
```
```
Content-Type:application/x-www-form-urlencoded
```
``` json
{"表单数据":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzU5NjMwMjIwMCwiaWF0IjoxNTY3NTk2MzAyfQ.ijUssByflHjPqWOMMcJMvqroJCaS1PKOBXUYYaS6dYU"}}
```
``` json
[
  {
    "itemid": 3,
    "uuid": 1,
    "title": "432",
    "type": 798,
    "price": 987,
    "imgurl": "987",
    "depreciatione": 798,
    "note": "987",
    "sold": -2,
    "to": 1
  },
  {
    "itemid": 4,
    "uuid": 1,
    "title": "432",
    "type": 798,
    "price": 987,
    "imgurl": "987",
    "depreciatione": 798,
    "note": "987",
    "sold": -2,
    "to": 1
  }
]
```
### login

```
POST /user/login
```
```
Content-Type:application/x-www-form-urlencoded
```

```json
{"表单数据":{"phonenumber":"1","password":"1"}}
```

``` json
//success
{
  "status": "success",
  "info": {
    "uuid": 1,
    "username": "新手咸鱼人员",
    "phonenumber": "1",
    "idcard": "",
    "studentid": "0",
    "address": "",
    "avatarurl": "image\\avatar\\default.jpg",
    "verified": 0,
    "score": 10,
    "info": "这家伙很懒，什么都没有写＞︿＜"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzU5NzAyOTA0MywiaWF0IjoxNTY3NTk3MDI5fQ.fx-bxf7P55BU5OuvbGWTbzyTFZ-AH2JLpGLuVC58ge0"
}
// password incorrect
{
  "status": "failure",
  "info": "password incorrect"
}
```
### register
```
POST /user/register
```
```
Content-Type:application/x-www-form-urlencoded
```

``` json
{"表单数据":{"phonenumber":"2","verifycode":"2","password":""}}
```

``` json
// success
{"status":"success"}
// phone number already token
{"status":"failure","info":"phone number already token"}
// invaild request
{"status":"failure","info":"invaild request"}
```
### reset password

```
POST /user/reset
```

```
Content-Type:application/x-www-form-urlencoded
```

``` json
{"表单数据":{"phonenumber":"1111","verifycode":"2345","password":"1"}}
```

```json
// success
{"status":"success"}
// invaild verify code
{
  "status":"failure",
  "info":"bad verify code"
}
// invaild request
{
  "status":"failure",
  "info":"invaild request"
}
```

### require verify code ( phone number )

```
POST /user/requirecode
```
```
Content-Type:application/x-www-form-urlencoded
```
```json
{"表单数据":{"phonenumber":"1"}}
```
``` json
//success
{"status":"success"}
```

### upload avatar

* the request size is no greater than 1mb

```
POST /user/avatar	(avatar's max size: 1mb)
```

```
Content-Type:multipart/form-data
```

``` json
-----------------------------644897516845

Content-Disposition: form-data; name="token"



eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzI0NzkzMDk3MywiaWF0IjoxNTY3MjQ3OTMwfQ.cQxtqPF7OkYPUOvElEl15udolCS54F6yOZxCbcc3mUM

-----------------------------644897516845

Content-Disposition: form-data; name="file"; filename="800px-%E5%8D%83%E6%81%8B%E4%B8%87%E8%8A%B1_%E8%8A%B3%E4%B9%83A10_%E5%BE%AE%E7%AC%91.jpg"

Content-Type: image/jpg

【文件载荷内容】
-----------------------------644897516845--
```

``` json
//success
{
  "status": "success",
  "imgurl": [
    "image\\item\\0.37298177116166853.jpg",
    "image\\item\\0.8804691995112837.jpg",
    "image\\item\\0.1519560908440687.jpg",
    "image\\item\\0.18944967144424818.jpg"
  ]
}
//wrong token
403 Forbidden
```

### modify

- this interface will accept the request whether the request contains password or not. if you don’t want to change your password, please do not request this fields.
- however, you have to copy the value of the fields of other fields even you don’t want to change those;

```
POST /user/modify
```

```
Const-Type:application/x-www-form-urlencoded
```

``` json
{"表单数据":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzI1NTA2MDEzNiwiaWF0IjoxNTY3MjU1MDYwfQ.-1oWPBl4QFyw9idh9QAAtjIITTOehPB9iSdgDZ183kI","username":"WakamiyaEve","password":"1111","idcard":"1","studentid":"2","address":"M3c","info":"no"}}
```

``` json
// success
{
  "status": "success"
}
//wrong token
403 Forbidden
```
### require verify code (email)

```
POST /user/mail/verify
```
```
Const-Type:application/x-www-form-urlencoded
```
``` json
{"表单数据":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzYwNTM4ODY4OSwiaWF0IjoxNTY3NjA1Mzg4fQ.jCF-T3w_Z_E9u6GnZJY2OfB0n4kjXLikC3f9jl4vJmg"}}
```
``` json
// success
{"status":"success"}
```
### verify code ( mail )
```
GET /user/mail/verify/:token
```
```
none
```
``` json
//success
{"status":"success"}
```

## Items

### define of sold

``` json
	sold:
	{
		sale: 1,
		sold: 2,
		want: -1,
		got: -2,
	}
```

### query

```
GET /item/[itemid]
```
```json
None
```

``` json
//success
{
  "itemid": 1,
  "uuid": 1,
  "title": "432",
  "type": 798,
  "price": 987,
  "imgurl": "987",
  "depreciatione": 798,
  "note": "987",
  "sold": 987,
  "to": 0,
  "status": "success"
}
//no item
{"status":"none"}
```
### add

```
POST /item/add
```

```
Content-Type:application/x-www-form-urlencoded
```

``` json
{"表单数据":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzU5NjMwMjIwMCwiaWF0IjoxNTY3NTk2MzAyfQ.ijUssByflHjPqWOMMcJMvqroJCaS1PKOBXUYYaS6dYU","title":"未命名商品1","type":"1","price":"1.23","imgurl":"[+++++\"image\\\\item\\\\0.35113526938054584.jpg\",+++++\"image\\\\item\\\\0.5106340873338395.jpg\",+++++\"image\\\\item\\\\0.37461623290026935.jpg\",+++++\"image\\\\item\\\\0.887643214342515.jpg\"+++]","depreciatione":"99","note":"然而并没什么描述","sold":"-1"}}
```

``` json
//success
{"status":"success"}
//no item
{"status":"none"}
//wrong token
403 Forbidden
```

### upload image

* The name property of the file is arbitrary and the request size is no greater than 1mb

```
POST /item/image
```

```
Content-Type:multipart/form-data
```

``` json

请求载荷（payload）

-----------------------------5005412110300

Content-Disposition: form-data; name="token"



eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzI0ODU5OTI4OSwiaWF0IjoxNTY3MjQ4NTk5fQ.ezvX48rpjAAzd6Bwr3eFrSCnrQT_3SGoXID1NSWAa_8

-----------------------------5005412110300

Content-Disposition: form-data; name="file0"; filename="Hoshikawa_Hotaru.png"

Content-Type: image/png
【文件载荷】
-----------------------------5005412110300

Content-Disposition: form-data; name="file1"; filename="23984.png"

Content-Type: image/png
【文件载荷】
-----------------------------5005412110300

Content-Disposition: form-data; name="file2"; filename="24370.png"

Content-Type: image/png
【文件载荷】
-----------------------------5005412110300

Content-Disposition: form-data; name="file3"; filename="53-098.png"

Content-Type: image/png
【文件载荷】
-----------------------------5005412110300
```

```json
// success
{
  "status": "success",
  "imgurl": [
    "image\\item\\0.35113526938054584.jpg",
    "image\\item\\0.5106340873338395.jpg",
    "image\\item\\0.37461623290026935.jpg",
    "image\\item\\0.887643214342515.jpg"
  ]
}
// file too large
413 Request Entity Too Large
//wrong token
403 Forbidden
```

### modify

```
POST /item/modify
```

```
Content-Type:multipart/form-data
```

```json
{"表单数据":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzI1NTA2MDEzNiwiaWF0IjoxNTY3MjU1MDYwfQ.-1oWPBl4QFyw9idh9QAAtjIITTOehPB9iSdgDZ183kI","itemid":"1","title":"小米充电宝","type":"2","price":"299.9","imgurl":"{+++\"imgurl\":+[+++++\"image\\\\item\\\\0.21266930758871538.jpg\",+++++\"image\\\\item\\\\0.4408016895777478.jpg\",+++++\"image\\\\item\\\\0.7268863338186755.jpg\",+++++\"image\\\\item\\\\0.7410747437739387.jpg\"+++]+}","depreciatione":"98","note":"一块钱四个","sold":"-1"}}
```

```json
// success
{"status":"success"}
//wrong token
403 Forbidden
```
### trade

```
POST /item/trade
```

```
Content-Type:multipart/form-data
```

``` json
{"表单数据":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzU2NTYwODkzNCwiaWF0IjoxNTY3NTY1NjA4fQ.J_END7-qsN7HyPmLpQXHcaBOylNvI96OTSEgVg4X-9w","itemid":"1"}}
```

``` json
//success
{
  "status":"success"
}
// not for trade
{
  "status": "failure",
  "info": "item not availabe for trade"
}
```

## Favorites

### query

```
POST /fav/query
```

```
Content-Type:application/x-www-form-urlencoded
```

``` json
{"表单数据":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzU2NTYwODkzNCwiaWF0IjoxNTY3NTY1NjA4fQ.J_END7-qsN7HyPmLpQXHcaBOylNvI96OTSEgVg4X-9w"}}
```

``` json
{
  "status": "success",
  "res": [
    {
      "id": 5,
      "itemid": 3,
      "uuid": 1
    },
    {
      "id": 7,
      "itemid": 1,
      "uuid": 1
    },
    {
      "id": 8,
      "itemid": 2,
      "uuid": 1
    },
    {
      "id": 9,
      "itemid": 3,
      "uuid": 1
    },
    {
      "id": 10,
      "itemid": 4,
      "uuid": 1
    },
    {
      "id": 11,
      "itemid": 5,
      "uuid": 1
    },
    {
      "id": 12,
      "itemid": 6,
      "uuid": 1
    },
    {
      "id": 13,
      "itemid": 7,
      "uuid": 1
    },
    {
      "id": 14,
      "itemid": 8,
      "uuid": 1
    },
    {
      "id": 15,
      "itemid": 9,
      "uuid": 1
    }
  ]
}
```

### add

* the field of data is a json string list of itemid that you wanna to add to your favorites.

```
POST /fav/add
```

```
Content-Type:application/x-www-form-urlencoded
```

```json
{"表单数据":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzU5NjMwMjIwMCwiaWF0IjoxNTY3NTk2MzAyfQ.ijUssByflHjPqWOMMcJMvqroJCaS1PKOBXUYYaS6dYU","data":"[1,2,3]"}}
```

``` json
//success
{
  "status": "success"
}
```

### delete

* the field of data is a json string list of itemid that you wanna to delete from your favorites.

```
POST /fav/delete
```

```
Content-Type:application/x-www-form-urlencoded
```

``` json
{"表单数据":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzU2NTYwODkzNCwiaWF0IjoxNTY3NTY1NjA4fQ.J_END7-qsN7HyPmLpQXHcaBOylNvI96OTSEgVg4X-9w","data":"[1,2,3]"}}
```

```json
{
  "status": "success"
}
```

## Message

### send message

``` 
POST /user/chat/push
```

```
Content-Type:application/x-www-form-urlencoded
```

``` json
{"表单数据":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzU2NTYwODkzNCwiaWF0IjoxNTY3NTY1NjA4fQ.J_END7-qsN7HyPmLpQXHcaBOylNvI96OTSEgVg4X-9w","to":"1","data":"hi,+world."}}
```

``` json
//success
{"status":"success"}
```

### fetch new message

* this interface will only return messages that have never been fetched.

* we suggest that you use this to check whether you have a new message or not.

``` 
POST /user/chat/fetchnew
```

```
The name property of the file is arbitrary and the request size is no greater than 2mb
```

``` json
{"表单数据":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzU2NTYwODkzNCwiaWF0IjoxNTY3NTY1NjA4fQ.J_END7-qsN7HyPmLpQXHcaBOylNvI96OTSEgVg4X-9w"}}
```

``` json
{
  "status": "success",
  "data": [
    {
      "id": 2,
      "from": 1,
      "to": 1,
      "data": "hi, world.",
      "fetched": false,
      "createdAt": "2019-09-04T14:29:05.000Z",
      "updatedAt": "2019-09-04T14:29:05.000Z"
    }
  ]
}
```

### fetch all message

* if you lost your message or want to sync you message record, it’s a good choice

```
POST /user/chat/fetchall
```

```
Content-Type: application/x-www-form-urlencoded
```

```json
{"表单数据":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzU2NTYwODkzNCwiaWF0IjoxNTY3NTY1NjA4fQ.J_END7-qsN7HyPmLpQXHcaBOylNvI96OTSEgVg4X-9w"}}
```

``` json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "from": 1,
      "to": 1,
      "data": "hi",
      "fetched": true,
      "createdAt": "2019-09-04T07:17:22.000Z",
      "updatedAt": "2019-09-04T07:37:56.000Z"
    },
    {
      "id": 2,
      "from": 1,
      "to": 1,
      "data": "hi, world.",
      "fetched": true,
      "createdAt": "2019-09-04T14:29:05.000Z",
      "updatedAt": "2019-09-04T14:36:32.000Z"
    }
  ]
}
```


## Search

- todo