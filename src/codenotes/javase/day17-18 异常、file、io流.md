---
title: day17-18 异常、file、io流
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

其中Error是错误，对于所有的编译时期的错误以及系统错误都是通过Error抛出的。这些错误表示故障发生于虚拟机自身、或者发生在虚拟机试图执行应用时，如Java虚拟机运行错误（Virtual MachineError）、类定义错误（NoClassDefFoundError）等。这些错误是不可查的，因为它们在应用程序的控制和处理能力之 外，而且绝大多数是程序运行时不允许出现的状况。对于设计合理的应用程序来说，即使确实发生了错误，本质上也不应该试图去处理它所引起的异常状况。在 Java中，错误通过Error的子类描述。

### Exception


Exception，是另外一个非常重要的异常子类。它规定的异常是程序本身可以处理的异常。异常和错误的区别是，异常是可以被处理的，而错误是没法处理的。

在Java中常见的异常非常多，例如空指针异常、数组下标越界异常、数学异常等等。为了方便区分、处理这些异常，Java将所有的异常分为了两种：编译时异常和运行时异常。

- 编译时异常，也叫可检查异常（checked exception），所有checked exception都是需要在代码中处理的。它们的发生是可以预测的，正常的一种情况，可以合理的处理。比如IOException，或者一些自定义的异常。除了RuntimeException及其子类以外，都是checked exception。
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

###  自定义异常

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



## file

* 持久化：永久的保存数据，在java中常见的持久化方式：

  * 将数据写到文件中，然后将数据存放在硬盘
  * 将数据存放在数据库
  * 将数据放在网盘中(网络)

* 路径：

  * 绝对路径：在windows下以盘符开始的路径
       如： c:/abc/aaa/bbb/1.txt

  * 相对路径：相对于当前目录的路径
       如： aaa/bbb/1.txt   

  * 转义字符：

    | \n   | 换行   |
    | ---- | ------ |
    | \r   | 回车   |
    | \t   | 制表符 |
    | \b   | 退格   |
    | \\\\ | \      |

  * 扩展：只有windows操作系统有盘符，其他如linux和Unix系统没有盘符    

  ```java
  package note;
  
  import java.io.File;
  import java.io.IOException;
  
  public class FileNote {//持久化
  
      public static void main(String[] args) throws IOException {
          //region 构造函数
          //通过路径创建对应的file对象，对该对象的操作即为对该文件的操作
          File file = new File("D:\\IdeaProjects\\term87\\day17\\src\\note\\res\\txtfile.txt");//通过绝对路径创建文件对象
          File dir = new File("day17\\src\\note\\res\\aaa");//通过相对路径创建文件、文件夹对象
          File dirs = new File("day17\\src\\note\\res\\bbb\\ccc");
          System.out.println(file);
          //endregion
  
          //region 成员方法
          System.out.println("file.getName() = " + file.getName());//获取文件名
          System.out.println("file.getAbsolutePath() = " + file.getAbsolutePath());//获取文件的绝对路径
          System.out.println("file.getPath() = " + file.getPath());//获取文件的相对路径(即为创建时的路径)
          System.out.println("file.getParent() = " + file.getParent());//获取父及文件夹路径
          System.out.println("file.exists() = " + file.exists());//文件是否存在
          System.out.println("file.isFile() = " + file.isFile());//是否为一个文件
          System.out.println("file.isDirectory() = " + file.isDirectory());//是否为一个文件夹
          System.out.println("file.delete() = " + file.delete());//删除文件
          System.out.println("file.createNewFile() = " + file.createNewFile());//创建文件
          System.out.println("dir.mkdir() = " + dir.mkdir());//创建文件夹
          /*
          mkdir()方法只要路径中有某个文件夹不存在及创建失败
          此时想要创建成功，应该用mkdirs()
           */
          System.out.println("dirs.mkdirs() = " + dirs.mkdirs());//创建多级文件夹
          //endregion
  
      }
  }
  ```

## 编码表

* 一个汉字三个字节，若用字节流容易乱码，因此出现了字符流(底层仍然为字节流)
* 字符流 = 字节流 + 编码表(不同的编码表)
  * 依据汉字的第一个字节为负数判断其一次性读入的字节数，若某字节若为正数，则读取一个字节，通过其中包括的ascll码转换为对应的英文字节；若某字节为负数，则连续读取三个字节(utf-8)，并将其转换为其他字符(如汉字)
  * ![image-20220105153638462](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220105153638462.png)

* ascll编码表 
  * 任何编码表都包括ascll，如GBK Unicode

* Unicode(万国码) 

  * UTF-8(一个中文3个字节) 

  * UTF-16(一个中文2个字节) 

  * UTF-32(一个中文4个字节)

* GBK(中国编码表)
  * 一个汉字两个字节

* 编码
  * 字符串=>字节

* 解码
  * 字节=>字符串

## IO流

![image-20220217210510485](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220217210510485.png)

* IO流目的：通过内存数据和磁盘数据之间转换实现数据的的保存
  * Input 输入到内存
  * Output 输出到磁盘
