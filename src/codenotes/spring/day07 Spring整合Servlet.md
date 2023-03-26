---
title: day07 Spring整合Servlet
icon: write
category:
  - Spring
tag:
  - Spring
  - Servlet
sticky: false
star: false
article: true
timeline: true
---

### 知识点

- spring 整合 servlet  
  - 导入坐标  
```xml
<dependency>  
    <groupId>org.springframework</groupId>  
    <artifactId>spring-web</artifactId>  
    <version>5.2.15.RELEASE</version>  
</dependency>  
```
  - servlet 使用  
    - 应用上下文对象(Spring上下文对象)如果是通过new ClasspathXmlApplicationContext(spring配置文件)方式获取的，那么每次从 容器中获得Bean时都要编写new ClasspathXmlApplicationContext(spring配置文件)，这样的弊端是配置文件加载多次，应用上下文对象创建多次。  在Web项目中，可以使用ServletContextListener.监听Web应用的启动，我们可以在Web应用启动时，就加  载Spring的配置文件，创建应用上下文对象Application Context,在将其存储到最大的域servletContext域  中，这样就可以在任意位置从域中获得应用上下文Application Context对象了。  上面的分析不用手动实现，Spring提供了一个监听器ContextLoaderListener就是对上述功能的封装，该监  听器内部加载Spring配置文件，创建应用上下文对象，并存储到ServletContext域中，提供了一个客户端工  具WebApplicationContextUtils供使用者获得应用上下文对象。  所以我们需要做的只有两件事：
      - 在web.xml中配置ContextLoaderListener监听器（导入spring-web坐标  
      - 使用WebApplicationContextUtils获得应用上下文对象ApplicationContext  
    - 可通过读取web配置文件监听器的方式读取Spring配置文件  
    - ApplicationContext applicationContext = (ApplicationContext) this.getServletContext()  
        - .getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);  



### 代码示例

#### pom

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<project xmlns="http://maven.apache.org/POM/4.0.0"  
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">  
    <modelVersion>4.0.0</modelVersion>  
  
    <groupId>priv.noby</groupId>  
    <artifactId>spring8</artifactId>  
    <version>1.0-SNAPSHOT</version>  
    <packaging>war</packaging>  
  
    <properties>  
        <maven.compiler.source>8</maven.compiler.source>  
        <maven.compiler.target>8</maven.compiler.target>  
    </properties>  
  
    <dependencies>  
  
        <dependency>  
            <groupId>org.mybatis</groupId>  
            <artifactId>mybatis</artifactId>  
            <version>3.5.9</version>  
        </dependency>  
        <dependency>  
            <groupId>mysql</groupId>  
            <artifactId>mysql-connector-java</artifactId>  
            <version>5.1.34</version>  
        </dependency>  
        <dependency>  
            <groupId>junit</groupId>  
            <artifactId>junit</artifactId>  
            <version>4.12</version>  
            <scope>test</scope>  
        </dependency>  
        <dependency>  
            <groupId>org.projectlombok</groupId>  
            <artifactId>lombok</artifactId>  
            <version>1.18.22</version>  
        </dependency>  
        <dependency>  
            <groupId>org.springframework</groupId>  
            <artifactId>spring-context</artifactId>  
            <version>5.2.15.RELEASE</version>  
        </dependency>  
        <!--Spring 的 Mybaits 的整合包-->  
        <dependency>  
            <groupId>org.mybatis</groupId>  
            <artifactId>mybatis-spring</artifactId>  
            <version>2.0.2</version>  
        </dependency>  
        <!--Spring 的 jdbc 整合包-->  
        <dependency>  
            <groupId>org.springframework</groupId>  
            <artifactId>spring-jdbc</artifactId>  
            <version>5.2.15.RELEASE</version>  
        </dependency>  
        <!--第三方数据源druid-->  
        <dependency>  
            <groupId>com.alibaba</groupId>  
            <artifactId>druid</artifactId>  
            <version>1.1.10</version>  
        </dependency>  
        <!--Spring 对 log4j 的配置-->  
        <dependency>  
            <groupId>org.slf4j</groupId>  
            <artifactId>slf4j-log4j12</artifactId>  
            <version>1.7.21</version>  
        </dependency>  
        <dependency>  
            <groupId>javax.servlet</groupId>  
            <artifactId>javax.servlet-api</artifactId>  
            <version>3.1.0</version>  
            <scope>provided</scope>  
        </dependency>  
        <dependency>  
            <groupId>com.alibaba</groupId>  
            <artifactId>fastjson</artifactId>  
            <version>1.2.62</version>  
        </dependency>  
  
  
        <!--jsp-->  
        <dependency>  
            <groupId>javax.servlet.jsp</groupId>  
            <artifactId>jsp-api</artifactId>  
            <version>2.2</version>  
            <scope>provided</scope>  
        </dependency>  
        <!--JSTL和EL表达式-->  
        <dependency>  
            <groupId>jstl</groupId>  
            <artifactId>jstl</artifactId>  
            <version>1.2</version>  
        </dependency>  
        <!--JSTL和EL表达式-->  
        <dependency>  
            <groupId>taglibs</groupId>  
            <artifactId>standard</artifactId>  
            <version>1.1.2</version>  
        </dependency>  
        <!--spring 整合 servlet-->        <dependency>  
            <groupId>org.springframework</groupId>  
            <artifactId>spring-web</artifactId>  
            <version>5.2.15.RELEASE</version>  
        </dependency>  
        <!--Spring的junit的整合包，可用于测试时可注入Spring-->  
        <dependency>  
            <groupId>org.springframework</groupId>  
            <artifactId>spring-test</artifactId>  
            <version>5.2.15.RELEASE</version>  
        </dependency>  
    </dependencies>  
  
    <build>  
        <plugins>  
            <plugin>  
                <groupId>org.apache.tomcat.maven</groupId>  
                <artifactId>tomcat7-maven-plugin</artifactId>  
                <version>2.2</version>  
                <configuration>  
                    <port>8080</port>  
                    <path></path>  
                    <uriEncoding>UTF-8</uriEncoding>  
                </configuration>  
            </plugin>  
            <plugin>  
                <groupId>org.apache.maven.plugins</groupId>  
                <artifactId>maven-compiler-plugin</artifactId>  
                <configuration>  
                    <source>8</source>  
                    <target>8</target>  
                </configuration>  
            </plugin>  
        </plugins>  
    </build>  
  
