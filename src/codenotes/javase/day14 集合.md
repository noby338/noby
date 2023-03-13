---
title: day14 集合
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

## 集合

### 集合和数组区别

1. 长度：集合可变，数组不可变
2. 数据类型：集合只能是引用类型，数组可以是引用类型和基本数据类型
3. 数据一致性：同一集合可以是不同的引用数据类型，同一数组只能是同一类型

### 各种集合的区别

- List：值可重复
  - ArrayList、Vector：基于数组实现
  - LinkedList：基于双向链表实现
- Set：值不重复
  - HashSet：基于 HashMap 实现
  - TreeSet：(存入后按照字典顺序排序，而不是存入顺序)基于 TreeMap 实现
- Map：key 不可重复
  - HashMap：无序、key 不重复，基于数组+单链表+红黑树实现的
  - LinkedHashMap：有序(存入顺序)、key 不重复，基于数组+单链表+红黑树+双向链表实现的
  - TreeMap：有序(存入后字典排序)、key 不重复，基于红黑树实现

### 单列集合

#### Collection 接口

![image-20220215093134818](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220215093134818.png)

```java
package note;

import java.util.ArrayList;
import java.util.Collections;

public class CollectionsNote {//collection工具类
    public static void main(String[] args) {
        //region addAll shuffle sort
        ArrayList<String> lis = new ArrayList<>();
        Collections.addAll(lis,"b","a","c","d","e");//添加多个元素
        System.out.println(lis);//[b, a, c]
        Collections.shuffle(lis);//随机打乱
        System.out.println(lis);//[b, c, a]
        Collections.sort(lis);//按照规则排序
        System.out.println(lis);//[a, b, c]
        //endregion
    }
}

```

##### list 接口

1. 元素有序
2. 元素可重复
3. 有索引
4. 两个接口的区别：
   - ArrayList 基于数组实现，ArrayList 遍历快（数组空间连续的），ArrayList 增删慢（需要移动数据）
   - LinkedList 基于双向链表实现，LinkedList 遍历慢（数据分散在内存各个地方），LinkedList 增删快（只需要改变指向）

###### ArrrayList 实现类

- 增删慢，查询快

```java
package note;

import java.util.*;
import java.util.function.Predicate;

public class ArrayListNote {
    public static void main(String[] args) {
        //region 创建
        ArrayList<String> strings = new ArrayList<>();
        ArrayList<String> strings1 = new ArrayList<>();
        //endregion

        //region 成员方法
        strings.add("str1");//添加
        strings.add("str2");
        strings.add("str3");
        strings.add("str4");
        strings.addAll(strings1);//将其他集合的全部元素加入到该集合
        Collections.addAll(strings, "java", "hello", "learn");//通过Collections集合工具类添加所有元素

        String s = strings.get(1);//获取元素

        int size = strings.size();//获取长度

        strings.remove(1);//删除指定索引的元素(仅当该集合有索引值时可用)
        strings.remove(new Integer(1));//表示删除内容为1的元素
        strings.remove("str1");//删除指定内容
        strings.removeAll(strings1);//将该集合其他集合的全部元素删除
        strings.removeIf(new Predicate<String>() {//遍历删除内容,底层调用的迭代器
            @Override
            public boolean test(String s) {
                return s.contains("str");
            }
        });

        strings.clear();//清空集合
        strings.isEmpty();//是否为空

        System.out.println(strings);//直接查看元素内容
        //endregion

        //region 遍历集合
        //region Iterator迭代器 遍历集合
        Iterator<String> iterator = strings.iterator();
        while (iterator.hasNext()) {
            String next = iterator.next();//获取当前元素后，将指针指向下一个元素
            if (next.equals("something")) {
                iterator.remove();//通过迭代器删除元素
            }
        }
        //endregion

        //region 增强for循环
        for (String string : strings) {
            System.out.println(string);
        }
        //endregion

        //region 通过转换为数组遍历
        Object[] objects = strings.toArray();
        for (Object object : objects) {
            System.out.println(object);
        }
        //endregion
        //endregion

        //region sort ArrayLi的排序
        strings.sort(new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                return o1.compareTo(o2);
            }
        });
        //endregion
    }
}

```

###### LinkedList 实现类

```java
package note;

import java.util.LinkedList;

public class LinkedListNote {
    public static void main(String[] args) {
        //region 创建
        LinkedList<Integer> integers = new LinkedList<>();
        integers.add(1);
        integers.add(2);
        integers.add(3);
        integers.add(4);
        integers.add(5);
        System.out.println(integers);
        //endregion

        //region remove
        integers.removeFirst();//删除第一个元素
        integers.removeLast();//删除最后一个元素

        integers.remove(2);//删除第二个元素(list集合都带有索引)
        integers.remove(new Integer(2));//删除内容为2的元素
        //endregion

        integers.clear();
        integers.add(0);
        integers.add(0);
        integers.add(0);
        integers.add(0);

        //region addfirst()
        integers.addFirst(1);//添加到第一个元素
        integers.addLast(2);//添加到最后一个元素

        System.out.println(integers);
        //endregion
    }
}
```

