---
title: day22 数据库
icon: write
category:
  - JavaSE
tag:
  - JavaSE
sticky: false
star: false
article: true
timeline: true
---
## 数据库(Database)

* 定义：数据库全称，数据库管理系统，存储数据和获取数据的软件fdfajjsadfkjertqeuriwe4j\
  * 数据库中的概念：
    * 数据库：数据库管理系统，指软件(如MySQL、Oracle)
    * 数据库：MySQL中的database(文件夹)
* 容器(数组、集合)存储数据无法实现永久存储(程序停止后数据消失)
* io流技术，存储到本地文件(更改时需要遍历文件中的所有数据，效率低下，修改数据麻烦)
* 名词解释
  * 表：数据库中的文件
  * 数据库：MySQL中的database(文件夹)
  * 字段又称为属性，二维表的一列称为一个字段（属性）
  * 字段类型也是数据类型，如int,char,varchar,bit等等。
  * 字段宽度表示这个字段能存储的最大长度。
  * 记录就是表格中的每一行
  * 字段值就是字段列中的记录。
  * ![image-20220228210121910](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220228210121910.png)
* 分类：
  * 关系型数据库：把复杂的数据结构归结为简单的二元关系（即二维表格形式）
    * MySQL(重点)：(Oracle公司) 5版本免费。新版本收费
    * Oracle：(Oracle公司)
    * DB2：(IBM公司)
    * SQL Server：微软公司

  * 非关系型数据库：键值存储数据库、列存储（Column-oriented）数据库、面向文档（Document-Oriented）数据库、图形数据库等数据库的总称
    * Redis

    * MongoDB

    * HBase

    * Neo4J

## MySQL

* 打开MySQL服务
  * 搜索里输入服务，找到mysql打开
  * 运行窗口输入service.msc，找到mysql打开
  * net start mysql
* 停止MySQL服务
  * net stop mysql
* 登录MySQL
  * mysql -uroot -p123
* 退出MySQL
  * exit

## SQL基础语法

* Structured Query Language 结构化查询语言

| 数据库名           | 解释                                       |
  | ------------------ | ------------------------------------------ |
  | information schema | 数据库元数据，基础数据                     |
  | mysql              | 配置数据库，其中包含用户信息（账户、密码） |
  | performance schema | 运行数据，日志文件，运行情况               |
  | test               | 测试数据库                                 |

* SQL工业化标准：使用SQL 工业化标准做出来的sql语句，可以操作任何数据库，通用

* 常见的数据类型

  * 数值日期



  ```sql
  date ： 日期值。只包含年月日
  	eg ：birthday date ： 
  datetime ： 混合日期和时间值。包含年月日时分秒
  ```

  * 字符串


  ```sql
  char ： 定长字符串。
  	优点：存储性能高
  	缺点：浪费空间
  	eg ： name char(10)  如果存储的数据字符个数不足10个，也会占10个的空间，最多 255 个字符
  varchar ： 变长字符串。
  	优点：节约空间
  	缺点：存储性能底
  	eg ： name varchar(10) 如果存储的数据字符个数不足10个，那就数据字符个数是几就占几个的空间	
  ```

  * 

    | 类型         | 解释                                                         |
    | ------------ | ------------------------------------------------------------ |
    | float        | 浮点型                                                       |
    | double       | 双精度类型                                                   |
    | decimal(5,2) | 小数类型                                                     |
    | tinytext     | 存放最大长度为 255 个字符的字符串                            |
    | text         | 存放最大长度为 65,535 个字符的字符串                         |
    | mediumtext   | 存放最大长度为 16,777,215 个字符的字符串                     |
    | longtext     | 存放最大长度为 4,294,967,295 个字符的字符串                  |
    | date         | 日期，格式：%Y-%m-%d                                         |
    | datetime     | 日期时间组合，日期和时间的组合。格式：%Y-%m-%d hh:mm:ss      |
    | timetamp     | 时间戳，timestamp 值使用 Unix 纪元('1970-01-01 00:00:00' UTC) 至今的描述来存储。格式：%Y-%m-%d hh:mm:ss |
    | time         | 时间int :整数                                                |

* 注意：SQL语句除了登录和退出指令，其他指令都要在指令末位加上";"

* 注释为：

  * 单行注释: -- 注释内容 或 #注释内容(MySQL 特有)  

    > 注意：使用-- 添加单行注释时，--后面一定要加空格，而#没有要求。

  * 多行注释: /* 注释 */

* ``为转义字符

* 分类：

  * DDL：数据库定义语言

    * 可以操作数据库管理系统中数据库和表的结构
    * create 创建
    * drop 删除
    * alter 修改表的结构

  * *DML：数据库操作语言

    * 可以操作数据库中表中的数据的 增、删、改
    * INSERT 插入
    * UPDATE 更新
    * DELETE 删除

  * *DQL：数据库查询语言

    * 可以操作数据库中表中的数据的 查

    * SELECT <字段名表>

    * FROM <表或视图名>

    * WHERE <查询条件>

      

  * DCL：数据库控制语言

    * 可以操作用户的等级、权限，用户密码等功能
    * GRANT、COMMIT 、ROLLBACK 

  

### DDL：数据库定义语言

| 代码                                                         | 解释                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| mysql -u root -p                                             | mysql调用mySQL安装目录bin文件夹下的mysql.exe程序，-u root 登录root用户，-p 输入密码 |
| exit                                                         | 退出MySQL                                                    |
| show databases；                                             | 查询数据库                                                   |
| show tables;                                                 | 查看当前数据库的表                                           |
| show create database 数据库名                                | 显示数据库创建信息                                           |
| show create table 表名                                       | 显示表的创建信息                                             |
| CREATE DATABASE IF NOT EXISTS 数据库名称;                    | 数据库的增加判断                                             |
| create database 数据库名 default character set utf8          | 创建数据库的同时指定该数据库编码                             |
| create table 表名(<br />字段名 字段类型,<br />字段名 字段类型<br />) | 创建表                                                       |
| drop database 数据库名                                       | 删除数据库                                                   |
| drop table 表名                                              | 删除表                                                       |
| drop table if exists 表名;                                   | 删除表，该语法可以避免报错                                   |
| alter database 数据库名 default character set utf8           | 修改数据库默认编码                                           |
| set names gbk                                                | 临时设置MySQL编码                                            |
| use 数据库名                                                 | 选中数据库                                                   |
| desc 表名                                                    | 查看表的结构                                                 |
| alter table 表名 add (column) 字段名 字段类型 (after 字段名) | 添加字段(在某个字段之后)                                     |
|                                                              |                                                              |
| alter table 表名 change 被修改字段名 新字段名 字段类型       | 修改字段名、类型(注意：当有字段值存在时，不能修改字段类型)   |
| alter table 表名 modify (column) 字段名 字段类型;            | 修改字段类型                                                 |
| alter table 表名 drop (column) 字段名                        | 删除字段                                                     |
| alter table 旧表名 rename (to) 新表名                        | 重命名                                                       |
| rename table 旧表名 to 新表名                                | 重命名                                                       |
| truncate 表名                                                | 保留字段，删除所有记录。(删除原表，创建一张字段相同的无记录空表，属于DDL的sql语句) |

### DML：数据库操作语言

| 代码                                                         | 解释                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| SELECT @@identity;                                           | @@identity会记录上一条insert语句添加数据的自增主键值 (数据库中@@开头的是系统变量 ) |
| insert into 表名 values(字段值1，字段值2，字段值3)，<br />(字段值1，字段值2，字段值3) | 插入数据(所有字段)                                           |
| insert into 表名(字段名1，字段名2) value(字段值1，字段值2)   | 插入数据(部分字段)                                           |
| update 表名 set 字段名 = 字段值,字段名 = 字段值 where 条件   | 通过指定条件修改字段值                                       |
| delete from 表名 (where 条件)                                | 保留字段，删除所有记录。(删除满足条件的记录)                 |

```sql
show databases ;-- 查看库中的表
use db1;-- 使用该数据库


# DDL
drop table if exists student ;-- 删除存在的表
create table student (
    id int,-- 整型，四个字节
    name varchar(10),-- 可变长字符串（字符串宽度小于等于10即可）
    gender char(1),-- 不可变长字符串
    birthday date,-- date表示日期，tatetime表示日期和时间
    score double(5,2),-- 5表示数据的总长度，2表示小数点后面的位数
    email varchar(64),
    tel varchar(15),
    status tinyint-- 小整型，1个字节
);
desc student;-- 查看表的结构
alter table student rename person;-- 修改字段名
alter table person rename to student; -- 修改字段名
alter table student add address varchar(20);-- 添加字段
alter table student modify address varchar(30);-- 修改字段名
alter table student change address addr varchar(50);-- 修改字段名和字段类型
alter table student drop addr;-- 删除字段

# DML
insert into student(id,name) value (null,'noby');-- 插入记录部分字段（value和values无区别）
INSERT INTO student VALUES (2,'李四','男','1999-11-12',88.88,'lisi@itcast.cn','13888888888',1);-- 插入记录的简写，插入全部字段
INSERT INTO student VALUES
(3,'李四','男','1999-11-11',88.88,'lisi@itcast.cn','13888888888',1),
(4,'李四','男','1999-11-11',88.88,'lisi@itcast.cn','13888888888',1),
(5,'李四','男','1999-11-11',88.88,'lisi@itcast.cn','13888888888',1);
delete from student where name = '李四';-- 删除字段
update student set name = '赵六' where id = 2;-- 修改字段
```

### DQL：数据库查询语言

DQL 的完整语法：

