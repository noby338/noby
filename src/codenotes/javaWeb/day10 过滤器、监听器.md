---
title: day10 过滤器、监听器
icon: write
category:
    - JavaWeb
tag:
    - JavaWeb
sticky: false
star: false
article: true
timeline: true
---

## 过滤器


- 在 Java 后端开发中，过滤器（Filter）是一种用于拦截请求和响应的组件，可以用于对请求进行预处理、对响应进行后处理，以及实现请求和响应的过滤和转换等操作。通常情况下，过滤器用于在请求到达 Servlet 之前或响应被发送到客户端之前，对请求或响应进行某些操作。如字符编码过滤器、登录验证过滤器、权限控制过滤器、异常处理过滤器。
- 拦截器的拦截顺序为拦截器类名的自然排序

```java
package priv.noby.filter.filter;  
  
import javax.servlet.*;  
import javax.servlet.annotation.*;  
import java.io.IOException;  
  
/**  
 * 资源的过滤（可以拦截servlet和其他资源文件）  
 *  
 * /a.jsp"表示拦截某一特定文件  
 * /filterdir/*"表示拦截该路径下的所有资源(其子目录下的资源也可以拦截)  
 * /dServlet"拦截某一特定servlet  
 * /*.html"拦截所有html文件  
 * /*拦截所有资源  
 *  
 * @author Noby  
 * @since 2023/3/25 18:46  
 */@WebFilter(filterName = "FilterNoteFilter",value = {"/a.jsp","/filterdir/*","/dServlet","*.html"})  
public class FilterNoteFilter implements Filter {  
    public void init(FilterConfig config){  
        //在初始化容器的使用已经执行  
        System.out.println("FilterInit");  
    }  
  
    public void destroy() {  
    }  
    @Override  
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {  
        /*  
        执行顺序：  
        放行前一般处理request数据...  
        访问a.jsp资源...  
        访问完资源之后还会回到filter执行chain.doFilter()后面的语句  
        放行后一般处理response数据...  
         */        System.out.println("放行前一般处理request数据...");  
        chain.doFilter(request, response);//放行（没有该语句则不能访问到资源）  
        System.out.println("放行后一般处理response数据...");  
    }  
}
```

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>  
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>  
<html>  
<head>  
    <title>a</title>  
</head>  
<body>  
ajsp  
<%  
    System.out.println("访问a.jsp资源...");  
%>  
</body>  
</html> 
```

## 监听器

- 在 Java 后端开发中，监听器（Listener）是一种用于监听 Web 应用程序中的事件的组件。通过监听器，我们可以在 Web 应用程序的生命周期中，捕获和处理各种事件。监听器通常用于实现某些特定功能或提供一些服务，例如：在 Web 应用程序启动时加载某些资源或初始化一些参数、在 Session 创建时保存用户登录信息、在 ServletContext 销毁时释放资源等等。监听器可以在 Web 应用程序的 Web.xml 文件中进行配置，可以在多个 Servlet 或 JSP 之间共享，也可以通过注解方式进行配置。
- 分类
    - ServletContextListener 用于对 ServletContexti 对象进行监听（创建、销毁）
    - ServletContextAttributeListener 对 ServletContexti 对象中属性的监听（增删改属性）
    - HttpSessionListener 对 Session 对象的整体状态的监听（创建、销毁）
    - HttpSessionAttributeListener 对 Session 对象中的属性监听（增删改属性）
    - HttpSessionBindingListener 监听对象于 Session 的绑定和解除
    - HttpSessionActivationListener 对 Session 数据的钝化和活化的监听
    - ServletRequestListener 对 Requesti 对象进行监听（创建、销毁）】
    - ServletRequestAttributeListener 对 Requesti 对象中属性的监听（增删改属性）

```java
package priv.noby.listener.listener;  
  
import priv.noby.listener.model.User;  
  
import javax.servlet.ServletContext;  
import javax.servlet.annotation.WebListener;  
import javax.servlet.http.HttpSession;  
import javax.servlet.http.HttpSessionEvent;  
import javax.servlet.http.HttpSessionListener;  
import java.util.HashMap;  
  
/**  
 * 通过监听器监听session的状态，当session移除时，同时移除ServletContext中的该用户  
 *   
* @author Noby  
 * @since 2023/3/25 19:20  
 */@WebListener  
