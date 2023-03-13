---
title: day12 常用工具类
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

## format

```java
import java.util.Date;
//数字的格式化和日期操作API
public class Format {
    public static void main(String[] args) {
        int i1= 100000;
        double d1 = 345.6789;
        double d2 = 543.621;
        Date now = new Date();
        System.out.println(String.format("这个double数的值是：%-8.2f和%7.1f",d1,d2));//8和7表示占位数，负数标空处向左对齐
        System.out.println(String.format("int数值是：%,d",i1));//"，"表示输出的数值用"，"隔开

        //region 日期的格式化
        //tc表示完整的日期和时间
        System.out.println(String.format("现在的日期和时间：%tc",now));
        //tA,tB,td 分别表示周月日
        System.out.println(String.format("现在的日期和时间：%tA, %<tB, %<td",now));//"<"表示重复利用之前用过的参数
        //endregion
    }
}
```

## Arrays

```java
package note;

import java.util.Arrays;

public class ArraysNote {
    public static void main(String[] args) {
        //region toString 将数组转换为字符串
        int[] nums = {2, 1, 4, 3, 5};
        System.out.println(nums);//打印的为地址值
        System.out.println(Arrays.toString(nums));
        //endregion

        //region sort 升序排序
        Arrays.sort(nums);//一般搭配comparator对象和comparable接口排序
        System.out.println("Arrays.toString(nums) = " + Arrays.toString(nums));
        //endregion

        //region copyOf copyOfRange 数组的复制，常用于数组的扩容
        int[] nums1 = Arrays.copyOf(nums,nums.length + 2);//第二参数为拷贝的数组长度(注意：其长度可以大于原数组，常用来给数组扩容)
        System.out.println("Arrays.toString(nums1) = " + Arrays.toString(nums1));

        int[] nums2 = Arrays.copyOfRange(nums,1,4);//表示拷贝的范围，同样的范围可以大于原数组
        System.out.println("Arrays.toString(nums2) = " + Arrays.toString(nums2));
        //endregion
    }
}
```

## UUID

- 定义：UUID 是 Universally Unique Identifier 的缩写，翻译成中文意为通用唯一标识码类，它是在一定的范围内（从特定的名字空间到全球）唯一的机器生成的标识符。
- 作用：常用于区分不同的文件(文件名并不能区分文件)

```java
package note;

import java.util.UUID;

public class UUIDNote {//唯一标识代码，32位随机字符串(不包含-)
    public static void main(String[] args) {
        String string = UUID.randomUUID().toString();
        System.out.println("string = " + string);
    }
}
```

## Math

```java
package note;

public class MathNote {
    public static void main(String[] args) {
        System.out.println("Math.abs(-3.14) = " + Math.abs(-3.14));
        System.out.println("Math.ceil(3.14) = " + Math.ceil(3.14));
        System.out.println("Math.floor(3.14) = " + Math.floor(3.14));
        System.out.println("Math.round(3.14) = " + Math.round(3.14));
        System.out.println("Math.PI = " + Math.PI);
        System.out.println("Math.pow(2,3) = " + Math.pow(2, 3));
        System.out.println("Math.sqrt(9) = " + Math.sqrt(9));
        System.out.println("Math.random() = " + Math.random());//[0.0,1.0]之间的小数
        System.out.println("Math.max(1,2) = " + Math.max(1, 2));
        System.out.println("Math.min(1,2) = " + Math.min(1, 2));
    }
}
```

## System

```java
import java.util.Arrays;

public class APISystem {
    public static void main(String[] args) {
        //region currentTimeMillis
        //获取系统毫秒值
        long l = System.currentTimeMillis();
        for (int i = 0; i < 1000; i++) {
            System.out.println(i);
        }
        System.out.println("程序耗时（毫秒）" + (System.currentTimeMillis() - l));
        //endregion

        //region arrraycopy
        //复制数组
        int[] arr1= {1,2,3,4,5};
        int[] arr2 = {10,20,30,40,50};
        System.arraycopy(arr1,1,arr2,2,3);//arr1是原数组，1为原数组起始位置，3为长度
        System.out.println(Arrays.toString(arr2));//[10, 20, 2, 3, 4]
        //endregion

        System.exit(0);//强制退出java虚拟机，后面将不再执行，非零数字表示异常终止，一般为0
    }
}

```
