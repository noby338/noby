---
title: maven的基本使用、mybatis逆向工程
icon: write
category:
  - JavaWeb
  - MyBatis
tag:
  - JavaWeb
  - Maven
  - 逆向工程
sticky: false
star: false
article: true
timeline: true
---

### Maven

- Maven 是一个流行的 Java 项目管理工具，它提供了一种统一的构建方式和依赖管理机制，可以自动化构建、测试、打包、发布和部署 Java 应用程序。它采用了约定优于配置的理念，将项目开发过程中的各种操作（如编译、打包、测试等）抽象成一系列标准化的生命周期阶段，简化了项目构建和管理的流程。

#### Maven 模型

- Maven 的组成
  - 项目对象模型 (Project Object Model)：即自己的项目
  - 依赖管理模型(Dependency)：即引入的其他 jar 包
  - 插件(Plugin)：打包，编译，测试等都依赖插件运行
    ![image-20220321213731191](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220321213731191.png)

#### web 项目的结构

- Maven 是专门用于管理和构建 Java 项目的工具，它的主要功能有：
  - 提供了一套标准化的项目结构
  - 提供了一套标准化的构建流程（编译，测试，打包，发布……）
  - 提供了一套依赖管理机制![image-20220321213114928](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220321213114928.png)
- maven 项目标准化的构建流程
  - 编译=>测试=>打包=>发布
- maven 的生命周期
  - 同一套生命周期内，执行后边的命令，前面的所有命令会自动执行。例如默认（default）生命周期如下：compile=>test=>package=>install
- maven web 的项目结构
  - 开发中的项目
    - ![1627202865978.png](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/1627202865978.png)
  - 开发完成部署的 Web 项目
    - ![1627202903750.png](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/1627202903750.png)
    - 编译后的 Java 字节码文件和 resources 的资源文件，会被放到 WEB-INF 下的 classes 目录下
    - pom.xml 中依赖坐标对应的 jar 包，会被放入 WEB-INF 下的 lib 目录下

#### 仓库

- 分类：
  - 本地仓库：自己计算机上的一个目录
  - 远程仓库(私服)：一般由公司团队搭建的私有仓库(一般改为阿里巴巴远程仓库)
  - 中央仓库：由 Maven 团队维护的全球唯一的仓库
- 仓库的查找顺序
  - 本地仓库 --> 远程仓库--> 中央仓库
- 配置
  - 配置本地仓库
    - 修改 `conf\settings.xml` 中的 `<localRepository>` 为一个指定目录作为本地仓库，用来存储 jar 包。
  - 配置远程仓库（阿里云私服）
    - 修改 `conf/settings.xml` 中的 `<mirrors>`标签，为其添加如下子标签：
  ```xml
  <mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>
  </mirror>
  ```

#### Idea 使用 maven 创建 web 项目

- 使用骨架的方式创建 Maven Web 项目
  - ![1627204022604](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/1627204022604.png)
- 不使用骨架的方式创建 Maven Web 项目
  - ![1627204076090](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/1627204076090.png)

#### maven 的基本使用

- 坐标的组成
  - 组织 id
  - 项目 id
  - 版本号
- maven 的依赖管理
  - 依赖的坐标配置
    - 依赖的范围: `<scope>` 标签
      - compile(log4j)(默认) 主代码、测试代码、打包
      - test(junit) 测试代码
      - provided(servlet-api) 主代码、测试代码
      - runtime(jdbc) 打包
    - 可选依赖:`<optional>true</optional>`
      - 其他引用该坐标的项目将对该坐标不可见
  - 依赖具有传递性
    - 直接依赖：在当前项目中通过依赖配置建立的依赖关系
    - 间接依赖：被资源的资源如果依赖其他资源，当前项目间接依赖其他资源
  - maven 的依赖冲突
    - 打开 pom 文件，点击下方的 Dependency Analyzer 查看依赖冲突
    - 依赖传递中的冲突问题
      - 路径优先：当依赖中出现相同的资源时，层级越深，优先级越低，层级越浅，优先级越高
      - 声明优先：当资源在相同层级被依赖时，配置顺序靠后的覆盖配置顺序靠前的
    - 如何解决依赖冲突
      - 排除依赖：使用 `<exclusions>` 标签排除部分 jar 包的依赖

### mybaits 逆向工程

