---
title: day01 Spring的配置文件使用方式、IOC
icon: write
category:
    - Spring
tag:
    - Spring
    - Spring配置文件
    - bean的作用域
    - bean的创建和销毁
    - IOC
    - 静态工厂
    - 动态工厂
    - 依赖注入
    - 设值注入
    - 构造注入
    - 自动注入
sticky: false
star: false
article: true
timeline: true
---

## 知识点

- spring 的基础使用（配置文件的方式）
    - 新建配置文件 applicationContext.xml （官方推荐命名）
        - 配置文件中配置 `<bean>` 标签，定义 id 和 class
    - 调用
        - ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
        - StudentService studentSer = (StudentService)ac.getBean("studentSer");
- ApplicationContext 和 BeanFactory 实例化的区别
    - ApplicationContext 是 BeanFactory 的子接口
    - 使用 ApplicationContext 初始化 Spring 容器时，立即创建所有的 Bean（启动慢，第一个用户的访问速度不受影响）（推荐）
    - 使用 BeanFactory 初始化 Spring 容器时，实例化某个类时才创建该 Bean（启动快，占用更少的系统资源）
- import 标签引入子配置文件
- Bean
    - Bean 的装配方式
        - 默认装配方式（常用）
            - 设值注入
                - 基本数据类型注入
                - 集合数据类型
                    - 数组
                    - list
                    - set
                    - map
                    - properties
                - 引用数据类型注入
                    - ref
                    - 自动注入
                        - byName
                        - byType
            - 构造注入
        - 动态工厂装配方式
        - 静态工厂装配方式
    - Bean 的作用范围
        - singleton 单例（默认）：单例的实例化个数为一个，实例化时机为 Spring 容器创建时，单例对象的销毁时机为 Spring 容器被销毁时
        - prototype 原型：原型的实例化个数一般为多个，实例化时机为容器调用 getBean() 方法，原型对象的销毁时机为 java 的垃圾回收机制作用时
        - request
        - session
        - globalSession
    - Bean 的创建和销毁
        - init()
        - destroy()

## Spring 的作用

- 控制翻转 IOC，便于解耦
- 面向切面编程 AOP
- 声明式事务的支持
- 集成 junit 方便程序的测试
- 方便集成各种优秀的框架
- 降低 javaEE API 的使用难度

## Spring 中 bean 的单例和原型的区别

- 单例的实例化个数为一个，原型的实例化个数一般为多个
- 单例实例化时机为 Spring 容器创建时，原型实例化时机为容器调用 getBean() 方法
- 单例对象的销毁时机为 Spring 容器被销毁时，原型对象的销毁时机为 java 的垃圾回收机制作用时

## Spring 注入

- Bean 的装配方式
    - 默认装配方式（常用）
        - 设值注入
            - 基本数据类型注入
            - 集合数据类型
            - 引用数据类型注入
                - ref
                - 自动注入
                    - byName
                    - byType
        - 构造注入
    - 动态工厂装配方式
    - 静态工厂装配方式

## 控制反转和依赖注入

- 控制反转：
    - 定义：面向对象编程中的一种设计原则，可以用来减低计算机代码之间的耦合度，其基本思想是借助于 " 第三方 " 实现具有依赖关系的对象之间的解耦。
    - 分类
        - 依赖注入（Dependency Injection）：依赖注入是控制反转的一种实现。把依赖的控制权交给第三方（我们称作 IOC 容器），把他通过构造函数、属性或者工厂模式等方法 (通过构造函数或 set() 方法对依赖对象进行一个参数传入，而非直接在 B 中实例化 A)，将 A 类注入到类 B 内，这样就极大程度的对类 B 和类 A 进行了解耦。
            - 依赖：如果一个类 B 的功能实现需要借助于类 A，那么就称类 A 是类 B 的依赖
        - 依赖查找
    - 解释：如果类 A 是类 B 的依赖，如果在类 B 的内部去实例化类 A，那么两者之间会出现较高的耦合，一旦类 A 出现了问题，类 B 也需要进行改造，如果这样的情况较多，每个类之间都有很多依赖，那么就会出现牵一发而动全身的情况，程序会极难维护，并且很容易出现问题。要解决这个问题，就要把 B 类对 A 类的控制权抽离出来，交给一个第三方去做，把控制权反转给第三方，就称作控制反转（IOC Inversion Of Control）。

