---
title: day07 Servlet、请求、响应、编码解码、会话、转发、重定向
icon: write
category:
  - JavaWeb
  - Servlet
tag:
  - JavaWeb
  - Servlet
  - 请求
  - 响应
  - 编码解码
  - 会话
  - 转发
  - 重定向
sticky: false
star: false
article: true
timeline: true
---
## 简介

![image-20220322160959439](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220322160959439.png)
![image-20220322161130473](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220322161130473.png)

- Servlet 是 JavaWeb 最为核心的内容，它是 Java 提供的一门动态 web 资源开发技术。
- 使用 Servlet 就可以实现，根据不同的登录用户在页面上动态显示不同内容。
- Servlet 是 JavaEE 规范之一，其实就是一个接口，将来我们需要定义 Servlet 类实现 Servlet 接口，并由 web 服务器运行 Servlet

## 继承关系

![image.png](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/20230325132622.png)

## 生命周期

- Servlet 运行在 Servlet 容器(web 服务器)中，其生命周期由容器来管理，分为 4 个阶段：
  1. 加载和实例化：默认情况下，当 Servlet 第一次被访问时，由容器创建 Servlet 对象
     - 可用 loadOnStartup 修改成在服务器启动的时候创建。
  2. 初始化：在 Servlet 实例化之后，容器将调用 Servlet 的 init()方法初始化这个对象，完成一些如加载配置文件、创建连接等初始化的工作。该方法只调用一次
  3. 请求处理：每次请求 Servlet 时，Servlet 容器都会调用 Servlet 的 service()方法对请求进行处理
  4. 服务终止：当需要释放内存或者容器关闭时，容器就会调用 Servlet 实例的 destroy()方法完成资源的释放。在 destroy()方法调用之后，容器会释放这个 Servlet 实例，该实例随后会被 Java 的垃圾收集器所回收

## Servlet 基础

```java
package priv.noby.servlet.servlet;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 * 通过配置web.xml实现servlet的访问
 * servlet的生命周期
 * ServletConfig类
 */
public class ServletNote implements Servlet {
    private ServletConfig servletConfig = null;//该对象保存的即为<servlet>标签内的信息

    /**
     * 只在servlet第一次访问的时候调用一次
     *
     * @param servletConfig
     */
    @Override
    public void init(ServletConfig servletConfig) {
        /*
        tomcat在执行init方法之前，读取web.xml中的配置文件，并将配置文件信息封装为ServletConfig对象，传入到init方法中
         */        this.servletConfig = servletConfig;
        System.out.println("init执行");
        System.out.println("servletConfig.getInitParameter(\"ENCODING\") = " + servletConfig.getInitParameter("ENCODING"));
        System.out.println("servletConfig.getServletContext().getInitParameter(\"info2\") = " + servletConfig.getServletContext().getInitParameter("info2"));
    }

    /**
     * 返回servlet配置对象
     *
     * @return
     */
    @Override
    public ServletConfig getServletConfig() {
        return servletConfig;
    }

    /**
     * 提供服务的方法
     * 每一次servlet被访问时调用该方法
     *
     * @param servletRequest
     * @param servletResponse
     */
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) {
        System.out.println(servletConfig.getInitParameter("ENCODING"));//通过servletConfig对象获取web.xml文件中的配置参数
        System.out.println("service执行");
    }

    /**
     * 返回servlet信息
     *
     * @return
     */
    @Override
    public String getServletInfo() {
        return null;
    }

    /**
     * 服务器关闭和servlet对象被销毁时调用该方法
     * 只调用一次
     */
    @Override
    public void destroy() {
        System.out.println("destroy执行");
    }
}
```

## HttpServlet

### Tomcat对请求和响应的封装
- request:获取请求数据
  - 浏览器会发送 HTTP[请求行+请求头+请求体]请求到后台服务器[Tomcat]
  - 后台服务器[Tomcat]会对 HTTP 请求中的数据进行解析并把解析结果存入到一个 request 对象中
  - 我们可以从 request 对象中获取请求的相关参数获取到数据后就可以继续后续的业务，比如获取用户名和密码就可以实现登录操作的相关业务