###### Vector 实现类

- 过期，底层数据结构同 ArrayList 为数组

```java
package note;

import java.util.Collections;
import java.util.Enumeration;
import java.util.Vector;

public class VectorNote {//向量
    public static void main(String[] args) {
        Vector<Integer> integers = new Vector<>();
        Collections.addAll(integers,1,2,3,4,5);

        //region Vector通过枚举器遍历
        /*
        迭代器存在安全问题,不推荐
         */
        /*
         * 快速失败：就是在原有的数据结构上进行遍历,当某个程序修改了原有的数据结构，如果当前程序继续遍历结构会快速失败（不允许继续遍历）
         *     迭代器：快速失败
         *
         * 安全失败：在副本（克隆、备份）上进行遍历,即使另一个程序修改原有的数据结构也会不影响到当前程序的遍历
         *     枚举器：安全失败
         *
         * ArrayList：无参构造得到的数据长度为0，第一次放数据时才会创建长度为10的数组
         *           ArrayList默认扩容为原来的1.5倍
         * Vector：默认长度就是10
         *           Vector默认扩容为原来的2倍
         */

        Enumeration<Integer> elements = integers.elements();
        while (elements.hasMoreElements()) {
            System.out.println(elements.nextElement());
        }
        //endregion
    }
}
```

##### set 接口

- 无序的(存入和取出的顺序不一致)
- 元素唯一的
- 无索引

###### HashSet 实现类

```java
package note;

import java.util.Collections;
import java.util.HashSet;

public class HashSetNote {
    public static void main(String[] args) {
        /*
        底层通过HashMap实现
         */
        //region 创建
        HashSet<String> strings = new HashSet<>();
        //endregion

        //region 相对于list集合有区别的成员方法
        Collections.addAll(strings,"张三","李四","王五","赵六");
        System.out.println(strings.add("张三"));//添加失败，set集合不能存储相同的元素
        System.out.println(strings);//打印出的元素是无序的
        //endregion
    }
}
```

###### TreeSet 实现类

- 相对于 HashSet 可排序(根据字符串字典顺序)(自然顺序排序)

  ```java
  package note;

  import java.util.Collections;
  import java.util.TreeSet;

  public class TreeSetNote {
      public static void main(String[] args) {
          /*
           * TreeSet基于红黑树实现的 TreeMap（平衡二叉树-排序二叉树-红黑树）
           * TreeSet里面的数据是有序的
           */
          //region 构造
          TreeSet<String> strings = new TreeSet<>();
          //endregion

          //region 相对于HashSet的不同
          Collections.addAll(strings,"java","hello","world");
          System.out.println("strings = " + strings);//相对于HashSet，该集合有序(按照字典排序，而非存入顺序)
          //endregion

      }
  }
  ```

###### LinkedHashSet 实现类

- 相对于 HashSet 可排序(存入顺序)

  ```java
  package note;

  import java.util.LinkedHashSet;

  public class LinkedHashSetNote {
      public static void main(String[] args) {
          LinkedHashSet<String> strings = new LinkedHashSet<>();
          strings.add("aaa");
          strings.add("ccc");
          strings.add("ddd");
          strings.add("bbb");
          System.out.println("strings = " + strings);
          //strings = [aaa, ccc, ddd, bbb]
      }
  }
  ```

### 双列集合

#### Map 接口

<img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220215093145557.png" alt="image-20220215093145557"  />

##### HashMap 实现类

