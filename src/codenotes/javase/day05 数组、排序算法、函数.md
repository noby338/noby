---
title: day05 数组、排序算法、函数
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
## 算法

定义：解决问题的方法和步骤

算法书籍：算法大全

常用算法：

* 排序
  * 冒泡排序
  * 选择排序
  * 插入排序
  * 快速排序
  * 堆排序
* 递归
* 递推
* 加密算法(MD5)

## 数组

定义：数组是编程语言中的一种引用数据类型，可以用来保存多个相同类型的数据。

```java
package note.arrray;

import java.util.Arrays;
import java.util.Random;

public class ArrayNote {//数组笔记

    public static void main(String[] args) {
        //region 数组的创建
        //方法1
        int[] array = new int[5];//动态初始化
        //方法2
        int[] array1 = new int[]{1, 2, 3, 4, 5};
        //方法3
        int[] array2 = {30, 50, 40, 10, 20};//静态初始化
        //endregion

        //region 数组的赋值
        array1[4] = 500;
        //endregion

        //region 数组的遍历
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + ",");//int数组的初值为0
        }
        System.out.println();
        //endregion

        //region 找出数组中的最大值
        System.out.println("找出数组中的最大值");
        method();
        //endregion

        //region 找出第二大的值
        System.out.println("找出第二大的值");
        method1();
        //endregion

        //region 冒泡排序
        System.out.println("冒泡排序");//因为冒泡排序交换次数较多，所以排序方法相对于其他方法效率低下
        method2();
        //endregion

        //region 选择排序
        System.out.println("选择排序");
        method3();
        //endregion

        //region 彩票1 生成不重复的随机数后排序，常规方法
        System.out.println("彩票1 生成不重复的随机数后排序，常规方法");
        method4();
        //endregion

        //region 彩票2 生成不重复的随机数后排序，数组索引巧用
        System.out.println("彩票2 生成不重复的随机数后排序，数组索引巧用");
        method5();
        //endregion

    }

    private static void method5() {
        //region 彩票2 生成不重复的随机数后排序，数组索引巧用
        Random random = new Random();
        int amount = 5;//数组的范围
        int randomMax = 20;//随机数的最大值
        int randomMin = 10;//随机数的最小值
        int[] randomArr = new int[randomMax + 1];//随机数数组，用于标记
        int[] resArr = new int[amount];//结果数组
        int index = 0;
        for (int i = 0; i < amount; ) {
            int num = random.nextInt(randomMax - randomMin) + randomMin;
            if (randomArr[num] == 0) {
                randomArr[num] = 1;
                i++;
            }
        }
        for (int i = 0; i < randomArr.length; i++) {
            if (randomArr[i] == 1) {
                resArr[index] = i;
                index++;
            }
        }
        System.out.println("Arrays.toString(resArr) = " + Arrays.toString(resArr));
        //endregion
    }

    private static void method4() {
        //region 彩票1 生成不重复的随机数后排序，常规方法
        Random random = new Random();
        int[] nums = new int[7];
        for (int i = 0; i < 7; ) {
            boolean flag = true;
            int num = random.nextInt(7) + 1;
            for (int j = 0; j < nums.length; j++) {
                if (nums[j] == num) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                nums[i++] = num;
            }
        }
        for (int i = 0; i < nums.length - 1; i++) {
            int max = nums[i];
            int index = i;
            for (int j = i; j < nums.length; j++) {
                if (nums[j] > max) {
                    max = nums[j];
                    index = j;
                }
            }
            int temp = nums[index];
            nums[index] = nums[i];
            nums[i] = temp;
        }
        System.out.println("Arrays.toString(nums) = " + Arrays.toString(nums));
        //endregion
    }

    private static void method3() {
        //region 选择排序
        int[] array = {5, 2, 3, 4, 6, 1};
        for (int i = 0; i < array.length - 1; i++) {
            int min = array[i];
            int index = i;
            for (int j = i; j < array.length; j++) {
                if (min > array[j]) {
                    min = array[j];
                    index = j;
                }
            }
            int temp = array[i];
            array[i] = array[index];
            array[index] = temp;
        }
        System.out.println("Arrays.toString(array) = " + Arrays.toString(array));
        //endregion
    }

    private static void method2() {
        //region 冒泡排序
        int[] array = {1, 2, 3, 4, 6, 5};
        for (int i = 0; i < array.length - 1; i++) {//比较的轮次
            for (int j = 0; j < array.length - i - 1; j++) {//比较的索引
                if (array[j] > array[j + 1]) {
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        System.out.println("Arrays.toString(array2) = " + Arrays.toString(array));
        //endregion
    }

    private static void method1() {
        //region 找出第二大的值
        int[] array = {1, 2, 3, 4, 6, 5};
        int max1 = array[0];
        int index = 0;
        for (int i = 0; i < array.length; i++) {
            if (max1 < array[i]) {
                max1 = array[i];
                index = i;
            }
        }
        array[0] = array[0] ^ array[index];
        array[index] = array[0] ^ array[index];
        array[0] = array[0] ^ array[index];


        int max2 = array[1];
        for (int i = 1; i < array.length; i++) {
            if (max2 < array[i]) {
                max2 = array[i];
            }
        }
        System.out.println("max2 = " + max2);
        //endregion
    }

    private static void method() {
        //region 找出数组中的最大值
        int[] array = {1, 2, 3, 4, 6, 5};
        int max = array[0];
        for (int i = 0; i < array.length; i++) {
            if (max < array[i]) {
                max = array[i];
            }
        }
        System.out.println("max = " + max);
        //endregion

    }
}

```

