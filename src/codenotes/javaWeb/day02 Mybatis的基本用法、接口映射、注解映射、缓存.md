---
title: day02 Mybatis的基本用法、接口映射、注解映射、缓存
icon: write
category:
    - JavaWeb
    - MyBatis
tag:
    - JavaWeb
    - MyBatis缓存
    - log4j
    - JUnit
sticky: false
star: false
article: true
timeline: true
---

## mybatis 的介绍

- MyBatis 是一种优秀的基于 Java 语言的持久层框架，它避免了很多传统的 JDBC 编程的冗余和复杂性，使得使用者只需关注 SQL 语句本身，而不必关心 SQL 执行的事务管理、结果集映射等操作细节，从而极大地简化了数据访问层的开发。
- MyBatis 提供了很多便捷的功能，其中最重要的是它通过 XML 或注解来配置和映射 Java 对象和数据库表，支持非常灵活的 SQL 编写方式。MyBatis 可以将 SQL 语句、结果映射和 Java 对象连接到一起，从而使得数据访问变得更加快捷和高效。通过 MyBatis，可以实现一些日常开发中常见的操作，例如几种基本的 SQL 操作（增、删、改、查）、分页查询、动态 SQL、多表联合查询等。
- MyBatis 的核心文件包括：
    - `SqlSessionFactory`：用于生成 SqlSession 对象的工厂类。
    - `SqlSession`：用于与数据库进行交互的 Session 对象。
    - `Mapper`：由 MyBatis 自动生成的用于访问数据库的 DAO。
- mybatis 需要导入的 jar
    - mybatis-3.5.6.jar
    - mysql-connector-java-5.1.20.jar
    - dom4j-1.1.jar
- pagehelper 需要的 jar 包：
    - pagehelper-5.1.11.jar
    - jsqlparser-2.0.jar
- log4j 的 jar 包
    - log4j-1.2.17.jar
- junit 需要的 jar 包：
    - junit-4.11.jar

## 模块的知识点

- mybatis 的自动映射和不使用接口映射
    - mybatis 的配置文件
    - properties 配置数据库连接
    - SqlSession 工具类的创建
    - dao 及 dao 实现类的创建（使用 sqlSession 执行 sql 语句）
        - 基本的 curd
        - 使用 mapper 为参数传递多个 sql 参数
        - 模糊查询
    - 映射文件的配置
    - log4j 日志框架的使用
        1. 文件名为 log4j.properties
        2. 设置需要输出日志的路径和级别
    - 不使用接口映射
    - 使用自动映射 (动态代理)
        - 使用 mybatis 注解实现 sql 的书写
    - pageHelper 的使用
    - 使用 param 注解传入多个参数

## mybaits 的配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?><!--文档类型说明-->
<!--导入第三方约束文件，表示本文件在准守xml语法的同时还要准守这里的mybatis-3-config.dtd(mybatis的主配置文件)文件中制定的语法-->
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd"><!--dtd文件为约束文件，作为下面xml文件的规范-->
<configuration>
    <!--导入properties文件，可省略-->
    <properties resource="db.properties"/>

    <!--实体类设置别名-->
    <typeAliases>
        <!--单个配置某个全限定名-->
<!--        <typeAlias type="note.entity.Student" alias="Student"></typeAlias>-->
        <!--统一配置某个包下的全限定名为类的类名-->
        <package name="note.entity"/>
    </typeAliases>

    <!--导入插件-->
    <plugins>
        <!--pagehelper插件(分页查询插件)-->
        <plugin interceptor="com.github.pagehelper.PageInterceptor"/>
    </plugins>

    <!-- environments：指定配置环境。例如开发、测试、生产环境 -->
    <environments default="development"><!--指定默认配置环境为开发环境-->
        <environment id="development"><!--配置环境，可能有多个-->
            <transactionManager type="JDBC"/><!--事务管理器(用jdbc的事务管理器来管理)-->
            <!--配置数据源：数据库来自哪里 -->
            <dataSource type="POOLED"><!--POOLED：连接池，采用连接池的方式获取连接-->
                <!--四大参数：properties文件的key使用，分级区分，避免命名冲突-->
                <property name="driver" value="${jdbc.driver}"/><!--这里的${driver}来自properties-->
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
                <property name="defaultAutoCommit" value="${jdbc.defaultAutoCommit}"/><!--mybatis默认关闭自动提交(为true为自动提交)-->
            </dataSource>
        </environment>
    </environments>
    <mappers><!--加载解析的映射文件(sql)-->
        <!--单个配置某个xml映射文件-->
