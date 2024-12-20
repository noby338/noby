---
title: day01 计算机及java基础知识、java环境变量的配置、命名规范、注释
icon: write
category:
    - JavaSE
tags:
    - JavaSE
sticky: false
star: false
article: true
timeline: true
---

## 计算机及 java 知识

### 计算机基础

- dos 和 cmd 的区别：windows 里面运行 CMD 出来的 DOS 不是真正的 DOS，那是微软在 windows 里虚拟的 DOS 环境，用来运行一些高级命令的，真正的 DOS 是脱离系统的。因为他本身就是一种操作系统。
- cmd（命令提示符）中给出路径和程序名即可运行该程序（可省略。exe）
- win10 环境变量作用：给出某一第三方程序的路径，使之运行该程序时可省略路径的输入
  用户变量：在该用户生效 系统变量：全局生效
- 环境变量中的%SystemRoot% 等价于系统安装盘:\windows
- 两种创建环境变量方法
    - 直接在系统变量的 path 中输入路径
    - 先在系统变量中创建 JAVA_HOME 路径 D:\Java\jdk-9.0.4，再在 path 中嵌套%JAVA_HOME%/bin

### JDK 版本分类

- JAVASE(Java Standard Edition)：java 标准版
- JAVAEE(Java Enterprise Edition)：应用于桌面环境、企业版 J2EE，是网站开发方向的。
- JAVAME(Java Micro Edition)：应用于移动、无线及有限资源的环境

### JVM、JRE、JDK

- JDK (Java Development Kit) 是太阳微系统针对 Java 开发人员发布的免费软件开发工具包（SDK，Software development kit）。自从 Java 推出以来，JDK 已经成为使用最广泛的 Java SDK。(JDK=JVM+Java 核心类库 +Java 编译器等其他开发工具)
- JRE (Java Runtime Environment) ，java 运行环境，普通用户并不需要安装 JDK 来运行 Java 程序，而只需要安装 JRE。而程序开发者必须安装 JDK 来编译、调试程序。(JRE=JVM+Java 核心类库)
- JVM (Java virtual machine) 意为 Java 虚拟机，主要负责运行由 Java 编译器 Javac 编译后的 class 文件，在运行过程中 JVM 将字节码文件解释为机器码。不管什么操作系统，只要安装了 Java 虚拟机就可以运行 Java 程序，这也就是为什么 Java 跨平台的原因。

### 程序的运行过程

1. JDK 中的 java 编译器编译生成字节码文件
2. 不同平台的 JVM 解释字节码文件生成机器码
3. 运行机器码

### java 语言的版本

- java8(主流)：JDK8 或者 JDK1.8 是由于自从 JDK1.5/JDK5 命名方式改变后遗留的新旧命令方式问题。所以 JJava8、JDK8、JDK1.8 都是同一个东西。
- java17(最新)
- 从 JDK 5.0 开始 J2EE 改名为 java EE，J2SE 改名为 java SE
- 从 JDK1.2 开始改名为 java2(J2)
  ![20200407153336875](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/20200407153336875.png)

## JDK 和 JRE 的安装

### 前置准备