```sql
SELECT 
    字段列表
FROM 
    表名列表 
WHERE 
    条件列表
GROUP BY
    分组字段
HAVING
    分组后条件
ORDER BY
    排序字段
LIMIT
    分页限定
```

#### 单表查询

| 代码                                                         | 解释                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| select * form 表名                                           | 查询表的所有字段                                             |
| select distinct 字段1，字段2  from 表名                      | 当查询的结果中的字段1和字段2都相同时，只显示一项             |
| select 字段1，字段2......  from 表名                         | 查询指定字段                                                 |
| select 字段1 as 别名，字段2 as  别名                         | 给查询的结果起别名（as可以省略）                             |
| select 字段名，字段名..... from 表名 where 条件;             | 条件查询                                                     |
| select 字段名，字段名..... from 表名 字段 like 通配符;       | 模糊查询 _表示一个字符 %表示多个字符                         |
| select 字段... from 表名 order by 字段1 排序方式，字段2 排序方式; | 按照某个排序方式对某个字段进行排序查询，desc（降序），asc（升序，默认值），当字段1的排序相同时再进行字段2的排序 |
| select 字段... from 表名 limit 起始索引，页大小              | 分页查询                                                     |
| count (字段) 统计非空数据的条数(相同数据也计数)<br />avg (字段) 计算结果的平均值<br />sum (字段) 求和<br />max (字段) 最大值<br />min (字段) 最小值4 | 聚合查询：对查询出来数据做统计操作<br />如：select  max(sal),min(sal), avg(sal),sum(sal) from emp; |
| group by 字段<br />如：select avg(sal) from emp group by deptno; | 分组查询：将结果集按照指定的字段值一样的记录看作同一组，配合聚合函数使用可以对每组的数据进行统计并得出结果 |
| group by 字段 having 聚合函数条件判断语句<br />如：select max(sal),deptno from emp group by deptno having avg(sal)>2000; | 如果想要将聚合函数作为查询条件，不能直接跟在where后面，需要将聚合函数写在having子句中；having必须跟在group by子句之后,作用是添加过滤条件将不满足的分组去除；<br />查看部门平均工资高于2000的这些部门的最高工资是多少 |

```sql
# DQL
/*
 DQL完整语法：
SELECT
    字段列表
FROM
    表名列表
WHERE
    条件列表
GROUP BY
    分组字段
HAVING
    分组后条件
ORDER BY
    排序字段
LIMIT
    分页限定
 */
-- 导入数据
drop table if exists stu;
CREATE TABLE stu (
                     id int, -- 编号
                     name varchar(20), -- 姓名
                     age int, -- 年龄
                     sex varchar(5), -- 性别
                     address varchar(100), -- 地址
                     math double(5,2), -- 数学成绩
                     english double(5,2), -- 英语成绩
                     hire_date date -- 入学时间
);
INSERT INTO stu(id,NAME,age,sex,address,math,english,hire_date)
VALUES
(1,'马运',55,'男','杭州',66,78,'1995-09-01'),
(2,'马花疼',45,'女','深圳',98,87,'1998-09-01'),
(3,'马斯克',55,'男','香港',56,77,'1999-09-02'),
(4,'柳白',20,'女','湖南',76,65,'1997-09-05'),
(5,'柳青',20,'男','湖南',86,NULL,'1998-09-01'),
(6,'刘德花',57,'男','香港',99,99,'1998-09-01'),
(7,'张学右',22,'女','香港',99,99,'1998-09-01'),
(8,'德玛西亚',18,'男','南京',56,65,'1994-09-02');


# 基础查询
select * from stu;-- 查询所有字段，开发中尽量不用
select name 名字,age as 年龄,sex from stu ;-- 给查询的结果起别名
select name,age from stu where age > 20;-- 条件查询
select * from stu where hire_date between '1998-1-1' and '1998-12-31';-- 范围（包含两头）
select name,age from stu where age in(20,18,22);
select name,english from stu where english is null;-- 等于空的查询方法
select name from stu where name like '柳_';-- 模糊查询
select name,hire_date from stu where hire_date like '%09%';-- 模糊查询
select distinct name,age,sex from stu where age = 55;-- distinct可去除查询结果中的相同记录
select * from stu order by math desc,english asc;-- 排序，desc表示降序，asc表示升序（默认），当math字段的记录相同时通过English字段进行排序


# 聚合函数
-- 所有的聚合函数中null都不参与运算
select count(*) from stu; -- 统计记录的条数一般用*
select max(math),name from stu;-- 可以输入其他字段
select min(english) from stu;-- min计算中不统计null值
select avg(english) from stu;
select sum(english) from stu;

# 分组查询
-- 注意：分组之后，查询的字段为聚合函数和分组字段，查询其他字段无意义
-- 查询男同学和女同学各自的数学平均分，以及各自人数
select sex,avg(math),count(*) from stu group by sex;-- 这里的分组字段为sex，查询中输入其他字段将无意义
-- 查询男同学和女同学各自的数学平均分，以及各自人数，要求：分数低于70分的不参与分组
select sex,avg(math),count(*) from stu where math > 70 group by sex;-- where math > 70 分组前的条件限定（表示参与分组的条件）
-- 查询男同学和女同学各自的数学平均分，以及各自人数，要求：分数低于70分的不参与分组，分组之后人数大2
select sex,avg(math),count(*) from stu where math > 70 group by sex having count(*) > 2;-- having count(*) > 2 分组后的过滤条件（显示分组的条件）
/*
where和having区别：
·执行时机不一样：where是分组之前进行限定，不满足where条件，则不参与分组，而having是分组之后对结果进行过滤。
·可判断的条件不一样：where不能对聚合函数进行判断，having可以。
执行顺序：where>聚合函数>having
 */

# 分页查询
-- 其实索引=（页码-1）*每页条数
select * from stu limit 0,3;-- 0表示查询的起始记录（0开始），3表示显示的条数
select * from stu limit 3,3;-- 第二页
select * from stu limit 6,3;-- 第三页
```

## SQL高级语法

#### 多表查询

* 联合多张表查询数据即关联查询，查询的结果集中的字段来自多张表，关联查询的重点是连接条件,数据库是根据连接条件对表中的数据做关联然后查询内容的
* 笛卡尔积：关联查询通常要加连接条件,不写连接条件会出现"笛卡尔积”，笛卡尔积通常是一个无意义的结果集，笛卡尔积是将关联查询表中的数据一一连接一遍而产生的结果集，数据量为关联查询表数据量的乘积

* 连接查询

  ![image-20220426193628033](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220426193628033.png) 

  * 内连接查询 ：相当于查询AB交集数据
  * 外连接查询
    * 左外连接查询 ：相当于查询A表所有数据和交集部门数据
    * 右外连接查询 ： 相当于查询B表所有数据和交集部分数据

* 子查询
  * 子查询根据查询结果不同，作用不同
    * 子查询语句结果是单行单列，子查询语句作为条件值，使用 =  !=  >  <  等进行条件判断
    * 子查询语句结果是多行单列，子查询语句作为条件值，使用 in 等关键字进行条件判断
    * 子查询语句结果是多行多列，子查询语句作为虚拟表

| 代码                                                         | 解释                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| SELECT * FROM emp,dept WHERE emp.deptno = dept.deptno;       | 通过关联字消除笛卡尔积                                       |
| select e.ename,e.deptno,d.dname from emp e,dept d where e.deptno=d.deptno; | 对于查询的某个字段在多张表上同时存在，我们可以使用表名或表别名来指定该字段来自哪张表 |
| SELECT * FROM zhangsan,lisi WHERE zhangsan.`name` = lisi.`name`; | 通过关联字段做等值判断                                       |
|                                                              |                                                              |
| SELECT * FROM zhangsan INNER JOIN lisi ON zhangsan.name = lisi.name; | 内连接：查询出两张表中的共同数据                             |
| SELECT * FROM boy LEFT OUTER JOIN girl ON boy.gid = girl.gid; | 左外连接：将左边表的所有数据查询出来，然后与右表的数据进行匹配，匹配不上的用null进行匹配 |
| SELECT * FROM boy RIGHT OUTER JOIN girl ON boy.gid = girl.gid; | 右外连接：将右边表的所有数据查询出来，然后与左表的数据进行匹配，匹配不上的用null进行匹配 |
| (SELECT * FROM boy) UNION ALL (SELECT * FROM girl);          | 全外连接：两张表的所有数据都查询出来                         |
| SELECT e.ename,m.ename FROM emp e,emp m WHERE e.mgr = m.empno; | 自连接：在有些情况下查询数据时需要将一张表当做两张表来使用，然后才能查询出指定的内容； |
|                                                              | 子查询：将一条SQL查询出来的结果作为另一条SQL的查询条件来使用 |
| (SELECT MAX(sal) sal,deptno FROM emp GROUP BY deptno) AS m_sal | 将查询出来的结果作为一张表来使用                             |

