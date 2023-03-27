---
title: day10 SpringMVC的请求方式、文件上传
icon: write
category:
  - Spring
  - SpringMVC
tag:
  - Spring
  - SpringMVC
  - SpringMVC请求
  - SpringMVC文件上传
sticky: false
star: false
article: true
timeline: true
---

- SpringMVC 数据的请求参数的类型
  - 基本类型参数
    - 参数列表中的参数将会直接由请求参数获取并赋值
    - @RequestParam()注解修改请求参数和 controller 方法参数列表的参数名映射关系
    - @PathVariable()注解配置 Restful 风格请求参数名和 controller 方法参数列表的参数名映射关系
    - 通过@RequestHeader()获取指定的请求头
    - 通过@CookieValue()获取指定的 Cookie
  - entity 类型参数
    - 参数列表中对象的属性将会直接由请求参数获取并封装
    - 解析请求体中的 json 字符串使用@RequestBody 注解，且将其封装到形参的对象中
    - 自定义类型转换器的使用
  - 数组类型参数
    - 参数列表中的参数将会直接由请求中的多个同名请求参数获取并赋值到数组
  - 集合类型参数
    - urlencoded 参数集合类型的封装有别于其他类型，他一般借助其他类进行封装
    - 解析请求体中的 json 字符串使用@RequestBody 注解，且将其封装到形参的对象中
- 文件的上传

## Restful 请求风格

- Restful 风格的请求是使用“url+请求方式”表示一次请求目的的，HTTP 协议里面四个表示操作方式的动词如下：
  - GET：用于获取资源
  - POST：用于新建资源
  - PUT：用于更新资源
  - DELETE：用于删除资源
- 例如：
  - /user/1 GET ： 得到 id = 1 的 user
  - /user/1 DELETE： 删除 id = 1 的 user
  - /user/1 PUT： 更新 id = 1 的 user
  - /user POST： 新增 use

## 代码

### pom

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>priv.noby</groupId>
    <artifactId>springMVC5</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
            <scope>provided</scope>
        </dependency>
        <!--jsp-->
        <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>jsp-api</artifactId>
            <version>2.2</version>
            <scope>provided</scope>
        </dependency>
        <!--JSTL和EL表达式-->
        <dependency>
            <groupId>jstl</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>
        <!--jsp引入第三方标签库的指令-->
        <dependency>
            <groupId>taglibs</groupId>
            <artifactId>standard</artifactId>
            <version>1.1.2</version>
        </dependency>
        <!--使用 SpringMVC（该坐标包括了4个spring的核心包和AOP包和spring整合servlet包）-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.2.15.RELEASE</version>
        </dependency>
        <!--json和java对象之间的转换工具-->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
            <version>2.11.4</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.11.4</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-annotations</artifactId>
            <version>2.11.4</version>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.22</version>
        </dependency>

        <!--文件上传-->
        <dependency>
            <groupId>commons-fileupload</groupId>
            <artifactId>commons-fileupload</artifactId>
            <version>1.2.2</version>
        </dependency>
        <!--文件上传需使用-->
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>2.4</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!--Tomcat插件-->
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <port>8080</port>
                    <!--设置服务器的虚拟目录-->
                    <path>/springMVC5</path>
                    <!--设置 get 请求的编码方式-->
                    <uriEncoding>utf-8</uriEncoding>
                </configuration>
            </plugin>
        </plugins>
    </build>


</project>
```

### web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <!--post键值对请求的乱码设置(json默认不存在乱码)-->
    <filter>
        <filter-name>CharacterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>CharacterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <!--region 配置springMVC的中央调度器-->
    <servlet>
        <servlet-name>DispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!--这里的init-param参考本项目spring8模块-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-mvc.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>DispatcherServlet</servlet-name>
        <!--传统的请求方式-->
<!--        <url-pattern>*.do</url-pattern>-->
        <!--不能使用/*，该方法jsp也会交给DispatcherServlet处理-->
<!--        <url-pattern>/*</url-pattern>-->
        <!--/ restful风格，拦截静态资源(html.css.js.jpg)-->
        <url-pattern>/</url-pattern>
    </servlet-mapping>
    <!--endregion-->


</web-app>
```

