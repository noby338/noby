---
title: day06 HTTP协议和Tomcat服务器
icon: write
category:
    - JavaWeb
tag:
    - JavaWeb
    - HTTP
    - Tomcat
sticky: false
star: false
article: true
timeline: true
---

## HTTP 协议

- HTTP 协议:(HyperText Transfer Protocol) 超文本传输协议，规定了浏览器和服务器之间数据传输的规则
- HTTP 协议特点
    - 基于 TCP 协议: TCP 是一种面向连接的 (建立连接之前是需要经过三次握手)、可靠的、基于字节流的传输层通信协议，在数据传输方面更安全。
    - 基于请求 - 响应模型的: 一次请求对应一次响应，请求和响应是一一对应关系
    - HTTP 协议是无状态协议: 对于事物处理没有记忆能力。每次请求 - 响应都是独立的，无状态指的是客户端发送 HTTP 请求给服务端之后，服务端根据请求响应数据，响应完后，不会记录任何信息。这种特性有优点也有缺点，
        - 缺点: 多次请求间不能共享数据
        - 优点: 速度快
- http://www.baidu.com/index.htm
    - RESTful 请求方式
        - GET 查
        - POST 增
        - PUT 改
        - DELETE 删
    - http://：协议
    - www.baidu.com：主机地址和端口号
        - 可以通过电脑设置的 DNS 服务器找到主机地址和端口号

### 请求数据的格式

- GET/HTTP/1.1
- 请求数据的组成
    - 请求行
        - 解释：HTTP 请求中的第一行数据，请求行包含三块内容，分别是 GET[请求方式] /[请求 URL 路径] HTTP/1.1[HTTP 协议及版本]
        - 组成：https://host:port/path?xxx=aaa&ooo=bbb
            - http/https：协议类型
            - https://host:port/path?xxx=aaa&ooo=bbb：url
                - host: 服务器的 IP 地址或者域名
                - port:HTTP 服务器的默认端口是 80，这种情况下端口号可以省略。
                - path: 访问资源的路径
                - ? :url 里面的?这个符号是个分割线，用来区分问号前面的是 path，问号后面的是参数
                - url-params: 问号后面的是请求参数，格式：xxx=aaa，如图 4 区域就是请求参数
                - &：多个参数用&符号连接
            - POST/GET：请求方式
    - 请求头
        - 解释：第二行开始，格式为 key: value 形式，请求头中会包含若干个属性，常见的 HTTP 请求头有:
        - 常用的请求头：
            - Host: 表示请求的主机名
            - User-Agent: 浏览器版本,例如 Chrome 浏览器的标识类似 Mozilla/5.0 …Chrome/79，IE 浏览器的标识类似 Mozilla/5.0 (Windows NT …)like Gecko；
            - Accept：表示浏览器能接收的资源类型，如 `text/*`，`image/*` 或者 `*/*` 表示所有；
            - Accept-Language：表示浏览器偏好的语言，服务器可以据此返回不同语言的网页；
            - Accept-Encoding：表示浏览器可以支持的压缩类型，例如 gzip, deflate 等。
    - 请求体
        - 解释：请求体：POST 请求的最后一部分，存储请求参数
- GET 请求和 POST 请求区别：
    - get
        - 没有请求体，请求参数存放在请求行中
        - 请求参数显示在浏览器地址栏中可见，相对不安全
        - 请求数据大小有限制 (4k)
        - 只能发送文本数据
        - 封装和解析快
    - post
        - 有请求体，请求参数存放在请求体中
        - 请求参数在浏览器地址栏中不可见，相对安全
        - 请求数据大小没有限制
        - 可以发送非文本数据
        - 封装和解析相对慢

### 响应数据的格式

```html
  HTTP/1.1 200 OK
  Server:Tengine
  Content-Type:text/html
  Transfer-Encoding:chunked...

  <html>
  <head>
  <title></title>
  </head>
  </html>
```

- 响应数据
    - 响应行：
        - 解释：响应数据的第一行,响应行包含三块内容，分别是 HTTP/1.1[HTTP 协议及版本] 200[响应状态码] ok[状态码的描述]
        - 组成：
            - HTTP 协议及版本
            - 200[响应状态码]
                - 常用的状态码：
                    - 200 ok 客户端请求成功
                    - 404 Not Found 请求资源不存在
                    - 500 Internal Server Error 服务端发生不可预期的错误
    - 响应头
        - 解释：第二行开始，格式为 key：value 形式
        - 常见的响应头:
            - Content-Type：表示该响应内容的类型，例如 text/html，image/jpeg；
            - Content-Length：表示该响应内容的长度（字节数）；
            - Content-Encoding：表示该响应压缩算法，例如 gzip；
            - Cache-Control：指示客户端应如何缓存，例如 max-age=300 表示可以最多缓存 300 秒
    - 响应体： 最后一部分。存放响应数据
        - `<html>…</html>` 这部分内容就是响应体，它和响应头之间有一个空行隔开。

