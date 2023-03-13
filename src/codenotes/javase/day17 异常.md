---
title: day17 异常
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

## 异常

![image-20220217102836068](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220217102836068.png)

```java
/*
 * 程序问题：
 * 	错误：大多数是在编写代码时出现语法问题，在编码时出现会直接造成程序不能运行
 * 	异常：语法上没问题，但是在运行时出问题，下标越界、类型转换、IO异常、数学异常
 */
public class Test {
	public static void main(String[] args) {
		//region 错误(语法错误)
		String str = 1;
		a = "abc";
        //endregion

		//region 运行时异常
		int[] arr = new int[3];
		System.out.println(arr[10]);  // 越界  异常
		System.out.println(1/0);//数学异常
        /*
        常见运行时异常：

        NullPointerException:空指针异常
        ArrayIndexOutofBoundsException：数组越界异
        ClassCastException：类型转换异常
        ArithmeticException：数学异常
        */
        //endregion

		//region 编译时异常
		InputStream is = new FileInputStream("");
        /*
        常见编译时异常：

        OException：输入输出流异常
        FileNotFoundException：文件找不到的异常
        ClassNotFoundException：类找不到的异常
        DataFormatException：数据格式化异常
		//endregion
	}
}
```

### Error

其中 Error 是错误，对于所有的编译时期的错误以及系统错误都是通过 Error 抛出的。这些错误表示故障发生于虚拟机自身、或者发生在虚拟机试图执行应用时，如 Java 虚拟机运行错误（Virtual MachineError）、类定义错误（NoClassDefFoundError）等。这些错误是不可查的，因为它们在应用程序的控制和处理能力之 外，而且绝大多数是程序运行时不允许出现的状况。对于设计合理的应用程序来说，即使确实发生了错误，本质上也不应该试图去处理它所引起的异常状况。在 Java 中，错误通过 Error 的子类描述。

### Exception

Exception，是另外一个非常重要的异常子类。它规定的异常是程序本身可以处理的异常。异常和错误的区别是，异常是可以被处理的，而错误是没法处理的。

在 Java 中常见的异常非常多，例如空指针异常、数组下标越界异常、数学异常等等。为了方便区分、处理这些异常，Java 将所有的异常分为了两种：编译时异常和运行时异常。

- 编译时异常，也叫可检查异常（checked exception），所有 checked exception 都是需要在代码中处理的。它们的发生是可以预测的，正常的一种情况，可以合理的处理。比如 IOException，或者一些自定义的异常。除了 RuntimeException 及其子类以外，都是 checked exception。
- 运行时异常，比如空指针异常、数学异常、数组下标越界异常等等，这种异常是运行时发生，无法预先捕捉处理的

```java
package note;

import java.util.ArrayList;

public class ExceptionNote {
    public static void main(String[] args) {
        //region ArithmeticException 数学运算异常
        try {//如果程序发生异常且没有被处理，将会将异常抛给jvm，jvm会终止程序
            System.out.println(500 / 0);
            System.out.println("发生异常后，try中的异常代码后的代码不执行");
        } catch (ArithmeticException                 e) {
            //catch中写出处理异常的方式
            e.printStackTrace();//printStacktrace() 将异常信息打印出来
        } catch (Exception e) {//多个catch捕获多个异常，且子类异常在前,可以捕获Exception及其子类的异常
            System.out.println("这是一个Exception异常");
        }
        finally {
            System.out.println("finally中的代码不管异常是否发生都要执行的");
        }
        //endregion

        //region NullPointerException 空指针异常 ArrayIndexOutOfBoundsException 越界异常
        int[] arr = {1, 2, 3};
        try {
            method(arr, 3);
        } catch (NullPointerException ex) {
            ex.printStackTrace();//处理空指针异常的方式
        } catch (ArrayIndexOutOfBoundsException ex) {
            ex.printStackTrace();//处理越界异常的方式
        }
        //endregion

        //region ClassCastException 类型转换异常
        try {
            A b = new B();
            B b1 = (B) b;
            C b2 = (C) b;//ClassCastException 类型转换异常 b为B类型不能强转为C

        } catch (ClassCastException e) {
            e.printStackTrace();
        }
        //endregion

        //region NumberFormatException 数字格式异常
        try {
            String strNum = "一二三";
            System.out.println(Integer.parseInt(strNum));
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
        //region


    }

    static void method(int[] arr, int i) throws NullPointerException, ArrayIndexOutOfBoundsException {//声明可能产生的异常，//异常的创建用throw，异常的声明用throws
        if (arr == null) {
            throw new NullPointerException("空指针异常");//当if条件成立时，抛出一个空指针异常对象，并显示提示信息，抛出异常表示让方法调用者处理
        } else if (arr.length - 1 < i || i < 0) {
            throw new ArrayIndexOutOfBoundsException("索引超出范围");//异常的创建用throw，异常的声明用throws
        }
        System.out.println(arr[i]);
    }
}

class A {
    void method() throws Exception{}
};

class B extends A{
    @Override
    void method() throws NullPointerException {}//子类的异常范围小于等于父类
};

class C extends A {
};
```

