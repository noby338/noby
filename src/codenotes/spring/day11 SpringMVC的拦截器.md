---
title: day11 SpringMVC的拦截器
icon: write
category:
  - Spring
  - SpringMVC
tag:
  - Spring
  - SpringMVC
  - 拦截器
sticky: false
star: false
article: true
timeline: true
---

- Spring MVC 拦截器是一种拦截并处理 HTTP 请求的组件，它可以在请求被处理前、处理过程中和处理完成后对请求进行拦截和处理。Spring MVC 拦截器通常用于实现一些通用的功能，例如请求认证、授权、日志记录、性能监控、缓存处理等，这些功能可以在拦截器中统一实现，使得代码更加简洁和可维护。
- Spring MVC 拦截器的实现是通过实现 HandlerInterceptor 接口来完成的，该接口定义了三个方法，分别用于在请求被处理前、处理过程中和处理完成后进行拦截和处理：
  - preHandle：在请求被处理前进行拦截和处理，返回值表示是否继续处理该请求。
  - postHandle：在请求处理完成后进行拦截和处理，可以对返回的结果进行修改和处理。
  - afterCompletion：在请求处理完成后进行拦截和处理，不同于 postHandle，该方法不允许修改返回的结果，只能进行一些清理工作。

* SpringMVC 的使用
  - 创建拦截器类实现 HandlerInterceptor 接口
  - 配置类配置拦截器

## 过滤器和拦截器的区别

- 过滤器(Filter)和拦截器(Interceptor)都是用于拦截和处理请求的组件，但它们在实现和使用上有一些区别：
  - 实现方式不同：过滤器是基于 Servlet 规范实现的，它可以对所有的请求进行拦截和处理，包括静态资源和动态资源；而拦截器是基于 Spring MVC 框架实现的，它只能对 Spring MVC 框架处理的请求进行拦截和处理。
  - 作用范围不同：过滤器作用于请求和响应的过程中，可以对请求参数、请求头、请求内容和响应结果进行处理；而拦截器只作用于请求的处理过程中，可以对控制器的方法进行拦截和处理。
  - 运行顺序不同：多个过滤器的拦截顺序为类名的自然排序，可以通过配置顺序决定。多个拦截器的默认拦截顺序为 Spring-mvc.xml 的书写顺序，而拦截器的执行顺序可以通过实现 Ordered 接口来进行控制。
  - 功能实现不同：过滤器可以对请求和响应进行修改和处理，比如字符编码、参数验证、安全控制等；而拦截器可以实现更加复杂的功能，比如请求认证、授权、日志记录、性能监控等。
  - 拦截范围不同：过滤器在 url-pattern 中配置了/\*之后，可以对所有要访问的资源拦截；拦截器在中配置了/\*\*之后，也可以多所有资源进行拦截，可以通过标签排除不需要拦截的资源

## 代码

### pom

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>priv.noby</groupId>
    <artifactId>springMVC6</artifactId>
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
                    <path>/springMVC6</path>
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
    <context:component-scan base-package="priv.noby.springmvc6.controller"/>

    <!--mvc的注解驱动-->
    <!--使用<mvc:annotation-driven>自动加载 RequestMappingHandlerMapping（处理映射器）和
    RequestMappingHandlerAdapter（处理适配器），可替代注解处理器和适配器的配置。
    同时使用<mvc:annotation-driven>默认底层就会集成jackson进行对象或集合的json格式字符串的转换。-->
    <mvc:annotation-driven/>
    <!--无法访问的静态资源交给原始web容器访问(tomcat)-->
    <mvc:default-servlet-handler/>

    <!--配置拦截器-->
    <mvc:interceptors>
<!--        <mvc:interceptor>-->
<!--            &lt;!&ndash;mapping表示拦截的资源，path="/**"表示拦截所有资源&ndash;&gt;-->
<!--            <mvc:mapping path="/**"/>-->
<!--            <bean class="priv.noby.springmvc6.interceptor.MyHandlerInterceptor"/>-->
<!--        </mvc:interceptor>-->

        <!--登录验证拦截器-->
        <mvc:interceptor>
            <mvc:mapping path="/**"/>
            <!--不经过拦截器直接放行的资源-->
            <!--不需要配置jsp的拦截，拦截器默认jsp放行-->
            <mvc:exclude-mapping path="/user/login"/>
            <bean class="priv.noby.springmvc6.interceptor.PrivilegeInterceptor"/>
        </mvc:interceptor>    </mvc:interceptors>
