# Interface to frond end.
## Test page
[inari.ml:8080](http://inari.ml:8080)
## Users
### public query
```
GET /user/[uuid]
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
### login
```
POST /user/login
```
e.g.
[inari.ml:8080/login.html](http://inari.ml:8080/login.html)
- return
``` json
\\ success
{"status":"success","info":{"uuid":2,"password":"2322dbbdcaa610d99a2ee9d0154294a4e41c279c","username":"WakamiyaEve","phonenumber":"0101234567","idcard":"21341","studentid":"213413","address":"M2C","avatarurl":"https://avatars2.githubusercontent.com/u/45632558?s=400&v=4","verified":0,"score":10}}
\\ password incorrect
{"status":"failure","info":"password incorrect"}
\\ invaild request
{"status":"failure","info":"invaild request"}
```
### register
```
POST /user/register
```
e.g.
[inari.ml:8080/regimester.html](http://inari.ml:8080/register.html)
-return
``` json
\\ success
{"status":"success"}
\\ phone number already token
{"status":"failure","info":"phone number already token"}
\\ invaild request
{"status":"failure","info":"invaild request"}
```
## Goods
* query
```
inari:ml:8080/item/[itemid]
```
e.g.
[inari.ml:8080/item/3](http://inari.ml:8080/item/3)
``` json
\\success
\\no item
{"status":"none"}
```