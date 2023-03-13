---
title: day13 常用工具类、比较、包装类
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



## Arrays工具类

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

* 定义：UUID是Universally Unique Identifier的缩写，翻译成中文意为通用唯一标识码类，它是在一定的范围内（从特定的名字空间到全球）唯一的机器生成的标识符。
* 作用：常用于区分不同的文件(文件名并不能区分文件)

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

## BigDecimal

* 作用：用于解决浮点数的运算时的精度问题

```java
package note;

import java.math.BigDecimal;

public class BigDecimalNote {//小数的精确计算
    public static void main(String[] args) {
        //region 基本使用
        double d = 0.1234;
        double d1= 0.245667;
        BigDecimal bigDecimal = new BigDecimal(Double.toString(d));//小数必须填入字符串
        BigDecimal bigDecimal1 = new BigDecimal(d1+"");
        BigDecimal bigDecimal2 = new BigDecimal(10);//整数类型转bigdecimal可以直接填入int
        System.out.println("bigDecimal.add(bigDecimal1) = " + bigDecimal.add(bigDecimal1));
        System.out.println("bigDecimal.subtract(bigDecimal1) = " + bigDecimal.subtract(bigDecimal1));
        System.out.println("bigDecimal.multiply(bigDecimal1) = " + bigDecimal.multiply(bigDecimal1));
        System.out.println("bigDecimal.divide(2) = " + bigDecimal.divide(new BigDecimal(2)));
        //endregion

        //region 数据类型的转换
        System.out.println("bigDecimal2.intValue() = " + bigDecimal2.intValue());
        System.out.println("bigDecimal2.doubleValue() = " + bigDecimal2.doubleValue());
        System.out.println("bigDecimcal2.longValue() = " + bigDecimal2.longValue());
        System.out.println("bigDecimal2.toString() = " + bigDecimal2.toString());
        //endregion

        //region 精度保留
        System.out.println("bigDecimal1.setScale(2) = " + bigDecimal1.setScale(2,BigDecimal.ROUND_HALF_UP));
        //endregion
    }
}

```

## 基本数据类型的包装类

* Java8大基本数据类型相较于其它类型它们是没有构造方法、成员方法、属性等内容的，为了让8种基本数据类型也支持面向对象，Java为基本数据类型都提供了对应的包装类，包装类就是对基本数据类的基本封装，里面包含构造方法、成员方法、属性等内容，从而也让8大基本数据类型也具备了面向对象特性。

| 基本数据类 | 包装类    |
  | ---------- | --------- |
  | byte       | Byte      |
  | char       | Character |
  | short      | Short     |
  | int        | Integer   |
  | long       | Long      |
  | boolean    | Boolean   |
  | float      | Float     |
  | double     | Double    |

* 包装类型的继承关系

![image-20220211174633863](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220211174633863.png)

