---
title: day04 Spring配置类整合MyBatis
icon: write
category:
    - Spring
tag:
    - Spring
    - 配置类
    - Spring整合MyBatis
sticky: false
star: false
article: true
timeline: true
---

## 知识点

- 通过注解和配置类使用 Spring
    - @Configuration 用于指定当前类是一个 Spring 配置类，当创建容器时会从该类上加载注解
    - @ComponentScan("") 用于指定 Spring 在初始化容器时要扫描的包。作用和在 Spring 的 xml 配置文件中的一样 <context:component-scan base-package="priv.noby.note.entity"/>
    - @Bean 使用在方法上，标注将该方法的返回值存储到 Spring 容器中
    - @PropertySource 用于加载.properties 文件中的配置
- @Import 用于导入其他配置类
- Spring 整合 junit(先导入 Spring 整合 Junit 包)
    - @RunWith(SpringJUnit4ClassRunner.class)
    - ContextConfiguration("classpath:applicationContext.xml")

## 代码示例

### pom

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>priv.noby</groupId>
    <artifactId>spring4</artifactId>
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
        <!--Spring 对 log4j 的配置-->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>1.7.21</version>
        </dependency>
        <!--Spring的junit的整合包，可用于测试时可注入Spring-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.2.15.RELEASE</version>
        </dependency>
    </dependencies>

</project>
```

### Resource

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

# priv.noby.spring4.dao表示在当前类生效的配置，这个类的日志级别设置为debug，并将日志输出到CONSOLE这个appender中。
# 虽然前面设置了log4j.rootLogger=OFF，但这行配置将覆盖前面的配置，前面的配置为了去掉警告提示。
log4j.logger.priv.noby.spring4.dao=DEBUG,CONSOLE

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

### 配置类

```java
package priv.noby.spring4.config;  
  
import com.alibaba.druid.pool.DruidDataSource;  
import org.springframework.beans.factory.annotation.Value;  
import org.springframework.context.annotation.*;  
  
import javax.sql.DataSource;  
  
/**  
 * 配置类相关注解的使用  
 */  
//表示这是一个 Spring 的配置类  
@Configuration  
//配置包扫描 <context:component-scan base-package='priv.noby.note.service'"/>@ComponentScan("priv.noby.spring4.service")  
//加载其他配置文件 <context:property-placeholder location="classpath:db.properties"/>@PropertySource("classpath:db.properties")  
//加载其他配置类 <import resource="applicationContext-other.xml"/> (该参数为数组，多个时将多个参数用classes = {})  
@Import(MybatisConfiguration.class)  
public class SpringConfiguration {  
    //${}是Spring四大核心中的spEL(Spring表达式)，通过spEL获取db.properties导入spring容器中的数据  
    @Value("${jdbc.driverClassName}")  
    private String driverClassName;  
    @Value("${jdbc.url}")  
    private String url;  
    @Value("${jdbc.username}")  
    private String username;  
    @Value("${jdbc.password}")  
    private String password;  
  
    //该注解表示Spring会将当前方法的返回值以Type方式(方法上的返回类型)存储到Spring容器中  
    //该注解通常用来配置非自定义类  
    @Bean  
    public DataSource dataSource(){  
        DruidDataSource druidDataSource = new DruidDataSource();  
//        druidDataSource.setDriverClassName("com.mysql.jdbc.Driver");  
//        druidDataSource.setUrl("jdbc:mysql://localhost:3306/note");  
//        druidDataSource.setUsername("root");  
//        druidDataSource.setPassword("123");  
        druidDataSource.setDriverClassName(driverClassName);  
        druidDataSource.setUrl(url);  
        druidDataSource.setUsername(username);  
        druidDataSource.setPassword(password);  
        return druidDataSource;  
    }  
}

```

```java
package priv.noby.spring4.config;  
  
import org.mybatis.spring.SqlSessionFactoryBean;  
import org.mybatis.spring.mapper.MapperScannerConfigurer;  
import org.springframework.context.annotation.Bean;  
import org.springframework.context.annotation.Configuration;  
  
import javax.sql.DataSource;  
  
/**  
 * SpringConfiguration类使用了 @Import(MapperScannerConfiguration.class) 注解引入该配置类  
 */  
