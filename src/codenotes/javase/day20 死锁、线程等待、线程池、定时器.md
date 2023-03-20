---
title: day20 死锁、线程等待、线程池、定时器
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

### 死锁

定义：是指两个或两个以上的进程(线程)在执行过程中,因争夺资源而造成的一种互相等待的现象,若无外力作用,它们都将无法推进下去。此时称系统处于死锁状态或系统产生了死锁,这些永远在互相等待的进程(线程)称为死锁进程(线程)

死锁解决方案：

1. 杀掉其中一个线程
2. 避免死锁发生

```java
package note;

/**
 * @Description 死锁现象
 * 死锁产生的条件：多个线程争夺多个资源，并且因争夺资源相互等待
 * 在发生死锁的外面加上一把锁，可避免死锁的发生
 * @Author Noby
 * @Date 2023/3/19 1:12
 */public class DeadlockNote {

    public static void main(String[] args) {
        //region
        MyRunnable a = new MyRunnable("哲学家A");
        MyRunnable b = new MyRunnable("哲学家B");

        new Thread(a).start();
        new Thread(b).start();
        //endregion

    }
}

class MyRunnable implements Runnable {
    private String name;

    public MyRunnable(String name) {
        super();
        this.name = name;
    }

    @Override
    public void run() {
        while (true) {
//            synchronized ("要拿拿两双") {
                if ("哲学家A".equals(name)) {
                    synchronized ("拿左筷子") {
                        System.out.println(name + "拿到了左筷子，准备拿右筷子");
//                    Thread.currentThread().stop();//此方法可以杀死线程，同样可以跳出死锁，但不推荐
                        synchronized ("拿右筷子") {
                            System.out.println(name + "拿到了右筷子，开吃");
                        }
                    }
                } else {
                    synchronized ("拿右筷子") {
                        System.out.println(name + "拿到了右筷子，准备拿左筷子");
                        synchronized ("拿左筷子") {
                            System.out.println(name + "拿到了左筷子，开吃");
                        }
                    }
                }
//            }
            System.out.println(name + "拿筷子结束");
        }
    }
    /*
    死锁解决方案：
    1. 杀掉其中一个线程
    2. 避免死锁发生（代码优化，再加一把锁）
     */}
```

### 多线程实现等待唤醒机制

- 生产者消费者模式
  - 供不应求：对于消费者无法及时得到自己想要的东西
  - 供过于求：生产的速度快于消费的速度
  - 最理想的模式：生产等于消费

```java
package note;
/**
 * @Description 利用锁实现生产者消费者模式
 * @Author Noby
 * @Date 2023/3/19 1:12
 */public class ProducerConsumerNote {

    public static void main(String[] args) {
        ProducerConsumer producerConsumer = new ProducerConsumer("汽车");
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 50; i++) {
                    producerConsumer.consumer();
                }
            }
        },"消费线程");
        Thread thread2 = new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 50; i++) {
                    producerConsumer.producer();
                }
            }
        },"生产线程");

        thread.start();
        thread2.start();

    }
}

class ProducerConsumer{
    public String name;//商品的名字
    public int id = 1;//商品的编号
    public boolean isHaveProduct = false;//标记是否有商品

    public ProducerConsumer(String name) {
        this.name = name;
    }

    //无商品生产
    public synchronized void producer() {//模拟生产者
        if (isHaveProduct) {//有商品就执行等待，等待执行消费后唤醒
            try {
                wait();//object 方法，让线程阻塞，当线程被唤醒才能进入就绪状态
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("生产者生产了一个" + name + "  id:" + id++);
        isHaveProduct = true;
        notify();
//        notifyAll();//唤醒所有阻塞状态的线程
    }

    //有商品消费
    public synchronized void consumer() {//模拟消费者
        if (!isHaveProduct) {//没有商品就执行等待，等待执行生产后唤醒
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("消费者消费了一个" + name + "  id:" + id);
        isHaveProduct = false;
        notify();
//        notifyAll();
    }
}
```

### 守护线程

```java
package note.senior;

/**
 * 守护线程
 *
 * 其他线程全部执行结束，守护线程自动结束
 * @author Noby
 * @since 2022/10/3
 */public class DaemonNote {
    public static void main(String[] args) {
        Thread thread0 = new Thread() {
            @Override
            public void run() {
                for (int i = 0; i < 50; i++) {
                    System.out.println(Thread.currentThread().getName() + ": " + i);
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };

        Thread thread1 = new Thread() {
            @Override
            public void run() {
                for (int i = 0; i < 20; i++) {
                    System.out.println(Thread.currentThread().getName() + ": " + i);
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }

            }
        };

        Thread thread2 = new Thread("守护线程") {
            @Override
            public void run() {
                for (int i = 0; i < Integer.MAX_VALUE; i++) {
                    System.out.println(Thread.currentThread().getName() + ": " + i);
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }

            }
        };


        thread2.setDaemon(true);
        thread0.start();
        thread1.start();
        thread2.start();

        System.out.println("main方法");
    }
}
```