## Tomcat

- Web 服务器是一个应用程序，对 HTTP 协议的操作进行封装，使得程序员不必直接对协议进行操作，让 Web 开发更加便捷。主要功能是 " 提供网上信息浏览服务 "。
- Web 服务器的作用
    - 封装 HTTP 协议操作，简化开发
    - 可以将 Web 项目部署到服务器中，对外提供网上浏览服务
- Tomcat 的相关概念:
    - Tomcat 是 Apache 软件基金会一个核心项目，是一个开源免费的轻量级 Web 服务器，支持 Servlet/JSP 少量 JavaEE 规范。
    - 概念中提到了 JavaEE 规范，那什么又是 JavaEE 规范呢?
        - JavaEE: Java Enterprise Edition,Java 企业版。指 Java 企业级开发的技术规范总和。包含 13 项技术规范:JDBC、JNDI、EJB、RMI、JSP、Servlet、XML、JMS、Java IDL、JTS、JTA、JavaMail、JAF。
    - 因为 Tomcat 支持 Servlet/JSP 规范，所以 Tomcat 也被称为 Web 容器、Servlet 容器。Servlet 需要依赖 Tomcat 才能运行。
    - Tomcat 的官网: https://tomcat.apache.org/ 从官网上可以下载对应的版本进行使用。

### 目录结构

- bin：Tomcat 指令，用来启动和关闭 Tomcat 服务 (可执行文件)
- conf：存放的配置文件，配置服务器的端口号，用户名，密码 (配置文件)
- logs：存放的 jar 包，类库文件如：servlet-api.jar(tomcat 依赖的 jar 包)
- webapps：应用的目录 (应用发布的目录)
- work：工作目录，jsp 翻译，编译之后的文件存放地址 (工作目录)

### 安装使用

- 下载：http://tomcat.apache.org/
- 安装：解压压缩包即可。
- 卸载：删除目录就行了
- 启动：
    - bin/startup.bat,双击运行该文件即可
    - 访问：浏览器输入：
        - http://localhost:8080 访问自己
        - http://别人的 ip:8080 访问别人
    - 可能遇到的问题：
        - 黑窗口一闪而过：
            - 原因：没有正确配置 JAVA_HOME 环境变量
            - 解决方案：正确配置 JAVA_HOME 环境变量
        - 启动报错：
            - 找到占用的端口号，并且找到对应的进程，杀死该进程 netstat-and
            - 修改自身的端口号
                - conf/server.xml
          (Connector port="8888" protocol="HTTP/1.1"
          connectionTimeout="20000"
          redirectPort="8445"/>
          一般会将 tomcat 的默认端口号修改为 80。80 端口号是 http 协议的默认端口号。
                    - 好处：在访问时，就不用输入端口号
- 关闭
    - 正常关闭：
        - bin/shutdown.bat
    - 强制关闭：
        - 点击启动窗口的 ×
        - ctrl+C
- 配置
    - 修改端口
        - Tomcat 默认的端口是 8080，要想修改 Tomcat 启动的端口号，需要修改 conf/server.xml ![image-20220321174832918](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220321174832918.png)
            - HTTP 协议默认端口号为 80，如果将 Tomcat 端口号改为 80，则将来访问 Tomcat 时，将不用输入端口号。
- 部署项目的方式：
    - 直接将项目放到 webapps 目录下即可。
        - /hello：项目的访问路径 -->虚拟目录
        - 简化部署：将项目打成一个 war 包，再将 war 包放置到 webapps 目录下。war 包会自动解压缩
    - 配置 conf/server.xml 文件
        - 在 `<Host>` 标签体中配置 `<Context docBase="D:\hello" path="/hehe" />`
            - docBase: 项目存放的路径
            - path: 虚拟目录
    - 在 `conf\Catalina\localhost` 创建任意名称的 xml 文件。在文件中编写 `<Context docBase="D:\hello" />`
    - 虚拟目录：xml 文件的名称
        - 静态项目和动态项目：
            - 目录结构
                - java 动态项目的目录结构：
                    - 项目的根目录
                        - WEB-INF 目录：
                            - web.xml：web 项目的核心配置文件
                            - classes 目录：放置字节码文件的目录
                            - lib 目录：放置依赖的 jar 包
