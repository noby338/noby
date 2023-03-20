---
title: day08 jvm虚拟内存、类加载、修饰符
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

## package

* 定义：包其实就是一个文件夹，会在同一个包去放相同、类似的代码，对代码进行分门别类的管理、维护

* 基本结构：xxx.xxx.xxx.....

* 规范：

  * 团队项目：

    * team.团队名.项目名.模块名.
    * com.公司名.项目名.模块名.

  * 个人项目：

    - indi ：

      个体项目，指个人发起，但非自己独自完成的项目，可公开或私有项目，copyright主要属于发起者。

      包名为“indi.发起者名.项目名.模块名.……”。

    - pers ：

      个人项目，指个人发起，独自完成，可分享的项目，copyright主要属于个人。

      包名为“pers.个人名.项目名.模块名.……”。

    - priv ：

      私有项目，指个人发起，独自完成，非公开的私人使用的项目，copyright属于个人。

      包名为“priv.个人名.项目名.模块名.……”。

    - onem ：

      与“indi”相同，推荐使用“indi”。

## java修饰符

### 访问修饰符

* 定义：在java中，对类、属性、方法有不同级别的访问控制权限的修饰符
* 注意： 访问修饰符可以修饰 类、接口、成员变量、成员方法，但是protected和private不可以修饰外部类和接口


| 访问权限  | 同一个类 | 同一个包 | 不同包子类 | 不同包非子类 |
| --------- | -------- | -------- | ---------- | ------------ |
| public    | 是       | 是       | 是         | 是           |
| protected | 是       | 是       | 是         | 否           |
| default   | 是       | 是       | 否         | 否           |
| private   | 是       | 否       | 否         | 否           |

```java
package priv.noby.b;

import priv.noby.a.Fu;

public class Zi extends Fu {
    void method() {
        super.show();
        this.show();
        new Zi().show();
//        new Fu().show();//报错
        //在子类中，子类实例可以访问其从父类继承而来的 protected 方法，而不能访问父类实例的protected方法
    }
}
```

```java
package priv.noby.a;

public class Fu {
    protected void show() {
    }
}
```



### 非访问修饰符

#### final修饰符

1. 用来修饰一个变量
   1.  如果变量为基本数据类型，则该引用为常量，该值无法修改；
   2.  如果变量为引用数据类型，比如对象、数组，则该对象、数组本身可以修改，但指向该对象或数组的地址的引用不能修改。
   3.  如果变量为局部变量，则在第一次赋值有效。
   4.  如果变量为成员变量，则必须当场赋值，否则编译会报错。
2. 当使用final修饰方法时，这个方法将成为最终方法，无法被子类重写。但是，该方法仍然可以被继承。
3. 当用final修饰类时，该类成为最终类，无法被继承。简称为“断子绝孙类”。

```java
package note;

public class FinalNote {
    public static void main(String[] args) {
        //region final修饰基本数据类型
        final int NUM;//final修饰的变量一般为大写(该变量变为常量)
        NUM = 5;//final常量只有第一次赋值才会成功
//        NUM = 2;//final常量的初值不能被改变
        //endregion

        //region final修饰引用数据类型
        final String[] names = new String[3];
//        names = new String[4];//final修饰的引用数据类型其引用不可更改
        names[0] = "noby";
        names[0] = "kace";//引用里面的数据可以更改
        //endregion
        Teacher t = new Teacher();
        t.say();//仍然可以使用父类的方法(可以继承)
    }
}

class Person {
//    private final String name;//final修饰的成员变量必须赋初值
    public final void say() {
        System.out.println("说....");
    }

}
final class Teacher extends Person {
    //1. final修饰的方法不能被重写，但此方法仍然被继承
    /*@Override
    public void say() {
        System.out.println("老师在一本正经的说...");
    }*/
}

//class EnglishTeacher extends Teacher {}//final修饰的类不能被继承



```

#### static修饰符

* 修饰成员变量：该属性属于类
* 修饰成员方法：该方法通过类调用
* 可修饰内部类：静态内部类
* 代码块：静态代码块
* 导入某指定静态资源：import static 这两个关键字连用可以指定导入某个类中的指定静态资源。

