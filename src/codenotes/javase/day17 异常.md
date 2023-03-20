---
title: day17 异常
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

## 异常体系

![image-20220217102836068](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220217102836068.png)

- 定义：Java的异常体系提供了一种机制，使得程序可以在遇到错误或异常时进行相应的处理，保证程序的稳定性和可靠性。程序员可以通过try-catch-finally语句来捕获和处理异常，以及通过throw和throws语句来抛出异常和声明方法可能会抛出的异常。
- Error是指在程序运行期间发生的不可恢复的系统错误。当程序出现Error时，通常无法处理，只能让程序终止运行。
  - OutOfMemoryError: Java堆空间溢出
  - NoSuchMethodError: 未找到方法
  - NoClassDefFoundError: 找不到类定义
  - ExceptionInInitializerError: 静态初始化块引发的异常
  - LinkageError: 连接错误。
- Exception是指在程序运行期间发生的可恢复的异常，例如输入错误、网络连接中断等。Exception包括两种类型：
  - Checked Exception在代码中需要进行异常处理，否则会编译错误。
    - IOException: 输入/输出异常
    - ClassNotFoundException: 找不到类异常
    - SQLException: SQL异常
    - ParseException: 解析异常
    - InterruptedException: 中断异常。
  - Runtime Exception通常是由于程序代码逻辑错误造成的，例如数组越界、空指针引用等。Runtime Exception可以不进行异常处理，但如果不处理，程序会在运行时抛出异常并终止运行。
    - NullPointerException: 空指针异常
    - ArrayIndexOutOfBoundsException: 数组下标越界异常
    - IllegalArgumentException: 非法参数异常
    - ClassCastException: 类型转换异常
    - ArithmeticException: 算术异常。


### Exception

* 在Java中，可以在方法声明中使用throws关键字来声明该方法可能抛出的异常。但是，并不是所有情况下都需要使用throws关键字来声明异常。以下情况下可以省略throws关键字（但是在实际开发中建议尽可能使用throws关键字声明可能抛出的异常，以便提高代码的可读性和可维护性。）：
  -  方法声明的异常类型为RuntimeException或其子类，这些异常通常被称为非受检异常，不需要在方法声明中使用throws关键字声明。
  -  方法不会抛出任何异常，或者方法中的异常已经被处理或转化为非受检异常，这种情况下也可以省略throws关键字。
  -  方法重写父类方法时，可以不使用throws关键字声明与父类方法相同的异常，但是如果方法声明了父类方法没有声明的异常，则需要使用throws关键字声明这些异常。
  -  接口方法不能声明任何异常，因此在实现接口方法时不需要使用throws关键字声明异常。
- 运行时异常通常是由程序逻辑错误引起的，例如空指针异常、数组越界异常等。这些异常通常发生在程序运行时，而不是在编译时。由于这些异常在程序运行时才会被抛出，因此在方法声明中使用throws关键字声明这些异常并不能提高代码的安全性，反而会增加代码的冗余性和复杂性。

