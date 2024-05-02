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

- List：元素有序、元素可重复、有索引
    - ArrayList：基于数组实现、遍历快（数组空间连续的）、增删慢（需要移动数据）
    - LinkedList：基于双向链表实现、增删块（只需要改变指向）、遍历慢（数据分散在内存各个地方）
    - Vuector：基于数组实现，过期
- Set：元素无序、元素不可重复、无索引
    - HashSet：基于 HashMap 实现
    - LinkedHashSet：有序 (存入顺序)
    - TreeSet：有序 (自然排序) 基于 TreeMap 实现
- Map：key 不可重复
    - HashMap：无序、key 不重复，基于数组 + 单链表 + 红黑树实现的
    - LinkedHashMap：有序 (存入顺序)、key 不重复，基于数组 + 单链表 + 红黑树 + 双向链表实现的
    - TreeMap：有序 (自然排序)、key 不重复，基于红黑树实现

### 单列集合

#### Collection 接口

![image.png](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/20230316174535.png)
![image-20220215093134818](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220215093134818.png)

```java
package note;

import java.util.ArrayList;
import java.util.Collections;
/**
 * @Description Collections工具类的使用
 * @Author Noby
 * @Date 2023/3/16 22:00
 */public class CollectionsNote {
    public static void main(String[] args) {
        //region addAll shuffle sort
        ArrayList<String> list = new ArrayList<>();
        Collections.addAll(list,"b","a","c","d","e");//添加多个元素
        System.out.println(list);//[b, a, c]
        Collections.shuffle(list);//随机打乱
        System.out.println(list);//[b, c, a]
        Collections.sort(list);//按照规则排序
        System.out.println(list);//[a, b, c]
        //endregion    }
}
```

##### list 接口

###### ArrrayList 实现类

```java
package note;

import java.util.*;
import java.util.function.Predicate;

/**
 * @Description ArrayList的基本用法
 * @Author Noby
 * @Date 2023/3/16 19:01
 */public class ArrayListNote {
    public static void main(String[] args) {
        //region 创建
        ArrayList<String> strings = new ArrayList<>();
        ArrayList<String> strings1 = new ArrayList<>();
        //endregion

        //region 成员方法
        System.out.println("strings.add(\"str1\") = " + strings.add("str1"));//strings.add("str1") = true
        System.out.println("strings.add(\"str2\") = " + strings.add("str2"));//strings.add("str2") = true
        System.out.println("strings.add(\"str3\") = " + strings.add("str3"));//strings.add("str3") = true
        System.out.println("strings.add(\"str5\") = " + strings.add("str5"));//strings.add("str5") = true
        strings.add(3,"str4");//没有返回值

        System.out.println("strings1.add(\"string1\") = " + strings1.add("string1"));//strings1.add("string1") = true
        System.out.println("strings1.add(\"string2\") = " + strings1.add("string2"));//strings1.add("string2") = true
        System.out.println("strings.addAll(strings1) = " + strings.addAll(strings1));//strings.addAll(strings1) = true
        System.out.println("Collections.addAll(strings, \"java\", \"hello\", \"learn\") = " + Collections.addAll(strings, "java", "hello", "learn"));//Collections.addAll(strings, "java", "hello", "learn") = true
        System.out.println("strings = " + strings);//strings = [str1, str2, str3, str4, string1, string2, java, hello, learn

        System.out.println("strings.get(1) = " + strings.get(1));//strings.get(1) = str2

        System.out.println("strings.size() = " + strings.size());//strings.size() = 9

        //ArrayList的remove方法可以删除指定内容的元素（传入Object），也可以删除指定索引的元素（传入0或正整数）
        System.out.println("strings.remove(1) = " + strings.remove(1));//strings.remove(1) = str2
        System.out.println("strings.remove(new Integer(1)) = " + strings.remove(new Integer(1)));//strings.remove(new Integer(1)) = false
        System.out.println("strings.remove(\"str1\") = " + strings.remove("str1"));//strings.remove("str1") = true
        System.out.println("strings.removeAll(strings1) = " + strings.removeAll(strings1));//strings.removeAll(strings1) = true
        System.out.println("strings = " + strings);
        //region 便利删除内容，底层调用迭代器
        strings.removeIf(new Predicate<String>() {
            @Override
            public boolean test(String s) {
                return s.contains("str");
            }
        });
        //endregion

        System.out.println("strings = " + strings);


        strings.clear();//清空集合，没有返回值
        System.out.println("strings.isEmpty() = " + strings.isEmpty());//是否为空
        System.out.println(strings);//直接查看元素内容
        //endregion

        //region 遍历集合的三种方法
        //region Iterator迭代器 遍历集合
        System.out.println("Collections.addAll(strings, \"str\",\"str2\",\"str3\",\"something\",\"something\",\"str4\") = " + Collections.addAll(strings, "str", "str2", "str3", "something","something", "str4"));
        System.out.println("strings = " + strings);
        Iterator<String> iterator = strings.iterator();
        while (iterator.hasNext()) {
            String next = iterator.next();//获取当前元素后，将指针指向下一个元素
            if (next.equals("something")) {
                iterator.remove();//通过迭代器删除元素
            }
        }
        System.out.println("strings = " + strings);
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
        //region sort ArrayList的排序
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

/**
 * @Description LinkedList的基本用法
 * @Author Noby
 * @Date 2023/3/16 19:02
 */public class LinkedListNote {
    public static void main(String[] args) {
        //region 创建
        LinkedList<Integer> integers = new LinkedList<>();
        System.out.println("integers.add(1) = " + integers.add(1));//integers.add(1) = true
        System.out.println("integers.add(2) = " + integers.add(2));//integers.add(2) = true
        System.out.println("integers.add(3) = " + integers.add(3));//integers.add(3) = true
        System.out.println("integers.add(4) = " + integers.add(4));//integers.add(4) = true
        System.out.println("integers.add(6) = " + integers.add(6));//integers.add(6) = true
        integers.add(4,5);//没有返回值

        System.out.println("integers = " + integers);//integers = [1, 2, 3, 4, 5, 6]
        //endregion
        //region remove        System.out.println("integers.removeFirst() = " + integers.removeFirst());//integers.removeFirst() = 1
        System.out.println("integers.removeLast() = " + integers.removeLast());//integers.removeLast() = 5

        System.out.println("integers.remove(2) = " + integers.remove(2));//integers.remove(2) = 4
        System.out.println("integers.remove(new Integer(2)) = " + integers.remove(new Integer(2)));//integers.remove(new Integer(2)) = true
        System.out.println("integers = " + integers);//integers = [3]
        //endregion
        integers.clear();
        System.out.println("integers.add(0) = " + integers.add(0));//integers.add(0) = true
        System.out.println("integers.add(0) = " + integers.add(0));//integers.add(0) = true

        //region add        integers.addFirst(1);//添加到第一个元素，没有返回值
        integers.addLast(2);//添加到最后一个元素，没有返回值

        System.out.println("integers = " + integers);//integers = [1, 0, 0, 2]
        //endregion    }
}
```

