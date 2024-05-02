---
title: VMWare
icon: write
category:
    - Linux
tag:
    - Linux
sticky: false
star: false
article: true
timeline: true
---
- VMware
    - 用于 window 安装其他系统的虚拟机
    - 快照：
        - 用于备份系统
- 安装步骤
    - VMWare 装好以后，系统会多两块虚拟网卡
    VMnet1	直接禁用
    VMnet8	这个是给 NAT 模式时（桥接模式直接使用宿主机的物理网卡）

    - 进入 BISO，启用主板的虚拟化设置
    - ![image-20220621144721757](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621144721.png)

    ![image-20220621144800290](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621144800.png)

    ![image-20220621144826896](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621144826.png)

    ![image-20220621144849683](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621144849.png)

    ![image-20220621144938688](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621144938.png)

    ![image-20220621145105656](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621145105.png)

    ![image-20220621145255893](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621145255.png)

    ![image-20220621145323729](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621145323.png)

    ![image-20220621145540140](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621145540.png)

    ![image-20220621145621885](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621145621.png)

    ![image-20220621145724138](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621145724.png)

    ![image-20220621151324911](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621151324.png)

    ![image-20220621151524655](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621151524.png)

    ![image-20220621151731946](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621151732.png)

    ![image-20220621151918035](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621151918.png)

    ![image-20220621151835006](https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621151835.png)

    ![image-20220621152037890](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/20220621152038.png)

- 网络配置
    - ![image-20220725102856808](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220725102856808.png)
    - 命令：
        - 查看 ip：ipconfig(win)、ifconfig(linux)
        - 查看网络连接：ping ip
    - 三种模式：
        - 桥接模式：
            - VMnet0：vm 直接连接 pc 所在的网段
        - NAT 模式：
            - VMnet8：上一个网段的 ip 不能访问下一个网段的 ip，为实现 pc 访问 vm，网络设置中的 VMnet8 是用于将 pc 虚拟成 NAT 中的子 ip，以实现 pc 和 vm 同网段，(若没有 VMnet8，vm 可以 ping pc，但 pc 不可以 ping vm)
        - 仅主机模式：
            - VMnet1：类似 NAT 模式可实现 pc 和 vm 的相互访问，vm 不能访问外网
