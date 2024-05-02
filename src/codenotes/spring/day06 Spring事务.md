---
title: day06 Spring事务
icon: write
category:
    - Spring
tag:
    - Spring
    - 事务
sticky: false
star: false
article: true
timeline: true
---

## 编程式事务和声明式事务

- 编程式事务：使用代码控制事务
    - Spring 中编程式事务的相关对象
        - PlatformTransactionManager 接口是 spring 的事务管理器，它里面提供了我们常用的操作事务的方法。
            - 根据不同的 DAO(JDBC,Mybatis) 指定不同的事务实现
        - TransactionDefinition 是事务的定义信息对象
            - 事务的隔离级别
                - 读未提交
                - 读提交
                - 可重复度
                - 序列化读
            - 事务的传播行为：当一个业务逻辑层调用另一个业务逻辑层时，调用业务逻辑层的事务和被调用业务逻辑层事务的关系
                - REQUIRED：如果当前没有事务，就新建一个事务，如果已经存在一个事务中，加入到这个事务中。一般的选择（默认值）
                - SUPPORTS：支持当前事务，如果当前没有事务，就以非事务方式执行（没有事务）
                - MANDATORY：使用当前的事务，如果当前没有事务，就抛出异常
                - REQUERS_NEW：新建事务，如果当前在事务中，把当前事务挂起。
                - NOT_SUPPORTED：以非事务方式执行操作，如果当前存在事务，就把当前事务挂起
                - NEVER：以非事务方式运行，如果当前存在事务，抛出异常
                - NESTED：如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则执行 REQUIRED 类似的操作
            - 超时时间：默认值是 -1，没有超时限制。如果有，以秒为单位进行设置
            - 是否只读：建议查询时设置为只读
        - TransactionDefinition 接口提供的是事务具体的运行状态
- 声明式事务：使用配置控制事务，底层通过 AOP 技术实现
    - 事务管理不侵入开发的组件。具体来说，业务逻辑对象就不会意识到正在事务管理之中，事实上也应该如 此，因为事务管理是属于系统层面的服务，而不是业务逻辑的一部分，如果想要改变事务管理策划的话， 也只需要在定义文件中重新配置即可
    - 在不需要事务管理的时候，只要在设定文件上修改一下，即可移去事务管理服务，无需改变代码重新编译 ，这样维护起来极其方便

## 知识点

- Spring 中的事务
    - 事务的配置
        - 约束头
            - xmlns:tx="http://www.springframework.org/schema/tx"
            - http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">
        - 配置事务注解驱动
        - 配置事务管理 bean
    - 需要事务管理的方法上加入注解 @Transactional
        - 设置隔离级别：@Transactional(propagation=Propagation.REQUIRES_NEW)

## 代码示例

### pom

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>priv.noby</groupId>
    <artifactId>spring7</artifactId>
    <version>1.0-SNAPSHOT</version>

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
            <artifactId>spring-test</artifactId>
            <version>5.2.15.RELEASE</version>
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
        <!--事务相关的坐标-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-tx</artifactId>
            <version>5.2.15.RELEASE</version>
        </dependency>
        <!--AOP 织入的方式使用 aspectj(应用性好于spring-context自带的AOP，Spring官方推荐使用该方式进行织入配置)-->
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
            <version>1.9.6</version>
        </dependency>
    </dependencies>

</project>
```

### Resource

```xml
<?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns:aop="http://www.springframework.org/schema/aop"
           xmlns:context="http://www.springframework.org/schema/context"
           xmlns:tx="http://www.springframework.org/schema/tx"
           xsi:schemaLocation="
       http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd       http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd       http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd       http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">

    <context:component-scan base-package="priv.noby.spring7.service"/>
    <context:property-placeholder location="db.properties" system-properties-mode="NEVER"/>
    <!--配置 SqlSessionFactoryBean，创建 SqlSession 对象 (来自 Spring mybatis 的整合包)-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="typeAliasesPackage" value="priv.noby.spring7.entity"/>
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <!--配置数据源-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driverClassName}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
    <!--MapperScannerConfigurer，用于扫描 Dao 和创建 sqlSession-->    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="priv.noby.spring7.dao"/>
        <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
    </bean>

    <!--配置平台事务管理器-->
    <!--不同的dao层会使用不同的实现-->
    <!--该标签对标编程式事务中的PlatformTransactionManager接口的作用-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!--通知  事务的增强-->
    <!--该标签对标编程式事务中的TransactionDefinition对象的作用-->
    <tx:advice id="txAdvice" transaction-manager="transactionManager">
        <!--控制事务的隔离级别、传播行为、超时时间、是否可读等事务的属性信息-->
        <tx:attributes>
            <!--tx:method代表切点方法的事务参数的配置，不同的方法可配置不同的事务属性-->
            <!-- isolation:事务的隔离级别 propogation：事务的传播行为 timeout：超时时间 read-only：是否只读-->
            <tx:method name="transfer" isolation="REPEATABLE_READ" propagation="REQUIRED" read-only="false"/>
