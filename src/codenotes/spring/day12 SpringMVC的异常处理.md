---
title: day12 SpringMVC的异常处理
icon: write
category:
    - Spring
    - SpringMVC
tag:
    - Spring
    - SpringMVC
    - 异常处理
sticky: false
star: false
article: true
timeline: true
---
- SpringMVC 中异常的处理方式
    - 系统的 Dao、Service、Controller 出现都通过 throws Exception 向上抛出，最后由 SpringMVC 前端控制器交 由异常处理器进行异常处理，如下图
    ![image-20221014221229532](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221014221229532.png)
    - 两种处理的方式
        - 使用 Spring MVC 提供的简单异常处理器 SimpleMappingExceptionResolver
            - 配置文件配置简单异常处理器
            - 定义异常页面
        - 实现 Spring 的异常处理接口 HandlerExceptionResolver 自定义自己的异常处理器
            - 定义实现了 HandlerExceptionResolver 接口的异常处理器
            - 将该类
            - 定义异常页面

## 代码

### pom

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>priv.noby</groupId>
    <artifactId>springMVC7</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>

    <properties>        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>    <dependencies>        <dependency>            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
            <scope>provided</scope>
        </dependency>        <!--jsp-->
        <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>jsp-api</artifactId>
            <version>2.2</version>
            <scope>provided</scope>
        </dependency>        <!--JSTL和EL表达式-->
        <dependency>
            <groupId>jstl</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>        <!--jsp引入第三方标签库的指令-->
        <dependency>
            <groupId>taglibs</groupId>
            <artifactId>standard</artifactId>
            <version>1.1.2</version>
        </dependency>        <!--使用 SpringMVC（该坐标包括了4个spring的核心包和AOP包和spring整合servlet包）-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.2.15.RELEASE</version>
        </dependency>        <!--json和java对象之间的转换工具-->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
            <version>2.11.4</version>
        </dependency>        <dependency>            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.11.4</version>
        </dependency>        <dependency>            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-annotations</artifactId>
            <version>2.11.4</version>
        </dependency>
        <dependency>            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.22</version>
        </dependency>
        <!--文件上传-->
        <dependency>
            <groupId>commons-fileupload</groupId>
            <artifactId>commons-fileupload</artifactId>
            <version>1.2.2</version>
        </dependency>        <!--文件上传需使用-->
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>2.4</version>
        </dependency>    </dependencies>
    <build>        <plugins>            <!--Tomcat插件-->
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>                    <port>8080</port>
                    <!--设置服务器的虚拟目录-->
                    <path>/springMVC7</path>
                    <!--设置 get 请求的编码方式-->
                    <uriEncoding>utf-8</uriEncoding>
                </configuration>            </plugin>        </plugins>    </build></project>
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
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd        http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!--Controller的组件扫描(用于使用@controller和RequestMapping注解)-->
    <context:component-scan base-package="priv.noby.springmvc7.controller"/>

    <!--mvc的注解驱动-->
    <!--使用<mvc:annotation-driven>自动加载 RequestMappingHandlerMapping（处理映射器）和
    RequestMappingHandlerAdapter（处理适配器），可替代注解处理器和适配器的配置。
    同时使用<mvc:annotation-driven>默认底层就会集成jackson进行对象或集合的json格式字符串的转换。-->
    <mvc:annotation-driven/>
    <!--无法访问的静态资源交给原始web容器访问(tomcat)-->
    <mvc:default-servlet-handler/>

    <!--SpringMVC处理异常的第一种方式-->
    <!--配置简单异常处理器-->
    <!--当异常抛出Controller时将会由SpringMVC处理异常(跳转的指定的异常提示信息页面)-->
