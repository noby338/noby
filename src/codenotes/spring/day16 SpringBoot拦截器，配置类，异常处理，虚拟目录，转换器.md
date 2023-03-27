---
title: day16 SpringBoot拦截器，配置类，异常处理，虚拟目录
icon: write
category:
  - Spring
  - SpringBoot
tag:
  - Spring
  - SpringBoot
  - 配置类
  - 拦截器
  - 异常处理
  - 虚拟目录
sticky: false
star: false
article: true
timeline: true
---
## 内容

  
* springboot中拦截器的使用  
  * 配置拦截器(实现HandlerInterceptor接口的类)  
  * 定义配置类，配置拦截路径和放行路径  
* springboot中添加虚拟目录映射  
  * 配置类中配置  
* springboot中转换器的使用  
  * 配置文件中配置或使用@DateTimeFormat(pattern = "yyyy-MM-dd")注解  
* springboot中项目虚拟目录和本地磁盘的映射配置  
  * 配置类中配置  
* 启动类可以作为配置类使用


## 代码

### pom

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">  
    <modelVersion>4.0.0</modelVersion>  
    <groupId>priv.noby</groupId>  
    <artifactId>springboot4</artifactId>  
    <version>0.0.1-SNAPSHOT</version>  
    <name>springboot4</name>  
    <description>springboot4</description>  
  
    <properties>  
        <java.version>1.8</java.version>  
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>  
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>  
        <spring-boot.version>2.3.7.RELEASE</spring-boot.version>  
    </properties>  
  
    <dependencies>  
        <!--热部署插件-->  
        <dependency>  
            <groupId>org.springframework.boot</groupId>  
            <artifactId>spring-boot-devtools</artifactId>  
        </dependency>  
        <dependency>  
            <groupId>org.springframework.boot</groupId>  
            <artifactId>spring-boot-starter-web</artifactId>  
        </dependency>  
        <dependency>  
            <groupId>org.projectlombok</groupId>  
            <artifactId>lombok</artifactId>  
            <optional>true</optional>  
        </dependency>  
        <dependency>  
            <groupId>org.springframework.boot</groupId>  
            <artifactId>spring-boot-starter-test</artifactId>  
            <scope>test</scope>  
            <exclusions>                <exclusion>                    <groupId>org.junit.vintage</groupId>  
                    <artifactId>junit-vintage-engine</artifactId>  
                </exclusion>            </exclusions>        </dependency>    </dependencies>  
    <dependencyManagement>        <dependencies>            <dependency>                <groupId>org.springframework.boot</groupId>  
                <artifactId>spring-boot-dependencies</artifactId>  
                <version>${spring-boot.version}</version>  
                <type>pom</type>  
                <scope>import</scope>  
            </dependency>        </dependencies>    </dependencyManagement>  
    <build>        <plugins>            <plugin>                <groupId>org.apache.maven.plugins</groupId>  
                <artifactId>maven-compiler-plugin</artifactId>  
                <version>3.8.1</version>  
                <configuration>                    <source>1.8</source>  
                    <target>1.8</target>  
                    <encoding>UTF-8</encoding>  
                </configuration>            </plugin>            <plugin>                <groupId>org.springframework.boot</groupId>  
                <artifactId>spring-boot-maven-plugin</artifactId>  
                <version>2.3.7.RELEASE</version>  
                <configuration>                    <mainClass>priv.noby.springboot4.Springboot4Application</mainClass>  
                </configuration>                <executions>                    <execution>                        <id>repackage</id>  
                        <goals>                            <goal>repackage</goal>  
                        </goals>                    </execution>                </executions>            </plugin>        </plugins>    </build>  
</project>
```

### 配置文件

```properties
spring:  
  application:  
    name: springboot4  
  mvc:  
    # 转换器的配置  
    format:  
      date: yyyy-MM-dd  
server:  
  port: 8080  
# 配置日志的级别  
# root 为输出包括系统日志在内的所有日志信息  
# 可配置指定路径输出日志  
logging:  
  level:  
    #    root: info  
    priv.noby.note.springboot4: error  
# 自定义的文件虚拟路径配置，服务器请求的路径将映射到本地磁盘，这样打包项目就不再需要同图片一同打包了  
upload:  
  resourceHandler: /image/**  
  resourceHandLocations: D:/media/image/精选/
```

### entity

```java
package priv.noby.springboot4.entity;  
  
import lombok.AllArgsConstructor;  
import lombok.Data;  
import lombok.NoArgsConstructor;  
  
/**  
 * @author Noby  
 * @since 2022/10/22  
 */@Data  
