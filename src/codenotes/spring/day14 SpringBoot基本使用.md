---
title: day14 SpringBoot基本使用
icon: write
category:
    - Spring
    - SpringBoot
tag:
    - Spring
    - SpringBoot
    - 配置文件
    - 多环境配置
sticky: false
star: false
article: true
timeline: true
---

## SpringBoot 介绍

- SpringBoot 概念
    - SpringBoot 提供了一种快速使用 Spring 的方式，基于约定优于配置的思想，可以让开发人员不必在配置与逻辑业务之间进行思维的切换，全身心的投入到逻辑业务的代码编写中，从而大大提高了开发的效率，Spring Boot 并不是对 Spring 功能上的增强，而是提供了一种快速使用 Spring 的方式。
- Spring 缺点
    - 配置繁琐
        - 虽然 Spring 的组件代码是轻量级的，但它的配置却是重量级的。一开始，Spring 用 XML 配置，而且是很多 XML 配置。Spring 2.5 引入了基于注解的组件扫描，这消除了大量针对应用程序自身组件的显式 XML 配置。 Spring 3.0 引入了基于 Java 的配置，这是一种类型安全的可重构配置方式，可以代替 XML。 所有这些配置都代表了开发时的损耗。因为在思考 Spring 特性配置和解决业务问题之间需要进行思维切换，所以编写配置挤占了编写应用程序逻辑的时间。和所有框架一样，Spring 实用，但它要求的回报也不少。
    - 依赖繁琐
        - 项目的依赖管理也是一件耗时耗力的事情。在环境搭建时，需要分析要导入哪些库的坐标，而且还需要分析导入与之有依赖关系的其他库的坐标，一旦选错了依赖的版本，随之而来的不兼容问题就会严重阻碍项目的开发进度。
- SpringBoot 功能
    - 自动配置
        - Spring Boot 的自动配置是一个运行时（更准确地说，是应用程序启动时）的过程，考虑了众多因素，才决定 Spring 配置应该用哪个，不该用哪个。该过程是 SpringBoot 自动完成的。
    - 起步依赖
        - 起步依赖本质上是一个 Maven 项目对象模型（Project Object Model，POM），定义了对其他库的传递依赖 ，这些东西加在一起即支持某项功能。 简单的说，起步依赖就是将具备某种功能的坐标打包到一起，并提供一些默认的功能。
    - 辅助功能
        - 提供了一些大型项目中常见的非功能性特性，如嵌入式服务器、安全、指标，健康检测、外部配置等。
- SpringBoot 的启动依赖
    - 在 spring-boot-starter-parent 中定义了各种技术的版本信息，组合了一套最优搭配的技术版本。
    - 在各种 starter 中，定义了完成该功能需要的坐标合集，其中大部分版本信息来自于父工程。
    - 我们的工程继承 parent，引入 starter 后，通过依赖传递，就可以简单方便获得需要的 jar 包，并且不会存在 版本冲突等问题。
- SpringBoot 的配置文件：默认配置文件名称为 application
    - 分类
        - properties
        - yml/yaml
            - 特点：
                - 大小写敏感
                - 数据值前边必须有空格，作为分隔符
                - 使用缩进表示层级关系
                - 缩进时不允许使用 Tab 键，只允许使用空格（各个系统 Tab 对应的 空格数目可能不同，导致层次混乱）(idea 等高级编辑器可忽略)。
                - 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可
                - `#` 表示注释，从这个字符一直到行尾，都会被解析器忽略。
            - 书写格式：
                - 缩进写法

        ```yaml
        # 对象
        person:
          name: noby
        # 数组
        addresss:
                    - beijing
                    - shanghai
        # 纯量(常量)
        msg1: 'hello \n world' # 单引忽略转义字符
        msg2: "hello \n world" # 双引识别转义字符
        ```

                - 行内写法

        ```yaml
        # 对象
        person: {name: noby}
        # 数组
        addresss: [beijing,shanghai]
        ```

    - 在同一级目录下优先级为：
        - properties > yml > yaml

## 内容