1. 在 D 盘下创建文件夹，取名为 java，并在 java 文件夹下创建两个文件夹，分别取名为 jdk 和 jre
2. 下载 windows 对应的 java8 开发工具安装包 [java 官网](https://www.oracle.com/java/technologies/downloads/archive/)

### JDK 的安装

1. 点击 java 开发工具安装包
2. 点击 " 下一步 "
3. 点击 " 更改 "，修改安装到 D:\java\jdk 文件夹

![image-20221220182725069](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182725069.png)

1. 点击 " 下一步 "

![image-20221220182740205](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182740205.png)

1. 等待安装完成

### JRE 的安装

1. 点击 " 更改 "，将 JRE 安装的到 D:\java\jre

![image-20221220182807748](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182807748.png)

![image-20221220182825725](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182825725.png)

1. 点击 " 关闭 " 安装完成

![image-20221220182839060](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182839060.png)

### JDK 环境配置

1. 在计算机/电脑图标上右键 ->属性，打开计算机属性
2. 选择 " 高级系统设置 "

![image-20221220182905793](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182905793.png)

1. 选择 " 环境变量 "

![image-20221220182919601](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182919601.png)

1. 选择系统环境变量下的 " 新建 "

![image-20221220182930798](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182930798.png)

1. 指定变量名为：JAVA_HOME 变量值为 jdk 的安装目录，然后点击确定

![image-20221220183001457](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220183001457.png)

1. 再新建一个环境变量，变量名为：CLASSPATH 值为：.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar;**注意：最前面有个点**

![image-20221220183107808](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220183107808.png)

1. 点击确定保存
2. 在系统环境变量中找到 path，双击

![image-20221220183116294](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220183116294.png)

1. 点击 " 新建 "，增加以下两个值
      1. `%JAVA_HOME%\jre\bin`
      2. `%JAVA_HOME%\bin`

![image-20221220183129618](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220183129618.png)

**注：如果是 win7 操作系统，在原变量值的最后面加上 ;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin 然后一路确定，配置完毕**

1. 打开 DOS 窗口输入 java -version 指令，看到以下内容表示 JDK 完全安装成功

![image-20221220183257185](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220183257185.png)

## dos 命令运行 java 程序

1. 编译：
      - javac Hello.java(生成 Hello.class 字节码文件)
2. 运行：
      - java Hello (运行 Hello.class 字节码文件)

## 变量

- 定义

```java
 int num = 1;//基本数据类型
 String str = new String();//引用数据类型
 //相比较声明，定义会建立储存空间
```

- 声明

```java
  String str;//声明的特点是该变量str并没有引用，系统会给他一个默认的引用：null
  //相比较定义，声明不会建立储存空间
```

- 引用

```java
  String str = new String();//对象中“=”的过程就是引用
```

- 创建

```java
  new String();//new的动作即为创建
```

- 赋值

```java
  num = 20;//基本数据类型中“=”的过程就是赋值
```

- 初始化

```java
  int num = 1；//第一次赋值或者第一次引用即为初始化
  String str = "str";
```

- 变量的分类：
    - 依据数据类型
        - ![image-20220119105644986](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220119105644986.png)
    - 依据声明的位置
        - ![image-20220119105433881](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220119105433881.png)

## 标识符

- 定义：标识符是用来唯一标识包、类、方法、对象、变量、文件名的字符串；
- 标识符命名规则：
    - 标识符可以包含数字、字母、$、\_，但是不能以数字开头；
    - 关键字和保留字不能用作标识符；
    - 标识符是大小写敏感的；
- 命名规范
    - 大驼峰命名法：多单词组成的标识符，所有单词的首字母大写
        - 例如：MyName
        - 常用于类名
    - 小驼峰命名法：多单词组成的标识符，首单词的首字母小写，其他单词首字母大写
        - 例如：myNamue
        - 常用于变量名，方法名。
    - 下划线命名法：多单词组成的标识符，所有单词之间用下划线分割
        - 例如：my_name

## 基本数据类型

- 四类八种

![image-20220210101701647](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220210101701647.png)

注意：long 数据类型后跟 l，float 数据类型后跟字母 f(可大写和小写)

## 引用数据类型

- 类 class
- 接口 interface
- 数组 array

## java 关键字（keyword）

- 关键字定义：Java 的关键字对 java 的编译器有特殊的意义，他们用来表示一种数据类型，或者表示程序的结构等。
- 保留字（reserved word）：保留字是为 java 预留的关键字，他们虽然现在没有作为关键字，但在以后的升级版本中有可能作为关键字。

|            |          |            |          |              |            |           |        |
| :--------- | :------- | ---------- | -------- | ------------ | ---------- | --------- | ------ |
| 访问控制       | private  | protected  | public   |              |            |           |        |
| 类，方法和变量修饰符 | abstract | class      | extends  | final        | implements | interface | native |
|            | new      | static     | strictfp | synchronized | transient  | volatile  |        |
| 程序控制       | break    | continue   | return   | do           | while      | if        | else   |
|            | for      | instanceof | switch   | case         | default    |           |        |
| 错误处理       | try      | catch      | throw    | throws       | finally    |           |        |
| 包相关        | import   | package    |          |              |            |           |        |
| 基本类型       | boolean  | byte       | char     | double       | float      | int       | long   |
|            | short    | null       | true     | false        |            |           |        |
| 变量引用       | super    | this       | void     |              |            |           |        |
| 保留字        | goto     | const      |          |              |            |           |        |