@AllArgsConstructor  
@NoArgsConstructor  
public class User {  
    private String name;  
    private String password;  
}
```


```java
package priv.noby.springboot4.entity;  
  
import lombok.AllArgsConstructor;  
import lombok.Data;  
import lombok.NoArgsConstructor;  
  
@AllArgsConstructor  
@NoArgsConstructor  
@Data  
public class ResponseResult<T>{  
    private Integer code;  
    private String msg;  
    private T data;  
}
```


### exception

```java
package priv.noby.springboot4.exception;  
  
import org.springframework.web.bind.annotation.ControllerAdvice;  
import org.springframework.web.bind.annotation.ExceptionHandler;  
import org.springframework.web.bind.annotation.ResponseBody;  
import priv.noby.springboot4.entity.ResponseResult;  
  
/**  
 * 配置全局异常处理（可在所有controller中处理）  
 */  
//全局异常处理：结合方法型注解@ExceptionHandler，用于捕获Controller中抛出的指定类型的异常。  
@ControllerAdvice  
//该注解在@ControllerAdvice的基础上中包含了@responseBody，可在方法中省略书写  
//@RestControllerAdvice  
public class GlobalExceptionHandler {  
    /**  
     * 配置处理异步请求  
     */  
    @ResponseBody  
    @ExceptionHandler(NullPointerException.class)  
    public ResponseResult<Exception> doExceptionHandler(Exception e){  
        System.out.println("ExceptionHandlerController.doExceptionHandler");  
        return new ResponseResult<>(500, "MyNullPointerException", e);  
    }  
  
    /**  
     * 配置处理同步请求  
     */  
//    @ExceptionHandler(NullPointerException.class)  
//    public String doExceptionHandler(Exception e){  
//        System.out.println("ExceptionHandlerController.doExceptionHandler");  
//        return "forward:/nullpointert_exception.html";  
//    }  
}
```

### intercepter

```java
package priv.noby.springboot4.intercepter;  
  
import org.springframework.web.servlet.HandlerInterceptor;  
  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
  
/**  
 * 定义拦截器（要使拦截器生效，必须配置配置类）  
 */  
public class LoginInterceptor implements HandlerInterceptor {  
    @Override  
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {  
        if (request.getSession().getAttribute("user") == null) {  
            response.setContentType("test/html;charset=utf-8");  
            response.getWriter().write("未登录");  
//            request.setAttribute("msg", "请登录");  
//            request.getRequestDispatcher("/login.html").forward(request, response);  
            return false;  
        }  
        return true;  
    }  
}
```

### config

```java
package priv.noby.springboot4.config;  
  
import org.springframework.beans.factory.annotation.Value;  
import org.springframework.context.annotation.Bean;  
import org.springframework.context.annotation.Configuration;  
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;  
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;  
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;  
import priv.noby.springboot4.intercepter.LoginInterceptor;  
  
/**  
 * 配置类的定义  
 *  
 * @Configuration 为配置类注解（表示该类为配置类）  
 */  
@Configuration  
public class MyWebMvcConfig {  
    @Value("${upload.resourceHandler}")  
    private String resourceHandler;  
  
    @Value("${upload.resourceHandLocations}")  
    private String resourceHandLocations;  
  
    @Bean  
    public WebMvcConfigurer webMvcConfigurer() {  
        return new WebMvcConfigurer() {  
            /**  
             * 配置拦截器  
             */  
            @Override  
            public void addInterceptors(InterceptorRegistry registry) {  
                registry.addInterceptor(new LoginInterceptor())  
//                        .addPathPatterns("/**") //添加拦截路径为所有路径  
                        .addPathPatterns("/student/doSomethingAfterLogin")  
                        .excludePathPatterns("/student/login");//排除特定的页面和controller  
            }  
  
            /**  
             * 添加虚拟目录  
             * /image/** 虚拟目录都映射到本地磁盘的 D:/media/image/精选/ 路径  
             */  
            @Override  
            public void addResourceHandlers(ResourceHandlerRegistry registry) {  
                // 访问服务器/image/**地址时映射到D:/image/，当服务器访问/image/**是即为访问 D:/media/image/精选/ 目录  
                // "file:///" 为统一前缀，表示文件系统  
//                registry.addResourceHandler("/image/**").addResourceLocations("file:///" + "D:/media/image/精选/");  
                registry.addResourceHandler(resourceHandler).addResourceLocations("file:///" + resourceHandLocations);  
            }  
        };  
    }  
  
}
```
### controller

```java
package priv.noby.springboot4.controller;  
  