//表示这是一个 Spring 的配置类  
@Configuration  
public class MybatisConfiguration {  
    //该注解表示Spring会将当前方法的返回值以指定名称存储到Spring容器中  
    //该注解通常用来配置非自定义类  
    @Bean  
    public SqlSessionFactoryBean sqlSessionFactoryBean(DataSource dataSource) {  
        /*  
        这里的dataSource参数为Spring自动注入(来自SpringConfiguration配置类)  
         */        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();  
        sqlSessionFactoryBean.setDataSource(dataSource);  
        sqlSessionFactoryBean.setTypeAliasesPackage("priv.noby.spring4.entity");  
        return sqlSessionFactoryBean;  
    }  
  
    @Bean  
    public MapperScannerConfigurer mapperScannerConfigurer() {  
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();  
        mapperScannerConfigurer.setBasePackage("priv.noby.spring4.dao");  
        return mapperScannerConfigurer;  
    }  
  
  
}

```

### entity

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

### dao

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

### service

```java
package priv.noby.spring3.service;

import priv.noby.spring3.entity.Student;

public interface StudentService {
    Student selectById(int id);
    boolean insert(Student student);
}
```

```java
package priv.noby.spring4.service.impl;

import org.springframework.stereotype.Service;
import priv.noby.spring4.dao.StudentDao;
import priv.noby.spring4.entity.Student;
import priv.noby.spring4.service.StudentService;

import javax.annotation.Resource;

@Service
public class StudentServiceImpl implements StudentService {
    /*
    使用 @Autowired 注解导入 Mapper 对象报错的原因，是因为 @Autowired 默认情况下，需要注入一个非 NULL 的对象，
    而被 @Mapper 修饰的类为 MyBatis 的注解，IDEA 并不能很好的识别其为非 NULL 对象，因此就会报错。
    当然，它的解决方案也有很多，推荐使用 @Resource 替代 @Autowired 注解的方式来解决此问题。
     *///    @Autowired
    @Resource
    StudentDao studentDao;

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

### test

- 使用注解在测试时注入 ac 和配置文件

```java
package priv.noby.spring4;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import priv.noby.spring4.config.MybatisConfiguration;
import priv.noby.spring4.config.SpringConfiguration;
import priv.noby.spring4.entity.Student;
import priv.noby.spring4.service.StudentService;

/**
 * Spring整合Junit测试
 *
 * @author Noby
 * @since 2022/10/10
 */@RunWith(SpringJUnit4ClassRunner.class)
//加载配置文件的注解
//@ContextConfiguration("classpath:applicationContext.xml")
//加载配置类的注解
@ContextConfiguration(classes = {SpringConfiguration.class, MybatisConfiguration.class})
public class SpringJunitTest {
    @Autowired
    private StudentService studentService;

    @Test
    public void test() {
        Student student = studentService.selectById(1);
        System.out.println("student = " + student);

    }
}
```

```java
package priv.noby.spring4.dao;  
  
import org.junit.Before;  
import org.junit.Test;  
import org.springframework.context.ApplicationContext;  
import org.springframework.context.annotation.AnnotationConfigApplicationContext;  
import priv.noby.spring4.config.SpringConfiguration;  
import priv.noby.spring4.entity.Student;  
  
public class StudentDaoTest {  
  
    private ApplicationContext applicationContext;  
    private StudentDao studentDao;  
  
    @Before  
    public void setUp() throws Exception {  
        applicationContext = new AnnotationConfigApplicationContext(SpringConfiguration.class);  
        studentDao = (StudentDao) applicationContext.getBean("studentDao");  
    }  
  
    @Test  
    public void testSelectById() {  
        Student student = studentDao.selectById(1);  
        System.out.println(student);  
    }  
}
```

```java
package priv.noby.spring4.service;  
  
import org.junit.Before;  
import org.junit.Test;  
import org.springframework.context.ApplicationContext;  
import org.springframework.context.annotation.AnnotationConfigApplicationContext;  
import priv.noby.spring4.config.SpringConfiguration;  
import priv.noby.spring4.entity.Student;  
import priv.noby.spring4.service.impl.StudentServiceImpl;  
  
public class StudentServiceTest {  
  
    private ApplicationContext applicationContext;  
    private StudentService studentService;  
  
    @Before  
    public void setUp() throws Exception {  
        //使用ClassPathXmlConfigApplicationContext类加载配置文件，AnnotationConfigApplicationContext类加载配置类  
        applicationContext = new AnnotationConfigApplicationContext(SpringConfiguration.class);  
        studentService = (StudentServiceImpl) applicationContext.getBean("studentServiceImpl");  
    }  
  
    @Test  
    public void testSelectById() {  
        Student student = studentService.selectById(1);  
        System.out.println(student);  
    }  
  
    @Test  
    public void testInsert() {  
    }
}
```
