---
title: day11 字符串、字符串缓冲区、Object
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

## 字符串

### String

```java
package note;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;

/**
 * String的常用API
 */
public class StringNote {

    public static void main(String[] args) throws UnsupportedEncodingException {
        //region 字符串的构造
        String str = "abc";

        String str1 = new String("abc1");

        String str2 = new String(new byte[]{'a', 'b', 99, '2'});

        String str3 = new String(new byte[]{'a', 'b', 99, '3'}, "gbk");

        String str4 = new String(new byte[]{'a', 'b', 99, '4','5','6','7'},1,4);//4为长度

        String str5 = new String(new char[]{'a', 'b', 99, '4'});

        String str6 = new String(new char[]{'a', 'b', 99, '4','5','6','7'},1,4);

        System.out.println("str = " + str);//str = abc
        System.out.println("str1 = " + str1);//str1 = abc1
        System.out.println("str2 = " + str2);//str2 = abc2
        System.out.println("str3 = " + str3);//str3 = abc3
        System.out.println("str4 = " + str4);//str4 = bc45
        System.out.println("str5 = " + str5);//str5 = abc4
        System.out.println("str6 = " + str6);//str6 = bc45
        //endregion


        //region String.format 方法
        //8表示占位数，负数标空处向左对齐
        System.out.println(String.format("这个double数的值是：%-8.2f和%-,3.1f的值",3.1415926,31415.926));//这个double数的值是：3.14    和31,415.9的值
        //"，"表示输出的数值用"，"隔开，13表示向右对齐，占位数为13 0表示空位补0
        System.out.println(String.format("int数值是：%0,13d",1234567));//int数值是：00001,234,567
        //endregion

        //region 字符串的方法
        System.out.println("字符串的方法");
        System.out.println("str.charAt(2) = " + str.charAt(2));//str.charAt(2) = c
        System.out.println("str.compareTo(str1) = " + str.compareTo("abc11"));//str.compareTo(str1) = -2
        /*
        返回第一个不相同字符的ASCII码值之差，如果是正数表示s1大于s2，如果是0表示s1和s2一样
        如果不存第一个不相同的字符，且两字符串的长度不同，则返回s1的长度-s2的长度
         */
        System.out.println("str.concat(\"concat\") = " + str.concat("concat"));//str.concat("concat") = abcconcat
        System.out.println("\"contains\".contains(\"ta\") = " + "contains".contains("ta"));//"contains".contains("ta") = true
        System.out.println("\"startWith\".startsWith(\"star\") = " + "startWith".startsWith("star"));//"startWith".startsWith("star") = true
        System.out.println("\"endsWith\".endsWith(\"with\") = " + "endsWith".endsWith("with"));//"endsWith".endsWith("with") = false
        System.out.println("\"abc\".equals(\"str\") = " + "abc".equals("ABC"));//"abc".equals("str") = false
        System.out.println("\"abc\".equalsIgnoreCase(\"ABC\") = " + "abc".equalsIgnoreCase("ABC"));//"abc".equalsIgnoreCase("ABC") = true
        byte[] bytes  = "getBytes".getBytes();
        byte[] bytes1  = "getBytes".getBytes("utf-8");
        char[] chars = "toCharArray".toCharArray();
        System.out.println("Arrays.toString(bytes) = " + Arrays.toString(bytes));//Arrays.toString(bytes) = [103, 101, 116, 66, 121, 116, 101, 115]
        System.out.println("Arrays.toString(bytes1) = " + Arrays.toString(bytes1));//Arrays.toString(bytes1) = [103, 101, 116, 66, 121, 116, 101, 115]
        System.out.println("chars = " + Arrays.toString(chars));//chars = [t, o, C, h, a, r, A, r, r, a, y]
        System.out.println("\"indexOf\".indexOf('d') = " + "indexOf".indexOf('d'));//"indexOf".indexOf('d') = 2
        System.out.println("\"indexOf\".indexOf(\"ex\") = " + "indexOf".indexOf("ex"));//"indexOf".indexOf("ex") = 3
        System.out.println("\"lastIndexOfOf\".lastIndexOf(\"Of\") = " + "lastIndexOfOf".lastIndexOf("Of"));//"lastIndexOfOf".lastIndexOf("Of") = 11
        System.out.println("\"length\".length() = " + "length".length());//"length".length() = 6
        System.out.println("\"substring\".substring(2) = " + "substring".substring(2));//"substring".substring(2) = bstring
        //第二个数字表示索引而非长度
        System.out.println("\"substring\".substring(3,6) = " + "substring".substring(3, 6));//"substring".substring(3,6) = str
        System.out.println("\"toLowerCase\".toLowerCase() = " + "toLowerCase".toLowerCase());//"toLowerCase".toLowerCase() = tolowercase
        System.out.println("\"toUpperCase\".toUpperCase() = " + "toUpperCase".toUpperCase());//"toUpperCase".toUpperCase() = TOUPPERCASE
        System.out.println("\" trim \".trim() = " + " trim ".trim());//" trim ".trim() = trim
        System.out.println("\"java\".replace('j','s') = " + "java".replace('j', 's'));//"java".replace('j','s') = sava
        System.out.println("\"java\".replace(\"ja\",\"ab\") = " + "java".replace("ja", "ab"));//"java".replace("ja","ab") = abva
        System.out.println("Arrays.toString(\"H,ell,o\".split(\",\")) = " + Arrays.toString("H,ell,o".split(",")));//Arrays.toString("H,ell,o".split(",")) = [H, ell, o]

        /*
        new String()的创建，第二个参数为数组的长度
        Arrays.copyOfRange()的使用，第二个参数为数组的索引，其长度可以大于原数组
        substring()的使用，第二个参数为数组的索引

        indexOf(),LastIndexOf()的使用，可以传入字符和字符串
        replace()的使用，可以传入字符和字符串
        contains()的使用，只可以传入字符串
         */
        //endregion


        //region Sting面试题
        System.out.println("Sting面试题");
        String s = "abcd";//常量池中不存在abcd，在常量池中创建abcd
        //java常量优化机制：给一个变量赋值，如果等于号的右边是常量的表达式并且没有一个变量，那么就会在编译阶段计算该表达式的结果
        String s2 = "a" + "b" + "c" + "d";//常量池中存在abcd，编译期java常量优化机制计算的结果为该值，直接引用该值
        String s3 = "ab" + "cd";
        String s4 = new String("abcd");//创建了String对象，该对象的值引用了常量池中的abcd，如果没有abcd，则同时常量池中创建abcd对象和堆中String对象两个对象
        String temp = "ab";
        String s5 = temp + "cd";//当涉非常量的字符串的拼接时，通过StringBuilder进行计算，将计算的结果转换为新的String
        String s6 = getAb() + "cd";
        System.out.println(s == s2);//true
        System.out.println(s == s3);//true
        System.out.println(s == s4);//false
        System.out.println(s == s5);//false
        System.out.println(s == s6);//false
        System.out.println(s5 == s6);//false
        //endregion
    }

    private static String getAb() {
        return "ab";
    }
}

```

