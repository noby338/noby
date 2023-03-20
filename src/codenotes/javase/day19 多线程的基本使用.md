---
title: day19 多线程的基本使用
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
## 多线程

- 进程：一个运行的程序，是系统进行资源分配和调用的独立单位
- 线程：进程中的单个顺序控制流，是一条执行路径
  - 单线程：一个进程只有一个执行路径
  - 多线程：一个进程有多个执行路径
- 并发：同一个时刻，多个任务交替执行
- 并行：同一个时刻，多个任务同时执行
- 锁池（Lock Pool）：是指一种用于存储已经被线程获取但还未被释放的锁对象的数据结构。每个锁对象都有一个关联的锁池，用于存储等待获取该锁对象的线程。当一个线程请求获取一个已经被其他线程占用的锁对象时，它会被放入该锁对象的锁池中等待，直到该锁对象被释放。
- 线程的调度模型
  - 分时调度模型：多个任务交替执行的过程中，所有线程轮流获得CPU的使用权，平均分配每个线程占用CPU的时间片
  - 抢占式调度模型：多个任务交替执行的过程中，线程的执行是操作系统底层控制，具有随机性，优先级高的线程抢占到执行权的概率越高，同时获取的CPU时间片相对多一些(不一定优先级高的线程先执行完)。
  - Java使用的是抢占式调度模型
- 线程的生命周期(java官方)：
  - new新建：线程刚被创建，但是并未启动。
  - runnable可运行：线程已经调用了start()等待CPU调度
  - blocked锁阻塞：线程在执行的时候未竞争到锁对象，则该线程进入Blocked状态；
  - waiting无限等待：一个线程进入Waiting状态，另一个线程调用notify或者notifyAll,方法才能够唤醒
  - timed_waitting计时等待：同waiting状态，有几个方法有超时参数，调用他们将进入Timed Waiting状态。带有超时参数的常用方法有Thread.sleep、Object.wait。
  - terminated被终止：因为run方法正常退出而死亡，或者因为没有捕获的异常终止了run方法而死亡。

  ![image-20221002220858674](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221002220858674.png)



* 线程的生命周期(其他常用)

  * 新建状态:使用 **new** 关键字和 **Thread** 类或其子类建立一个线程对象后，该线程对象就处于新建状态。它保持这个状态直到程序 **start()** 这个线程。
  * 就绪状态:当线程对象调用了start()方法之后，该线程就进入就绪状态。就绪状态的线程处于就绪队列中，要等待JVM里线程调度器的调度。
  * 运行状态:如果就绪状态的线程获取 CPU 资源，就可以执行 **run()**，此时线程便处于运行状态。处于运行状态的线程最为复杂，它可以变为阻塞状态、就绪状态和死亡状态。
  * 阻塞状态:如果一个线程执行了sleep（睡眠）、suspend（挂起）等方法，失去所占用资源之后，该线程就从运行状态进入阻塞状态。在睡眠时间已到或获得设备资源后可以重新进入就绪状态。可以分为三种：
    * 等待阻塞：运行状态中的线程执行 wait() 方法，使线程进入到等待阻塞状态，线程进入等待池。
    * 同步阻塞：线程在获取 synchronized 同步锁失败(因为同步锁被其他线程占用)，线程进入锁池。
    * 其他阻塞：通过调用线程的 sleep() 或 join() 发出了 I/O 请求时，线程就会进入到阻塞状态。当sleep() 状态超时，join() 等待线程终止或超时，或者 I/O 处理完毕，线程重新转入就绪状态。
  * 死亡状态:一个运行状态的线程完成任务或者其他终止条件发生时，该线程就切换到终止状态。

  <img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220111152608673.png" alt="image-20220111152608673" style="zoom:200%;" />

### Thread类

* 特点：
  - 扩展性差，继承了Thread类之后就不能再继承其他的类
  - 代码简单，也可以直接使用Thread线程类中的方法

* 注意：
  * 直接调用run()方法会当成普通方法执行，只有调用start()方法才是启动一个新的线程
  * 同时存在主线程任务和子线程任务时，将子线程任务放在前面，否则永远是先执行完主线程任务(主线程任务执行时还没有开启子线程)

