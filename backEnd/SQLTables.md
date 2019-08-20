# users
```
+-----------+------------------+------+-----+---------+----------------+
| Field     | Type             | Null | Key | Default | Extra          |
+-----------+------------------+------+-----+---------+----------------+
| uuid      | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| username  | varchar(100)     | NO   |     | NULL    |                |
| idcard    | varchar(100)     | NO   |     | NULL    |                |
| studentid | varchar(100)     | NO   |     | NULL    |                |
| address   | varchar(100)     | NO   |     | NULL    |                |
| avatorurl | varchar(100)     | NO   |     | NULL    |                |
| verified  | tinyint(1)       | YES  |     | NULL    |                |
| score     | tinyint(4)       | YES  |     | NULL    |                |
+-----------+------------------+------+-----+---------+----------------+
```
# goods
```
+---------------+------------------+------+-----+---------+----------------+
| Field         | Type             | Null | Key | Default | Extra          |
+---------------+------------------+------+-----+---------+----------------+
| itemid        | int(10) unsigned | NO   | PRI | NULL    | auto_increment |
| title         | varchar(100)     | YES  |     | NULL    |                |
| type          | tinyint(4)       | YES  |     | NULL    |                |
| price         | double           | YES  |     | NULL    |                |
| imgurl        | varchar(100)     | YES  |     | NULL    |                |
| depreciatione | tinyint(4)       | YES  |     | NULL    |                |
| note          | varchar(100)     | YES  |     | NULL    |                |
+---------------+------------------+------+-----+---------+----------------+
```