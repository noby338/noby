---
title: day09 异步请求、AJAX、AXIOS
icon: write
category:
  - JavaWeb
tag:
  - JavaWeb
  - 异步请求
  - 同步请求
  - AJAX
  - AXIOS
sticky: false
star: false
article: true
timeline: true
---
### 同步请求和异步请求

- 同步：
  - 特点
    - 一个请求发出后，客户端在未收到该请求的响应之前不能发送第二个请求，需要等待服务器的响应。中间的时间只能等待。
    - 刷新的是整个页面！给用户带来不好的体验
  - 过程
    - 浏览器发送同步请求给 servlet，servlet 调用 service 及 dao 获取数据，并将数据存储进 request 域对象中转发给 jsp，web 容器将 jsp 解析为 servlet_jsp.java 文件，该文件专用于生成展示了 request 域对象中的 html，服务器将该 html 响应给浏览器，浏览器接收到响应，渲染该 html。
- 异步(asynchronous javascript and xml)：
  - 特点
    - 发一个请求后，客户端无需等待服务器的响应，然后就可以发出第二个请求！
    - 可以使用 js 接收服务器的响应，然后使用 js 来局部刷新！
  - 过程
    - HTML 中的 js 发送异步请求给 servlet，servlet 调用 service 及 dao 获取数据，servlet 将数据封装成为 json 格式响应给客户端，客户端获取到 json 后通过操作 dom 实现 html 页面结构和内容的更新。
  - 使用步骤(通过 js)
    1. XMLHttpRequest 对象创建
    2. XMLHttpRequest.open(请求方式,请求路径,是否使用同步请求)建立与服务器的连接
    3. XMLHttpRequest.send("post 请求的请求参数")发送异步请求
    4. 通过回调函数获取响应
       - readyState 表示 XMLHttpRequest 对象的状态
         1. 0 状态：XMLHttpRequest 对象刚创建，还没有调用 open()方法；
         2. 1 状态：请求开始，调用了 open()方法，但还没有调用 send()方法
         3. 2 状态：调用完了 send()方法，还未开始响应；
         4. 3 状态：服务器已经开始响应，但不表示响应结束了！
         5. 4 状态：服务器响应结束！(通常我们只关系这个状态！！！)


## AJAX

- Ajax（Asynchronous JavaScript and XML）是一种在 Web 应用程序中使用的技术，它可以在不重新加载整个页面的情况下与 Web 服务器进行异步通信，以便更方便地更新页面内容和执行各种动态操作。具体来说，Ajax 通过在页面中使用 JavaScript 和 XMLHttpRequest 对象，可以在后台与 Web 服务器进行数据交换，并将结果更新到页面中的特定区域，而不需要重新加载整个页面。
- 使用 Ajax 技术，可以大大提高 Web 应用程序的用户体验，例如实现即时搜索、无刷新更新数据、实时聊天等功能。除了 JavaScript 和 XMLHttpRequest 外，还有许多基于 Ajax 技术的 JavaScript 库和框架，如 jQuery、AngularJS、React 等，它们可以帮助开发者更方便地使用 Ajax 实现各种功能。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>欢迎注册</title>
    <link href="css/register.css" rel="stylesheet">
</head>
<body>

<div class="form-div">
    <div class="reg-content">
        <h1>欢迎注册</h1>
        <span>已有账号？</span> <a href="login.html">登录</a>
    </div>
    <form id="reg-form" action="#" method="get">

        <table>

            <tr>
                <td>用户名</td>
                <td class="inputs">
                    <input name="username" type="text" id="username">
                    <br>
                    <span id="username_err" class="err_msg" style="display: none">用户名已存在</span>
                </td>

            </tr>

            <tr>
                <td>密码</td>
                <td class="inputs">
                    <input name="password" type="password" id="password">
                    <br>
                    <span id="password_err" class="err_msg" style="display: none">密码格式有误</span>
                </td>
            </tr>


            <tr>
                <td>验证码</td>
                <td class="inputs">
                    <input name="checkCode" type="text" id="checkCode">
                    <img src="imgs/a.jpg">
                    <a href="#" id="changeImg">看不清？</a>
                </td>
            </tr>

        </table>

        <div class="buttons">
            <input value="注 册" type="submit" id="reg_btn">
        </div>
        <br class="clear">
    </form>

</div>