</project>
```

#### Resource

```xml
<beans xmlns="http://www.springframework.org/schema/beans"  
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
       xmlns:context="http://www.springframework.org/schema/context"  
       xsi:schemaLocation="  
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd        ">  
  
    <context:property-placeholder location="classpath:db.properties"/>  
  
    <bean id="dataResource" class="com.alibaba.druid.pool.DruidDataSource">  
        <property name="driverClassName" value="${jdbc.driverClassName}"/>  
        <property name="url" value="${jdbc.url}"/>  
        <property name="username" value="${jdbc.username}"/>  
        <property name="password" value="${jdbc.password}"/>  
    </bean>  
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">  
        <property name="typeAliasesPackage" value="priv.noby.spring8.entity"/>  
        <property name="dataSource" ref="dataResource"/>  
    </bean>  
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">  
        <property name="basePackage" value="priv.noby.spring8.dao"/>  
        <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>  
    </bean>  
  
    <bean id="empService" class="priv.noby.spring8.service.impl.EmpServiceImpl">  
        <property name="empDao" ref="empDao"/>  
    </bean>  
  
</beans>
```

```properties
jdbc.driverClassName=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/stage3?useUnicode=true&characterEncoding=utf8
jdbc.username=root
jdbc.password=123
```

```properties
# 这段代码是使用log4j进行日志输出的配置。  
  
# log4j打印的日志等级(低到高)：ALL<=TRACE(最细的内容)<DEBUG(调试信息)<INFO(普通信息)<WARN(警告信息)<ERROR(错误信息)<FATAL(严重错误)<OFF  
# rootLogger表示在所有环境均生效的配置，OFF表示在所有环境下不显示  
log4j.rootLogger=OFF  
  
# priv.noby.spring8.dao表示在当前类生效的配置，这个类的日志级别设置为debug，并将日志输出到CONSOLE这个appender中。  
# 虽然前面设置了log4j.rootLogger=OFF，但这行配置将覆盖前面的配置，前面的配置为了去掉警告提示。  
log4j.logger.priv.noby.spring8.dao=DEBUG,CONSOLE  
  
# 表示定义了一个名为CONSOLE的appender，它的类型是ConsoleAppender，即将日志输出到控制台。  
log4j.appender.CONSOLE=org.apache.log4j.ConsoleAppender  
# 表示定义了CONSOLE这个appender的输出格式，这里使用的是PatternLayout，即按照指定的格式输出日志信息。  
log4j.appender.CONSOLE.layout=org.apache.log4j.PatternLayout  
# 表示指定了输出格式的具体内容，%m表示输出日志信息，%t表示输出线程名，%c表示输出日志所在的类的全限定名（%c{1}表示输出日志所在类的简称，即类名去掉包名后的名称），%l表示日志输出的位置信息，%n表示换行。  
log4j.appender.CONSOLE.layout.ConversionPattern=%p %c{1}:%L %m%n  
  
  
# 指定了日志输出的方式为每天生成一个日志文件  
log4j.appender.FILE=org.apache.log4j.DailyRollingFileAppender  
# 表示定义了FILE这个appender的输出格式，这里使用的是PatternLayout，即按照指定的格式输出日志信息。  
log4j.appender.FILE.layout=org.apache.log4j.PatternLayout  
# 指定了日志输出的格式，其中%d表示日期，%p表示日志级别，%m表示日志信息，%t表示线程名，%c表示类名，%l表示日志输出的位置信息，%n表示换行。  
log4j.appender.FILE.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} [%p] %m [%t] %c [%l]%n  
# 指定了日志输出的文件路径  
log4j.appender.FILE.File=file.log
```

#### entity

```java
package priv.noby.spring8.entity;  
  