## 静态工厂和动态工厂

- 在 Spring 中，我们可以使用静态工厂方法或者动态工厂方法来创建 Bean 实例。二者的主要区别如下：
    - 实例化方式
        - 静态工厂方法是指在静态工厂类中定义一个静态方法来创建 Bean 实例。我们可以直接通过静态方法名来调用这个方法来获得 Bean 实例。
        - 动态工厂方法是指在一个非静态的类中定义一个普通的方法来创建 Bean 实例。我们通过实例化工厂，根据工厂对象调用这个方法来获得 Bean 实例。
    - 使用场景
        - 静态工厂方法适用于创建那些无需频繁变更的 Bean 实例。在创建这些实例时，我们可以直接调用静态工厂类中的方法，而无需考虑创建哪个具体的实例。比如，可以使用静态工厂方法来创建日志工厂、数据库连接池等单例对象。
        - 动态工厂方法则更加灵活，适用于创建那些需要根据不同情况动态变更的 Bean 实例。我们可以在动态工厂方法中根据实际情况来创建不同的 Bean 实例。比如，可以使用动态工厂方法来根据用户请求的不同，创建不同的服务实例。
    - 灵活性
        - 由于动态工厂方法是在运行时动态地创建 Bean 实例，因此它具有更高的灵活性。我们可以在方法中添加一些逻辑来控制实例化过程，比如根据参数的不同创建不同的 Bean 实例。
- 以下是一个静态工厂方法的示例代码：

```java
public class MyBeanFactory {
  public static MyBean createBean() {
    return new MyBean();
  }
}
```

- 以下是一个动态工厂方法的示例代码：

```java
public class MyBeanFactory {
  public MyBean createBean(String name) {
    if (name.equals("beanA")) {
      return new BeanA();
    } else if (name.equals("beanB")) {
      return new BeanB();
    } else {
      throw new IllegalArgumentException("Invalid bean name: " + name);
    }
  }
}
```

## 代码示例

### pom

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>priv.noby</groupId>
    <artifactId>spring</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>


    <dependencies>
        <!--该包可以同时依赖4个 spring 的核心包(beans,core,context,spEL)-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.2.15.RELEASE</version>
        </dependency>
        <!--Spring的junit的整合包，可用于测试时可注入Spring-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>5.2.15.RELEASE</version>
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

    </dependencies>