<!--        <mapper resource="note/dao/StudentDao.xml"></mapper>-->
<!--        <mapper resource="note/dao/Student1Dao.xml"></mapper>-->
        <!--统一配置某个包下的xml映射文件（xml的文件名是根据接口名创建），使用该方法的映射文件名和接口名必须相同-->
        <package name="note.dao"/>
    </mappers>
</configuration>
```

## 数据库的 properties

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/stage2?useUnicode=true&characterEncoding=utf8
jdbc.username=root
jdbc.password=123
# mybatis默认为手动提交
jdbc.defaultAutoCommit=false
```

## log4j 的配置 properties

```properties
# 这段代码是使用log4j进行日志输出的配置。

# log4j打印的日志等级(低到高)：ALL<=TRACE(最细的内容)<DEBUG(调试信息)<INFO(普通信息)<WARN(警告信息)<ERROR(错误信息)<FATAL(严重错误)<OFF
# rootLogger表示在所有环境均生效的配置，OFF表示在所有环境下不显示
log4j.rootLogger=OFF

# note.dao表示在当前类生效的配置，这个类的日志级别设置为debug，并将日志输出到CONSOLE这个appender中。
# 虽然前面设置了log4j.rootLogger=OFF，但这行配置将覆盖前面的配置，前面的配置为了去掉警告提示。
log4j.logger.note.dao=DEBUG,CONSOLE,FILE

# 表示定义了一个名为CONSOLE的appender，它的类型是ConsoleAppender，即将日志输出到控制台。
log4j.appender.CONSOLE=org.apache.log4j.ConsoleAppender
# 表示定义了CONSOLE这个appender的输出格式，这里使用的是PatternLayout，即按照指定的格式输出日志信息。
log4j.appender.CONSOLE.layout=org.apache.log4j.PatternLayout
# 表示指定了输出格式的具体内容，%m表示输出日志信息，%t表示输出线程名，%c表示输出日志所在的类的全限定名（%c{1}表示输出日志所在类的简称，即类名去掉包名后的名称），%l表示日志输出的位置信息，%n表示换行。
log4j.appender.CONSOLE.layout.ConversionPattern=%p %c{1}:%L - %m%n


# 指定了日志输出的方式为每天生成一个日志文件
log4j.appender.FILE=org.apache.log4j.DailyRollingFileAppender
# 表示定义了FILE这个appender的输出格式，这里使用的是PatternLayout，即按照指定的格式输出日志信息。
log4j.appender.FILE.layout=org.apache.log4j.PatternLayout
# 指定了日志输出的格式，其中%d表示日期，%p表示日志级别，%m表示日志信息，%t表示线程名，%c表示类名，%l表示日志输出的位置信息，%n表示换行。
log4j.appender.FILE.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} [%p] %m [%t] %c [%l]%n
# 指定了日志输出的文件路径
log4j.appender.FILE.File=file.log
```

## 生成 sqlssesion 的工具类

```java
package note.util;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

/**
 * @Description 用于创建数据库链接的工具类
 * @Author Noby
 * @Date 2023/3/21 12:42
 */public class SqlSessionUtil {
    static SqlSessionFactory sqlSessionFactory= null;
    public static SqlSession getSqlSession(){
        if (sqlSessionFactory == null) {
            InputStream inputStream = null;
            try {
                inputStream = Resources.getResourceAsStream("mybatisConfig.xml");
            } catch (IOException e) {
                e.printStackTrace();
            }
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        }
        return sqlSessionFactory.openSession(false); //如果不设置参数或者参数为false就是手动提交事务，参数设置为true就是自动提交事务
    }
}
```

## entity 实体类

```java
package note.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private Integer id;
    private String name;
    private Boolean gender;
    private Date birthday;

    public Student(String name,Boolean gender,Date birthday) {
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
    }
}
```

## dao 接口

```java
package note.dao;

import note.entity.Page;
import note.entity.Student;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface StudentDao {
    int insert(Student student);
    int insertResId(Student student);
    int deleteById(int id);
    Student selectById(int id);
    int update(Student student);
    List<Student> selectAll();
    List<Student> selectRangeBirthday(@Param("dateLow") Date dateLow,@Param("dateHigh") Date dateHigh);
    List<Student> selectLikeName(String name);
    List<Student> selectAllByPageHelper();
}
```

