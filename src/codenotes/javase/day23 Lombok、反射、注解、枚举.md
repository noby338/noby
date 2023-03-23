---
title: day23 Lombok、反射、注解、枚举
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
### lombok
- Lombok是一个开源库，它通过注解的方式为Java类提供了简洁的方法、属性等简单操作的代码，从而简化了Java程序员的代码编写。使用Lombok可以通过简单的注解来自动生成在Java开发中经常需要的方法，如Getter/Setter、ToString、EqualsAndHashCode等，从而减少了Java程序员的代码量并且更加优雅。
- Lombok为Java开发提供了很多实用的注解，以下是Lombok支持的主要注解：
  - `@Getter`和`@Setter`：用于自动生成JavaBean的getter和setter方法。
  - `@ToString`：用于自动生成toString()方法。
  - `@EqualsAndHashCode`：自动生成equals和hashCode方法。
  - `@NoArgsConstructor`：自动生成无参数构造函数。
  - `@AllArgsConstructor`：自动生成全参数构造函数。
  - `@Data`：自动生成setter/getter、equals()、hashCode()、toString()等方法。
  - `@Builder`：使用Builder方式构建对象。
  - `@Slf4j`：自动生成log对象，可直接使用log输出日志。

### 反射

- Java 反射（Reflection）是 Java 语言的一种机制，它允许在运行时（程序运行过程中）动态地获取类的信息，并可以操作类、对象、方法等。Java 反射为我们提供了一种机制，可以在编译时无法确定类名、方法名、成员变量等信息的情况下，通过运行时获取相关信息并进行处理操作。
- Java 反射的优点在于，它可以在程序运行时，根据条件动态地加载某个类，并获取类的信息并创建对象实例，从而提供了更大的灵活性和扩展性，例如通过反射机制实现 IOC（控制反转）和 AOP（面向切面编程）等，这在很多框架和应用中得到了广泛的应用。但是，由于反射操作需要消耗大量的计算资源，所以在实际的开发中应当谨慎使用，尽量使用直接的操作方式来提高程序的性能和效率。

```java
package note.reflection;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
/**
 * @Description 反射的基本使用
 * @Author Noby
 * @Date 2023/3/21 0:32
 */public class ReflectionNote {

    public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException, NoSuchMethodException, InvocationTargetException, NoSuchFieldException {
        //region 获取字节码对象的方法，Class<?>是一个存放字节码对象的类
        //方式一 通过Class类的forName方法
        Class<?> personClass = Class.forName("note.reflection.Person");//注意使用全限定名
        //方式二 通过类的class静态属性
        personClass = Person.class;
        //方式三 通过对象的getClass()方法
        personClass = new Person().getClass();

        System.out.println("personClass = " + personClass);//class Person
        //endregion
        //region  创建对象
        //方式一 通过newInstance()方法
        Person person = (Person) personClass.newInstance();//只能得到无参构造方法生成的对象
        //方式二 通过获取构造方法 必须通过对应的构造方法创建对象
        Constructor<?> personConstructor = personClass.getConstructor(String.class, int.class);
        System.out.println("personConstructor = " + personConstructor);
        /*
        String.class int.class表示传入的第一个参数为String，第二个参数为int 的构造函数
         */        Person noby = (Person) personConstructor.newInstance("noby", 20);//得到有参构造方法生成的对象
        Person kace = (Person) personClass.getConstructor().newInstance();//得到无参构造方法生成的对象
        System.out.println("noby = " + noby);
        System.out.println("kace = " + kace);
        //endregion

        //region 操作属性
        Field name = personClass.getDeclaredField("name");//获取指定属性(并没有指定是哪一对象的属性)
        System.out.println("name = " + name);//打印的是该属性的信息，而不是某个对象的属性值
        Field[] declaredFields = personClass.getDeclaredFields();//获取所有属性
        for (Field declaredField : declaredFields) {
            System.out.println("declaredField = " + declaredField);
        }
        name.setAccessible(true);//如果访问的属性为私有属性，则需开启强制访问(不推荐，通常调用getter、setter方法)
        name.set(kace, "kace");//第一个参数为值得赋予对象，第二个参数为赋予的值，name表示赋予的属性
        //endregion

        //region 操作方法
        Method show = personClass.getDeclaredMethod("show", null);//获取无参方法
        Method say = personClass.getDeclaredMethod("say", String.class, int.class);//获取有参方法
        Method[] declaredMethods = personClass.getDeclaredMethods();//获取所有方法
        show.invoke(kace, null);//调用方法
        String hi = (String) say.invoke(kace, "hi",2);
        System.out.println(hi);
        //endregion
    }
}
```

