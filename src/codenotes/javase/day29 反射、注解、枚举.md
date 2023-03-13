---
title: day29 反射、注解、枚举
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
### 反射

```java
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class ReflectionNote {//反射

    public static void main(String[] args) throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException, NoSuchFieldException {
        //region 获取字节码对象的方法
        //方式一 通过Class类的forName方法
        Class<?> personClass = Class.forName("note.Person");//Class<?>是一个存放字节码对象的类
        //方式二 通过类的class静态属性
        personClass = Person.class;
        //方式三 通过对象的getClass()方法
        personClass = new Person().getClass();

        System.out.println(personClass);//class note.Person
        //endregion

        //region  创建对象
        //方式一 通过newInstance()方法
        Person person = (Person) personClass.newInstance();//只能得到无参构造方法生成的对象
        //方式二 通过获取构造方法 必须通过对应的构造方法创建对象
        Constructor<?> personConstructor = personClass.getConstructor(String.class, int.class);
        /*
        String.class int.class表示传入的第一个参数为String，第二个参数为int 的构造函数
         */
        Person noby = (Person) personConstructor.newInstance("noby", 20);//得到有参构造方法生成的对象
        Person kace = (Person) personClass.getConstructor().newInstance();//得到无参构造方法生成的对象
        System.out.println("noby = " + noby);
        //endregion

        //region 操作属性
        Field name = personClass.getDeclaredField("name");//获取指定属性(并没有指定是哪一对象的属性)
        System.out.println("name = " + name);//打印的是该属性的信息，而不是某个对象的属性值
        Field[] declaredFields = personClass.getDeclaredFields();//获取所有属性
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
//以下注解来自lombok插件及lombok的jar包
@Data//表示自动生成getter和setter
@NoArgsConstructor//表示自动生成无参构造函数
@AllArgsConstructor//表示自动生成全参构造函数
class Person {
    private String name;
    private int age;
    private static int num_of_eyes;
    public void show() {
        System.out.println(name + "," + age);
    }
    public void say(String info,int num) {
        System.out.println("say " + info + ",I have say " + num + " times");
    }
}
```

### 注解

```java
package note.annotation;

public class AnnotationNote {//注解

    public static void main(String[] args) {
        //region 利用注解给对象赋值 方式1：注解写在对象上
        DataSource dataSource = JdbcUtil.GetInstance(DataSource.class);
        System.out.println(dataSource);
        //endregion

        //region 利用注解给对象赋值 方式2：注解写在属性上
        dataSource = JdbcUtil.GetInstance2(DataSource.class);
        System.out.println(dataSource);
        //endregion

    }
}
/*
 * 注解：是一种特殊的Java对象，常见的Java对象有四种：class、interface、enum、annotation
 * 注解就是一种标记，标记一段代码让编译器知道该对这段代码做什么事
 * 自定义注解
 *
 * 在Java中有四个元注解，这几个注解是用来修饰自定义注解的
 * @Target：表示自定义注解能够在哪些地方使用
 * 		FIELD：可以在属性上使用
 * 		METHOD：可以在方法上
 * 		TYPE：可以在类上使用
 * @Retention：指定自定义注解能在什么时候访问到、能够保留到什么时候
 * 		source：只在源代码中能保留，在编译时会自动抹掉
 * 		class：能在源代码、class文件中保留，但是程序执行会被忽略，运算时就没了
 * 		runtime：可以保留到运行时，在运行时可以解析到该注解
 * @Documented：加上该注解表明自定义的注解可以出现doc文档中
 * @Inherited：继承，如果父类使用了自定的注解，那么子类也会将注解继承过去
 *
 */
```

```java
package note.annotation;

import lombok.Data;

@Jdbc(url = "othersUrl")
//@Jdbc表示使用该注解， (url = "othersUrl")表示给注解中的属性赋值
@Data
class DataSource {
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
package note.annotation;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

class JdbcUtil {
    @SuppressWarnings("unchecked")
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

    @SuppressWarnings("unchecked")
    public static <T> T GetInstance2(Class<?> clazz) {
        //region 利用注解给对象赋值 方式2：注解写在属性上
        Object dataSource = null;
        try {
            dataSource = clazz.newInstance();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }

        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            if (field.isAnnotationPresent(Driver.class)) {
                String value = field.getAnnotation(Driver.class).value();
                String methodName = "get"
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
    }
    //endregion

}
```

```java
package note.annotation;

import java.lang.annotation.*;

@Target(value = {ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@interface Jdbc {
    //注解中的属性
    String driver() default "com.mysql.jdbc.Driver";//default表示注解中的默认值

    String url() default "jdbc:mysql://localhost:3306/java87";

    String username() default "root";

    String pwd() default "123";

}
```

```java
package note.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(value = {ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@interface Driver {
    String value() default "";
}
```

```java
package note.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(value = {ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@interface Pwd {
    String value() default "";
}
```

```java
package note.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(value = {ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@interface Url {
    String value() default "";
}
```

```java
package note.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(value = {ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@interface Username {
    String value() default "";
}
```

### 枚举

```java
package note.emun;

public class EnumNote {
    public static void main(String[] args) {
        MyColor red = MyColor.RED;

        System.out.println("red = " + red);
        System.out.println("red.getValue() = " + red.getValue());

        red.setValue("大红色");
        System.out.println("red = " + red);
        System.out.println("red.getValue() = " + red.getValue());
        // 枚举没有无参构造方法，不能实例化(即使手动写了构造方法，也没办法在类的外面调用)
        //new MyColor();
        //MyColor.class.newInstance();
        red.method();//枚举的常量就是方法的调用对象

        //switch语句使用枚举作为参数
        switch (red) {
            case RED:
                System.out.println("选择了RED");
                break;
            case YELLOW:
                System.out.println("选择了YELLOW");
                break;
            default:
                break;
        }
    }
}



```

```java
package note.emun;

enum MyColor {//枚举表示值
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

