---
title: day21 定时器、线程池、网络编程
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
## timer

- 定时器：可以定时执行一些任务

```java
package note;

import java.util.Timer;
import java.util.TimerTask;

public class TimerNote {//定时器
    public static void main(String[] args) {
        //region 构造
        Timer timer = new Timer();
        //endregion

        //region 添加任务
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                print();
            }
        }, 2000, 1000);//定时任务，延时时间，间隔时间
        //endregion


    }
    static void print(){
        System.out.println("执行了一次任务");
    }
}
```

## 线程池

- 定义：是一种线程的使用模式，它为了降低线程使用中频繁的创建和销毁所带来的资源消耗与代价。
- 原理：通过创建一定数量的线程，让他们时刻准备就绪等待新任务的到达，而任务执行结束之后再重新回来继续待命。这就是线程池最核心的设计思路。
- 相比于来一个任务创建一个线程的方式，使用线程池的优势体现在如下几点：
  1. 避免了线程的重复创建与开销带来的资源消耗代价
  2. 提升了任务响应速度，任务来了直接选一个线程执行而无需等待线程的创建
  3. 线程的统一分配和管理，也方便统一的监控和调优
- java线程池分类：
  - 使用Executors类
    - 单线程池：线程池中只有一个线程，经常用于执行需要顺序执行的任务
    - 固定线程池：线程池中的线程数量是固定不变的，经常用来限制开启线程的数量，避免程序卡顿
    - 缓存线程池：线程池中的线程数量可以自动增加、减少，执行的任务越多线程就越多，是为了尽快执行完所有任务
    - 定时线程池：作用与Timer一样

  - 使用ThreadPoolExecutor类
    - 自定义线程池：程序员根据自己的需求创建线程池




### ThreadPoolExecutor线程池

```java
package note;

import java.util.concurrent.*;

/**
 * Runnable 使用ThreadPoolExecutor线程池
 * @author Noby
 * @since 2022/10/2
 */
public class ThreadPoolNote {
    public static void main(String[] args) {
        ThreadPoolExecutor pool = new ThreadPoolExecutor(3,
                5, 6, TimeUnit.SECONDS,
                new ArrayBlockingQueue<>(5),
                Executors.defaultThreadFactory(),
                new ThreadPoolExecutor.AbortPolicy());
        //参数一：指定线程池的线程数量（核心线程）：corePoolSize
        //参数二：指定线程池可支持的最大线程数：maximumPoolSize
        //参数三：指定临时线程的最大存活时间：keepAliveTime
        //参数四：指定存活时间的单位（秒、分、时、天）：unit
        //参数五：指定任务队列：workQueue
        //参数六：指定用哪个线程工厂创建线程：threadFactory
        //参数七：指定线程忙，任务满的时候，新任务来了怎么办：handler
        //临时线程什么时候创建？
        //新任务提交时发现核心线程都在忙，任务队列也满了，并且还可以创建临时线程，此时才会创建临时线程。
        //什么时候会开始拒绝任务？
        //核心线程和临时线程都在忙，任务队列也满了，新的任务过来的时候才会开始任务拒绝。

        MyRunnable3 myRunnable3 = new MyRunnable3();

        //以下三个线程只会使用核心线程
        pool.execute(myRunnable3);
        pool.execute(myRunnable3);
        pool.execute(myRunnable3);

        //以下五个线程会放入任务队列
        pool.execute(myRunnable3);
        pool.execute(myRunnable3);
        pool.execute(myRunnable3);
        pool.execute(myRunnable3);
        pool.execute(myRunnable3);

        //以下两个线程会创建临时线程
        pool.execute(myRunnable3);
        pool.execute(myRunnable3);

        //以下线程会触发新任务拒绝策略 new ThreadPoolExecutor.AbortPolicy()，抛出异常
//        pool.execute(myRunnable3);

    }
}

class MyRunnable3 implements Runnable {

    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + ":" + i);
        }
        try {
            System.out.println(Thread.currentThread().getName() + " 线程开始休眠");
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

### Executors线程池

```java
package note;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * 通过Executors创建线程池
 * <p>
 * Executors的底层其实也是基于线程池的实现类ThreadPoolExecutor创建线程池对象的
 * 相对于ThreadPoolExecutor来说，虽然编码简单，但部分不可控，具有风险
 *
 * @author Noby
 * @since 2022/10/2
 */
public class ExecutorsNote {
    public static void main(String[] args) {
//        myNewCachedThreadPool();
//        myNewFixedThreadPool();
//        myNewSingleThreadExecutor();
        myNewScheduledThreadPool();
//        myTimer();

    }

