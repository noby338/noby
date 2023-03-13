---
title: day22 JDBC
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

## JDBC

- 定义：通过 java 语言操作数据库
- 如果插入中文时数据库出现乱码是因为三码不一致造成的

  - 数据库编码：create database xxx default character set utf8
  - IDE 编码：集成开发环境编码，例如 eclipse、IDEA 的编码
  - Java 程序连接数据库的编码：&useUnicode=true&characterEncoding=utf8

  ![image-20221003192009319](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221003192009319.png)

```java
package note;

import java.sql.*;

public class JdbcNote {
    public static void main(String[] args) throws Exception {
        //region jdbc基础用法
        //1.注册驱动
        /*
        需要导入mysql-connector-java-5.1.20.jar
        驱动的注册需要执行`DriverManager` 对象的 `registerDriver()` 方法
        而在Driver类中的静态代码块中已经执行了该对象的方法进行了驱动的注册，那么我们只需要加载 `Driver` 类，就可以注册驱动。
        而 `Class.forName("com.mysql.jdbc.Driver");` 就可以加载 `Driver` 类。
        MySQL 5之后的驱动包，可以省略注册驱动的步骤
         */
        Class.forName("com.mysql.jdbc.Driver");
        //2.获取连接
        /*
        jdbc:mysql://ip地址(域名):端口号/数据库名称?参数键值对1&参数键值对2…
        如果连接的是本机mysql服务器，并且mysql服务默认端口是3306，则url可以简写为：jdbc:mysql:///数据库名称?参数键值对
         */
        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/db1", "root", "123");
        Statement statement = connection.createStatement();
        int res = statement.executeUpdate("update student set name = 'kace' where id = 1");//返回值为受影响的行数，executeUpdate执行DML语句（增删改）
        System.out.println("res:" + res);
        //endregion

        //region 事务
        try {
            // ============开启事务==========
            connection.setAutoCommit(false);//手动提交(JDBC默认为)
            int count1 = statement.executeUpdate("update student set score = 123 where id = 1");
            System.out.println("conunt1:" + count1);
//            int i = 3 / 0;//出现问题
            int count2 = statement.executeUpdate("update student set tel = 321 where id = 1");
            System.out.println("conunt2:" + count2);

            // ============提交事务==========
            //程序运行到此处，说明没有出现任何问题，则需求提交事务
            connection.commit();
        } catch (Exception e) {
            // ============回滚事务==========
            //程序在出现异常时会执行到这个地方，此时就需要回滚事务
            connection.rollback();
            e.printStackTrace();
        }
        //endregion

        //region resultSet结果集（DQL）
        String sql = "select * from student";
        ResultSet rs = statement.executeQuery(sql);//获取的为一个结果集对象（类似一个表格）
        while (rs.next()) {
            int id = rs.getInt("id");
            //下行代码相同
//            int id = rs.getInt(1);//列的索引从1开始
            String name = rs.getString("name");
            Date birthday = rs.getDate("birthday");
            System.out.print(id + " ");
            System.out.print(name + " ");
            System.out.println(birthday);
            System.out.println("--------------");
        }
        //endregion

        //region prepareStatement
        /*
        预编译SQL与斌执行，可以预防sql注入存在的安全问题
        SQL注入：通过操作输入来修改实现定义好的SQL语句，用以达到执行代码对服务器进行攻击的方法
         */
        PreparedStatement preparedStatement = connection.prepareStatement("update student set name = ? where id = ?");
        preparedStatement.setString(1,"july");
        preparedStatement.setInt(2,4);
        preparedStatement.executeUpdate();
        //endregion

        statement.close();
        connection.close();
    }

}
```