```java
package note;  
  
/**  
 * 使用Thread类实现多线程  
 *  
 * 优点：代码简单  
 * 缺点：在继承Thread类后不可继承其他类，扩展性差  
 */  
public class ThreadNote {  
  
    public static void main(String[] args) {  
  
        //region 构造  
        Thread myThread = new MyThread();  
        System.out.println(new MyThread("构造方法设置线程名").getName());  
        //endregion  
  
        //region 多线程开启 start 方法，底层使用c和c++调用操作系统的方法(start0())，开启多线程执行run方法  
        //直接调用run()方法会当成普通方法执行，只有调用start()方法才是启动一个新的线程  
        myThread.start();  
        //endregion  
  
        //region 主线程  
        //同时存在主线程任务和子线程任务时，将子线程任务放在前面，否则永远是先执行完主线程任务(主线程任务执行时还没有开启子线程)  
        for (int i = 0; i < 100; i++) {  
            System.out.println(Thread.currentThread().getName() + i);//Thread.currentThread()获取当前线程对象  
        }  
        //endregion  
  
        //region 成员方法, 静态方法  
        myThread.setName("支线程0");//设置线程名  
        System.out.println(myThread.getName());//获取线程名  
        System.out.println("myThread.getPriority() = " + myThread.getPriority());//获取优先级，默认为5，最高位10  
        myThread.setPriority(1);//设置优先级(1——10)，优先级越大，抢占到CPU资源的概率大  
        try {  
            Thread.sleep(1000);//线程休眠，休眠当前运行的线程，休眠后没有抢占CPU资源的权限，时间结束后恢复权限  
        } catch (InterruptedException e) {  
            e.printStackTrace();  
        }  
        System.out.println("线程休眠结束");  
  
        Thread.yield();//线程礼让：让出当前线程，让所有线程重新抢占CPU资源。  
        try {  
            myThread.join();//线程加入：强行让当前线程获取CPU资源，在当前线程执行完成后，再释放抢占CPU执行权限  
        } catch (InterruptedException e) {  
            e.printStackTrace();  
        }  
        myThread.setDaemon(true);//设置守护线程，守护线程在其他非守护线程结束时随之结束  
        /*  
        守护线程结束也需要一定的时间，而非立即结束  
         */        myThread.interrupt();//中断线程  
        //endregion  
  
        /*        main()是入口方法，进入main()，即会开启主线程。  
        主线程中还可以开启其他线程，主线程执行结束，进程不会结束，进程要等所有线程执行结束才会结束。  
         */    }  
}  
  
class MyThread extends Thread {//定义一个可以开启多线程的类  
    public MyThread(String name) {  
        super(name);//Thread类中的构造方法可以传入线程名  
    }  
    public MyThread(){}  
    @Override  
    public void run() {  
        for (int i = 0; i < 100; i++) {  
            System.out.println(getName() + i);//Thread中有getName方法，getName()为this.getName()的简写  
        }  
    }  
}
```

### Runable接口(用的最多)

* 特点
  1. 扩展性好，在实现一个接口的同时还可以继承其他的类
  1. 代码复杂不能直接使用Thread线程内中的方法


```java
package note;  
  
/**  
 * 使用Runnable接口开启多线程  
 *  
 * 优点：实现Runnable接口的同时，还可以继承其他类，可扩展性好，操作共享数据方便  
 * 缺点：代码复杂，不可获得任务的返回值  
 */  
public class RunnableNote {  
    public static void main(String[] args) {  
        MyRunnable2 myRunnable2 = new MyRunnable2();  
        Thread thread = new Thread(myRunnable2,"T1");  
        thread.start();  
  
        MyRunnable2 myRunnable22 = new MyRunnable2();  
        Thread thread2 = new Thread(myRunnable22,"T2");  
        thread2.start();  
  
    }  
}  
  
class MyRunnable2 implements Runnable{  
    @Override  
    public void run() {  
        for (int i = 0; i < 1000; i++) {  
            System.out.println(Thread.currentThread().getName());  
        }  
    }  
}
```

### Callable接口

* 相较于Runnable可以有返回线程执行的结果

```java
package note;  
  
import java.util.concurrent.Callable;  
import java.util.concurrent.FutureTask;  
  
/**  
 * 使用callable接口和FutureTask类实现具有任务返回值的多线程  
 *  
 * 优点：相较于Runnable可获得多线程任务的返回值  
 * 缺点：代码复杂  
 */  
public class CallableNote {  
    public static void main(String[] args) throws Exception {  
        //region 第一个线程  
        //3、创建任务对象  
        MyCallable myCallable = new MyCallable(10);  
        //4、创建FutureTask对象  
        FutureTask<String> futureTask = new FutureTask<>(myCallable);//FutureTask中文未来任务  
        //5、创建Tread对象  
        Thread thread = new Thread(futureTask);  
        //6、调用Thread.start()方法  
        thread.start();  
        //7、调用futureTask.get()方法获取任务返回的结果，  
        //如果futureTask任务没有执行完毕，这里的代码会等待，直到线程myCallable跑完才提取结果。  
        System.out.println("futureTask.get() = " + futureTask.get());  
        //endregion 第一个线程  
  
  
        //region 第二个线程  
        MyCallable myCallable2 = new MyCallable(100);  
        FutureTask<String> futureTask2 = new FutureTask<>(myCallable2);  
        Thread thread2 = new Thread(futureTask2);  
        thread2.start();  
        System.out.println("futureTask2.get() = " + futureTask2.get());  
        //endregion 第二个线程  
    }  
}  
  
/**  
 * 1、定义一个实现Callable接口的任务类  
 */  
class MyCallable implements Callable<String> {  
    private int n;  
  
    public MyCallable(int n) {  
        this.n = n;  
    }  
  
    /**  
     * 2、重写call()任务方法  
     *  
     * @return  
     */  
    @Override  
    public String call() {  
        int sum = 0;  
        for (int i = 1; i <= n; i++) {  
            sum = sum + i;  
        }  
        return "计算的结果为：" + sum;  
    }  
}

```