<script src="js/axios-0.18.0.js"></script>
<script>
    //region Ajax方法
    document.querySelector("#username").addEventListener("blur", function () {
        let username = this.value;
        //1、XMLHttpRequest对象创建
        let xhttp;
        if (window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        //2、打开与服务器的连接
        //get
        xhttp.open("GET", "http://localhost:8080/ajax/ajaxServlet?username=" + username, true);//true表示使用异步方式，默认为true
        //这里的绝对路径为了实现前后端分离
        //3、发送请求
        xhttp.send();//参数为请求体(get没有请求体，通常不填或者为null)
        //post        // xhttp.open("post", "ajaxServlet", true);        //设置请求头（在open（）方法后，send（）方法前）
        // xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        // xhttp.send("username=" + username)

        //4、获取响应
        xhttp.onreadystatechange = function () {//设置回调函数
            if (this.readyState === 4 && this.status === 200) {
                /*
                readyState表示XMLHttpRequest对象的状态，
                0状态：XMLHttpRequest对象刚创建，还没有调用open()方法；
                1状态：请求开始，调用了open()方法，但还没有调用send()方法
                2状态：调用完了send()方法，还未开始响应；
                3状态：服务器已经开始响应，但不表示响应结束了！
                4状态：服务器响应结束！(通常我们只关系这个状态！！！)

                status表示返回请求的状态
                 */                if (this.responseText === "true") {
                    document.querySelector("#username_err").style.display = "block";
                } else {
                    document.querySelector("#username_err").style.display = "none";
                }
            }
        };
    });
    //endregion

</script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>欢迎注册</title>
    <link href="css/register.css" rel="stylesheet">
</head>
<body>

<div class="form-div">
    <div class="reg-content">
        <h1>欢迎注册</h1>
        <span>已有账号？</span> <a href="login.html">登录</a>
    </div>
    <form id="reg-form" action="#" method="get">

        <table>

            <tr>
                <td>用户名</td>
                <td class="inputs">
                    <input name="username" type="text" id="username">
                    <br>
                    <span id="username_err" class="err_msg" style="display: none">用户名已存在</span>
                </td>

            </tr>

            <tr>
                <td>密码</td>
                <td class="inputs">
                    <input name="password" type="password" id="password">
                    <br>
                    <span id="password_err" class="err_msg" style="display: none">密码格式有误</span>
                </td>
            </tr>


            <tr>
                <td>验证码</td>
                <td class="inputs">
                    <input name="checkCode" type="text" id="checkCode">
                    <img src="imgs/a.jpg">
                    <a href="#" id="changeImg">看不清？</a>
                </td>
            </tr>

        </table>

        <div class="buttons">
            <input value="注 册" type="submit" id="reg_btn">
        </div>
        <br class="clear">
    </form>

</div>

<script src="js/jquery-3.6.0.js"></script>
<script>
    $(function () {
        $("#username").blur(function () {
            // jqueryAjax
            // $.ajax({            //     "url": "ajaxServlet",            //     "type": "post",            //     "data": "username=" + $("#username").val(), //向服务器发送的数据
            //     "dataType": "text", //服务器返回的数据类型
            //     "success": function (result) {  //result服务器返回的数据
            //         if (result == 'true') {
            //             $("#username_err").css("display","block");            //         } else {            //             $("#username_err").css("display","none");            //         }            //     },            //     "error":function () {//服务器代码异常调用该函数
            //         alert("服务器异常")
            //     }            // });
            // get            // $.get("ajaxServlet",            //     {username : $("#username").val()},            //    function (result) {            //         if (result == 'true') {            //             $("#username_err").css("display","block");            //         } else {            //             $("#username_err").css("display","none");            //         }            // });
            // post            // $.post("ajaxServlet",            //     {username : $("#username").val()},            //     function (result) {            //         if (result == 'true') {            //             $("#username_err").css("display","block");            //         } else {            //             $("#username_err").css("display","none");            //         }            //     });
            //post            // $.post({            //     "url": "ajaxServlet",            //     "data": "username=" + $("#username").val(), //向服务器发送的数据
            //     "dataType": "text", //服务器返回的数据类型
            //     "success": function (result) {  //result服务器返回的数据
            //         if (result == 'true') {
            //             $("#username_err").css("display", "block");            //         } else {            //             $("#username_err").css("display", "none");            //         }            //     }            // });
            //getJson 输入框输入admin
            $.getJSON({
                url: "ajaxServlet",
                data: "username=" + $("#username").val(),
                success: function (result) {
                    $.each(result, function (index, item) {
                        console.log(item)
                    });
                }
            });
        });
    });

</script>
</body>
</html>
```

```java
package priv.noby.ajax.servlet;

import com.alibaba.fastjson.JSON;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 使用异步方式测试注册时的用户名是否重复验证
 *
 * @author Noby
 * @since 2023/3/25 18:18
 */@WebServlet("/ajaxServlet")
public class AjaxServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        if ("noby".equals(username)) {
            response.getWriter().write("" + true);
        }else if("admin".equals(username)){
            String[] names = {"jack","rose","lucy","lily"};
            response.getWriter().write(JSON.toJSONString(names));
        }

    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        this.doGet(request, response);
    }
}
```

### AXIOS

- Axios 是一个基于 Promise 的 HTTP 客户端，可以在浏览器和 Node.js 环境中使用，用于发送 HTTP 请求和处理响应。它是一个功能强大、易于使用和可定制的库，被广泛用于前端开发中。
  - 支持 Promise API，可以轻松处理异步操作和错误处理。
  - 提供简单而强大的 API，可以发送各种类型的请求，包括 GET、POST、PUT、DELETE 等。
  - 支 和响应拦截器，可以在请求或响应被发送或接收之前或之后执行某些操作，例如添加认证令牌或对响应数据进行转换等。
  - 支持取消请求，可以在请求被发送之前或之后取消请求。
  - 自动转换请求和响应数据，可以自动将 JavaScript 对象转换为 JSON 数据，并将响应数据转换为 JavaScript 对象或数组。
  - 提供客户端和服务器端请求防御，包括 XSRF（跨站请求伪造）防御和 CSRF（跨站请求伪造）防御。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>axiosNote</title>
</head>
<body>
<!--axios为ajax的框架-->
<script src="js/axios-0.18.0.js"></script>
<script>
    //region axios发送get请求
    //方式1：
    // axios({
    //     method:"get",    //     url:"http://localhost:8080/ajax/axiosServlet?username=noby"    // }).then(function (resp) {    //     alert(resp.data + "方式1");
    // })    //方式2：
    // axios.get("http://localhost:8080/ajax/axiosServlet?username=noby").then(function (resp) {
    //     alert(resp.data + "方式2")
    // })    //endregion
    //region axios发送post请求
    //单个参数方式1：
    // axios({
    //     method: "post",    //     url:"http://localhost:8080/ajax/axiosServlet",    //     data: "username=noby"    // }).then(function (resp) {    //     alert(resp.data + "单个参数方式1");
    // })    //多个参数方式1：
    // axios({
    //     method: "post",    //     url: "http://localhost:8080/ajax/axiosServlet",    //     data: "username=kace&info=information"    // }).then(function (resp) {    //     alert(resp.data + "多个参数方式1");
    // })    //多个参数方式2：
    axios.post("http://localhost:8080/ajax/axiosServlet","username=kace&info=information").then(function (resp) {
        alert(resp.data + "多个参数方式2");
    })

    axios.post("http://localhost:8080/ajax/axiosServlet",
        {params:{username:"kace",info:"information"}}
    ).then(function (resp) {
        alert(resp.data + "多个参数方式2");
    })
    //endregion
</script>
</body>
</html>
```

