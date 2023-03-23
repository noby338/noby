## Servlet

###  简介

![image-20220322160959439](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220322160959439.png)

* Servlet是JavaWeb最为核心的内容，它是Java提供的一门动态web资源开发技术。
* 使用Servlet就可以实现，根据不同的登录用户在页面上动态显示不同内容。
* Servlet是JavaEE规范之一，其实就是一个接口，将来我们需要定义Servlet类实现Servlet接口，并由web服务器运行Servlet

### 快速入门

需求分析: 编写一个Servlet类，并使用IDEA中Tomcat插件进行部署，最终通过浏览器访问所编写的Servlet程序。

具体的实现步骤为:

1. 创建Web项目`web-demo`，导入Servlet依赖坐标

```xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
    <!--
      此处为什么需要添加该标签?
      provided指的是在编译和测试过程中有效,最后生成的war包时不会加入
       因为Tomcat的lib目录中已经有servlet-api这个jar包，如果在生成war包的时候生效就会和Tomcat中的jar包冲突，导致报错
    --> 
    <scope>provided</scope>
</dependency>
```

2. 创建:定义一个类，实现Servlet接口，并重写接口中所有方法，并在service方法中输入一句话

```java
package com.itheima.web;

import javax.servlet.*;
import java.io.IOException;

public class ServletDemo1 implements Servlet {

    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("servlet hello world~");
    }
    public void init(ServletConfig servletConfig) throws ServletException {

    }

    public ServletConfig getServletConfig() {
        return null;
    }

    public String getServletInfo() {
        return null;
    }

    public void destroy() {

    }
}
```

3. 配置:在类上使用@WebServlet注解，配置该Servlet的访问路径

```java
@WebServlet("/demo1")
```

4. 访问:启动Tomcat,浏览器中输入URL地址访问该Servlet

```
http://localhost:8080/web-demo/demo1
```

5. 器访问后，在控制台会打印`servlet hello world~` 说明servlet程序已经成功运行。

### 执行流程

* Servlet的执行流程

![image-20220322161130473](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220322161130473.png)

* 浏览器发出`http://localhost:8080/web-demo/demo1`请求，从请求中可以解析出三部分内容，分别是`localhost:8080`、`web-demo`、`demo1`
  * 根据`localhost:8080`可以找到要访问的Tomcat Web服务器
  * 根据`web-demo`可以找到部署在Tomcat服务器上的web-demo项目
  * 根据`demo1`可以找到要访问的是项目中的哪个Servlet类，根据@WebServlet后面的值进行匹配
* 找到ServletDemo1这个类后，Tomcat Web服务器就会为ServletDemo1这个类创建一个对象，然后调用对象中的service方法
  * ServletDemo1实现了Servlet接口，所以类中必然会重写service方法供Tomcat Web服务器进行调用

### 生命周期

* 生命周期: 对象的生命周期指一个对象从被创建到被销毁的整个过程。

* Servlet运行在Servlet容器(web服务器)中，其生命周期由容器来管理，分为4个阶段：

  1. 加载和实例化：默认情况下，当Servlet第一次被访问时，由容器创建Servlet对象
     - 可用loadOnStartup修改成在服务器启动的时候创建。

  2. 初始化：在Servlet实例化之后，容器将调用Servlet的init()方法初始化这个对象，完成一些如加载配置文件、创建连接等初始化的工作。该方法只调用一次
  3. 请求处理：每次请求Servlet时，Servlet容器都会调用Servlet的service()方法对请求进行处理
  4. 服务终止：当需要释放内存或者容器关闭时，容器就会调用Servlet实例的destroy()方法完成资源的释放。在destroy()方法调用之后，容器会释放这个Servlet实例，该实例随后会被Java的垃圾收集器所回收

* 通过案例演示下上述的生命周期

  ```java
  package note;
  
  import javax.servlet.*;
  import javax.servlet.annotation.WebServlet;
  import java.io.IOException;
  
  @WebServlet(urlPatterns = "/servletnote", loadOnStartup = 1)//访问的路径
  /*
  loadOnStartup修改成在服务器启动的时候创建。
  （1）负整数:第一次访问时创建Servlet对象	
  （2）0或正整数:服务器启动时创建Servlet对象，数字越小优先级越高
   */
  public class ServletNote implements Servlet {
      private ServletConfig config;
  
      /**
       * 只在servlet第一次访问的时候调用一次
       *
       * @param servletConfig
       * @throws ServletException
       */
      public void init(ServletConfig servletConfig) throws ServletException {
          System.out.println("init");
      }
  
      /**
       * 返回servlet配置对象
       *
       * @return
       */
      public ServletConfig getServletConfig() {
          return null;
      }
  
      /**
       * 提供服务的方法
       * 每一次servlet被访问时调用该方法
       *
       * @param servletRequest
       * @param servletResponse
       * @throws ServletException
       * @throws IOException
       */
      public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
          System.out.println("service");
      }
  
      /**
       * 返回servlet信息
       *
       * @return
       */
      public String getServletInfo() {
          return null;
      }
  
      /**
       * 服务器关闭和servlet对象被销毁时调用该方法
       * 只调用一次
       */
      public void destroy() {
          System.out.println("destroy");
      }
  }
  
  ```




