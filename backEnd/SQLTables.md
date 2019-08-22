# users
```
+-----------+--------------+------+-----+---------+-------+
| Field     | Type         | Null | Key | Default | Extra |
+-----------+--------------+------+-----+---------+-------+
| uuid      | varchar(20)  | NO   | PRI | NULL    |       | 用户唯一id
| password  | char(40)     | NO   |     | NULL    |       | 用户信息加密密码
| username  | varchar(100) | NO   |     | NULL    |       | 用户名
| idcard    | char(20)     | NO   |     | NULL    |       | 一卡通号
| studentid | char(20)     | NO   |     | NULL    |       | 学号
| address   | varchar(100) | NO   |     | NULL    |       | 分区地址
| avatorurl | varchar(100) | NO   |     | NULL    |       | 头像
| verified  | tinyint(1)   | YES  |     | NULL    |       | 是否验证
| score     | tinyint(4)   | YES  |     | NULL    |       | 信用评分
+-----------+--------------+------+-----+---------+-------+
```
# goods
```
+---------------+--------------+------+-----+---------+-------+
| Field         | Type         | Null | Key | Default | Extra |
+---------------+--------------+------+-----+---------+-------+
| itemid        | char(20)     | NO   | PRI | NULL    |       | 物品唯一id
| uuid          | char(20)     | NO   |     | NULL    |       | 发布者唯一id
| title         | varchar(100) | NO   |     | NULL    |       | 物品标题
| type          | tinyint(4)   | NO   |     | NULL    |       | 类型
| price         | double       | NO   |     | NULL    |       | 价格
| imgurl        | char(100)    | NO   |     | NULL    |       | 物品图像
| depreciatione | tinyint(4)   | NO   |     | NULL    |       | 折旧
| note          | varchar(100) | NO   |     | NULL    |       | 详情
| sold          | tinyint(1)   | NO   |     | 0       |       | 是否售出
+---------------+--------------+------+-----+---------+-------+
```