- response:设置响应数据
  - 业务处理完毕，前端返回业务处理后，封装到 response 对象中的响应数据
  - 后台服务器[Tomcat]会解析 response 对象,按照[响应行+响应头+响应体]格式拼接结果以 HTTP 协议返回给街蓝旗
  - 浏览器最终解析结果，把内容展示在浏览器给用户浏览

### Get 和 Post 的区别

- 两者都为 http 的请求方式，传输层协议均为 tcp 协议，get 请求用于获取请求数据，post 请求多为提交数据
- get 没有请求体，post 有请求体
- get 的请求参数位于请求行中在浏览器地址栏可见，post 的请求参数封装与请求体中浏览器地址不可见
- get 发送的请求数据量为一般为 1k(和浏览器有关)，post 请求数据量没有限制
- get 只接受 ASCII 字符，对非 ascll 字符只能进行 url 编码，而 post 支持 utf-8 和 iso-8859-1 等多种编码方式。
- get 请求的乱码处理为修改 tomcat 配置文件(乱码发生在 tomcat8 之前)，或将乱码字符通过 iso-8859-1 重新编码为字节码，再通过 utf-8 解码为正确字符；post 请求的乱码处理为设置请求体为 utf-8 解码(request.setCharacterEncoding("utf-8"))
- get 效率高于 post
- get 安全性低于 post
- get 的请求有浏览器地址输入、超链接、get 表单、ajax 的 get 请求，post 的请求有 post 表单、ajax 的 post 请求

### 转发和重定向的区别

- 转发通过 request 对象调用 getRequestDispatcher().forword()方法转发，重定向通过 response 对象调用 sendRedirect()方法重定向，转发路径参数可不包含 contextPath，重定向路径参数必须包含 contextPath
- 转发过程中 request 域有效，重定向过程中 rquest 域无效
- 转发请求的发起者为服务器，转发路径使用相对路径，重定向请求的发起者为浏览器，重定向路径使用绝对路径
- 转发前后为同一次请求，重定向前后为两次不同的请求
- 转发前后浏览器地址栏的路径不改变，重定向前后浏览器地址栏的路径改变
- 转发的响应速度快，重定向的响应速度相对较慢
- 转发只能在当前网站的资源中跳转，重定向可在不同的网站中跳转

### 常用的响应码

- 200 正常响应
- 302 重定向
- 400 请求的条件不满足(必须携带某个参数)
- 401 未认证(Authentication 判断用户是否登录)
- 403 未授权(Authorization 登录的用户能否执行对应的操作)
- 404 未找到资源文件
- 405 请求方式错误
- 408 请求超时
- 500 服务器异常
- 502 错误网关(nginx)

### 编码和解码的方式

- html 页面 `<meta charset="UTF-8">` 设置浏览器的解码方式
- response.setContentType("text/html;charset=utf-8");响应的数据为 html,服务器编码方式为 utf-8
  - 作为以下的简写，同时简写方式还能告诉浏览器自适应当前的编码
    - response.setHeader("content-type", "text/html");//设置相应的内容类型
    - response.setCharacterEncoding("utf-8");//设置内容的服务器编码方式
- request.setCharacterEncoding("utf-8"); 设置服务器对请求体解码方式为 utf-8