### entity

```java
package priv.noby.springmvc4.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Noby
 * @since 2022/10/12
 */@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private Integer id;
    private String name;
    private Integer age;
}

```

```java
package priv.noby.springmvc5.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 该对象用于请求时封装集合(集合的封装一般借助其他类)
 * * @author Noby
 * @since 2022/10/12
 */@Data
@AllArgsConstructor
@NoArgsConstructor
public class VO {
    private List<Student> studentList;
}
```

### spring-mvc.xml

```xml
<!--该配置文件为SpringMVC的配置文件，相对与spring的配置文件(applicationContext.xml)中的内容应该分割开来书写-->
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd        http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!--Controller的组件扫描(用于使用@controller和RequestMapping注解)-->
    <context:component-scan base-package="priv.noby.springmvc5.controller"/>

    <!--配置内部资源试图解析器-->
    <!--    <bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">-->    <!--        &lt;!&ndash;controller返回时的路径书写可省略该前缀，默认为redirect:&ndash;&gt;-->
    <!--        <property name="prefix" value="/jsp/"/>-->    <!--        &lt;!&ndash;controller返回时的路径书写可省略该后缀&ndash;&gt;-->
    <!--        <property name="suffix" value=".jsp"/>-->    <!--    </bean>-->

    <!--配置处理器映射器，可配合@ResponseBody注解直接响应对象、集合json，而非自己手动转换为json-->
    <!--        <bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">-->    <!--            <property name="messageConverters">-->    <!--                <list>-->    <!--                    &lt;!&ndash;直接响应对象&ndash;&gt;-->
    <!--                    <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter"/>-->    <!--                    &lt;!&ndash;设置Response响应字符编码&ndash;&gt;-->
    <!--                    <bean class="org.springframework.http.converter.StringHttpMessageConverter">-->    <!--                        <property name="supportedMediaTypes">-->    <!--                            <list>-->    <!--&lt;!&ndash;                                <value>text/html;charset=UTF-8</value>&ndash;&gt;-->    <!--                                <value>application/json;charset=UTF-8</value>-->    <!--                            </list>-->    <!--                        </property>-->    <!--                    </bean>-->    <!--                </list>-->    <!--            </property>-->    <!--        </bean>-->
    <!--配置处理器映射器的第二种方式-->
    <!--mvc的注解驱动扫描-->
    <!--使用<mvc:annotation-driven>自动加载 RequestMappingHandlerMapping（处理映射器）和
    RequestMappingHandlerAdapter（处理适配器），可替代注解处理器和适配器的配置。
    使用<mvc:annotation-driven>同时默认底层就会集成jackson进行对象或集合的json格式字符串的转换。
    属性conversion-service="converterService"表示在注解扫描时引用指定的自定义的转换器(不引用可省略)-->
    <mvc:annotation-driven conversion-service="converterService"/>

    <!--开启静态资源访问权限的第一种方式：中央调度器开放该路径资源的访问权限-->
    <!--SpringMVC默认是不对静态资源开放访问权限-->
    <!--mapping表示访问该路径时，location表示对外开放的目录-->
    <!--    <mvc:resources mapping="/css/**" location="/css/"/>-->    <!--    <mvc:resources mapping="/img/**" location="/img/"/>-->
    <!--使得静态资源可访问的第二种方式-->
    <!--无法访问的静态资源交给原始web容器访问(tomcat)-->
    <mvc:default-servlet-handler/>

    <!--声明自定义的类型转换器-->
    <!--用于将urlencoded类型的请求参数转换为对象类型-->
    <bean id="converterService" class="org.springframework.context.support.ConversionServiceFactoryBean">
        <property name="converters">
            <list>
                <!--DateConverter为自定义的Date类型转换器-->
                <bean class="priv.noby.springmvc5.converter.DateConverter"/>
            </list>
        </property>
    </bean>

    <!--配置文件上传解析器用于文件上传-->
    <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        <!--上传文件总大小-->
        <property name="maxUploadSize" value="5242800"/>
        <!--上传单个文件的大小-->
        <property name="maxUploadSizePerFile" value="5242800"/>
        <!--上传文件的编码类型-->
        <property name="defaultEncoding" value="UTF-8"/>
    </bean>

</beans>
```

