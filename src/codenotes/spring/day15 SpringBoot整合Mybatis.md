---
title: day15 SpringBoot整合Mybatis
icon: write
category:
    - Spring
    - SpringBoot
tag:
    - Spring
    - SpringBoot
    - logback日志
    - 热部署
    - 事务
    - Mybatis
sticky: false
star: false
article: true
timeline: true
---

## 内容

- springboot 整合 MyBatis
    - 导入坐标
        - mybatis 的场景启动器
        - jdbc
    - properties 配置文件
        - 配置实体类包扫描
        - 配置映射文件路径
        - 配置数据库连接
    - 启动类上加 @MapperScan("priv.noby.springboot2.dao") 配置 dao 实体类包扫描
- 事务管理
        - 启动类配置 @EnableTransactionManagement
        - 事务类配置 @Transactional
    - 配置第三方数据源
        - pom 坐标设置
        - 配置文件配置连接参数
- 日志的使用
    - 配置文件中配置
- logback 的日志级别（级别从低到高）
    - Trace: 是追踪，就是程序推进以下，你就可以写个 trace 输出，所以 trace 应该会特别多，不过没关系，我们可以设置最低日志级别不让他输出。
    - Debug: 指出细粒度信息事件对调试应用程序是非常有帮助的。
    - Info: 消息在粗粒度级别上突出强调应用程序的运行过程。
    - Warn: 输出警告及 warn 以下级别的日志。
    - Error: 输出错误信息日志。
- 通过 lombok 的注解@log4j 使用 log 对象打印日志
- 热部署的配置
    - 导入 pom 坐标
    - 开启自动编译

## logback

- Logback 是一个流行的、灵活的、可扩展的日志框架，它由 Ceki Gülcü 开发并得到了广泛的应用。Logback 是由 log4j 项目的创始人 Ceki Gülcü 开发的，在其之前的版本中也包含了对 log4j 的完全兼容。
- Logback 是一个分层的框架，它包含三个模块：
    - logback-core：提供了日志框架的核心功能，如日志事件、上下文和上下文管理等。
    - logback-classic：基于 log4j 的设计，提供了一个完整的日志实现，包括 log4j 的所有特性和一些新功能。Logback-classic 模块可以完全兼容 log4j，因此可以直接替换 log4j 以获得更好的性能和更好的灵活性。
    - logback-access：提供了访问日志（access log）的实现，包括 HTTP 请求和响应的详细信息等。
- Logback 支持多种配置方式，包括 XML、Groovy 和 Java Config 等，其中 XML 配置方式最为常用。它提供了丰富的日志级别、多种 Appender、Layout 等功能，可以根据需要对日志进行精确控制。

## 热部署

- 热部署（Hot Deployment）是指在应用程序运行期间更新应用程序的代码或资源，无需停止和重启应用程序。热部署可以显著提高开发效率，特别是在开发过程中需要频繁修改代码时，通过热部署可以省去重启应用程序的时间，让开发者更加高效地进行代码开发和测试。
- 在 Java 后端开发中，热部署通常是通过类加载器（ClassLoader）来实现的。当应用程序启动时，类加载器会从指定的路径中加载类和资源。在热部署过程中，新的类和资源将被加载到指定的路径中，类加载器会重新加载这些类和资源，使得应用程序能够立即使用新的代码和资源，无需重启应用程序。
- 常见的 Java 热部署技术包括：
    - JRebel：JRebel 是一个商业化的 Java 热部署工具，它可以在运行时动态地替换应用程序中的类和资源，从而实现热部署。
    - Spring Boot DevTools：Spring Boot DevTools 是 Spring Boot 官方提供的开发工具，它包含了很多实用的功能，其中就包括热部署。
    - DCEVM：DCEVM 是一个增强版的 Java 虚拟机，它可以实现在运行时更新类定义，从而实现热部署。

## 代码

