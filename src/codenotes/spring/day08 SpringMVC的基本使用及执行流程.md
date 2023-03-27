---
title: day08 SpringMVC的基本使用及执行流程
icon: write
category:
  - Spring
  - SpringMVC
tag:
  - Spring
  - SpringMVC
sticky: false
star: false
article: true
timeline: true
---
## SpringMVC 的开发步骤

1. 导入 SpringMVC 相关坐标
2. 配置 SpringMVC 中央调度器 DispatcherServlet
3. 创建 Controller 类和视图页面
4. 使用注解配置 Controller 类中业务方法的映射地址
5. 配置 SpringMVC 核心文件 spring-mvc.xml
6. 客户端发起请求测试
   ![image-20221011204235920](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221011204235920.png)

## Spring MVC 的执行流程

- SpringMVC 的三大组件

  - 处理器映射器
  - 处理器适配器
  - 视图解析器

- Spring MVC 框架处理一个 HTTP 请求的完整流程如下：
  1.  客户端（例如浏览器）发送 HTTP 请求到服务器，请求被 Web 容器（例如 Tomcat）接收。
  2.  Web 容器将请求传递给 DispatcherServlet，DispatcherServlet 是 Spring MVC 的核心组件，负责处理所有 HTTP 请求和响应。(DispatcherServlet 为传统 servlet 共性部分的封装)
  3.  DispatcherServlet 使用 HandlerMapping 组件查找并确定哪个 Handler（处理程序）将处理请求。HandlerMapping 会根据请求的 URL 和其他条件来查找匹配的 Handler。
  4.  找到 Handler 之后，DispatcherServlet 会将请求委托给 HandlerAdapter 组件，HandlerAdapter 是一个适配器，负责将请求转换为 Handler 所需要的形式，并将结果转换为适当的响应。
  5.  Handler 执行业务逻辑并返回一个 ModelAndView 对象，ModelAndView 包含数据模型（Model）和用于呈现模型的视图（View）的信息。
  6.  DispatcherServlet 将 ModelAndView 对象传递给 ViewResolver 组件进行视图解析。ViewResolver 会根据视图名称（View Name）查找并确定用于呈现模型的视图。
  7.  找到视图之后，DispatcherServlet 将模型传递给视图进行呈现。视图将使用模型中的数据呈现响应内容。
  8.  DispatcherServlet 将响应返回给 Web 容器，Web 容器将响应发送回客户端（浏览器）。
      ![image-20221011203410737](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221011203410737.png)
      ![image-20221011203422922](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221011203422922.png)

## 代码

### pom

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<project xmlns="http://maven.apache.org/POM/4.0.0"  
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">  
    <modelVersion>4.0.0</modelVersion>  
  
    <groupId>priv.noby</groupId>  
    <artifactId>springMVC3</artifactId>  
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
                    <path>/springMVC3</path>  
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
### spring-mvc.xml

```xml
<!--该配置文件为SpringMVC的配置文件，相对与spring的配置文件(applicationContext.xml)中的内容应该分割开来书写-->  
<beans xmlns="http://www.springframework.org/schema/beans"  
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
       xmlns:context="http://www.springframework.org/schema/context"  
       xsi:schemaLocation="  
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">  
  
    <!--Controller的组件扫描(用于使用@controller和RequestMapping注解)-->  
    <context:component-scan base-package="priv.noby.springmvc3.controller"/>  
  
    <!--配置内部资源视图解析器-->  
    <!--配置视图解析器后可省略前后缀的书写(对完整路径无效，如"forward:/index.jsp")-->  
    <bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">  
        <!--controller返回时的路径书写可省略该前缀，默认为redirect:-->  
        <property name="prefix" value="/jsp/"/>  
        <!--controller返回时的路径书写可省略该后缀-->  
        <property name="suffix" value=".jsp"/>  
    </bean>  
</beans>
```

### controller
```java
package priv.noby.springmvc3.controller;  
  
import org.springframework.stereotype.Controller;  
import org.springframework.web.bind.annotation.*;  
  
/**  
 * SpringMVC的入门使用  
 *  
 * @author Noby  
 * @since 2022/10/11  
 */@Controller  
@RequestMapping("/student")  
public class StudentController {  
  
    /**  
     * RequestMapping注解的基本使用  
     *  
     * 可设置响应的编码格式 produces = "application/json;charset=utf-8"  
     * @return  
     */  
    @RequestMapping("/selectById")  
    public String selectById() {  
        System.out.println("StudentController.selectById");  
        //redirect:重定向 forward:转发  
        return "forward:/student.jsp";  
    }  
  
    /**  
     * RequestMapping注解的method属性：请求必须为post请求，否则为405异常  
     *  
     * @return  
     */  
    @RequestMapping(value = "/selectById2", method = RequestMethod.POST)  
    public String selectById2() {  
        System.out.println("StudentController.selectById2");  
        return "forward:/student.jsp";  
    }  
  
    /**  
     * RequestMapping注解的params属性：请求必须携带该参数，否则400异常  
     *  
     * @return  
     */  
    @RequestMapping(value = "/selectById3", params = {"username"})  
    public String selectById3() {  
        System.out.println("StudentController.selectById3");  
        return "forward:/student.jsp";  
    }  
  
    /**  
     * 视图解析器的配置测试  
     *  
     * 在spring-mvc的配置文件中配置  
     * @return  
     */  
    @RequestMapping("/otherJsp")  
    public String otherJsp() {  
        System.out.println("StudentController.otherJsp");  
        //通过视图解析器的配置后的实际地址为 /jsp/other_jsp.jsp        return "other_jsp";  
    }  
}
```
### http
```
### springMVC 的基本使用，进入到 controllerGET http://localhost:8080/springMVC3/student/selectById  
  
### springMVC 的@RequestMapping()的method参数为post，进入到 controllerPOST http://localhost:8080/springMVC3/student/selectById2  
  
### springMVC 的@RequestMapping()的params参数为username，进入到 controllerGET http://localhost:8080/springMVC3/student/selectById3?username=noby  
  
### springMVC 的试图解析器的配置测试是否成功  
GET http://localhost:8080/springMVC3/student/otherJsp
```
### jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>  
<html>  
<head>  
    <title>other_jsp</title>  
</head>  
<body>  
通过配置内部资源视图解析器省略jsp目录的路径书写访问到本jsp  
</body>  
</html>
```

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>  
<html>  
<head>  
    <title>student</title>  
</head>  
<body>  
来自StudentController的转发成功  
</body>  
</html>
```