### converter

```java
package priv.noby.springmvc5.converter;

import org.springframework.core.convert.converter.Converter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 该类用于自定义类型转换
 *
 * controller中的方法参数对于请求参数的封装，String=>int等可以自动完成，
 * 但部分数据类型不可自动完成或达不到自定义预期，可使用自定义数据类型的转换
 * 该类的作用使用将Date数据类型由默认的"yyyy/MM/dd"=>Date自定义为"yyyy-MM-dd"=>Date
 * @author Noby
 * @since 2022/10/13
 */public class DateConverter implements Converter<String, Date> {
    @Override
    public Date convert(String s) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return format.parse(s);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

### controller

```java
package priv.noby.springmvc5.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import priv.noby.springmvc5.entity.Student;
import priv.noby.springmvc5.entity.VO;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * SpringMVC数据的请求的参数的类型
 * <p>
 * 基本类型参数
 * entity类型参数
 * 数组类型参数
 * 集合类型参数
 *
 * @author Noby
 * @since 2022/10/11
 */@Controller
//可设置响应的编码格式 produces = "application/json;charset=utf-8"@RequestMapping(value = "/student", produces = "application/json;charset=utf-8")
//@RequestMapping(value="/student")
//简易的请求方式约束，同@RequestMapping()的method属性
//    @GetMapping()
//    @PostMapping()
//    @PutMapping()
//    @DeleteMapping()
public class StudentController {

    /**
     * 基本类型参数
     *
     * @return
     */
    @RequestMapping("/select")
    @ResponseBody
    public String select(String name, int age) {
        /*
        参数列表中的name和age将会直接由请求参数获取并封装
        因为参数列表中的任何参数都应该为String，因此int age实质上是由String转换过来的(通过SpringMVC自动的类型转换器)
         */        System.out.println("StudentController.select");
        String format = String.format("获取到数据 name=%s,age=%d", name, age);
        System.out.println(format);
        return format;
    }

    /**
     * entity类型参数的封装
     *
     * @return
     */
    @RequestMapping("/select2")
    @ResponseBody
    public String select2(Student student) {
        /*
        参数列表中的Student将会直接由请求参数获取并封装
        只要有entity中存在与请求参数相同的属性即可封装
         */        System.out.println("StudentController.select2");
        String format = String.format("获取到数据 %s", student);
        System.out.println(format);
        return format;
    }

    /**
     * 数组类型的封装
     *
     * @return
     */
    @RequestMapping("/select3")
    @ResponseBody
    public String select3(int[] nums) {
        /*
        参数列表中的int[]将会直接由请求参数获取并封装
        只要有请求参数中的name和参数列表中的形参相同即可封装
         */        System.out.println("StudentController.select3");
        String format = String.format("获取到数据 %s", Arrays.toString(nums));
        System.out.println(format);
        return format;
    }


    /**
     * 集合类型借助VO类的的封装
     *
     * @return
     */
    @RequestMapping("/select4")
    @ResponseBody
    public String select4(VO vo) {
        /*
        集合类型的封装有别于其他类型，他一般借助其他类进行封装
         */        System.out.println("StudentController.select4");
        String format = String.format("获取到数据 %s", vo);
        System.out.println(format);
        return format;
    }

    /**
     * 集合类型借助@RequestBody注解的的封装
     * <p>
     * 接收的请求为json的post请求
     *
     * @return
     */
    @RequestMapping("/select5")
    @ResponseBody
    public String select5(@RequestBody List<Student> studentList) {
        /*
        @RequestBody参数用于解析请求体中的json字符串，且将其封装到形参的对象中
         */        System.out.println("StudentController.select5");
        String format = String.format("获取到数据 %s", studentList);
        System.out.println(format);
        return format;
    }