</project>
```

### xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--命名空间(约束头)及约束地址(使用某些标签必须先导入该标签的命名空间及约束地址)-->
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans       http://www.springframework.org/schema/beans/spring-beans.xsd">

<!--    引入其他配置文件-->
    <import resource="applicationContext-other.xml"/>

<!--    Bean 的作用域-->
    <!--单例模式（默认），每次调用getBean()获得的都是同一个对象-->
    <bean id="studentSingleton" class="priv.noby.spring.entity.Student" scope="singleton"/>
    <!--原型模式，每次调用getBean()方法创建一个新的对象-->
    <bean id="studentPrototype" class="priv.noby.spring.entity.Student" scope="prototype"/>

<!--    Bean 的创建和销毁-->
    <!--init() 方法在实例化的时候执行，destroy() 在单例模式，且关闭容器时执行-->
    <bean id="studentInitAndDestroySingleton" class="priv.noby.spring.entity.Student" init-method="init" destroy-method="destroy" scope="singleton"/>
    <bean id="studentInitAndDestroyPrototype" class="priv.noby.spring.entity.Student" init-method="init" destroy-method="destroy" scope="prototype"/>

<!--    工厂静态方法实例化-->
    <bean id="schoolStatic" class="priv.noby.spring.factory.StaticFactory" factory-method="getSchool"/>
<!--    工厂实例方法实例化-->
    <bean id="schoolDynamicFactory" class="priv.noby.spring.factory.DynamicFactory"/>
    <bean id="schoolDynamic" factory-bean="schoolDynamicFactory" factory-method="getSchool"/>

<!--    依赖注入(设值注入)-->
    <bean id="studentDao" class="priv.noby.spring.dao.impl.StudentDaoImpl"/>
    <bean id="studentService" class="priv.noby.spring.service.impl.StudentServiceImpl">
        <!--调用StudentServiceImpl的setStudentDao()方法进行设值注入-->
        <!--name="studentDao"表示的是调用setStudentDao()方法，ref="studentDao"表示引用上面的id-->
        <!--ref为引用数据类型，value为基本数据类型-->
        <property name="studentDao" ref="studentDao"/>
    </bean>

<!--    p命名空间依赖注入(设值注入)-->
    <bean id="studentServiceP" class="priv.noby.spring.service.impl.StudentServiceImpl" p:studentDao-ref="studentDao"/>

<!--    依赖注入(构造注入)-->
    <bean id="studentServiceConstructor" class="priv.noby.spring.service.impl.StudentServiceImpl">
        <!--调用StudentServiceImpl的构造方法进行构造注入-->
        <!--name="studentDao"表示的是构造方法的形参，ref="studentDao"表示引用上面的id-->
        <constructor-arg name="studentDao" ref="studentDao"/>
    </bean>

<!--    依赖注入引用数据类型的参数名自动注入(设值注入)-->
    <bean id="studentServiceByName" class="priv.noby.spring.service.impl.StudentServiceImpl" autowire="byName">
        <!--当属性为引用数据类型，且属性名和某标签的id相同时自动注入id到属性中-->
<!--        <property name="studentDao" ref="studentDao"/>-->
    </bean>

<!--    依赖注入引用数据类型的类型自动注入(设值注入)-->
    <bean id="studentServiceByType" class="priv.noby.spring.service.impl.StudentServiceImpl" autowire="byType">
        <!--当属性为引用数据类型，且属性类型和某标签的类型相同时自动注入该标签及其子类型的标签到属性中，注意：当存在属性类型和多个标签的类型相同时会抛出异常-->
<!--        <property name="studentDao" ref="studentDao"/>-->
    </bean>



<!--    复杂属性的设值注入-->
    <bean id="some" class="priv.noby.spring.entity.Some">
        <!--基本数据类型和字符串的数组-->
        <property name="strArr">
            <array>
                <value>arr1</value>
                <value>arr2</value>
            </array>
        </property>
        <!--引用数据类型的数组-->
        <property name="studentArr">
            <array>
                <ref bean="studentSingleton"/>
                <ref bean="studentSingleton"/>
            </array>
        </property>
        <!--基本数据类型和字符串的List-->
        <property name="strList">
            <list>
                <value>str1</value>
                <value>str2</value>
            </list>
        </property>
        <!--引用数据类型的List-->
        <property name="stuList">
            <list>
                <ref bean="studentSingleton"/>
                <ref bean="studentSingleton"/>
            </list>
        </property>
        <!--基本数据类型的Set-->
        <property name="strSet">
            <set>
                <value>set</value>
                <value>set2</value>
            </set>
        </property>
        <!--基本数据类型和字符串的Map-->
        <property name="strMap">
            <map>
                <entry key="k" value="val"/>
                <entry key="k2" value="val2"/>
            </map>
        </property>
        <!--引用数据类型的Map-->
        <property name="studentStudentMap">
            <map>
                <entry key-ref="studentPrototype" value-ref="studentPrototype"/>
                <entry key-ref="studentPrototype" value-ref="studentPrototype"/>
            </map>
        </property>
        <!--properties-->
        <property name="properties">
            <props>
                <prop key="k">val</prop>
                <prop key="k2">val2</prop>
            </props>
        </property>
    </bean>

</beans>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
       http://www.springframework.org/schema/beans       http://www.springframework.org/schema/beans/spring-beans.xsd">
<!--    主配置文件引入了本配置文件-->
    <bean id="schoolOther" class="priv.noby.spring.entity.School"/>
</beans>
```

### entity

```java
package priv.noby.spring.entity;

import lombok.Data;

@Data
public class School {
    private int scId;
    private String scName;

    public School() {
        System.out.println("School.School 无参构造");
    }

    public School(int scId, String scName) {
        this.scId = scId;
        this.scName = scName;
        System.out.println("School.School 有参构造");
    }
}
```