```java
package priv.noby.servlet.servlet;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * HttpServlet和Servlet的继承关系
 * 通过注解配置Servlet的访问路径
 */
@WebServlet(urlPatterns = "/httpServletNote",//tomcat访问路径
        initParams = {@WebInitParam(name = "username", value = "noby"), @WebInitParam(name = "password", value = "123")},//servlet初始化参数
        loadOnStartup = 0)
/*
name属性可随意
ServletConfig初始化对象的参数
loadOnStartup
（1）负整数:第一次访问时创建Servlet对象
（2）0或正整数:服务器启动时创建Servlet对象，数字越小优先级越高

@WebServlet的使用注意：
    @WebServlet的value属性名等同于 urlPatterns 属性名，等同于直接书写属性值
    @WebServlet(urlPatterns = {"/urlPattern1","/urlPattern2"})//一个servlet可以配置多个urlPattern
    @WebServlet(urlPatterns = "/user/select")//精确匹配
    @WebServlet(urlPatterns = "/user/*")//目录匹配(*表示任何内容)
    @WebServlet("*.do")//扩展名匹配
    @WebServlet("/*")//任意匹配
    @WebServlet("/")//任意匹配

    不推荐"/"的方法使用任意匹配，其会覆盖tomcat的DefaultServlet
    tomcat的DefaultServlet用于获取静态资源
    优先级：    精确目录>目录路径>扩展名路径>/*>/

注解使用注意：
    1、当注解的属性名为value时，可以省略value=的书写方式，直接写属性值；
    2、当注解中的属性不唯一时，不能省略value=的书写；
    3、使用某一注解，该注解的所有属性必须赋值（WebServlet注解没有全部赋值因为除urlPattern以外的所有属性都已通过default赋初值）
    4、注解的属性可以是注解
    5、注解的属性可以是数组，当数组的长度为一时，可以省略{}的书写
 */public class HttpServletNote extends HttpServlet {
    /**
     * Servlet接口中的方法
     *
     * @param req
     * @param res
     * @throws ServletException
     * @throws IOException
     */    @Override
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        super.service(req, res);
    }

    /**
     * HttpServlet重写的方法，并将ServletRequest和ServletResponse向下转型，
     * 同时，可以判断请求参数的类型，根据类型调用post()或get()方法
     *
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.service(req, resp);
        //调用的为ServletConfig类的getInitParameter()，getServletContext()。他们都是来自GenericServlet的重写，
        System.out.println("this.getInitParameter(\"username\") = " + this.getInitParameter("username"));
        System.out.println("getInitParameter(\"password\") = " + getInitParameter("password"));
        System.out.println("getServletContext().getInitParameter(\"info2\") = " + getServletContext().getInitParameter("info2"));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("HttpServletNote.doPost");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("HttpServletNote.doGet");
//        this.doPost(request, response);
    }
}
```

### Request 请求

```java
package priv.noby.servlet.httpServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 请求乱码问题
 *  * get请求乱码的原因：
 *      * 浏览器请求行中的请求参数为utf-8的url编码方式，tomcat8之前默认使用的iso-8859-1的解码方式，之后为utf-8
 *  * get解决方式：
 *      * 设置tomcat配置文件的默认解码方式
 *      * new String(username.getBytes("ISO_8859_1"), "utf-8") ()
 *  * post请求乱码的原因：
 *      * 浏览器请求体为utf-8的编码方式，tomcat默认使用的iso-8859-1的解码方式
 *  * post解决方式：
 *      * request.setCharacterEncoding("utf-8");
 * * 请求的参数
 * 请求的转发
 *
 * @author Noby
 * @since 2023/3/24 22:35
 */@WebServlet("/requestServletNote")
public class RequestServletNote extends HttpServlet {

    /**
     * 请求头的获取
     * 解决请求的中文乱码问题（tomcat8以后的get请求无中问乱码问题）
     * 获取请求参数的几种方式
     *
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     *///    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        response.setContentType("text/html;charSet=utf-8");
//        request.setCharacterEncoding("utf-8");//解决请求中文乱码（该方法不能处理get请求乱码，因为设置的为请求体的乱码，get请求参数位于请求行中）
//
//        //获取请求头
//        System.out.println("request.getHeader(\"user-agent\") = " + request.getHeader("user-agent"));//获取请求头
//        System.out.println("request.getParameterValues(\"hobby\") = " + Arrays.toString(request.getParameterValues("hobby")));//获取一组参数
//        Enumeration<String> parameterNames = request.getParameterNames();//获取所有参数名
//        Map<String, String[]> parameterMap = request.getParameterMap();//获取所有参数的键值对
//
//
//        String username = request.getParameter("username");
//        System.out.println("username = " + username);
//        PrintWriter writer = response.getWriter();
//        writer.write("username:" + username);
//    }

    /**
     * 获取请求行的各个参数
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     *///    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        //获取请求行 http://localhost:8080/servlet/RequestServletNote?username=noby&password=123//        System.out.println("request.getRequestURL() = " + request.getRequestURL());//http://localhost:8080/servlet/RequestServletNote （统一资源定位符）
//        System.out.println("request.getRequestURI() = " + request.getRequestURI());//servlet/RequestServletNote （统一资源标识符）
//        System.out.println("request.getScheme() = " + request.getScheme());//http
//        System.out.println("request.getServerName() = " + request.getServerName());//localhost （服务器id地址）
//        System.out.println("request.getServerPort() = " + request.getServerPort());//8080
//        System.out.println("request.getContextPath() = " + request.getContextPath());//servlet （项目名，上下文路径）
//        System.out.println("request.getServletPath() = " + request.getServletPath());//RequestServletNote （servlet路径）
//        System.out.println("request.getQueryString() = " + request.getQueryString());//username=noby&password=123 （请求参数）
//    }

    /**
     * 请求的转发
     * request域
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     *///    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        //page < request < session < application(ServletContext) 前四个为JavaWeb的四大域对象，后面三个为Servlet三大域对象
//        request.setAttribute("info","转发域属性信息");//域键值对中的值可以是不局限于String的任意类型，request域的生命周期为浏览器请求发起到浏览器接收到服务器响应
//        System.out.println("request.getAttribute(\"info\") = " + request.getAttribute("info"));//获取域属性
//        Enumeration<String> attributeNames = request.getAttributeNames();
//        while (attributeNames.hasMoreElements()) {
//            System.out.println("所有的属性名："+attributeNames.nextElement());
//        }
////        request.removeAttribute("info");//删除域属性
//        request.getRequestDispatcher("/dispatcher.jsp").forward(request,response);//转发的地址为浏览器地址，重定向地址为服务器地址
////        response.sendRedirect("/servlet/dispatcher.jsp");//转发域属性只可以在本次请求有效（重定向不属于同一次请求）
//    }

    /**
     * 请求的包含
     * request域
     *
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().write("requestServletNote\n");//页面的复用底层使用的就是请求的包含
        //响应的后面不可以有转发和重定向，但是可以有包含
        request.getRequestDispatcher("/includeServlet").include(request,response);//统一个页面可以同时有由多个servlet编辑
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}
```