```sql
# 多表查询
-- 导入数据
DROP TABLE IF EXISTS emp;
DROP TABLE IF EXISTS dept;
-- 创建部门表
CREATE TABLE dept(
                     did INT PRIMARY KEY AUTO_INCREMENT,
                     dname VARCHAR(20)
);

-- 创建员工表
CREATE TABLE emp (
                     id INT PRIMARY KEY AUTO_INCREMENT,
                     name VARCHAR(10),
                     gender CHAR(1), -- 性别
                     salary DOUBLE, -- 工资
                     join_date DATE, -- 入职日期
                     dep_id INT,
                     FOREIGN KEY (dep_id) REFERENCES dept(did) -- 外键，关联部门表(部门表的主键)
);
-- 添加部门数据
INSERT INTO dept (dname) VALUES ('研发部'),('市场部'),('财务部'),('销售部');
-- 添加员工数据
INSERT INTO emp(name,gender,salary,join_date,dep_id) VALUES
('孙悟空','男',7200,'2013-02-24',1),
('猪八戒','男',3600,'2010-12-02',2),
('唐僧','男',9000,'2008-08-08',2),
('白骨精','女',5000,'2015-10-07',3),
('蜘蛛精','女',4500,'2011-03-14',1),
('小白龙','男',2500,'2011-02-14',null);


select * from emp , dept;-- 笛卡尔积 ： 有 A ,B两个集合 取 A,B所有的组合情况

# 内连接查询
-- 隐式内连接
SELECT
    *
FROM
    emp,
    dept
WHERE
        emp.dep_id = dept.did;

-- 查询 emp的 name， gender，dept表的dname
SELECT
    emp.name,
    emp.gender,
    dept.dname
FROM
    emp,
    dept
WHERE
        emp.dep_id = dept.did;

-- 给表 起别名
SELECT
    t1.NAME,
    t1.gender,
    t2.dname
FROM
    emp t1,
    dept t2
WHERE
        t1.dep_id = t2.did;


-- 显式内连接

select * from emp inner join dept on emp.dep_id = dept.did;

select * from dept inner join emp on emp.dep_id = dept.did;

select * from emp  join dept on emp.dep_id = dept.did;-- inner可以省略

# 外连接查询
-- 左外连接
-- 查询emp表所有数据和对应的部门信息
select * from emp left outer join dept on emp.dep_id = dept.did;-- outer可以省略


-- 右外连接
-- 查询dept表所有数据和对应的员工信息
select * from emp right join dept on emp.dep_id = dept.did;

select * from dept left join emp on emp.dep_id = dept.did;-- 左外连接和右外连接的可以互换

# 子查询
-- 查询工资高于猪八戒的员工信息
select * from emp where salary > (select salary from emp where name = '猪八戒');-- 子查询语句结果是单行单列，子查询语句作为条件值，使用 =  !=  >  <  等进行条件判断

-- 查询 '财务部' 和 '市场部' 所有的员工信息
select * from emp where dep_id in (select did from dept where dname in('财务部','市场部'));-- 子查询语句结果是多行单列，子查询语句作为条件值，使用 in 等关键字进行条件判断

-- 查询入职日期是 '2011-11-11' 之后的员工信息和部门信息
select * from (select * from emp where join_date > '2011-11-11' ) t1, dept where t1.dep_id = dept.did;-- 子查询语句结果是多行多列，子查询语句作为虚拟表
```

## 函数

* 日期、时间：
| 函数                | 解释                                     |
| ------------------- | ---------------------------------------- |
| sysdate()           | 获取当前日期和时间                       |
| curdate()           | 获取当前日期                             |
| curtime()           | 获取当前时间                             |
| now()               | 获取当前日期和时间                       |
| current_timestamp() | 获取当前时间戳，控制台打印时间而非时间戳 |

* 字符串
| 函数     | 解释       |
| -------- | ---------- |
| concat() | 连接       |
| length() | 长度       |
| lower()  | 转换为小写 |
| upper()  | 转换为大写 |
| trim()   | 去空白     |
| ltrim()  | 去左边空格 |
| rtrim()  | 去右边空格 |

* null

| ifnull(num,0) | 判断num是否为null，为空返回0，否则返回num   |
| ------------- | ------------------------------------------- |
| if(x,y,z)     | 判断x是否为null，如果为null返回z，否则返回y |
  * null的判断不能用 = 或 != ，而是 is 和 is not
  * 任何数据和null的操作得到的都是null
* SQL语句中的条件判断

| 语句                                                  | 解释                                                         |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| =,>,<,>=,<=,!=,<>                                     |                                                              |
| (not) between...and...                                | (不)在……和……之间                                             |
| (not) in(a，b，c)                                     | (不)在(a，b，c)之中                                          |
| and,&&                                                | 并且                                                         |
| or,ll                                                 | 或者                                                         |
| is (not) null                                         | (不)是null值 (判断null值不能用 = 或者 !=)                    |
| distinct                                              | 去除重复                                                     |
| as                                                    | 作为                                                         |
| select 字段 from 表名 where 字段 like '%字符1_字符2_' | 模糊查询，%表示多个字符，_表示一个字符，这两个字符之间可以任意组合 |


## 约束

```sql
# SQL高级
# 约束
# 表与表之间的一对多关系
-- 部门表（主表）
DROP TABLE IF EXISTS dept;
CREATE TABLE dept(
     id int primary key auto_increment,
     dep_name varchar(20),
     addr varchar(20)
);

-- 添加 2 个部门
insert into dept(dep_name,addr) values
('研发部','广州'),
('销售部', '深圳');

desc dept;
select * from dept;


-- 员工表(从表)，创建从表前应该先创建主表
DROP TABLE IF EXISTS emp;
CREATE TABLE emp (
     id INT PRIMARY KEY auto_increment, -- 员工id，主键（非空和唯一），且自增长
     ename VARCHAR(50) NOT NULL UNIQUE, -- 员工姓名，非空并且唯一
     joindate DATE NOT NULL , -- 入职日期，非空
     salary DOUBLE(7,2) NOT NULL , -- 工资，非空
     bonus DOUBLE(7,2) DEFAULT 0, -- 奖金，如果没有奖金默认为0
     dep_id int,

    -- 添加外键 dep_id,关联 dept 表的id主键
     CONSTRAINT fk_emp_dept FOREIGN KEY(dep_id) REFERENCES dept(id) -- fk_emp_dept为外键名称
)AUTO_INCREMENT 100;-- 设置自增长的起始值

-- 删除外键
# alter table emp drop FOREIGN key fk_emp_dept;

-- 建完表后，添加外键
# alter table emp add CONSTRAINT fk_emp_dept FOREIGN key(dep_id) REFERENCES dept(id);

-- 添加员工,dep_id 表示员工所在的部门
INSERT INTO emp (ename, joindate, salary,bonus,dep_id) values
('张三','1999-11-11',8800,5000,1),
('李四','1999-11-11',8800,5000,2),
('王五','1999-11-11',8800,5000,1),
('赵六','1999-11-11',8800,5000,2);

INSERT INTO emp(id,ename,joindate,salary,bonus,dep_id) values(2,'张三','1999-11-11',8800,5000,1);-- 指定自增长后还是可以手动赋值
desc emp;
SELECT * from emp;

/*
   外键约束:
      * 外键用来让两个表的数据之间建立链接，保证数据的一致性和完整性

   -- 创建表时添加外键约束
   CREATE TABLE 表名(
       列名 数据类型,
       …
       [CONSTRAINT] [外键名称] FOREIGN KEY(外键列名) REFERENCES 主表(主表列名)
   );

   -- 建完表后添加外键约束
   ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段名称) REFERENCES 主表名称(主表列名称);

   -- 删除约束
   ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;
*/


# 表的多对多关系
/*
   多对多：
      * 如：订单 和 商品
      * 一个商品对应多个订单，一个订单包含多个商品

   实现方式：建立第三张中间表，中间表至少包含两个外键，分别关联两方主键

*/
-- 订单表
DROP TABLE IF EXISTS tb_order;
CREATE TABLE tb_order(
                         id int primary key auto_increment,
                         payment double(10,2),
                         payment_type TINYINT,
                         status TINYINT
);
-- 商品表
DROP TABLE IF EXISTS tb_goods;
CREATE TABLE tb_goods(
                         id int primary key auto_increment,
                         title varchar(100),
                         price double(10,2)
);
-- 订单商品中间表
DROP TABLE IF EXISTS tb_order_goods;
CREATE TABLE tb_order_goods(
                               id int primary key auto_increment,
                               order_id int,
                               goods_id int,
                               count int
);
-- 建完表后，添加外键
alter table tb_order_goods add CONSTRAINT fk_order_id FOREIGN key(order_id) REFERENCES tb_order(id);
alter table tb_order_goods add CONSTRAINT fk_goods_id FOREIGN key(goods_id) REFERENCES tb_goods(id);
```

## 多表查询

* 连接查询

  ![image-20220426193628033](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220426193628033.png) 

  * 内连接查询 ：相当于查询AB交集数据
  * 外连接查询
    * 左外连接查询 ：相当于查询A表所有数据和交集部门数据
    * 右外连接查询 ： 相当于查询B表所有数据和交集部分数据


* 子查询
  * 子查询根据查询结果不同，作用不同
    * 子查询语句结果是单行单列，子查询语句作为条件值，使用 =  !=  >  <  等进行条件判断
    * 子查询语句结果是多行单列，子查询语句作为条件值，使用 in 等关键字进行条件判断
    * 子查询语句结果是多行多列，子查询语句作为虚拟表

