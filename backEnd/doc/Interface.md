# Interface to frond end.
## Test page
[inari.ml:8080](http://inari.ml:8080)

## Users

### public query

```
GET /user/[uuid]
```
```
None
```

``` json

```
### login
```
POST /user/login
```
```json
{"表单数据":{"phonenumber":"0101234567","password":"2322dbbdcaa610d99a2ee9d0154294a4e41c279c"}}
```

``` json
\\success
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
\\ password incorrect
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
GET /item/[itemid]
```
``` json
\\success
\\no item
{"status":"none"}
```
* add
```
POST \item\add
```