```java
package note;

import java.util.LinkedList;
/**
 * @Description 实现队列和栈的数据结构
 * @Author Noby
 * @Date 2023/3/16 19:38
 */public class LinkedListNote2 {
    public static void main(String[] args) {
        LinkedList<String> strings = new LinkedList<>();
        //region 栈：先进后出。push()(添加到第一个，没有返回值)和pop()(删除第一个，返回被删除的值)方法继承自Deque(双端队列)
        strings.push("one");
        strings.push("two");
        strings.push("three");
        System.out.println("strings = " + strings);//strings = [three, two, one]
        System.out.println("strings.pop() = " + strings.pop());//strings.pop() = three

        System.out.println("strings = " + strings);//strings = [two, one]
        //endregion
        strings.clear();

        //region 队列：先进先出。offer()(添加到最后一个，返回boolean)，poll()(删除第一个，返回删除对象)，方法继承自Queue(队列)的方法，Queue实现了Deque
        System.out.println("strings.offer(\"one\") = " + strings.offer("one"));//strings.offer("one") = true
        System.out.println("strings.offer(\"two\") = " + strings.offer("two"));//strings.offer("two") = true
        System.out.println("strings.offer(\"three\") = " + strings.offer("three"));//strings.offer("three") = true
        System.out.println("strings = " + strings);//strings = [one, two, three]
        System.out.println("strings.poll() = " + strings.poll());//strings.poll() = one

        System.out.println("strings = " + strings);//strings = [two, three]
        //endregion    }
}
```