### Response 请求

```java
package priv.noby.servlet.httpServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 响应头设置
 * 响应码设置
 * 响应编码设置
 * 响应内容设置（字符，字节）
 * 重定向
 *
 * @author Noby
 * @since 2023/3/24 21:40
 */@WebServlet("/responseServletNote")
public class ResponseServletNote extends HttpServlet {

    /**
     * 发送响应
     * 响应字符
     * 设置响应的编码方式1，通过调用response的setContentType()方法
     */
//    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        response.setContentType("text/html;charset=utf-8");//响应的数据为html,浏览器解码方式为utf-8
//        /* 等同于该代码块
//        response.setHeader("content-type", "text/html");//设置响应的内容类型
//        response.setCharacterEncoding("utf-8");//设置内容的浏览器解码方式
//        */
//        request.setCharacterEncoding("utf-8");//设置服务器请求文字的编码方式为utf-8
//        PrintWriter writer = response.getWriter();//响应的数据为字符
//        writer.write("write()方法执行1");
//    }

    /**
     * 发送响应
     * 设置自定义响应头
     * 设置响应的编码方式2，通过设置响应头
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     *///    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        response.setHeader("username","noby");//设置响应头，用户自定义响应头，浏览器可接收该信息
//        response.setHeader("Content-Type","text/html;charset=utf-8");//http协议响应头，该方法等同于response.setContentType("text/html;charset=utf-8")
//        response.setCharacterEncoding("utf-8");//设置服务器响应的编码方式为utf-8（该语句在上行语句书写后可以省略）
//        PrintWriter writer = response.getWriter();
//        writer.write("write()方法执行2");
//    }

    /**
     * 发送图片字节响应
     * 通过commons-io实现流的对拷
     * 通过上下文对象获取输入流
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     *///    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        InputStream fileInputStream=this.getServletContext().getResourceAsStream("/img/joker.jpg");
//        ServletOutputStream outputStream = response.getOutputStream();
//        System.out.println(this.getServletContext());
//        IOUtils.copy(fileInputStream,outputStream);//利用外部工具实现流的对拷(输入流，输出流)
//        fileInputStream.close();
//    }

    /**
     * 发送pdf字节响应
     * 通过commons-io实现流的对拷
     * 通过上下文对象获取输入流
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     *///    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        response.setContentType("Application/pdf;charset=uft-8");//可省略改行
//        ServletContext servletContext = this.getServletContext();
//        InputStream inputStream = servletContext.getResourceAsStream("/serverStartup.pdf");
//        ServletOutputStream outputStream = response.getOutputStream();
//        IOUtils.copy(inputStream, outputStream);//利用commons-io实现流的对拷(输入流，输出流)
//        inputStream.close();
//    }


    /**
     * 重定向方法1，调用重定向方法
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendRedirect("/servlet/redirect.html");
    }

    /**
     * 设置响应码
     * 重定向方法2，设置响应码和响应头
     *
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     *///    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        //200 正常响应，404 未找到资源文件，405 请求方式错误，500 java代码异常，302 重定向
//        response.setStatus(302);
//        response.setHeader("location","/servlet/redirect.html");
////        response.sendError(404,"人为设置资源未找到");
//    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}
```

