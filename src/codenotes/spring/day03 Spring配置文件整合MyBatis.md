---
title: day03 Spring配置文件整合MyBatis
icon: write
category:
  - Spring
tag:
  - Spring
  - Spring整合MyBatis
sticky: false
star: false
article: true
timeline: true
---

### 知识点

- 通过 Spring 整合 Mybatis
  - pom 文件加入的坐标
    - Spring 的 Mybatis 的整合包
    - Spring 的 jdbc 整合包
    - 第三方数据源 druid
    - Spring 对 log4j 的配置
  - Spring 配置文件
    - 导入 properties 配置文件
    - DruidDataSource
    - SqlSessionFactoryBean
    - MapperScannerConfigurer

### 代码示例

#### pom

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>priv.noby</groupId>
    <artifactId>spring3</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>

        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.9</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.34</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.22</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.2.15.RELEASE</version>
        </dependency>
        <!--Spring 的 Mybaits 的整合包-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>2.0.2</version>
        </dependency>
        <!--Spring 的 jdbc 整合包-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>5.2.15.RELEASE</version>
        </dependency>
        <!--第三方数据源druid-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.10</version>
        </dependency>
        <!--Spring 对 log4j 的配置，内部包含 log4j-->        
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>1.7.21</version>
        </dependency>
    </dependencies>

</project>
```

#### Resource

```xml
<!--
加载使用配置文件必须引入context的命名空间及地址，
xmlns:context="http://www.springframework.org/schema/context"
http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
-->
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd        ">
    <!--
    读取配置文件，使用该标签前必须引入context的命名空间及地址
    system-properties-mode="NEVER"表示不读取系统的属性（解决自定义属性名和系统属性名冲突）
    -->
<!--    <context:property-placeholder location="db.properties" system-properties-mode="NEVER"/>-->
    <context:property-placeholder location="classpath:db.properties"/>
    <!--配置数据源-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <!--${}是Spring四大核心中的spEL(Spring表达式)，通过spEL获取spring中的数据-->
        <property name="driverClassName" value="${jdbc.driverClassName}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
    <!--配置 SqlSessionFactoryBean，创建 SqlSession 对象 (来自 Spring mybatis 的整合包)-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="typeAliasesPackage" value="priv.noby.spring3.entity"/>
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <!--MapperScannerConfigurer，用于扫描 Dao 和创建 sqlSession-->    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="priv.noby.spring3.dao"/>
        <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
    </bean>

    <bean id="studentService" class="priv.noby.spring3.service.impl.StudentServiceImpl">
        <property name="studentDao" ref="studentDao"/>
    </bean>
</beans>
```

```properties
jdbc.driverClassName=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/stage3?useUnicode=true&characterEncoding=utf8
jdbc.username=root
jdbc.password=123
```

```properties
# 这段代码是使用log4j进行日志输出的配置。

# log4j打印的日志等级(低到高)：ALL<=TRACE(最细的内容)<DEBUG(调试信息)<INFO(普通信息)<WARN(警告信息)<ERROR(错误信息)<FATAL(严重错误)<OFF
# rootLogger表示在所有环境均生效的配置，OFF表示在所有环境下不显示
log4j.rootLogger=OFF

# priv.noby.spring3.dao表示在当前类生效的配置，这个类的日志级别设置为debug，并将日志输出到CONSOLE这个appender中。
# 虽然前面设置了log4j.rootLogger=OFF，但这行配置将覆盖前面的配置，前面的配置为了去掉警告提示。
log4j.logger.priv.noby.spring3.dao=DEBUG,CONSOLE

# 表示定义了一个名为CONSOLE的appender，它的类型是ConsoleAppender，即将日志输出到控制台。
log4j.appender.CONSOLE=org.apache.log4j.ConsoleAppender
# 表示定义了CONSOLE这个appender的输出格式，这里使用的是PatternLayout，即按照指定的格式输出日志信息。
log4j.appender.CONSOLE.layout=org.apache.log4j.PatternLayout
# 表示指定了输出格式的具体内容，%m表示输出日志信息，%t表示输出线程名，%c表示输出日志所在的类的全限定名（%c{1}表示输出日志所在类的简称，即类名去掉包名后的名称），%l表示日志输出的位置信息，%n表示换行。
log4j.appender.CONSOLE.layout.ConversionPattern=%p %c{1}:%L %m%n


# 指定了日志输出的方式为每天生成一个日志文件
log4j.appender.FILE=org.apache.log4j.DailyRollingFileAppender
# 表示定义了FILE这个appender的输出格式，这里使用的是PatternLayout，即按照指定的格式输出日志信息。
log4j.appender.FILE.layout=org.apache.log4j.PatternLayout
# 指定了日志输出的格式，其中%d表示日期，%p表示日志级别，%m表示日志信息，%t表示线程名，%c表示类名，%l表示日志输出的位置信息，%n表示换行。
log4j.appender.FILE.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} [%p] %m [%t] %c [%l]%n
# 指定了日志输出的文件路径
log4j.appender.FILE.File=file.log
```

#### entity

```java
package priv.noby.spring3.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    private Integer id;
    private String name;
    private Integer age;
}
```

#### dao

```java
package priv.noby.spring3.dao;

import priv.noby.spring3.entity.Student;

public interface StudentDao {
    Student selectById(int id);
    boolean insert(Student student);
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="priv.noby.spring3.dao.StudentDao">
    <select id="selectById" resultType="student">
        select *
        from student        where id = #{id}    </select>
    <insert id="insert">
        insert into student (name, age) value (#{name}, #{age})
    </insert>
</mapper>
```

#### service

```java
package priv.noby.spring3.service;

import priv.noby.spring3.entity.Student;

public interface StudentService {
    Student selectById(int id);
    boolean insert(Student student);
}
```

```java
package priv.noby.spring3.service.impl;

import priv.noby.spring3.dao.StudentDao;
import priv.noby.spring3.entity.Student;
import priv.noby.spring3.service.StudentService;

public class StudentServiceImpl implements StudentService {
    StudentDao studentDao;

    public void setStudentDao(StudentDao studentDao) {
        this.studentDao = studentDao;
    }

    @Override
    public Student selectById(int id) {
        return studentDao.selectById(id);
    }

    @Override
    public boolean insert(Student student) {
        return studentDao.insert(student);
    }

}
```

#### test

```java
package priv.noby.spring3.dao;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import priv.noby.spring3.entity.Student;

public class StudentDaoTest {

    private ApplicationContext applicationContext;
    private StudentDao studentDao;

    @Before
    public void setUp(){
        applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        studentDao = (StudentDao) applicationContext.getBean("studentDao");
    }
    @Test
    public void testSelectById() {
        Student student = studentDao.selectById(1);
        System.out.println("student = " + student);
    }

    @Test
    public void testInsert() {
        Student student = new Student();
        student.setName("noby");
        student.setAge(20);
        boolean b = studentDao.insert(student);
        System.out.println(b);
    }

}
```

```java
package priv.noby.spring3.service.impl;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import priv.noby.spring3.entity.Student;
import priv.noby.spring3.service.StudentService;

public class StudentServiceImplTest {

    private ApplicationContext applicationContext;
    private StudentService studentService;

    @Before
    public void setUp() {
        applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        studentService = (StudentService) applicationContext.getBean("studentService");

    }
    @Test
    public void testSelectById() {
        Student student = studentService.selectById(1);
        System.out.println("student = " + student);
    }

    @Test
    public void testInsert() {
        Student student = new Student();
        student.setName("kace");
        student.setAge(30);
        boolean b = studentService.insert(student);
        System.out.println(b);
    }
}
```