```java
package note;

/**
 * @Description 自定义实现LinkedList集合（双向链表集合）
 * @Author Noby
 * @Date 2023/3/16 22:01
 */public class LinkedListNote3 {

    public static void main(String[] args) {
        CustomLinkedList list = new CustomLinkedList();
        list.add(5);
        list.add(2);
        list.add(3);
        list.add(4);
        System.out.println(list);
        System.out.println("list.getSize() = " + list.getSize());
        System.out.println("list.remove(2) = " + list.remove(2));
        System.out.println("list.getSize() = " + list.getSize());
        System.out.println(list);
        System.out.println("list.get(2) = " + list.get(2));

        CustomLinkedList customLinkedList = new CustomLinkedList();
        customLinkedList.add(0);
        System.out.println("customLinkedList = " + customLinkedList);
    }
}

class CustomLinkedList {
    int size;
    Node first;
    Node last;

    boolean add(int data) {
        Node newNode = new Node(last, null, data);
        if (size == 0) {
            first = newNode;
        } else {
            last.next = newNode;
        }
        last = newNode;
        size++;
        return true;    }

    /**
     * 根据索引删除
     *
     * @param index
     * @return
     */
    boolean remove(int index) {
        Node thisNode = first;
        if ((index < 0 || index >= size)) {
            throw new NullPointerException();
        } else if (index == 0) {

        } else {
            for (int i = 0; i < index; i++) {
                thisNode = thisNode.next;
            }
        }

        thisNode.prev.next = thisNode.next;
        thisNode.next.prev = thisNode.prev;
        size--;
        return true;    }

    @Override
    public String toString() {
        String str = "[";
        Node thisNode = first;
        do {
            str += thisNode.item + ",";
        } while ((thisNode = thisNode.next) != null);
        str = str.substring(0, str.length() - 1) + "]";
        return str;
    }

    static class Node {
        Node prev;
        Node next;
        int item;

        public Node(Node prev, Node next, int item) {
            this.prev = prev;
            this.next = next;
            this.item = item;
        }
    }

    int get(int index) {
        Node thisNode = first;
        if (index == 0) {
            return thisNode.item;
        } else if (index >= size || index < 0) {
            throw new NullPointerException();
        } else {
            for (int i = 0; i < index; i++) {
                thisNode = thisNode.next;
            }
            return thisNode.item;
        }
    }

    public int getSize() {
        return size;
    }
}
```

```java
package note;

/**
 * @Description 自定义实现单项链表集合
 * @Author Noby
 * @Date 2023/3/16 23:02
 */public class LinkedListNote4 {
    public static void main(String[] args) {
        SingleList singleList = new SingleList();
        System.out.println("singleList.add(1) = " + singleList.add(1));
        System.out.println("singleList.add(2) = " + singleList.add(2));
        System.out.println("singleList.add(3) = " + singleList.add(3));
        System.out.println("singleList.add(4) = " + singleList.add(4));
        System.out.println("singleList = " + singleList);
        System.out.println("singleList.delete(2) = " + singleList.delete(2));
        System.out.println("singleList = " + singleList);
        System.out.println("singleList.size() = " + singleList.size());
        singleList.reverse();
        System.out.println("singleList = " + singleList);

    }
}


class SingleList {
    private Node head = null; // 指向第一个节点
    private int size; // 元素个数

    // 添加数据（20分）
    public boolean add(int data) {
        boolean flag = false;
        Node newNode = new Node(data, null);
        if (size == 0) {
            head = newNode;
        } else {
            Node lastNode = head;
            for (int i = 0; i < size - 1; i++) {
                lastNode = lastNode.next;
            }
            lastNode.next = newNode;
        }
        size++;
        flag = true;
        return flag;
    }

    // 通过下标删除数据（20分）
    public Integer delete(int index) {
        Node lastNode2 = head;
        int data = 0;
        if (index < 0 || index >= size) {
            throw new NullPointerException();
        } else if (index == 0) {
            data = head.data;
            head = head.next;
        } else {
            for (int i = 0; i < index - 1; i++) {
                lastNode2 = lastNode2.next;
            }
            data = lastNode2.next.data;
            if (index == size - 1) {
                lastNode2.next = null;
            } else {
                lastNode2.next = lastNode2.next.next;
            }
        }

        size--;
        return data;
    }

    // 反转当前链表（20分）
    public void reverse() {
        Node thisNode = head;
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = thisNode.data;
            thisNode = thisNode.next;
        }

        thisNode = head;
        for (int i = 0; i < size; i++) {
            thisNode.data = arr[size - i - 1];
            thisNode = thisNode.next;
        }

    }

    // 合并两个有序的链表，生成的新链表也是有序的（30分）
    public SingleList merge(SingleList other) {
//        SingleList newList = new SingleList();
//        newList.head = this.head;
        SingleList newList = this;
        Node thisNode = other.head;
        do {
            newList.add(thisNode.data);
        } while ((thisNode = thisNode.next) != null);
        return newList;
    }


    public int size() {
        return this.size;
    }

    // toString方法完成单链表遍历输出（10分）
    @Override
    public String toString() {
        String str = "[";
        Node thisNode = head;
        do {
            str += thisNode.data + ",";
        } while ((thisNode = thisNode.next) != null);
        str = str.substring(0, str.length() - 1) + "]";
        return str;
    }

    // 节点内部类
    static class Node {
        public int data; // 数据
        public Node next; // 指向下一个节点

        public Node(int data, Node next) {
            this.data = data;
            this.next = next;
        }
    }
}
```

