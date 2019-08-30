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
## Interface to frond end.
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
  "status": "success"
}
```
### login
```
POST /user/login
```
```json
{"表单数据":{"phonenumber":"0101234567","password":"2322dbbdcaa610d99a2ee9d0154294a4e41c279c"}}
```

``` json
//success
{
  "status": "success",
  "info": {
    "uuid": 2,
    "password": "2322dbbdcaa610d99a2ee9d0154294a4e41c279c",
    "username": "WakamiyaEve",
    "phonenumber": "0101234567",
    "idcard": "21341",
    "studentid": "213413",
    "address": "M2C",
    "avatarurl": "image\\avatar\\2.jpg",
    "verified": 0,
    "score": 10
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoyLCJnZW5lcmF0ZSI6MTU2Njk4OTc3MDk4OSwiaWF0IjoxNTY2OTg5NzcwfQ.s5o0Vn8TN-EyWEz-dwwlUfz7CwXnbj5yynwiUO5rjho"
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
``` json
{"username":"王胜男","phonenumber":"2333","password":"2333","idcard":"234234","studentid":"slfdf","address":"m2c"}
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
POST /user/avatar
```

``` json
-----------------------------697348710942
Content-Disposition: form-data; name="token"

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjo4LCJnZW5lcmF0ZSI6MTU2NzAwNTkxMzk0MSwiaWF0IjoxNTY3MDA1OTEzfQ.p9VEup6vB3VVkR-o6PfexryAuGCndAyywJvbpdgtvx8
-----------------------------697348710942
Content-Disposition: form-data; name="uuid"

8
-----------------------------697348710942
Content-Disposition: form-data; name="file"; filename="error.jpg"
Content-Type: image/jpeg

ÿØÿá
```

``` json
{"status":"success"}
```

### me

```
POST \user\me
```

```json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzAwNzQ0NjA2MiwiaWF0IjoxNTY3MDA3NDQ2fQ.DTgLQeHdrkZYS1Z-8Pdg3FVk9PjZ-6OfENrgSF2I-JI","uuid":"1"}
```

```json
{
  "uuid": 1,
  "password": null,
  "username": "slkdjflk",
  "phonenumber": "12345678901",
  "idcard": "2341234",
  "studentid": "21341234",
  "address": "T1C",
  "avatarurl": "e79ce7ff03c1245a15b566515a",
  "verified": 0,
  "score": 10,
  "status": "success"
}
```

### published

```
POST \user\published
```

``` json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzAwNzQ0NjA2MiwiaWF0IjoxNTY3MDA3NDQ2fQ.DTgLQeHdrkZYS1Z-8Pdg3FVk9PjZ-6OfENrgSF2I-JI","uuid":"1"}
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

``` json
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjo4LCJnZW5lcmF0ZSI6MTU2NzAwNTkxMzk0MSwiaWF0IjoxNTY3MDA1OTEzfQ.p9VEup6vB3VVkR-o6PfexryAuGCndAyywJvbpdgtvx8","uuid":"8","title":"散装纯净水","type":"3","price":"234.6","imgurl":"86358268","depreciatione":"100","note":"jsdfjsdsf"}
```

``` json
//success
{"status":"success"}
//no item
{"status":"none"}
```

*  upload avatar

```
POST \item\image
```

``` json
-----------------------------845247425332

Content-Disposition: form-data; name="token"



eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxLCJnZW5lcmF0ZSI6MTU2NzAwNzQ0NjA2MiwiaWF0IjoxNTY3MDA3NDQ2fQ.DTgLQeHdrkZYS1Z-8Pdg3FVk9PjZ-6OfENrgSF2I-JI

-----------------------------845247425332

Content-Disposition: form-data; name="itemid"



1

-----------------------------845247425332

Content-Disposition: form-data; name="file0"; filename="error.jpg"

Content-Type: image/jpeg



ÿØÿá
```

```json
{"status":"success"}
```

### About sold
* sold
-1. not sold
* want
-2. not bought
* finished
[uuid]. the uuid of the other member