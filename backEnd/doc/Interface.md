# Interface to frond end.
## Test page
[inari.ml:8080](http://inari.ml:8080)
## Users
### public query
```
inari:ml:8080/user/[uuid]
```
e.g.
[inari.ml:8080/user/2](http://inari.ml:8080/user/2)
- return
```
\\success
{"uuid":2,"password":"412458ea93597da7a7f9e72a9469bc86c49c4bfb","username":"WakamiyaEve","idcard":"213182873","studentid":"71117503","address":"M1A","avatorurl":"https://avatars2.githubusercontent.com/u/45632558?s=400&v=4","verified":1,"score":10,"status":"success"}
\\no user
{"status":"none"}
```
## Goods
* query
```
inari:ml:8080/item/[itemid]
```
e.g.
[inari.ml:8080/item/3](http://inari.ml:8080/item/3)
```
\\success
\\no item
{"status":"none"}
```