```java
package priv.noby.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Some {
    private String[] strArr;
    private Student[] studentArr;
    private List<String> strList;
    private List<Student> stuList;
    private Set<String> strSet;
    private Map<String,String> strMap;
    private Map<Student,Student> studentStudentMap;
    private Properties properties;
}
```

```java
package priv.noby.spring.entity;


import lombok.Data;

import java.util.Objects;

//@Data
//public class Student {
//    private Integer id;
//    private String name;
//    private Integer age;
//
//    public void init() {
//        System.out.println("Student.init");
//    }
//
//    public void destroy() {
//        System.out.println("Student.destroy");
//    }
//
//    public Student() {
//        System.out.println("Student.Student 无参构造");
//    }
//
//    public Student(String name, int age) {
//        this.name = name;
//        this.age = age;
//        System.out.println("Student.Student 有参构造");
//    }
//
//    public void setAge(int age) {
//        this.age = age;
//        System.out.println("Student.setAge");
//    }
//
//    public int getAge() {
//        return age;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) {
//            return true;
//        }
//        if (o == null || getClass() != o.getClass()) {
//            return false;
//        }
//        Student student = (Student) o;
//        return age == student.age && Objects.equals(name, student.name);
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(name, age);
//    }
//
//    @Override
//    public String toString() {
//        return "Student{" +
//                "name='" + name + '\'' +
//                ", age=" + age +
//                '}';
//    }
//}
@Data
public class Student {
    private Integer id;
    private String name;
    private Integer age;
    private School school;

    public void init() {
        System.out.println("Student.init");
    }

    public void destroy() {
        System.out.println("Student.destroy");
    }

    public Student() {
        System.out.println("Student.Student 无参构造");
    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Student.Student 有参构造");
    }

    public void setAge(int age) {
        this.age = age;
        System.out.println("Student.setAge");
    }

    public int getAge() {
        return age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public School getSchool() {
        return school;
    }

    public void setSchool(School school) {
        this.school = school;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Student student = (Student) o;
        return age == student.age && Objects.equals(name, student.name) && Objects.equals(school, student.school);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age, school);
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", school=" + school +
                '}';
    }
}
```

### dao

```java
package priv.noby.spring.dao;

import priv.noby.spring.entity.Student;

/**
 * @author Noby
 * @since 2022/10/8
 */public interface StudentDao {
    Student selectById(int id);
}
```

```java
package priv.noby.spring.dao.impl;

import priv.noby.spring.dao.StudentDao;
import priv.noby.spring.entity.Student;

/**
 * @author Noby
 * @since 2022/10/8
 */public class StudentDaoImpl implements StudentDao {
    @Override
    public Student selectById(int id) {
        System.out.println("StudentDaoImpl.selectById");
        return null;    }
}
```

### factory

```java
package priv.noby.spring.factory;


import priv.noby.spring.entity.School;

/**
 * 动态工厂(工厂实例方法实例化)(bean实例化的三种方式之一)
 * * @author Noby
 * @since 2022/10/8
 */public class DynamicFactory {
    public DynamicFactory() {
        System.out.println("DynamicFactory.DynamicFactory 无参构造");
    }
    public School getSchool(){
        System.out.println("DynamicFactory.getSchool");
        return new School();
    }
}
```

```java
package priv.noby.spring.factory;

import priv.noby.spring.entity.School;

/**
 * 静态工厂(工厂静态方法实例化)(bean实例化的三种方式之一)
 * * @author Noby
 * @since 2022/10/8
 */public class StaticFactory {
    public StaticFactory() {
        System.out.println("StaticFactory.StaticFactory 无参构造");
    }

    public static School getSchool(){
        System.out.println("StaticFactory.getSchool");
        return new School();
    }
}
```

### service

```java
package priv.noby.spring.service;

import priv.noby.spring.entity.Student;

public interface StudentService {
    void show();

    Student selectById(int id);
}
```