```sql
# 多表查询
-- 导入数据
DROP TABLE IF EXISTS emp;
DROP TABLE IF EXISTS dept;
-- 创建部门表
CREATE TABLE dept(
                     did INT PRIMARY KEY AUTO_INCREMENT,
                     dname VARCHAR(20)
);

-- 创建员工表
CREATE TABLE emp (
                     id INT PRIMARY KEY AUTO_INCREMENT,
                     name VARCHAR(10),
                     gender CHAR(1), -- 性别
                     salary DOUBLE, -- 工资
                     join_date DATE, -- 入职日期
                     dep_id INT,
                     FOREIGN KEY (dep_id) REFERENCES dept(did) -- 外键，关联部门表(部门表的主键)
);
-- 添加部门数据
INSERT INTO dept (dname) VALUES ('研发部'),('市场部'),('财务部'),('销售部');
-- 添加员工数据
INSERT INTO emp(name,gender,salary,join_date,dep_id) VALUES
('孙悟空','男',7200,'2013-02-24',1),
('猪八戒','男',3600,'2010-12-02',2),
('唐僧','男',9000,'2008-08-08',2),
('白骨精','女',5000,'2015-10-07',3),
('蜘蛛精','女',4500,'2011-03-14',1),
('小白龙','男',2500,'2011-02-14',null);


select * from emp , dept;-- 笛卡尔积 ： 有 A ,B两个集合 取 A,B所有的组合情况

# 内连接查询
-- 隐式内连接
SELECT
    *
FROM
    emp,
    dept
WHERE
        emp.dep_id = dept.did;

-- 查询 emp的 name， gender，dept表的dname
SELECT
    emp.name,
    emp.gender,
    dept.dname
FROM
    emp,
    dept
WHERE
        emp.dep_id = dept.did;

-- 给表 起别名
SELECT
    t1.NAME,
    t1.gender,
    t2.dname
FROM
    emp t1,
    dept t2
WHERE
        t1.dep_id = t2.did;


-- 显式内连接

select * from emp inner join dept on emp.dep_id = dept.did;

select * from dept inner join emp on emp.dep_id = dept.did;

select * from emp  join dept on emp.dep_id = dept.did;-- inner可以省略

# 外连接查询
-- 左外连接
-- 查询emp表所有数据和对应的部门信息
select * from emp left outer join dept on emp.dep_id = dept.did;-- outer可以省略


-- 右外连接
-- 查询dept表所有数据和对应的员工信息
select * from emp right join dept on emp.dep_id = dept.did;

select * from dept left join emp on emp.dep_id = dept.did;-- 左外连接和右外连接的可以互换

# 子查询
-- 查询工资高于猪八戒的员工信息
select * from emp where salary > (select salary from emp where name = '猪八戒');-- 子查询语句结果是单行单列，子查询语句作为条件值，使用 =  !=  >  <  等进行条件判断

-- 查询 '财务部' 和 '市场部' 所有的员工信息
select * from emp where dep_id in (select did from dept where dname in('财务部','市场部'));-- 子查询语句结果是多行单列，子查询语句作为条件值，使用 in 等关键字进行条件判断

-- 查询入职日期是 '2011-11-11' 之后的员工信息和部门信息
select * from (select * from emp where join_date > '2011-11-11' ) t1, dept where t1.dep_id = dept.did;-- 子查询语句结果是多行多列，子查询语句作为虚拟表
```























## 代码

