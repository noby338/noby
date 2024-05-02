---
title: day09 抽象类、匿名内部类
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

## 抽象类

```java
package note;

public class AbstractNote {//抽象方法和抽象类
    public static void main(String[] args) {
        //region
        /*
        抽象类不能实例化(不能创建对象)，必须由其实现类(子类)实例化
        为什么不能实例化？
        没有一个对象叫动物，他没有具体的属性，(动物几只脚、有没有毛)
         */
//        new Animal();
        //endregion
    }
}

abstract class Animal {
    //region 抽象方法
    /*
    当某个父类某个方法根据子类的不同而有不同的实现，且父类不能实现该方法时，此方法应该定义为抽象方法
    方法后的{}即为该方法的实现
     */
    public abstract void eat();
    //endregion

    public void show() {//抽象类可以有非抽象方法
        System.out.println("我属于动物");
    }

}

class Dog extends Animal{

    @Override
    public void eat() {
        System.out.println("吃骨头");
    }
}
```

## 接口

```java
package note;

public class InterfaceNote {//接口
    public static void main(String[] args) {

    }
}

interface usb {
    //region 成员变量
    /*
    接口中的所有属性都默认由static final 修饰(都是静态常量)
     */
//    public String name;因为被final修饰，所以必须赋初值
    //endregion

    //region 成员方法
    /*
    接口里面的所有方法都默认由 abstract 修饰(都是抽象方法)
     */
    public void read();
    //endregion

    //region 接口中可以有实现方法，他们必须由static或者default修饰
    public default void method () {

    }
    public static void method1 () {

    }
    //endregion

    //endregion
}
```

## 抽象类和抽象方法

当关注一个对象的本质时用抽象类，当关注这个对象有哪些功能时用接口

### 不同点

- 抽象类：
    - 可以有非静态属性
    - 可以有构造方法
    - 抽象方法必须用 abstract 修饰
    - 抽象类的实现方法不需要特别的声明
    - 仅支持单继承 (类与类之间不能多继承，接口与接口之间可以实现多继承)
- 接口：
    - 属性只能是静态的常量
    - 没有构造方法
    - 抽象方法不需要特别声明
    - 接口中的实现方法必须通过 default 或者 static 修饰
    - 可以多实现

### 共同点

- 都不能直接创建对象
- 一般都包括抽象方法

> 注意：接口不能实现接口 (接口里面不能有实现方法)

## 内部类

- 使用场景：当 B 类只为 A 类提供服务，B 类只会在 A 类中使用到，这个时候就可以把 B 类做成 A 类的内部类

```java
package note;

public class InnerClassNote {//内部类

    public static void main(String[] args) {
        Outer outer = new Outer();


        //region 非静态内部类
        Outer.Inner inner = outer.new Inner();
        System.out.println(inner.age);
        //endregion

        //region 静态内部类
        Outer.StaticInner staticInner = new Outer.StaticInner();
        System.out.println(staticInner.name);
        System.out.println(Outer.StaticInner.age);
        //endregion
    }
}

//region
/*
内部类：一个类的声明在另一个类里面
    非静态内部类：当做非静态方法对待
    静态内部类：当做静态方法对待
外部类：包含内部类的类
Inner类的class文件名为：Outer$Inner.class
 */
class Outer {
    class Inner {
        //region 在非静态内部类中不能包含静态方法和静态变量
//        public static int age;
//        public static void methodStaticInner() {
//
//        }
        //endregion
        public int age;

        public void methodInner() {
            System.out.println("非静态方法内部类");
        }
    }

    static class StaticInner {
        //region 在静态内部类中能包含静态方法和静态变量
        public static int age;
        public static void methodStaticInner() {
            System.out.println("静态内部类静态方法");
        }
        //endregion

        public String name;

        public void methodInner() {
            System.out.println("静态内部类非静态方法");
        }
    }
}
//endregion
```

## 局部内部类、成员内部类

```java
package InternalClass;
//编译生成的class文件为Outer.class 和 Outer$Inner.class 两个文件
public class Outer {
    public int num = 10;
    public String name;
    public class Inner{//成员内部类，定义在类里面的类
        public int num = 20;
        public void innerMethod() {
            int num = 30;
            System.out.println("内部方法执行");
            System.out.println(name);//内部类可以访问外部类的成员变量
            System.out.println(num);
            System.out.println(this.num);//访问本类
            System.out.println(Outer.this.num);//访问外部类
        }
    }

    public void outerMethod() {
        System.out.println("外部方法执行");
        new Inner().innerMethod();//间接执行内部类方法
        final int num = 40;//在局部内部类使用的时候最好用final关键字修饰
        class OuterMethodInner {//局部内部类，定义在方法中的，只能在方法中创建实例对象
            void outerMethodInnerMethod() {
                System.out.println("局部内部类执行"+num);//局部内部类要想使用局部变量，必须使得变量不可变，因为局部内部类的生命周期比局部变量长。
            }
        }
        OuterMethodInner method = new OuterMethodInner();
        method.outerMethodInnerMethod();
    }
}
```

```java
package InternalClass;

public class OuterMain {
    public static void main(String[] args) {
        Outer outer= new Outer();
        outer.outerMethod();

        System.out.println("==============");

        Outer.Inner inner = new Outer().new Inner();//直接使用内部类
        inner.innerMethod();
    }
}
```

## 匿名内部类

- 主要针对于抽象类、接口来阐述

```java
package note;

/**
 * 匿名内部类
 */
public class AnonymousInnerClassNote {

    public static void main(String[] args) {
        //region 匿名内部类的使用
        /*
        该匿名内部类的字节码文件名为：
        AnonymousInnerClassNote$1.class
        该匿名类只能在本类中使用(AnonymousInnerClassNote)
         */
        A a = new A() {
            @Override
            public void methodA() {
                System.out.println("匿名内部类执行A");
            }
        };
        a.methodA();

        /*
        该匿名内部类的字节码文件名为：
        AnonymousInnerClassNote$2.class
        该匿名类只能在本类中使用(AnonymousInnerClassNote)
         */
        new B(){
            @Override
            public void methodB() {
                System.out.println("匿名内部类执行B");
            }
        }.methodB();
        //endregion
    }
}

abstract class A{
    public abstract void methodA();
}

interface B{
    void methodB();
}

```

## 强制转型

```java
package note;

public class CoercionNote {//强制转型
    public static void main(String[] args) {
        //region 父类引用指向子类对象
        Person person = new Student();//发生了向上转型
//        person.stucode;不能使用子类的属性
//        person.study;不能使用子类的方法
        //endregion

        //region 向下转型
        Student student = (Student) person;//当该变量本身就引用子类的对象时才可以向下转型
        //endregion
    }
}

class Person {
    String name;
    int age;
    public void show () {
        System.out.println(name + ","+age);
    }
}

class Student extends Person{
    int stucode;
    public void study() {
        System.out.println("学习");
    }
}
```
