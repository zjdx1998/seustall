# FOOF Background Service
> Author
> - Hanyuu Furude
> - Ted Zhan
## Characteristics
- Docker
- Nginx
- WebPack
- koa
- Sequelize

## Run docker

``` docker
docker run --network host -d -v [locationOfAvatarOnPhysicsMachine]:[locationOfAvatarOnContainer] hanyuufurude/foofserver:v[x]
```
- e.g.
``` docker
docker run --network host -d -v /home/admin/avatar:/foof/avatar hanyuufurude/foofserver:v4
```
## Warning
1. If you meet Exception like this
	> Error: Client does not support authentication protocol requested by server; consider upgrading MySQL client

	You are suggested to change the type of your password, please typeing like this:
	``` SQL
	alter user 'USER'@'localhost' identified with mysql_native_password by 'PASSWORD'
	flush privileges;
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
#### goods
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
+---------------+--------------+------+-----+---------+----------------+
```
# Interface to frond end.

## Test page
[hanyuu.top:8080](http://hanyuu.top:8080)

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
  "uuid": 2,
  "password": "2322dbbdcaa610d99a2ee9d0154294a4e41c279c",
  "username": "WakamiyaEve",
  "phonenumber": null,
  "idcard": null,
  "studentid": null,
  "address": null,
  "avatarurl": "image\\avatar\\2.jpg",
  "verified": 0,
  "score": 10,  
  "info": "lsakfdjlk",
  "status": "success"
}
```
### login
```
POST /user/login
```
```
Content-Type:application/x-www-form-urlencoded
```

```json
{"表单数据":{"phonenumber":"1111","password":"1111"}}
```

``` json
//success
{
  "status": "success",
  "info": {
    "uuid": 1,
    "password": null,
    "username": "WakamiyaEve",
    "phonenumber": "1111",
    "idcard": "1111",
    "studentid": 1111,
    "address": "address",
    "avatarurl": "image\\avatar\\default.jpg",
    "verified": 0,
    "score": 10,
    "info": "info"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzI0Mzk5MzU3NywiaWF0IjoxNTY3MjQzOTkzfQ.EcKlNs69v11mF2glsAAQsQz0MLep2KPDSugf_AwBPo0"
}
// password incorrect
{
  "status": "failure",
  "info": "password incorrect",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnZW5lcmF0ZSI6MTU2Njk4OTcxMjAyMywiaWF0IjoxNTY2OTg5NzEyfQ.cLwu0_TK_Z4mYI3xDp3RJQ9NJoa4R1Pc-tX8E4xFUWY"
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
{"表单数据":{"phonenumber":"2222","verifiycode":"2222","password":"2222"}}
```

``` json
// success
{"status":"success"}
// phone number already token
{"status":"failure","info":"phone number already token"}
// invaild request
{"status":"failure","info":"invaild request"}
```
### upload avatar

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

### me

```
POST \user\me
```

```
Content-Type:application/x-www-form-urlencoded
```

```json
{"表单数据":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzI0ODU5OTI4OSwiaWF0IjoxNTY3MjQ4NTk5fQ.ezvX48rpjAAzd6Bwr3eFrSCnrQT_3SGoXID1NSWAa_8"}}
```

```json
//success
{
  "uuid": 1,
  "password": null,
  "username": "WakamiyaEve",
  "phonenumber": "1111",
  "idcard": "1111",
  "studentid": 1111,
  "address": "address",
  "avatarurl": "image\\avatar\\1.jpg",
  "verified": 0,
  "score": 10,
  "info": "info",
  "status": "success"
}
//wrong token
403 Forbidden
```

### modify

```
POST \user\modify
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









### published

```
POST \user\published
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
    "itemid": 1,
    "uuid": 1,
    "title": "窝窝头",
    "type": 1,
    "price": 0.25,
    "imgurl": "[\"image\\\\item\\\\1_0.jpg\",\"image\\\\item\\\\1_1.jpg\",\"image\\\\item\\\\1_2.jpg\",\"image\\\\item\\\\1_3.jpg\"]",
    "depreciatione": 1,
    "note": "嘿嘿！",
    "sold": 0
  },
  {
    "itemid": 2,
    "uuid": 1,
    "title": "两个窝窝头",
    "type": 1,
    "price": 0.5,
    "imgurl": "https://www.meishij.net/zuofa/wowotou_2.html",
    "depreciatione": 1,
    "note": "嘿嘿！",
    "sold": 0
  }
]
```









## Items

* query
```
GET /item/[itemid]
```
```json
None
```

``` json
//success
{"status":"success"}
//no item
{"status":"none"}
```
* add
```
POST \item\add
```

```
Content-Type:application/x-www-form-urlencoded
```

``` json
{"表单数据":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzI0ODU5OTI4OSwiaWF0IjoxNTY3MjQ4NTk5fQ.ezvX48rpjAAzd6Bwr3eFrSCnrQT_3SGoXID1NSWAa_8","title":"屏幕清洁剂","type":"3","price":"3.55","imgurl":"{+++\"imgurl\":+[+++++\"image\\\\item\\\\0.21266930758871538.jpg\",+++++\"image\\\\item\\\\0.4408016895777478.jpg\",+++++\"image\\\\item\\\\0.7268863338186755.jpg\",+++++\"image\\\\item\\\\0.7410747437739387.jpg\"+++]+}","depreciatione":"50","note":"清洁剂","sold":"-1"}}
```

``` json
//success
{"status":"success"}
//no item
{"status":"none"}
//wrong token
403 Forbidden
```

*  upload image

```
POST \item\image
```

```
Content-Type:multipart/form-data
```

> 文件的name属性任意，请求尺寸不大于2mb

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
{"status":"success"}
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

### About sold

* sold
-1. not sold
* want
-2. not bought
* finished
[uuid]. the uuid of the other member