### 请求的包含

```java
package priv.noby.servlet.httpServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 请求的包含
 */
@WebServlet("/includeServlet")
public class IncludeServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().write("IncludeServlet");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```

## 会话跟踪

### 请求和会话

- 一次请求为浏览器发出请求到服务器响应数据结束
- 一次会话为浏览器和服务器建立连接到其中一方关闭连接。一次会话为一个用户对应在服务器中的 session 和对应在浏览器中 cookie 的 sessionID 的有效期限，可为连写也可为断续的
  - 一次会话通常包含多个请求
- 会话跟踪：浏览器使用的 http 协议为无状态协议，每次请求都是独立的，该技术是为了建立各个请求之间的数据共享，会话跟踪同一次会话中多次请求中间的数据的共享技术

### 如何实现会话跟踪

- 第一次浏览器向服务器发起请求
  - request 请求中不会携带来自浏览器中的任何 cookie
    - 服务器调用 request.getSession()方法获取 session，未通过 cookie 获取到 JSESSIONID 的情况下服务器会新建一个 session
      - 当服务器向浏览器响应数据时存在 Set-Cookie 响应头，该响应头存在该 session 的 JSESSIONID
        - 浏览器接收到响应后将 Set-Cookie 响应头中的 JSESSIONID 存入该网站的 cookie 中
- 第二次该浏览器向该服务器发起请求
  - request 请求中携带来自浏览器中对应该网站包含 JSESSIONID 在内的所有 cookie
    - 服务器调用 request.getSession()方法获取 session，服务器通过 cookie 中的 JSESSIONID 查询对应的 session 并返回，这样就可以保证和上次浏览器访问时获得的 session 为同一 session

### Cookie 和 Session 的区别

- 存储位置：Cookie 存储在浏览器；Session 存储在服务器
- 安全性：Cookie 因为存在浏览器当中，有被窃取的风险，也会随请求在网络中传输，有被劫持的风险，因此不安全；Session 存在服务器当中且不再不随响应在网络中传输，所以较安全
- 数据类型及大小：Cookie 只能存储字符串且不能直接存储中文字符串，中文通常使用 URL 编码的方式做传输前的处理，且大小为 3kb；Session 可以存储对象在内的所有数据，且没有大小限制
- 存储时间：Cookie 默认为关闭浏览器失效，可调用 Cookie 的成员方法 setMaxAge()设置其有效时间，负数为关闭浏览器失效，正数为有效的秒数，0 为删除；Session 默认为 30 分钟失效，可通过配置文件设置其有效时间(单位为分)，setMaxInactiveInterval(int s)方法可覆盖配置文件的有效时间(单位为秒)，可调用 invalidate()的方法销毁，当服务器重启时会通过钝化和活化的方式保证在 Session 规定时间内的有效性
  - 钝化：服务器关机前把 session 通过序列化的方式保存到硬盘文件中。
  - 活化：服务器开机后把硬盘文件中的 session 在反序列化回内存。
- 服务器性能：Cookie 不占用服务器资源，相对性能高；session 占用服务器资源，相对性能低

### Cookie