##### set 接口

###### HashSet 实现类

```java
package note;

import java.util.Collections;
import java.util.HashSet;

/**
 * @Description HashSet基本使用
 * @Author Noby
 * @Date 2023/3/17 0:08
 */public class HashSetNote {
    public static void main(String[] args) {
        /*
        底层通过HashMap实现
         */        //region 创建
        HashSet<String> strings = new HashSet<>();
        //endregion

        //region 相对于list集合有区别的成员方法
        Collections.addAll(strings,"张三","李四","王五","赵六");
        System.out.println(strings.add("张三"));//添加失败，det集合不能存储相同的元素
        System.out.println(strings);//打印出的元素是无序的
        //endregion
    }
}
```

###### LinkedHashSet

```java
package note;

import java.util.LinkedHashSet;

/**
 * @Description LinkedHashSet的基本使用
 * @Author Noby
 * @Date 2023/3/17 0:09
 */public class LinkedHashSetNote {
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

###### TreeSet

```java
package note;

import java.util.Collections;
import java.util.TreeSet;
/**
 * @Description TreeSet的基本使用
 * @Author Noby
 * @Date 2023/3/17 0:11
 */public class TreeSetNote {
    public static void main(String[] args) {
        /*
         * TreeSet基于红黑树实现的 TreeMap（平衡二叉树-排序二叉树-红黑树）
         * TreeSet里面的数据是有序的
         */        //region 构造
        TreeSet<String> strings = new TreeSet<>();
        //endregion

        //region 相对于HashSet的不同
        Collections.addAll(strings,"java","hello","world","a","c","b","d","f","e");
        System.out.println("strings = " + strings);//相对于HashSet，该集合有序(按照字典排序，而非存入顺序)
        //endregion
    }
}
```

### 双列集合

#### Map 接口

![image.png](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/20230316174555.png)
![image.png](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220215093145557.png)

##### HashMap 实现类

```java
package note;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
/**
 * @Description HashMap的基本使用
 * @Author Noby
 * @Date 2023/3/16 23:04
 */public class HashMapNote {
    public static void main(String[] args) {
        /*
         * HashMap：哈希映射，里面一个数据包个两个非常数据 ： key（键） value（值）
         * 因此称Map是由多个键值对构成的
         *         * 特点：无序、key不重复
         *         * 操作Map其实就是操作key
         */
        //region 构造方法
        HashMap<String, Object> noby = new HashMap<>();
        //endregion

        //region 成员方法
        noby.put("name","noby");//添加元素
        noby.put("age",20);//此处传入的是Integer而非int，20将会自动装箱为Integer
        noby.put("isMan",true);
        noby.put("hobby","learn java");

        System.out.println("noby.put(\"age\",21) = " + noby.put("age", 21));//当存在该键时，put方法为修改值，返回的是被覆盖的值

        System.out.println(noby.get("name"));//获取值

        System.out.println(noby.size());//获取键值对长度

        System.out.println("noby.remove(\"hobby\") = " + noby.remove("hobby"));//删除键值对

        System.out.println(noby.containsKey("hobby"));//是否包含该键

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
        /*         * HashMap数组默认长度是16，加载因子是0.75，数组长度*0.75 = 得到该数组中有几个位置可以用来存储数据
         *         * 放数据的流程：
         *     在放数据时会计算key的hash值，用哈希值与 hashCode() ^ h >>> 16，得到一个数字“哈希值”，假设Map
         *  为空（table = null）会先创建一个数组，默认长度为16，然后将扩容触发条件设置为12（16*0.75），接下来
         *  用“哈希值”与15进行按位与得到一个下标，得到数据应该放在数组中的那个位置，如果该位置没有放任何数据，
         *  就创建Node节点直接将新的节点放在这个位置，否则就用当前新数据的“hash”值与该位置数据的“hash”值进行比较，并且
         *  比较当前新的key与该位置的key是否一样，如果一样则替换原来的数据，否则新数据放在原数据的下边形成链表
         *         *  当链表的长度达到8的时候，就需要将链表转换成红黑树了（提升查询效率）
         *  当红黑树中的节点小于等于6时需要将红黑树转换链表（降低维护的成本）
         *  什么时候需要将链表转换成红黑树：容量必须大于等于64、并且链表的长度大于等于8
         *         *  扩容时机：当HashMap中的数据个数大于12个时就需要进行扩容了，扩容原来的2倍，触发时机也会变为原来的2倍，
         *  意思就说下一次扩容会在元素个数超过12*2时。
         *  总结：当HashMap中的数据个数达到数组长度*0.75时进行扩容，扩容为原来的两倍
         *  扩容之后：会将之前的数据重新定位放到新数组的各个地方（拆分链表）
         *         */
    }
}
```

##### treeMap 实现类

```java
package note;