import org.springframework.beans.factory.annotation.Value;  
import org.springframework.web.bind.annotation.PostMapping;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RestController;  
import org.springframework.web.multipart.MultipartFile;  
  
import java.io.File;  
import java.io.IOException;  
  
/**  
 * 文件的上传  
 *  
 * @author Noby  
 * @since 2022/10/23  
 */@RestController  
@RequestMapping("/dep")  
public class DepController {  
    @Value("${upload.resourceHandLocations}")  
    private String resourceHandLocations;  
    @PostMapping("/selectById")  
    public void selectById(MultipartFile uploadFile) {  
        System.out.println("DepController.selectById");  
        try {  
            uploadFile.transferTo(new File(resourceHandLocations, uploadFile.getOriginalFilename()));  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
    }  
}
```

```java
package priv.noby.springboot4.controller;  
  
import org.springframework.web.bind.annotation.GetMapping;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RestController;  
  
import java.util.Date;  
  
/**  
 * 类型转换器的使用  
 *  
 * @author Noby  
 * @since 2022/10/23  
 */@RestController  
@RequestMapping("/emp")  
public class EmpController {  
    //可使用注解代替配置文件  
//    @DateTimeFormat(pattern = "yyyy-MM-dd")  
    @GetMapping("/selectById")  
    public Date selectById(Date date) {  
        System.out.println("EmpController.selectById");  
        System.out.println("date = " + date);  
        return date;  
    }  
}
```

```java
package priv.noby.springboot4.controller;  
  
import org.springframework.web.bind.annotation.GetMapping;  
import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RestController;  
  
/**  
 * 异常的捕获  
 *  
 * @author Noby  
 * @since 2022/10/22  
 */@RequestMapping(value = "/person",produces = "application/json;charset=utf-8")  
@RestController  
public class PersonController {  
  
    @GetMapping("/createNullPointer")  
    public String createNullPointer() {  
        System.out.println("PersonController.createNullPointer");  
        String str = null;  
        //下行异常将被配置的全局异常捕获  
        str.equals("null");  
        return "未发生异常";  
    }  
  
}
```

```java
package priv.noby.springboot4.controller;  
  
import org.springframework.web.bind.annotation.*;  
import priv.noby.springboot4.entity.User;  
  
import javax.servlet.http.HttpSession;  
  
/**  
 * 登录模拟拦截器的使用  
 *  
 * @author Noby  
 * @since 2022/10/22  
 */@RequestMapping(value = "/student",produces = "application/json;charset=utf-8")  
@RestController  
public class StudentController {  
  
    @GetMapping("/doSomethingAfterLogin")  
    public String doSomethingAfterLogin(HttpSession session) {  
        System.out.println("StudentController.doSomethingAfterLogin");  
        User user = (User) session.getAttribute("user");  
        return user.getName() + "操作成功";  
    }  
  
    @PostMapping("/login")  
    public String login(@RequestBody User user, HttpSession session) {  
        System.out.println("StudentController.login");  
        if ("noby".equals(user.getName()) && "123".equals(user.getPassword())) {  
            session.setAttribute("user", user);  
        }  
        return "登录成功";  
    }  
}
```

### http

```
### springboot 请求 上传文件  
POST http://localhost:8080/dep/selectById  
Content-Type: multipart/form-data; boundary=WebAppBoundary  
  
#一个WebAppBoundary包含内的即代表一个form中的input标签  
  
--WebAppBoundary  
Content-Disposition: form-data; name="uploadFile"; filename="aa.jpg"  
  
< D:/media/image/aa.jpg  
--WebAppBoundary--  
  
  
### springboot 虚拟路径配置的测试(获取的本地磁盘的D:/media/image/精选/目录)  
GET http://localhost:8080/image/984271.jpg
```

```
# 默认的转换器时间格式date=2022/10/12  
### 类型转换器的使用  
GET http://localhost:8080/emp/selectById?date=2022-10-12
```


```
### 测试全局异常  
GET http://localhost:8080/person/createNullPointer
```

```
### 登录成功后执行操作(未登录将会被拦截器拦截)  
GET http://localhost:8080/student/doSomethingAfterLogin  
  
### 登录  
POST http://localhost:8080/student/login  
Content-Type: application/json  
  
{  
  "name": "noby",  
  "password": "123"  
}
```