---
title: day16 泛型、枚举
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
## 泛型

* 泛型的本质就是"参数化类型"。调用方法的时候，需要传递实参。那"参数化类型"就是将原来具体的类型参数化
* 泛型为一种语法糖
  * 语法糖扩展：指计算机语言中添加的某种语法，这种语法对语言的功能并没有影响，但是更方便程序员使用。通常来说使用语法糖能够增加程序的可读性，从而减少程序代码出错的机会。
* 常用的泛型字母：K-key键、T-type类型、V-value值、E-enumeration枚举、E-element元素

```java
package note.generic;

import java.util.ArrayList;

public class GenericNote {//泛型
    public static void main(String[] args) {
        /*
         *     泛型最大的两个作用：
         *        约束值的类型：在创建对象时只要是指定了类型，那么赋值的数据就必须是该类型及其子类型的数据
         *        自动结合上下文知道泛型是什么类型，自动知道可用调用哪些方法
         *
         *        避免了把问题放到运行时，在编写代码时就直接报错
         */

        //region 泛型方法：使用了泛型的方法
        concat("tow", 3);
        //endregion

        //region 泛型类：使用了泛型的类
        Box<String> box = new Box<>();//泛型类在创建对象时指定泛型的具体类型
        box.data = "info";
        Box box1 = new Box();//泛型类在创建时也可以不指定泛型的具体类型
        box1.data = "info";
        System.out.println(box1.data);
        //endregion

        //region 泛型通配符
        /*
        ? 泛型通配符：表示该类型可以是任何数据类型
       泛型通配符最常用的就是放在形参上接收不同类型的泛型对象
         */
        ArrayList<String> strings = new ArrayList<>();
        ArrayList<Integer> integers = new ArrayList<>();
        ArrayList<Object> objects = new ArrayList<>();
        method(strings);
        method1(integers);
        method2(objects);
        method0(objects);
        //endregion
    }

    private static void method2(ArrayList<? super String> list) {//可以存储String及其父类的数据类型
        //泛型上界
    }

    private static void method1(ArrayList<? extends Number> list) {//可以存储number及其子类的数据类型
        //泛型下界
    }

    private static void method(ArrayList<?> list) {//可以存储任意数据类型

    }

    private static void method0(ArrayList<Object> list) {//Object并不是表示任意数据类型，而是只表示Object

    }



    static <T1,T2> void concat(T1 num1, T2 num2) {
        System.out.println(num1 + "-" +num2);
    }
}

class Box<T> {//泛型类
    T data;//指定该属性为泛型(数据类型由创建对象时确定)
}
```

```java
package note.generic;

public class Instanceof_GetclassNote {
    public static void main(String[] args) {
        //region instanceof
        Animal animal = new Dog();
        if (animal instanceof Dog) {//true
            Dog dog = (Dog) animal;
        }
        System.out.println(animal instanceof Animal);//true
        //endregion

        //region getClass
        System.out.println(animal.getClass());
        /*
        class note.generic.Dog
        得到class 包名+类名
         */
        //endregion

    }
}
class Animal {
    int weight;
}

class Dog extends Animal{
    String name;
}
```

### 类型擦除

Java的泛型基本上都是在编译器这个层次上实现的，在生成的字节码中是不包含泛型中的类型信息的，使用泛型的时候加上类型参数，在编译器编译的时候会去掉，这个过程成为类型擦除（泛型擦除）。

所以JVM并不知道泛型的存在，因为泛型在编译阶段就已经被处理成普通的类和方法； 
处理机制是通过类型擦除，擦除规则：

- 若泛型类型没有指定具体类型，用Object作为原始类型；
- 若有限定类型< T exnteds XClass >，使用XClass作为原始类型；

```java
package note.generic;

public class TypeErasureNote {//泛型的类型擦除
    public static void main(String[] args) {
        Student<String> student = new Student<>();
    }
}

class Student<T>{
    T data;
    /*
     编译器在处理泛型时，将带有泛型的语句进行翻译，之后得到的类型是：
     class Student {
        Object data;
     }
     jvm(虚拟机)并不识别泛型，只运行编译器翻译后得到的字节码文件
     */
}

class Person<T extends Number> {//泛型通配符是写在方法参数列表里面用于限制参数的类型范围，这里非泛型通配符
    T data;
    /*
     编译器在处理泛型时，将带有泛型的语句进行翻译，之后得到的类型是：
     class Person {
        Number data;
     }
     */
}
```

## 泛型的使用和定义

```java
public class GenericMain {
    public static void main(String[] args) {
        //region    使用泛型类
        GenericClass<Integer> integerGenericClass = new GenericClass<>();//创建了一个泛型类
        integerGenericClass.setVar(10);//setVar中的参数为泛型
        System.out.println("泛型类中的变量"+integerGenericClass.getVar());
        //endregion

        //region    使用泛型方法
        System.out.println("泛型方法执行"+methodGeneric(20));
        //endregion

        //region    使用接口实现类方法
        new GenericInterfaceImpl1().methodInterface("kace");//在定义实现类时声明泛型为string
        new GenericInterfaceImpl2<Integer>().methodInterface(30);//创建实例对象时声明泛型为Integer
        //endregion
    }

    static <E> E methodGeneric(E e) {//定义一个泛型方法
        return e;
    }
}
```

```java
public class GenericClass<E> {//定义一个泛型类
    public E var;

    public GenericClass() {
    }

    public GenericClass(E var) {
        this.var = var;
    }

    public E getVar() {
        return var;
    }

    public void setVar(E var) {
        this.var = var;
    }
}
```

```java
public interface GenericInterface<E> {
    public abstract void methodInterface(E e);
}
```

