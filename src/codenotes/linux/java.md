---
title: java
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

## java 的安装

- 使用压缩包安装

    1. 解压到/usr/local/src/java/
    2. 配置环境变量/etc/profile

    ```sh
       #java environment
       export JAVA_HOME=/usr/local/src/java/jdk1.8.0_221
       export PATH=$PATH:${JAVA_HOME}/bin
       ```

        2. 重新加载/etc/profile配置文件 `source /etc/profile`

    