### 线程中断

```java
package note.senior;

/**
 * 线程的中断 成员方法interrupt()
 * * 所有的线程都可以中断，中断的线程必须进行异常的处理
 * @author Noby
 * @since 2022/10/2
 */public class InterruptNote {
    public static void main(String[] args) {
        Thread thread = new Thread() {
            @Override
            public void run() {
                System.out.println("开始休眠");
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {//中断异常
                    e.printStackTrace();
                    System.out.println("休眠被中断");
                }
                System.out.println("休眠结束");
            }
        };
        thread.start();

        if (!thread.isInterrupted()) {
            thread.interrupt();
        }
    }
}
```

#### 使用布尔变量实现线程停止

```java
package note.senior;

/**
 * 如何优雅地停止一个线程
 *
 * @author Noby
 * @since 2022/10/3
 *///停止多线程：public void stop();
//销毁多线程：public void destroy();
//挂起线程(暂停执行)：public final void suspend();
//恢复挂起的线程执行：public final void resume();
//之所以废除掉这些方法，主要的原因是因为这些方法有可能导致线程的死锁
public class Stop {
    public static boolean flag = true;
    public static void main(String[] args) {
        new Thread(){
            @Override
            public void run() {
                long num = 0;
                while (flag) {
                    try {
                        Thread.sleep(50);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println(Thread.currentThread().getName() + "正在运行 num = " + num++);
                }
            }
        }.start();

        try {
            Thread.sleep(200);//运行200毫秒
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        flag = false;//停止线程
    }
}
```

### 线程强制加入

```java
package note.senior;

/**
 * 线程的强制执行
 *
 * join()方法用于等待一个线程执行完毕。当一个线程调用另一个线程的join()方法时，它会被阻塞，直到被调用的线程执行完毕。
 * 具体来说，如果线程A调用了线程B的join()方法，那么线程A将会被挂起，直到线程B执行完毕。在这个过程中，线程A会进入等待状态，并释放CPU资源，直到线程B执行完毕后，线程A才会继续执行。
 * @author Noby
 * @since 2022/10/2
 */public class JoinNote {
    public static void main(String[] args) {
        Thread thread0 = new Thread() {
            @Override
            public void run() {
                for (int i = 0; i < 100; i++) {
                    System.out.println(Thread.currentThread().getName() + ": " + i);
                }
            }
        };

        Thread thread1 = new Thread() {
            @Override
            public void run() {
                for (int i = 0; i < 100; i++) {
                    System.out.println(Thread.currentThread().getName() + ": " + i);
                }
            }
        };


        Thread thread2 = new Thread() {
            @Override
            public void run() {
                for (int i = 0; i < 100; i++) {
                    System.out.println(Thread.currentThread().getName() + ": " + i);
                    if (i == 3) {
                        try {
                            System.out.println("开始"+thread0.getName()+"线程的强制执行!");
                            thread0.join();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        };

        //线程thread2相对线程thread0执行完之前等待，所以thread1不受影响
        thread0.start();
        thread1.start();
        thread2.start();

        System.out.println("main方法");
    }
}
```

### 线程的优先级

```java
package note.senior;

/**
 * 线程的优先级的设置
 * <p>
 * 优先级较高的线程获得抢占到cup执行权的概率较大，且获得的每次抢占到资源后获得的执行时间较长
 *
 * @author Noby
 * @since 2022/10/3
 */public class PriorityNote {
    public static void main(String[] args) {
        Thread thread0 = new Thread() {
            @Override
            public void run() {
                for (int i = 0; i < 100; i++) {
                    System.out.println(Thread.currentThread().getName() + ": " + i);
                }
            }
        };

        Thread thread1 = new Thread() {
            @Override
            public void run() {
                for (int i = 0; i < 100; i++) {
                    System.out.println(Thread.currentThread().getName() + ": " + i);
                }
            }
        };

        Thread thread2 = new Thread() {
            @Override
            public void run() {
                for (int i = 0; i < 100; i++) {
                    System.out.println(Thread.currentThread().getName() + ": " + i);
                }
            }
        };

        //优先级的等级分为1-10，数字越大优先级越高，所有的线程默认为5
        thread0.setPriority(Thread.MAX_PRIORITY);//MAX_PRIORITY为10
        thread1.setPriority(Thread.MIN_PRIORITY);//MIN_PRIORITY为1
        System.out.println("thread2.getPriority() = " + thread2.getPriority());

        thread0.start();
        thread1.start();
        thread2.start();

        System.out.println("main方法");
    }
}
```

### 线程池

