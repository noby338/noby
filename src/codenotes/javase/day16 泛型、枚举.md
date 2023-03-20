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

* 定义：泛型是Java中的一种特性，它允许在编写代码时使用类型参数来代替具体的类型，从而使代码更加通用和灵活。通过使用泛型，可以编写可重用的代码，同时还可以提高代码的类型安全性和可读性。
* 在Java中，泛型可以应用于类、接口、方法等，通过使用泛型，可以将类型参数传递给这些结构，从而使它们能够处理不同类型的数据。例如，可以定义一个泛型类来表示一个列表，这个列表可以存储任意类型的数据。
* 使用泛型可以带来多种好处，包括：
  -  提高代码的可读性和可维护性：使用泛型可以使代码更加通用和灵活，从而使代码更易于理解和修改。
  -  增加代码的类型安全性：使用泛型可以避免在运行时出现类型转换异常等问题，从而提高代码的健壮性。
  -  提高代码的性能：使用泛型可以避免使用Object类型来存储数据，从而减少了类型转换的开销，提高了代码的执行效率。
* 泛型为一种语法糖
  * 语法糖：指计算机语言中添加的某种语法，这种语法对语言的功能并没有影响，但是更方便程序员使用。通常来说使用语法糖能够增加程序的可读性，从而减少程序代码出错的机会。
* 泛型的注意事项
  * 泛型只能是引用数据类型，不能写基本数据类型
  * 实例化泛型是的语法，前面的泛型的数据类型要和后面的泛型的数据类型匹配，后面的箭头可以省略不写
    * `ArrayList<String> al1 = new ArrayList<String>();`
    * `ArrayList<String> al2 = new ArrayList<>();`
    * `ArrayList<String> al3 = new ArrayList();`
* 常用的泛型字母：K-key键、T-type类型、V-value值、E-enumeration枚举、E-element元素

```java
package note.generic;  
  
import java.util.ArrayList;  
  
/**  
 * @Description 泛型的基本使用  
 * @Author Noby  
 * @Date 2023/3/17 21:51  
 */public class GenericNote {  
    public static void main(String[] args) {  
  
        //region 泛型类：使用了泛型的类  
        GenericClass<String> stringGenericClass = new GenericClass<>();  
        stringGenericClass.setVar("noby");  
        System.out.println("stringGenericClass.getVar() = " + stringGenericClass.getVar());  
        //endregion  
  
        //region 泛型接口的实现类：接口泛型已定义  
        new GenericInterfaceImpl1().methodInterface("noby");  
        //endregion  
  
        //region 泛型接口的实现类：接口泛型未定义  
        new GenericInterfaceImpl2<Integer>().methodInterface(2);  
        //endregion  
  
  
        //region 泛型方法：使用了该类没有声明的泛型的方法  
        concat("tow", 3);  
        //endregion  
  
        //region 泛型通配符  
        /*  
        ? 泛型通配符：表示该类型可以是任何数据类型  
       泛型通配符最常用的就是放在形参上接收不同类型的泛型对象  
         */        ArrayList<String> strings = new ArrayList<>();  
        ArrayList<Object> objects = new ArrayList<>();  
        method(strings);  
        method0(objects);  
        //endregion  
    }  
  
    /**  
     * 泛型运用在方法上时，如果所使用的泛型没有在类中声明，则需要在方法中声明  
     * 声明在返回值之前  
     *  
     * @param param  
     * @param param2  
     * @param <T1>  
     * @param <T2>  
     */  
    static <T1, T2> void concat(T1 param, T2 param2) {  
        System.out.println(param + "-" + param2);  
    }  
  
    static void method0(ArrayList<Object> list) {//Object并不是表示任意数据类型，而是只表示Object  
  
    }  
  
    static void method(ArrayList<?> list) {//可以存储任意数据类型  
  
    }  
}  
  
  
/**  
 * @Description 泛型运用在类上时，声明在类名之后  
 * 如果某泛型已经在类中声明，则不需要在方法中额外声明，否则需在方法中额外声明  
 * @Author Noby  
 * @Date 2023/3/18 1:13  
 */class GenericClass<E> {//定义一个泛型类  
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
  
/**  
 * @Description 泛型运用在接口中  
 * @Author Noby  
 * @Date 2023/3/18 1:15  
 */interface GenericInterface<E> {  
    void methodInterface(E e);  
}  
  
/**  
 * @Description 泛型运用在接口的实现类中，方式1，定义好接口的泛型  
 * @Author Noby  
 * @Date 2023/3/18 1:15  
 */class GenericInterfaceImpl1 implements GenericInterface<String> {//定义实现类的泛型的类型为字符串  
  
    @Override  
    public void methodInterface(String s) {  
        System.out.println("实现类1的方法执行" + s);  
    }  
}  
  
/**  
 * @Description 泛型运用在接口的实现类中，方式2，实例化实现类时定义泛型的类型  
 * @Author Noby  
 * @Date 2023/3/18 1:16  
 */class GenericInterfaceImpl2<E> implements GenericInterface<E> {//实现类的泛型由创建对象时定义  
  
    @Override  
    public void methodInterface(E e) {  
        System.out.println("实现类2的方法执行" + e);  
    }  
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
  
/**  
 * @Description 泛型的类型擦除  
 * @Author Noby  
 * @Date 2023/3/18 0:54  
 */public class TypeErasureNote {  
    public static void main(String[] args) {  
        Student<String> student = new Student<>();  
    }  
}  
  
class Student<T>{  
    T data;  
    /*  
     编译器在处理泛型时，将带有泛型的语句进行翻译，之后得到的类型是：  
     class Student {        Object data;     }     jvm(虚拟机)并不识别泛型，只运行编译器翻译后得到的字节码文件  
     */}  
  
class Person<T extends Number> {//泛型通配符是写在方法参数列表里面用于限制参数的类型范围，这里非泛型通配符  
    T data;  
    /*  
     编译器在处理泛型时，将带有泛型的语句进行翻译，之后得到的类型是：  
     class Person {        Number data;     }     
     */
 }
```


