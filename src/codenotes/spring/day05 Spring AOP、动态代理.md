---
title: day05 Spring AOP
icon: write
category:
    - Spring
tag:
    - Spring
    - AOP
    - 动态代理
    - JDK动态代理
    - CGLIB动态代理
sticky: false
star: false
article: true
timeline: true
---

## AOP

- Spring AOP（Aspect-Oriented Programming，面向切面编程）是 Spring 框架中的一个重要特性，它提供了一种在不修改原始代码的情况下，对系统进行横切关注点的处理的能力。Spring AOP 基于动态代理机制实现，在运行时通过对指定的切点（Pointcut）进行拦截，将横切逻辑（Advice）织入到系统中的目标方法（Join Point）中。
- 在 Spring AOP 中，横切逻辑（Advice）是指那些与核心业务逻辑无关的代码，比如日志记录、性能统计、事务管理等。横切逻辑通常被定义为切面（Aspect），切面通过定义切点（Pointcut）来确定哪些方法需要被拦截，然后将横切逻辑织入到这些方法中。
- Spring AOP 支持五种类型的通知（Advice）：
    - 前置通知（Before Advice）：在目标方法执行前执行。
    - 后置通知（After Advice）：在目标方法执行后执行。
    - 返回通知（After Returning Advice）：在目标方法返回结果后执行。
    - 异常通知（After Throwing Advice）：在目标方法抛出异常后执行。
    - 环绕通知（Around Advice）：在目标方法执行前后都可以执行。
- Spring AOP 通过注解或 XML 配置的方式定义切面和切点，并将切面织入到目标方法中。在应用开发中，开发人员可以使用 Spring AOP 实现诸如日志记录、性能统计、事务管理等横切逻辑的处理，从而提高系统的可维护性和可扩展性。

## 动态代理

- JDK 动态代理和 CGLIB 动态代理是 Java 中两种常用的动态代理方式。它们的区别主要体现在以下几个方面：
    - 基于的技术不同：JDK 动态代理是基于 Java 反射机制实现的，而 CGLIB 动态代理是通过继承目标类来生成代理对象。
    - 代理对象的生成方式不同：JDK 动态代理要求目标类实现一个或多个接口，代理对象是根据接口生成的，而 CGLIB 动态代理则不要求目标类实现接口，它是通过生成目标类的子类来创建代理对象的。
    - 性能差异：JDK 动态代理在代理接口方法调用时的性能表现要优于 CGLIB 动态代理。原因在于 JDK 动态代理使用 Java 自带的反射机制调用目标方法，而 CGLIB 动态代理则是通过继承目标类并重写目标方法的方式进行代理，所以 CGLIB 动态代理的性能开销要比 JDK 动态代理大。
    - 对象类型不同：JDK 动态代理只能代理实现了接口的类，而 CGLIB 动态代理则可以代理没有实现接口的类，但是如果目标类实现了接口，CGLIB 动态代理也可以代理。
    - 版本依赖性：JDK 动态代理是 JDK 自带的，所以不需要额外的依赖；而 CGLIB 动态代理需要通过添加 CGLIB 库的方式使用，不同的 CGLIB 版本也会影响代理效果。
- 综上所述，JDK 动态代理更适合于代理接口的场景，而 CGLIB 动态代理则更适合于代理非接口的场景。在实际应用中，需要根据具体的场景和需求选择适合的代理方式。

## 知识点

- Spring 实现 AOP 的过程
    - Spring 框架监控切入点方法的执行。一旦监控到切入点方法被运行，使用代理机制，动态创建目标对象的代理对象，根据通知类别，在代理对象的对应位置，将通知对应的功能织入，完成完整的代码逻辑运行。
- Spring AOP 的底层实现原理
    - 基于动态代理技术，spring 框架会根据目标类是否实现了接口来决定采用 jdk 或 cglib 动态代理的方式。
- Spring 实现动态代理的两种方式 (代理对象由目标对象和增强代码组成)
    - JDK 代理：基于目标对象的父接口生成代理对象
    - cglib 代理：基于目标对象 (父类) 生成的代理对象 (子类)