import lombok.AllArgsConstructor;  
import lombok.Data;  
import lombok.NoArgsConstructor;  
  
import java.util.List;  
@Data  
@AllArgsConstructor  
@NoArgsConstructor  
public class Dep {  
    private Integer id;  
    private String name;  
    private List<Emp> empList;  
}
```

```java
package priv.noby.spring8.entity;  
  
import lombok.AllArgsConstructor;  
import lombok.Data;  
import lombok.NoArgsConstructor;  
  
@Data  
@AllArgsConstructor  
@NoArgsConstructor  
public class Emp {  
    private Integer id;  
    private String name;  
    private Dep dep;  
}
```

#### dao

```java
package priv.noby.spring8.dao;  
  
import priv.noby.spring8.entity.Emp;  
  
import java.util.List;  
  
public interface EmpDao {  
    List<Emp> selectAll();  
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>  
<!DOCTYPE mapper  
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"  
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="priv.noby.spring8.dao.EmpDao">  
    <resultMap id="empMap" type="emp">  
        <id column="id" property="id"/>  
        <result column="name" property="name"/>  
        <association column="did" property="dep" javaType="Dep" select="selectDepById"/>  
    </resultMap>  
    <select id="selectAll" resultMap="empMap">  
        select id, name, did  
        from emp    </select>  
    <select id="selectDepById" resultType="Dep">  
        select id, name  
        from dep        where id = #{did}    </select>  
  
</mapper>
```

#### service

```java
package priv.noby.spring8.service;  
  
import priv.noby.spring8.entity.Emp;  
  
import java.util.List;  
  
public interface EmpService {  
    List<Emp> selectAll();  
}
```

```java
package priv.noby.spring8.service.impl;  
  
import priv.noby.spring8.dao.EmpDao;  
import priv.noby.spring8.entity.Emp;  
import priv.noby.spring8.service.EmpService;  
  
import java.util.List;  
  
public class EmpServiceImpl implements EmpService {  
    EmpDao empDao;  
  
    public void setEmpDao(EmpDao empDao) {  
        this.empDao = empDao;  
    }  
  
    @Override  
    public List<Emp> selectAll() {  
        return empDao.selectAll();  
    }  
}
```
#### servlet

```java
package priv.noby.spring8.servlet;  
  
import com.alibaba.fastjson.JSON;  
import com.alibaba.fastjson.serializer.SerializerFeature;  
import org.springframework.context.ApplicationContext;  
import org.springframework.web.context.support.WebApplicationContextUtils;  
import priv.noby.spring8.entity.Emp;  
import priv.noby.spring8.service.EmpService;  
  
import javax.servlet.ServletException;  
import javax.servlet.annotation.WebServlet;  
import javax.servlet.http.HttpServlet;  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  
import java.io.IOException;  
import java.util.List;  
  
/**  
 * spring 通过web配置文件中配置监听器配置 servlet  
 */@WebServlet("/empServlet")  
public class EmpServlet extends HttpServlet {  
    @Override  
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {  
        response.setContentType("text/html;charset=utf-8");  
        //可读取web配置文件监听器的方式读取Spring配置文件  
        /*  
        应用上下文对象(Spring上下文对象)如果是通过new ClasspathXmlApplicationContext(spring配置文件)方式获取的，那么每次从  
        容器中获得Bean时都要编写new ClasspathXmlApplicationContext(spring配置文件)，这样的弊端是配置文件加载多次，应用上下文对象创建多次。  
        在Web项目中，可以使用ServletContextListener.监听Web应用的启动，我们可以在Web应用启动时，就加  
        载Spring的配置文件，创建应用上下文对象Application Context,在将其存储到最大的域servletContext域  
        中，这样就可以在任意位置从域中获得应用上下文Application Context对象了。  
        上面的分析不用手动实现，Spring提供了一个监听器ContextLoaderListener就是对上述功能的封装，该监  
        听器内部加载Spring配置文件，创建应用上下文对象，并存储到ServletContext域中，提供了一个客户端工  
        具WebApplicationContextUtils供使用者获得应用上下文对象。  
        所以我们需要做的只有两件事：        ①在web.xml中配置ContextLoaderListener监听器（导入spring-web坐标  
        ②使用WebApplicationContextUtils获得应用上下文对象ApplicationContext  
         *///        ApplicationContext applicationContext = (ApplicationContext) this.getServletContext()  
//                .getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);  
        ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(this.getServletContext());  
        EmpService empService = (EmpService) applicationContext.getBean("empService");  
        String method = request.getParameter("method");  
        if ("init".equals(method)) {  
            List<Emp> empList = empService.selectAll();  
            String s = JSON.toJSONString(empList, SerializerFeature.DisableCircularReferenceDetect);  
            response.getWriter().write(s);  
        }  
    }  
  
    @Override  
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
  
    }  
}
```