    /**
     * 基本类型参数 @RequestParam 注解的使用
     * <p>
     * 当请求的参数名称与Controller的业务方法参数名称不一致时，就需要通过@RequestParam注解显示的绑定
     *
     * @return
     */
    @RequestMapping("/select6")
    @ResponseBody
    public String select6(@RequestParam("username") String name, @RequestParam(value = "userAge", required = false, defaultValue = "18") int age) {
        /*
        @RequestParam("username")表示请求参数username和方法形参name映射
        属性required = false表示指定的请求参数是否必须包括，默认是true，提交时如果没有此参数则报错
        属性defaultValue：当没有指定请求参数时，则使用指定的默认值赋值
         */        System.out.println("StudentController.select6");
        String format = String.format("获取到数据 name=%s,age=%d", name, age);
        System.out.println(format);
        return format;
    }

    /**
     * 基本类型参数 @PathVariable 注解的使用
     * <p>
     * 使用Restful风格请求参数(Restful风格的请求是使用“url+请求方式”表示一次请求目的的)
     *     * @return
     */
    @RequestMapping(value = "/select7/{userId}", method = RequestMethod.GET)
    @ResponseBody
    public String select7(@PathVariable("userId") int id) {
        /*
        @PathVariable()注解配置Restful风格请求参数名和controller方法参数列表的参数名映射关系
         */        System.out.println("StudentController.select7");
        String format = String.format("获取到数据 id=%d", id);
        System.out.println(format);
        return format;
    }


    /**
     * 自定义类型转换器的使用
     * <p>
     * 之前的接收参数中的String转换为int实际上是通过SpringMVC自动的类型转换器转换过来的(SpringMVC还有其他的参数可以自动转换)
     * 对于复杂的数据类型(例如日期)需要自定义转换方式
     * 步骤：
     * ① 定义转换器类实现Converter接口
     * ② 在配置文件中声明转换器
     * ③ 在<annotation-driven>中引用转换器
     *
     * @return
     */
    @RequestMapping("/select8")
    @ResponseBody
    //Date的类型转换器可直接使用该注解(测试前注释掉在配置文件中声明的转换器)
//    public String select8(@DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
    public String select8(Date date) {
        /*
        Date默认可封装"2022/10/14"字符串为Date
        自定义为"2022-10-14"字符串封装为Date
         */        System.out.println("StudentController.select8");
        String format = String.format("获取到数据 date=%s", date);
        System.out.println(format);
        return format;
    }

    /**
     * 通过@RequestHeader()获取指定的请求头
     */
    @RequestMapping("/select9")
    @ResponseBody
    public String select9(@RequestHeader(value = "User-Agent", required = false) String userAgent) {
        System.out.println("StudentController.select9");
        String format = String.format("获取到数据 userAgent=%s", userAgent);
        System.out.println(format);
        return format;
    }

    /**
     * 通过@CookieValue()获取指定的Cookie
     * <p>
     * 可以通过@RequestHeader("Cookie")获取所有的Cookie
     */    @RequestMapping("/select10")
    @ResponseBody
    public String select10(@CookieValue(value = "JSESSIONID", required = false) String jsessionId) {
        System.out.println("StudentController.select10");
        String format = String.format("获取到数据 jsessionId=%s", jsessionId);
        System.out.println(format);
        return format;
    }

