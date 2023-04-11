---
title: day17 SpringSecurity的基本使用，认证，JWT，授权，跨域
icon: write
category:
  - Spring
  - SpringBoot
tag:
  - Spring
  - SpringBoot
  - SpringSecurity
  - JWT
  - 跨域
  - 认证
  - 授权
sticky: false
star: false
article: true
timeline: true
---
## 介绍

- Spring Security 是一个基于 Spring 框架的安全框架，它为应用程序提供身份验证、授权、安全会话管理、防止攻击等方面的支持。
- Spring Security 的架构主要由以下组件组成：
  - Spring Security 过滤器链：它是保护应用程序的主要组件，它通过一系列过滤器来检查请求是否已被授权，以及是否需要进行身份验证。
  - 身份验证管理器：它是用于处理身份验证的中央组件，它可以使用多种身份验证策略进行身份验证。
  - 用户详细信息服务：它是用于提供用户详细信息的中央组件，例如用户名、密码、角色等。
  - 访问决策管理器：它是用于决定是否允许用户访问资源的中央组件。
  - 安全上下文：它是包含当前用户的安全信息的上下文对象，它在应用程序的所有层次中使用。

## 认证

- 认证授权过程
  - 用户将带有账号密码的请求发送到用户登陆 contorller 方法中（此路径在配置类中配置放行），springsecurity 根据请求体中的用户名和密码生成 authentication。之后 authenticaitonManager 将委托 userDetailServie 查询数据库中的该用户名的信息并封装为 UserDetail，authenticationManager 将对比 UserDetail 和 thentication 的信息是否匹配，当匹配时，将认证和授权信息写入 springsecurity 上下文，并生成 token 响应给前端，登陆成功。不匹配时抛出认证异常。
  - 用户的请求首先经过过滤器，判断请求中是否存在 token，如果存在 token 且验证通过，则从缓存中获取该用户的信息，存入 springsecurity 上下文中，如此 springsecurity 中后续所有的拦截器将对该请求放行。如果不存在 token 或验证不通过，将被 springsecurity 的拦截器拦截，抛出异常。跳转到登录页面。

![image.png](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/20230327214137.png)

- UserDetailService 接口：需在配置类配置密码转换
  - loadUserByUsername()方法，可根据用户名在数据库获取用户完整信息，并封装为 UserDetails 接口的实现类对象 UserDetail
- AuthenticationManager 对象：需在配置类注入该对象
  - authenticate()方法，该方法中传入 controller 中传入的 username 和 password 封装的 Authentication 和 UserDetail 对象对比，即可认证 controller 中的用户名和密码和数据库中的用户名和密码是否一致
    - 若认证失败框架抛出异常
    - 若认证成功根据用户名生成 token，并将 token 响应给前端，将 Authentication 封装到 springsecurity 上下文对象中
- OncePerRequestFilter 接口：需在配置类配置在最前面执行该过滤器
  - doFilterInternal()方法，认证后用户用户携带 token 访问其他 controller 前会进入该 filer，该 filter 中根据缓存中是否存在该 token 对应的用户正确信息而在 springSecurity 上下文中存放用户信息封装的 Authenticaiton，该对象的存在可以使得该请求是否具有访问其他 controller 的权限
- LoginController：/login 访问路径默认为框架的默认 controller，需在配置类配置指定自己的 controller

## 授权

- 启用授权
  - 配置类注解 @EnableGlobalMethodSecurity(prePostEnabled = true)
  - 方法权限方法注解 @PreAuthorize("hasAnyAuthority('t')")
  - 权限表的设计
    - ![image.png](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/20230327214931.png)

## 同源策略

- 浏览器为了请求的安全，使用同源策略，当请求的源(协议、IP 地址、端口)相同时，才允许访问该源对应的 cookie、localStorage 和 发送 Ajax 请求，因此前后端分离项目中的两个服务器为两个源不能使用对方资源，因此需在后端通过配置类配置跨域处理(添加该配置后，后端响应给浏览器的响应头中会携带，Access-Control-Allow-Origin 头，如此浏览器不再绝收该响应)
- 同源策略：指的是如果一个 js 运行在源 A 里，那么它将不能获取源 B 中的数据，只能获取当前源中的数据，该策略针对的是不同源之间的数据，这是浏览器本身的限制。
- 不支持同源策略的安全问题举例：浏览器请求服务器 a，提交登录信息并登陆成功，服务器响应给浏览器 jsessionid 存放在浏览器的 cookie 中；此时浏览器再请求服务器 b，服务器响应 html 文件，该 html 中存在访问 a 的 ajax 请求，服务器获取该 html 后，携带 a 的 jsessionid 执行 ajax 请求访问 a，服务器 b 则间接的使用浏览器的 jsession 获得了浏览器用户在服务器 a 的登录权限操作
- 浏览器实现同源策略的方式：当浏览器识别 html 中的 ajax 请求的源与 html 来源的服务器的源不同时，拒收 ajax 请求的响应，当 ajax 请求源的响应头中存在 Access-Control-Allow-Origin：html 来源域头时，表示该服务器允许来自 html 来与服务器的跨域，此时浏览器不再拒收 ajax 请求的响应