```java
public class GenericInterfaceImpl1 implements GenericInterface<String> {//定义实现类的泛型的类型为字符串
    @Override
    public void methodInterface(String s) {
        System.out.println("实现类1的方法执行"+s);
    }
}
```

```java
public class GenericInterfaceImpl2<E> implements GenericInterface<E> {//实现类的泛型由创建对象时定义
    @Override
    public void methodInterface(E e) {
        System.out.println("实现类2的方法执行"+e);
    }
}
```

## 泛型通配符

```java
package Genericwildcard;

import java.util.ArrayList;
import java.util.Iterator;

public class Genericwildcard {
    public static void main(String[] args) {
        ArrayList<Integer> integers = new ArrayList<>();
        integers.add(1);
        integers.add(2);
        integers.add(3);
        integers.add(4);

        ArrayList<String> strings = new ArrayList<>();
        strings.add("one");
        strings.add("two");
        strings.add("there");
        strings.add("four");

        iteratorMethod(integers);
        iteratorMethod(strings);
    }

    static void iteratorMethod(ArrayList<?> arrayList) {//泛型通配符，表示方法不确定参数集合的泛型
        Iterator<?> iterator = arrayList.iterator();//创建迭代器
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }
}
```

## 泛型的上下限

* ![image-20220909154940565](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220909154940565.png)

### 泛型

* 泛型的作用？
  * 限制集合中存储的元素的数据类型
  * 避免强制类型转换
* 泛型的注意事项？
  * 泛型只能是引用数据类型，不能写基本数据类型
  * 前面的泛型的数据类型要和后面的泛型的数据类型匹配
  * 后面的箭头可以省略不写
    * `ArrayList<String> al1 = new ArrayList<String>();`
    * `ArrayList<String> al2 = new ArrayList<>();`
    * `ArrayList<String> al3 = new ArrayList();`

#### 泛型通配符`<?>`

```java
package Demo.Generic;

import java.util.ArrayList;
import java.util.Collections;

public class Generic {
    public static void main(String[] args) {
        A<String, Integer> noby = new A<String, Integer>();
        noby.method("noby",22);

        System.out.println();
        B kace = new B();
        kace.method("kace",21);

        System.out.println();
        Zi<String> zi = new Zi<String>();
        zi.method("something");

        System.out.println();
        ArrayList<String> strings = new ArrayList<>();
        Collections.addAll(strings,"one","two","three");
        method(strings);
    }

    //region 泛型通配符
    public static void method (ArrayList<?> arraylist) {//？表示传入进来的集合什么类型都可
        for (Object o : arraylist) {
            System.out.println(o);
        }
    }

    public static void method1 (ArrayList<? extends Number> arraylist) {//？表示传入进来的集合类型为Number的子类或本身(向上限定)
        for (Object o : arraylist) {
            System.out.println(o);
        }
    }

    public static void method2 (ArrayList<? super Number> arraylist) {//？表示传入进来的集合类型为Number的父类或本身(向下限定)
        for (Object o : arraylist) {
            System.out.println(o);
        }
    }
    //endregion

}
//region 自定义泛型类
class A<E,V> {
    public void method (E e,V v) {
        System.out.print(e);
        System.out.println(v);
    }
}
//endregion

//region 自定义泛型方法
class B {
    public <E,V> void method (E e,V v) {
        System.out.println(e + "" + v);
    }
}
//endregion



//region 定义泛型接口
interface Fu<E> {
    public void method(E e);
}

class Zi<E> implements Fu<E> {
    @Override
    public void method(E e) {
        System.out.println(e);
    }
}
//endregion
```

### 枚举enumerate

* 一种特殊的单例，枚举是指对象有多个，一般为规定的数量

```java
package demo.enumerate;

public class EnumDemo {
    public static void main(String[] args) {

        Week00 mon = Week00.MON;
        System.out.println(mon);
        Week00 tue = Week00.TUE;
        System.out.println(tue);
        Week00 wed = Week00.WED;
        System.out.println(wed);

        System.out.println();
        Week01 mon1 = Week01.MON;
        System.out.println(mon1.getName());
        Week01 tue1 = Week01.TUE;
        System.out.println(tue1.getName());
        Week01 wed1 = Week01.WED;
        System.out.println(wed1.getName());

        System.out.println();
        Week02 mon2 = Week02.MON;
        System.out.println(mon2.getName());
        mon2.show();
        Week02 tue2 = Week02.TUE;
        System.out.println(tue2.getName());
        tue2.show();
        Week02 wed2 = Week02.WED;
        System.out.println(wed2.getName());
        wed2.show();
ff
        //region 枚举常用方法
        System.out.println("枚举常用方法");
        System.out.println(mon2.compareTo(wed2));//WED相对MON的位置
        System.out.println(mon.name());//枚举项的名称
        System.out.println(mon.ordinal());//枚举项的位置
        Week00 mon3 = Enum.valueOf(Week00.class, "MON");//得到枚举项的对象
        Week00[] values = Week00.values();//得到枚举项数组[MON,TUE,WND]
        Week00 mon4 = Week00.valueOf("MON");//得到枚举项的对象
        //endregion
    }

}
//region 枚举的定义
enum Week00 {
    MON,TUE,WED
}
enum Week01 {
    MON("星期一"),TUE("星期二"),WED("星期三");
    private String name;
    private Week01 (String name) {
        this.name = name;
    }
    public String getName () {
        return name;
    }

}

enum Week02 {
    MON("星期一"){
        public void show() {
            System.out.println("：星期一");
        }//成员内部类
    },TUE("星期二"){
        public void show() {
            System.out.println("：星期二");
        }
    },WED("星期三"){
        public void show() {
            System.out.println("：星期三");
        }
    };
    private String name;
    private Week02 (String name) {
        this.name = name;
    }
    public String getName () {
        return name;
    }
    public abstract void show();
}
//endregion
```