- 定义：是一种线程的使用模式，它为了降低线程使用中频繁的创建和销毁所带来的资源消耗与代价。
- 原理：通过创建一定数量的线程，让他们时刻准备就绪等待新任务的到达，而任务执行结束之后再重新回来继续待命。这就是线程池最核心的设计思路。
- 相比于来一个任务创建一个线程的方式，使用线程池的优势体现在如下几点：
  1. 避免了线程的重复创建与开销带来的资源消耗代价
  2. 提升了任务响应速度，任务来了直接选一个线程执行而无需等待线程的创建
  3. 线程的统一分配和管理，也方便统一的监控和调优
- java 线程池分类：
  - 使用 Executors 类
    - 单线程池：线程池中只有一个线程，经常用于执行需要顺序执行的任务
    - 固定线程池：线程池中的线程数量是固定不变的，经常用来限制开启线程的数量，避免程序卡顿
    - 缓存线程池：线程池中的线程数量可以自动增加、减少，执行的任务越多线程就越多，是为了尽快执行完所有任务
    - 定时线程池：作用与 Timer 一样
  - 使用 ThreadPoolExecutor 类
    - 自定义线程池：程序员根据自己的需求创建线程池

#### Executors

```java
package note;

import java.util.Date;
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
 */public class ExecutorsNote {
    public static void main(String[] args) {
//        myNewCachedThreadPool();
//        myNewFixedThreadPool();
//        myNewSingleThreadExecutor();
        myNewScheduledThreadPool();
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

        /*
        execute()方法用于提交一个Runnable任务到线程池中执行。它的作用是将一个任务交给线程池，由线程池中的线程来执行。
        执行execute()方法后，线程池会选择一个空闲的线程来执行任务，如果没有空闲线程，则将任务放入任务队列等待执行。
         */        pool.execute(myRunnable4);
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

#### ThreadPoolExecutor

```java
package note;

import java.util.concurrent.*;

/**
 * Runnable 使用ThreadPoolExecutor线程池
 * ThreadPoolExecutor是Java中一个用于管理线程池的类，它可以方便地管理线程的创建、销毁和重用，以及控制线程池的大小和任务队列的容量。在ThreadPoolExecutor中，核心线程、任务队列和临时线程是线程池中的三个重要组成部分。
 * 核心线程：
 * 核心线程是线程池中最基本的部分，它们在线程池中始终存在，并且在没有任务执行时也不会被销毁。当有任务提交到线程池时，核心线程会立即执行任务，如果核心线程已经被全部占用，则会把任务放入任务队列中等待执行。线程池的核心线程数可以通过ThreadPoolExecutor的构造函数进行配置。
 * 任务队列：
 * 任务队列是用于存储等待执行的任务的数据结构。当线程池中的所有核心线程都被占用时，新提交的任务会被放入任务队列中等待执行。ThreadPoolExecutor中提供了多种类型的任务队列，如无界队列和有界队列等，开发者可以根据自己的需求进行选择。
 * 临时线程：
 * 当任务队列已经满了，或者线程池中的核心线程都在执行任务且任务队列中也已经没有任务等待执行时，ThreadPoolExecutor会创建临时线程来执行新提交的任务。临时线程是一种可灵活增减的线程，当任务执行完毕后，它们会被自动销毁。线程池中临时线程的数量可以通过ThreadPoolExecutor的构造函数进行配置。
 * @author Noby
 * @since 2022/10/2
 */public class ThreadPoolNote {
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

```java
package note;

import java.util.concurrent.*;

/**
 * Callable 使用ThreadPoolExecutor线程池
 * @author Noby
 * @since 2022/10/2
 */public class ThreadPoolNote2 {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
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

        MyCallable2 myCallable2 = new MyCallable2(5);

        //以下三个线程只会使用核心线程
        Future<String> f = pool.submit(myCallable2);
        Future<String> f2 = pool.submit(myCallable2);
        Future<String> f3 = pool.submit(myCallable2);
        Future<String> f4 = pool.submit(myCallable2);

        System.out.println(f.get());
        System.out.println(f2.get());
        System.out.println(f3.get());
        System.out.println(f4.get());
    }
}

class MyCallable2 implements Callable<String> {
    private int n;

    public MyCallable2(int n) {
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
        return Thread.currentThread().getName() + " 计算的结果为：" + sum;
    }
}
```

### 定时器 Timer

```java
package note;

import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

/**
 * @Description Timer定时器的基本使用
 * Timer 是定时器线程池的单线程简化，处理多个任务按照顺序执行，存在延时与设置定时器的时间有出入。
 * 可能因为其中的某个任务的异常使Timer线程死掉，从而影响后续任务执行。
 * @Author Noby
 * @Date 2023/3/19
 */public class TimerNote {
    public static void main(String[] args) {
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
```

### 面试题：

#### wait()和 sleep()的区别

- wait()是 object 类中的普通方法。sleep()是 Thread 类中的静态方法
- wait()是等待，通过 notify()唤醒。sleep()是睡眠，通过 sleep()中的传入的而时间结束唤醒
