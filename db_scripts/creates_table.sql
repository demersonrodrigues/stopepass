create database stopepass;
use stopepass;

create table users_type (
	id int primary key auto_increment,
    cd_type int not null,
    name_type varchar (20) not null
);

create table users (
	id int primary key auto_increment,
    name varchar(100)not null,
    date_born date not null,
    cpf varchar(14) unique not null,
    email varchar(80) unique not null,
    tel varchar(15) unique not null,
    user_type int not null,
    foreign key (user_type) references users_type(id)
);

create table vehicles (
	id int primary key auto_increment,
    plate varchar(7) unique not null,
    category varchar(10) not null,
    year_vehicle year not null,
    color varchar(20) not null,
    model varchar(20) not null
);