### 自定义异常

```java
package note;

import java.util.ArrayList;

public class ExceptionNote {
    public static void main(String[] args) {
        //region ArithmeticException 数学运算异常
        try {//如果程序发生异常且没有被处理，将会将异常抛给jvm，jvm会终止程序
            System.out.println(500 / 0);
            System.out.println("发生异常后，try中的异常代码后的代码不执行");
        } catch (ArithmeticException                 e) {
            //catch中写出处理异常的方式
            e.printStackTrace();//printStacktrace() 将异常信息打印出来
        } catch (Exception e) {//多个catch捕获多个异常，且子类异常在前,可以捕获Exception及其子类的异常
            System.out.println("这是一个Exception异常");
        }
        finally {
            System.out.println("finally中的代码不管异常是否发生都要执行的");
        }
        //endregion

        //region NullPointerException 空指针异常 ArrayIndexOutOfBoundsException 越界异常
        int[] arr = {1, 2, 3};
        try {
            method(arr, 3);
        } catch (NullPointerException ex) {
            ex.printStackTrace();//处理空指针异常的方式
        } catch (ArrayIndexOutOfBoundsException ex) {
            ex.printStackTrace();//处理越界异常的方式
        }
        //endregion

        //region ClassCastException 类型转换异常
        try {
            A b = new B();
            B b1 = (B) b;
            C b2 = (C) b;//ClassCastException 类型转换异常 b为B类型不能强转为C

        } catch (ClassCastException e) {
            e.printStackTrace();
        }
        //endregion

        //region NumberFormatException 数字格式异常
        try {
            String strNum = "一二三";
            System.out.println(Integer.parseInt(strNum));
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
        //region


    }

    static void method(int[] arr, int i) throws NullPointerException, ArrayIndexOutOfBoundsException {//声明可能产生的异常，//异常的创建用throw，异常的声明用throws
        if (arr == null) {
            throw new NullPointerException("空指针异常");//当if条件成立时，抛出一个空指针异常对象，并显示提示信息，抛出异常表示让方法调用者处理
        } else if (arr.length - 1 < i || i < 0) {
            throw new ArrayIndexOutOfBoundsException("索引超出范围");//异常的创建用throw，异常的声明用throws
        }
        System.out.println(arr[i]);
    }
}

class A {
    void method() throws Exception{}
};

class B extends A{
    @Override
    void method() throws NullPointerException {}//子类的异常范围小于等于父类
};

class C extends A {
};
```

### 自定义异常

```java
public class CustomException {
    public static void main(String[] args) {
        Person person = new Person();
        try {
            person = new Person(130);
        } catch (AgeException e) {
            person.setAge(18);
            System.out.println("重新输入年龄为18");
        }
        System.out.println(person.getAge());
    }
}

class Person {
    private int age;

    public Person() {
    }

    public Person(int age) throws AgeException{
        if (age > 120 || age < 0) {
            throw new AgeException("年龄输入范围为0——120");
        }
        this.age = age;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) throws AgeException{
        if (age > 120 || age < 0) {
            throw new AgeException("年龄输入范围为0——120");
        }
        this.age = age;
    }
}
class AgeException extends RuntimeException {
    public AgeException() {//无参构造方法
    }

    public AgeException(String message) {
        super(message);//这是一个异常信息字符串
    }
}
```
