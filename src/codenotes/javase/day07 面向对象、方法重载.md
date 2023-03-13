---
title: day07 面向对象、方法重载
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
## 面向对象

定义：面向对象是一种对现实世界理解和抽象软件开发方法，OOP（Object Oriented Programming）

```java
package note;

/*
创建class文件即为创建类，一个Class文件即为一个类
一个java文件中可以有多个类(实际开发中一个文件一般只写一个类)，但是只能有一个public修饰的类(public修饰的类名和java文件名一致，该类为主类，存在main()方法)
main()方法只能存在主类中(public修饰的类)*未解
一个Java文件若有多个类，则在编译时会生成每个类的class文件
*/
public class Class_PackageNote {//类和对象、类的封装

    public static void main(String[] args) {
        //region 通过类创建对象
        Person noby = new Person("noby", 21);
        /*
        该过程分为大三步：
        1.Person noby 声明Person类的引用变量，该变量的变量名为noby
        2.new Person() 创建Person对象
            2.1.通过不同的参数列表调用不同的Person()方法(构造器、构造方法)(方法重载)
            2.2.返回该对象的引用
        3.“=”  把Person对象的引用(地址)赋值给引用变量noby
         */
        //endregion

        //region 通过对象调用方法
        noby.getClassName();
        noby.show();
        //endregion

        //region 设置属性和获取属性
        noby.setAge(-1);//此处赋值失败，因为Person类中的setAge()方法中对传入的数据进行的校验
        System.out.println(noby.getAge());
        //endregion

    }
}

class Person {

    //region 成员变量(属性)：该类具有的特征
    /*
    private 对属性进行封装，表示除了本类，其他类不可访问
    如：在ClassName类的main()方法中无法通过 对象名.属性 的方式给属性赋值或获取属性的数据
     */
    private String name = "noby";
    private int age = 21;
    //endregion

    //region 成员方法(行为)；该类具有的行为
    void getClassName() {//未使用成员变量的成员方法
        System.out.println("This is Person Class");
    }

    void show() {//使用成员变量的成员方法
        String name = "kace";
        System.out.println("name = " + name);
        System.out.println(this.name + "," + this.age);//this表示调用此方法的实例对象的引用
        //当show()方法中没有定义name局部变量时，this.name可以简写为name(jvm编译后会自动加上this)，此时的name就是this.name
    }
    //endregion


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        //region 此处可以进行数据校验，但一般不在此处校验，一般校验在前端的表单进行
        if (age < 0) {
            return;
        }
        //endregion
        this.age = age;
    }

    //region 无参构造方法 当类中未写任何构造方法时，编译器会自动添加一个无参构造方法
    public Person() {//new Person()调用该方法
    }
    //endregion

    //region 有参构造方法(当参数列表包含了所有成员变量时，为全参构造方法)
    public Person(String name, int age) {//new Person(String，int) 调用该方法
        //region 将构造函数参数列表中的参数赋值给类的成员变量
        this.name = name;
        this.age = age;
        //region
   
    }
    //endregion

    //region 构造函数可以根据成员方法随意排列组合，不同的排列组合为不同的构造函数，只有类中有该构造函数时
    public Person(int age, String name) {//这和public Person(String name,int age)不同
        this.name = name;
        this.age = age;
    }
    //endregion
}
```

### 面向对象的三大特性

#### 封装

1. 把具有相同属性和行为的客观事物抽象成类，
2. 并且可以使属性和方法让某些可信的类操作，通过访问修饰符对不可信的类进行隐藏。

#### 继承

所谓继承是指可以让某个类A，在无需重复编写B类的情况下，获得其属性和方法，对这些功能进行扩展，其主要作用是提高代码复用率、让子类拥有父类的功能。

#### 多态

* 理解：同一事物在不同情况下针对统一行为做出的不同反应，它是指在父类中定义的属性和方法被子类继承之后，可以表现出不同的行为，这使得同一个属性或方法在父类及其各个子类中具有不同的含义。
* 多态的条件：
  * 有继承关系。
  * 有方法的重写。 
  * 有父类引用指向子类对象。
