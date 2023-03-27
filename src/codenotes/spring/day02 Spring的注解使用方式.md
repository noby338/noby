---
title: day02 Spring的注解使用方式
icon: write
category:
  - Spring
tag:
  - Spring
  - Spring注解
sticky: false
star: false
article: true
timeline: true
---

### 知识点

- 使用注解配置 Spring
  - 使用注解之前配置文件必须配置组件扫描
  - 注解
    - Spring 实例化
      - @Component 使用在类上用于实例化 Bean
      - @Controller 使用在 web 层类上用于实例化 Bean
      - @Service 使用在 service 层类上用于实例化 Bean
      - @Repository 使用在 dao 层类上用于实例化 Bean
    - @Scope bean 的作用范围
    - @Value 基本数据类型赋值
    - 引用数据类型注入
      - @Autowired 引用数据类型属性类型自动注入 @Qualifier 属性名自动注入
      - @Qualifier("") 配合 @Autowired 通过属性名赋值
      - @Resource("") (新注解)引用数据类型自动注入（属性类型、属性名）
    - @PostConstruct 使用在方法上标注该方法是 Bean 的初始化方法
    - @PreDestroy 使用在方法上标注该方法是 Bean 的销毁方法
- 复杂属性赋值必须通过配置文件或配置类

### @Autowired 和@Resource 注解的区别

- 如果用@Autowired 属性注入的方式，只是按照 type 方式进行匹配注入，不会去匹配 name，如果涉及到 type 无法辨别注入对象时，就需要配合@Qualifier 或@Primary 注解一起用。而@Resource 注解默认是通过 byName 来匹配对象的，也可以指定 type 通过 byType 来匹配对象。 这是@Resource 注解比@Autowired 注解的一个优点吧。

### 代码示例

#### pom

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>priv.noby</groupId>
    <artifactId>spring2</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <!--该包可以同时依赖4个 spring 的核心包-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.2.15.RELEASE</version>
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
    </dependencies>

</project>
```

#### Resource

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd        ">

    <!--
    配置组件扫描器：包扫描：指定扫描哪些包中的注解
    priv.noby.note.service 扫描当前包及其子包
    priv.noby.note.service.*扫描当前包的子包
    -->
    <context:component-scan base-package="priv.noby.spring2.entity"/>

    <!--引入properties配置文件到spring容器中-->
    <context:property-placeholder location="classpath:db.properties"/>
</beans>
```

```properties
jdbc.driverClassName=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/stage3?useUnicode=true&characterEncoding=utf8
jdbc.username=root
jdbc.password=123
```

#### entity

```java
package priv.noby.spring2.entity;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

//配置该类可通过 Spring 框架实例化  以下注解等同：@Repository（给Dao类使用） @Service @controller@Component
//配置作用范围（单例模式、原型模式）(默认的注入的为单例，@Scope("singleton")可省略不写)
@Scope("singleton")
public class Student {
    //给基本数据类型赋值，可使用spEL(spring表达式)直接读取Spring容器中的参数(该参数来自配置文件读取的properties文件)
    @Value("${jdbc.driverClassName}")
    private String name;
    @Value("20")
    private int age;
    @Autowired //通过属性类型自动注入注解（给引用数据类型赋值）
    @Qualifier("school")//加上该注解表示通过属性名(id)自动注入

//    @Resource//jdk1.6之后出的注解，等同于 @Autowired 注解
//    @Resource(name = "school")//等同于 @Autowired 加 @Qualifier("school")注解
    private School school;
    @PostConstruct //初始化方法注解
    public void init() {
        System.out.println("Student.init");
    }
    @PreDestroy //销毁方法注解
    public void destroy() {
        System.out.println("Student.destroy");
    }

    public Student() {
    }
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void setAge(int age) {
        this.age = age;
        System.out.println("调用了 setAge() 方法");
    }

    public int getAge() {
        return age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public School getSchool() {
        return school;
    }

    public void setSchool(School school) {
        this.school = school;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", school=" + school +
                '}';
    }
}
```

```java
package priv.noby.spring2.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@NoArgsConstructor
@Data
//参数中的"school" 相当于配置文件中的id <bean id="school" class=""/>
//@Component 不写参数默认为类名的小驼峰 即 "school"@Component("school")
public class School {
    @Value("100")
    private int scId;
    @Value("北京大学")
    private String scName;
}
```

#### test

```java
package priv.noby.spring2.entity;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public class StudentTest {
    @Test
    public void student() {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        //该方法判断是否存在某个对象
        Student student = (Student) applicationContext.getBean("student");
        Student student2 = (Student) applicationContext.getBean("student");
        System.out.println("这是单例模式吗？" + (student == student2));
        System.out.println("student = " + student);
        //虚拟机关闭之前自动执行 close() 方法(回调函数)(用于查看destroy方法)
        ((ClassPathXmlApplicationContext) applicationContext).registerShutdownHook();

    }

}
```
