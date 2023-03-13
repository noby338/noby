---
title: day20 死锁、线程等待
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

public class DeadlockNote {//死锁现象

    public static void main(String[] args) {
        /*
        死锁产生的条件：多个线程争夺多个资源，并且因争夺资源相互等待
         */
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
        synchronized ("我全都要") {//在发生死锁的外面加上一把锁，可避免死锁的发生
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
            System.out.println(name + "拿筷子结束");
        }
    }
    /*
    死锁解决方案：
    1. 杀掉其中一个线程
    2. 避免死锁发生
     */
}
```

### 生产者消费者模式

供不应求：对于消费者无法及时得到自己想要的东西

供过于求：生产的速度快于消费的速度

最理想的模式：生产等于消费

```java
package note;

public class ProducerConsumerNote {//生产者消费者模式

    public static void main(String[] args) throws InterruptedException {
        ProducerConsumer producerConsumer = new ProducerConsumer("汽车",1);
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    for (int i = 0; i < 50; i++) {
                        producerConsumer.consumer();
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    for (int i = 0; i < 50; i++) {
                        producerConsumer.productor();
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}

class ProducerConsumer {
    public String name;//商品的名字
    public int id = 1;//商品的编号
    public boolean flag = false;//标记是否有商品

    public ProducerConsumer(String name, int id) {
        this.name = name;
        this.id = id;
    }

    //无商品生产
    public synchronized void productor() throws InterruptedException {//模拟生产者
        if (flag) {
            wait();//object 方法，让线程阻塞，当线程被唤醒才能进入就绪状态
        }
        System.out.println("生产者生产了一个" + name + "  id:" + id);
        flag = true;
        notifyAll();//唤醒所有阻塞状态的线程
    }

    //有商品消费
    public synchronized void consumer() throws InterruptedException {//模拟消费者
        if (!flag) {
            wait();
        }
        System.out.println("消费者消费了一个" + name + "  id:" + id);
        flag = false;
        id++;
        notifyAll();

    }
}
```

## 等待唤醒机制

```java
package demo.multiThread;

public class Wait_NotifyDemo {
    public static void main(String[] args) {
        //双线程协作
        Print00 p = new Print00();

        //创建一个线程
        new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    p.print1();
                }
            }
        }).start();

        //创建一个线程
        new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    p.print2();
                }
            }
        }).start();
    }
}

class Print00 {
    private Object obj = new Object();
    private boolean flag = false;
    public void print1() {//synchronized的锁对象为调用该方法的对象，即为this
        //print1()和print2()表示方法相同
        synchronized (obj) {
            if(!flag) {
                try {
                    obj.wait();//等待机制开启，该线程暂停，当obj锁对象执行notify()方法后该线程被重新唤醒
                    //调用wait()后，锁对象被释放,使其可以进入print2
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.print("人");
            System.out.print("生");
            System.out.print("若");
            System.out.print("只");
            System.out.print("如");
            System.out.print("初");
            System.out.println("见");
            flag = false;
            obj.notify();//唤醒该锁对象任意一个被暂停的线程
        }
    }

    public void print2() {
        synchronized (obj) {
            if(flag) {
                try {
                    obj.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.print("何");
            System.out.print("事");
            System.out.print("秋");
            System.out.print("风");
            System.out.print("悲");
            System.out.print("画");
            System.out.println("扇");
            flag = true;
            obj.notify();
        }
    }
}
```

```java
package demo.multiThread;


public class Wait_NotifyDemo1 {


    public static void main(String[] args) {
        //三线程协作
        Print000 p = new Print000();

        //创建一个线程
        new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    p.print1();
                }
            }
        }).start();

        //创建一个线程
        new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    p.print2();
                }
            }
        }).start();

        //创建一个线程
        new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    p.print3();
                }
            }
        }).start();

    }
}

class Print000 {
    private Object obj = new Object();
    private int i = 1;

    public void print1() {//synchronized的锁对象为调用该方法的对象，即为this
        //print1()和print2()表示方法相同
        synchronized (obj) {
            while (i != 1) {
                try {
                    obj.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.print("1");
            System.out.print("1");
            System.out.print("1");
            System.out.print("1");
            System.out.print("1");
            System.out.print("1");
            System.out.println("1");
            i = 2;
            obj.notifyAll();//该锁对象的所有被暂停的线程被唤醒，(notify()方法唤醒的为该锁对象的任意一个被暂停的线程)
        }
    }

    public void print2() {
        synchronized (obj) {
            while (i != 2) {
                try {
                    obj.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.print("2");
            System.out.print("2");
            System.out.print("2");
            System.out.print("2");
            System.out.print("2");
            System.out.print("2");
            System.out.println("2");
            i = 3;
            obj.notifyAll();
        }
    }

    public void print3() {
        synchronized (obj) {
            while (i != 3) {
                try {
                    obj.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.print("3");
            System.out.print("3");
            System.out.print("3");
            System.out.print("3");
            System.out.print("3");
            System.out.print("3");
            System.out.println("3");
            i = 1;
            obj.notifyAll();
        }
    }
}
```

### 唤醒机制

![image-20220112104832650](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220112104832650.png)

### 面试题：

#### wait()和sleep()的区别

* wait()是object类中的普通方法。sleep()是Thread类中的静态方法
* wait()是等待，通过notify()唤醒。sleep()是睡眠，通过sleep()中的传入的而时间结束唤醒