### 字符串格式化 format

![image-20220224155116684](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220224155116684.png)

### StringBuilder

- StringBuffer 与 StringBuilder 都继承自 AbstractStringBuilder，它们最大的区别就在于 StringBuffer 是线程安全的，而 StringBuilder 不是。因为在 StringBuffer 所有的方法上都有 synchronized 修饰

```java
package note;
/**
 * StringBuilder
 * StringBuilder相比较StringBuffer线程不安全
 */
public class StringBuilderNote {
    public static void main(String[] args) {
        //region 构造方法
        StringBuilder stringBuilder = new StringBuilder();//初始容量为16，当容量不够是扩容到原来的2倍+2
        StringBuilder stringBuilder1 = new StringBuilder(new String("str"));//初始容量为16+str.length()
        StringBuilder stringBuilder2 = new StringBuilder(5);//定义容量为指定值

        System.out.println("stringBuilder.capacity() = " + stringBuilder.capacity());
        System.out.println("stringBuilder1.capacity() = " + stringBuilder1.capacity());
        System.out.println("stringBuilder2.capacity() = " + stringBuilder2.capacity());
        //endregion

        //region 成员方法
        stringBuilder.append(1).append("abc").append('a').append(9.8).append(new Object());//字符的添加，可添加任意数据类型，以字符串存储，返回的为一个StringBuilder，   链式编程
        System.out.println("stringBuilder.capacity() = " + stringBuilder.capacity());//获取可变字符串的容量
        System.out.println("stringBuilder.charAt(2) = " + stringBuilder.charAt(2));//获取指定索引的值
        System.out.println("stringBuilder = " + stringBuilder);
        stringBuilder.delete(2,5);//删除指定区间 5表示索引
        stringBuilder.insert(2,"abc");//指定索引插入字符串
        System.out.println("stringBuilder = "  + stringBuilder);
        System.out.println("stringBuilder.length() = " + stringBuilder.length());
        System.out.println("stringBuilder.substring(3) = " + stringBuilder.substring(3));//字符串截取
        System.out.println("stringBuilder.substring(4,6) = " + stringBuilder.substring(4, 6));
        StringBuilder reverse = stringBuilder.reverse();//reverse()翻转字符串缓冲区
        System.out.println("reverse.toString() = " + reverse.toString());//toString将字符串缓冲区转换为字符串
        //endregion

        //region 利用StringBuilder删除字符串中的指定字符的方法
        for (int i = 0; i < stringBuilder.length(); i++) {
            if (stringBuilder.charAt(i) == 'a') {
                stringBuilder.deleteCharAt(i--);
            }
        }
        //endregion


    }
}

```

