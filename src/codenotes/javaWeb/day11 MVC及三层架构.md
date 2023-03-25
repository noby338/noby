---
title: day11 MVC及三层架构
icon: write
category:
  - JavaWeb
tag:
  - JavaWeb
  - MVC
  - 三层架构
sticky: false
star: false
article: true
timeline: true
---
### MVC

* 程序的一种设计模式
* M：Model，业务模型，处理业务
  * 数据承载Bean：是指实体类，专门承载业务数据的，如Student、User等。
  * 业务处理Bean：专门用于处理用户提交请求的。
    * service对象
    * dao对象
* V：View，视图，界面展示
  * 为用户提供使用界面，与用户直接进行交互。
* C：Controller，控制器，处理请求，调用模型和视图
  * 用于将用户请求转发给相应的Model进行处理，并处理Model的计算结果向用户提供相应响应。

### 三层架构

* 是程序设计的一种典型架构方式
* 表现层(View)： `com.itheima.controller` 或者 `com.itheima.web`
  * 用于接收用户提交请求的代码在这里编写。
* 业务层(Service、业务逻辑层)：`com.itheima.service`
  * 系统的业务逻辑主要在这里编写。
* 数据层(Dao、持久层、数据访问层)：`com.itheima.dao` 或者 `com.itheima.mapper`
  * 直接操作数据库的代码在这里编写。

![image-20221001153941436](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221001153941436.png)

### MVC和三层架构的关系


- 这两种系统架构的出现，即使应用程序达到”高内聚，低耦合“的目的。三层架构是程序设计的一种典型架构方式，强调的是层与层之间的上下关系，从上到下依次为表现层、业务逻辑层、数据访问层，在最上层的表现层收到请求时，表现层调用业务逻辑层的方法，业务逻辑层调用数据访问层实现数据的操作，再将数据返回至业务逻辑层，业务逻辑层将数据返回给表现层，最终将数据以视图的方式响应给用户；而MVC是程序的一种设计模式，强调的是相互协作的关系，在model、view、controller中，controller作为view和model和view的协调者，这里的view和controller对应三层架构中的表现层，而model对应三层架构的业务逻辑层和数据访问层。MVC是针对用户界面设计的，而三层架构可以用于任何类型的应用程序。三层架构强调数据的层次化组织和管理，而MVC强调模型、视图和控制器之间的交互。 MVC与三层架构虽然说实质是不同的，但在所达到”高内聚，低耦合“的目的相同。

![image-20220325121456970](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220325121456970.png)

### SSM与三层架构的关系

- SSM即SpringMVC、Spring、Mybatis三个框架。它们在三层架构中所处的位置是不同的，即它们在三层架构中的功能各不相同，各司其职。
  - SpringMVC：作为View层的实现者，完成用户的请求接收功能。SpringMVC的Controller作为整个应用的控制器，完成用户请求的转发及对用户的响应。
  - MyBatis：作为 Dao层的实现者，完成对数据库的增、删、改、查功能。
  - Spring：以整个应用大管家的身份出现。整个应用中所有的Bean的生命周期行为，均由Spring来管理。即整个应用中所有对象的创建、初始化、销毁，及对象间关联关系的维护，均由Spring进行管理。

![img](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/6795acbfc2ca254b6bc069c2b80a7f8b~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