<!--            <tx:method name="save" isolation="REPEATABLE_READ" propagation="REQUIRED" read-only="false"/>-->
<!--            <tx:method name="findAll" isolation="REPEATABLE_READ" propagation="REQUIRED" read-only="true"/>-->
<!--            <tx:method name="update*" isolation="REPEATABLE_READ" propagation="REQUIRED" read-only="true"/>-->
            <!--任意方法，且使用默认配置-->
<!--            <tx:method name="*"/>-->
        </tx:attributes>
    </tx:advice>

    <!--配置事务的aop织入-->
    <aop:config>
        <!--advice-ref="txAdvice"表示引用事务的通知，pointcut表示切入点(哪一个方法使用事务)-->
        <aop:advisor advice-ref="txAdvice" pointcut="execution(* priv.noby.note.service.impl.*.*(..))"/>
<!--        <aop:pointcut id="txPointcut" expression="execution(* AccountServiceImpl.transfer(..))"/>-->
<!--        <aop:advisor advice-ref="txAdvice" pointcut-ref="txPointcut"/>-->
    </aop:config>
</beans>
```

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd        http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">

    <context:component-scan base-package="priv.noby.spring7.service"/>
    <context:property-placeholder location="db.properties" system-properties-mode="NEVER"/>
    <!--配置 SqlSessionFactoryBean，创建 SqlSession 对象 (来自 Spring mybatis 的整合包)-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="typeAliasesPackage" value="priv.noby.spring7.entity"/>
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <!--配置数据源-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driverClassName}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
    <!--MapperScannerConfigurer，用于扫描 Dao 和创建 sqlSession-->    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="priv.noby.spring7.dao"/>
        <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
    </bean>

    <!--Spring提供事务管理，用来实现控制事务-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <!--配置事务注解驱动：底层就是使用AOP给主业务方法织入事务管理，用于事务相关注解-->
    <tx:annotation-driven transaction-manager="transactionManager"/>

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

# priv.noby.spring7.dao表示在当前类生效的配置，这个类的日志级别设置为debug，并将日志输出到CONSOLE这个appender中。
# 虽然前面设置了log4j.rootLogger=OFF，但这行配置将覆盖前面的配置，前面的配置为了去掉警告提示。
log4j.logger.priv.noby.spring7.dao=DEBUG,CONSOLE

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

### entity

```java
package priv.noby.spring7.entity;

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

```java
package priv.noby.spring7.dao;

import priv.noby.spring7.entity.Account;

public interface AccountDao {
    Account selectByName(String name);
    boolean update(Account account);
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="priv.noby.spring7.dao.AccountDao">
    <update id="update">
        update account set money=#{money} where name=#{name}
    </update>

    <select id="selectByName" resultType="priv.noby.spring7.entity.Account">
        select * from account where name=#{name}
    </select>
</mapper>
```

### service

```java
package priv.noby.spring7.service;

public interface AccountService {
    void transfer(String send,String receive,int money);
}
```

```java
package priv.noby.spring7.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import priv.noby.spring7.dao.AccountDao;
import priv.noby.spring7.entity.Account;
import priv.noby.spring7.service.AccountService;

/**
 * 通过配置文件配置事务
 */
@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    AccountDao accountDao;

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
                //模拟事务出现异常，查看是否回滚
                int i = 1 / 0;
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

```java
package priv.noby.spring7.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import priv.noby.spring7.dao.AccountDao;
import priv.noby.spring7.entity.Account;
import priv.noby.spring7.service.AccountService;

/**
 * 通过注解配置事务
 */
@Service("accountServiceImpl2")
public class AccountServiceImpl2 implements AccountService {
    @Autowired
    AccountDao accountDao;

//        @Transactional(isolation = Isolation.REPEATABLE_READ,propagation = Propagation.REQUIRED,readOnly = false)//织入事务管理
    @Transactional(rollbackFor = Exception.class)//设置回滚的异常（默认为runtimeException）
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
                //模拟事务出现异常，查看是否回滚
                int i = 1 / 0;
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
package priv.noby.spring7.service.impl;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import priv.noby.spring7.service.AccountService;


/**
 * 配置文件配置的事务测试
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class AccountServiceImplTest {
    @Autowired
    @Qualifier("accountServiceImpl")
    private AccountService accountService;

    @Test
    public void testTransfer() {
        accountService.transfer("noby", "kace",100 );
    }
}
```

```java
package priv.noby.spring7.service.impl;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import priv.noby.spring7.service.AccountService;

/**
 * 注解配置的事务测试
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext-anno.xml")
public class AccountServiceImpl2Test {
    @Autowired
    @Qualifier("accountServiceImpl2")
    private AccountService accountService;

    @Test
    public void testTransfer() {
        accountService.transfer("noby", "kace",100 );
    }
}
```
