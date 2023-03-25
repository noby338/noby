---
title: day08 JSP、EL、JSTL
icon: write
category:
  - JavaWeb
  - JSP
tag:
  - JavaWeb
  - JSP
  - EL
  - JSTL
  - 页面复用
sticky: false
star: false
article: true
timeline: true
---
## 介绍

- JSP、EL（Expression Language）、JSTL（JavaServer Pages Standard Tag Library）是 Java Web 应用程序中常用的三种技术，它们的关系如下：
  1.  JSP 是一种动态网页技术，它允许在 HTML 页面中嵌入 Java 代码，以便在 Web 服务器上动态生成页面内容。
  2.  EL 是一种表达式语言，它可以在 JSP 页面中直接访问 Java 对象和变量，以便更方便地处理数据和执行业务逻辑。
  3.  JSTL 是一种标签库，它提供了一组常用的自定义标签，可以在 JSP 页面中使用，以便更方便地处理数据和控制页面输出。
- 在 Java Web 应用程序中，通常会同时使用 JSP、EL 和 JSTL 这三种技术，以便更方便地完成 Web 应用程序的开发和维护。具体来说，JSP 页面可以使用 EL 表达式访问 Java 对象和变量，以便更方便地显示和处理数据；同时，JSTL 标签库可以使用 EL 表达式作为参数，以便更方便地控制标签的行为和输出结果。综合使用 JSP、EL 和 JSTL 这三种技术，可以大大提高 Java Web 应用程序的开发效率和维护性。

* 注释区别
  - HTML 注释 `<!-- HTML注释，静态资源，浏览器显示 -->`
  - JSP 注释 `<%-- JSP注释，动态资源，浏览器不显示 --%>`
* JSP 的组成
  - 静态资源
    - html
  - Java 脚本
    - Java 脚本 `<% 逻辑代码 %>`
    - 表达式 `<%=输出 %>`
    - 声明 `<%! 类中的代码 %>`
  - JSP 标签:
    - 动作
      - `<jsp:include page="/footer.jsp"/>`
    - 指令
      - `<%@指令名 属性="属性值"%>`
* EL
  - 用于简化输出操作
  - el 函数库需要导入`/jstl/function`标签库
* JSTL
  - 用于逻辑代码的书写
  - jstl 需要导入`/jstl/core`标签库

## Jsp

```jsp
<%@ page import="java.util.Date" %><%-- <%@ %>表示指令，引入java的包 --%><%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
         language="java" errorPage="ExceptionNote.jsp" %><%--该jsp的页面编码解码格式为utf-8，支持的脚本语言为java--%>
<%--errorPage="ExceptionNote.jsp"表示异常后跳转的页面--%>
<html>
<head>
    <title>JspNote</title>
</head>
<body>

<%--动作,在jsp中引入其他页面，路径为服务器路径，同步方式--%>
<%--<jsp:include page="/HeaderAndFooterServlet?method=getHeader"/>--%>
<%--动作,在jsp中引入其他页面，路径为服务器路径，异步方式--%>
<jsp:include page="/footer.jsp"/>
<br>

<%--jsp本质上为一个servlet类，其java源代码位于target\tomcat\work\Tomcat\localhost\jsp\org\apache\jsp\JspNote_jsp.java--%>

<%--java脚本，里面存放java代码（java方法中的代码书写方式）--%>
<%
    //java的对象需要使用page指令的import属性导包
    Date date = new Date();
    //response为jsp的内置对象
    response.getWriter().write(String.valueOf(date) + "<br/>");
    System.out.println("java对象" + date);

    //region jsp九大内置对象(JSP中特有的域：Page、PageContext)
    //page 就是this
    response.getWriter().write("page==this:" + (page == this) + "<br/>");
    //request
    request.setAttribute("requestAttr", "request内置对象");
    //response
    response.getWriter().write("response内置对象<br/>");
    //session
    session.setAttribute("sessionAttr", "session内置对象");
    //application ServletContext
    application.setAttribute("applicationAttr", "application内置对象");
    //out JspWriter    字符流
    out.write("out内置对象<br/>");
    //config ServletConfig
    out.write(config.getServletName() + "<br/>");
    //exception
    if (false) {
        throw new RuntimeException("出现异常");
    }
    //pageContext 其他的八个jsp内置对象都可以通过pageContext对象操作(只演示了5个)
    // page,request,session,ServletContext 为jsp的域属性
    // request,session,ServletContext 为servlet的域属性
    pageContext.setAttribute("pageContextAttr", "pageContext内置对象");
    pageContext.setAttribute("pageContextAttr", "pageContext内置对象 PAGE_SCOPE", PageContext.PAGE_SCOPE);
    pageContext.setAttribute("pageContextAttr", "pageContext内置对象 REQUEST_SCOPE", PageContext.REQUEST_SCOPE);
    pageContext.setAttribute("pageContextAttr", "pageContext内置对象 SESSION_SCOPE", PageContext.SESSION_SCOPE);
    pageContext.setAttribute("pageContextAttr", "pageContext内置对象 APPLICATION_SCOPE", PageContext.APPLICATION_SCOPE);

    //page和request域可通过该方式调用，page>request的顺序查找
    out.write(pageContext.getAttribute("pageContextAttr").toString() + "<br/>");

    out.write(pageContext.getAttribute("pageContextAttr", PageContext.REQUEST_SCOPE).toString() + "<br/>");
    out.write(pageContext.getAttribute("pageContextAttr", PageContext.SESSION_SCOPE).toString() + "<br/>");
    out.write(pageContext.getAttribute("pageContextAttr", PageContext.APPLICATION_SCOPE).toString() + "<br/>");

    //全域查找，通过 page>pageContext>request>session>application 的顺序查找
    out.write(pageContext.findAttribute("pageContextAttr").toString());

%>
<%--声明，相当于该JspNote_jsp类的成员变量与成员方法（java类中的代码书写方式）--%>
<%!
    private static int count = 1;

    public static int getCount() {
        return count++;
    }
%>
<%--表达式，主要用于页面的输出操作--%>
<%=
"<h1>第 " + getCount() + " 次访问页面</h2>"
%>


<%--静态资源和java脚本嵌套使用--%>
<table>
    <%
        for (int i = 1; i <= 3; i++) {
    %>
    <tr>
        <td>
            <%="times" + i %>
        </td>
        <td>
            <%=i %>
        </td>
    </tr>
    <%} %>
</table>

</body>
```