```java
package priv.noby.servlet.sessionTracking;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;

/**
 * 服务器向浏览器写入cookie
 * <p>
 * 作用：让服务器记住一些客户端的特定信息，响应用户的时候，向浏览器的cookie中写数据，当该浏览器在本次会话再次访问服务器时会携带该cookie数据
 * 生命周期：默认为当前会话有效（不是当前请求），即为浏览器关闭时结束
 */
@WebServlet("/cookieNote")
public class CookieNote extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charSet=UTF-8");
        //cookie不能直接存储中文，需要用到url编码
        String value = "noby中文";
        String urlValue = URLEncoder.encode(value, "utf-8");
        Cookie cookie = new Cookie("username", urlValue);//Cookie的值只能为String，且不能直接存储中文
        cookie.setMaxAge(60 * 60);//设置cookie的有效时间，单位为秒，-1为默认值(关闭浏览器失效，负数都为关闭浏览器失效)，0为删除
        resp.addCookie(cookie);

        String format = String.format("cookieNote已创建 %s:%s", cookie.getName(), cookie.getValue());
        System.out.println(format);
        PrintWriter writer = resp.getWriter();
        writer.write(format);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}
```

```java
package priv.noby.servlet.sessionTracking;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;

/**
 * 服务器读取浏览器发送过来的cookie
 */@WebServlet("/cookieNote2")
public class CookieNote2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charSet=UTF-8");
        Cookie[] cookies = req.getCookies();
        PrintWriter writer = resp.getWriter();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                writer.write(String.format("cookieNote2已获取cookie %s:%s", cookie.getName(), cookie.getValue()));

                if ("username".equals(cookie.getName())) {
                    String format = String.format("cookieNote2已获取cookie %s:%s", cookie.getName(), URLDecoder.decode(cookie.getValue()));
                    writer.write(format);
                    System.out.println(format);
                }

                if ("username".equals(cookie.getName())) {
                    cookie.setMaxAge(0);//删除该cookie
                    System.out.println("username cookie已删除");
                }
            }
        }


    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req,resp);
    }
}
```

### Session

```java
package priv.noby.servlet.sessionTracking;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 服务器向内部写入session
 */@WebServlet("/sessionNote")
public class SessionNote extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        session.setAttribute("password","123");
        response.setContentType("text/html;charSet=UTF-8");
        PrintWriter writer = response.getWriter();

        String password = String.format("已写入session %s:%s", "password", "123");
        writer.write(password);
        System.out.println(password);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}
```

```java
package priv.noby.servlet.sessionTracking;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 获取服务内部的session
 */@WebServlet("/sessionNote2")
public class SessionNote2 extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charSet=UTF-8");
        PrintWriter writer = response.getWriter();
        HttpSession session = request.getSession();
        //销毁session的方法
//        session.invalidate();
        //会话超时后销毁该session(单位为秒，配置文件中的session-config单位为分钟，0或负数为永久有效)
//        session.setMaxInactiveInterval(3);
        String format = String.format("已获取session %s:%s", "password", session.getAttribute("password"));
        System.out.println(format);
        writer.write(format);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}
```

### ServletContext

```java
package priv.noby.servlet.sessionTracking;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 写入上下文对象信息
 */
@WebServlet("/servletContextNote")
public class ServletContextNote extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charSet=UTF-8");
        PrintWriter writer = response.getWriter();
        ServletContext servletContext = getServletContext();//（上下文对象）来自GenericServlet对象，它是在服务器启动时就通过服务器自动创建，所有用户共享上下文对象
        servletContext.setAttribute("info","servletContextValue");
        String infoFormat = String.format("已写入 servletContext %s:%s", "info", "servletContextValue");
        System.out.println(infoFormat);
        writer.write(infoFormat);

    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}
```

```java
package priv.noby.servlet.sessionTracking;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 回应所有用户获取上下文对象的请求
 * 获取配置文件中的初始化参数
 * servletContext
 * servletConfig */@WebServlet(value = "/servletContextNote2", initParams = {
        @WebInitParam(name = "ENCODING", value = "UTF-8")
})
public class ServletContextNote2 extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charSet=UTF-8");
        PrintWriter writer = response.getWriter();
        ServletContext servletContext = this.getServletContext();//（上下文对象）来自GenericServlet对象，它是在服务器启动时就通过服务器自动创建，所有用户共享上下文对象
        ServletConfig servletConfig = this.getServletConfig();
        String infoFormat = String.format("获取到servletContext attribute %s:%s", "info", servletContext.getAttribute("info"));//来自servletContextNote设置的域属性
        System.out.println(infoFormat);
        writer.write(infoFormat + "\n");
        String info2Format = String.format("获取到servletContext initParameter %s:%s", "info2", servletContext.getInitParameter("info2"));//来自xml，所有的servlet均可访问
        System.out.println(info2Format);
        writer.write(info2Format + "\n");
        String EncodingFormat = String.format("获取到servletConfig initParameter %s:%s", "ENCODING", servletConfig.getInitParameter("ENCODING"));//来自本类注解，本servlet可访问
        System.out.println(EncodingFormat);
        writer.write(EncodingFormat);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}
```