- AOP 编程术语
    - Target（目标对象）：代理的目标对象 (将被增强的对象)
    - Proxy （代理对象）：一个类被 AOP 织入增强后，就产生一个结果代理类 (被增强后的对象)
    - Joinpoint（连接点）：所谓连接点是指那些被拦截到的点。在 spring 中,这些点指的是方法，因为 spring 只支持方法类型的连接点 (可以插入增强代码的方法)
    - Pointcut（切入点）：所谓切入点是指我们要对哪些 Joinpoint 进行拦截的定义 (已经插入增强代码的方法)
    - Advice（通知/增强）：所谓通知是指拦截到 Joinpoint 之后所要做的事情就是通知 (增强代码)
    - Aspect（切面）：是切入点和通知（引介）的结合 (增强代码和被增强的方法)
    - Weaving（织入）：是指把增强应用到目标对象来创建新的代理对象的过程。spring 采用动态代理织入，而 AspectJ 采用编译期织入和类装载期织入 (将增强代码插入增强方法的过程)
- 配置文件配置 AOP 的方式
    - 编写核心业务代码（将被增强的对象的方法）
    - 编写切面类，切面类中有通知 (增强代码)
    - 在配置文件中，配置织入关系，即将哪些通知与哪些连接点进行结合
        - 切点表达式
            - 切点表达式的写法 execution([修饰符] 返回值类型 包名.类名.方法名 (参数))：
                - 访问修饰符可以省略
                - 返回值类型、包名、类名、方法名可以使用星号\* 代表任意
                - 包名与类名之间一个点 . 代表当前包下的类，两个点 .. 表示当前包及其子包下的类
                - 参数列表可以使用两个点 .. 表示任意个数，任意类型的参数列表
            - 例如
                - `execution(public void com.itheima.aop.Target.method())` 指定包的指定方法增强
                - `execution(void com.itheima.aop.Target.*(..))` 指定包 Target 类，返回值为 void，参数为任意的方法增强
                - `execution(* com.itheima.aop.*.*(..))` 指定包的任意类，返回值为任意，参数为任意的方法增强
                - `execution(* com.itheima.aop..*.*(..))` 指定包及其子包的任意类，返回值为任意，参数为任意的方法增强
            - 切点表达式的抽取
        - 通知的种类
            - 前置通知 <aop:before> 用于配置前置通知。指定增强的方法在切入点方法之前执行
            - 后置通知 <aop:after-returning> 用于配置后置通知。指定增强的方法在切入点方法之后执行
            - 环绕通知 <aop:around> 用于配置环绕通知。指定增强的方法在切入点方法之前和之后都执行
            - 异常抛出通知 <aop:throwing> 用于配置异常抛出通知。指定增强的方法在出现异常时执行
            - 最终通知 <aop:after> 用于配置最终通知。无论增强方式执行是否有异常都会执行
- 注解配置 AOP 的方式
    - @Aspect 标注切面类
    - @Before 前置通知
    - @AfterReturning 后置通知
    - @Around 环绕通知
    - @AfterThrowing 异常抛出通知
    - After 最终通知
    - @Pointcut 切面表达式注解
- AOP 和方法抽取的区别：当多个方法使用到相同代码逻辑时，可以进行传统的方法抽取 (编译时实现增强)，也可以使用 AOP 对目标方法织入动态代理代码 (运行时实现增强)；AOP 相对传统的方法的抽取而言，相同的代码逻辑不需要与目标方法耦合 (不需要再目标方法中调用该抽取方法)，而是通过配置文件配置，实现了代码的解耦。

## 代码示例

### pom

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>priv.noby</groupId>
    <artifactId>spring5</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.2.15.RELEASE</version>
        </dependency>
        <!--AOP 织入的方式使用 aspectj(应用性好于spring-context自带的AOP，Spring官方推荐使用该方式进行织入配置)-->
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
            <version>1.9.6</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.2.15.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
        </dependency>
    </dependencies>
