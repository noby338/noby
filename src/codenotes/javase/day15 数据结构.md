---
title: day15 数据结构
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

## 数据结构

### 栈和队列

```java
package note;

import java.util.LinkedList;

public class Stack_queuesNote {//栈和队列
    public static void main(String[] args) {
        LinkedList<String> strings = new LinkedList<>();
        //region 栈：先进后出。push()和pop()方法继承自Deque
        strings.push("one");
        strings.push("two");
        strings.push("three");

        System.out.println(strings.pop());//弹出栈的数据被删除 three
        System.out.println(strings);//[two, one]
        //endregion

        //region 队列：先进先出
        strings.clear();

        //offer()方法和add()方法都是将元素添加到最后，offer()为queue的方法，add()为list方法
        strings.offer("one");//入队列
        strings.offer("two");
        strings.offer("three");
//        strings.add("one");//入队列
//        strings.add("two");
//        strings.add("three");

        System.out.println(strings.poll());//出队列

        System.out.println(strings);//[two, three]
        //endregion
    }
}
```

### 链表

- 单链表

  在每一个节点中，data 负责保存数据，而 next 用于保存下一个节点的地址（引用），这样多个节点就组成了一个链，我们称之为链表。

  ![image-20220216102155956](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216102155956.png)

  相较于数组链表在增删数据方面效率要高一些，插入数据时只需要将上一个节点的 next 执行新节点，新节点的 next 指向后一个节点。

  ![image-20220216102206870](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216102206870.png)

  在删除节点时只需要将前一个节点的 next 执行要删除节点的后一个节点就行

  ![image-20220216102217765](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216102217765.png)

  但是单链表也有自己的缺点：遍历速度较慢。

  因为单链表不像数组空间是连续的，链表中的节点分散在内存中不同的位置，不管想要得到哪个元素都必须从链表的头节点找起，故而影响到了查询效率。

- 双链表(LInkedList 为该结构)

  为了解决单链表查询效率较慢的问题，双链表由此诞生。双链表的基本组成单元也是节点，但与单链表节点不同的是双链表的节点多了一个指向前一个节点的引用，因此通过任何一个节点都可以找到其后一个节点及前一个节点，寻找数据时也就不需要非得从头开始。

  多个节点串联在一起就组成了双链表：

  ![image-20220216102235431](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216102235431.png)

### 树

#### 二叉树

![image-20220216103201680](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216103201680.png)

- 左子树：每个节点左边所有的节点
- 右子树：每个节点游遍所有的节点
- 根节点：所有节点的父节点
- 叶子节点：没有子节点的节点

##### 遍历方式

- 先根遍历：先遍历根节点，然后遍历左子树，最后遍历右子树
- 中序遍历：先遍历左子树，然后遍历根节点，最后遍历右子树
- 后序遍历：先遍历左子树，然后遍历右子树，最后遍历根节点

##### 排序二叉树

- 二叉树中左子树上的数据永远比根小，右子树上的数据永远比根大
- ![image-20220216104421406](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216104421406.png)
- 先根遍历 10、6、3、8、12、15
- 中序遍历 3、6、8、10、12、15
- 后序遍历 3、8、6、15、12、10

##### 平衡二叉树

排序二叉树存在的问题：数据倾斜带来遍历效率下降

例如在插入 5/6/7/8/9 这几个数据时会造成以下问题

如图：

![image-20220216105549230](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105549230.png)

可以看到此时排序二叉树其实已经变成了一个连表，使得遍历的效率大大降低，为了解决这个问题平衡二叉树诞生了。

什么是平衡二叉树：任何节点的左子树与右子树的树高相差不超过 1

如图所示就是一颗平衡二叉树，因为树高相差为 1

![image-20220216105558854](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105558854.png)

又如

![image-20220216105611806](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105611806.png)

也是一颗平衡二叉树，因为树高相差为 1；但下面这棵树就不是平衡二叉树，因为树高相差为 2，已经大于 1 了

![image-20220216105623881](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105623881.png)

平衡二叉树是一种自平衡二叉树，主要是通过数的左旋右旋来实现平衡的