```java
package note.reflection;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//以下注解来自lombok插件及lombok的jar包
@Data//表示自动生成getter和setter
@NoArgsConstructor//表示自动生成无参构造函数
@AllArgsConstructor//表示自动生成全参构造函数
class Person {
    private String name;
    private int age;
    private static int numOfEyes;

    public void show() {
        System.out.println(name + "," + age);
    }

    public void say(String info, int num) {
        System.out.println("say " + info + ",I have say " + num + " times");
    }
}
```

### 注解

- 允许我们在 Java 程序中加入元数据（Metadata）信息，也就是给程序的注释加上更多的含义。Java 注解本质上是一种标记，可以通过反射机制在程序运行期获取类、方法、字段等的注解信息，并使用这些注解信息完成相应的处理操作。

```java
package note.annotation;

/**
 * @Description 注解的基本使用
 *
 * 注解是一种用于元数据的Java特殊语法，可以用来给代码添加额外的信息和指令，例如在编译时生成额外的代码或者在运行时进行动态处理。
 * 自定义注解
 * 在Java中有四个元注解，这几个注解是用来修饰自定义注解的
 * `@Target`：表示自定义注解能够在哪些地方使用
 *        FIELD：可以在属性上使用
 *        METHOD：可以在方法上
 *        TYPE：可以在类上使用
 * `@Retention`：指定自定义注解能在什么时候访问到、能够保留到什么时候
 *        source：只在源代码中能保留，在编译时会自动抹掉
 *        class：能在源代码、class文件中保留，但是程序执行会被忽略，运算时就没了
 *        runtime：可以保留到运行时，在运行时可以解析到该注解
 * `@Documented`：加上该注解表明自定义的注解可以出现doc文档中
 * `@Inherited`：继承，如果父类使用了自定的注解，那么子类也会将注解继承过去
 * @Author Noby
 * @Date 2023/3/19 17:47
 */public class AnnotationNote {
    public static void main(String[] args) {
        //region 利用注解给对象赋值 方式1：注解写在对象上
        DataSource dataSource = JdbcUtil.GetInstance(DataSource.class);
        System.out.println("dataSource = " + dataSource);
        //endregion

        //region 利用注解给对象赋值 方式2：注解写在属性上
        DataSource2 dataSource2 = JdbcUtil.GetInstance2(DataSource2.class);
        System.out.println("dataSource2 = " + dataSource2);
        //endregion

    }
}
```

```java
package note.annotation;

import note.annotation.anno.Jdbc;
import note.annotation.anno2.Driver;
import note.annotation.anno2.Pwd;
import note.annotation.anno2.Url;
import note.annotation.anno2.Username;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

class JdbcUtil {
    /**
     * 基于类上的注解给对象赋值
     * @param clazz
     * @param <T>
     * @return
     */
    public static <T> T GetInstance(Class<?> clazz) {
        //region 利用注解给对象赋值 方式1：注解写在对象上
        Object dataSource = null;
        try {
            dataSource = clazz.newInstance();
        } catch (InstantiationException | IllegalAccessException e) {
            e.printStackTrace();
        }
        if (clazz.isAnnotationPresent(Jdbc.class)) {//DataSource类上是否存在Anno.class 的注解
            Jdbc annotation = clazz.getAnnotation(Jdbc.class);//获取Anno注解
            // 得到注解中的属性值
            ((DataSource) dataSource).setDataSourceDriver(annotation.driver());
            ((DataSource) dataSource).setDataSourceUrl(annotation.url());
            ((DataSource) dataSource).setDataSourceUsername(annotation.username());
            ((DataSource) dataSource).setDataSourcePwd(annotation.pwd());
        }
        //endregion
        return (T) dataSource;
    }

    /**
     * 基于属性上的注解给对象赋值
     * @param clazz
     * @param <T>
     * @return
     */
    public static <T> T GetInstance2(Class<?> clazz) {
        //region 利用注解给对象赋值 方式2：注解写在属性上
        Object dataSource = null;
        try {
            dataSource = clazz.newInstance();
        } catch (InstantiationException | IllegalAccessException e) {
            e.printStackTrace();
        }

        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            if (field.isAnnotationPresent(Driver.class)) {
                String value = field.getAnnotation(Driver.class).value();
                String methodName = "set"
                        + field.getName().substring(0, 1).toUpperCase()//field.getName()获取属性的名字
                        + field.getName().substring(1);
                try {
                    Method method = clazz.getDeclaredMethod(methodName, field.getType());//field.getType()获取属性的种类
                    method.invoke(dataSource, value);
                } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
                    field.setAccessible(true);
                    try {
                        field.set(dataSource, value);
                    } catch (IllegalAccessException illegalAccessException) {
                        illegalAccessException.printStackTrace();
                    }
                }

            } else if (field.isAnnotationPresent(Url.class)) {
                // url
            } else if (field.isAnnotationPresent(Username.class)) {
                // user
            } else if (field.isAnnotationPresent(Pwd.class)) {
                // pwd
            }
        }
        return (T) dataSource;
        //endregion
    }

}
```