```mysql
-- 这是注释：关键字可以先输入一部分然后按tab键自动补全
-- 表的操作
-- 在创建表、操作表之前需要先告知MySQL操作的是哪个数据
USE java87;	-- 选中java87数据库进行操作

-- 新建表
-- 创建表的格式：
-- create table 表名(
-- 	字段名 字段类型,
-- 	字段名 字段类型,
-- 	...
-- );
-- field：字段   类似于类中的属性    字段类型：字段的类型，类似于属性类型

CREATE TABLE student(
	id INT,   -- int 整数   默认能够存储11位的整数
	NAME VARCHAR(20),  -- varchar(20)   字符串，长度为20的字符
	gender VARCHAR(2)
);

-- 通过SQL方式查看当前数据库下有哪些表格。
SHOW TABLES;

-- 查看表的结构
DESC student;

-- 删除表
DROP TABLE student;

-- 直接修改表的结构

-- 添加字段
ALTER TABLE student ADD COLUMN age INT;

-- 修改字段名字、类型 sex     
ALTER TABLE student CHANGE gender sex VARCHAR(30);

-- 删除字段
ALTER TABLE student DROP COLUMN age;

-- 插入数据  MySQL双引号、单引号都可以表示字符串  值的顺序要与字段顺序保持一致
INSERT INTO student VALUES(1001,'小明','男');

-- 插入数据两种方式
-- 给所有的字段赋值：插入数据时需要给定所有字段的值，如果不给定插入失败
--    insert into table values(值1,值2,.....)
--    Column count doesn't match value count at row 1  字段个数与值的个数不匹配
INSERT INTO student VALUES(1002,'小强');  -- 插入失败
-- 给部分字段赋值：
--    insert into table(字段1,字段2...) value(值1，值2...);
--    未插入字段值为null
INSERT INTO student(id,NAME) VALUE(1003,'小丽');


-- 批量插入
INSERT INTO student VALUES(1004,'刘备','男'),(1005,'貂蝉','女'),(1006,'东方不败',NULL);


-- 更新数据
-- update 表名 set 字段名 = 值 where 条件;   通过指定的条件修改数据
UPDATE student SET sex = '男' WHERE id = 1006;   -- sql中=与Java中的 == 一样

UPDATE student SET sex = '女' WHERE NAME = '东方不败';

UPDATE student SET NAME='令狐冲',sex='男' WHERE id = 1006;  -- 也可以同时修改多个字段的值


-- 删除数据
-- delete from 表名 where 条件;	  根据条件删除满足条件的数据
DELETE FROM student WHERE id = 1006;

DELETE FROM student WHERE sex = '男';


-- 查询表中所有的数据
SELECT * FROM student;


-- ----------------------------------------查询-------------------------------------------
-- 快速中在数据库查找出我们想要的数据
-- 格式：
-- select 字段名,字段名,... from 表名 where 条件;
-- 从表的数量上来划分，查询可以分为单表查询、多表查询
-- 查询的数据来自一张		单边查询
-- 查询的数据来自多张表   	多表查询

-- 单表查询
DROP TABLE dept;
CREATE TABLE dept
(deptno INT(2)  NOT NULL   AUTO_INCREMENT,
dname VARCHAR(14) ,
loc VARCHAR(13),
PRIMARY KEY (deptno)
 ) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 ;

DROP TABLE emp;
CREATE TABLE emp
       (empno INT(4)  NOT NULL AUTO_INCREMENT,
ename VARCHAR(10),
job VARCHAR(9),
mgr INT(4),
hiredate DATE,
sal DOUBLE(7,2),
comm DOUBLE(7,2),
PRIMARY KEY (empno),
deptno INT(2),
CONSTRAINT fk_deptno FOREIGN KEY(deptno) REFERENCES dept (deptno))
ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO dept VALUES
(10,'ACCOUNTING','NEW YORK');
INSERT INTO dept VALUES (20,'RESEARCH','DALLAS');
INSERT INTO dept VALUES
(30,'SALES','CHICAGO');
INSERT INTO dept VALUES
(40,'OPERATIONS','BOSTON');
INSERT INTO emp VALUES
(7369,'SMITH','CLERK',7902,STR_TO_DATE('17-12-1980','%d-%m-%Y'),800,NULL,20);
INSERT INTO emp VALUES
(7499,'ALLEN','SALESMAN',7698,STR_TO_DATE('20-2-1981','%d-%m-%Y'),1600,300,30);
INSERT INTO emp VALUES
(7521,'WARD','SALESMAN',7698,STR_TO_DATE('22-2-1981','%d-%m-%Y'),1250,500,30);
INSERT INTO emp VALUES
(7566,'JONES','MANAGER',7839,STR_TO_DATE('2-4-1981','%d-%m-%Y'),2975,NULL,20);
INSERT INTO emp VALUES
(7654,'MARTIN','SALESMAN',7698,STR_TO_DATE('28-9-1981','%d-%m-%Y'),1250,1400,30);
INSERT INTO emp VALUES
(7698,'BLAKE','MANAGER',7839,STR_TO_DATE('1-5-1981','%d-%m-%Y'),2850,NULL,30);
INSERT INTO emp VALUES
(7782,'CLARK','MANAGER',7839,STR_TO_DATE('9-6-1981','%d-%m-%Y'),2450,NULL,10);
INSERT INTO emp VALUES
(7788,'SCOTT','ANALYST',7566,STR_TO_DATE('13-JUL-87')-85,3000,NULL,20);
INSERT INTO emp VALUES
(7839,'KING','PRESIDENT',NULL,STR_TO_DATE('17-11-1981','%d-%m-%Y'),5000,NULL,10);
INSERT INTO emp VALUES
(7844,'TURNER','SALESMAN',7698,STR_TO_DATE('8-9-1981','%d-%m-%Y'),1500,0,30);
INSERT INTO emp VALUES
(7876,'ADAMS','CLERK',7788,STR_TO_DATE('13-JUL-87')-51,1100,NULL,20);
INSERT INTO emp VALUES
(7900,'JAMES','CLERK',7698,STR_TO_DATE('3-12-1981','%d-%m-%Y'),950,NULL,30);
INSERT INTO emp VALUES
(7902,'FORD','ANALYST',7566,STR_TO_DATE('3-12-1981','%d-%m-%Y'),3000,NULL,20);
INSERT INTO emp VALUES
(7934,'MILLER','CLERK',7782,STR_TO_DATE('23-1-1982','%d-%m-%Y'),1300,NULL,10);

DROP TABLE bonus;
CREATE TABLE bonus
(
ename VARCHAR(10) ,
job VARCHAR(9)  ,
sal DECIMAL(10,2),
comm DECIMAL(10,2)
)ENGINE=INNODB DEFAULT CHARSET=utf8;

DROP TABLE salgrade;
CREATE TABLE salgrade
      ( grade INT(10),
losal INT(10),
hisal INT(10) )ENGINE=INNODB DEFAULT CHARSET=utf8;
INSERT INTO salgrade VALUES (1,700,1200);
INSERT INTO salgrade VALUES (2,1201,1400);
INSERT INTO salgrade VALUES (3,1401,2000);
INSERT INTO salgrade VALUES (4,2001,3000);
INSERT INTO salgrade VALUES (5,3001,9999);
COMMIT;


SHOW TABLES;  -- 查看表
-- bonus   奖金，记录员工的奖金
--    	ename  	员工名
-- 	job	职位
-- 	sal	薪资
-- 	comm	提成

-- dept    部门表
-- 	deptno	部门编号
-- 	dname	部门名
-- 	loc	部门所在城市

-- emp	   员工表
-- 	empno	员工号
-- 	ename	员工名
-- 	job	岗位
-- 	mgr	当前员工的领导的工号
-- 	hiredate	入职日期
-- 	sal	薪资
-- 	comm	提成
-- 	deptno	所在部门的编号

-- salgrade	薪资等级表
-- 	grade	工资等级
-- 	losal	该等级的最低薪资
-- 	hisal	该等级的最高工资

-- emp dept

SELECT * FROM emp;

DESC salgrade;


-- 查询的基本用法
-- 1.查询指定表中的所有数据
-- select * from 表;         * 代表所有字段
SELECT * FROM emp;

-- 2.查询部分字段的数据
-- select 字段1,字段2,... from 表
-- 查询出所有员工的名字及薪资
SELECT ename,sal FROM emp;

-- 3.条件查询
-- select 字段 from 表 where 条件;
-- 查询smith的岗位及其薪资
SELECT ename,job,sal FROM emp WHERE ename = 'smith';

-- 4.按照某个字段进行升序、降序排序
-- select 字段... from 表格 order by 字段;   通过by后面的字段进行排序
SELECT ename,sal FROM emp ORDER BY sal;     -- 默认升序

SELECT ename,sal FROM emp ORDER BY sal DESC;  -- 降序


-- -------------------------------- 条件查询 -----------------------------------
-- 基本语法
-- select 字段... from 表 where 条件;
-- 根据条件的个数将条件查询分为两种：单条件查询和多条件查询
-- 单条件：只有一个查询条件
-- 多条件：多个查询条件

-- 单条件
-- 案例：找出所有工资高于2000的员工新名及薪资    =    >    >=    <    <=   !=
SELECT ename,sal FROM emp WHERE sal > 3000;

-- 案例：找出所有10号部门的员工姓名及薪资
SELECT ename,sal FROM emp WHERE deptno = 10;

-- 练习：找出10号部门所有员工姓名及薪资然后按照薪资进行降序排序
-- 注意：ORDER BY通常放在最后
SELECT ename,sal FROM emp WHERE deptno = 10 ORDER BY sal DESC;


-- 多条件
-- 条件之间通过and或者or进行拼接    and表示并且  or表示或者
-- select 字段... from 表 where 条件1  条件2  ....
-- 案例：查找出薪资大于1000但是低于2000的员工姓名、薪资
SELECT ename,sal FROM emp WHERE sal > 1000 AND sal < 2000;

-- 案例：找出30号部门薪资大于2000的员工姓名及薪资
SELECT ename,sal FROM emp WHERE deptno=30 AND sal > 2000;

-- 练习：找出10、20号部门所有薪资低于2000的员工姓名及薪资
SELECT ename,sal,deptno FROM emp WHERE (deptno=10 OR deptno=20) AND sal<2000;


-- 范围查询
-- between 值1 and 值2            [值1,值2]
SELECT ename,sal FROM emp WHERE sal BETWEEN 1000 AND 2000;

SELECT ename,sal FROM emp WHERE sal BETWEEN 1000 AND 2000 ORDER BY sal;

-- 练习：找出30号部门薪资在1000到2000之间所有员工的新名、薪资
SELECT ename,sal FROM emp WHERE deptno=30 AND sal >=1000 AND sal <=2000;

SELECT ename,sal FROM emp WHERE deptno=30 AND sal BETWEEN 1000 AND 2000;


-- 查询出10号、30号部门的所有员工姓名、部门号
SELECT ename,deptno FROM emp WHERE deptno=10 OR deptno=30;

-- in、
-- in(值1,值2,....)  判断哪些数据在in列表中一样的
-- not in(值1,值2,...)  不在列表中的数据
SELECT ename,deptno FROM emp WHERE deptno IN(10,30);

-- 查询不是10号、30号部门员工的姓名、职位
SELECT ename,deptno FROM emp WHERE deptno!=10 AND deptno!=30;

SELECT ename,deptno FROM emp WHERE deptno NOT IN(10,30);


-- in  not  经常用来进行批量修改、删除、更新数据


-- 日期操作
-- 在MySQL提供了一些关于时间操作的函数（方法）
-- sysdate()	获取当前系统时间  	日期+时间
-- curdate()	获取当前日期		日期
-- curtime()	获取当前时间		时间
-- now()	获取当前时间		日期+时间
-- current_timestamp()	获取当前时间戳
SELECT SYSDATE();
SELECT CURDATE();
SELECT CURTIME();
SELECT NOW();
SELECT CURRENT_TIMESTAMP();

-- 通过   `关键字`  转义关键字
CREATE TABLE person(
	id INT,
	`name` VARCHAR(20),
	birthday DATE 		-- 生日
);

-- 插入日期
-- 自己指定：通过字符串插入   yyyy-MM-dd hh:mm:ss
-- 获取到系统时间

INSERT INTO person VALUES(1,'钢铁侠','2000-12-23');
INSERT INTO person VALUES(2,'baby',CURDATE());
INSERT INTO person VALUES(3,'雷神',NOW()); -- 如果字段的类型只有日期，时间部分会丢失掉


SELECT * FROM person;


CREATE TABLE `order`(
	id INT,	-- 订单编号
	detail VARCHAR(30), -- 订单详情
	ordertime DATETIME	-- 下单时间   DATETIME：日期+时间
);

INSERT INTO `order` VALUES(1,'不要辣椒',NOW());

SELECT * FROM `order`;


-- ---------------------------------字符串--------------------------------
-- 1.字符串的拼接  concat()函数
SELECT CONCAT(ename,sal) FROM emp;

SELECT CONCAT(ename,job) FROM emp;

SELECT CONCAT(ename,sal,job) FROM emp;

SELECT CONCAT('姓名:',ename,'薪资：',sal,'岗位：',job) FROM emp;

-- 2.获取字符串的长度  length(字段)
SELECT LENGTH(ename) FROM emp;

-- 3.大小写转换
-- lower()  小写
-- upper()  大写
SELECT LOWER(ename) FROM emp;

-- 4.去除多余的空白符
-- trim()   去掉前后多余的空格
-- ltrim()  left trim  去掉左边多余的空格
-- rtrim()  right trim 去掉右边多余的空格

SELECT * FROM `order`;

INSERT INTO `order` VALUES(1,'    少加盐     ',NOW());

SELECT TRIM(detail) FROM `order`;
SELECT LTRIM(detail) FROM `order`;
SELECT RTRIM(detail) FROM `order`;


-- 关于null值的操作
-- null是MySQL中一种比较特殊的值，除开null之外其他的所有的值都能使用 = != > < >= !=这些操作
-- 但是null不行

SELECT * FROM student;

-- 找出所有没有性别的学生：性别的值为null
SELECT * FROM student WHERE sex = NULL;   -- 所有数据与null进行比较结果都为false

-- 如果想要与null进行比较，需要使用 is null或者is not null
-- is null   	判断是null
-- is not	判断不是null
SELECT * FROM student WHERE sex IS NULL;
SELECT * FROM student WHERE sex IS NOT NULL;

-- null值与其它值做任何操作结果都是null，例如字符串与null进行拼接得到的是null
SELECT CONCAT(ename,NULL) FROM emp;

SELECT * FROM emp;

-- 查询出所有员工的月薪 = sal + comm    null与任何值进行四则运算得到的值也是null
SELECT ename,sal + comm FROM emp;

-- ifnull(n,m)   如果n的值为null，则得到m的值，否则得到n的值    有点类似于  ?:

SELECT ename,sal + IFNULL(comm,0) FROM emp;

-- if(x,y,z)     判断x的值是否为null，如果为空则返回z，否则返回y
-- 查询所有员工名字及是否有提成，有提成显示提成的数字，否则显示0

SELECT ename,sal + IF(comm,comm,0) FROM emp;

-- null怎么用
-- 不能做大小值的比较   =  != > < 都不行
-- null不能直接与数字进行四则运算，因为所有与null进行四则运算得到的结果都为null  ifnull、if
-- null也不能与字符串直接拼接等操作，得到的还是null

```