<!--    <bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">-->
<!--        &lt;!&ndash;默认错误视图(当出现的异常未在exceptionMappings中时跳转到此页面)&ndash;&gt;-->
<!--        <property name="defaultErrorView" value="/default_error.jsp"/>-->
<!--        <property name="exceptionMappings">-->
<!--            <map>-->
<!--                &lt;!&ndash;出现类转换异常时跳转到/class_cast_error.jsp&ndash;&gt;-->
<!--                <entry key="java.lang.ClassCastException" value="/class_cast_error.jsp"/>-->
<!--                <entry key="MyException" value="/my_exception_error.jsp"/>-->
<!--            </map>-->
<!--        </property>-->
<!--    </bean>-->

    <!--SpringMVC处理异常的第二种方式-->
    <bean class="priv.noby.springmvc7.resolver.MyExceptionResolver"/>

</beans>
```

### exception

```java
package priv.noby.springmvc7.exception;

/**
 * @author Noby
 * @since 2022/10/14
 */public class MyException extends RuntimeException{
}
```

### resolver

```java
package priv.noby.springmvc7.resolver;


import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import priv.noby.springmvc7.exception.MyException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * SpringMVC第二种方式处理异常(第一种直接在配置文件配置)
 * * 需生效还需把本类注入Spring容器
 */
public class MyExceptionResolver implements HandlerExceptionResolver {

    /**
     * 参数Exception：异常对象
     * 返回值ModelAndView：跳转到错误视图信息
     */
    @Override
    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {
        ModelAndView modelAndView = new ModelAndView();

        if(e instanceof MyException){
            modelAndView.setViewName("/my_exception_error.jsp");
        }else if(e instanceof ClassCastException){
            modelAndView.setViewName("/class_cast_error.jsp");
        }else {
            modelAndView.setViewName("/default_error.jsp");
        }

        return modelAndView;
    }
}
```

### controller

```java
package priv.noby.springmvc7.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import priv.noby.springmvc7.exception.MyException;

/**
 * 本类抛出的异常将由SpringMVC处理
 *
 * @author Noby
 * @since 2022/10/14
 */@Controller
@RequestMapping("/student")
public class StudentController {
    /**
     * 抛出类型转换异常
     *
     * @param modelAndView
     * @return
     */
    @GetMapping("/selectById")
    public ModelAndView selectById(ModelAndView modelAndView) {
        System.out.println("StudentController.selectById");
        Object str = "noby";
        Integer num = (Integer)str;
        modelAndView.setViewName("forward:/student.jsp");
        modelAndView.addObject("info","模拟成功返回了一条学生信息");
        return modelAndView;
    }

    /**
     * 抛出除零异常
     *
     * @param modelAndView
     * @return
     */
    @GetMapping("/selectById2")
    public ModelAndView selectById2(ModelAndView modelAndView) {
        System.out.println("StudentController.selectById2");
        int i = 1/0;
        //如果异常被处理将将不会由SpringMVC处理
//        try {
//            int i = 1/0;
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
        modelAndView.setViewName("forward:/student.jsp");
        modelAndView.addObject("info","模拟成功返回了一条学生信息");
        return modelAndView;
    }

    /**
     * 抛出自定义异常
     *
     * @param modelAndView
     * @return
     */
    @GetMapping("/selectById3")
    public ModelAndView selectById3(ModelAndView modelAndView) {
        System.out.println("StudentController.selectById3");
        if (true) {
            throw new MyException();
        }
        modelAndView.setViewName("forward:/student.jsp");
        modelAndView.addObject("info","模拟成功返回了一条学生信息");
        return modelAndView;
    }
}
```

### http

```

### 测试类转换异常捕获

GET http://localhost:8080/springMVC7/student/selectById

### 测试数学异常(跳转到默认异常页面)捕获

GET http://localhost:8080/springMVC7/student/selectById2

### 测试自定义异常捕获

GET http://localhost:8080/springMVC7/student/selectById3

````

### jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>class_cast_error</title>
</head>
<body>
类转换异常
</body>
</html>
````

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>default_error</title>
</head>
<body>
默认的异常
</body>
</html>
```

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>my_exception_error</title>
</head>
<body>
自定义异常
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
成功访问没有异常!!!
${requestScope.info}
</body>
</html>
```