### 会话应用，验证登陆

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>verifyCode</title>
</head>
<body>
<form action="/servlet/loginNote">
    账号：<input type="text" name="username" value="${cookie.username.value}"><br>
    密码：<input type="password" name="password" value="123"><br>
    验证码：<input type="text" name="userCode"> <img src="/servlet/verifyCodeNote" id="imgCode"/>
    <input type="submit" value="提交">
</form>
</body>
</html>
```

```java
package priv.noby.servlet.util;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Random;

/**
 * 生成验证码
 *
 */public class VerifyCode {
    private int w = 70;
    private int h = 35;
    private Random r = new Random();
    // {"宋体", "华文楷体", "黑体", "华文新魏", "华文隶书", "微软雅黑", "楷体_GB2312"}
    private String[] fontNames  = {"宋体", "华文楷体", "黑体", "微软雅黑", "楷体_GB2312"};
    private String codes  = "23456789abcdefghjkmnopqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ";
    private Color bgColor  = new Color(255, 255, 255);
    private String text ;

    private Color randomColor () {
        int red = r.nextInt(150);
        int green = r.nextInt(150);
        int blue = r.nextInt(150);
        return new Color(red, green, blue);
    }

    private Font randomFont () {
        int index = r.nextInt(fontNames.length);
        String fontName = fontNames[index];
        int style = r.nextInt(4);
        int size = r.nextInt(5) + 24;
        return new Font(fontName, style, size);
    }

    private void drawLine (BufferedImage image) {
        int num  = 3;
        Graphics2D g2 = (Graphics2D)image.getGraphics();
        for(int i = 0; i < num; i++) {
            int x1 = r.nextInt(w);
            int y1 = r.nextInt(h);
            int x2 = r.nextInt(w);
            int y2 = r.nextInt(h);
            g2.setStroke(new BasicStroke(1.5F));
            g2.setColor(Color.BLUE);
            g2.drawLine(x1, y1, x2, y2);
        }
    }

    private char randomChar () {
        int index = r.nextInt(codes.length());
        return codes.charAt(index);
    }

    private BufferedImage createImage () {
        BufferedImage image = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2 = (Graphics2D)image.getGraphics();
        g2.setColor(this.bgColor);
        g2.fillRect(0, 0, w, h);
        return image;
    }

    /**
     * 生成验证码图片
     * @return
     */
    public BufferedImage getImage () {
        BufferedImage image = createImage();
        Graphics2D g2 = (Graphics2D)image.getGraphics();
        StringBuilder sb = new StringBuilder();
        // 向图片中画4个字符
        for(int i = 0; i < 4; i++)  {
            String s = randomChar() + "";
            sb.append(s);
            float x = i * 1.0F * w / 4;
            g2.setFont(randomFont());
            g2.setColor(randomColor());
            g2.drawString(s, x, h-5);
        }
        this.text = sb.toString();
        drawLine(image);
        return image;
    }

    /**
     * 获取验证码文本
     */
    public String getText () {
        return text;
    }

    /**
     * 输出验证码
     * @param image
     * @param out
     * @throws IOException
     */    public static void output (BufferedImage image, OutputStream out)
            throws IOException {
        ImageIO.write(image, "JPEG", out);
    }
}
```

```java
package priv.noby.servlet.sessionTracking;

import priv.noby.servlet.util.VerifyCode;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;

/**
 * 生成随机验证图片和字符
 */
@WebServlet("/verifyCodeNote")
public class VerifyCodeNote extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        VerifyCode verifyCode = new VerifyCode();
        BufferedImage image = verifyCode.getImage();
        String text = verifyCode.getText();
        request.getSession().setAttribute("sessionCode", text);
        VerifyCode.output(image, response.getOutputStream());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```

```java
package priv.noby.servlet.sessionTracking;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

/**
 * 利用cookie记住用户名
 * 利用session传递验证码
 * 利用验证码工具类生成验证码
 */
