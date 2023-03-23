## Request和Response的概述

==Request是请求对象，Response是响应对象。==这两个对象在我们使用Servlet的时候有看到：![1628735216156](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/1628735216156.png)

此时，我们就需要思考一个问题request和response这两个参数的作用是什么?

![1628735746602](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/1628735746602.png)

* request:==获取==请求数据
  * 浏览器会发送HTTP请求到后台服务器[Tomcat]
  * HTTP的请求中会包含很多请求数据[请求行+请求头+请求体]
  * 后台服务器[Tomcat]会对HTTP请求中的数据进行解析并把解析结果存入到一个对象中
  * 所存入的对象即为request对象，所以我们可以从request对象中获取请求的相关参数
  * 获取到数据后就可以继续后续的业务，比如获取用户名和密码就可以实现登录操作的相关业务
* response:==设置==响应数据
  * 业务处理完后，后台就需要给前端返回业务处理的结果即响应数据
  * 把响应数据封装到response对象中
  * 后台服务器[Tomcat]会解析response对象,按照[响应行+响应头+响应体]格式拼接结果
  * 浏览器最终解析结果，把内容展示在浏览器给用户浏览
* 请求数据和请求参数
  * 请求数据：请求行、请求头、请求体
  * 请求参数：post请求中的请求体和get请求行中的键值对

## request

### 请求数据的获取

```java
package note.request;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

/**
 * post和get分别获取请求的方法
 */
@WebServlet("/requestnote")
public class RequestNote extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //region 获取请求行数据
        //http://localhost:8080/servletMod/requestnote?username=zhangsan HTTP/1.1

        // String getMethod()：获取请求方式： GET
        String method = req.getMethod();
        System.out.println("method = " + method);
        // String getContextPath()：获取虚拟目录(项目访问路径)：/servletMod
        String contextPath = req.getContextPath();
        System.out.println("contextPath = " + contextPath);
        // StringBuffer getRequestURL(): 获取URL(统一资源定位符)：http://localhost:8080/servletMod/requestnote
        StringBuffer url = req.getRequestURL();
        System.out.println("url.toString() = " + url.toString());
        // String getRequestURI()：获取URI(统一资源标识符)： /servletMod/requestnote
        String uri = req.getRequestURI();
        System.out.println("uri = " + uri);


        // String getQueryString()：请求参数（GET方法获取请求行）： username=zhangsan
        String queryString = req.getQueryString();
        System.out.println("queryString = " + queryString);

        //endregion

        //region 获取请求头
        String header = req.getHeader("user-agent");//获取浏览器版本信息
        System.out.println("header = " + header);
        //endregion

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //region 请求参数(post方法获取请求体)
        BufferedReader reader = req.getReader();
        String line = reader.readLine();
        System.out.println("line = " + line);
        //endregion
    }
}
```

```java
package note.request;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Map;

/**
 * get和post通用的获取请求参数的方法
 * 及解决post和get中文乱码问题
 */
@WebServlet("/requestnote2")
public class RequestNote2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //region 获取所有键值对
        System.out.println("get...");
        Map<String, String[]> parameterMap = req.getParameterMap();//获取所有键值对集合
        for (String key : parameterMap.keySet()) {
            System.out.print(key + ":");
            String[] strings = parameterMap.get(key);
            for (String string : strings) {
                System.out.print(string+" ");
            }
            System.out.println();
        }
        //
        endregion

        String[] hobbies = req.getParameterValues("hobby");//获取键值对的值(值为多个)
        System.out.println("Arrays.toString(hobbies) = " + Arrays.toString(hobbies));

        String username = req.getParameter("username");//获取键值对的值(值为单个)

        //region get解决中文乱码 乱码原因：tomcat进行的URL解码，默认的字符集ISO-8859-1
        /*
        该方法也适用于post方法，但是方法没有setCharacterEncoding方便，所以一般使用setCharacterEncoding
         */
        username = new String(username.getBytes("ISO_8859_1"), "utf-8");
        //endregion
        System.out.println("username = " + username);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("post...");

        //region post解决中文乱码 乱码原因：tomcat默认的字符流编码方式为ISO-8859-1
        req.setCharacterEncoding("UTF-8");
        //endregion

        this.doGet(req,resp);
    }
}
```

### 请求转发

```java
package note.request;



import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 请求转发的发起
 * request域的数据存储
 */
@WebServlet("/requestnote3")
public class RequestNote3 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("requestnote3请求转发到requestnote4");
        req.setAttribute("infofromrequestnote3","info");//存储数据到request域中
        req.getRequestDispatcher("requestnote4").forward(req,resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("post...");

        this.doGet(req,resp);
    }
}
```