    /**
     * 缓存线程池
     * <p>
     * 线程数量随着任务增加而增加，如果线程任务执行完毕且空闲了一段时间则会被回收掉。
     * 线程数量的最大上限为无限，可能出现内存溢出异常
     */
    static void myNewCachedThreadPool() {
        ExecutorService pool = Executors.newCachedThreadPool();
        MyRunnable4 myRunnable4 = new MyRunnable4();

        pool.execute(myRunnable4);
        pool.execute(myRunnable4);
        pool.execute(myRunnable4);
        pool.execute(myRunnable4);

        //关闭线程池
        pool.shutdown();
    }

    /**
     * 固定线程池
     * <p>
     * 创建固定线程数量的线程池，如果某个线程因为执行异常而结束，那么线程池会补充一个新线程替代它。
     * 任务队列的长度可以为无限，可能出现内存溢出异常
     */
    static void myNewFixedThreadPool() {
        ExecutorService pool = Executors.newFixedThreadPool(3);
        MyRunnable4 myRunnable4 = new MyRunnable4();

        pool.execute(myRunnable4);
        pool.execute(myRunnable4);
        pool.execute(myRunnable4);
        pool.execute(myRunnable4);

        //关闭线程池
        pool.shutdown();
    }

    /**
     * 单线程池
     * <p>
     * 创建只有一个线程的线程池对象，如果该线程出现异常而结束，那么线程池会补充一个新线程。
     * 任务队列的长度可以为无限，可能出现内存溢出异常
     */
    static void myNewSingleThreadExecutor() {
        ExecutorService pool = Executors.newSingleThreadExecutor();
        MyRunnable4 myRunnable4 = new MyRunnable4();

        pool.execute(myRunnable4);
        pool.execute(myRunnable4);
        pool.execute(myRunnable4);
        pool.execute(myRunnable4);

        //关闭线程池
        pool.shutdown();
    }

    /**
     * 定时线程池
     * <p>
     * 创建一个线程池，可以实现在给定的延迟后运行任务，或者定期执行任务。
     * 线程数量的最大上限为无限，可能出现内存溢出异常
     */
    static void myNewScheduledThreadPool() {
        //参数: 核心线程数量(超过核心线程数量时会自动创建临时线程)
        ScheduledExecutorService pool = Executors.newScheduledThreadPool(2);

        // 添加任务
        // 参数1：执行的任务 TimerTask为Runnable接口的实现类(可传入Runnable接口的其他实现类)
        // 参数2：延时调度时间
        // 参数3：周期调度时间
        // 参数4：时间单位
        pool.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + "执行AAA~~~" + new Date());
            }
        }, 0, 1, TimeUnit.SECONDS);

        //此任务中的异常不会导致其他线程的定时任务死掉。
        pool.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + "执行BBB~~~" + new Date());
                int i = 1 / 0;
            }
        }, 0, 1, TimeUnit.SECONDS);

        //此任务中的延时不会导致其他线程中的任务不准时。
        pool.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + "执行CCC~~~" + new Date());
                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, 0, 1, TimeUnit.SECONDS);

    }

    /**
     * Timer定时器
     * <p>
     * 是定时器线程池的单线程简化
     * <p>
     * Timer是单线程，处理多个任务按照顺序执行，存在延时与设置定时器的时间有出入。
     * 可能因为其中的某个任务的异常使Timer线程死掉，从而影响后续任务执行。
     */
    static void myTimer() {
        Timer timer = new Timer();


        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + "执行AAA~~~" + new Date());

            }
        }, 0, 2000);


        //此任务中的异常会导致Timer线程死掉，从而影响其他任务执行。
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + "执行BBB~~~" + new Date());
                System.out.println(10 / 0);
            }
        }, 0, 2000);

        //此任务中的延时会导致Timer线程中其他任务的不准时。
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + "执行CCC~~~" + new Date());
                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, 0, 2000);
    }
}

class MyRunnable4 implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + ":" + i);
        }
//        try {
//            System.out.println(Thread.currentThread().getName() + " 线程开始休眠");
//            Thread.sleep(10000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
    }
}

