---
title: day04 函数（方法）
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

## 函数(方法)

- 定义：函数是定义在类中的一段独立的代码块，用来实现某个功能，Java 中函数又被称为方法。
- 组成：
  - 方法名
  - 形参列表
  - 方法体
  - 返回值
- 分类：
  - 根据是否为用户创建创建分类：
    - JDK 自带的函数
    - 自定义的函数
  - 根据有无参数：
    - 有参函数
      - 单参函数
      - 多参函数
    - 无参函数
- 函数的目的
  - 提高代码的复用性
  - 提高代码的维护性
- 函数代码演示

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