```java
package note.dao;

import note.entity.Student;
import org.apache.ibatis.annotations.Select;

/**
 * mybatis的注解映射
 * @author Noby
 * @since 2022/10/1
 */public interface StudentDao2 {
    @Select("select * from student where id = #{id}")
    Student selectById2(int id);
}
```

## dao 接口实现类

```java
package note.dao.impl;

import note.dao.StudentDao;
import note.entity.Page;
import note.entity.Student;
import note.util.SqlSessionUtil;
import org.apache.ibatis.session.SqlSession;

import java.util.Date;
import java.util.List;

/**
 * 自己定义的实现类，mybatis的常规用法是使用动态代理(该类由mybatis自动生成)
 * @author Noby
 * @since 2022/9/26
 */public class StudentDaoImpl implements StudentDao {
    private SqlSession sqlSession = SqlSessionUtil.getSqlSession();

    @Override
    public int insert(Student student) {
        return 0;
    }

    @Override
    public int insertResId(Student student) {
        return 0;
    }

    @Override
    public int deleteById(int id) {
        return 0;
    }

    @Override
    public Student selectById(int id) {
        Object o = sqlSession.selectOne("selectById", id);
        Student student = (Student) o;
        System.out.println("使用的是自定义的实现类实现查询");
        sqlSession.close();
        return student;
    }

    @Override
    public int update(Student student) {
        return 0;
    }

    @Override
    public List<Student> selectAll() {
        return null;
    }

    @Override
    public List<Student> selectRangeBirthday(Date dateLow, Date dateHigh) {
        return null;
    }

    @Override
    public List<Student> selectLikeName(String name) {
        return null;
    }

    @Override
    public List<Student> selectByPage(Page page) {
        return null;
    }

    @Override
    public List<Student> selectAllByPageHelper() {
        return null;
    }
}
```

## 接口的 mapper

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--导入第三方约束文件，表示本文件在准守xml语法的同时还要准守这里的mybatis-3-mapper.dtd(mybatis的映射文件)文件中制定的语法-->
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="note.dao.StudentDao"><!--命名空间，一般为映射文件实现类的全限定名-->
    <!-- 加上cache标签之后表示当前mapper中产生的数据是"可以"被放到二级缓存中 -->