```java
package note;

public class IntegerNote {//包装类

    public static void main(String[] args) {
        /*
        把基本数据类型封装为包装类的目的在于用于面向对象
         */
        //region interger
        //region 构造
        Integer integer = new Integer(10);
        new Integer("20");//可传递字符串
        Integer integer10 = 20;
        //endregion

        //region 成员方法
        int i = integer.intValue();//转换为int
        String string1 = integer.toString();

        double v = integer.doubleValue();
        //endregion

        //region 静态方法和属性
        int i1 = Integer.parseInt("123");//字符串转换为int(字符串必须为十进制)
        Integer integer1 = Integer.valueOf("1234");//字符串转Integer
        String string = Integer.toString(321);
        ;//int转字符串
        Integer integer2 = Integer.valueOf(1234);//int转Integer

        System.out.println("Integer.MAX_VALUE = " + Integer.MAX_VALUE);//最大的int数
        System.out.println("Integer.MIN_VALUE = " + Integer.MIN_VALUE);
        System.out.println("Integer.toBinaryString(14) = " + Integer.toBinaryString(14));//转换为二进制
        System.out.println("Integer.toOctalString(14) = " + Integer.toOctalString(14));
        System.out.println("Integer.toHexString(14) = " + Integer.toHexString(14));
        System.out.println("Integer.compare(2,4) = " + Integer.compare(2, 4));//比较，前者大于后者为1，前者小于后者为-1，相等为0
        //endregion
        //endregion

        //region Character
        //region 静态方法
        System.out.println("Character.toLowerCase('A') = " + Character.toLowerCase('A'));
        System.out.println("Character.toUpperCase('b') = " + Character.toUpperCase('b'));
        //endregion
        //endregion

        //region 自动装箱，自动拆箱，只能发生在包装类与其对应的基本数据类型之间
        integer = 23;//自动装箱
        i = integer;//自动拆箱
        //endregion


        //region 面试题
        Integer inte = new Integer(10);
        Integer inte1 = new Integer(10);
        System.out.println("inte == inte1 = " + (inte == inte1));//比较的地址 false
        System.out.println("inte.equals(inte1) = " + inte.equals(inte1));//比较的封装的值 true

        inte = 20;
        inte1 = 20;//自动装箱创建对象，当值相同时，都引用常量池中的已存在的同一个Integer对象
        System.out.println("inte == inte1 = " + (inte == inte1));//比较的地址 true
        System.out.println("inte.equals(inte1) = " + inte.equals(inte1));//比较的封装的值 true

        /*
        Integer为了减少系统的开销，在加载时就会先创建256个Integer对象，这些对象放在常量池中，如果通过
        自动装箱，直接调用Integer.valueof方法，只要数值在[-128,127]之间它会直接得到常量池中的对象，而不会
        重新再创建对象
         */

        inte = 128;
        inte1 = 128;//自动装箱创建的对象值不在 [-128,127] 范围内时，内存池中不存在该 Integer 对象，将通过自己创建 Integer 对象
        System.out.println("inte == inte1 = " + (inte == inte1));//比较的地址 false
        System.out.println("inte.equals(inte1) = " + inte.equals(inte1));//比较的封装的值 true
        // endregion 面试题

    }
}


```



## Date

* 相关字符解释

  yyyy：年
  MM：月
  dd：日
  hh：1~12小时制(1-12)
  HH：24小时制(0-23)
  mm：分
  ss：秒
  S：毫秒
  E：星期几
  D：一年中的第几天
  F：一月中的第几个星期(会把这个月总共过的天数除以7)
  w：一年中的第几个星期
  W：一月中的第几个星期(会根据实际情况来算)
  a：上下午标识
  k：和HH差不多，表示一天24小时制(1-24)。
  K：和hh差不多，表示一天12小时制(0-11)。
  z：表示时区

```java
package note.date;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateNote {//日期API
    public static void main(String[] args) throws ParseException {
        //region 构造函数
        Date date = new Date();//获取当前时间对象
        System.out.println("date = " + date);
        //endregion

        //region 成员方法
        System.out.println("new Date().before() = " + new Date().before(date));//之前
        System.out.println("new Date().after(date) = " + new Date().after(date));//之后
        System.out.println("date.getDay() = " + date.getDay());//星期
        //endregion

        //region 日期格式化器 date转换为字符串
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss E");
        String format = simpleDateFormat.format(date);
        System.out.println("format = " + format);
        //endregion

        //region 字符串转换为日期
        String str = "14:20 星期三";
        SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat("HH:mm E");
        Date date1 = simpleDateFormat1.parse(str);
        System.out.println(date1);
        //endregion
    }
}
```



## Calendar

```java
package note.date;

import java.util.Calendar;

public class CalendarNote {
    public static void main(String[] args) {
        //region 构造方法
        Calendar calendar = Calendar.getInstance();
        System.out.println("calendar = " + calendar);
        //endregion

        //region 时间的获取
        System.out.println("calendar.get(Calendar.YEAR) = " + calendar.get(Calendar.YEAR));
        System.out.println("calendar.get(Calendar.MONTH) = " + calendar.get(Calendar.MONTH));//月份为0-11
        System.out.println("calendar.get(Calendar.DAY_OF_MONTH) = " + calendar.get(Calendar.DAY_OF_MONTH));
        System.out.println("calendar.get(Calendar.DAY_OF_WEEK) = " + calendar.get(Calendar.DAY_OF_WEEK));
        System.out.println("calendar.get(Calendar.HOUR_OF_DAY) = " + calendar.get(Calendar.HOUR_OF_DAY));
        System.out.println("calendar.get(Calendar.MINUTE) = " + calendar.get(Calendar.MINUTE));
        System.out.println("calendar.get(Calendar.SECOND) = " + calendar.get(Calendar.SECOND));
        //endregion

        //region 时间的加减
        calendar.add(Calendar.YEAR,2);
        System.out.println("calendar.get(Calendar.YEAR) = " + calendar.get(Calendar.YEAR));
        //endregion

        //region 时间的先后
        System.out.println("calendar.before(Calendar.getInstance()) = " + calendar.before(Calendar.getInstance()));
        System.out.println("calendar.after(Calendar.getInstance()) = " + calendar.after(Calendar.getInstance()));
        //endregion
    }
}
```