```java
package note;  
  
/**  
 * @Description 异常的基本使用  
 * @Author Noby  
 * @Date 2023/3/18 17:44  
 */public class ExceptionNote {  
    public static void main(String[] args) {  
        //region 对于直接发生在main中且没有try catch的处理，会直接交给将异常抛给jvm，jvm会终止程序。如果异常经过try catch，将会继续运行程序  
//        System.out.println(100 / 0);  
        //endregion        //region ArithmeticException 数学运算异常  
        try {//如果程序发生异常且没有被处理，将会将异常抛给jvm，jvm会终止程序  
            System.out.println(500 / 0);  
            System.out.println("发生异常后，try中的异常代码后的代码不执行");  
        } catch (ArithmeticException e) {//当一个try catch中存在多个catch时，执行其中一个catch后其他catch就不会继续执行  
            //catch中写出处理异常的方式  
            e.printStackTrace();//printStacktrace() 将异常信息打印出来  
        } catch (Exception e) {//多个catch捕获多个异常，且子类异常在前,可以捕获Exception及其子类的异常  
            System.out.println("这是一个Exception异常");  
        } finally {  
            System.out.println("finally中的代码不管异常是否发生都要执行的");  
        }  
        //endregion  
  
        //region NullPointerException 空指针异常 ArrayIndexOutOfBoundsException 越界异常  
        int[] arr = {1, 2, 3};  
        try {  
            method(arr, 3);  
        } catch (NullPointerException | ArrayIndexOutOfBoundsException ex) {  
            ex.printStackTrace();//处理空指针异常和越界异常的方式，打印  
        }  
  
        //endregion  
  
        //region ClassCastException 类型转换异常  
        try {  
            A b = new B();  
            B b1 = (B) b;  
            C b2 = (C) b;//ClassCastException 类型转换异常 b为B类型不能强转为C  
        } catch (ClassCastException e) {  
            e.printStackTrace();  
        }  
        //endregion  
  
  
    }  
  
    /**  
     * 异常的抛出和传递  
     * 发生异常时，可通过throw抛出到方法的调用者（对于需要抛出的异常，需要在方法定义时给予声明），也可通过try catch处理异常  
     * 对于运行时异常，在程序运行时才会被抛出，因此在方法声明中使用throws关键字声明这些异常并不能提高代码的安全性，反而会增加代码的冗余性和复杂性。可以在方法中省略运行时异常的声明。  
     * 编译时异常不可省略异常的声明  
     * @param arr  
     * @param i  
     * @throws NullPointerException  
     * @throws ArrayIndexOutOfBoundsException  
     */    static void method(int[] arr, int i) throws NullPointerException{//声明可能产生的异常，运行时异常可以省略抛出  
        //region throw 搭配 if-else 语句可用于异常的手动抛出。对于系统自带的异常，可以自动抛出（即只需在方法声明即可，出现异常自动抛出）  
        if (arr == null) {  
            throw new NullPointerException("自定义信息");//抛出一个空指针异常对象，并显示自定义提示信息，抛出异常表示让方法调用者处理  
        }  
        //这里的索引越界为系统异常，可省略抛出（上面的NullPointerException也可省略）  
//        else if (arr.length - 1 < i || i < 0) {  
//            throw new ArrayIndexOutOfBoundsException("手动抛出");//异常的创建用throw，异常的声明用throws  
//        }  
        else {  
            System.out.println(arr[i]);  
        }  
        //endregion  
  
        //region try-catch语句用于异常的处理  
//        try {  
//            System.out.println(arr[i]);  
//        } catch (NullPointerException e) {  
//            e.printStackTrace();  
//        } catch (ArrayIndexOutOfBoundsException e) {  
//            e.printStackTrace();  
//        }  
        //endregion    }  
}  
  
  
class A {  
    void method() throws Exception {  
    }  
}  
  
/**  
 * @Description 异常在两个重写方法中的关系  
 * 重写方法的异常范围小于等于被重写方法  
 * @Author Noby  
 * @Date 2023/3/18 17:45  
 */class B extends A {  
    @Override  
    void method() throws NullPointerException {  
    }  
}  
  
/**  
 * @Description 类型转换异常  
 * @Author Noby  
 * @Date 2023/3/18 18:36  
 */class C extends A {  
}
```


### 自定义异常

```java
package note;  
/**  
 * @Description 自定义异常的使用  
 * 自定义异常必须手动抛出，自动抛出的异常必须为系统自带的  
 * 主动抛出：异常通过throw关键字被手动抛出  
 * 被动抛出：程序中没有通过throw关键字自动抛出  
 * @Author Noby  
 * @Date 2023/3/18 18:40  
 */public class CustomExceptionNote {  
    public static void main(String[] args) {  
        try {  
            System.out.println(1/0);//自动抛出异常  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
  
        try {  
            throw new MyThrowable();//主动抛出异常(自定义异常只能通过主动抛出)  
        } catch (Exception myThrowable) {  
            myThrowable.printStackTrace();  
        }  
    }  
}  
  
/**  
 * @Description 自定义异常  
 * @Author Noby  
 * @Date 2023/3/18 19:47  
 */class MyThrowable extends Exception {//继承Exception的自定义异常，常用该方法定义自定义异常  
    public MyThrowable() {  
        super("自定义异常1");//调用Exception的构造方法，传入的参数为异常的打印信息  
    }  
    public MyThrowable(String info) {  
        super(info);  
    }  
}
```