## 跨域

- 前端跨域的方式
  - cors(标准的跨域处理方式)
    - 原理：通过后端响应头中携带凭证，使得浏览器不拒收来自后端的响应，option请求为浏览器询问服务器是否允许跨域
  - jsonp
    - 原理：前端 script 利用 src 标签引用不受同于限制的方式实现，只能解决 get 请求
  - 前端配置代理服务器
    - 原理：前端和代理服务器通信，代理服务器和后端通信，代理服务和后端的通信不受同源策略的限制
    - 方式
      - 通过 nginx 开启
      - 通过 vue-cli 自带的代理服务器

## session 认证

- 单体项目：请求的流程是 浏览器(http 请求)=>服务器(html)=>浏览器(界面)，浏览器输入正确的账号密码向服务器请求登录，服务器将 user 对象存储在 session 中，并将 jsession 通过响应头响应给浏览器，浏览器将 jsesison 存在 cookie 中。当该浏览器再次向该服务器请求资源时，浏览器自动携带该源的所有 cookie，其中包括了 jsessionid。服务器根据该 jsesisonid 即可找到服务器中之前的 session，从而获得该 user。
- 分体项目：请求的流程是 浏览器(http 请求)=>前端(ajax)=>浏览器(ajax 及 html)=>后端(json)=>浏览器(界面)，浏览器从前端的页面中输入正确的账号密码向后端发送 ajax 请求登录，由于前端和后端为两个不同的源，因此需借助跨域才能实现该访问(在后端的配置允许该前端源的跨域访问)。后端验证账号和密码的正确性后将 user 对象存储在 session 中，并将 jsession 通过响应头响应给浏览器，浏览器将 jsesison 存在 cookie 中。当该浏览器从前端的页面中再次向该后端发送 ajax 请求时，访问非同源资源浏览器并不会自动携带该后端在浏览器的 cookie，所以后端每次都会生成新的 session 而非生一次的 session。因此需在前端配置允许携带凭证(axios.defaults.withCredentials = true;)(同时后端配置类应设置允许来自其他域携带凭证)，如此前端页面便可使用 ajax 跨域访问后端，同时 ajax 访问时携带凭证，同时后端接收来自前端的凭证。因此后端便可向单体项目一样获得 session
- 移动端：session 是依赖 cookie 存在的，因为移动端不存在 cookie 所以不支持使用 session 认证登录

## jwt 认证

- 分体项目：浏览器从前端的页面中输入正确的账号密码向后端发送 ajax 请求登录，由于前端和后端为两个不同的源，因此需借助跨域才能实现该访问(在后端的配置允许该前端源的跨域访问)。服务器验证账号和密码的正确性后根据用户名、jwt 设置的密钥和签发者等信息生成 token，并通过响应头向浏览器响应该 token，和使得浏览器具有存储该响应头权限的 Access-Control-Expose-Headers 响应头，同时前端的 js 中会将该 token 存储浏览器本地 localStorage 中，当该浏览器从前端的页面中再次向该后端发送 ajax 请求时，指定携带该 token，由此实现登录认证过程。(存入 token 到浏览器和每个请求携带 token 请求头可以使用 ajax 的拦截器代替)
- 移动端：移动端不依赖 cookie，且支持 localStorage，同分体项目可使用 jwt

## 异常处理

- springSecurity 的默认认证和授权异常都为 403，时机开发中认证的异常为 401，授权的异常为 403。若实现需要自定义认证异常和授权异常覆盖默认的框架异常
- 异常的使用
  - 全局异常
    - 使用类上使用@RestControllerAdvice 配合方法使用@ExceptionHandler(异常类字节码对象)捕获所有 controller 中的指定异常(不可捕获认证异常和授权异常)
  - 认证异常：框架所有抛出的认证异常都将由该自定义认证异常代替
    - 自定义类实现 AuthenticationEntryPoint 接口，重写 commence 方法
    - 配置类中配置该自定义类
  - 授权异常：框架所有抛出的授权异常都将由该自定义授权异常代替
    - 自定义类实现 AccessDeniedHandler 接口，重写 handle 方法
    - 配置类中配置该自定义类
