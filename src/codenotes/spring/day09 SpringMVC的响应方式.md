---
title: day09 SpringMVC的响应方式
icon: write
category:
    - Spring
    - SpringMVC
tag:
    - Spring
    - SpringMVC
    - SpringMVC响应
sticky: false
star: false
article: true
timeline: true
---
- SpringMVC 数据的响应的方式
    - 页面跳转 (同步)
        - 直接返回字符串
            - 此种方式会将返回的字符串与视图解析器的前后缀拼接后跳转。
        - 通过 ModelAndView 对象返回
            - Model 对象和返回字符串表示视图组合
            - 方法参数列表封装 ModelAndView 对象
            - 方法体内实例化 ModelAndView 对象
            - 使用传统的 HttpServletRequest 对象
    - 回写数据 (异步)(用到@ResponseBody 注解，表示不进行视图跳转，直接进行数据响应)
        - 直接返回字符串
            - String
            - HttpServletResponse
        - 返回对象或集合
            - 自定义对象转换为 json，返回 json
            - Spring-mvc.xml 配置处理器映射器 (有普通配置和 mvc 注解驱动两种方式)，处理器映射器可直接将将要返回的对象转换为 json

## 代码

### pom

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>priv.noby</groupId>
    <artifactId>springMVC4</artifactId>
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
                    <path>/springMVC4</path>
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

### spring-mvc.xml

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

### controller

```java
package priv.noby.springmvc4.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import priv.noby.springmvc4.entity.Student;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * SpringMVC数据的响应方式
 *
 * 1） 页面跳转
 *  直接返回字符串
 *  通过ModelAndView对象返回
 * 2） 回写数据 (当只回写数据是类上可以使用@RestController代替@Controller注解)
 *  直接返回字符串
 *  返回对象或集合
 * @author Noby
 * @since 2022/10/11
 *//*@RestController注解等价于@ResponseBody ＋ @Controller。
@RestController和@Controller的共同点是都用来表示Spring某个类是否可以接收HTTP请求，
二者区别： @RestController无法返回指定页面，而@Controller可以；
前者可以直接返回数据，后者需要@ResponseBody辅助。
 */@Controller
//@RequestMapping("/student")
//可设置响应的编码格式 produces = "application/json;charset=utf-8"@RequestMapping(value="/student",produces = "application/json;charset=utf-8")
public class StudentController {

    /**
     * 页面跳转，直接返回字符串
     *
     * 此种方式会将返回的字符串与视图解析器的前后缀拼接后跳转。
     * @return
     */
    @RequestMapping("/selectById")
    public String selectById() {
        System.out.println("StudentController.selectById");
        //redirect:重定向 forward:转发 默认书写路径为转发
        return "forward:/student.jsp";
//        return "/student.jsp";
//        return "redirect:/student.jsp";
    }

    /**
     * 页面跳转，通过ModelAndView对象返回，ModelAndView对象为方法内部实例化
     *
     * model用于封装数据
     * view用于展示数据
     * @return
     */
    @RequestMapping("/selectById2")
    public ModelAndView selectById2() {
        System.out.println("StudentController.selectById2");
        ModelAndView modelAndView = new ModelAndView();
        //设置视图
        modelAndView.setViewName("forward:/student.jsp");
        //设置数据
        modelAndView.addObject("info","selectById2Info");
        return modelAndView;
    }

    /**
     * 页面跳转，通过ModelAndView对象返回，ModelAndView对象为方法参数列表封装
     *
     * model用于封装数据
     * view用于展示数据
     * @return
     */
    @RequestMapping("/selectById21")
    public ModelAndView selectById21(ModelAndView modelAndView) {
        /*
        Controller中的方法都是SpringMVC调用，当调用selectById21()方法时可识别其中需要的参数，
        参数列表中的ModelAndView对象实际上是SpringMVC调用selectById21()方法时，自动注入的并传入方法的对象
         */        System.out.println("StudentController.selectById21");
        //设置视图
        modelAndView.setViewName("forward:/student.jsp");
        //设置数据
        modelAndView.addObject("info","selectById21Info");
        return modelAndView;
    }


    /**
     * 页面跳转，通过ModelAndView对象返回，Model对象和返回字符串表示视图组合
     *
     * model用于封装数据
     * view用于展示数据
     * @return
     */
    @RequestMapping("/selectById22")
    public String selectById22(Model model) {
        /*
        参数列表中的Model对象实际上是SpringMVC自动注入的对象
         */        System.out.println("StudentController.selectById22");
        //设置数据
        model.addAttribute("info","selectById22Info");
        return "forward:/student.jsp";
    }

    /**
     * 页面跳转，通过ModelAndView对象返回，HttpServletRequest对象和返回字符串表示视图组合
     *
     * model用于封装数据
     * view用于展示数据
     * @return
     */
    @RequestMapping("/selectById23")
    public String selectById23(HttpServletRequest request) {
        /*
        参数列表中的Model对象实际上是SpringMVC自动注入的对象
         */        System.out.println("StudentController.selectById23");
        //设置数据
        request.setAttribute("info","selectById23Info");
        return "forward:/student.jsp";
    }

    /**
     * 回写数据，直接返回字符串
     *
     * 使用@ResponseBody注解
     * @return
     */
    @RequestMapping("/selectById3")
    //告知SpringMVC框架，返回的字符串不进行视图跳转，直接进行数据响应
    @ResponseBody
    public String selectById3() {
        System.out.println("StudentController.selectById3");
        return "@ResponseBody注解 数据响应 selectById3";
    }

    /**
     * 回写数据，直接返回字符串
     *
     * 使用Response对象
     * @return
     */
    @RequestMapping("/selectById31")
    public void selectById31(HttpServletResponse response) throws IOException {
        System.out.println("StudentController.selectById31");
        response.getWriter().write("HttpServletResponse 数据响应 selectById31");
    }

    /**
     * 回写数据，直接返回字符串
     *
     * 使用@ResponseBody注解利用第三方工具返回自定义json格式字符串
     * @return
     */
    @RequestMapping("/selectById32")
    //告知SpringMVC框架，返回的字符串不进行视图跳转，直接进行数据响应
    @ResponseBody
    public String selectById32() {
        System.out.println("StudentController.selectById32");
        Student student = new Student();
        student.setName("noby");
        student.setAge(20);
        ObjectMapper objectMapper = new ObjectMapper();
        String studentJson = null;
        try {
            studentJson = objectMapper.writeValueAsString(student);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return studentJson;
    }

    /**
     * 回写数据，返回对象或集合
     *
     * Spring-mvc.xml配置处理器映射器(有普通配置和mvc注解驱动两种方式)，处理器映射器可直接将将要返回的对象转换为json
     * @return
     */
    @RequestMapping("/selectById4")
    @ResponseBody
    public Student selectById4() {
        System.out.println("StudentController.selectById4");
        //redirect:重定向 forward:转发
        Student student = new Student();
        student.setName("noby");
        student.setAge(20);
        return student;
    }

}
````

### http

```
### springMVC 响应 页面跳转，直接返回字符串
GET http://localhost:8080/springMVC4/student/selectById