</project>
```

### Resource

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd        http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd        ">
    <!--目标对象-->
    <bean id="target" class="priv.noby.spring5.aop.Target"/>

    <!--切面对象-->
    <bean id="myAspect" class="priv.noby.spring5.aop.MyAspect"/>

    <!--配置织入：告诉spring框架 哪些方法(切点)需要进行哪些增强(前置、后置...)-->
    <aop:config>
        <!--声明切面-->
        <aop:aspect ref="myAspect">
            <!--抽取切点表达式-->
            <aop:pointcut id="myPointcut" expression="execution(* priv.noby.spring5.aop.*.*(..))"/>
            <!--切面：切点+通知-->
            <!--method="before"表示的是myAspect类中的before()方法为增强的代码-->
<!--            <aop:before method="before" pointcut="execution(* priv.noby.spring5.aop.*.*(..))"/>-->
<!--            <aop:after-returning method="afterReturning" pointcut="execution(* priv.noby.spring5.aop.*.*(..))"/>-->
<!--            <aop:around method="around" pointcut="execution(* priv.noby.spring5.aop.*.*(..))"/>-->
<!--            <aop:after-throwing method="afterThrowing" pointcut="execution(* priv.noby.spring5.aop.*.*(..))"/>-->
<!--            <aop:after method="after" pointcut="execution(* priv.noby.spring5.aop.*.*(..))"/>-->

            <!--使用抽取的表达式-->
            <aop:around method="around" pointcut-ref="myPointcut"/>
            <aop:after method="after" pointcut-ref="myPointcut"/>
        </aop:aspect>
    </aop:config>
</beans>
```

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd        http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd        ">

    <!--组件扫描-->
    <context:component-scan base-package="priv.noby.spring5.aopanno"/>

    <!--aop自动代理-->
    <!--用于识别切面类中有关aop有关的注解-->
    <aop:aspectj-autoproxy/>
</beans>
```

### JDK 自定义实现动态代理

```java
package priv.noby.spring5.jdkproxy;

/**
 * 目标接口(将被增强的类的接口)
 * * @author Noby
 * @since 2022/10/15
 */public interface TargetInterface {
    void method();
}
```

```java
package priv.noby.spring5.jdkproxy;

/**
 * 增强类(目标类中的目标方法将要织入增强代码，增强后生成代理对象)

 * @author Noby
 * @since 2022/10/15
 */public class Advice {//中文为通知
    public void before() {
        System.out.println("Advice.before 增强对象的前置增强方法");
    }

    public void afterReturning() {
        System.out.println("Advice.afterReturning 增强对象的后置增强方法");
    }
}
```

```java
package priv.noby.spring5.jdkproxy;

/**
 * 目标类(将被增强的类)
 * * @author Noby
 * @since 2022/10/15
 */public class Target implements TargetInterface{
    @Override
    public void method() {
        System.out.println("Target.method 目标对象的目标方法运行");
    }
}
```

```java
package priv.noby.spring5.jdkproxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * jdk动态代理的使用
 *
 * @author Noby
 * @since 2022/10/15
 */public class JdkProxyDemo {
    public static void main(String[] args) {
        //目标对象
        final Target target = new Target();

        //增强对象
        final Advice advice = new Advice();

        //返回值 就是动态生成的代理对象
        TargetInterface proxy = (TargetInterface) Proxy.newProxyInstance(
                target.getClass().getClassLoader(), //目标对象的类加载器
                target.getClass().getInterfaces(), //目标对象的接口字节码对象数组
                new InvocationHandler() {
                    //调用代理对象的任何方法  实质执行的都是invoke方法
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        advice.before(); //前置增强
                        Object invoke = method.invoke(target, args);//执行目标方法
                        advice.afterReturning(); //后置增强
                        return invoke;
                    }
                }
        );

        //调用代理对象的方法
        proxy.method();
    }
}
```

### CGLIB 自定义实现动态代理

```java
package priv.noby.spring5.cglibproxy;