@WebServlet("/loginNote")
public class LoginNote extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        HttpSession session = request.getSession();
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String userCode = request.getParameter("userCode");

        //利用cookie记住用户名
        Cookie usernameCookie = new Cookie("username", username);
        response.addCookie(usernameCookie);

        //利用session传递验证信息，该session是VerifyCodeServletNote在生成验证图片后写入
        String sessionCode = session.getAttribute("sessionCode").toString();

        if ("noby".equals(username)) {
            if ("123".equals(password)) {
                if (userCode.equalsIgnoreCase(sessionCode)) {
                    response.getWriter().write("欢迎：" + username);
                } else {
                    response.getWriter().write("验证码错误");
                }
            } else {
                response.getWriter().write("密码错误");
            }
        } else {
            response.getWriter().write("该用户未注册");
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}
```

## 页面跳转的其他方式

### 表单隐藏域

```java
package priv.noby.servlet.hidden;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 通过表单隐藏域在页面之间传递数据
 */
@WebServlet("/hiddenServlet")
public class HiddenServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        PrintWriter writer = response.getWriter();
        String newHtml = "<form action=\"/servlet/hiddenServlet2\" method=\"post\">\n" +
                "    问题1：<input type=\"input\" name=\"q1\">\n" +
                "    问题2：<input type=\"input\" name=\"q2\">\n" +
                "    <input type=\"submit\" value=\"下一页\">\n" +
                "</form>";
        writer.write(newHtml);
        writer.close();
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```

```java
package priv.noby.servlet.hidden;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/hiddenServlet2")
public class HiddenServlet2 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        PrintWriter writer = response.getWriter();
        writer.write("<form action=\"/servlet/hiddenServlet3\" method=\"post\">\n");
        writer.write("    <input type=\"hidden\" name=\"q1\" value=\"" + request.getParameter("q1") + "\">\n");
        writer.write("    <input type=\"hidden\" name=\"q2\" value=\"" + request.getParameter("q2") + "\">\n");
        writer.write("    问题3：<input type=\"input\" name=\"q3\">\n");
        writer.write("    问题4：<input type=\"input\" name=\"q4\">\n");
        writer.write("    <input type=\"submit\" value=\"提交\">\n");
        writer.write("</form>\n");
        writer.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```

```java
package priv.noby.servlet.hidden;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/hiddenServlet3")
public class HiddenServlet3 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        String q1 = request.getParameter("q1");
        String q2 = request.getParameter("q2");
        String q3 = request.getParameter("q3");
        String q4 = request.getParameter("q4");
        PrintWriter writer = response.getWriter();
        writer.write("<br>问题1" + q1);
        writer.write("<br>问题2" + q2);
        writer.write("<br>问题3" + q3);
        writer.write("<br>问题4" + q4);
        writer.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```

### Url

```java
package priv.noby.servlet.url;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 通过url实现页面的跳转
 */
@WebServlet("/urlServlet")
public class UrlServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        PrintWriter writer = response.getWriter();
        String page = request.getParameter("page");
        if (page == null) {
            page = "1";
        }

        writer.write("<p>这是第" + page + "页</p>");
        writer.write("<a href='/servlet/urlServlet?page=1'>1</a>");
        writer.write("<a href='/servlet/urlServlet?page=2'>2</a>");
        writer.write("<a href='/servlet/urlServlet?page=3'>3</a>");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```

## HTTP 测试

```
### cookie的创建
GET http://localhost:8080/servlet/cookieNote

### cookie的获取
GET http://localhost:8080/servlet/cookieNote2
```

```
### httpServletNote,get
GET http://localhost:8080/servlet/httpServletNote
### httpServletNote,pot
POST http://localhost:8080/servlet/httpServletNote
```

```
### requestServlet
GET http://localhost:8080/servlet/requestServletNote
```

```
### responseServlet
GET http://localhost:8080/servlet/responseServletNote
```

```
### servlet的生命周期
GET http://localhost:8080/servlet/servletNote
```

```
### servletContext的写入
GET http://localhost:8080/servlet/servletContextNote

### servletContext的获取
GET http://localhost:8080/servlet/servletContextNote2
```

```
### session的写入
GET http://localhost:8080/servlet/sessionNote

### session的获取(可测试sesison的钝化和活化)
GET http://localhost:8080/servlet/sessionNote2
```