</beans>
```

### intercepter

```java
package priv.noby.springmvc6.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 拦截器的使用
 *
 * HandlerInterceptor接口中的三个方法都是用default修饰，可不实现
 *
 * @author Noby
 * @since 2022/10/14
 */public class MyHandlerInterceptor implements HandlerInterceptor {

    /**
     * 方法将在请求处理之前进行调用，该方法的返回值是布尔值Boolean类型的，
     * 当它返回为false 时，表示请求结束，后续的Interceptor 和Controller 都不会
     * 再执行；当返回值为true 时就会继续调用下一个Interceptor 的preHandle 方
     * 法
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("MyHandlerInterceptor.preHandle");
        //true表示放行
        return true;
    }

    /**
     * 该方法是在当前请求进行处理之后被视图对象返回之前调用，前提是preHandle 方法的返回值为
     * true 时才能被调用，且它会在DispatcherServlet 进行视图返回渲染之前被调
     * 用，所以我们可以在这个方法中对Controller 处理之后的ModelAndView 对象
     * 进行操作
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("MyHandlerInterceptor.postHandle");
    }

    /**
     * 该方法将在整个请求结束之后，也就是在DispatcherServlet 渲染了对应的视图
     * 之后执行，前提是preHandle 方法的返回值为true 时才能被调用
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("MyHandlerInterceptor.afterCompletion");
    }
}
```

```java
package priv.noby.springmvc6.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 权限拦截器
 *
 * 已登录放行
 * @author Noby
 * @since 2022/10/14
 */public class PrivilegeInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("PrivilegeInterceptor.preHandle");
        if (request.getSession().getAttribute("user") != null) {
            return true;
        } else {
            response.sendRedirect(request.getContextPath() + "/login.jsp");
            return false;        }
    }
}
```

### controller

```java
package priv.noby.springmvc6.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author Noby
 * @since 2022/10/14
 */@Controller
@RequestMapping("/student")
public class StudentController {
    @GetMapping("/selectById/{id}")
    public ModelAndView selectById(@PathVariable("id") int id, ModelAndView modelAndView) {
        System.out.println("StudentController.selectById");
        modelAndView.setViewName("forward:/student.jsp");
        modelAndView.addObject("info","模拟成功返回了一条学生信息：id = " + id);
        return modelAndView;
    }
}
```

```java
package priv.noby.springmvc6.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

/**
 * @author Noby
 * @since 2022/10/14
 */@Controller
@RequestMapping("/user")
public class UserController {
    @GetMapping("/login")
    public ModelAndView login(String username, String password, ModelAndView modelAndView, HttpSession session) {
        if ("noby".equals(username) && "123".equals(password)) {
            session.setAttribute("user", "user");
            modelAndView.setViewName("forward:/student.jsp");
        } else {
            modelAndView.setViewName("forward:/login.jsp");
        }
        return modelAndView;
    }

    @GetMapping("/logout")
    public ModelAndView logout(ModelAndView modelAndView, HttpSession session) {
        session.removeAttribute("user");
        modelAndView.setViewName("forward:/login.jsp");
        return modelAndView;
    }
}
```

### http

```
### 测试MyHandlerInterceptor拦截器是否成功
GET http://localhost:8080/springMVC6/student/selectById/1
```

```
### 登录
GET http://localhost:8080/springMVC6/user/login?username=noby&password=123

### 退出登录
GET http://localhost:8080/springMVC6/user/logout
```

### jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>login</title>
</head>
<body>
<%--图片将会被拦截--%>
<img src="${pageContext.request.contextPath}/img/photo.jpg" width="900" height="700">
<form action="http://localhost:8080/springMVC6/user/login" method="get">
    用户名：<input type="text" name="username" value="noby"><br>
    密码：<input type="text" name="password" value="123"><br>
    <input type="submit" value="submit">
</form>
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
登录成功!!!
${requestScope.info}
</body>
</html>
```