### springMVC 响应 页面跳转，通过ModelAndView对象返回，ModelAndView对象为方法内部实例化
GET http://localhost:8080/springMVC4/student/selectById2

### springMVC 响应 页面跳转，通过ModelAndView对象返回，ModelAndView对象为方法参数封装
GET http://localhost:8080/springMVC4/student/selectById21

### springMVC 响应 页面跳转，通过ModelAndView对象返回，Model对象和返回字符串表示视图组合
GET http://localhost:8080/springMVC4/student/selectById22

### springMVC 响应 页面跳转，通过ModelAndView对象返回，HttpServletRequest对象和返回字符串表示视图组合
GET http://localhost:8080/springMVC4/student/selectById23

### springMVC 响应 回写数据，直接返回字符串,利用@ResonseBody注解
GET http://localhost:8080/springMVC4/student/selectById3

### springMVC 响应 回写数据，直接返回字符串,利用HttpServletResponse对象
GET http://localhost:8080/springMVC4/student/selectById31

### springMVC 响应 回写数据，直接返回字符串,使用@ResponseBody注解利用第三方工具返回自定义json格式字符串
GET http://localhost:8080/springMVC4/student/selectById32

### springMVC 响应 回写数据，返回对象或集合，配置文件配置处理器映射器(有普通配置和mvc注解驱动两种方式)，处理器映射器可直接将将要返回的对象转换为json
GET http://localhost:8080/springMVC4/student/selectById4
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
