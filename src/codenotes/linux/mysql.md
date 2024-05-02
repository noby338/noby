---
title: mysql
icon: write
category:
    - Linux
tag:
    - Linux
sticky: false
star: false
article: true
timeline: true
---

## mysql 的 rpm 安装

- 卸载 linux 自带的 mariadb
    - rpm -qa | grep -i mariadb
    - rpm -e --nodeps
- 安装
    - rpm -ivh mysql-community-common-5.7.35-1.el7.x86_64.rpm
    - rpm -ivh mysql-community-libs-5.7.35-1.el7.x86_64.rpm
    - rpm -ivh mysql-community-client-5.7.35-1.el7.x86_64.rpm
    - rpm -ivh mysql-community-server-5.7.35-1.el7.x86_64.rpm
- 使用
    - systemctl start mysqld
    - systemctl stop mysqld
    - systemctl restart mysqld
    - systemctl status mysqld
- 修改密码
    - 查看密码
        - cat /var/log/mysqld.log | grep password
    - 登录
        - `mysql -uroot -p`
    - 修改密码强度

    ```
      set global validate_password_policy=0;
      set global validate_password_mixed_case_count=0;
      set global validate_password_number_count=3;
      set global validate_password_special_char_count=0;
      set global validate_password_length=3;
      ```

    - 显示密码强度
        - `SHOW VARIABLES LIKE 'validate_password%';`
    - 修改密码
        - `ALTER USER 'root'@'localhost' IDENTIFIED BY '123';`

- 防火墙开放端口 mysql
    - 开放端口
        - `firewall-cmd --zone=public --add-port=3306/tcp --permanent`
    - 重启防火墙
        - `firewall-cmd --reload`
- 开启远程登录
    - `grant all privileges on *.* to 'root' @'%' identified by '123';`
- 修改配置文件/etc/my.cnf，添加：

  ```
    character_set_server=utf8
    [client]
    default-character-set=utf8
    ```

## 数据的迁移

- 库转换为 sql 文件
    - `mysqldump -uroot -p123 test> test.sql`
- sql 文件转换为库 (库必须存在)
    - `mysqldump -uroot -p123 test < test.sql`