```mysql
-- 模糊查询：like 看起来像
-- 用法
-- select 字段 from 表 where 字段 like '子串';
-- like有两个通配符
-- _   代表任意一个字符
-- %   代表任意多个字符，可以是0个，也可以是多个

USE java87;

CREATE TABLE phone(
	id INT,
	`name` VARCHAR(20)
);
INSERT INTO phone VALUES(1,'苹果8'),(2,'苹果13'),(3,'华为mate'),(4,'华为荣耀');

-- 查询name中包含苹果子串的数据
SELECT id,`name` FROM phone WHERE `name` LIKE '%苹果%';

-- 查找以3结尾的
SELECT * FROM phone WHERE `name` LIKE '%耀';

-- 查询第二个字符为果的数据
SELECT * FROM phone WHERE `name` LIKE '_果%';

-- 查找倒数第二个字符为荣的数据
SELECT * FROM phone WHERE `name` LIKE '%荣_';

-- 只要包含华、为两个字的都查询出来
SELECT * FROM phone WHERE `name` LIKE '%华%为%';



-- 去重：去除重复的内容，只保留一个数据
SELECT * FROM emp;

-- 请查询出有员工部门的部门号
SELECT DISTINCT(deptno) FROM emp;

-- 查看所有员工都有些哪些职位
SELECT DISTINCT(job) FROM emp;



-- 聚合查询：对查询出来的数据做统计操作
-- 这些统计操作主要包括：
-- count()		统计数据的条数
-- avg()		计算结果的平均值
-- sum()		求和
-- max()		最大值
-- min()		最小值
-- 聚合函数执行的时机：是在查询出数据之后，然后对这些数据进行操作
-- 聚合函数执行时是得先要查询出这些数据，然后再对数据进行操作

-- 查询所有员工的平均薪资
-- 会先查询出所有员工的薪资，再进行求平均值
SELECT AVG(sal) FROM emp;

-- 查看所有员工的总薪资
SELECT SUM(sal) FROM emp;

-- 查询最高薪资
SELECT MAX(sal) FROM emp;

-- 查询20号部门的平均薪资
-- 先查询出20号部门的所有薪资，然后再进行求平均值
SELECT AVG(sal) FROM emp WHERE deptno = 20;


-- 统计员工人数
SELECT * FROM emp;

SELECT COUNT(empno) FROM emp;

SELECT COUNT(ename) FROM emp;

-- 统计有多少条记录
SELECT COUNT(*) FROM emp;


SELECT COUNT(`name`) FROM student;

SELECT * FROM student;

INSERT INTO student VALUES(1004,'小丽','女');



-- 分组查询   group by
-- 查询出每一个部门的平均薪资
SELECT AVG(sal) FROM emp WHERE deptno = 20;
SELECT AVG(sal) FROM emp WHERE deptno = 10;
SELECT AVG(sal) FROM emp WHERE deptno = 30;
-- 分组查询：按照某个指定的字段将所有的数据进行分组，然后分别操作
SELECT deptno,AVG(sal) FROM emp GROUP BY deptno;

-- 查询每个职位的最高薪资
SELECT MAX(sal) FROM emp GROUP BY job;

SELECT sal FROM emp GROUP BY job;

SELECT * FROM emp;


-- 找出谁的工资高于所在部门的平均薪资
SELECT ename,sal FROM emp WHERE sal > AVG(sal) GROUP BY deptno;
-- 将聚合函数作为了查询条件去查询数据，此处聚合函数的使用时机出了问题

-- 聚合函数执行时机：先要查询出数据，然后对数据进行操作

-- having子句：如果想要将聚合函数作为查询条件，需要将聚合函数写在having自居中

SELECT ename,sal FROM emp GROUP BY deptno HAVING sal > AVG(sal);

-- 查询出哪些部门的平均薪资大于2000
-- 先通过部门号进行分组，求平均自，然后再对平均值进行判断
SELECT deptno,AVG(sal) FROM emp GROUP BY deptno HAVING AVG(sal) > 2000; 

-- 查询出部门平均薪资高于2000这些部门中的最高薪资。
SELECT deptno,MAX(sal) FROM emp GROUP BY deptno HAVING AVG(sal) > 2000; 


-- 聚合函数不能用在where后面，不能作为查询条件，如果要作为条件需要放在having子句后边，对结果
-- 进行过滤

--              11:15继续


-- --------------------------------多表查询--------------------------------
-- 案例：查询出每名员工的姓名及其所在部门的名字
-- 部门名字来自dept表
SELECT * FROM emp;
SELECT * FROM dept;

-- 基本的格式：select 字段 from 表1,表2;


SELECT * FROM emp,dept;

-- 笛卡尔积：在进行多表查询时如果不指定查询条件，MySQL会自动将两张表中的数据进行一一匹配
-- 得到数据，假设A表有n行数据，B表有m行数据，查询出来的结果就有n * m行数据
-- 问题就是笛卡尔积中出现了大量的垃圾数据，怎么将这些垃圾数据清理掉了
-- 处理方式：通过两张表相同字段进行等值判断进行处理

SELECT * FROM emp,dept WHERE emp.deptno = dept.deptno;

SELECT ename,dname FROM emp,dept WHERE emp.deptno = dept.deptno;


-- 练习：查询出在NEW YORK工作的员工姓名
-- 通过第一个条件将笛卡尔积中的垃圾数据清理掉，再通过第二个条件将不是new york的数据清理掉
SELECT ename,loc FROM emp,dept WHERE emp.deptno = dept.deptno AND loc = 'new york';


-- 内连接：查询出两张表中共同数据
-- 查询出两个人共同的好友
CREATE TABLE zhangsan(
	id INT,
	`name` VARCHAR(20)
);
CREATE TABLE lisi(
	id INT,
	`name` VARCHAR(20)
);
INSERT INTO zhangsan VALUES(1001,'wangwu'),(1002,'zhaoliu'),(1003,'sunqi');
INSERT INTO lisi VALUES(1002,'zhaoliu'),(1004,'wangba');


-- 编写SQL查询出zhangsan和lisi的共同分好友
SELECT * FROM zhangsan;
SELECT * FROM lisi;

-- 通过关联字段做等值判断，过滤垃圾数据
SELECT * FROM zhangsan,lisi WHERE zhangsan.name = lisi.name;

-- 通过内连接的方式查询出两张表相同的数据
-- 语法：select 字段 from 表1 inner join 表2 on 条件;
SELECT * FROM zhangsan INNER JOIN lisi ON zhangsan.name = lisi.name;


-- 外连接
-- 分类：
-- 左外连接：将左边表的所有数据查询出来，然后与右表的数据进行匹配，匹配不上的则用null进行匹配
-- 右外连接：将右边表的所有数据查询出来，用左表的数据进行匹配，匹配不上的用null进行匹配
-- 全外连接：将两张表所有的数据都进行匹配，匹配不上的用null进行匹配


CREATE TABLE boy(
	id INT,
	NAME VARCHAR(20),
	gid INT
);
INSERT INTO boy VALUES(1001,'杨过',1),(1002,'梁山伯',2),(1003,'屌丝男',3);
CREATE TABLE girl(
	id INT,
	NAME VARCHAR(20),
	gid INT
);
INSERT INTO girl VALUES(2001,'小龙女',1),(2002,'祝英台',2),(1004,'死宅女',4);
SELECT * FROM boy;
SELECT * FROM girl;

-- 查询出两张表中人物的匹配结果
SELECT * FROM boy,girl WHERE boy.gid = girl.gid;
SELECT * FROM boy INNER JOIN girl ON boy.gid = girl.gid;

-- 左外连接
-- 语法：select 字段 from 左表 left outer join 右表 on 条件;
SELECT * FROM boy LEFT OUTER JOIN girl ON boy.gid = girl.gid;   

-- 右外
SELECT * FROM boy RIGHT OUTER JOIN girl ON boy.gid = girl.gid;

-- 全外连接：将两张表的所有数据都查询出来  不会进行数据匹配
(SELECT * FROM boy) UNION ALL (SELECT * FROM girl);


-- 在MySQL连接主要分为5种
-- 内连接   inner join on	查询出两张表的相同部分
-- 左外	    left outer join on	将左表全部查询出来
-- 右外	    right outer join on 将右表全部查询出来
-- 全外     union all           将两张表的所有数据查询出来，不会进行数据匹配
-- 自连接   自己连接自己

-- 自连接：自己连接自己，在有些情况下查询数据时需要将一张表当做两张表来使用，然后才能查询出指定的内容
-- 案例：在emp表中查询出所有员工的姓名及其领导的姓名
SELECT * FROM emp;

SELECT ename,ename FROM emp;

-- 将emp表当做两张表来使用：员工表   领导表
-- 怎么区分这两个表：通过取别名的方式，取别名就是在表名后加上空格再加别名

SELECT e.ename,m.ename FROM emp e,emp m WHERE e.mgr = m.empno;

-- 得到笛卡尔积
SELECT * FROM emp e,emp m WHERE e.mgr = m.empno;


SELECT ename,ename FROM emp WHERE ;



SELECT * FROM emp,dept;

SELECT * FROM emp,dept WHERE emp.deptno = dept.deptno;

-- 笛卡尔积
SELECT * FROM emp e,emp m;

SELECT * FROM emp e,emp m WHERE e.mgr = m.empno;

SELECT e.ename,m.ename FROM emp e,emp m WHERE e.mgr = m.empno;

-- 自连接 + 外连接
SELECT e.ename,m.ename FROM emp e LEFT OUTER JOIN emp m ON e.mgr = m.empno;

SELECT * FROM emp;


-- ---------------------------子查询-------------------
-- 将一条SQL查询出来的结果作为另一条SQL的查询条件来使用
-- 一条SQL中包含另一条SQL   SQL嵌套
-- 找出工资比 allen 高的员工的姓名及其工资
-- 思路：先找出Allen的工资是多少，然后用其他人的工资与他的工资进行比较
SELECT sal FROM emp WHERE ename = 'allen';

SELECT ename,sal FROM emp WHERE sal > Allen的;

SELECT ename,sal FROM emp WHERE sal > (SELECT sal FROM emp WHERE ename = 'allen');


-- 练习：找出与ford同部门的员工
-- 先找出ford在哪个部门
SELECT deptno FROM emp WHERE ename = 'ford';

SELECT ename FROM emp WHERE deptno = ford的部门号

SELECT ename FROM emp WHERE deptno = (SELECT deptno FROM emp WHERE ename = 'ford');


-- 练习：找出比所有员工平均薪资高的员工姓名及薪资
-- 找出比公司平均工资高的员工

SELECT ename,sal FROM emp WHERE sal > (SELECT AVG(sal) FROM emp);


-- 找出工资最高员工的姓名及薪资
SELECT ename,sal FROM emp WHERE sal = (SELECT MAX(sal) FROM emp);

-- 找出每个部门中薪资最高的是谁

-- 找出每个部门最高的薪资是多少
SELECT MAX(sal) FROM emp GROUP BY deptno;

-- 在MySQL可以查询出来的结果当做一张表来使用

(SELECT MAX(sal) FROM emp GROUP BY deptno) AS sal_table;  -- 将查询出来的结果当做sal_table表

SELECT * FROM sal_table;

SELECT e.ename,e.sal FROM emp e,((SELECT MAX(sal) sal FROM emp GROUP BY deptno) AS sal_table)  WHERE e.sal = sal_table.sal;



SELECT * FROM emp;

















-- 先查询出每个部门的最高薪资是多少，然后用所用员工的薪资与这些薪资进行比较，如果一样则是对应部门中最高
-- 薪资的人

-- 先查询出每个部门的最高薪资，然后将结果当做最高薪资表  通过as进行取名
SELECT * FROM (SELECT MAX(sal) sal,deptno FROM emp GROUP BY deptno) AS m_sal;  -- 最高工资表

-- 用员工表与最高工资表进行连表查询
SELECT e.ename,e.sal FROM emp e,最高工资表 WHERE e.sal = 最高工资;


-- 除了判断薪资是否一样还得判断部门是否一样  因为存在不同部门但薪资一样的情况
SELECT e.ename,e.sal 
FROM 
emp e,(SELECT MAX(sal) sal,deptno FROM emp GROUP BY deptno) AS m_sal 
WHERE e.sal = m_sal.sal AND e.deptno = m_sal.deptno;


-- AS     作为，可以将查询出来的结果作为一张表、视图来使用
-- 查询出所有员工的姓名及其所在工作的城市
-- 将查询出来的结果当做一张临时表使用
(SELECT ename,loc FROM emp,dept WHERE emp.deptno = dept.deptno) AS e_loc;

-- 将查询出来的结果生成一张真实存在的表
-- 通过将子查询的结果创建一张表
CREATE TABLE e_loc (SELECT ename,loc FROM emp,dept WHERE emp.deptno = dept.deptno);

SELECT * FROM e_loc;

SHOW TABLES;




-- 查询出每个部门中工资最高的员工
CREATE TABLE e_m_table (SELECT e.ename,e.sal 
FROM 
emp e,(SELECT MAX(sal) sal,deptno FROM emp GROUP BY deptno) AS m_sal 
WHERE e.sal = m_sal.sal AND e.deptno = m_sal.deptno);



-- 为了简化SQL语句，可以通过视图的方式来进行简化

-- 创建视图
-- create view 视图名字 as SQL语句;   SQL语句通常情况是select语句
CREATE TABLE e_loc (SELECT ename,loc FROM emp,dept WHERE emp.deptno = dept.deptno);

SELECT * FROM e_loc;

SELECT * FROM dept;

UPDATE dept SET loc = 'chengdu' WHERE deptno = 10;


-- 创建视图
SELECT ename,loc FROM emp,dept WHERE emp.deptno = dept.deptno;

CREATE VIEW emp_dept_view 
AS 
SELECT ename,loc FROM emp,dept WHERE emp.deptno = dept.deptno;

SELECT * FROM emp_dept_view;

-- 可以简单的认为通过视图进行查询其实就是调用了对应的SQL语句


SELECT * FROM dept;


-- 删除视图
DROP VIEW emp_dept_view;


-- 关于视图的增删改操作
-- 通过视图是可以对数据进行增删改的操作，前提条件是该视图只建立在一张表，如果视图是建立在多张表上则不行


CREATE TABLE goodman(
	id INT,
	`name` VARCHAR(20)
);
CREATE TABLE badman(
	id INT,
	`name` VARCHAR(20),
	gid INT
);
INSERT INTO goodman VALUES(1001,'唐僧'),(1002,'葫芦娃'),(1003,'喜羊羊');
INSERT INTO badman VALUES(2001,'白骨精',1001),(2002,'蛇精',1002),(2003,'灰太狼',1003);

SELECT * FROM goodman;
SELECT * FROM badman;

-- 创建视图
CREATE VIEW good_view AS SELECT `name` FROM goodman;

SELECT * FROM good_view;

-- 可以通过视图更新原表中的数据
UPDATE good_view SET `name`='孙悟空' WHERE `name`='唐僧';

-- 可以通过视图向表中插入数据
INSERT INTO good_view VALUES('奥特曼');

-- 可以通过视图删除数据
DELETE FROM good_view WHERE `name` = '奥特曼';

SELECT * FROM goodman;

-- 创建一个视图建立在两张表上
CREATE VIEW good_bad_view 
AS 
SELECT g.name gname,b.name bname FROM goodman g,badman b WHERE g.id = b.gid;

SELECT * FROM good_bad_view;

INSERT INTO good_bad_view VALUES('奥特曼','小怪兽');

DELETE FROM good_bad_view WHERE gname = '奥特曼';


-- 总结视图：最大的作用就是用来简化查询操作的，一般情况下不会用来进行增删改的操作



```