import java.util.TreeMap;

/**
 * @Description TreeMap的基本使用
 * @Author Noby
 * @Date 2023/3/17 0:13
 */public class TreeMapNote {
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
         */        //endregion
        System.out.println(kace);//{aaa=kace, bbb=man, ccc=22}
    }
}
```

##### LinkedHashMap 实现类

```java
package note;

import java.util.LinkedHashMap;

/**
 * @Description LinkedHashMap的基本使用
 * @Author Noby
 * @Date 2023/3/17 0:13
 */public class LinkedHashMapNote {
    public static void main(String[] args) {
        LinkedHashMap<String, Object> noby = new LinkedHashMap<>();
        noby.put("name","noby");
        noby.put("age",21);
        noby.put("gender","man");

        System.out.println(noby);//{name=noby, age=21, gender=man}
        /*        LinkedHashMap对存入的顺序进行排序
         */    }
}
```

###### Properties 实现类

```java
package note;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.Properties;
import java.util.Set;

/**
 * @Description Properties的基本使用
 * @Author Noby
 * @Date 2023/3/17
 */public class PropertiesNote {
    public static void main(String[] args) throws Exception{
        //配置文件以.properties为后缀
        Properties properties = new Properties();//属于Map集合

        //region properties集合的特有方法
        properties.setProperty("one","hello");//若用setProperty()方法，值只能存储字符串。Map中的put()方法值可以为任意类型
        properties.setProperty("two","world");
        properties.setProperty("three","java");

        System.out.println(properties.getProperty("one"));//相当于Map()中的get()方法

        Set<String> strings = properties.stringPropertyNames();//相当于Map中的keySet()方法
        System.out.println(strings);
        //endregion

        //region 将properties存储到配置文件
        FileOutputStream fos = new FileOutputStream("D:\\IdeaProjects\\stage1\\day15\\src\\PropertiesStore.properties");
        properties.store(fos,"这是一行注释");
        //endregion

        //region 将配置文件读取到properties集合中 利用配置文件的优点在于在不修改代码(通过配置文件)的前提下更改程序
        loadProperties();
        //endregion
    }

    private static void loadProperties() throws Exception{
        FileInputStream fis = new FileInputStream("D:\\IdeaProjects\\stage1\\day15\\src\\PropertiesStore.properties");
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

### 快速失败和安全失败

- 安全失败（fail-safe）和快速失败（fail-fast）是两种处理并发访问数据结构时出现冲突的策略。
    - 安全失败：指的是在并发访问数据结构时，不会抛出异常或导致程序崩溃，而是通过复制数据结构或使用锁等方式来保证并发安全。
    - 快速失败：指的是在并发访问数据结构时，一旦检测到冲突，立即抛出 ConcurrentModificationException 异常，以避免出现数据不一致的情况。这种策略通常用于迭代器等需要遍历数据的场景。

```java
package note;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * @Description 快速失败和安全失败
 * @Author Noby
 * @Date 2023/3/16 19:40
 */public class FailSafeNote {
    public static void main(String[] args) {
        //region 快速失败，基本接触到的大部分集合都是快速失败
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(3);

        Iterator<Integer> iterator = list.iterator();
        while (iterator.hasNext()) {
            Integer element = iterator.next();
            list.remove(element); // 在遍历过程中修改集合，会触发快速失败
        }
        //endregion


        //region 安全失败
//        ConcurrentHashMap<Integer, Integer> map = new ConcurrentHashMap<>();
//
//        for (int i = 0; i < 100; i++) {
//            map.put(i, i);
//        }
//
//        Thread t1 = new Thread(() -> {
//            for (int i = 0; i < 50; i++) {
//                map.computeIfPresent(i, (key, value) -> value + 1);
//            }
//        });
//
//        Thread t2 = new Thread(() -> {
//            for (int i = 50; i < 100; i++) {
//                map.computeIfPresent(i, (key, value) -> value + 1);
//            }
//        });
//
//        t1.start();
//        t2.start();
//        try {
//            t1.join();
//            t2.join();
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
        //endregion    }
}
```
