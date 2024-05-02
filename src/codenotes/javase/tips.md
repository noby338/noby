---
title: tips
icon: write
category:
    - JavaSE
tag:
    - JavaSE
sticky: false
star: false
article: true
timeline: true
---

## javase

- 数组 b 的第 3 个元素为 b[3]，b[0] 为第 0 个元素而非第 1 个元素
- 方法的形参个数可以和实参可以不同。例如：void fun(int… nums) fun(1,2,3,4);
- java 只有值传递 (引用传递传递的也是值)，值传递与地址传递从根本上就是一样的
- 一个类可以有多个父类 (爷爷)
- 构造方法的作用是初始化对象的属性，而不是创建对象，对象在 new 时创建
- 可变长参数的方法可以不传参数
- equals 方法先判断两个字符串是否相等，再判断属性值是否相等
- static 可以修饰静态内部类，该类的对象是由外部类创建

## io 流

- io 流中没有接口，全是实例类和抽象类
- PrintWriter 只操作数据目的，不操作数据源
- FileReader 无法读取文件的字节数
- Reader 是抽象类，不是接口

## Spring

1. 简述 IoC
      - Inverson of Control 控制反转
      - 对象控制权的转移，对象从 new 变为 Spring 容器创建，其目的主要是用于用于主业务的解耦。其底层实现方式有反射、xml、工厂模式。典型应用为框架的整合。
2. 简述 AOP
      1. Aspect Oriented Programming 面向切面编程
      2. 将交叉业务封装成切面，织入到主业务中，其作用在使交叉业务在主业务中的复用；底层实现为动态代理，其实现有 proxy 和 cglib；其应用有过滤器、事务处理、日志处理
3. Bean 的装配方式
      1. 默认装配方式：
      2. 动态工厂 Bean：
      3. 静态工厂 Bean：
4. Bean 的作用域
      1. singleton
      2. prototype
      3. request
      4. session
      5. globalsession
5. Bean 的生命周期
      1. 构造器
      2. 属性赋值
      3. BeanNameAware
      4. BeanFactoryNameAware
      5. InitallizeBean afterPropertySet
      6. init-method
      7. 执行核心业务
      8. destroy-method
6. BeanFactory 和 ApplicationContext 的区别
      1. BeanFactory：创建 Bean 的时机为调用 getBean()，优点为启动初始化快，不会占用太多系统资源；缺点为第一个用户的访问速度慢
      2. Applicationcontext：创建 Bean 的时机为容器的启动；其缺点为启动速度慢，占用系统的资源多；优点为第一个用户访问较快；
7. ID 的注入方式
      1. 设值注入：通过无参构造函数实例化类，通过 set 方法给对象设值
      2. 构造注入：通过有参构造函数实例化类
8. 名词解释：切面、织入、连接点、切入点、通知、顾问
      1. 切面：交叉业务
      2. 织入：将切面添加到主业务中的动作
      3. 连接点：接口中可以被织入的方法
      4. 织入点：被织入的连接点
      5. 通知：切入的时间点
      6. 顾问：一种通知和切入点表达式的封装
9. SpringAOP 的通知有哪些类型
      1. @Before 前置通知
      2. @AfterReturning 后置通知
      3. @Around 环绕通知
      4. @AfterThrowing 异常通知
      5. @After 最终通知
10. 事务的四大特性
        1. 原子性 (Atomicity)：事务是一个不可分割的工作单位，事务中的操作要么全部成功，要么全部失败。
        2. 一致性 (Consistency)：事务必须使数据库从一个一致性状态变换到另外一个一致性状态。（张三转账给李四，张三减少的金额为李四增加的金额，或张三或李四的金额都不变，这为两种一致的状态）
        3. 持久性 (lsolation)：一个事务一旦提交，他对数据库中的数据影响是永久性的
        4. 隔离性 (Durability)：多个用户访问数据库时，每个用户都有一个事务，他们是相互独立互不影响的
11. 事务的隔离级别									                    	脏读				不可重复读     			幻读
        1. 读未提交																Y				            Y    			            Y
        2. 读已提交（） N                            Y Y
        3. 可重复读（MySQL 的默认隔离级别） N                            N Y
        4. 串行化 N                            N N
