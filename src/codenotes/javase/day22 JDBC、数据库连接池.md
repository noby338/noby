---
title: day22 JDBC、数据库连接池
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

> 前置知识 [README](../sql/README.md)

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
  
/**  
 * @Description JDBC的基本使用  
 * JDBC默认为自动提交  
 * sql注入和防止方法(sql预编译，核心思路是将'字符转译为文本)  
 * @Author Noby  
 * @Date 2023/3/20 22:50  
 */public class JdbcNote {  
    public static void main(String[] args) throws Exception {  
//        basisFn();  
//        transactionFn();  
//        executeQueryFn();  
        prepareStatementFn();  
    }  
  
    /**  
     * JDBC的基本使用  
     * <p>  
     * executeUpdate()可以执行DDL(数据库定义语言)和DML(数据库操作语言)  
     *     * @throws Exception  
     */    static void basisFn() throws Exception {  
        /*  
        idea 将jar包放入模块下的libs文件夹，右击文件夹 Add as library         */        /*        该语句表示导入Driver类，jar包的Driver类中有静态代码块(静态代码块会在第一次导入类的时候执行)，  
        该代码块中调用了DriverManager.registerDriver(new Driver)静态方法，该方法可以注册一个驱动  
        Class是一个java的类(和class关键字不同)  
         */        Class.forName("com.mysql.jdbc.Driver");  
        /*  
        连接本地MySQL localhost：3306可省略  
        jdbc:mysql:为协议  
        ?后边拼接连接数据库时的参数  
        serverTimezone=UTC 表示设置时区，MySQL8里面要求必须设置时区，5里面可以省略  
        useUnicode=true 表示是否设置Java程序连接数据库的编码：(该编码不同于数据库编码和IDE编码)  
        characterEncoding=utf8 表示编码设置成utf-8  
        useServerPrepStmts=true 为开启mysql的预编译功能  
        */        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/stage1?serverTimezone=UTC&useUnicode=true&characterEncoding=utf8", "root", "123");  
  
        Statement statement = connection.createStatement();  
        int count = statement.executeUpdate("update account set money = 1000 where id = 1");  
        System.out.println("count = " + count);  
        statement.close();  
        connection.close();  
    }  
  
  
    /**  
     * 事务管理  
     *  
     * @throws Exception  
     */    static void transactionFn() throws Exception {  
        Class.forName("com.mysql.jdbc.Driver");  
        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/stage1?serverTimezone=UTC&useUnicode=true&characterEncoding=utf8", "root", "123");  
        Statement statement = connection.createStatement();  
  
        int count = 0;  
        int count2 = 0;  
        try {  
            //设置手动提交(开启事务)  
            connection.setAutoCommit(false);  
            count = statement.executeUpdate("update account set money = 1000 where id = 1");  
            //模拟异常  
//            int i = 1/0;  
            count2 = statement.executeUpdate("update account set money = 3000 where id = 2");  
            //提交事务  
            connection.commit();  
        } catch (SQLException e) {  
            //事务回滚  
            connection.rollback();  
            e.printStackTrace();  
        }  
  
        System.out.println("count = " + count);  
        System.out.println("count2 = " + count2);  
        statement.close();  
        connection.close();  
    }  
  
  
    /**  
     * executeQuery和resultSet的使用  
     * <p>  
     * executeQuery()可以执行DQL(数据库查询语言)  
     *     * @throws Exception  
     */    static void executeQueryFn() throws Exception {  
        Class.forName("com.mysql.jdbc.Driver");  
        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/stage1?serverTimezone=UTC&useUnicode=true&characterEncoding=utf8", "root", "123");  
        Statement statement = connection.createStatement();  
        ResultSet resultSet = statement.executeQuery("select * from account");  
        while (resultSet.next()) {  
            //可以输入列的索引(1开始)  
            int id = resultSet.getInt(1);  
            //可以书写列名  
            String username = resultSet.getString("username");  
            int money = resultSet.getInt(3);  
            System.out.println("id = " + id + ", username = " + username + ", money = " + money);  
        }  
        statement.close();  
        connection.close();  
    }  
  
    /**  
     * prepareStatement接口的使用  
     * <p>  
     * 该类继承自Statement类，该类可以预编译sql，可以防止SQL注入  
     *  
     * @throws Exception  
     */    static void prepareStatementFn() throws Exception {  
        Class.forName("com.mysql.jdbc.Driver");  
        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/stage1?serverTimezone=UTC&useUnicode=true&characterEncoding=utf8&useServerPrepStmts=true", "root", "123");  
        Statement statement = connection.createStatement();  
        //region 模拟sql注入  
////        String name = "noby";  
////        String password = "123";  
//        String name = "aaaa";  
//        String password = "' or '1' = '1";  
//        ResultSet resultSet = statement.executeQuery("select * from user where name='" + name + "' and password='" + password + "'");  
        //endregion 模拟sql注入  
  
        /*  
        mysql执行sql语句先要编译，才能执行  
        connection.prepareStatement(sql)已经将sql发送至mysql了，mysql将对sql进行编译，当传入参数的时候sql已经编译完成直接执行，  
        而statement.executeQuery(sql)会编译和运行同时执行，所以prepareStatement的效率更高  
        当开启预编译后，第二次执行sql参数改变而sql未改变时，会使用上一次的预编译结果，使得效率更高  
        数据库连接后跟参数 useServerPrepStmts=true 开启预编译  
         */        PreparedStatement preparedStatement = connection.prepareStatement("select * from user where name=? and password=?");  
        preparedStatement.setString(1, "noby");  
        preparedStatement.setString(2, "123");  
        //模拟sql注入失败(PreparedStatement可以方式sql注入)  
        //PreparedStatement可以方式sql注入的原理在于会将"' or '1' = '1"1中的'进行转译为'文本(\')而非使用字符串拼接  
//        preparedStatement.setString(1, "aaaa");  
//        preparedStatement.setString(2, "' or '1' = '1");  
        ResultSet resultSet = preparedStatement.executeQuery();  
        if (resultSet.next()) {  
            System.out.println("登录成功！！");  
        } else {  
            System.out.println("登陆失败！！");  
        }  
        preparedStatement.close();  
        statement.close();  
        connection.close();  
    }  
  
}
```

## 德鲁伊连接池

```java
package note;  
  
import com.alibaba.druid.pool.DruidDataSourceFactory;  
  
import javax.sql.DataSource;  
import java.io.FileInputStream;  
import java.sql.Connection;  
import java.util.Properties;  
  
/**  
 * Druid数据库连接池  
 *  
 * DataSource为java的数据库连接池标准接口(Druid为Alibaba的三方开源实现)  
 * 获取模块class根目录方法  
 *  
 * @author Noby  
 * @since 2022/10/3  
 */public class ConnectionPoolNote {  
    public static void main(String[] args) throws Exception{  
        //1、导入Druid jar包  
        //2、定义配置文件  
        Properties properties = new Properties();  
        //获取模块class根目录方法  
        properties.load(new FileInputStream(ConnectionPoolNote.class.getClassLoader().getResource("druid.properties").getPath()));  
  
        DataSource dataSource = DruidDataSourceFactory.createDataSource(properties);  
  
        Connection connection = dataSource.getConnection();  
        Connection connection2 = dataSource.getConnection();  
        Connection connection3 = dataSource.getConnection();  
  
        System.out.println("connection = " + connection);  
        System.out.println("connection2 = " + connection2);  
        System.out.println("connection3 = " + connection3);  
    }  
}
```