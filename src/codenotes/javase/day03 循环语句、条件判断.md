---
title: day03 循环语句、条件判断
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
## 循环语句

### 三种循环的不同

1、初始化变量。

for循环当中定义的初始化变量，只有自己才能用（定义在循环体里 的局部变量，在栈内运行完释放，并不保存）；while和do-while循环，初始化变量本来就在外面，所以外面也照样可以使用。

2、执行次数。

for循环和while循环是【先判断后执行】，但是do-while循环是【先执行后判断】。

3、使用的普遍性不同。

绝大多数情况下，三种循环可以来回转换。但是凡是次数确定、范围确定的情况，使用for循环。


```java
package note;

public class For_While_DoWhileNote {
    public static void main(String[] args) {
        //region for
        for(int i = 0;i < 10; i++) {
            System.out.printf("这个数值是%d",i);
        }
        //endregion

        //region while
        int n = 1;
        while(n <= 10) {
            System.out.println(n * n);
            n++;
        }
        //endregion

        //region do while
        int n1 = 1;
        do {
            System.out.println(n1 * n1);
            n1++;
        } while (n1 <= 10);
        //endregion

    }
}
```

## switch语句

```java
package note;

import java.util.Scanner;

public class SwitchNote {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入一个0-100之间的分数:");

        int score = scanner.nextInt();

        switch(score / 10) {
            case 10://穿透的巧用
            case 9:
                System.out.println("A");
                break;
            case 8:
                System.out.println("B");
                break;
            case 7:
                System.out.println("C");
                break;
            case 6:
                System.out.println("D");
                break;
            default:
                System.out.println("E");
        }
    }
}
```

## if语句

```java
package note;

public class If_elseNote {
    public static void main(String[] args) {
        //region 并列条件语句
        int i = 2;
        if (i == 0) {
            System.out.println("i == 1");
        } else if (i == 1) {
            System.out.println("i == 1");
        } else if (i == 2) {
            System.out.println("i == 2");
        } else {
            System.out.println("others");
        }
        //endregion

        //region 嵌套条件语句
        int year = 2021;
        if (year % 4 == 0) {
            if (year % 100 !=0) {
                System.out.println("闰年");
            }else {
                System.out.println("平年");
            }
        }else if (year % 400 == 0) {
            System.out.println("闰年");
        }else {
            System.out.println("平年");
        }
        //endregion

        //region 多条件判断
        int year1 = 2021;
        if ((year1 %4 ==0 && year1 % 100 !=0) || year1 % 400 == 0) {
            System.out.println("闰年");
        }else {
            System.out.println("平年");
        }
        //endregion
    }
}
```