```java
package note.request;



import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 请求转发的接收
 * request域的数据获取
 * request域的数据的删除
 */
@WebServlet("/requestnote4")
public class RequestNote4 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("requestnote3请求转发  到了requestnote4");
        System.out.println("req.getAttribute(\"infofromrequestnote3\") = " + req.getAttribute("infofromrequestnote3"));//获取request域中的值
        req.removeAttribute("infofromrequestnote3");//删除request域中的键值对
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("post...");

        this.doGet(req,resp);
    }
}
```

## response

### 重定向，响应头，响应行

```java
package note.response;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 重定向的发起
 * 方式1：设置重定向设置响应头和响应行
 * 方式2：重定向的简写方式及动态获取虚拟路径
 */
@WebServlet("/ResponseNote")
public class ResponseNote extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("ResponseNote");
        //region 方式1：重定向设置响应头和响应行
//        response.setStatus(302);//设置响应行的相应码
//        response.setHeader("location","/servletMod/ResponseNote1");//设置相应头的location键值对
        //endregion

        //region 方式2：重定向的简写方式
        String contextPath = request.getContextPath();//获取tomcat的虚拟目录(该目录为动态获取，不受修改目录影响)
        response.sendRedirect(contextPath + "/ResponseNote2");
        //endregion
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```

```java
package note.response;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/ResponseNote2")
public class ResponseNote2 extends HttpServlet {//重定向接收
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("来自ResponseNote的重定向");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```

### 响应体，浏览器获取的响应体乱码

```java
package note.response;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 获取和设置响应体字符数据
 * 解决响应体到浏览器乱码问题的两种方式
 */
@WebServlet("/ResponseNote3")
public class ResponseNote3 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //region 方式1 获取设置响应体，解决乱码问题
//        response.setCharacterEncoding("utf-8");
//        response.setHeader("content-type","text/html");//设置响应头解析html标签
//        PrintWriter writer = response.getWriter();//获取响应体
//        writer.write("你好");//设置响应体
//        writer.write("<h1>假娃</h1>");
        //endregion

        //region 方式2 获取设置响应体，解决乱码问题，简写方式
        response.setContentType("text/html;charset=utf-8");//设置解析html标签，设置编码
        PrintWriter writer = response.getWriter();
        writer.write("你好");
        writer.write("<h1>假娃</h1>");
        //endregion
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```

```java
package note.response;

import org.apache.commons.io.IOUtils;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;

/**
 * 设置响应字节数据
 * 传统方式实现流的对拷
 * 利用commons-io工具实现流的对拷
 */
@WebServlet("/ResponseNote4")
public class ResponseNote4 extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //region 方式1 传统方式实现流的对拷
//        FileInputStream fis = new FileInputStream("D:\\IdeaProjects\\web\\day12_servlet\\src\\main\\resources\\小丑女.jpg");
//        ServletOutputStream os = response.getOutputStream();
//        byte[] buff = new byte[1024];
//        int len = 0;
//        while ((len = fis.read(buff)) != -1) {
//            os.write(buff, 0, len);
//        }
//        fis.close();
        //endregion

        //region 方式2 引入commons-io工具实现流的对拷
//        <dependency>
//            <groupId>commons-io</groupId>
//            <artifactId>commons-io</artifactId>
//            <version>2.6</version>
//        </dependency>
        FileInputStream fis = new FileInputStream("D:\\IdeaProjects\\web\\day12_servlet\\src\\main\\resources\\小丑女.jpg");
        ServletOutputStream ops = response.getOutputStream();
        IOUtils.copy(fis, ops);//利用外部工具实现流的对拷(输入流，输出流)

        fis.close();//这个是自己创建的流，不能通过tomcat调用servlet接口中的destroy方法关闭
        //endregion
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```























## 会话管理

### 任务1：实现图书商城管理员登录功能

登录成功，将用户信息保存在会话中，进入网站后台管理首页（在后台首页显示用户信息）；

登录失败，重定向到登录页面；

使用技术：HttpSession

### 任务2：实现图书商城管理员登录功能

登录成功，将用户信息保存在Cookie中，进入网站后台管理首页（在后台首页显示用户信息）；

登录失败，重定向到登录页面；

使用技术：Cookie

### 任务3：实现图书分类列表功能，效果图如下：

![image-20220324181610105](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/202203241816107.png)

点击删除按钮，将分类信息删除。

















```
//确保SqlSession对象是线程安全的
private static ThreadLocal<SqlSession> threadLocal = new ThreadLocal<SqlSession>();
```