* 分类：
  * 流向
    * 输入流
    * 输出流
  * 类型
    * 字符流
      * 一般复制文本文件
    * 字节流
      * 读取中文会乱码
      * 万能流，可复制任何文件

* IO流的体系结构？
  	OutputStream 字节输出流的顶层抽象类
    			-- *FileOutputStream 
    			-- *ObjectOutputStream
    			-- FilterOutputStream
    				-- *BufferedOutputStream
    				-- *PrintStream 

  ​	InputStream 字节输入流的顶层抽象类
  ​		-- *FileInputStream
  ​		-- *ObjectInputStream
  ​		--  FilterInputStream
  ​			-- *BufferedInputStream
  ​	
  ​	Writer 字符输出流的顶层抽象类
  ​		-- *OutputStreamWriter
  ​			-- *FileWriter 
  ​		-- *BufferedWriter
  ​		-- *PrintWriter
  ​		
  ​	Reader 字符输入流的顶层抽象类
  ​		-- *InputStreamReader
  ​			-- *FileReader 
  ​		-- *BufferedReader

### 字节流与字符流

- 区别：
  - 字节流操作是以字节为单位，字符流是以字符为单位
  - 字节流不会对数据进行转码，字符流会进行转码
  - 字符流底层通过字节流实现，并且添加了缓冲区，默认每次读写8192字节数据

- 选择：
  - 在Java中大多数情况下使用字节流进行IO，例如二进制文件的读写、网络数据的传输都是采用字节流
  - 只有在需要将读取到的数据用于阅读时选择字符流，避免出现乱码影响阅读。

### 编码

* 定义：字节和字符的对应关系
* 种类：ASCLL、GBK、UTF-8、UTF-16等

### FileOutputStream

```java
package note.IObyte;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileOutputStreamNote {//字节输出流
    public static void main(String[] args) throws IOException {
        //region 构造
        /*
        常用构造方法
        public FileOutputStream(File file)
		public FileOutputStream(String name)
		public FileOutputStream(File file, boolean append)
		public FileOutputStream(String name, boolean append)

		注意：如果file文件不存在，构造方法也会帮助我们创建出一个文件
         */
        File file  = new File("day17\\src\\note\\res\\FileOutputStreamNote.txt");
        FileOutputStream fileOutputStream = new FileOutputStream(file,false);//参数二表示是否追加,默认为false
        FileOutputStream fileOutputStream1 = new FileOutputStream("day17\\src\\note\\res\\FileOutputStreamNote1.txt");//此种方法可以省略创建file对象
        //endregion

        //region 通过字节数组写出数据
        String data = "fileoutputstreaminfo";
        byte[] bytes = data.getBytes();
        fileOutputStream.write(bytes,2,3);//此处第二个索引表示的是长度
        //endregion

        //region 正则表达式输入换行
        fileOutputStream.write('\n');
        //endregion

        //region 通过字节写出数据
        fileOutputStream.write('a');
        //endregion
        

        fileOutputStream.close();//关闭字节输出流
    }
}

```



### FileInputStream

```java
package note;

import java.io.*;

public class FileInputStreamNote {//字节输入流
    public static void main(String[] args) throws IOException {
        //region 构造
        /*
          public FileInputStream(File file)
          public FileInputStream(String name)

          注意：如果文件不存在，则运行报错(不会像输入流一样自动创建文件)
         */
        //endregion

        //region 通过字节读入数据
        method();
        //endregion

        //region 通过字节数组读入数据
        method1();
        //endregion

    }

    private static void method1() throws IOException {
        FileInputStream fileInputStream = new FileInputStream("day17\\src\\note\\res\\FileOutputStreamNote.txt");
        byte[] bytes = new byte[7];
        int length;
        String str = "";
        while ((length = fileInputStream.read(bytes)) != -1) {
            str += new String(bytes, 0, length);
        }
        System.out.println("通过字节数组读入数据" + str);
    }

    private static void method() throws IOException {
        FileInputStream fileInputStream = new FileInputStream("day17\\src\\note\\res\\FileOutputStreamNote.txt");
        int by;
        String str = "";
        while ((by = fileInputStream.read()) != -1) {
            str += (char)by;
        }
        fileInputStream.close();//关闭字节输入流
        /*
        read方法，调用一次返回一个读取到的字符，并将指针指向下一个字符，若未读取到字符这返回-1
         */
        System.out.println("通过字节读入数据" + str);
    }
}

```



### FileWriter

```java
package note;

import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;

public class FileWriterNote {//字符输出流
    public static void main(String[] args) throws IOException {
        //region 构造方法
        /*
          public FileWriter(File file)
          public FileWriter(String fileName)
          public FileWriter(File file, boolean append)
          public FileWriter(String fileName, boolean append)
         */
        //endregion

        //region 字符写出
        FileWriter fileWriter = new FileWriter("day18\\src\\res\\FileWriter.txt");
        fileWriter.write('A');
        fileWriter.write(97);
        fileWriter.flush();//刷新
        //endregion

        //region 字符数组写出
        fileWriter.write("Hello".toCharArray());
        fileWriter.flush();
        //endregion

        //region 字符串写出
        fileWriter.write("World");
        fileWriter.flush();
        //endregion

        fileWriter.close();
    }
}
```