12. 事务的传播机制
13. maven 的常用命令
        1. compile 编译
        2. test 测试
        3. package 打包
        4. install 安装
        5. deploy 部署

## SpringMVC

1. Proxy 和 cglib 动态代理的区别
      1. proxy： jdk 内置 API，其增强的目标类必须有接口，代理对象所属的类型和目标类都是该接口的实现
      2. cglib：第三方，其有没有接口都可以，代理类为目标类的子类
2. SpringAOP 事务管理器不同类型的异常有什么区别
      1. 非受查异常：回滚
      2. 受查异常：提交，配置 rollback 属性，指定特定异常回滚，rollback=Exception.class
3. SpringMVC 的执行流程
      1. DispatcherServlet 中央调度器
      2. HandlerMapping 处理器映射器：根据请求路径查找对应的处理器
      3. HandlerAdapter 处理器适配器：提供不同接口的处理器的统一调用方式
      4. Controller 控制器: 处理请求
      5. ViewResolver 视图解析器：解析响应给用户的视图
      6. View 视图：浏览器最终得到的页面
4. 监听器有什么作用，ContextLoaderListener 有什么作用
      1. 监听器：监听 Servlet 的三大域属性：域属性在创建、销毁、，属性值在修改、添加、删除 添加事件处理方法，特定事件发生时对应的方法就会执行，例子：论坛查看在线用户（监听用户登录的 session）
      2. ContxtLoaderListener：将 Spring 的 Bean 存储到 Servletcontext 中，保证 bean 值创建一次，以使用去 Servletcontext 去对应的 bean
5. SpringMVC 的处理方法可以使用那些的参数和返回值
      1. 参数：
            1. HttpServeltRequst
            2. HttpServletResponse
            3. HttpSession
            4. Model
            5. 自定义请求参数
      2. 返回值
            1. 同步
                  1. ModelAndView
                  2. String
                  3. void
            2. 异步
                  1. void
                  2. 自定义对象
                  3. String（json 数据）
6. @RequstBody 和 @RsponseBody 的作用
      1. @RequestBody：将请求中的 JSON 转成对象
      2. @ResponseBody：将后端的数据序列化成 JOSN 注入到响应体中
      3. 底层：为注解驱动 + HttpMessageConveter(消息转换) + 序列化技术
7. 图片长传对表单的要求
      1. 使用 post 提交
      2. 添加 enctype="mulipar/form-data"
8. SpringMVC 拦截器的执行流程
      1. preHandle：是否放行（true 为放行），其执行的顺序为配置的先后顺序
            1. 所有的拦截器都放行后执行处理器方法
      2. postHandle：在处理器执行完之后执行，其执行的顺序和 preHandle 相反
      3. afterCompletion：只要有一个拦截器放行，对应的这个方法会压栈，最后一定执行
9. SpringBoot 如何实现简化 Spring 开发
      1. 约定大于配置
            1. 场景启动器 Starter-xxx
            2. jar 包管理
            3. 自动配置类 xxxxAutoConfiguartion 自动创建当前场景中常用的 bean
                  1. @SpringBootApplication
                        1. SpringBoot 启动类的核心注解
                              1. @EnableAutoconfiguration 自动包扫描
10. 举例说明单例模式和适配器模式在项目中的应用
        1. 单例模式
              1. JDK
                    1. Runtime
              2. JAVAWeb
                    1. Servlet
              3. Spring
                    1. bean
        2. 适配器模式
              1. SpringMVC
                    1. handlerAdapter
              2. 处理器适配器：通过适配器对不同接口的处理器进行统一调用
11. 下列注解的作用
        1. `@Configuration`：配置类，替换 `<bean>`
        2. `@Bean`：用在配置类的方法上，方法的返回值为系统创建的一个 bean 对象
        3. `@ComponentScan` 包扫描 `<context:componte-scan base-package=""/>`
        4. `@PropertySource` 指定读取特定性的 properties 文件 `<context-placeholder/>`
        5. `@ConfigurationProperties` XxxxProperties:+`@ConfigurationProperties`: 读取配置文件中的特定前缀的属性值赋值给
        6. `@SpringBootApplication` SpringBoot 启动类的核心注解 `@EnableAutoConfiguration` 自动包扫描