```

## 网络编程

三要素

* IP地址：计算机的唯一标识，它是通过本地网络和本计算机综合计算得到的

  * PIV4:互联网通信协议版本4（英语：**I**nternet **P**rotocol **v**ersion **4**，IPv4）
    * 32位二进制输入(10010001.  10010001. 10010001. 10010001 )
    * 点分十进制：(100.4.5.6)
  * PIV6:
    * 128位(10010001.  10010001. 10010001. 10010001. 10010001.  10010001. 10010001. 10010001. 10010001.  10010001. 10010001. 10010001. 10010001.  10010001. 10010001. 10010001)
    * 冒分十六进制((ABCD:EF01:2345:6789:ABCD:EF01:2345:6789)
  * 查询:ipconfig 和 ipconfig -all 

* 端口号

  * 应用程序的唯一标识
  * 0-65535(0-1024，部分默认应用的端口号，自定义端口号应使用1024后的端口号)
  * 但两个端口号相同的应用打开时，后打开的应用将无法使用
    * 解决方案
      * 换端口号
      * 关闭之前应用端口
        * PID(进程ID)
        * netstat -ano

* 协议(protocol)

  * 通信约定(网络通信协议)
  * 体现在数据包的格式上

* OSI网络七层模型

   OSI（开放式系统互联 Open System Interconnection ）

   OSI是Open System Interconnection的缩写，意为开放式系统互联。国际标准化组织（ISO）制定了OSI模型，该模型定义了不同计算机互联的标准，是设计和描述计算机网络通信的基本框架。OSI模型把网络通信的工作分为7层，分别是物理层、数据链路层、网络层、传输层、会话层、表示层和应用层。

![image-20220224234202210](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220224234202210.png)





### InetAddress

```java
package note;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class InetAddressNote {
    public static void main(String[] args) throws UnknownHostException {
        InetAddress localHost = InetAddress.getLocalHost();//获取本机地址
        InetAddress mycomputer = InetAddress.getByName("LAPTOP-TB48V8LU");//根据主机名获取地址
        InetAddress woniuName = InetAddress.getByName("www.woniuxy.com");//根据域名获取地址
        InetAddress woniuIp = InetAddress.getByName("101.37.65.91");//根据ip获取地址

        System.out.println("localHost = " + localHost);
        System.out.println("mycomputer = " + mycomputer);
        System.out.println("woniu = " + woniuName);
        System.out.println("woniuIp = " + woniuIp);
    }
}
```

### UDP协议

* 广播地址：在局域网中有一个地址，如果将消息发送到该地址，那么局域网内所有的设备都能收到，(默认为xxx.xxx.xxx.255)

```java
package note;

import java.io.IOException;
import java.net.*;

public class UDPSendNote {//数据报协议,发送端
    public static void main(String[] args) throws IOException {
        String info = "How are you?";
        //1、创建套接字
        DatagramSocket datagramSocket = new DatagramSocket();//DatagramSocket实现UDP协议
        //2、获取数据报
        DatagramPacket datagramPacket = new DatagramPacket(info.getBytes(),info.getBytes().length, InetAddress.getLocalHost(),11111);
        //3、发送数据
        datagramSocket.send(datagramPacket);
        //4、关闭套接字
        datagramSocket.close();
    }
}
```

```java
package note;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;

public class UDPReceiveNote {
    public static void main(String[] args) throws IOException {
        //1、创建套接字
        DatagramSocket datagramSocket = new DatagramSocket(11111);
        //2、创建数据报
        byte[] bytes = new byte[1024];
        DatagramPacket datagramPacket = new DatagramPacket(bytes,bytes.length);
        //3、获取数据
        datagramSocket.receive(datagramPacket);//receive方法：阻塞方法，没接收到任何数据时就等待消息，程序暂停执行
        //4、关闭套接字
        datagramSocket.close();

        System.out.println(new String(bytes,0,datagramPacket.getLength()));//packet.getLength() 获取接收到数据的长度
    }
}
```

### TCP协议

```java
package note;


import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class TCPServerNote {
    public static void main(String[] args) throws Exception{
        ServerSocket serverSocket = new ServerSocket(11111);
        Socket socket = serverSocket.accept();
        byte[] bytes = new byte[1024];
        InputStream inputStream = socket.getInputStream();
        int len = inputStream.read(bytes);
        System.out.println(new String(bytes, 0, len));
        socket.close();
        serverSocket.close();

    }
}
```

```java
package note;

import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;

public class TCPClientNote {
    public static void main(String[] args) throws Exception{
        Socket socket = new Socket(InetAddress.getLocalHost(), 11111);//Socket底层实现了TCP协议
        String info = "TCPInfo";
        OutputStream outputStream = socket.getOutputStream();
        outputStream.write(info.getBytes());
        socket.close();
    }
}
```

###  UDP与TCP的区别

 * UDP无连接协议(源端和终端不建立连接)、TCP有连接(源端和终端建立连接)

    * UDP发送数据时不需要建立连接，直接将数据发送到网络上就行，不考虑接收方是否能接受消息
    * TCP必须建立连接，否则无法发送数据，通过三次握手建立连接

 * UDP不可靠、TCP可靠。UDP不安全、TCP安全

    * UDP只管发，接收方是否能收到无所谓，可能会造成数据丢失问题
    * TCP发送完数据之后需要等待服务端确认，如果没收到确认信息会重复发送数据，收到之后会继续发送下一个数据

 * UDP传输效率高，TCP相对较低

    * UDP只管发不需要等待接收端返回确认消息，而TCP每次发送数据之后都需要等待服务端返回确认消息

   

 * UDP、TCP的使用场景

    * UDP：通知、广播
    * TCP：实时数据传输、web项目（http协议基于tcp实现的）



### TCP协议的三次招手，四次挥手

<img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220224234607226.png" alt="image-20220224234607226" style="zoom:67%;" />

![image-20220224234837656](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220224234837656.png)