<!--    <cache readOnly="true"/>-->
    <!-- insert标签就是写insert语句,id就为调用该SQL的名字，推荐执行对应SQL的方法名
      -->
    <!-- parameterType:            方法的参数类型，可以不写。
            为全限定名。
     useGeneratedKeys：为true时，表示如果插入的表id以自增列为主键，则插入成功之后使用JDBC的getGeneratedKeys方法获取主键并赋值keyProperty设置的领域模型属性中
     keyProperty：指明数据库中返回的主键id给实体类中的哪个属性。由于是数据库生成的主键，所以在这个对象持久化到数据库之前是对象中的这个属性是没有属性值的，但是在持久化之后又想使用这个主键.
          -->    <insert id="insert" parameterType="Student" useGeneratedKeys="true" keyProperty="id">
        insert into student(name, gender, birthday)
        values (#{name}, #{gender}, #{birthday});    </insert>
    <!--  #{属性名}相当jdbc中使用prepareStatement的?占位符，会对敏感字符进行转译，可避免sql注入   $(属性名)相对于使用字符串拼接，可能会产生sql注入 -->
    <!-- insert into student values(null,'${name}',${gender},${birthday}) -->    <insert id="insertResId">
        insert into student (name,gender,birthday) values (#{name},#{gender},#{birthday});
        <!-- selectKey 子标签可以将插入后的主键id赋值给实体对象
             keyProperty 查询的值赋值给哪个属性
             resultType: 查询结果的返回值的类型,系统类型有定义好的别名
             order: 不同的数据库，生成自增主键值的时间不同，
                     MySQL数据库，先插入数据，在生成主键,使用AFTER
                     Oracle数据，刚好相反，使用BEFORE
                     新版本可以不写,框架会自动判断加载的驱动包，使用对应的策略参数
                -->
        <selectKey keyProperty="id" resultType="int" order="AFTER">
            SELECT @@identity
        </selectKey>
    </insert>
    <update id="update" parameterType="Student">
        update student
        set name=#{name},            gender=#{gender},            birthday=#{birthday}        where id = #{id};    </update>
    <delete id="deleteById" parameterType="int">
        <!-- 参数只有一个，并且是基本类型或者String,#里面的内容叫什么都可以，本质就是一个占位符
                    id=#{xxx} -->
        delete from student where id = #{id};
    </delete>
    <!-- 查询必须写返回值类型：底层就是反射创建对象，属性赋值 -->
    <select id="selectById" resultType="note.entity.Student">
        select *
        from student        where id = #{id};    </select>
    <select id="selectAll" resultType="note.entity.Student">
        select *
        from student;    </select>
    <!--使用map为参数传入多个查询参数（对象也可以）-->
    <select id="selectRangeBirthday" resultType="note.entity.Student">
        select *
        from student        where birthday between #{dateLow} and #{dateHigh};    </select>
    <!--模糊查询的方法-->
    <select id="selectLikeName" resultType="note.entity.Student">
        select *
        from student        where name like '%' #{name} '%';    </select>

    <!--使用pageHelper分页查询-->
    <select id="selectAllByPageHelper" resultType="note.entity.Student">
        select *
        from student    </select>

</mapper>
```

## 测试类

```java
package note.dao.impl;

import note.dao.StudentDao;
import note.entity.Student;
import note.util.SqlSessionUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

/**
 * 不使用接口映射
 *
 * mybatis查询数据封装对象的原理：
 * 1.通过namespace.id  找到SQL语句进行执行
 * 2.得到ResultSet对象，获得sql记录和字段
 * 3.通过resultType属性指定的类型得到该类的字节码对象，然后通过反射的方式得到字段对应setter方法的名字、参数的类型
 * 4.创建对象
 * 5.如果为单个对象，返回对象。如果有多个对象，以list的方式返回
 *
 * */public class StudentDaoTest {
    private SqlSession sqlSession = SqlSessionUtil.getSqlSession();

    /**
     * 这种 MyBatis 的操作方式称为基于语句（Statement）的操作，是 MyBatis 中最基础、最原始的操作方式。它不需要 Mapper 接口
     * 查询一个
     * 该方法不依赖StudentDao接口中的方法，即使不存在该接口也能执行
     */
    @Test
    public void testSelectOne() {
        //返回的为一个对象时用selectOne
        Object o = sqlSession.selectOne("note.dao.StudentDao.selectById", 1);//已配置<package name="note.dao"/>可简写为selectById
        Student student = (Student) o;
        System.out.println("student = " + student);
        sqlSession.close();
    }

    /**
     * mybatis的接口手动代理
     * 利用StudentDao的实体类查询一个(用户自己实现该接口，后期的常规用法是mybatis通过动态代理自动实现该实现类)
     */    @Test
    public void testSelectOne2() {
        StudentDao studentDao = new StudentDaoImpl();
        Student student = studentDao.selectById(1);
        System.out.println("student = " + student);
        sqlSession.close();
    }


    /**
     * 利用map集合传入多个参数
     */
    @Test
    public void testSelectRangeBirthdayByMap() {
        LocalDate dateLow = LocalDate.of(1999, 1, 1);
        LocalDate dateHigh = LocalDate.of(2004, 9, 1);

        HashMap<String, Object> map = new HashMap<>();
        map.put("dateLow",dateLow.toString());
        map.put("dateHigh",dateHigh.toString());
        //返回的为多个对象时用selectList
        Object o = sqlSession.selectList("note.dao.StudentDao.selectRangeBirthday", map);
        List<Student> students = (List<Student>) o;
        System.out.println("students = " + students);
        sqlSession.close();

    }


}
```

```java
package note.dao.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import note.dao.StudentDao;
import note.entity.Student;
import note.util.SqlSessionUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 自动映射
 * <p>
 * 接口映射：mybatis为了方便调用SQL、传参提供了接口映射xml的编程方式，用一个接口与对应的xml进行映射，分为手动映射和自动映射
 * 自动映射：mybatis根据结果集的字段名自动得到对应的setter方法名，通过反射调用setter方法给属性赋值完成数据映射
 * 手动映射：指程序员通过配置的方式告诉mybatis哪个字段映射到哪个属性上，例如当字段名与属性名不一致时、自动映射无法完成数据映射时；
 * <p>
 * 注意事项：
 * 1.接口名字最好与对应的mapper文件一致
 * 2.接口最好与mapper文件在同一包下
 * 3.mapper文件的namespace必须是对应接口的全限定名
 * 4.接口中的方法名与对应SQL的id要保持一致
 * 5.接口的返回值类型要与SQL的结果保持一致
 * 6.在解析mapper文件时用package标签引入，不建议使用mapper标签
 */
public class StudentDaoTest2 {
    private SqlSession sqlSession = SqlSessionUtil.getSqlSession();
    //通过动态代理自动生成StudentDao的实现类
    private StudentDao studentDao = sqlSession.getMapper(StudentDao.class);

    /**
     * 显示动态代理的实现类
     */
    @Test
    public void showStudentDao() {
        System.out.println("studentDao = " + studentDao);
        //org.apache.ibatis.binding.MapperProxy@8646db9 是一个动态代理的类
    }


    /**
     * 添加且可返回id，第一种方法
     */
    @Test
    public void testInsertStudent() {
        Date date = null;
        try {
            date = new SimpleDateFormat("yyyy-MM-dd").parse("1999-4-26");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Student student = new Student("kace", true, date);

        System.out.println("before:" + student);
        studentDao.insert(student);
        System.out.println("after:" + student);
        sqlSession.commit();
        sqlSession.close();
    }

    /**
     * 添加且可返回id，第二种方法
     */
    @Test
    public void testInsertStudentResId() {
        Date date = null;
        try {
            date = new SimpleDateFormat("yyyy-MM-dd").parse("1999-4-26");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Student student = new Student("noby", true, date);
        System.out.println("before:" + student);
        studentDao.insertResId(student);
        System.out.println("after:" + student);
        sqlSession.commit();
        sqlSession.close();
    }

    /**
     * 删除可返回删除的数量
     */
    @Test
    public void testDeleteStudentById() {
        System.out.println("studentDao.deleteById(42) = " +
                studentDao.deleteById(42));
        sqlSession.close();
    }

    /**
     * 单个查询
     */
    @Test
    public void testSelectStudentById() {
        System.out.println("studentDao.selectById(3) = " +
                studentDao.selectById(3));
        sqlSession.close();
    }

    /**
     * 修改可返回修改的数量
     */
    @Test
    public void testUpdateStudent() {
        Date date = null;
        try {
            date = new SimpleDateFormat("yyyy-MM-dd").parse("1999-4-26");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        System.out.println(studentDao.update(new Student(6, "kace", true, date)));
        sqlSession.commit();
        sqlSession.close();
    }

    /**
     * 查询所有
     */
    @Test
    public void testSelectAllStudent() {
        System.out.println("studentDao.selectAll() = " +
                studentDao.selectAll());
        sqlSession.close();
    }


    /**
     * 使用Param注解传入多个参数
     */
    @Test
    public void testSelectStudentRangeBirthday() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date dateLow = null;
        Date dateHigh = null;
        try {
            dateLow = simpleDateFormat.parse("2022-1-29");
            dateHigh = simpleDateFormat.parse("2022-9-1");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        System.out.println("studentDao.selectRangeBirthday(dateLow,dateHigh) = " +
                studentDao.selectRangeBirthday(dateLow, dateHigh));
        sqlSession.close();
    }

    /**
     * 模糊查询
     */
    @Test
    public void testSelectStudentLikeName() {
        System.out.println("studentDao.selectLikeName(\"冬梅\") = " +
                studentDao.selectLikeName("冬梅")
        );
        sqlSession.close();
    }

    /**
     * 使用pageHelper分页查询
     */
    @Test
    public void testSelectAllByPageHelper() {
        PageInfo<Student> pageInfo;
        PageHelper.startPage(1, 4);
        List<Student> studentList = studentDao.selectAllByPageHelper();
        pageInfo = new PageInfo<>(studentList);
        System.out.println("pageInfo = " + pageInfo);
        sqlSession.close();
    }

}
```

```java
package note.dao.impl;

import note.dao.StudentDao2;
import note.util.SqlSessionUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

/**
 * mybatis注解映射
 */public class StudentDaoTest3 {
    /**
     * 单个查询使用mybatis注解
     */
    @Test
    public void testSelectStudentById2() {
        SqlSession sqlSession = SqlSessionUtil.getSqlSession();
        StudentDao2 mapper = sqlSession.getMapper(StudentDao2.class);
        System.out.println("mapper.selectById(3) = " +
                mapper.selectById2(3));
        sqlSession.close();
    }
}
```
