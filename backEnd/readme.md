# FOOF Background Service
> Author
## SQL table fields
[view](SQLTables.md)
## Warning
1. If you meet Exception:
	> Error: Client does not support authentication protocol requested by server; consider upgrading MySQL client
	You are suggested to change the type of your password, please typeing like this:
	``` SQL
	alter user 'USER'@'localhost' identified with mysql_native_password by 'PASSWORD'
	flush privileges;
	```