```java
package note.annotation;

import lombok.Data;
import note.annotation.anno.Jdbc;


@Data//这是lombok的注解
@Jdbc(url = "othersUrl")//@Jdbc表示使用该注解， (url = "othersUrl")表示给注解中的属性赋值
class DataSource {
    private String dataSourceDriver;
    private String dataSourceUrl;
    private String dataSourceUsername;
    private String dataSourcePwd;
}
```

```java
package note.annotation.anno;

import java.lang.annotation.*;

@Target(value = {ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface Jdbc {
    //注解中的属性，默认为public
    String driver() default "com.mysql.jdbc.Driver";//default表示注解中的默认值

    String url() default "jdbc:mysql://localhost:3306/stage1";

    String username() default "root";

    String pwd() default "123";

}
```

```java
package note.annotation;

import lombok.Data;
import note.annotation.anno2.Driver;
import note.annotation.anno2.Pwd;
import note.annotation.anno2.Url;
import note.annotation.anno2.Username;


@Data
class DataSource2 {
    @Driver(value = "driver1")
    private String dataSourceDriver;
    @Url("url1")
    private String dataSourceUrl;
    @Username("username1")
    private String dataSourceUsername;
    @Pwd("pwd1")
    private String dataSourcePwd;
}
```

```java
package note.annotation.anno2;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(value = {ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Driver {
    String value() default "";
}
```

```java
package note.annotation.anno2;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(value = {ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Pwd {
    String value() default "";
}
```

```java
package note.annotation.anno2;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(value = {ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Url {
    String value() default "";
}
```

```java
package note.annotation.anno2;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(value = {ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Username {
    String value() default "";
}
```

### 枚举

- 定义：枚举（Enum）是一种特殊的数据类型，它定义了一组有限的常量值，每个常量都是枚举类型的实例，可以通过枚举常量名来引用它们。
- 枚举常量可以具有属性，方法和构造函数，这使得它们可以像类一样进行扩展。枚举类型的实例是单例的，因此可以将它们用作常量，而不必担心实例化多个相同值的对象。
- 枚举类型在 Java 中有广泛的应用，例如表示一组相关的常量值，状态机等。使用枚举类型可以提高代码的可读性和可维护性，避免使用魔法数字和字符串常量。

```java
package note.emun;
/**
 * @Description 枚举的基本使用
 * @Author Noby
 * @Date 2023/3/19 17:41
 */public class EnumNote {
    public static void main(String[] args) {
        MyColor red = MyColor.RED;

        System.out.println("red = " + red);
        System.out.println("red.getValue() = " + red.getValue());

        red.setValue("大红色");
        System.out.println("red = " + red);
        System.out.println("red.getValue() = " + red.getValue());
        // 枚举没有无参构造方法，不能实例化(即使手动写了构造方法，也没办法在类的外面调用)
        //new MyColor();        //MyColor.class.newInstance();        red.method();//枚举的常量就是方法的调用对象

        //switch语句使用枚举作为参数
        switch (red) {
            case RED:
                System.out.println("选择了RED");
                break;            case YELLOW:
                System.out.println("选择了YELLOW");
                break;            default:
                break;
        }
    }
}


```

```java
package note.emun;

/**
 * @Description 枚举的定义
 * @Author Noby
 * @Date 2023/3/19 17:34
 */enum MyColor {
    //常量：他们是当前枚举的对象 等同于：public static final MyColor RED = new MyColor("红色");
    RED("红色"), YELLOW("黄色"), BLUE("蓝色"), ORANGE("橘色");
    //属性：他们是当前枚举常量的属性
    private String value;

    //构造方法：用于给当前枚举常量赋属性值，访问修饰符只能使用 private(一般不写，默认为private)
    MyColor(String value) {
        this.value = value;
    }

    //方法：用于枚举常量调用
    public void method() {//常量为方法的调用对象
        System.out.println("MyColor method");
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}

```