### 线程安全

* CPU执行线程的时候，每一个时间点只能执行一个基本的指令，多线程执行的过程中，一个线程执行一条指令，下一个时刻，可能会被另一个线程抢到CPU执行
* 指令不等同与语句，一条语句对应多个指令；
* 线程不安全原因：执行的过程中，指令被打断
* 满足以下条件会有线程不安全
  - 存在多线程
  - 访问共享数据
  - 有语句修改共享数据

### 同步锁

* 锁对象的使用
  * 使用共享资源为锁对象
    * 成员方法一般使用this作为锁对象
    * 静态方法一般使用字节码对象(类名.class)为锁对象

#### 同步代码块

```java
package note;  
  
/**  
 * 同步代码块实现锁功能  
 *  
 * 该方法相对比同步方法，灵活度更高，性能更好，锁的范围可设置得更小  
 */  
public class SynchronizedNote {  
    public static void main(String[] args) {  
        Ticket ticket = new Ticket();  
        Thread thread = new Thread(ticket);  
        Thread thread1 = new Thread(ticket);  
        Thread thread2 = new Thread(ticket);  
        thread.start();  
        thread1.start();  
        thread2.start();  
    }  
}  
  
class Ticket implements Runnable {  
    int num = 100;  
  
    @Override  
    public void run() {  
        while (true) {  
            synchronized (this) {//this对象为锁对象(可以为任意对象，但是实现锁功能的每个线程都要是同一对象，一般设置为共享资源)  
                if (num > 0) {  
                    System.out.println(Thread.currentThread().getName() + ":" + num--);  
                } else break;  
            }  
        }  
    }  
}
```

#### 同步方法

```java
package note;  
  
/**  
 * 同步方法实现锁功能  
 *  
 * 该方法相对同步代码块更加简单可读性高，但锁的范围不够灵活，效率不如同步代码块  
 */  
public class SynchronizedNote2 {  
  
    public static void main(String[] args) {  
        Ticket1 ticket1 = new Ticket1();  
        Thread thread = new Thread(ticket1);  
        Thread thread1 = new Thread(ticket1);  
        Thread thread2 = new Thread(ticket1);  
        thread.start();  
        thread1.start();  
        thread2.start();  
    }  
}  
  
class Ticket1 implements Runnable {  
    int num = 100;  
  
    @Override  
    public void run() {  
        while (num > 0) {  
            method();  
        }  
    }  
  
    /*  
    同步方法中成员方法的锁对象为this，静态方法的锁对象为当前类的字节码文件对象  
     */    private synchronized void method() {  
        if (num > 0) {  
            System.out.println(Thread.currentThread().getName() + ":" + num--);  
        }  
    }  
}
```

#### 静态同步方法

```java
package note;

public class SynchronizedNote3 {//静态同步方法
    public static void main(String[] args) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                while(true) {
                    Print.print1();
                }
            }
        }).start();
        
        new Thread(new Runnable() {
            @Override
            public void run() {
                while(true) {
                    Print.print2();
                }
            }
        }).start();
    }
}

class Print {

    public static synchronized void print1() {//静态同步方法中，synchronized的锁对象为Print的对象(即为Print.class)
        System.out.print("人");
        System.out.print("生");
        System.out.print("若");
        System.out.print("只");
        System.out.print("如");
        System.out.print("初");
        System.out.println("见");
    }

    public static void print2() {
        synchronized(Print.class) {//Print.class即为Print类的对象
            System.out.print("何");
            System.out.print("事");
            System.out.print("秋");
            System.out.print("风");
            System.out.print("悲");
            System.out.print("画");
            System.out.println("扇");
        }
    }
}

```

#### lock锁

```java
package note;  
  
import java.util.concurrent.locks.ReentrantLock;  
  
/**  
 * ReentrantLock类实现锁功能  
 *  
 * 相比较其他两种方法更加灵活高级，其可在同步代码内出现异常时仍然可以释放锁  
 */  
public class SynchronizedNote3 {  
  
    public static void main(String[] args) {  
        Ticket2 ticket2 = new Ticket2();  
        Thread thread = new Thread(ticket2);  
        Thread thread1 = new Thread(ticket2);  
        Thread thread2 = new Thread(ticket2);  
        thread.start();  
        thread1.start();  
        thread2.start();  
    }  
}  
  
class Ticket2 implements Runnable {  
    int num = 100;  
    ReentrantLock lock = new ReentrantLock();  
  
    @Override  
    public void run() {  
        while (num > 0) {  
            lock.lock();  
            try {  
                if (num > 0) {  
                    System.out.println(Thread.currentThread().getName() + ":" + num--);  
                }  
                int i = 1/0;  
            } catch (Exception e) {  
                e.printStackTrace();  
            } finally {  
                lock.unlock();  
            }  
        }  
    }  
}
```