- 左旋：

  ![image-20220216105638889](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105638889.png)

  旋转后的结果为

  ![image-20220216105650386](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105650386.png)

  继续添加 8

  ![image-20220216105703990](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105703990.png)

  此时二叉树是平衡的，不会发生旋转

  继续添加 9，此时二叉树不平衡，需要发生旋转

  ![image-20220216105713405](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105713405.png)

  得到结果如下

  ![image-20220216105722636](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105722636.png)

  二叉树就变成平衡的了，继续插入 10，当插入 10 时有需要进行旋转，只不过此时不再是围绕着 9 旋转，因为围绕 9 旋转的结果并不会让树保持平衡，那么就会再向上寻找一个节点，判断围绕该节点旋转能不能得到平衡，如果可以则围绕着该节点进行旋转。下图所示围绕 8 旋转之后能得到平衡，将 5 和 6 旋转成 8 的左子树，将 7 断开与 8 的连接，然后将 7 作为 6 的右子树

  ![image-20220216105739257](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105739257.png)

  ![img](https://img-blog.csdn.net/20140523092135453?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvY2hlbnNzeQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

  旋转之后得到的结果是

  ![image-20220216105800173](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105800173.png)

​ 继续插入 11，此时 9 的左子树与右子树树高相差超过 1 不平衡，需要发生旋转

​ ![image-20220216105824578](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105824578.png)

​ 得到结果如下

​ ![image-20220216105836726](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105836726.png)

- 右旋：右旋逻辑跟左旋是一样的，只不过是换了一个方向，此处就不再详细解释了

##### 红黑树

![image-20220216111140675](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216111140675.png)

平衡二叉树的缺点：插入数据时经常会频繁的进行左旋、右旋使得数的维护非常麻烦，而且严重消耗性能。

为了减少旋转红黑树诞生了

红黑树在平衡二叉树的基础上为节点增加了颜色，节点的颜色要么是黑色要么是红色，因此称之为红黑树。

红黑树定义和特点

红黑树是一种含有红黑节点并能自平衡的二叉查找树，它必须满足下面要求：

- 每个节点要么是黑色，要么是红色。
- 根节点是黑色。
- 每个叶子节点（NIL）是黑色。
- 每个红色节点的两个子结点一定都是黑色。
- 任意一节点到每个叶子结点的路径都包含数量相同的黑结点。（黑平衡）
- 插入的新节点都是红色

案例：利用红黑树插入 5-11 之间所有的数

​ 插入 7 时，黑不平衡，发生旋转

![image-20220216105850626](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105850626.png)

​ 得到结果如下

![image-20220216105903123](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105903123.png)

​ 插入 8，将 5 和 7 变为黑，达到黑平衡，不需要旋转

![image-20220216105911359](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105911359.png)

​ 插入 9，黑不平黑发生旋转

![image-20220216105919240](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105919240.png)

​ 旋转之后得到

![image-20220216105927356](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105927356.png)

​ 插入 10，黑平衡，不需要旋转

![image-20220216105932870](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105932870.png)

​ 插入 11，黑不平衡，需要旋转

![image-20220216105940917](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105940917.png)

​ 旋转得到

![image-20220216105949117](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105949117.png)

​ 插入 12

![image-20220216105958437](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216105958437.png)

​ 围绕 8 进行旋转

![image-20220216110020046](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220216110020046.png)

### 哈希表

**数组**：采用一段连续的存储单元来存储数据。对于指定下标的查找，时间复杂度为 O(1)；通过给定值进行查找，需要遍历数组，逐一比对给定关键字和数组元素，时间复杂度为 O(n)，当然，对于有序数组，则可采用二分查找，插值查找，斐波那契查找等方式，可将查找复杂度提高为 O(logn)；对于一般的插入删除操作，涉及到数组元素的移动，其平均复杂度也为 O(n)

**线性链表**：对于链表的新增，删除等操作（在找到指定操作位置后），仅需处理结点间的引用即可，时间复杂度为 O(1)，而查找操作需要遍历链表逐一进行比对，复杂度为 O(n)

**二叉树**：对一棵相对平衡的有序二叉树，对其进行插入，查找，删除等操作，平均复杂度均为 O(logn)。

**哈希表**：相比上述几种数据结构，在哈希表中进行添加，删除，查找等操作，性能十分之高，不考虑哈希冲突的情况下（后面会探讨下哈希冲突的情况），仅需一次定位即可完成，时间复杂度为 O(1)，接下来我们就来看看哈希表是如何实现达到惊艳的常数阶 O(1)的。

数据结构的物理存储结构只有两种：顺序存储结构和链式存储结构（像栈，队列，树，图等是从逻辑结构去抽象的，映射到内存中，也这两种物理组织形式），而在上面我们提到过，在数组中根据下标查找某个元素，一次定位就可以达到，哈希表利用了这种特性，哈希表的主干就是数组。

#### 底层实现原理

HashMap 底层是由数组、连表/红黑树实现的。

![image-20220127164228812](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/xiangwei/20220127164228.png)