```jsp
<%--这是一个同步的复用页面，需要来自servlet的转发--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>header.jsp</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.min.js"></script><%--用于下拉菜单--%>
    <script src="js/bootstrap.min.js"></script>
</head>
<body>
    ${info}
</body>
</html>
```

```jsp
<%--这是一个异步的复用页面，直接调用该页面，无需先接收servlet转发--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>footer</title>
    <script>
        $(function () {
            $.get("HeaderAndFooterServlet",
            {"method":"getFooter"},
            function (result) {
                $("#footer").append(result);
            })
        })
    </script>
</head>

<body>
<div id="footer"></div>
</body>
</html>
```

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" isErrorPage="true" %><%--错误跳转的目标页面必须使用isErrorPage="true"属性--%>
<html>
<head>
    <title>Title</title>
</head>
<body>
<h1>这是错误跳转的目标页面</h1>
<%out.write(exception.getMessage());%>
</body>
</html>
```

```java
package priv.noby.jsp.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Method;

/**
 * 利用反射实现简化Servlet的书写
 * 所有的Servlet都继承该BaseServlet
 * * @author Noby
 * @since 2023/3/25 16:47
 */public class BaseServlet extends HttpServlet {
    @Override
    public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //响应乱码
        response.setContentType("text/html;charset=UTF-8");
        //post请求乱码
        request.setCharacterEncoding("UTF-8");
        //获取method参数，这个参数决定调用哪个方法
        String methodName = request.getParameter("method");
        Method method;

        try {
            //在当前Servlet中查找指定的方法
            method = this.getClass().getMethod(methodName, HttpServletRequest.class, HttpServletResponse.class);
        } catch (Exception e) {
            throw new RuntimeException(methodName + "方法未定义！", e);
        }

        try {
            //调用方法，返回字符串
            String result = (String) method.invoke(this, request, response);
            if (result != null && !result.trim().isEmpty()) {
                //获取:下标位置
                int index = result.indexOf(":");
                if (index == -1) {
                    //没有，默认就是转发
                    request.getRequestDispatcher(result).forward(request, response);
                } else {
                    //start就是:前面的单词
                    String start = result.substring(0, index);
                    //path就是:后面的路径
                    String path = result.substring(index + 1);
                    if (start.equals("f")) {
                        // f:开头就转发
                        request.getRequestDispatcher(path).forward(request, response);
                    } else if (start.equals("r")) {
                        // r:开头就重定向
                        response.sendRedirect(request.getContextPath() + path);
                    }
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
```

```java
package priv.noby.jsp.servlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 用于页面的复用
 *
 * @author Noby
 * @since 2023/3/25 17:50
 */@WebServlet("/HeaderAndFooterServlet")
public class HeaderAndFooterServlet extends BaseServlet {
    public String getHeader(HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("info","---------这是一个同步的复用页面header----------");
        return "f:/header.jsp";
    }

    public String getFooter(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.getWriter().write("---------这是一个异步的复用页面footer----------");
        return null;    }
}
```

## EL

```jsp
<%--EL表达式主要用于简化JSP中的各种输出操作--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--taglib 为引入第三方标签库的指令，prefix为该标签指定别名（在调用时使用），uri为该标签的使用具体规则，使用前必须同时引入jstl--%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%--/jstl/core为jstl核心--%>
<%--/jstl/function为el函数库--%>

<html>
<head>
    <title>ELNote</title>
</head>
<body>
<%--模拟来自servlet的域对象--%>
<%
    request.setAttribute("info", "requestInformation");
    session.setAttribute("info", "sessionInformation");
    application.setAttribute("info", "applicationInformation");
%>
<%--EL的11个内置对象--%>
${info}<br><%--全域查找：会按照四大域从小到大查找该属性 注意${"info"}表示的是输出字符串"info"--%>
\${info}表示转译<br>
${requestScope.info}<br><%--${}即为EL的输出方式，等用于jsp中的<%= %>标签}--%>
${sessionScope.info}<br>
${applicationScope.info}<br>
<hr>
<%--EL运算符--%>
${not empty info}
<%--
    /或div
    %或mod
    ==或eq
    !=或ne
    <或lt
    >或gt
    <=或le
    >=或ge
    &&或and
    !或not
    ||或or
    empty--%>

    <hr>
    <%--EL一共11个内置对象。这11个内置对象中有10个是Map类型的，最后一个是pageContext对象--%>
<%--
    pageScope 取page域中的值
    requestScope 取request域中的值
    sessionScope 取session域中的值
    applicationScope 取servletContext域中的值
    ${xxxScope.key} 查找指定域
    ${key} 全域 查找
    param 获取请求参数的值
    paramValues 一个请求参数key有多个值
    header 获取请求头的值
    headerValues 获取请求头的值，一个头名对应多个头值
    initParam 获取SerlvetContext初始化参数
    cookie 获取Cookie的值
    pageContext 获取其它内置对象
--%>


    <a href="ELNote.jsp">ELNote.jsp</a><br/>
    <%--jsp中不建议直接使用绝对路径--%>
    <a href="/jsp/ELNote.jsp">ELNote.jsp</a><br/>
    <!-- 绝对路径的灵活写法 -->
    <a href="<%=request.getContextPath() %>/ELNote.jsp">ELNote.jsp</a><br/>
    <a href="<%=((HttpServletRequest)pageContext.getRequest()).getContextPath()%>/ELNote.jsp">ELNote.jsp</a>
    <a href="${pageContext.request.contextPath}/ELNote.jsp">ELNote.jsp</a>
    <%--利用jstl--%>
    <a href="<c:url value='/ELNote.jsp'/>">ELNote.jsp</a><br/>
    <hr>

    <%--EL函数库（使用前导入jstl的jar包和jsp标签库）--%>
    ${fn:toUpperCase("java")}<%--表示使用fn标签中的toUpperCase()方法--%>
<%--
        String toUpperCase(String input)：
        String toLowerCase(String input)：
        int indexOf(String input, String substring)：
        boolean contains(String input, String substring)：
        boolean containsIgnoreCase(String input, String substring)：
        boolean startsWith(String input, String substring)：
        boolean endsWith(String input, String substring)：
        String substring(String input, int beginIndex, int endIndex)：
        String substringAfter(String input, String substring)：
        substringBefore(String input, String substring)：
        String escapeXml(String input)       对标签转义，显示原样字符，不显示标签效果
        String trim(String input)：
        String replace(String input, String substringBefore, String substringAfter)：
        String[] split(String input, String delimiters)：
        int length(Object obj)：
        String join(String array[], String separator)： 拼接
--%>
    <hr>
</body>
</html>
```

## JSTL

```jsp
<%--JSTL主要用于if条件判断，循环等--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--/jstl/core为jstl核心--%>
<%--/jstl/function为el函数库--%>

<html>
<head>
    <title>JSTLNote</title>
</head>
<body>
<hr>
<%--通过jstl实现条件判断及循环--%>
<%--模拟来自servlet的request域--%>
<%
    String[] names = {"noby", "kace", "july"};
    request.setAttribute("names", names);
%>

<%--条件判断语句--%>
<c:if test="${not empty names}">
    <%--增强for循环语句--%>
    <c:forEach var="name" items="${names}">
        ${name}
    </c:forEach>
</c:if>
<hr>

<%--for循环--%>
<c:forEach var="i" begin="0" end="2" step="1">
    ${names[i]}
</c:forEach>

<hr>
<%--赋值语句--%>
<c:set var="score" value="56"/>
<%--删除域中属性--%>
<%--<c:remove var="score" scope="page"/>--%>
<%--out输出语句--%>
<c:out value="${score}"/><br/>

<hr>
<%--选择语句--%>
<c:choose>
    <c:when test="${100 >= score and score > 90}">优秀</c:when>
    <c:when test="${90 >= score  and score > 70}">良好</c:when>
    <c:when test="${70 >= score  and score > 60}">及格</c:when>
    <c:when test="${score < 60 and score >= 0}">不及格</c:when>
    <c:otherwise>无效成绩</c:otherwise>
</c:choose>

<hr>
<%--c:url路径--%>
<a href="<c:url value='/JSTLNote.jsp'/>">JSTLNote.jsp</a><br/>
</body>
</html>
```