* 二维数组代码演示

```java
package note.arrray;

public class DyadicArrayNote {//二维数组
    public static void main(String[] args) {
        //region 二维数组的创建
        //方式1
        int[][] array = new int[2][3];//创建一个两行三列的二维数组
        //方式2
        int[][] array1 = new int[][]{
                {11,12,13},
                {21,22,23}
        };
        //方式3
        int[][] array2 = {
                {11,12,13},
                {21,22,23}
        };
        //endregion

        //region 数据的获取
        System.out.println("array1[1][0] = " + array1[1][0]);
        //endregion

        //region 二维数组的遍历
        for (int i = 0; i < array1.length; i++) {
            for (int j = 0; j < array1[0].length; j++) {
                System.out.print(array1[i][j]+",");
            }
            System.out.println();
        }
        //endregion
    }
}

```

## 函数(方法)

* 定义：函数是定义在类中的一段独立的代码块，用来实现某个功能，Java中函数又被称为方法。

* 组成：

  * 方法名
  * 形参列表
  * 方法体
  * 返回值

* 分类：

  * 根据是否为用户创建创建分类：

    * JDK自带的函数
    * 自定义的函数
  * 根据有无参数：
    * 有参函数
      * 单参函数
      * 多参函数
    * 无参函数

* 函数的目的

  * 提高代码的复用性
  * 提高代码的维护性

  

* 函数代码演示

  ```java
  package note;
  
  import javax.xml.transform.Result;
  import java.lang.reflect.Array;
  import java.util.Arrays;
  
  public class functionNote {
      //JDK自带的main函数，程序的入口
      public static void main(String[] args) {
          //自定义函数必须通过main函数调用才能执行(放在main的方法体中)
          //reigon 无参函数
          function();
          //endregion
  
          //region 有参函数
          System.out.println("fucntion1(5,3) = " + function1(5, 3));
          //5和3表示实参，function方法列表中的中的num和pow为形参，调用方法的过程中，实参(实际参数)会将会将值付给形参(形式参数)，参与运算
          //endregion
  
          //region 数组(引用数据类型)作为函数的参数，传入的是引用
          int[] nums = {1,2,3,4,5};
          System.out.println("Arrays.toString(function2(nums)) = " + Arrays.toString(function2(nums)));
          //endregion
  
          //region 可变参数
          function3(1,2,3,4);
          function3();//可以不传可变参数
          //endregion
  
          //region 可变参数
          function4("加法",1,2,3,4);
          //endregion
      }
  
      private static void function4(String str,int... args) {//当参数列表同时存在可变参数和其他参数时，应将可变参数放在最后
          int result = 0;
          if("null".equals(str)) {
              System.out.println("null");
          }
          if (str.equals("乘法")) {
              result = 1;
              for (int arg : args) {
                  result *= arg;
              }
          }
          if (str.equals("加法")) {
              result = 0;
              for (int arg : args) {
                  result += arg;
              }
          }
  
          System.out.println(result);
      }
  
      //region 可变参数
      private static void function3(int... args) {//arguments 中文参数  等同于int[] args;
          System.out.println("Arrays.toString(args) = " + Arrays.toString(args));
      }
      //endregion
  
      private static int[] function2(int[] nums) {//参数类型为引用数据类型时，实参传递的为引用
          nums[0] = 0;
          return nums;
      }
  
      private static int function1(int num, int pow) {//参数列表中的参数为形参，调用此函数时传递的参数为实参 参数类型为基本数据类型时，实参传递的为值
          //参数列表中的 int num,int pow 为方法体中的变量声明
          return (int) Math.pow(num,pow);
      }
  
      //function表示函数名(函数的变量名)，命名规则同变量名
      //void表示返回值类型
      //()：表示参数列表(形参)，用来传入需要参与方法运算的参数(基本数据类型、引用数据类型)，若没有参数参与运算，即可省略
      private static void function() {
          System.out.println("这是一个无参函数");
      }
  }
  
  ```

  