- springboot 项目的构建过程
    - 添加 module
    - 选择 Spring Initializr
        - SpringBoot 项目导入的模板网址：
            - https://start.spring.io
            - https://start.aliyun.com(推荐)
        - 选择 java 8，打包方式为 jar
        - 使用的 springboot 的版本 2.3.12.RELEASE(新建后 pom 中修改)
        - 选择的依赖为 Spring Web
    - 服务器运行的类必须在 SpringbootApplication 所在的包，或其子包
- SpringBoot 的启动依赖
    - 在 spring-boot-starter-parent 中定义了各种技术的版本信息，组合了一套最优搭配的技术版本。
    - 在各种 starter 中，定义了完成该功能需要的坐标合集，其中大部分版本信息来自于父工程。
    - 我们的工程继承 parent，引入 starter 后，通过依赖传递，就可以简单方便获得需要的 jar 包，并且不会存在版本冲突等问题。
- 使用 SpringBoot 的两种方式：
    - 继承 parent：相当于继承自 spring-boot-starter-parent
    - 使用 import 标签：这就相当于将 spring-boot-dependencies 中定义的所有 `<dependencies>` 全部复制粘贴到了本项目的 pom.xml 中
- SpringBoot 的配置文件：默认配置文件名称为 application
    - 分类
        - properties
        - yml/yaml(不建议使用 yaml)
            - 特点：
                - 大小写敏感
                - 数据值前边必须有空格，作为分隔符
                - 使用缩进表示层级关系
                - 缩进时不允许使用 Tab 键，只允许使用空格（各个系统 Tab 对应的 空格数目可能不同，导致层次混乱）(idea 等高级编辑器可忽略)。
                - 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可
                - `#` 表示注释，从这个字符一直到行尾，都会被解析器忽略。
    - 在同一级目录下优先级为：
        - properties > yml > yaml
- Profile
    - profile 是用来完成不同环境下，配置动态切换功能的。
    - profile 配置方式
        - 多 profile 文件方式：提供多个配置文件，每个代表一种环境。
            - application-dev.properties/yml 开发环境
            - application-test.properties/yml 测试环境
            - application-pro.properties/yml 生产环境
        - yml 多文档方式：
            - 在 yml 中使用 --- 分隔不同配置
    - profile 激活方式
        - 配置文件：在配置文件中配置：spring.profiles.active=dev
        - 虚拟机参数：在 VM options 指定：-Dspring.profiles.active=dev
        - 命令行参数：java –jar xxx.jar --spring.profiles.active=dev
- 测试类的使用
    - 添加依赖
    - 测试类添加注解
        - @RunWith(SpringRunner.class)
        - @SpringBootTest(启动类.class)

## 配置文件

- 优先级:properties>yml>yaml

### properties

```properties
server.port=8081  
info: properties配置生效
```

### yaml

```yaml
server:  
  port: 8083  
info: yaml配置生效
```

### yml

#### 单文件

```yml
server:  
  port: 8082  
info: yml配置生效
```

#### 单文件多文档

```yml
---  
server:  
  port: 8081  
spring:  
  profiles: dev  
info: 单文件(多文档)profile配置方式，dev环境  
---  
server:  
  port: 8081  
spring:  
  profiles: test  
info: 单文件(多文档)profile配置方式，test环境  
---  
server:  
  port: 8081  
spring:  
  profiles: pro  
info: 单文件(多文档)profile配置方式，pro环境  
---  
# 配置文件激活方式  
spring:  
  profiles:  
    active: test  
# VM options 配置方式，虚拟机配置优先级高于配置文件激活方式  
# -Dspring.profiles.active=dev  
# Program arguments 配置方式，命令行配置优先级高于配置文件激活方式  
# --spring.profiles.active=pro
```

#### 多文件配置

```yml
# 指定使用的配置环境  
# 配置文件激活方式  
spring:  
  profiles:  
    active: dev
```

```yml
server:  
  port: 8081  
info: 多文件profile配置方式，dev环境
```

```yml
server:  
  port: 8083  
info: 多文件profile配置方式，pro环境
```

```yml
server:  
  port: 8082  
info: 多文件profile配置方式，test环境
```
