---
title: day10 多态、软件设计模式
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
## 多态

* 理解：同一事物在不同情况下针对同一行为做出的不同反应，它是指在父类中定义的属性和方法被子类继承之后，可以表现出不同的行为，这使得同一个属性或方法在父类及其各个子类中具有不同的含义。
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
  3. 接口性（interface-ability）。多态是父类通过方法签名，向子类提供了一个共同接口，由子类来完善或者覆盖它而实现的。
  4. 灵活性（flexibility）。它在应用中体现了灵活多样的操作，提高了使用效率。
  5. 简化性（simplicity）。多态简化对应用软件的代码编写和修改过程，尤其在处理大量对象的运算和操作时，这个特点尤为突出和重要。

```java
package note.polymorphic;

/**
 * 多态
 */
public class PolymorphicNote {
    public static void main(String[] args) {
        Animal animal = new Dog();
        //region
        /*
        引用指向哪个对象就会调用该对象的方法，如果子类重写了父类的方法，
        那么调用的就是子类中重写的方法，否则调用的是父类的方法
         */
        System.out.println("animal.name = " + animal.name);//Animal
        System.out.println("new Animal().name = " + new Animal().name);//Animal
        System.out.println("new Dog().name = " + new Dog().name);//Dog
        System.out.println("animal.bark() = " + animal.bark());//Dog叫，等同于new Dog().bark()
        System.out.println("new Animal().bark() = " + new Animal().bark());//Animal叫
        System.out.println("new Dog().bark() = " + new Dog().bark());//Dog叫
        //endregion

        //region 接口的多态
        Usb usb = new Computer();
        System.out.println("usb.read() = " + usb.read());//Computer read，等同于new Computer().read();
        //endregion

    }
}

class Animal {
    String name = "Animal";
    String bark() {
        return "Animal叫";
    }
}

class Dog extends Animal{
    String name = "Dog";
    @Override
    String bark() {
        return "Dog叫";
    }
}

interface Usb {
    String read();
}

class Computer implements Usb {
    @Override
    public String read() {
        return "Computer read";
    }
}



```

```java
package note.polymorphic;

/**
 * 多态的应用举例
 * 在Person的work()方法中，只需传入参数File，即可执行File实现类的open()方法。
 */
public class PolymorphicNote2 {
    public static void main(String[] args) {
        Person noby = new Person();
        noby.name = "noby";
        System.out.println("noby.work(new Mp3()) = " + noby.work(new Mp3()));
        System.out.println("noby.work(new Mp4()) = " + noby.work(new Mp4()));
    }
}
class Person {
    String name;
    String work(File file) {
        return file.open();
    }
}

interface File {
    String open();
}

class Mp3 implements File {
    @Override
    public String open() {
        return "opened mp3";
    }
}

class Mp4 implements File {
    @Override
    public String open() {
        return "opened mp4";
    }
}
```

### 多态实现低耦合

```java
package note.polymorphic.lowcoupling;

/**
 * 通过多态实现代码的低耦合
 */
public class LowCoupling {
    public static void main(String[] args) {
        Person xiaoming = new Person("小明",new Cat("chery",true));
        xiaoming.show();
        System.out.println("小明将宠物换成了dog，并不需要修改之前的代码，只需添加dog类");
        xiaoming.pet=new Dog("wangcai", false);
        xiaoming.show();
    }
}
```

```java
package note.polymorphic.lowcoupling;

public class Person {
    String name;
    Pet pet;//这里的宠物不写特定的某一种宠物，而是pet，实现低耦合
    public void show() {
        System.out.printf("我的名字叫%s，我养了一只%s，它的名字叫%s" ,this.name,pet,pet.name);
        System.out.println();
    }

    public Person(String name, Pet pet) {
        this.name = name;
        this.pet = pet;
    }
}
```

```java
package note.polymorphic.lowcoupling;

public abstract class Pet {
    String name;
    boolean isMale;

    public Pet(String name, boolean isMale) {
        this.name = name;
        this.isMale = isMale;
    }
}
```

```java
package note.polymorphic.lowcoupling;

public class Dog extends Pet {

    public Dog(String name, boolean isMale) {
        super(name, isMale);
    }


    @Override
    public String toString() {
        return "Dog";
    }
}
```

```java
package note.polymorphic.lowcoupling;

public class Cat extends Pet{
    public Cat(String name, boolean isMale) {
        super(name, isMale);
    }

    @Override
    public String toString() {
        return "Cat";
    }

}
```



## 软件设计模式

* 书籍：java设计模式
* 常用：
  * 工厂模式
  * 适配器模式
  * 装饰期末实处
  * 建造者模式
  * 观察者模式

### 单例设计式

* 定义：只有一个类只有一个对象的设计模式

* 分类：
  * 饿汉设计模式
  
  ```java
  /**
   * 1. 私有化构造方法
   * 2. 声明一个私有静态指向本类对象的引用
   * 3. 提供一个公开、静态的方法，用来返回这个引用
   */
  public class Hungry {//饿汉式设计模式(优点：无线程安全问题 缺点：在第一次加载类后，资源被创建，占用资源)
      private static final Hungry instance = new Hungry();
  
      private Hungry () {
  
      }
  
      public static Hungry getInstance() {
          return instance;
      }
  }
  ```
  
  * 饱汉设计模式
  
  ```java
  /**
   * 1. 私有化构造方法
   * 2. 声明一个私有静态指向本类对象的引用，并赋值为null
   * 3. 提供一个公共静态方法，返回值这一个引用(在第一次返回这个引用前创建这一个对象并让这个其指向这一个引用)
   */
  class Full {//懒汉式设计模式方式一(优点：没有过早的进入内存 缺点：有线程安全问题，可能创建多个对象)
      private static Full instance;
      private Full() {
      }
  
      public static Full getInstance () {
          if (instance == null) {
              instance = new Full();
          }
          return instance;
      }
  }
  
  class Full2 {//懒汉式设计模式方式二(优点：无线程安全问题 缺点：每次执行都要判断锁对象状态，低效)
      private static Full2 singleton;
  
      private Full2() {
      }
  
      public static synchronized Full2 getInstance() {
          if (singleton == null) {
              singleton = new Full2();
          }
          return singleton;
      }
  }
  
  class Full3 {//懒汉式设计模式方式三(优点：高效，只在第一次执行判断锁对象状态，无线程安全问题 缺点：无)
      private static Full3 singleton;
  
      private Full3() {
      }
  
      public static Full3 getInstance() {
          if (singleton == null) {
              synchronized (Full3.class) {
                  if (singleton == null) {
                      singleton = new Full3();
                  }
              }
          }
          return singleton;
      }
  }
  ```

## javaBean

* JavaBean的定义：JavaBean是一种Java类，而且是一种特殊的、可重用的类。必须具有无参数的构造器，所有的属性都是private的，通过提供setter和getter方法来实现对成员属性的访问。

* javaBean的要求            
  
  * 该类由public修饰
  * 该类实现Serializable接口
  * 该类中的属性由private修饰
  * 该类中有getter()、setter()方法
  * 该类有public无参构造函数
  
```java
  package note;
  
  import java.io.Serializable;
  
  /**
   * javabean 是一种特殊的类
   * 该类由public修饰
   * 该类实现Serializable接口
   * 该类中的属性由private修饰
   * 该类中有getter()、setter()方法
   * 该类有public无参构造函数
   */
  public class JavaBeanNote implements Serializable {
      private String name;
      private int age;
  
      public JavaBeanNote() {
      }
  
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
          this.age = age;
      }
  }
  
  ```
  
  