```java
package note;

public class StaticNote {
    public static void main(String[] args) {
        Circle d = new Circle();
        d.r = 10;
        //region 静态属性的值存储在类中，通过类名访问
        Circle.area = 100;//这里的Circle指的不是类，而是该类的字节码文件对象
        //endregion

        //region 静态方法通过类名调用
        Circle.getPI();
        //endregion
    }
}

class Circle {
    static double PI = 3.14;
    int r;
    static double area;

    static void getPI () {
        //region 静态方法不可以访问非静态属性
//        System.out.println(r);
        //endregion

        //region 静态方法可以访问静态属性
        System.out.println(PI);
        //endregion
    }

    void getr () {
        //region 成员方法可以访问非静态属性
        System.out.println(r);
        //endregion

        //region 成员方法可以访问静态属性
        System.out.println(PI);
        //endregion
    }
}

```

## 代码块

* 定义：在类中或者方法中,使用{}括起来的一段代码,就称它是代码块。

- 静态代码块
- 非静态代码块

```java
package note;

public class CodeBlockNote {//代码块
    public static void main(String[] args) {
        new Block();
        new Block();
    }
}

class Block {
    private String name;
    private static int age;

    //region 静态代码块
    /*
    静态代码块在第一次使用该类时执行，且只执行一次
     */
    static {
        System.out.println("静态代码块执行");
//        System.out.println(this.name);静态代码块不能访问非静态属性
        System.out.println(Block.age);
    }
    //endregion

    //region 非静态代码块
    /*
    非静态代码块在调用构造方法前执行，构造方法被调用几次，就执行几次
    经常用来在创建对象之前做准备工作
     */
    {
        System.out.println("非静态代码块执行");
        System.out.println(this.name);
        System.out.println(Block.age);
    }
    //endregion

    public Block () {
        System.out.println("无参构造方法执行");
    }
}
```

## 类加载

![image-20220120205246868](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220120205246868.png)

```java
package note;

/**
 * 类的生命周期
 */
public class initializationClass {
    public static void main(String[] args) {
//        System.out.println("Zi.name = " + Zi.name);
        /*
        被动引用：引用父类的静态字段，只会引起父类的初始化，而不会引起子类的初始化。
        Fu的静态代码块
        Zi.name = fuName
         */
        System.out.println();

        new Zi();
        /*
        Fu的静态代码块,Fu.name=null 静态变量在准备阶段附初值，该值非java程序中的值，而为jvm的默认值。java程序的赋值阶段在初始化阶段
        Zi的静态代码块
        Fu的非静态代码块
        Fu构造方法执行
        Zi的非静态代码块
        Zi构造方法执行
         */

        System.out.println();
        new Fu();
        /*
        前面在创建子类字节码文件对象时已经创建父类的而字节码文件对象，静态代码块仅在类初始化时才会执行，所以这里不会执行父类的静态代码块
        Fu的非静态代码块
        Fu构造方法执行
         */
    }

}

class Fu {
    private int age;//没有static修饰的成员变量或者成员方法都是类同非静态代码块 他们都是在创建对象时创建(构造函数之前)
    static {
        /*
        静态代码块的意义在于给静态变量赋初值，
        相比较直接在静态变量的声明后面赋初值，
        静态代码块可以根据逻辑语句给静态变量赋不同的初值
         */
        System.out.println("Fu的静态代码块，name="+Fu.name);
    }
    static String name = "fuName";//static修饰的成员变量或者成员方法都是在类的生命周期的准备阶段创建并附初值为null，而赋值阶段为初始化阶段，该阶段静态代码块和静态赋值语句都是顺序执行
    Fu() {
        System.out.println("Fu构造方法执行");
    }
    {
        System.out.println("Fu的非静态代码块");
    }

}

class Zi extends Fu{
    static {
        System.out.println("Zi的静态代码块");
    }
    {
        System.out.println("Zi的非静态代码块");
    }
    Zi() {
        System.out.println("Zi构造方法执行");
    }
}

```

## jvm虚拟内存

![image-20220212165618860](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220212165618860.png)

![2453238-20210801120735671-790804759.png](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/2453238-20210801120735671-790804759.png)

**程序计数器**：（Program Counter Register）也叫PC寄存器。程序计数器是一块较小的内存空间，可以看作是当前线程所执行的字节码的行号指示器

**本地方法栈**：为虚拟机使用到的本地Native方法服务时的栈帧，和虚拟机栈类似

**堆**：所有通过new创建的对象都放在该区域中，程序主要操作的区域

**栈**：存放局部变量、局部引用

这些区域都是针对虚拟内存的分区，不是真正的物理内存，虚拟内存可以当做是想象出来的内存，不是真实存在的。

### 类的生命周期