### pom

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">  
    <modelVersion>4.0.0</modelVersion>  
    <groupId>priv.noby</groupId>  
    <artifactId>springboot2</artifactId>  
    <version>0.0.1-SNAPSHOT</version>  
  
    <properties>        <java.version>1.8</java.version>  
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>  
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>  
        <!--        <spring-boot.version>2.3.7.RELEASE</spring-boot.version>-->  
        <spring-boot.version>2.3.12.RELEASE</spring-boot.version>  
    </properties>  
    <dependencies>        <!--web 场景的场景启动器，其作用是导入 SpringMVC 中的常用配置和 jar 包-->  
        <!--继承自 <dependencyManagement>-->        <dependency>  
            <groupId>org.springframework.boot</groupId>  
            <artifactId>spring-boot-starter-web</artifactId>  
        </dependency>        <!--热部署插件-->  
        <dependency>  
            <groupId>org.springframework.boot</groupId>  
            <artifactId>spring-boot-devtools</artifactId>  
        </dependency>        <dependency>            <groupId>org.projectlombok</groupId>  
            <artifactId>lombok</artifactId>  
        </dependency>        <!--mybatis 的场景启动器-->  
        <dependency>  
            <groupId>org.mybatis.spring.boot</groupId>  
            <artifactId>mybatis-spring-boot-starter</artifactId>  
            <version>2.1.2</version>  
        </dependency>        <dependency>            <groupId>mysql</groupId>  
            <artifactId>mysql-connector-java</artifactId>  
        </dependency>        <!--配置第三方数据源-->  
        <dependency>  
            <groupId>com.alibaba</groupId>  
            <artifactId>druid-spring-boot-starter</artifactId>  
            <version>1.1.16</version>  
        </dependency>  
        <dependency>            <groupId>org.springframework.boot</groupId>  
            <artifactId>spring-boot-starter-test</artifactId>  
            <scope>test</scope>  
            <exclusions>                <exclusion>                    <groupId>org.junit.vintage</groupId>  
                    <artifactId>junit-vintage-engine</artifactId>  
                </exclusion>            </exclusions>        </dependency>    </dependencies>  
    <dependencyManagement>        <dependencies>            <dependency>                <groupId>org.springframework.boot</groupId>  
                <artifactId>spring-boot-dependencies</artifactId>  
                <version>${spring-boot.version}</version>  
                <type>pom</type>  
                <scope>import</scope>  
            </dependency>        </dependencies>    </dependencyManagement>  
    <build>        <plugins>            <plugin>                <groupId>org.apache.maven.plugins</groupId>  
                <artifactId>maven-compiler-plugin</artifactId>  
                <version>3.8.1</version>  
                <configuration>                    <source>1.8</source>  
                    <target>1.8</target>  
                    <encoding>UTF-8</encoding>  
                </configuration>            </plugin>            <plugin>                <groupId>org.springframework.boot</groupId>  
                <artifactId>spring-boot-maven-plugin</artifactId>  
<!--                <version>2.3.7.RELEASE</version>-->  
                                <version>2.3.12.RELEASE</version>  
                <configuration>                    <mainClass>priv.noby.springboot2.Springboot2Application</mainClass>  
                </configuration>                <executions>                    <execution>                        <id>repackage</id>  
                        <goals>                            <goal>repackage</goal>  
                        </goals>                    </execution>                </executions>            </plugin>        </plugins>    </build></project>
```

### 配置文件

```properties
#日志配置  
logging.level.priv.noby.springboot2=debug  
logging.pattern.console=[%thread] %-5level %logger{0} - %msg%n  
#配置实体类  
mybatis.type-aliases-package=priv.noby.springboot2.entity  
  