```java
package priv.noby.spring.service.impl;

import priv.noby.spring.dao.StudentDao;
import priv.noby.spring.entity.Student;
import priv.noby.spring.service.StudentService;

/**
 * 依赖注入
 */
public class StudentServiceImpl implements StudentService {
    private StudentDao studentDao;

    public StudentServiceImpl() {
        System.out.println("StudentServiceImpl.StudentServiceImpl 无参构造");
    }

    /**
     * 构造注入将调用该方法
     * @param studentDao
     */
    public StudentServiceImpl(StudentDao studentDao) {
        this.studentDao = studentDao;
        System.out.println("StudentServiceImpl.StudentServiceImpl 有参构造");
    }

    /**
     * 设值注入将调用该方法
     * @param studentDao
     */
    public void setStudentDao(StudentDao studentDao) {
        this.studentDao = studentDao;
        System.out.println("StudentServiceImpl.setStudentDao");
    }

    @Override
    public void show() {
        System.out.println("StudentServiceImpl.show");
    }

    @Override
    public Student selectById(int id) {
        System.out.println("StudentServiceImpl.selectById");
        return studentDao.selectById(0);
    }
}
```

### test

```java
package priv.noby.spring.entity;

import junit.framework.TestCase;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * 测试子配置文件是否引入成功
 *
 * @author Noby
 * @since 2022/10/9
 */public class SchoolTest extends TestCase {
    public void test() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
        School schoolOther = (School) ac.getBean("schoolOther");
        System.out.println("schoolOther = " + schoolOther);
    }
}
```

```java
package priv.noby.spring.entity;

import junit.framework.TestCase;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * 复杂数据设值的注入
 *
 * @author Noby
 * @since 2022/10/8
 */public class SomeTest extends TestCase {
    public void test() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
        System.out.println();
        Some some = (Some) ac.getBean("some");
        System.out.println(some);
    }

}
```

```java
package priv.noby.spring.entity;  
  
import org.junit.Test;  
import org.springframework.context.ApplicationContext;  
import org.springframework.context.support.ClassPathXmlApplicationContext;  
  
/**  
 * 使用student测试spring的无参构造方法实例化  
 *  
 * 单例模式和原型模式  
 * 对象的init()初始化和destroy()销毁  
 *  
 * @author Noby  
 * @since 2022/10/8  
 */public class StudentTest {  
    /**  
     * 单例模式和原型模式  
     *  
     * 单例模式实例化的时机为Spring容器被创建  
     * 原型模式实例化的时机为调用getBean()方法  
     */  
    @Test  
    public void test() {  
        //ApplicationContext 应用程序上下文，Spring 的核心类，该语句作用是读取配置文件  
        //可在下一行加入断点查看bean的实例化时机，单例模式实例化的时机为Spring容器被创建，原型模式实例化的时机为调用getBean()方法  
        ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");  
        System.out.println();  
        //根据配置文件中的 bean 创建对象(底层调用Student的无参构造方法)  
        Student studentSingleton = (Student) ac.getBean("studentSingleton");  
        Student studentSingleton2 = (Student) ac.getBean("studentSingleton");  
        //当只存该类的唯一bean是可使用字节码对象为参数实例化bean  
//        Student studentClass = ac.getBean(Student.class);  
        System.out.println("单例模式实例化的两个对象是否相同："+(studentSingleton == studentSingleton2));  
  
        Student studentPrototype = (Student) ac.getBean("studentPrototype");  
        Student studentPrototype2 = (Student) ac.getBean("studentPrototype");  
        System.out.println("原型模式实例化的两个对象是否相同："+(studentPrototype == studentPrototype2));  
  
        /*  
        Student.Student 无参构造  
        Student.Student 无参构造  
  
        单例模式实例化的两个对象是否相同：true  
        Student.Student 无参构造  
        Student.Student 无参构造  
        原型模式实例化的两个对象是否相同：false  
         */  
    }  
  
    /**  
     * 对象的init()初始化和destroy()销毁  
     *  
     * 单例模式初始化的时机为执行实例化后(实例化由Spring容器加载时实例化且只有一次，因此初始化也只有一次)  
     * 原型模式初始化的时机为执行实例化后(实例化调用getBean()方法，每实例化一次执行一次)  
     */    @Test  
    public void test2() {  
        //ApplicationContext 应用程序上下文，Spring 的核心类，该语句作用是读取配置文件  
        //可在下一行加入断点查看bean的实例化时机，单例模式实例化的时机为Spring容器被创建，原型模式实例化的时机为调用getBean()方法  
        ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");  
        System.out.println();  
        //根据配置文件中的 bean 创建对象(底层调用Student的无参构造方法)  
        Student studentInitAndDestroySingleton = (Student) ac.getBean("studentInitAndDestroySingleton");  
        Student studentInitAndDestroySingleton2 = (Student) ac.getBean("studentInitAndDestroySingleton");  
  
        Student studentInitAndDestroyPrototype = (Student) ac.getBean("studentInitAndDestroyPrototype");  
        Student studentInitAndDestroyPrototype2 = (Student) ac.getBean("studentInitAndDestroyPrototype");  
  
        //关闭容器查看两者的销毁方法，单例的销毁时机在容器销毁时，原型的销毁时机在java的垃圾回收机制回收  
        ((ClassPathXmlApplicationContext)ac).close();  
  
        /*  
        Student.Student 无参构造  
        Student.init        Student.Student 无参构造  
        Student.init  
        Student.Student 无参构造  
        Student.init        Student.Student 无参构造  
        Student.init        Student.destroy        Student.destroy         */    }  
  
}
```

