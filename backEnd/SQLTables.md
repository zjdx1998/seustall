# users
```
+-----------+--------------+------+-----+---------+-------+
| Field     | Type         | Null | Key | Default | Extra |
+-----------+--------------+------+-----+---------+-------+
| uuid      | varchar(20)  | NO   | PRI | NULL    |       |
| password  | char(40)     | NO   |     | NULL    |       |
| username  | varchar(100) | NO   |     | NULL    |       |
| idcard    | char(20)     | NO   |     | NULL    |       |
| studentid | char(20)     | NO   |     | NULL    |       |
| address   | varchar(100) | NO   |     | NULL    |       |
| avatorurl | varchar(100) | NO   |     | NULL    |       |
| verified  | tinyint(1)   | YES  |     | NULL    |       |
| score     | tinyint(4)   | YES  |     | NULL    |       |
+-----------+--------------+------+-----+---------+-------+
```
# goods
```
+---------------+--------------+------+-----+---------+-------+
| Field         | Type         | Null | Key | Default | Extra |
+---------------+--------------+------+-----+---------+-------+
| itemid        | char(20)     | NO   | PRI | NULL    |       |
| uuid          | char(20)     | NO   |     | NULL    |       |
| title         | varchar(100) | NO   |     | NULL    |       |
| type          | tinyint(4)   | NO   |     | NULL    |       |
| price         | double       | NO   |     | NULL    |       |
| imgurl        | char(100)    | NO   |     | NULL    |       |
| depreciatione | tinyint(4)   | NO   |     | NULL    |       |
| note          | varchar(100) | NO   |     | NULL    |       |
| sold          | tinyint(1)   | NO   |     | 0       |       |
+---------------+--------------+------+-----+---------+-------+
```