### StringBuffer

```java
package note;

/**
 * StringBuffer
 * StringBuffer相比较StringBuilder线程安全，但速度相对较慢
 */
public class StringBufferNote {
    public static void main(String[] args) {
        //region 构造函数
        StringBuffer stringBuffer = new StringBuffer();
        StringBuffer stringBuffer1 = new StringBuffer(new String("stringBuffer"));
        StringBuffer stringBuffer2 = new StringBuffer(4);
        //endregion

        //region 成员方法
        stringBuffer.append("append");
        System.out.println("stringBuffer.length() = " + stringBuffer.length());
        System.out.println("stringBuffer.capacity() = " + stringBuffer.capacity());
        stringBuffer.delete(1,4);//4表示索引
        stringBuffer.insert(1,"insert");
        System.out.println("stringBuffer = " + stringBuffer);
        //endregion
    }
}

```

### 三者的区别

- 都是基于 char 数组实现的
- String 为 final 修饰的 char 数组，因此为不可变的字符串，String 存储在常量池里面
- StringBuilder、StringBuffer 为可变字符串，而且操作都是在数组上，数组的默认长度为 16(即为容量为 16)，当容量不够是扩容到原来的 2 倍 +2
- StringBuffer 线程安全、StringBuilder 线程不安全
- 三者效率为：StringBuilder>StringBuffer>String

## Object

### equals,hashcode

```java
package note;

/**
 * Object对象
 */
public class ObjectNote {
    public static void main(String[] args) {
        //region equals
        String str = "java";//存在于常量池中
        String str1 = new String("java");//存在于对象
        System.out.println("str.equals(str1) = " + str.equals(str1));//true，他们的地址值不同，但内容相同
        System.out.println("str == str1 = " + (str == str1));//false
        //endregion

        //region hashcode
        System.out.println("\"Aa\".hashCode() = " + "Aa".hashCode());//2112
        System.out.println("\"BB\".hashCode() = " + "BB".hashCode());//2112
        /*
        他们的哈希值相同，这是由于hash算法本身决定的，它并不能保证一定不存在hash值相同的对象。因此hash相同的对象不代表是同一个对象。
         */
        //endregion

        //region toString
        System.out.println("new ObjectSon() = " + new ObjectSon());
        //endregion
    }
}

class ObjectSon {//所有的类都集成Object
    //toString方法可以让对象以字符串的格式输出
    @Override
    public String toString() {
        return "重写Object的toString方法，通常用来输出该对象的属性信息";
    }
}

```

### clone

```java
package note;

/**
 * 浅拷贝和深拷贝
 */
public class CloneNote {
    public static void main(String[] args) throws CloneNotSupportedException {
        Person noby = new Person("noby", new Dog("lucky", new Toy("ball")));
        System.out.println(noby);
        Person kace = noby.clone();//深拷贝
        /*
        深拷贝，在拷贝引用类型成员变量时，为引用类型的数据成员另辟了一个独立的内存空间，实现真正内容上的拷贝，而不是地址的拷贝。
         */
        System.out.println(kace);
        Person july = noby;//浅拷贝
        /*
        浅拷贝，在拷贝引用类型成员变量时，直接拷贝成员变量的地址值。
         */
        System.out.println(july);
    }
}

class Person implements Cloneable {
    String name;
    Dog dog;
    public Person(String name, Dog dog) {
        this.name = name;
        this.dog = dog;
    }

    @Override
    public Person clone() throws CloneNotSupportedException {
        Person newperson = (Person)super.clone();
        newperson.dog = dog.clone();
        return newperson;
    }

    @Override
    public String toString() {
        return "Person{" +
                "personhashcode" + this.hashCode() +
                "name='" + name + '\'' +
                ", dog=" + dog +
                '}';
    }
}

class Dog implements Cloneable{
    String name;
    Toy toy;

    public Dog(String name, Toy toy) {
        this.name = name;
        this.toy = toy;
    }

    @Override
    public Dog clone() throws CloneNotSupportedException {
        Dog newdog = (Dog)super.clone();
        newdog.toy = toy.clone();
        return newdog;
    }
    @Override
    public String toString() {
        return "Dog{" +
                "doghashcode" + this.hashCode() +
                "name='" + name + '\'' +
                ", toy=" + toy +
                '}';
    }
}

class Toy implements Cloneable{
    String name;

    public Toy(String name) {
        this.name = name;
    }

    @Override
    public Toy clone() throws CloneNotSupportedException {
        return (Toy) super.clone();

    }

    @Override
    public String toString() {
        return "Toy{" +
                "toyhashcode" + this.hashCode() +
                "name='" + name + '\'' +
                '}';
    }
}
```