/**
 * 增强类(目标类中的目标方法将要织入增强代码，增强后生成代理对象)

 * @author Noby
 * @since 2022/10/15
 */public class Advice {//中文为通知、增强
    public void before() {
        System.out.println("Advice.before 增强对象的前置增强方法");
    }

    public void afterReturning() {
        System.out.println("Advice.afterReturning 增强对象的后置增强方法");
    }
}
```

```java
package priv.noby.spring5.cglibproxy;

/**
 * 目标类(将被增强的类)
 * * @author Noby
 * @since 2022/10/15
 */public class Target{
    public void method() {
        System.out.println("Target.method 目标对象的目标方法运行");
    }
}
```

```java
package priv.noby.spring5.cglibproxy;

import org.springframework.cglib.proxy.Enhancer;
import org.springframework.cglib.proxy.MethodInterceptor;
import org.springframework.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

/**
 * 第三方cglib动态代理的使用(Spring已经集成该包)
 * * @author Noby
 * @since 2022/10/15
 */public class CglibProxyDemo {
    public static void main(String[] args) {
        //目标对象
        final Target target = new Target();

        //增强对象
        final Advice advice = new Advice();

        //返回值 就是动态生成的代理对象  基于cglib
        //1、创建增强器
        Enhancer enhancer = new Enhancer();
        //2、设置父类（目标）
        enhancer.setSuperclass(Target.class);
        //3、设置回调
        enhancer.setCallback(new MethodInterceptor() {
            public Object intercept(Object proxy, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
                advice.before(); //执行前置
                Object invoke = method.invoke(target, args);//执行目标
                advice.afterReturning(); //执行后置
                return invoke;
            }
        });
        //4、创建代理对象
        Target proxy = (Target) enhancer.create();

        proxy.method();
    }
}
```

### 配置文件实现 AOP

```java
package priv.noby.spring5.aop;

/**
 * 目标接口(将被增强的类的接口)
 * * 可以不使用该接口，Spring可通过cglib实现AOP
 * @author Noby
 * @since 2022/10/15
 */public interface TargetInterface {
    void method();
}
```

```java
package priv.noby.spring5.aop;

import org.aspectj.lang.ProceedingJoinPoint;

/**
 * 切面类(对应jdk和cglib中的增强类)，该类中的方法织入切点后形成代理方法
 *
 * @author Noby
 * @since 2022/10/15
 */public class MyAspect {
    /**
     * 前置通知 <aop:before> 用于配置前置通知。指定增强的方法在切入点方法之前执行
     */
    public void before() {
        System.out.println("MyAspect.before 切面对象的前置通知");
    }

    /**
     * 后置通知 <aop:after-returning> 用于配置后置通知。指定增强的方法在切入点方法之后执行
     */
    public void afterReturning() {
        System.out.println("MyAspect.afterReturning 切面对象的后置通知");
    }

    /**
     * 环绕通知 <aop:around> 用于配置环绕通知。指定增强的方法在切入点方法之前和之后都执行
     */
    public Object around(ProceedingJoinPoint pjp) throws Throwable {
        //Proceeding JoinPoint:  正在执行的连接点(切点)
        System.out.println("MyAspect.around 切面对象的环绕前置通知");
        Object proceed = pjp.proceed();//切点方法
        System.out.println("MyAspect.around 切面对象的环绕后置通知");
        return proceed;
    }


    /**
     * 异常抛出通知 <aop:throwing> 用于配置异常抛出通知。指定增强的方法在出现异常时执行
     *
     * 当目标方法出现异常时后置通知和环绕通知中的后置通知将不会执行，只有最终通知不受异常的影响都会执行
     */
    public void afterThrowing() {
        System.out.println("MyAspect.afterThrowing 切面对象的异常抛出通知");
    }

    /**
     * 最终通知 <aop:after> 用于配置最终通知。无论增强方式执行是否有异常都会执行
     */
    public void after() {
        System.out.println("MyAspect.after 切面对象的最终通知");
    }
}
```

```java
package priv.noby.spring5.aop;