导入用来联系的表

```sql
DROP TABLE dept;
CREATE TABLE dept
(deptno INT(2)  NOT NULL   AUTO_INCREMENT,
dname VARCHAR(14) ,
loc VARCHAR(13),
PRIMARY KEY (deptno)
 ) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 ;

DROP TABLE emp;
CREATE TABLE emp
       (empno INT(4)  NOT NULL AUTO_INCREMENT,
ename VARCHAR(10),
job VARCHAR(9),
mgr INT(4),
hiredate DATE,
sal DOUBLE(7,2),
comm DOUBLE(7,2),
PRIMARY KEY (empno),
deptno INT(2),
CONSTRAINT fk_deptno FOREIGN KEY(deptno) REFERENCES dept (deptno))
ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO dept VALUES
(10,'ACCOUNTING','NEW YORK');
INSERT INTO dept VALUES (20,'RESEARCH','DALLAS');
INSERT INTO dept VALUES
(30,'SALES','CHICAGO');
INSERT INTO dept VALUES
(40,'OPERATIONS','BOSTON');
INSERT INTO emp VALUES
(7369,'SMITH','CLERK',7902,STR_TO_DATE('17-12-1980','%d-%m-%Y'),800,NULL,20);
INSERT INTO emp VALUES
(7499,'ALLEN','SALESMAN',7698,STR_TO_DATE('20-2-1981','%d-%m-%Y'),1600,300,30);
INSERT INTO emp VALUES
(7521,'WARD','SALESMAN',7698,STR_TO_DATE('22-2-1981','%d-%m-%Y'),1250,500,30);
INSERT INTO emp VALUES
(7566,'JONES','MANAGER',7839,STR_TO_DATE('2-4-1981','%d-%m-%Y'),2975,NULL,20);
INSERT INTO emp VALUES
(7654,'MARTIN','SALESMAN',7698,STR_TO_DATE('28-9-1981','%d-%m-%Y'),1250,1400,30);
INSERT INTO emp VALUES
(7698,'BLAKE','MANAGER',7839,STR_TO_DATE('1-5-1981','%d-%m-%Y'),2850,NULL,30);
INSERT INTO emp VALUES
(7782,'CLARK','MANAGER',7839,STR_TO_DATE('9-6-1981','%d-%m-%Y'),2450,NULL,10);
INSERT INTO emp VALUES
(7788,'SCOTT','ANALYST',7566,STR_TO_DATE('13-JUL-87')-85,3000,NULL,20);
INSERT INTO emp VALUES
(7839,'KING','PRESIDENT',NULL,STR_TO_DATE('17-11-1981','%d-%m-%Y'),5000,NULL,10);
INSERT INTO emp VALUES
(7844,'TURNER','SALESMAN',7698,STR_TO_DATE('8-9-1981','%d-%m-%Y'),1500,0,30);
INSERT INTO emp VALUES
(7876,'ADAMS','CLERK',7788,STR_TO_DATE('13-JUL-87')-51,1100,NULL,20);
INSERT INTO emp VALUES
(7900,'JAMES','CLERK',7698,STR_TO_DATE('3-12-1981','%d-%m-%Y'),950,NULL,30);
INSERT INTO emp VALUES
(7902,'FORD','ANALYST',7566,STR_TO_DATE('3-12-1981','%d-%m-%Y'),3000,NULL,20);
INSERT INTO emp VALUES
(7934,'MILLER','CLERK',7782,STR_TO_DATE('23-1-1982','%d-%m-%Y'),1300,NULL,10);

DROP TABLE bonus;
CREATE TABLE bonus
(
ename VARCHAR(10) ,
job VARCHAR(9)  ,
sal DECIMAL(10,2),
comm DECIMAL(10,2)
)ENGINE=INNODB DEFAULT CHARSET=utf8;

DROP TABLE salgrade;
CREATE TABLE salgrade
      ( grade INT(10),
losal INT(10),
hisal INT(10) )ENGINE=INNODB DEFAULT CHARSET=utf8;
INSERT INTO salgrade VALUES (1,700,1200);
INSERT INTO salgrade VALUES (2,1201,1400);
INSERT INTO salgrade VALUES (3,1401,2000);
INSERT INTO salgrade VALUES (4,2001,3000);
INSERT INTO salgrade VALUES (5,3001,9999);
COMMIT;


SHOW TABLES;  -- 查看表
-- bonus   奖金，记录员工的奖金
--    	ename  	员工名
-- 	job	职位
-- 	sal	薪资
-- 	comm	提成

-- dept    部门表
-- 	deptno	部门编号
-- 	dname	部门名
-- 	loc	部门所在城市

-- emp	   员工表
-- 	empno	员工号
-- 	ename	员工名
-- 	job	岗位
-- 	mgr	当前员工的领导的工号
-- 	hiredate	入职日期
-- 	sal	薪资
-- 	comm	提成
-- 	deptno	所在部门的编号

-- salgrade	薪资等级表
-- 	grade	工资等级
-- 	losal	该等级的最低薪资
-- 	hisal	该等级的最高工资
```



