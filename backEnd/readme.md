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
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| uuid      | bigint(20)   | NO   | PRI | NULL    | auto_increment |
| password  | char(40)     | NO   |     | NULL    |                |
| username  | varchar(100) | NO   |     | NULL    |                |
| idcard    | char(20)     | NO   |     | NULL    |                |
| studentid | char(20)     | NO   |     | NULL    |                |
| address   | varchar(100) | NO   |     | NULL    |                |
| avatarurl | varchar(100) | NO   |     | NULL    |                |
| verified  | tinyint(1)   | YES  |     | NULL    |                |
| score     | tinyint(4)   | YES  |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
```
#### goods
```
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| itemid        | bigint(20)   | NO   | PRI | NULL    | auto_increment |
| uuid          | bigint(20)   | NO   |     | NULL    |                |
| title         | varchar(100) | NO   |     | NULL    |                |
| type          | tinyint(4)   | NO   |     | NULL    |                |
| price         | double       | NO   |     | NULL    |                |
| imgurl        | char(100)    | NO   |     | NULL    |                |
| depreciatione | tinyint(4)   | NO   |     | NULL    |                |
| note          | varchar(100) | NO   |     | NULL    |                |
| sold          | tinyint(1)   | NO   |     | 0       |                |
+---------------+--------------+------+-----+---------+----------------+
```
## Interface to frond end.
### Test page
[inari.ml:8080](http://inari.ml:8080)
### Users
#### public query
```
inari:ml:8080/user/[uuid]
```
e.g.
[inari.ml:8080/user/2](http://inari.ml:8080/user/2)
- return
``` json
\\success
{"uuid":2,"password":"412458ea93597da7a7f9e72a9469bc86c49c4bfb","username":"WakamiyaEve","idcard":"213182873","studentid":"71117503","address":"M1A","avatarurl":"https://avatars2.githubusercontent.com/u/45632558?s=400&v=4","verified":1,"score":10,"status":"success"}
\\no user
{"status":"none"}
```
### Goods
* query
```
inari:ml:8080/item/[itemid]
```
e.g.
[inari.ml:8080/item/3](http://inari.ml:8080/item/3)
```json
\\success
{"itemid":3,"uuid":1,"title":"ASUS ZenBook S UX391 Full HD 13.3 Inch Metal Laptop","type":1,"price":499.99,"imgurl":"https://images-cn.ssl-images-amazon.com/images/I/71qjdWFl%2BqL._SL1500_.jpg","depreciatione":1,"note":"Slim. Stunning. Supreme. ZenBook S is all these, yet so much more. ","sold":0,"status":"success"}
\\no item
{"status":"none"}
```