定义：一个类从被加载到虚拟机内存中开始，到被垃圾回收机制回收的过程为类的生命周期，其中验证、准备、解析统称为连接。加载、连接、初始化称为类加载，类加载强调一个jvm能够直接使用所需的类，所以类必须完成初始化。

1. 加载

   * 解释：通过全限定类名来获取定义此类在硬盘上class文件，通过字节流加载进内存，生成字节码文件对象；

     - 通过全限定类名来获取定义此类的二进制字节流。
     - 将这个字节流所代表的静态存储结构转化为方法区的运行时数据结构。
     - 在内存中生成一个代表这个类的 字节码对象，作为方法区这个类的各种数据的访问入口。
2. 验证

   * 解释：确保Class文件字节流包含的信息中符合《Java虚拟机规范》的全部约束要求，并且不会危害虚拟机自身的安全。
     * 文件格式验证

     * 元数据验证：是否存在父类，父类的继承链是否正确，抽象类是否实现了其父类或接口之中要求实现的所有方法，字段、方法是否与父类产生矛盾等。保证不存在不符合 Java 语言规范的元数据信息。

     * 字节码验证：通过数据流和控制流分析，确定程序语义是合法的、符合逻辑的。例如保证跳转指令不会跳转到方法体以外的字节码指令上。

     * 符号引用验证：在解析阶段中发生，保证可以将符号引用转化为直接引用。
3. 准备
   * 解释：方法区中为类变量（静态变量）分配内存并设置其初始值。初值为jvm默认的初值，而不是我们在程序中设定的初值。
4. 解析
   * 解释：常量池内的符号引用转化为直接引用的过程。解析动作主要针对类或接口、字段、类方法、接口方法、方法类型、方法句柄和调用点限定符 7 类符号引用进行。
5. 初始化
   * 解释：是类加载的最后一步，而也是到了该阶段，才真正开始执行类中定义的java程序代码(字节码)，之前的动作都由虚拟机主导。区别于对象的初始化，类的初始化所做的一起都是基于类变量或类语句的。主动引用该类会触发类的初始化。
     * 会自上而下运行静态代码块或静态赋值语句（非静态代码块和构造方法会在使用阶段通过实例化对象执行）
     * 如果为实例化为一个对象，则会执行成员变量、非静态代码块和构造函数。
     * 如果存在父类，则父类先进行初始化。
6. 使用

   - 主动引用：会触发类的初始化
     - 通过new关键字实例化对象、读取或设置类的静态变量、调用类的静态方法。
     - 通过反射方式执行new关键字实例化对象、读取或设置类的静态变量、调用类的静态方法。
     - 初始化子类的时候，会触发父类的初始化。
     - 作为程序入口直接运行时（也就是直接调用main方法）。
   - 被动引用：不会触发类的初始化
     - 引用父类的静态变量，只会引起父类的初始化，而不会引起子类的初始化。
     - 定义该类的类数组，不会引起类的初始化。
     - 引用类的常量，不会引起类的初始化。

7. 卸载

   - 该类所有的实例都已经被回收，也就是Java堆中不存在该类的任何实例；
   - 加载该类的ClassLoader已经被回收；
   - 该类对应的java.lang.Class对象没有在任何地方被引用，无法在任何地方通过反射访问该类的方法。


## 类加载器

* 定义：加载.class文件的东西

* 作用：将本地磁盘的.class字节码文件加载进内存，形成.class字节码文件对象

* 类加载器的分类：
  * 引导类加载器：
  * 扩展类加载器(ExtClassLoader)：加载jdk中的jre中lib中的ext中资源文件
  * 系统内加载器(AppClassLoader)：加载classpath路径(是指.class文件存放的文件夹，默认 在bin中)下的资源文件

* 类加载器的分成关系
  * 上层：引导类加载器
  * 中层：扩展类加载器
  * 下层：系统类加载器

* 类加载器的委托机制(加载顺序)
  * 首先任何类的字节码文件开始都是由系统类加载器来加载，但是由于委托机制，所以系统类加载器会委托给上一层类加载器来加载，即扩展类加载器来加载，由于委托机制，扩展类加载器会委托给上一层类加载器来加载，即引导类加载器来加载，引导类加载器没有上一层，就在自己的片区去加载，如果找到就正常加载，如果没有找到，就让下一层继续加载，如果扩展类加载器再自己的片区找到了，就正常加载，如果没找到，就让下一层继续加载，就是最后会让系统类加载器来加载，如果找到了就正常加载，如果没有找到则会报异常。

* 各个加载器加载的资源





