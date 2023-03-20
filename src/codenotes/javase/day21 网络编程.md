---
title: day21 网络编程
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

## 网络编程

- 网络通讯三要素
  * IP地址：计算机的唯一标识，它是通过本地网络和本计算机综合计算得到的
    * PIV4:互联网通信协议版本4（英语：**I**nternet **P**rotocol **v**ersion **4**，IPv4）
      * 32位二进制输入(10010001. 10010001. 10010001. 10010001 )
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
* OSI网络七层模型：OSI是Open System Interconnection的缩写，意为开放式系统互联。国际标准化组织（ISO）制定了OSI模型，该模型定义了不同计算机互联的标准，是设计和描述计算机网络通信的基本框架。OSI模型把网络通信的工作分为7层，分别是物理层、数据链路层、网络层、传输层、会话层、表示层和应用层。![image-20220224234202210](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220224234202210.png)


### InetAddress

```java
package note;  
  
import java.net.InetAddress;  
import java.net.UnknownHostException;  
  
/**  
 * @Description IP地址、域名的使用  
 * @Author Noby  
 * @Date 2023/3/19 13:50  
 */public class InetAddressNote {  
    public static void main(String[] args) throws UnknownHostException {  
        InetAddress localHost = InetAddress.getLocalHost();//获取本机地址  
        InetAddress myComputer = InetAddress.getByName("LAPTOP-7JVG6UKI");//根据主机名获取地址  
        InetAddress baiduDomain = InetAddress.getByName("www.baidu.com");//根据域名获取地址  
        InetAddress baiduIP = InetAddress.getByName("163.177.151.110");//根据ip获取地址  
  
        System.out.println("localHost = " + localHost);  
        System.out.println("myComputer = " + myComputer);  
        System.out.println("baiduDomain = " + baiduDomain);  
        System.out.println("baiduIP = " + baiduIP);  
  
    }  
}
```

### UDP协议

* UDP（User Datagram Protocol）协议是一种传输层协议，它提供了一种无连接、不可靠的数据传输服务。在网络通信中，UDP协议主要用于实时传输数据，例如音频、视频等。
* 与TCP协议不同，UDP协议不需要在客户端和服务器之间建立连接，也不保证数据传输的可靠性。它只是简单地将数据包发送到目标地址，不进行确认、重传等操作。因此，UDP协议的传输速度比TCP协议快，但同时也存在丢包、乱序等问题。
* UDP协议的应用场景主要包括在线游戏、流媒体等需要实时传输数据的场景。由于不需要建立连接，UDP协议的开销比TCP协议小，因此对于一些带宽较小的场景，UDP协议也可以提供更好的传输性能。但需要注意的是，在使用UDP协议时需要自行处理数据的可靠性和安全性问题。
* 广播地址：在局域网中有一个地址，如果将消息发送到该地址，那么局域网内所有的设备都能收到，(默认为xxx.xxx.xxx.255)

```java
package note;  
  
import java.io.IOException;  
import java.net.*;  
  
/**  
 * @Description UDP数据报协议,发送端  
 * @Author Noby  
 * @Date 2023/3/19 13:55  
 */public class UDPSendNote {  
    public static void main(String[] args) throws IOException {  
        String info = "How are you?中文";  
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
  
/**  
 * @Description UDP数据报协议,接收端  
 * @Author Noby  
 * @Date 2023/3/19 13:56  
 */public class UDPReceiveNote {  
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
  
        System.out.println(new String(bytes,0,datagramPacket.getLength()));//datagramPacket.getLength() 获取接收到数据的长度  
  
//        while(true) {  
//            datagramSocket.receive(datagramPacket);//receive方法：阻塞方法，没接收到任何数据时就等待消息，程序暂停执行  
//  
//            System.out.println(new String(bytes,0,datagramPacket.getLength()));//datagramPacket.getLength() 获取接收到数据的长度  
//  
//        }  
    }  
}
```

### TCP协议
- TCP（Transmission Control Protocol）协议是一种传输层协议，它提供了可靠的、面向连接的数据传输服务。在网络通信中，TCP协议通常用于传输HTTP协议中的数据。具体来说，HTTP协议使用TCP协议的连接服务，通过TCP协议在客户端和服务器之间建立连接，然后在连接上进行数据传输。
- HTTP（Hypertext Transfer Protocol）协议是一种应用层协议，它定义了客户端和服务器之间进行通信的规则。它主要用于Web应用程序中，包括网页浏览、文件下载、在线视频等。

```java
package note;  
  
import java.io.OutputStream;  
import java.net.InetAddress;  
import java.net.Socket;  
/**  
 * @Description TCP数据报协议,发送端  
 * @Author Noby  
 * @Date 2023/3/19 13:56  
 */public class TCPSendNote {  
    public static void main(String[] args) throws Exception{  
        Socket socket = new Socket(InetAddress.getLocalHost(), 11111);//Socket底层实现了TCP协议  
        String info = "TCPInfo中文";  
        OutputStream outputStream = socket.getOutputStream();  
        outputStream.write(info.getBytes());  
        socket.close();  
    }  
}
```

```java
package note;  
  
  
import java.io.InputStream;  
import java.net.ServerSocket;  
import java.net.Socket;  
/**  
 * @Description TCP数据报协议,接收端  
 * @Author Noby  
 * @Date 2023/3/19 13:56  
 */public class TCPReceiveNote {  
    public static void main(String[] args) throws Exception{  
        ServerSocket serverSocket = new ServerSocket(11111);  
        Socket socket = serverSocket.accept();  
        byte[] bytes = new byte[1024];  
        InputStream inputStream = socket.getInputStream();  
        int len = inputStream.read(bytes);  
        socket.close();  
        serverSocket.close();  
        System.out.println(new String(bytes, 0, len));  
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