```java
package note;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class HashMapNote {
    public static void main(String[] args) {
        /*
         * HashMap：哈希映射，里面一个数据包个两个非常数据 ： key（键） value（值）
         * 因此称Map是由多个键值对构成的
         *
         * 特点：无序、key不重复
         *
         * 操作Map其实就是操作key
         */

        //region 构造方法
        HashMap<String, Object> noby = new HashMap<>();
        //endregion

        //region 成员方法
        noby.put("name","noby");//添加元素
        noby.put("age",20);//此处传入的是Integer而非int，20将会自动装箱为Integer
        noby.put("isMan",true);
        noby.put("hoby","learn java");

        noby.put("age",21);//当存在该键时，put方法为修改值

        System.out.println(noby.get("name"));//获取值

        System.out.println(noby.size());//获取键值对长度

        noby.remove("hoby");//删除键值对

        System.out.println(noby.containsKey("hoby"));//是否包含该键

        //endregion

        //region 通过keySet集合遍历
        Set<String> keys = noby.keySet();
        Iterator<String> iterator = keys.iterator();
        while (iterator.hasNext()) {
            String next = iterator.next();
            System.out.println(next + " = " + noby.get(next));
        }
        //endregion

        //region 通过entrySet集合遍历
        Set<Map.Entry<String, Object>> entries = noby.entrySet();
        Iterator<Map.Entry<String, Object>> iterator1 = entries.iterator();
        while (iterator1.hasNext()) {
            Map.Entry<String, Object> next = iterator1.next();
            System.out.println(next.getKey() + "-" + next.getValue());
        }
        //endregion
        /*
         * HashMap数组默认长度是16，加载因子是0.75，数组长度*0.75 = 得到该数组中有几个位置可以用来存储数据
         *
         * 放数据的流程：
         *     在放数据时会计算key的hash值，用哈希值与 hashCode() ^ h >>> 16，得到一个数字“哈希值”，假设Map
         *  为空（table = null）会先创建一个数组，默认长度为16，然后将扩容触发条件设置为12（16*0.75），接下来
         *  用“哈希值”与15进行按位与得到一个下标，得到数据应该放在数组中的那个位置，如果该位置没有放任何数据，
         *  就创建Node节点直接将新的节点放在这个位置，否则就用当前新数据的“hash”值与该位置数据的“hash”值进行比较，并且
         *  比较当前新的key与该位置的key是否一样，如果一样则替换原来的数据，否则新数据放在原数据的下边形成链表
         *
         *  当链表的长度达到8的时候，就需要将链表转换成红黑树了（提升查询效率）
         *  当红黑树中的节点小于等于6时需要将红黑树转换链表（降低维护的成本）
         *  什么时候需要将链表转换成红黑树：容量必须大于等于64、并且链表的长度大于等于8
         *
         *  扩容时机：当HashMap中的数据个数大于12个时就需要进行扩容了，扩容原来的2倍，触发时机也会变为原来的2倍，
         *  意思就说下一次扩容会在元素个数超过12*2时。
         *  总结：当HashMap中的数据个数达到数组长度*0.75时进行扩容，扩容为原来的两倍
         *  扩容之后：会将之前的数据重新定位放到新数组的各个地方（拆分链表）
         *
         */

    }
}
```

##### treeMap 实现类

```java
package note;

import java.util.HashMap;
import java.util.TreeMap;

public class TreeMapNote {
    public static void main(String[] args) {
        //region 构造
        TreeMap<String, Object> kace = new TreeMap<>();
        //endregion

        //region 成员方法
        kace.put("ccc",22);
        kace.put("aaa","kace");
        kace.put("bbb","man");

        /*
        TreeMap集合有序:并不是对存入的顺序进行排序，而是通过一定的规则排序
        LInkedHashMap集合有序：对存入的顺序进行排序
         */
        //endregion

        System.out.println(kace);//{aaa=kace, bbb=man, ccc=22}
    }
}
```

##### LinkedHashMap 实现类

```java
package note;

import java.util.LinkedHashMap;

public class LinkedHashMapNote {
    public static void main(String[] args) {
        LinkedHashMap<String, Object> noby = new LinkedHashMap<>();
        noby.put("name","noby");
        noby.put("age",21);
        noby.put("gender","man");

        System.out.println(noby);//{name=noby, age=21, gender=man}
        /*
        LinkedHashMap对存入的顺序进行排序
         */
    }
}
```

###### Properties 实现类

```java
package Demo;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Properties;
import java.util.Set;

public class PropertiesDemo {
    public static void main(String[] args) throws Exception{
        //配置文件以.properties为后缀
        Properties properties = new Properties();//属于Map集合

        //region properties集合的特有方法
        properties.setProperty("one","hello");//若用setProperty()方法，键和值都只能存储字符串。Map中的put()方法键和值可以为任意类型
        properties.setProperty("two","world");
        properties.setProperty("three","java");

        System.out.println(properties.getProperty("one"));//相当于Map()中的get()方法

        Set<String> strings = properties.stringPropertyNames();//相当于Map中的keySet()方法
        System.out.println(strings);
        //endregion

        //region 将properties存储到配置文件
        FileOutputStream fos = new FileOutputStream("D:\\IdeaProjects\\JavaPra\\day23\\src\\Demo\\str\\SropertiesStore.properties");
        properties.store(fos,"这是一行注释");
        //endregion

        //region 将配置文件读取到properties集合中 利用配置文件的优点在于在不修改代码(通过配置文件)的前提下更改程序
        loadProperties();
        //endregion
    }

    private static void loadProperties() throws Exception{
        FileInputStream fis = new FileInputStream("D:\\IdeaProjects\\JavaPra\\day23\\src\\Demo\\str\\Propertiesload.properties");
        Properties properties1 = new Properties();
        properties1.load(fis);
        Set<String> set = properties1.stringPropertyNames();
        System.out.println("以下遍历从配置文件读取到的键值对");
        for (String s : set) {
            System.out.println(s + "..." + properties1.getProperty(s));
        }
    }
}
```