- 使用步骤：
  - pom.xml 中配置 mybatis-generator-maven-plugin 插件
  - 配置 generatorConfig.xml 配置文件
  - 点击 maven mybatis-generator-maven-plugin 插件自动生成数据访问层
- 使用 mybatis 逆向工程创建数据访问层
  - generatorConfig.xml 即为逆向工程插件的配置文件
    - 配置数据库的参数
    - 配置生成实体类，mapper 接口，mapper 映射文件的位置
    - 库中需要自动生成的表，以及生成的对应实体类的类名
  - 使用注意：非第一次生成的 java 文件会被覆盖，非第一次生成的映射文件会被追加
  - 实体包中 Example 文件是查询使用的参数类

#### mybatis 的配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?><!--文档类型说明-->
<!--导入第三方约束文件，表示本文件在准守xml语法的同时还要准守这里的mybatis-3-config.dtd(mybatis的主配置文件)文件中制定的语法-->
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd"><!--dtd文件为约束文件，作为下面xml文件的规范-->
<configuration>
    <!--导入properties文件，可省略-->
    <properties resource="db.properties"/>

    <!--实体类设置别名-->
    <typeAliases>
        <!--单个配置某个全限定名-->
<!--        <typeAlias type="entity.Student" alias="Student"></typeAlias>-->
        <!--统一配置某个包下的全限定名为类的类名-->
        <package name="priv.note.entity"/>
    </typeAliases>

    <!-- environments：指定配置环境。例如开发、测试、生产环境 -->
    <environments default="development"><!--指定默认配置环境为开发环境-->
        <environment id="development"><!--配置环境，可能有多个-->
            <transactionManager type="JDBC"/><!--事务管理器(用jdbc的事务管理器来管理)-->
            <!--配置数据源：数据库来自哪里 -->
            <dataSource type="POOLED"><!--POOLED：连接池，采用连接池的方式获取连接-->
                <!--四大参数：properties文件的key使用，分级区分，避免命名冲突-->
                <property name="driver" value="${jdbc.driver}"/><!--这里的${driver}来自properties-->
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <!--统一配置某个包下的xml映射文件（xml的文件名是根据接口名创建），使用该方法的映射文件名和接口名必须相同-->
        <package name="priv.note.mapper"/>
    </mappers>
</configuration>
```

#### 数据库的 properties

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/stage2?useUnicode=true&characterEncoding=utf8
jdbc.username=root
jdbc.password=123
```

#### generatorConfig 的配置文件

```java
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!--
    targetRuntime: 执行生成的逆向工程的版本
    MyBatis3Simple: 生成基本的CRUD（简洁版）
    MyBatis3: 生成带条件的CRUD（完整版）
    -->
    <context id="DB2Tables" targetRuntime="MyBatis3">
        <commentGenerator>
            <!--去除生成的注释-->
            <property name="suppressAllComments" value="true"/>
        </commentGenerator>
        <!-- 数据库的连接信息，按自己要连接的数据库信息填即可 -->
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/stage2"
                        userId="root"
                        password="123">
            <!--解决mysql驱动升级到8.0后不生成指定数据库代码的问题-->
            <property name="nullCatalogMeansCurrent" value="true" />
        </jdbcConnection>
        <!-- javaBean的生成策略，按实际路径填写-->
        <javaModelGenerator targetPackage="priv.note.entity"
                            targetProject=".\src\main\java">
            <property name="enableSubPackages" value="true" />
            <property name="trimStrings" value="true" />
        </javaModelGenerator>
        <!-- SQL映射文件的生成策略，按实际路径填写 -->
        <sqlMapGenerator targetPackage="priv.note.mapper"
                         targetProject=".\src\main\resources">
            <property name="enableSubPackages" value="true" />
        </sqlMapGenerator>
        <!-- Mapper接口的生成策略，按实际路径填写 -->
        <javaClientGenerator type="XMLMAPPER"
                             targetPackage="priv.note.mapper"
                             targetProject=".\src\main\java">
            <property name="enableSubPackages" value="true" />
        </javaClientGenerator>
        <!-- 逆向分析的表 -->
        <!--tableName对应数据库中的表名-->
        <!-- domainObjectName属性指定生成出来的实体类的类名 -->
        <table tableName="emp" domainObjectName="Emp"/>
        <table tableName="dep" domainObjectName="Dep"/>
    </context>
</generatorConfiguration>
```