    /**
     * 文件的上传
     * <p>
     * 步骤：
     * ① 导入fileupload和io坐标
     * ② Spring-mvc中配置文件上传解析器
     * ③ 编写文件上传代码
     */
    @RequestMapping("/select11")
    @ResponseBody
    public String select11(String fileName, MultipartFile uploadFile) {
        /*
        这里的fileName和uploadFile必须与表单的name属性一致
         */        System.out.println("StudentController.select11");
        String format = String.format("获取到数据 fileName=%s", fileName);
        System.out.println(format);
        //文件的原始名(fileName为表单中的名字，通常为用户给上传的文件重命名)
        String originalFilename = uploadFile.getOriginalFilename();
        //保存文件到服务器
        try {
            uploadFile.transferTo(new File("D:\\IdeaProjects\\stage3\\springMVC5\\src\\main\\webapp\\upload\\" + fileName + ".jpg"));
//            uploadFile.transferTo(new File("D:\\IdeaProjects\\stage3\\springMVC5\\src\\main\\webapp\\upload\\" + originalFilename));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return format;
    }
}
```

### http

```
### springMVC 请求 基本类型参数
GET http://localhost:8080/springMVC5/student/select?name=诺比&age=20

### springMVC 请求 entity数据类型的封装
GET http://localhost:8080/springMVC5/student/select2?name=诺比&age=20

### springMVC 请求 数组数据类型封装
GET http://localhost:8080/springMVC5/student/select3?nums=10&nums=20&nums=30

### springMVC 请求 集合数据类型借助VO类的封装
GET http://localhost:8080/springMVC5/student/select4?studentList[0].name=诺比&studentList[0].age=21&studentList[1].name=凯斯&studentList[1].age=22

### springMVC 请求 集合数据类型借助VO类的封装，post请求键值对参数乱码测试
POST http://localhost:8080/springMVC5/student/select4
Content-Type: application/x-www-form-urlencoded

studentList[0].name=诺比&studentList[0].age=21&studentList[1].name=凯斯&studentList[1].age=22

### springMVC 请求 集合数据类型使用@RequestBody
POST http://localhost:8080/springMVC5/student/select5
Content-Type: application/json

[
  {    "name": "诺比",
    "age": 21
  },
  {
    "name": "凯斯",
    "age": 22
  }
]

### springMVC 请求 基本类型参数，使用@RequestParam完成参数映射
GET http://localhost:8080/springMVC5/student/select6?username=诺比&userAge=30

### springMVC 请求 基本类型参数，通过@PathVariable注解使用Restful风格请求
GET http://localhost:8080/springMVC5/student/select7/1

### springMVC 请求 自定义类型转换器(自定义类、配置文件声明、配置文件引用三个步骤)
GET http://localhost:8080/springMVC5/student/select8?date=2022-10-14

### springMVC 请求 通过@RequestHeader获取指定的请求头
GET http://localhost:8080/springMVC5/student/select9

### springMVC 请求 通过@CookieValue()获取指定的Cookie
GET http://localhost:8080/springMVC5/student/select10

### springMVC 请求 上传文件(该请求和本项目upload.jsp中的请求一样)
POST http://localhost:8080/springMVC5/student/select11
Content-Type: multipart/form-data; boundary=WebAppBoundary

#一个WebAppBoundary包含内的即代表一个form中的input标签
--WebAppBoundary
#这里的name中的值必须和controller中的方法参数名一致才能传入
Content-Disposition: form-data; name="fileName"
Content-Type: text/plain

#下一行的字符串即为本input的key fileName的value 一个表单输入的name
一个表单输入的name
--WebAppBoundary
Content-Disposition: form-data; name="uploadFile"; filename="984271.jpg"

< D:/media/image/精选/984271.jpg
--WebAppBoundary--
```

```
### 中央调度器配置路径，静态资源是否可访问测试(css是否生效)
GET http://localhost:8080/springMVC5/static.jsp
```

### jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>student</title>
</head>
<body>

来自StudentController的转发成功 ${requestScope.info}
</body>
</html>
```

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link href="${pageContext.request.contextPath}/css/static.css" rel="stylesheet">
</head>
<body>
<div class="css_test">
    测试css是否生效
</div>
<img src="${pageContext.request.contextPath}/img/photo.jpg" width="900" height="700">
</body>
</html>
```

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>upload</title>
</head>
<body>
<%--注意表单中的enctype="multipart/form-data" method="post"--%>
<form action="${pageContext.request.contextPath}/student/select11" enctype="multipart/form-data" method="post">
    <label>
        name:
        <input type="text" name="fileName">
    </label><br>
    file:<input type="file" name="uploadFile"><br>
    <input type="submit" value="submit">
</form>
</body>
</html>
```