* 多态实现高内聚低耦合
  * 高内聚：各个模块功能可以在不依赖其他模块的代码独立实现其功能
  * 低耦合：各个模块之间较少使用重复交叉的代码
* 多态的好处：
  1. 可替换性（substitutability）。多态对已存在代码具有可替换性。例如，多态对圆Circle类工作，对其他任何圆形几何体，如圆环，也同样工作
  2. 可扩充性（extensibility）。多态对代码具有可扩充性。增加新的子类不影响已存在类的多态性、继承性，以及其他特性的运行和操作。实际上新加子类更容易获得多态功能。例如，在实现了圆锥、半圆锥以及半球体的多态基础上，很容易增添球体类的多态性
  3. 接口性（interface-ability）。多态是超类通过方法签名，向子类提供了一个共同接口，由子类来完善或者覆盖它而实现的。如图8.3所示。图中超类Shape规定了两个实现多态的接口方法，computeArea()以及computeVolume()。子类，如Circle和Sphere为了实现多态，完善或者覆盖这两个接口方法。
  4. 灵活性（flexibility）。它在应用中体现了灵活多样的操作，提高了使用效率。
  5. 简化性（simplicity）。多态简化对应用软件的代码编写和修改过程，尤其在处理大量对象的运算和操作时，这个特点尤为突出和重要。

## 面向对象和面向过程的区别

|          | 面向对象程序设计                                             | 面向过程程序设计（也叫结构化编程）                           |
| :------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| 定义     | 面向对象顾名思义就是把现实中的事物都抽象成为程序设计中的“对象”，其基本思想是一切皆对象，是一种“自下而上”的设计语言，先设计组件，再完成拼装。 | 面向过程是“自上而下”的设计语言，先定好框架，再增砖添瓦。通俗点，就是先定好main()函数，然后再逐步实现mian()函数中所要用到的其他方法。 |
| 特点     | 封装、继承、多态                                             | 算法+数据结构                                                |
| 优势     | 适用于大型复杂系统，方便复用                                 | 适用于简单系统，容易理解                                     |
| 劣势     | 比较抽象、性能比面向过程低                                   | 难以应对复杂系统，难以复用，不易维护、不易扩展               |
| 对比     | 易维护、易复用、易扩展，由于面向对象有封装、继承、多态性的特性，可以设计出低耦合的系统，使系统更加灵活、更加易于维护 | 性能比面向对象高，因为类调用时需要实例化，开销比较大，比较消耗资源;比如单片机、嵌入式开发、 Linux/Unix等一般采用面向过程开发，性能是最重要的因素。 |
| 设计语言 | Java、C++、Objective-C、C#、Python、GO…                      | C、Fortran                                                   |

## 方法重载

* 构成重载条件

  1. 相互重载的方法必须定义在一个同一个类

  2. 方法名必须相同
  3.  参数列表不同(类型、数量、排序)

```java
package note;

public class OverloadNote {//方法的重载
    public static void main(String[] args) {
        /*
        方法重载的定义：
        在同一个类里面放定义的几个方法名相同、参数列表不同(类型、个数、顺序)的方法之间构成重载关系，
        重载的目的是为了提供更多方法选项，增强类的功能

        构成方法重载的条件：
        1.相互重载的方法必须定义在一个同一个类
        2.方法名必须相同
        3.参数列表不同(类型、数量、排序)

        注意：方法重载并不在乎方法的返回值类型和访问修饰符
         */
        //region


        //endregion
        sum(1,2);
        sum(1.1,2.2);
        sum(1.1,2);
    }

    private static int sum(int num,int num1) {
        return num + num1;
    }

    private static double sum(double num,double num1){
        return num + num1;
    }

    private static double sum(int num,double num1) {
        return num + num1;
    }
    private static double sum(double num,int num1) {
        return num + num1;
    }

}
```