## 泛型通配符

- 定义：用于表示类型参数的占位符，用“?”来表示。通配符可以用于限制泛型类型的范围，包括限制类型参数的上界或下界。
  - 无界通配符：使用不带任何限定符的 ?，表示类型参数可以是任何类型，相当于是所有类型的子类。例如：`List<?>` 表示可以是任何类型的 List。
  - 上界通配符：使用 extends 关键字，表示类型参数必须是指定类型的子类。例如：`List<? extends Number>` 表示可以是 Integer、Double、Float 等 Number 的子类。
  - 下界通配符：使用 super 关键字，表示类型参数必须是指定类型的父类。例如：`List<? super String>`表示可以是String的父类。

```java
package note.generic;  
  
import java.util.ArrayList;  
import java.util.List;  
  
/**  
 * @Description 泛型通配符的基本使用  
 * 通配符可以用于限制泛型类型的范围  
 * @Author Noby  
 * @Date 2023/3/17  
 */public class GenericWildcardNote {  
  
    public static void main(String[] args) {  
        //region 无界通配符  
        List<Integer> intList = new ArrayList<>();  
        intList.add(1);  
        intList.add(2);  
        intList.add(3);  
        printList(intList);  
  
        List<String> strList = new ArrayList<>();  
        strList.add("Hello");  
        strList.add("World");  
        strList.add("!");  
        printList(strList);  
        //endregion  
  
        //region 上界通配符  
//        method1(strList);  
        method1(intList);  
        //endregion  
  
        //region 下界通配符  
        method2(strList);  
        //endregion  
  
    }  
  
    /**  
     * 无界通配符  
     * 定义一个打印集合参数的方法  
     *  
     * @param list  
     */  
    static void printList(List<?> list) {  
        for (Object o : list) {  
            System.out.print(o + " ");  
        }  
        System.out.println();  
    }  
  
  
    /**  
     * 上界通配符  
     * 可以存储number及其子类的数据类型  
     *  
     * @param list  
     */  
    static void method1(List<? extends Number> list) {  
    }  
  
    /**  
     * 下界通配符  
     * 可以存储String及其父类的数据类型  
     *  
     * @param list  
     */  
    static void method2(List<? super String> list) {  
    }  
}
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

