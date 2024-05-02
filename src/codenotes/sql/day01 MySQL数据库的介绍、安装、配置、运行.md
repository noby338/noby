---
title: day01 MySQL数据库的介绍、安装、配置、运行
icon: write
category:
    - SQL
tag:
    - SQL
sticky: false
star: false
article: true
timeline: true
---

## 数据库 (Database)

- 定义：数据库全称，数据库管理系统，存储数据和获取数据的软件
    - 数据库中的概念：
        - 数据库：数据库管理系统，指软件 (如 MySQL、Oracle)
        - 数据库：MySQL 中的 database(文件夹)
- 容器 (数组、集合) 存储数据无法实现永久存储 (程序停止后数据消失)
- io 流技术，存储到本地文件 (更改时需要遍历文件中的所有数据，效率低下，修改数据麻烦)
- 名词解释
    - 表：数据库中的文件
    - 数据库：MySQL 中的 database(文件夹)
    - 字段又称为属性，二维表的一列称为一个字段（属性）
    - 字段类型也是数据类型，如 int,char,varchar,bit 等等。
    - 字段宽度表示这个字段能存储的最大长度。
    - 记录就是表格中的每一行
    - 字段值就是字段列中的记录。
  ![image-20220228210121910](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220228210121910.png)
- 分类：
    - 关系型数据库：把复杂的数据结构归结为简单的二元关系（即二维表格形式）
        - MySQL(重点)：(Oracle 公司) 5 版本免费。新版本收费
        - Oracle：(Oracle 公司)
        - DB2：(IBM 公司)
        - SQL Server：微软公司
    - 非关系型数据库：键值存储数据库、列存储（Column-oriented）数据库、面向文档（Document-Oriented）数据库、图形数据库等数据库的总称
        - Redis
        - MongoDB
        - HBase
        - Neo4J

## MySQL 的运行

- 打开 MySQL 服务
    - 方式 1：
        - 搜索里输入服务，找到 mysql 打开
        - 运行窗口输入 service.msc，找到 mysql 打开
    - 方式 2：
        - net start mysql
- 停止 MySQL 服务
    - net stop mysql
- 登录 MySQL
    - mysql -uroot -p123
- 退出 MySQL
    - exit

## MYSQL 的安装

１、打开下载的 mysql 安装文件,双击运行 mysql-5.5.40-win32.msi。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image001.jpg)

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image002.jpg)

２、选择安装类型，有 "Typical（默认）"、"Complete（完全）"、"Custom（用户自定义）" 三个选项，选择 "Custom"，按 "next" 键继续。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image003.jpg)

３、在 "Developer Components（开发者部分）" 上左键单击，选择 "This feature,

and all subfeatures, will be installed on local hard drive."，即 " 此部分，及下属子部分内容，全部安装在本地硬盘上 "。在上面的 "MySQL Server（mysql 服务器）"、"Client Programs（mysql 客户端程序）"、"Documentation（文档）" 也如此操作，以保证安装所有文件。点选 "Change…"，手动指定安装目录。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image004.jpg)

4、填上安装目录，我的是 "E:\software\install\mysql\"，也建议不要放在与操作系统同一分区，这样可以防止系统备份还原的时候，数据被清空。按 "OK" 继续。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image005.jpg)

确认一下先前的设置，如果有误，按 "Back" 返回重做。按 "Install" 开始安装。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image006.jpg)

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image007.jpg)

５、正在安装中，请稍候，安装完成后会出现成功界面，点击成功 "next" 之后，出现以下界面。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image008.jpg)

这里询问是否继续配置 MySQL 数据的参数，勾选上，然后点击 "Finish"

### MYSQL 的配置

１、安装完成了，出现如下界面将进入 mysql 配置向导。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image009.jpg)

２、选择配置方式，"Detailed Configuration（手动精确配置）"、"Standard Configuration（标准配置）"，我们选择 "Detailed Configuration"，方便熟悉配置过程。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image010.jpg)

３、选择服务器类型，"Developer Machine（开发测试类，mysql 占用很少资源）"、"Server Machine（服务器类型，mysql 占用较多资源）"、"Dedicated MySQL Server Machine（专门的数据库服务器，mysql 占用所有可用资源）"

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image011.jpg)

４、选择 mysql 数据库的大致用途，"Multifunctional Database（通用多功能型，好）"、"Transactional Database Only（服务器类型，专注于事务处理，一般）"、"Non-Transactional Database Only（非事务处理型，较简单，主要做一些监控、记数用，对 MyISAM 数据类型的支持仅限于 non-transactional），按 "Next" 继续。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image012.jpg)

５、选择网站并发连接数，同时连接的数目，"Decision Support(DSS)/OLAP（20 个左右）"、"Online Transaction Processing(OLTP)（500 个左右）"、"Manual Setting（手动设置，自己输一个数）"。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image013.jpg)

６、是否启用 TCP/IP 连接，设定端口，如果不启用，就只能在自己的机器上访问 mysql 数据库了，在这个页面上，您还可以选择 " 启用标准模式 "（Enable Strict Mode），这样 MySQL 就不会允许细小的语法错误。如果是新手，建议您取消标准模式以减少麻烦。但熟悉 MySQL 以后，尽量使用标准模式，因为它可以降低有害数据进入数据库的可能性。按 "Next" 继续

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image014.jpg)

７、就是对 mysql 默认数据库语言编码进行设置（重要），一般选 UTF-8，按 "Next" 继续。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image015.jpg)

８、选择是否将 mysql 安装为 windows 服务，还可以指定 Service Name（服务标识名称），是否将 mysql 的 bin 目录加入到 Windows PATH（加入后，就可以直接使用 bin 下的文件，而不用指出目录名，比如连接，"mysql.exe -uusername -ppassword;" 就可以了，不用指出 mysql.exe 的完整地址，很方便），我这里全部打上了勾，Service Name 不变。按 "Next" 继续。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image016.jpg)

９、询问是否要修改默认 root 用户（超级管理）的密码。"Enable root access from remote machines（是否允许 root 用户在其它的机器上登陆，如果要安全，就不要勾上，如果要方便，就勾上它）"。最后 "Create An Anonymous Account（新建一个匿名用户，匿名用户可以连接数据库，不能操作数据，包括查询）"，一般就不用勾了，设置完毕，按 "Next" 继续。

用户名和密码统一设置成：

用户名:root

用户密码：root

１０、确认设置无误，按 "Execute" 使设置生效，即完成 MYSQL 的安装和配置。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image017.jpg)

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image018.jpg)

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image019.jpg)