### 方法介绍

* 初始化方法，在Servlet被创建时执行，只执行一次

```java
void init(ServletConfig config) 
```

* 提供服务方法， 每次Servlet被访问，都会调用该方法

```java
void service(ServletRequest req, ServletResponse res)
```

* 销毁方法，当Servlet被销毁时，调用该方法。在内存释放或服务器关闭时销毁Servlet

```java
void destroy() 
```

* 获取Servlet信息

```java
String getServletInfo() //该方法用来返回Servlet的相关信息，没有什么太大的用处，一般我们返回一个空字符串即可public String getServletInfo() {    return "";}
```

* 获取ServletConfig对象

```java
ServletConfig getServletConfig()
```

### 体系结构

![image-20220322161149464](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220322161149464.png)

因为我们将来开发B/S架构的web项目，都是针对HTTP协议，所以我们自定义Servlet,会通过继承HttpServlet

具体的编写格式如下:

```java
package note;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/httpservletnote")
public class HttpServletNote extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("doGet");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("doPost");
    }
}
```



* 要想发送一个POST或者GET请求，请求该Servlet，编写一个form表单，在webapp下创建一个`HttpServletNote.html`页面，内容如下:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>b</title>
</head>
<body>
get
<form action="/servletMod/httpservletnote" method="get">
    <input name="username">
    <button type="submit">提交</button>
</form>
post
<form action="/servletMod/httpservletnote" method="post">
    <input name="username">
    <button type="submit">提交</button>
</form>
</body>
</html>
```



### urlPattern配置

Servlet类编写好后，要想被访问到，就需要配置其访问路径（==urlPattern==）

* 一个Servlet,可以配置多个urlPattern

  ```java
  package note;
  
  import javax.servlet.ServletException;
  import javax.servlet.http.HttpServlet;
  import javax.servlet.http.HttpServletRequest;
  import javax.servlet.http.HttpServletResponse;
  import java.io.IOException;
  
  //@WebServlet(urlPatterns = {"/urlpattern1","/urlpattern2"})//一个servlet可以配置多个urlPattern
  //@WebServlet(urlPatterns = "/user/select")//精确匹配
  //@WebServlet(urlPatterns = "/user/*")//目录匹配(*表示任何内容)
  //@WebServlet("*.do")//扩展名匹配
  //@WebServlet("/*")//任意匹配  @WebServlet("/")//任意匹配
  /*
  不推荐"/"的方法使用任意匹配，其会覆盖tomcat的DefaultServlet
  tomcat的DefaultServlet用于获取静态资源
  优先级：
  精确目录>目录路径>扩展名路径>/*>/
   */
  public class UrlPatternsNote extends HttpServlet {
      @Override
      protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          System.out.println("urlpatterns");
      }
  
      @Override
      protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
  
  
      }
  }
  
  ```

  

* `/`和`/*`的区别?

  1. 当我们的项目中的Servlet配置了 "/",会覆盖掉tomcat中的DefaultServlet,当其他的url-pattern都匹配不上时都会走这个Servlet

  2. 当我们的项目中配置了"/*",意味着匹配任意访问路径

  3. DefaultServlet是用来处理静态资源，如果配置了"/"会把默认的覆盖掉，就会引发请求静态资源的时候没有走默认的而是走了自定义的Servlet类，最终导致静态资源不能被访问

     


### XML配置

前面对应Servlet的配置，我们都使用的是@WebServlet,这个是Servlet从3.0版本后开始支持注解配置，3.0版本前只支持XML配置文件的配置方法。

对于XML的配置步骤有两步:

* 编写Servlet类

```java
package com.itheima.web;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;

public class ServletDemo13 extends MyHttpServlet {

    @Override
    protected void doGet(ServletRequest req, ServletResponse res) {

        System.out.println("demo13 get...");
    }
    @Override
    protected void doPost(ServletRequest req, ServletResponse res) {
    }
}
```

* 在web.xml中配置该Servlet

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    
    <!-- 
        Servlet 全限定名
    -->
    <servlet>
        <!-- servlet的名称，名字任意-->
        <servlet-name>demo13</servlet-name>
        <!--servlet的全限定名-->
        <servlet-class>com.itheima.web.ServletDemo13</servlet-class>
    </servlet>

    <!-- 
        Servlet 访问路径
    -->
    <servlet-mapping>
        <!-- servlet的名称，要和上面的名称一致-->
        <servlet-name>demo13</servlet-name>
        <!-- servlet的访问路径-->
        <url-pattern>/demo13</url-pattern>
    </servlet-mapping>
</web-app>
```