```java
package priv.noby.ajax.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/axiosServlet")
public class AxiosServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String info = request.getParameter("info");
        System.out.println("username = " + username);
        System.out.println("info = " + info);
        PrintWriter writer = response.getWriter();
        writer.write("hello axios!" + username + info);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
```

### 两者特点

- 相同点：
  - 都是用于在浏览器中发送 HTTP 请求。
  - 都可以发送各种类型的请求，例如 GET、POST、PUT、DELETE 等。
  - 都可以异步处理响应数据，并且可以在成功或失败时执行相应的回调函数。
- 区别：
  - Axios 是基于 Promise 的，而 AJAX 通常使用回调函数。
  - Axios 可以在浏览器和 Node.js 环境中使用，而 AJAX 只能在浏览器中使用。
  - Axios 提供了请求和响应拦截器，可以在请求或响应被发送或接收之前或之后执行某些操作，而 AJAX 没有提供这个功能。
  - Axios 自动将 JavaScript 对象转换为 JSON 数据，并将响应数据转换为 JavaScript 对象或数组，而 AJAX 需要手动执行这些转换操作。
  - Axios 提供了客户端和服务器端请求防御，包括 XSRF（跨站请求伪造）防御和 CSRF（跨站请求伪造）防御，而 AJAX 需要手动实现这些防御措施。
- 总的来说，Axios 相比于 AJAX 具有更为强大和灵活的功能，且使用更加简单方便。但在一些简单的应用场景下，AJAX 也能够胜任。
