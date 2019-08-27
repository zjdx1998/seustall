USE fool;
create table `users`(
    `uuid` int unsigned auto_increment,
    `username` varchar(100) not null,
    `idcard` varchar(100) not null,
    `studentid` varchar(100) not null,
    `address` varchar(100) not null,
    `avatarurl` varchar(100) not null,
    `verified` boolean,
    `score` tinyint,
    primary key (`uuid`))
    engine =InnoDB default charset=utf8;
CREATE TABLE goods(
	`itemid` int unsigned auto_increment,
    `title` varchar(100),
    `type` tinyint,
    `price` double,
    `depreciatione` tinyint,
    `note` varchar(100),
	primary key(`itemid`)
	)engine= InnoDB default charset=utf8;