```java
package priv.noby.spring.factory;

import junit.framework.TestCase;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import priv.noby.spring.entity.School;

/**
 * 使用student测试spring Bean的另外两种实例化方式
 *
 * @author Noby
 * @since 2022/10/8
 */public class SchoolFactoryTest extends TestCase {
    /**
     * 静态工厂和动态工厂实例化方式
     */
    public void test() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
        System.out.println();
        School schoolStatic = (School) ac.getBean("schoolStatic");
        School schoolDynamic = (School) ac.getBean("schoolDynamic");
        System.out.println("studentStatic = " + schoolStatic);
        System.out.println("studentDynamic = " + schoolDynamic);

        /*
        Student.Student 无参构造 studentSingleton        Student.Student 无参构造 studentInitAndDestroySingleton        Student.init 在该test中可忽略
        StaticFactory.getSchool        School.School 无参构造
        DynamicFactory.DynamicFactory 无参构造
        DynamicFactory.getSchool        School.School 无参构造
        studentStatic = School(scId=0, scName=null)        studentDynamic = School(scId=0, scName=null)         */
    }
}
```

```java
package priv.noby.spring.service.impl;

import junit.framework.TestCase;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import priv.noby.spring.service.StudentService;

public class StudentServiceImplTest extends TestCase {
    /**
     * 依赖注入(设值注入)
     * <p>
     * 使用StudentService的selectById()方法需要依赖StudentDao的selectById()，配置实例化StudentServiceImpl的设值注入StudentDaoImpl
     */    public void test() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
        System.out.println();
        StudentService studentService = (StudentService) ac.getBean("studentService");
        studentService.selectById(0);
    }

    /**
     * p命名空间依赖注入(设值注入)
     * <p>
     * 使用前 applicationContext.xml 命名空间加入 xmlns:p="http://www.springframework.org/schema/p"
     */    public void test2() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
        System.out.println();
        StudentService studentService = (StudentService) ac.getBean("studentServiceP");
        studentService.selectById(0);
    }

    /**
     * 依赖注入(构造注入)
     */    public void test3() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
        System.out.println();
        StudentService studentService = (StudentService) ac.getBean("studentServiceConstructor");
        studentService.selectById(0);
    }


    /**
     * 依赖注入引用数据类型的参数名自动注入(设值注入)
     */    public void test4() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
        System.out.println();
        StudentService studentService = (StudentService) ac.getBean("studentServiceByName");
        studentService.selectById(0);
    }

    /**
     * 依赖注入引用数据类型的参数类型自动注入(设值注入)
     */    public void test5() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
        System.out.println();
        StudentService studentService = (StudentService) ac.getBean("studentServiceByType");
        studentService.selectById(0);
    }

}
```