## LocalDateTime

```java
package note.date;

import javax.swing.text.DateFormatter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Formatter;

public class LocalDateTimeNote {//相比较Calendar和Date它的线程安全

    public static void main(String[] args) {
        //region 日期构造
        LocalDate localDate = LocalDate.now();
        LocalDateTime birthday = LocalDateTime.of(1999, 3, 11,4,50,20);
        System.out.println("localDate = " + localDate);
        //endregion

        //region 时间
        LocalTime localTime = LocalTime.now();
        System.out.println("localTime = " + localTime);
        //endregion

        //region 日期时间
        LocalDateTime localDateTime = LocalDateTime.now();
        System.out.println("localDateTime = " + localDateTime);
        //endregion

    //region 日期时间格式化器
        //region 日期时间=>字符串
        System.out.println("日期时间=>字符串");
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String format = dateTimeFormatter.format(localDateTime);
        System.out.println(format);
        //endregion
        //region 字符串=>日期时间
        System.out.println("字符串=>日期时间");
        DateTimeFormatter dateTimeFormatter1 = DateTimeFormatter.ofPattern("H:m");
        LocalTime parse = LocalTime.parse("7:30",dateTimeFormatter1);
        System.out.println(parse);
        //endregion
    //endregion

        //region 日期时间的转换
        LocalTime localTime1 = localDateTime.toLocalTime();
        LocalDate localDate1 = localDateTime.toLocalDate();
        //endregion

        //region 日期时间的计算，设置
        System.out.println("localTime.plusMinutes(3) = " + localTime.plusMinutes(3));
        System.out.println(localTime.withMinute(59));
        //endregion

        //region 判断时间先后
        System.out.println("localTime.isBefore(LocalTime.now()) = " + localTime.isBefore(LocalTime.now()));
        System.out.println("localTime.isAfter(localTime.now()) = " + localTime.isAfter(localTime.now()));
        //endregion
    }
}

```



## Comparable接口

```java
package note.compare;

import java.util.Arrays;

/**
 * Comparable的使用
 */
public class ComparableNote {
    public static void main(String[] args) {
        Student[] students = {
                new Student("noby",1,2,3),
                new Student("java",10,200,30),
                new Student("a",10,200,18),
                new Student("tony",100,10,3)
        };
        Arrays.sort(students);
        for (Student student : students) {
            System.out.println(student);
        }
    }
}

class Student implements Comparable<Student>{
    private String name;
    private int chinese;
    private int math;
    private int english;

    public Student(String name,int chinese, int math, int english) {
        this.name = name;
        this.chinese = chinese;
        this.math = math;
        this.english = english;
    }

    @Override
    public int compareTo(Student o) {
        if (o.chinese == this.chinese) {
            if (o.math == this.math) {
                return this.name.compareTo(o.name);
            }
            return Integer.compare(o.math,this.math);
        }
        return Integer.compare(o.chinese, this.chinese);
    }

    public int getChinese() {
        return chinese;
    }

    public void setChinese(int chinese) {
        this.chinese = chinese;
    }

    public int getMath() {
        return math;
    }

    public void setMath(int math) {
        this.math = math;
    }

    public int getEnglish() {
        return english;
    }

    public void setEnglish(int english) {
        this.english = english;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", chinese=" + chinese +
                ", math=" + math +
                ", english=" + english +
                '}';
    }
}

```



## Comparator

```java
package note.compare;

import java.util.Arrays;
import java.util.Comparator;

/**
 * Comparator的使用
 */
public class ComparatorNote {
    public static void main(String[] args) {
        Person[] persons = {
                new Person("b", 21),
                new Person("kace", 22),
                new Person("a", 21),
        };
        Arrays.sort(persons, new Comparator<Person>() {
            @Override
            public int compare(Person o1, Person o2) {
                int age = Integer.compare(o1.getAge(), o2.getAge());
                int name = o2.getName().compareTo(o1.getName());
                if (age == 0) {
                    return name;
                }
                return age;
            }
        });
        for (Person person : persons) {
            System.out.println(person);
        }
    }
}

class Person {
    private String name;
    private int age;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
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

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
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



