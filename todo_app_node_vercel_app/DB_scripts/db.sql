CREATE TABLE tbltodoapp
(
id int not null primary key auto_increment,
title varchar(200) not null,
status boolean default 0 ,
create_at timestamp default current_timestamp
)