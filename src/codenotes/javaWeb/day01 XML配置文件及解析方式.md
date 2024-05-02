---
title: day01 XML配置文件及解析方式
icon: write
category:
    - JavaWeb
tag:
    - JavaWeb
sticky: false
star: false
article: true
timeline: true
---

## xml 配置文件

- 可扩展标记语言 (xml)：是一种用于标记电子文件使其具有结构性的标记语言
    - 可扩展标记语言是一种很像超文本标记语言的标记语言。
    - 它的设计宗旨是传输数据，而不是显示数据。
    - 它的标签没有被预定义。您需要自行定义标签。
    - 它被设计为具有自我描述性。
    - 它是 W3C 的推荐标准。
    - 是各种应用程序之间进行数据传输的最常用的工具之一
- xml 和 html 的差异
    - 它不是超文本标记语言的替代。
    - 它是对超文本标记语言的补充。
    - 它和超文本标记语言为不同的目的而设计：
    - 它被设计用来传输和存储数据，其焦点是数据的内容。
    - 超文本标记语言被设计用来显示数据，其焦点是数据的外观。
    - 超文本标记语言旨在显示信息；而 XML 旨在传输信息，它是独立于软件和硬件的信息传输工具。
- 常见的解析方式
    - DOM 解析 (Document Object Model)
        - DOM 是用与平台和语言无关的方式表示 XML 文档的官方 W3C 标准。DOM 是以层次结构组织的节点或信息片断的集合。这个层次结构允许开发人员在树中寻找特定信息。分析该结构通常需要加载整个文档和构造层次结构，然后才能做任何工作。由于它是基于信息层次的，因而 DOM 被认为是基于树或基于对象的。
    - SAX 解析 (Simple API for XML)
        - SAX 处理的优点非常类似于流媒体的优点。分析能够立即开始，而不是等待所有的数据被处理。而且，由于应用程序只是在读取数据时检查数据，因此不需要将数据存储在内存中。这对于大型文档来说是个巨大的优点。事实上，应用程序甚至不必解析整个文档；它可以在某个条件得到满足时停止解析。一般来说，SAX 还比它的替代者 DOM 快许多。
    - JDOM 解析 (Java-based Document Object Model)
        - JDOM 的目的是成为 Java 特定文档模型，它简化与 XML 的交互并且比使用 DOM 实现更快。由于是第一个 Java 特定模型，JDOM 一直得到大力推广和促进。正在考虑通过 "Java 规范请求 JSR-102" 将它最终用作 "Java 标准扩展 "。从 2000 年初就已经开始了 JDOM 开发。
    - DOM4J 解析 (Document Object Model for Java)
        - DOM4J 是一个非常非常优秀的 Java XML API，具有性能优异、功能强大和极端易用使用的特点，同时它也是一个开放源代码的软件。如今你可以看到越来越多的 Java 软件都在使用 DOM4J 来读写 XML，特别值得一提的是连 Sun 的 JAXM 也在用 DOM4J.
        - 需要的 jar 包
            - dom4j-1.1.jar
    - xdm 中的#和 $的区别： \* $ 相当于字符串拼接，#相当于转义字符

```sql
#    PreparedStatment
insert into student values(null,#{name},#{age},#{score})
```

    ![image-20220424142329325](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/20220424142329.png)

```sql
$    Statment
insert into student values(null,'${name}',${age},${score})
```

![image-20220424142511698](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/20220424142511.png)

```java
package note;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import java.io.File;
import java.net.MalformedURLException;
import java.util.Iterator;
/**
 * @Description 解析xml文件
 * 需要导入dom4j-1.1.jar
 * @Author Noby
 * @Date 2023/3/21 12:03
 */public class XmlNote {
    public static void main(String[] args) throws MalformedURLException, DocumentException {
        //1.获取文件字节码路径
        String path = XmlNote.class.getClassLoader().getResource("xmlText.xml").getPath();
//        InputStream inputStream = XmlNote.class.getClassLoader().getResourceAsStream("xmlText.xml");//该方法可直接获得输入流
        System.out.println(path);

        //2.创建文件解析器
        SAXReader saxReader = new SAXReader();

        //3.获得文档对象
        Document document = saxReader.read(new File(path));

        //4.获得根标签
        Element rootElement = document.getRootElement();
        System.out.println("rootElement.asXML() : \n" + rootElement.asXML());
        System.out.println();

        //5.通过迭代器遍历根标签里的所有子标签
        Iterator<?> iterator = rootElement.elementIterator();
        while (iterator.hasNext()) {
            Element next = (Element) iterator.next();
            Attribute name = next.attribute("name");//获取标签的属性
            Attribute id = next.attribute("id");
            System.out.println("id,name = " + id.getValue() + "," + name.getValue());//获取属性值
            System.out.println("next.getText() = " + next.getText());//获取标签的内容
        }
    }
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?><!--文档类型说明-->
<dataSource>
    <driver name="nameValue" id="idValue">com.mysql.jdbc.Driver</driver>
    <url name="nameValue" id="idValue">jdbc:mysql://localhost:3306/stage1</url>
    <user name="nameValue" id="idValue">root</user>
    <password name="nameValue" id="idValue">123</password>
</dataSource>
```