## MYSQL的安装

１、打开下载的mysql安装文件,双击运行mysql-5.5.40-win32.msi。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image001.jpg)

 

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image002.jpg)

 

２、选择安装类型，有“Typical（默认）”、“Complete（完全）”、“Custom（用户自定义）”三个选项，选择“Custom”，按“next”键继续。 

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image003.jpg)

 

３、在“Developer Components（开发者部分）”上左键单击，选择“This feature,

and all subfeatures, will be installed on local hard drive.”，即“此部分，及下属子部分内容，全部安装在本地硬盘上”。在上面的“MySQL Server（mysql服务器）”、“Client Programs（mysql客户端程序）”、“Documentation（文档）”也如此操作，以保证安装所有文件。点选“Change...”，手动指定安装目录。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image004.jpg)

 

4、填上安装目录，我的是 “E:\software\install\mysql\”，也建议不要放在与操作系统同一分区，这样可以防止系统备份还原的时候，数据被清空。按“OK”继续。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image005.jpg)

 

确认一下先前的设置，如果有误，按“Back”返回重做。按“Install”开始安装。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image006.jpg)

 

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image007.jpg)

 

 

５、正在安装中，请稍候，安装完成后会出现成功界面，点击成功“next”之后，出现以下界面。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image008.jpg)

 

这里询问是否继续配置MySQL数据的参数，勾选上，然后点击“Finish”

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

### MYSQL的配置

１、安装完成了，出现如下界面将进入mysql配置向导。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image009.jpg)

 

 

 

２、选择配置方式，“Detailed Configuration（手动精确配置）”、“Standard Configuration（标准配置）”，我们选择“Detailed Configuration”，方便熟悉配置过程。 

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image010.jpg)

 

３、选择服务器类型，“Developer Machine（开发测试类，mysql占用很少资源）”、“Server Machine（服务器类型，mysql占用较多资源）”、“Dedicated MySQL Server Machine（专门的数据库服务器，mysql占用所有可用资源）” 

 

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image011.jpg)

 

 

４、选择mysql数据库的大致用途，“Multifunctional Database（通用多功能型，好）”、“Transactional Database Only（服务器类型，专注于事务处理，一般）”、“Non-Transactional Database Only（非事务处理型，较简单，主要做一些监控、记数用，对MyISAM数据类型的支持仅限于non-transactional），按“Next”继续。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image012.jpg)

 

５、选择网站并发连接数，同时连接的数目，“Decision Support(DSS)/OLAP（20个左右）”、“Online Transaction Processing(OLTP)（500个左右）”、“Manual Setting（手动设置，自己输一个数）”。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image013.jpg)

 

６、是否启用TCP/IP连接，设定端口，如果不启用，就只能在自己的机器上访问mysql数据库了，在这个页面上，您还可以选择“启用标准模式”（Enable Strict Mode），这样MySQL就不会允许细小的语法错误。如果是新手，建议您取消标准模式以减少麻烦。但熟悉MySQL以后，尽量使用标准模式，因为它可以降低有害数据进入数据库的可能性。按“Next”继续 

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image014.jpg)

 

７、就是对mysql默认数据库语言编码进行设置（重要），一般选UTF-8，按 “Next”继续。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image015.jpg)

 

８、选择是否将mysql安装为windows服务，还可以指定Service Name（服务标识名称），是否将mysql的bin目录加入到Windows PATH（加入后，就可以直接使用bin下的文件，而不用指出目录名，比如连接，“mysql.exe -uusername -ppassword;”就可以了，不用指出mysql.exe的完整地址，很方便），我这里全部打上了勾，Service Name不变。按“Next”继续。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image016.jpg)

 

９、询问是否要修改默认root用户（超级管理）的密码。“Enable root access from remote machines（是否允许root用户在其它的机器上登陆，如果要安全，就不要勾上，如果要方便，就勾上它）”。最后“Create An Anonymous Account（新建一个匿名用户，匿名用户可以连接数据库，不能操作数据，包括查询）”，一般就不用勾了，设置完毕，按“Next”继续。

用户名和密码统一设置成：

用户名:root

用户密码：root

 

 

 

１０、确认设置无误，按“Execute”使设置生效，即完成MYSQL的安装和配置。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image017.jpg)

 

 

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image018.jpg)

 

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image019.jpg)

 

 

MySQL安装图解

一、MYSQL的安装
１、打开下载的mysql安装文件,双击运行mysql-5.5.40-win32.msi。




２、选择安装类型，有“Typical（默认）”、“Complete（完全）”、“Custom（用户自定义）”三个选项，选择“Custom”，按“next”键继续。 


３、在“Developer Components（开发者部分）”上左键单击，选择“This feature,
and all subfeatures, will be installed on local hard drive.”，即“此部分，及下属子部分内容，全部安装在本地硬盘上”。在上面的“MySQL Server（mysql服务器）”、“Client Programs（mysql客户端程序）”、“Documentation（文档）”也如此操作，以保证安装所有文件。点选“Change...”，手动指定安装目录。


4、填上安装目录，我的是	“E:\software\install\mysql\”，也建议不要放在与操作系统同一分区，这样可以防止系统备份还原的时候，数据被清空。按“OK”继续。


确认一下先前的设置，如果有误，按“Back”返回重做。按“Install”开始安装。





５、正在安装中，请稍候，安装完成后会出现成功界面，点击成功“next”之后，出现以下界面。


这里询问是否继续配置MySQL数据的参数，勾选上，然后点击“Finish”

















二、MYSQL的配置
１、安装完成了，出现如下界面将进入mysql配置向导。

![image-20220225101343609](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101343609.png)

２、选择配置方式，“Detailed Configuration（手动精确配置）”、“Standard Configuration（标准配置）”，我们选择“Detailed Configuration”，方便熟悉配置过程。 

![image-20220225101417882](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101417882.png)


３、选择服务器类型，“Developer Machine（开发测试类，mysql占用很少资源）”、“Server Machine（服务器类型，mysql占用较多资源）”、“Dedicated MySQL Server Machine（专门的数据库服务器，mysql占用所有可用资源）” 

 ![image-20220225101431398](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101431398.png)

４、选择mysql数据库的大致用途，“Multifunctional Database（通用多功能型，好）”、“Transactional Database Only（服务器类型，专注于事务处理，一般）”、“Non-Transactional Database Only（非事务处理型，较简单，主要做一些监控、记数用，对MyISAM数据类型的支持仅限于non-transactional），按“Next”继续。

![image-20220225101446981](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101446981.png)

５、选择网站并发连接数，同时连接的数目，“Decision Support(DSS)/OLAP（20个左右）”、“Online Transaction Processing(OLTP)（500个左右）”、“Manual Setting（手动设置，自己输一个数）”。 

![image-20220225101511161](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101511161.png)

６、是否启用TCP/IP连接，设定端口，如果不启用，就只能在自己的机器上访问mysql数据库了，在这个页面上，您还可以选择“启用标准模式”（Enable Strict Mode），这样MySQL就不会允许细小的语法错误。如果是新手，建议您取消标准模式以减少麻烦。但熟悉MySQL以后，尽量使用标准模式，因为它可以降低有害数据进入数据库的可能性。按“Next”继续 

![image-20220225101526903](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101526903.png)

７、就是对mysql默认数据库语言编码进行设置（重要），一般选UTF-8，按 “Next”继续。

![image-20220225101541427](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101541427.png)

８、选择是否将mysql安装为windows服务，还可以指定Service Name（服务标识名称），是否将mysql的bin目录加入到Windows PATH（加入后，就可以直接使用bin下的文件，而不用指出目录名，比如连接，“mysql.exe -uusername -ppassword;”就可以了，不用指出mysql.exe的完整地址，很方便），我这里全部打上了勾，Service Name不变。按“Next”继续。

![image-20220225101555313](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101555313.png)

９、询问是否要修改默认root用户（超级管理）的密码。“Enable root access from remote machines（是否允许root用户在其它的机器上登陆，如果要安全，就不要勾上，如果要方便，就勾上它）”。最后“Create An Anonymous Account（新建一个匿名用户，匿名用户可以连接数据库，不能操作数据，包括查询）”，一般就不用勾了，设置完毕，按“Next”继续。
用户名和密码统一设置成：
用户名:root
用户密码：root

![image-20220225101630281](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101630281.png)

10、确认设置无误，按“Execute”使设置生效，即完成MYSQL的安装和配置。

![image-20220225101645518](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101645518.png)

![image-20220225101658952](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101658952.png)


注意：设置完毕，按“Finish”后有一个比较常见的错误，就是不能“Start service”，一般出现在以前有安装mysql的服务器上，解决的办法，先保证以前安装的mysql服务器彻底卸载掉了；不行的话，检查是否按上面一步所说，之前的密码是否有修改，照上面的操作；如果依然不行，将mysql安装目录下的data文件夹备份，然后删除，在安装完成后，将安装生成的 data文件夹删除，备份的data文件夹移回来，再重启mysql服务就可以了，这种情况下，可能需要将数据库检查一下，然后修复一次，防止数据出错。