public class MyHttpSessionListener implements HttpSessionListener {  
    public void sessionCreated(HttpSessionEvent httpSessionEvent) {  
  
    }  
    /**  
     * 当session被销毁时执行  
     * @param httpSessionEvent  
     */  
    public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {  
        HttpSession session = httpSessionEvent.getSession();  
        User user = (User)session.getAttribute("user");  
        ServletContext servletContext = session.getServletContext();  
        HashMap<String,User> map = (HashMap<String,User>)servletContext.getAttribute("map");  
        if (user != null) {  
            map.remove(user.getUsername());  
        }  
    }  
}
```

```java
package priv.noby.listener.listener;  
  
import priv.noby.listener.model.User;  
  
import javax.servlet.ServletContext;  
import javax.servlet.ServletContextEvent;  
import javax.servlet.ServletContextListener;  
import javax.servlet.annotation.WebListener;  
import java.util.HashMap;  
  
/**  
 * ServletContext初始化设置一个ServletContext属性用于存储所有登陆的用户  
 *  
 * @author Noby  
 * @since 2023/3/25 19:20  
 */@WebListener  
public class MyServletContextListener implements ServletContextListener {  
    /**  
     * 当服务器启动时执行  
     * @param servletContextEvent  
     */  
    public void contextInitialized(ServletContextEvent servletContextEvent) {  
        HashMap<String, User> map = new HashMap<>();  
        ServletContext servletContext = servletContextEvent.getServletContext();  
        servletContext.setAttribute("map",map);  
    }  
  
    public void contextDestroyed(ServletContextEvent servletContextEvent) {  
  
    }
}
    ```

```java
package priv.noby.listener.servlet;  
  
import priv.noby.listener.model.User;  
import priv.noby.listener.service.UserService;  
  
import javax.servlet.ServletContext;  
import javax.servlet.ServletException;  
import javax.servlet.annotation.WebServlet;  
import javax.servlet.http.HttpServlet;  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
import javax.servlet.http.HttpSession;  
import java.io.IOException;  
import java.util.Map;  
  
@WebServlet("/loginServlet")  
public class LoginServlet extends HttpServlet {  
    private UserService userService = new UserService();  
  
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {  
        request.setCharacterEncoding("utf-8");  
        HttpSession session = request.getSession();  
        ServletContext servletContext = this.getServletContext();//this表示当前servlet对象  
        //这里的map已经在监听器初始化的时候创建了  
        Map<String, User> map = (Map<String, User>) servletContext.getAttribute("map");  
        String op = request.getParameter("op");  
        if ("login".equals(op)) {  
            User user = userService.login(request.getParameter("username"), request.getParameter("password"));  
            if (user != null) {  
                session.setAttribute("user", user);  
                session.setMaxInactiveInterval(180);//会话超时后销毁该session，单位为秒  
                map.put(user.getUsername(), user);  
                response.sendRedirect("/listener/login_list.jsp");  
            } else {  
                response.sendRedirect("/listener/login.html");  
            }  
        } else if ("out".equals(op)) {  
            User user = (User) session.getAttribute("user");  
            if (user != null) {  
                map.remove(user.getUsername());  
                //当session被销毁时，自动调用监听器移除map中的该用户  
                session.invalidate();  
                response.sendRedirect("/listener/login_list.jsp");  
            }  
        }  
    }  
  
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        this.doPost(request, response);  
    }  
}
```

```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>login</title>  
</head>  
<body>  
用户登录  
<form action="/listener/loginServlet" method="post">  
    <input type="hidden" name="op" value="login">  
    用户名：<input type="text" name="username" value="kace">  
    密码：<input type="password" name="password" value="1"><br>  
    <input type="submit" value="登录">  
</form>  
</body>  
  
</html>
```

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>  
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
  
<html>  
<head>  
    <title>login_list</title>  
</head>  
<body>  
<a href="${pageContext.request.contextPath}/login.html"><h1>登录</h1></a>  
<h1>当前用户</h1>  
<c:if test="${sessionScope.user!=null}">  
    <h2>欢迎${sessionScope.user.username}访问网站<a href="${pageContext.request.contextPath}/loginServlet?op=out">退出</a></h2>  
</c:if>  
<br>  
  
<h1>用户列表</h1>  
<c:if test="${not empty applicationScope.map}">  
    <ul>  
        <c:forEach items="${applicationScope.map}" var="entry">  
            <li>  
                ${entry.key}  
            </li>  
        </c:forEach>  
    </ul>  
</c:if>  
  
</body>  
</html>
```