### FileReader

```java
package note;

import java.io.FileReader;
import java.io.IOException;

public class FileReaderNote {//字符输入流
    public static void main(String[] args) throws IOException {
        //region 字符数组读入
        method();
        //endregion

        //region 字符读入
        method1();
        //endregion

    }

    private static void method1() throws IOException {
        FileReader fileReader = new FileReader("day18\\src\\res\\englishtxtfile.txt");
        int ch;
        String str = "";
        while ((ch = fileReader.read()) != -1) {
            str += (char) ch;
        }
        System.out.println("字符读入"+str);
    }

    private static void method() throws IOException {
        FileReader fileReader = new FileReader("day18\\src\\res\\englishtxtfile.txt");
        char[] chars = new char[100];
        int len;
        String str = "";
        while ((len = fileReader.read(chars)) != -1) {
            str += new String(chars,0,len);
        }
        System.out.println("字符数组读入"+str);
    }
}
```

### BufferedWriter

```java
package note;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class BufferedWriterNote {//缓冲字符输出流
    public static void main(String[] args) throws IOException {
        //region 构造 要以字符输出流为参数构造
        BufferedWriter bufferedWriter = new BufferedWriter(
                new FileWriter("day18\\src\\res\\BufferedWriter.txt")
        );
        //endregion

        //region 字符串写出
        bufferedWriter.write("buffereWriter");
        bufferedWriter.newLine();//换行
        bufferedWriter.write("this is newline");
        bufferedWriter.flush();
        bufferedWriter.close();//此处只需调用一次close方法，filewriter也将会被关闭
        //endregion
    }
}
```



### BufferedReader

```java
package note;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class BufferedReaderNote {//缓冲字符输入流
    public static void main(String[] args) throws IOException {
        //region 构造 要以字符输入流为参数构造
        BufferedReader bufferedReader = new BufferedReader(
                new FileReader("day18\\src\\res\\BufferedWriter.txt")
        );
        //endregion

        //region 以行读入字符串
        String line;
        while ((line = bufferedReader.readLine()) != null) {
            System.out.println(line);
        }
        /*
        readLine方法返回读取的行字符串，读取后指针指向下一行，当没有字符串的时候将会返回nul
         */
        //endregion

    }
}
```



### ObjectOutputStream

```java
package note;

import jdk.net.SocketFlow;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Iterator;

public class ObjectOutputStreamNote {//对象输出流(序列化流：对象转换为流)
    public static void main(String[] args) throws Exception {
        //region 构造
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(
                new FileOutputStream("day18\\src\\res\\ObjectOutputStream.txt")
        );
        //endregion

        //region writeObject
        HashSet<Person> people = new HashSet<>();
        people.add(new Person("noby",22));
        people.add(new Person("kace",21));
        people.add(new Person("july",19));
        people.add(new Person("tom",19));
        objectOutputStream.writeObject(people);
        //endregion
    }

}

class Person implements Serializable {//实现序列化接口的类才可以序列化和反序列化
    /*
    序列化版本id，表示类的id
    如果反序列化和序列化时的id不同，反序列化将失败 InvalidClassException
    代码被修改后，该类不再是以前的类，而以前序列化生成的文件存入的是以前的类的对象
    而以前的类的对象并不属于现在的类，所以在代码修改后应该重新序列化，更新文件存入的对象
     */
    private static final long serialVersionUID = 1L;//在修改代码后，应该同时修改id
    private String name;
    private int age;
    /*
    加上transient关键字的属性将不会被序列化
     */
    transient int weight;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

### ObjectInputStream

```java
package note;

import java.io.*;
import java.util.HashSet;
import java.util.Iterator;

public class ObjectInputStreamNote {//对象输入流(反序列化流：流转换为对象)
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        //region 构造
        ObjectInputStream objectInputStream = new ObjectInputStream(
                new FileInputStream("day18\\src\\res\\ObjectOutputStream.txt")
        );
        //endregion

        //region readObject
        HashSet<Person> person= (HashSet<Person>)objectInputStream.readObject();
        Iterator<Person> iterator = person.iterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
        //endregion

    }
}
```

### 序列化版本ID

serialVersionUID的主要用于保证序列化与反序列化时的版本一致，如果在反序列化时的版本与序列化的版本不一致，则会导致反序列化失败。其主要目的是为了保证反序列化安全。

序列化时

```java
class Student implements Serializable {    private static final long serialVersionUID = 1L;    String name;    transient int age;}
```

反序列化时

```java
class Student implements Serializable {    private static final long serialVersionUID = 2L;    String name;    transient int age;}
```

运行程序会报以下错误

```java
Exception in thread "main" java.io.InvalidClassException: com.woniuxy.Student; local class incompatible: stream classdesc serialVersionUID = 1, local class serialVersionUID = 2
```

表示序列化与反序列化时的id不同。

### transient

如果在序列化时不想让默认属性被序列化，那么就可以在该属性前加上transient关键字

```java
class Student implements Serializable {    private static final long serialVersionUID = 1L;    String name;    transient int age;}
```