/**
 * 目标类(将被增强的类)
 * * @author Noby
 * @since 2022/10/15
 */public class Target implements TargetInterface {
    @Override
    public void method() {
        System.out.println("Target.method 目标对象的目标方法运行");
        //模拟异常通知
        int i = 1/0;
    }
}
```

### 注解实现 AOP

```java
package priv.noby.spring5.aopanno;

/**
 * 目标接口(将被增强的类的接口)
 * * 可以不使用该接口，Spring可通过cglib实现AOP
 * @author Noby
 * @since 2022/10/15
 */public interface TargetInterface {
    void method();
}
```

```java
package priv.noby.spring5.aopanno;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

/**
 * 切面类(对应jdk和cglib中的增强类)，该类中的方法织入切点后形成代理方法
 *
 * @author Noby
 * @since 2022/10/15
 *///注入Spring容器
@Component("myAspect")
//标注当前MyAspect是一个切面类
@Aspect
public class MyAspect{
    /**
     * 定义切点表达式
     *
     * 用于其他通知复用该切点表达式
     */
    @Pointcut("execution(* priv.noby.spring5.aopanno.*.*(..))")
    public void pointcut(){}

    /**
     * 前置通知 <aop:before> 用于配置前置通知。指定增强的方法在切入点方法之前执行
     */
    //引用切点表达式的第一种方式
    @Before("pointcut()")
    public void before() {
        System.out.println("MyAspect.before 切面对象的前置通知");
    }

    /**
     * 后置通知 <aop:after-returning> 用于配置后置通知。指定增强的方法在切入点方法之后执行
     */
    //引用切点表达式的第二种方式
    @AfterReturning("priv.noby.spring5.aopanno.MyAspect.pointcut()")
    public void afterReturning() {
        System.out.println("MyAspect.afterReturning 切面对象的后置通知");
    }

    /**
     * 环绕通知 <aop:around> 用于配置环绕通知。指定增强的方法在切入点方法之前和之后都执行
     */
    //直接书写切点表达式
    @Around("execution(* priv.noby.spring5.aopanno.*.*(..))")
    public Object around(ProceedingJoinPoint pjp) throws Throwable {
        //Proceeding JoinPoint:  正在执行的连接点(切点)
        System.out.println("MyAspect.around 切面对象的环绕前置通知");
        Object proceed = pjp.proceed();//切点方法
        System.out.println("MyAspect.around 切面对象的环绕后置通知");
        return proceed;
    }

    /**
     * 异常抛出通知 <aop:throwing> 用于配置异常抛出通知。指定增强的方法在出现异常时执行
     *
     * 当目标方法出现异常时后置通知和环绕通知中的后置通知将不会执行，只有最终通知不受异常的影响都会执行
     */
    @AfterThrowing("pointcut()")
    public void afterThrowing() {
        System.out.println("MyAspect.afterThrowing 切面对象的异常抛出通知");
    }

    /**
     * 最终通知 <aop:after> 用于配置最终通知。无论增强方式执行是否有异常都会执行
     */
    @After("pointcut()")
    public void after() {
        System.out.println("MyAspect.after 切面对象的最终通知");
    }
}
```

```java
package priv.noby.spring5.aopanno;

import org.springframework.stereotype.Component;

/**
 * 目标类(将被增强的类)
 * * @author Noby
 * @since 2022/10/15
 */@Component("target")
public class Target implements TargetInterface {
    @Override
    public void method() {
        System.out.println("Target.method 目标对象的目标方法运行");
        //模拟异常通知
//        int i = 1/0;
    }
}
```

### test

```java
package priv.noby.spring5.aop;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext.xml")
public class MyAspectTest {
    @Autowired
    private TargetInterface target;

    @Test
    public void test() {
        target.method();
    }

}
```

```java
package priv.noby.spring5.aopanno;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext-anno.xml")
public class MyAspectTest {
    @Autowired
    private TargetInterface target;

    @Test
    public void test() {
        target.method();
    }

}
```