#配置映射文件的路径  
mybatis.mapper-locations=classpath:/priv/noby/springboot2/dao/*Dao.xml  
  
#配置数据库连接  
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver  
spring.datasource.url=jdbc:mysql:///stage3  
spring.datasource.username=root  
spring.datasource.password=123  
#配置 Druid 连接  
#连接池最大并发连接数，即同时可以创建的连接数。  
spring.datasource.druid.max-active=100  
#连接池的初始大小，即在应用程序启动时连接池中连接的数量。  
spring.datasource.druid.initial-size=10  
#连接池中最小的空闲连接数。当应用程序需要从连接池中获取连接时，如果空闲连接数少于该值，则会创建新的连接。  
spring.datasource.druid.min-idle=10  
#获取连接的最长等待时间，单位为毫秒。当连接池中没有可用的连接时，应用程序会等待一段时间，如果超过了该时间，则会抛出异常。  
spring.datasource.druid.max-wait=10000
```

### entity

```java
package priv.noby.springboot2.entity;  
  
import lombok.AllArgsConstructor;  
import lombok.Data;  
import lombok.NoArgsConstructor;  
  
@Data  
@AllArgsConstructor  
@NoArgsConstructor  
public class Account {  
    private Integer id;  
    private String name;  
    private Integer money;  
}
```

### dao

```xml
<?xml version="1.0" encoding="UTF-8" ?>  
<!DOCTYPE mapper  
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"  
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">  
<mapper namespace="priv.noby.springboot2.dao.AccountDao">  
    <update id="update">  
        update account  
        set money=#{money}  
        where name = #{name}  
    </update>  
  
    <select id="selectByName" resultType="priv.noby.springboot2.entity.Account">  
        select *  
        from account  
        where name = #{name}  
    </select>  
</mapper>
```

```java
package priv.noby.springboot2.dao;  
  
  
import priv.noby.springboot2.entity.Account;  
  
//mybatis的注解，表示该接口类的实现类对象交给mybatis底层创建，然后交由Spring框架管理；使用该注解后可省略驱动类中的@MapperScan()注解的书写  
//@Mapper  
public interface AccountDao {  
    Account selectByName(String name);  
    boolean update(Account account);  
}
```

### service

```java
package priv.noby.springboot2.service;  
  
public interface AccountService {  
    void transfer(String send,String receive,int money);  
}
```

```java
package priv.noby.springboot2.service.impl;  
  
  
import org.springframework.stereotype.Service;  
import org.springframework.transaction.annotation.Transactional;  
import priv.noby.springboot2.dao.AccountDao;  
import priv.noby.springboot2.entity.Account;  
import priv.noby.springboot2.service.AccountService;  
  
import javax.annotation.Resource;  
  
@Service  
public class AccountServiceImpl implements AccountService {  
    @Resource  
    AccountDao accountDao;  
  
    //织入事务管理  
    @Transactional//设置回滚的异常（默认为runtimeException）  
    @Override  
    public void transfer(String send, String receive, int money) {  
        Account sendAcc = accountDao.selectByName(send);  
        Account receiveAcc = accountDao.selectByName(receive);  
        if (sendAcc != null && receiveAcc != null) {  
            if (money <= 0) {  
                System.out.println("金额无效");  
            } else if (sendAcc.getMoney() >= money) {  
                sendAcc.setMoney(sendAcc.getMoney() - money);  
                accountDao.update(sendAcc);  
                //模拟事务异常  
                int i = 1/0;  
                receiveAcc.setMoney(receiveAcc.getMoney() + money);  
                accountDao.update(receiveAcc);  
                System.out.println("转账成功");  
            } else {  
                System.out.println("余额不足");  
            }  
        } else {  
            System.out.println("账号不存在");  
        }  
    }  
}
```

### test

```java
package priv.noby.springboot2.dao;  
  
import org.junit.jupiter.api.Test;  
import org.springframework.boot.test.context.SpringBootTest;  
import priv.noby.springboot2.entity.Account;  
  
import javax.annotation.Resource;  
  
  
/**  
 * 测试mybatis是否整合成功  
 *  
 * @author Noby  
 * @since 2022/10/23  
 */@SpringBootTest  
public class AccountDaoTest {  
    @Resource  
    AccountDao accountDao;  
  
    @Test  
    public void selectByName() {  
        Account noby = accountDao.selectByName("noby");  
        System.out.println("noby = " + noby);  
    }  
}
```

```java
package priv.noby.springboot2.service;  
  
  
import org.junit.jupiter.api.Test;  
import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.boot.test.context.SpringBootTest;  
  
/**  
 * 测试事务是否成功  
 */  
@SpringBootTest  
public class AccountServiceTest {  
  
    @Autowired  
    AccountService accountService;  
    @Test  
    public void testTransfer() {  
        accountService.transfer("noby", "kace",100 );  
    }  
}
```

```java
package priv.noby.springboot2;  
  
import lombok.extern.slf4j.Slf4j;  
import org.junit.jupiter.api.Test;  
import org.slf4j.Logger;  
import org.slf4j.LoggerFactory;  
import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.boot.test.context.SpringBootTest;  
  
import javax.sql.DataSource;  
  
@SpringBootTest  
// 该注解为 lombok 的注解，用于输出日志（自动创建日志对象）  
@Slf4j  
public class Springboot2ApplicationTests {  
    @Autowired  
    DataSource dataSource;  
  
    /**  
     * 查看数据源  
     * 默认为 springboot 自带的 HikariDataSource  
     * 可配置第三方数据源 druid  
     */    @Test  
    void contextLoads2() {  
        System.out.println("dataSource = " + dataSource);  
    }  
  
    /**  
     * springboot 中日志的使用(spring5 以后使用的都是 logback)  
     * 日志门面（接口）        日志实现  
     * commons-logging      log4j    (spring4使用的也是这一套日志技术）  
     * slf4j                logback  (Spring5使用这种）  
     *  
     * 在配置文件中指定输出的级别和识别的包路径  
     */  
    @Test  
    void logger() {  
        System.out.println("SpringbootApplicationTests.logger");  
        Logger logger = LoggerFactory.getLogger(this.getClass());  
        logger.trace("trace");  
        logger.debug("debug");  
        logger.info("info");  
        logger.warn("warn");  
        logger.error("error");  
    }  
  
    /**  
     * 通过 lombok 输出日志  
     */  
    @Test  
    void logger2() {  
        System.out.println("SpringbootApplicationTests.logger2");  
        log.trace("trace");  
        log.debug("debug");  
        log.info("info");  
        log.warn("warn");  
        log.error("error");  
    }  
  
  
}
```
