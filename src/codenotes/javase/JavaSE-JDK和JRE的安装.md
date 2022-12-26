---
# 当前页面内容标题
title: JDK和JRE的安装
# 当前页面图标
icon: write
# 分类
category:
  - 代码笔记
  - JavaSE
# 标签
tag:
  - 代码笔记
  - JavaSE
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---


## JDK，JRE和JVM
* 定义
    * JDK (Java Development Kit) 是太阳微系统针对Java开发人员发布的免费软件开发工具包（SDK，Software development kit）。自从Java推出以来，JDK已经成为使用最广泛的Java SDK。(JDK=JVM+运行所需核心类库+调试所需各种工具)
    * JRE (Java Runtime Environment) ，java运行环境，普通用户并不需要安装JDK来运行Java程序，而只需要安装JRE。而程序开发者必须安装JDK来编译、调试程序。(JRE=JVM+运行所需核心类库)
    * JVM (Java virtual machine) 意为Java虚拟机，主要负责运行Java程序，不管什么操作系统，只要安装了Java虚拟机就可以运行Java程序，这也就是为什么Java跨平台的原因。

::: tip 为什么需要他们？
任何的Java集成开发环境（IDE）（写Java程序用的软件），如Idea、Eclipse，都是基于本地已安装的JDK和JRE。JRE的作用是提供本系统运行Java程序运行所需的环境，而JDK是提供编写Java程序所需的各种开发工具，而JVM是各种系统上运行的虚拟机。
类似我们Android手机无法运行FC游戏一样，需要一个模拟器（小鸡模拟器），来在Android上模拟出“小霸王游戏机”的硬件，运行各种FC游戏，同样，因为Java为一门跨平台语言，它的运行需要硬件的支持，如果只为没有JVM的存在则无法在windows运行Java程序，同样，
要在MacOS中运行Java程序则需要在MacOS中安装其平台对应的JVM。如此，同样的Java代码经过不同平台的JVM“翻译”即可在他们的不同系统中运行。Java源代码的运行需要两步。第一步，将编写好的.java文件（源代码）通过javac.exe编译为.class文件（字节码）。第二步，通过java.exe程序运行
class文件。
:::

## JDK 和 JRE 的安装

### 前置准备

1. 在D盘下创建文件夹，取名为java，并在java文件夹下创建两个文件夹，分别取名为jdk和jre
2. 下载windows对应的java8开发工具安装包 [java官网](https://www.oracle.com/java/technologies/downloads/archive/)

### JDK的安装

1. 点击java开发工具安装包
2. 点击“下一步”

![image-20221220182659243](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182659243.png)

3. 点击“更改”，修改安装到D:\java\jdk文件夹

![image-20221220182725069](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182725069.png)

4. 点击“下一步”

![image-20221220182740205](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182740205.png)

5. 等待安装完成

### JRE的安装

1. 点击“更改”，将JRE安装的到D:\java\jre

![image-20221220182807748](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182807748.png)

![image-20221220182825725](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182825725.png)

2. 点击“关闭”安装完成

![image-20221220182839060](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182839060.png)

### JDK环境变量配置

::: tip 什么是环境变量？已经安装了JDK和JRE为什么还需要配置他们的环境变量？
前面我们安装了JDK和JRE，意味着我们可以使用他们的.exe应用程序来运行和编译Java程序，虽然目前我们安装了JDK和JRE，但仍然不可以直接使用，比如：打开cmd
在其中输入notepad.exe，是不是windows直接打开了记事本（notepad.exe就是记事本的应用程序），但直接输入java，会提示“'java' 不是内部或外部命令，也不是可运行的程序或批处理文件。”说明不能直接运行java.exe程序。因为notepad.exe为windows系统自带的应用，系统为其设置了环境变量，可以直接打开。而java.exe
不是系统应用，如果要运行，需要告诉windows java.exe 存放的位置。输入完整路径即可执行除系统外的三方应用，如: D:\Develop\Java\jdk1.8\bin\java.exe 。（注意自己的java.exe的存放路径）。环境变量的意义就是告诉系统某个.exe存在在系统的哪一个路径下，以方便系统可以省略路径而直接运行
![image-20221220190409483](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220190409483.png)
:::

1. 在计算机/电脑图标上右键->属性，打开计算机属性
2. 选择“高级系统设置”

![image-20221220182905793](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182905793.png)

3. 选择“环境变量”

![image-20221220182919601](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182919601.png)

4. 选择系统环境变量下的 “新建”

![image-20221220182930798](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220182930798.png)

5. 指定变量名为：JAVA_HOME 变量值为jdk的安装目录，然后点击确定

![image-20221220183001457](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220183001457.png)

6. 再新建一个环境变量，变量名为：CLASSPATH 值为：.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar;

::: warning
.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar; 最前面有个点
:::

![image-20221220183107808](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220183107808.png)

7. 点击确定保存
8. 在系统环境变量中找到path，双击

![image-20221220183116294](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220183116294.png)

9. 点击“新建”，增加以下两个值
   1. `%JAVA_HOME%\jre\bin`
   2. `%JAVA_HOME%\bin`

![image-20221220183129618](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220183129618.png)

::: warning
如果是win7操作系统，在原变量值的最后面加上 ;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin然后一路确定，配置完毕
:::

10. 打开cmd窗口输入java -version指令，看到以下内容表示JDK完全安装成功

![image-20221220183257185](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221220183257185.png)

## java程序的执行流程

1. 利用记事本新建Hello.txt文件，并在其中填入以下代码
```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello!");
    }
} 
```
2. 保存退出后，把该文件的.txt后缀改为.java
3. 打开cmd输入以下命令，执行编译(生成 Hello.class 字节码文件)：
   * `javac Hello.java`
3. cmd输入以下命令，运行字节码文件：
   * `java Hello`
4. 控制台输出 Hello! ，运行成功。