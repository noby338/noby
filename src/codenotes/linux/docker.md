---
title: docker
icon: write
category:
  - Linux
tags:
  - Linux
sticky: false
star: false
article: true
timeline: true
---

## 菜鸟教程

- 网址

```
https://www.runoob.com/docker/centos-docker-install.html
```

## 安装

- 官方安装脚本自动安装

```
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

- 设置阿里云镜像 (阿里云镜像获取地址：`https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors`，登陆后，左侧菜单选中镜像加速器就可以看到你的专属地址了)

```
https://628s02d9.mirror.aliyuncs.com
```

- 在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）：

```
{"registry-mirrors":["https://console.cloud.google.com/gcr/images/google-containers/GLOBAL"]}
```

```
{"registry-mirrors":["https://registry-1.docker.io"]}
```

```
{"registry-mirrors":["https://628s02d9.mirror.aliyuncs.com/"]}
```

```
{"registry-mirrors":["https://docker.mirror.ustc.edu.cn"]}
```

```
{"registry-mirrors":["https://mirror.ccs.tencentyun.com"]}
```

- 重新启动服务

```
systemctl restart docker
```

- 设置开机启动

```
systemctl enable docker
```

- 启动

```
systemctl start docker
```

- 查看状态

```
systemctl status docker
```

- 如果使用了镜像源仍然无法 pull 部分镜像，可以使用宿主机的 clash 代理 linux 系统（开启 allow lan）

```
export http_proxy=http://192.168.43.172:7890
export https_proxy=http://192.168.43.172:7890

export http_proxy=http://localhost:7890
export https_proxy=http://localhost:7890

echo $http_proxy
echo $https_proxy

unset $http_proxy
unset $https_proxy
```

- docker 使用代理的方式，创建该路径和文件，`systemctl daemon-reload` 即可使用代理

```
mkdir /etc/systemd/system/docker.service.d
vim /etc/systemd/system/docker.service.d/http-proxy.conf

[Service]
Environment="HTTP_PROXY=http://192.168.1.104:7890/" "HTTPS_PROXY=http://192.168.1.104:7890/"
```

## docker 自带教程

- 命令

```
docker [OPTIONS] --help
eg:docker --help
eg:docker ps --help
```

- 根据镜像生成后台启动容器

```
docker run -d IAMGE [COMMAND]
```

```
eg:
runoob@runoob:~$ docker run -d ubuntu:15.10 /bin/sh -c "while true; do echo hello world; sleep 1; done"
2b1b7a428627c51ab8810d541d759f072b4fc75487eed05812646b8534a2fe63
```

## docker 中的核心概念

- 镜像：类似 java 中的类，他是生成可运行的容器的标准。镜像为联合文件系统 (Union File System)，是一组文件，是分层结构，每层是一个基本的镜像文件。
    - eg:
        - tomcat:8.0
            - 他内部未集成 jdk，不可直接运行 java 的项目，默认的 start 参数为 `catalina.sh run`(在未执行命令和参数的前提下默认执行该命令和参数)(tomcat 的 startup.sh 和 shutdown.sh 内部也使用的是 catalina.sh 命令)
        - tomcat:9-jdk8
            - 继承了 jdk8 的 tomcat9，可以直接运行 jar 包
        - hello-world
            - docker 的测试镜像
        - ubuntu:15.10
            - 默认的启动参数为 `/bin/bash`
- 容器：类似 java 中的对象，他是由镜像创建而成，包含代码、运行时环境、系统工具、系统库和设置运行的容器，直接运行的对象，每个镜像生成的容器都有一个默认的启动命令，容器的命令都是基于自己容器内部的文件，如：tomcat 执行 `start` 启动后默认执行 `catalina.sh run` 运行 webapps 中的项目；ubuntu 执行 `start` 启动后默认执行 `/bin/bash` 进入容器的内部 (需要指定 -it，否则容器会闪退)。也可以在创建容器时指定一个启动命令，之后 `start` 该容器则会执行该自定义参数。如：ubuntu 执行 `start` 启动后设置执行 `/bin/echo hello` 打印 hello(需要指定 -i 打印到控制台，否则打印到日志文件)。创建后的容器将会一直存在，一个镜像可以生成多个相同的容器。大部分 docker 的容器基本都是基于 linux 制作而成。
    - 状态：
        - "created"，表示已创建；
        - "restarting"，表示重启中；
        - "running"，表示运行中；
            - 正在运行的容器可执行 docker exec -it CONTAINER /bin/bash 进入容器的内部操作容器中的文件
        - "removing"，表示迁移中；
        - "paused"，表示暂停状态；
        - "exited"，表示停止等等。
- 仓库：存储镜像的地方
    - 分类：
        - 中央仓库: docker hub docker 官方存储 docker 镜像的服务器
        - 阿里云镜像
        - 本地服务器
- 数据卷：宿主机中存在的一个可以用来挂载容器指定目录的目录。多个容器可以挂载在同一个数据卷，一个容器也可以挂载多个数据卷
    - 作用
        - 容器数据的持久化
        - 宿主机和容器之间的数据传输
        - 容器之间的数据交换
    - 注意
        - 当挂载时的宿主机或者容器的目录不存在时，则会自动创建

## docker 的网络设置

- docker 中容器通信的三种方式
    - 容器的 ip 地址
    - 宿主机的 ip: 宿主机映射到容器的端口
    - 容器名 (需要使用自定义的网桥)
- 在 linux 环境下，docker 的启动会创建一个 docker0 虚拟网卡（通过 ip addr 命令查看）
    - 当 docker 创建一个容器时，linux 宿主机会给系统其分配一个 eth0 网络接口，该接口在未指定的情况下连接到 docker0 虚拟网卡，并且容器内部也会有一个 eth0 接口，他们是一对。此时的 eth0 充当一个网桥，实现了容器和宿主机的通信。（evth-pair 技术）
    - 如果容器再次创建一个容器，会再次创建一对 eth0，直至容器被删除该网络接口才会消失
    - 如果一个容器通过分配的 IP 地址访问另一个容器，会先通过 eth0 访问宿主机，在通过宿主机再通过 eth0 访问另一个容器
- --link 参数（不推荐使用的老参数）
    - 默认情况下，通过容器名是无法实现容器之间的连接，通过 run 容器的时候指定 --link 参数可实现容器的单项访问
        - 实现的原理是在容器的系统 hosts 文件中将访问的容器名绑定了访问的容器的 ip
- --net 参数
    - 可以指定在容器创建的时候连接的网络，默认为 --net docker0
    - 自定义的桥接网络和 docker0 的最大区别是，容器加入自定义的桥接网络可以通过容器名相互通信
    - 一个加入了网络的容器还可以通过 `docker network connect mybrige tomcat` 命令连接另一个网络，实现不同网络之间的容器通信

## docker 的镜像层级

- bootfs 宿主机的文件系统，docker 和宿主机公用 bootfs
    - rootfs 基础镜像（centos）
        - jdk 镜像
            - tomcat 镜像

### rootfs (Root File System)

rootfs 表示根文件系统，这是 Docker 镜像的基础层。对于一个特定的镜像，如 CentOS 镜像，rootfs 包含了运行该操作系统所需的所有文件和目录结构。在 Docker 镜像中，每个镜像开始都是从一个基础镜像（如 CentOS）开始的，这个基础镜像就是它的 rootfs。

### 镜像层级

- 在 rootfs 之上，Docker 利用联合文件系统（Union File System）的特性，允许多个不同的文件系统被叠加在一起，形成单一的、统一的文件视图。这意味着在 rootfs 基础上可以叠加更多的层：
- jdk 镜像：在 CentOS 基础镜像（即 rootfs）上叠加了 JDK（Java Development Kit）的层。这一层包含了 JDK 的所有文件，使得基于这个镜像的容器能够运行 Java 应用程序。
- tomcat 镜像：在 JDK 层之上，叠加了 Tomcat 的层。Tomcat 是一个用 Java 编写的 Web 服务器和 Servlet 容器。这一层包含了运行 Tomcat 所需的所有文件。

### 分层结构的好处

这种分层结构有几个显著的优势：

- 重用和共享：不同的镜像可以共享相同的层。例如，多个不同的 Java 应用可能都会使用相同的 JDK 镜像作为基础，这样节省了存储空间并减少了重复数据。
- 增量构建和存储：每当更新镜像时，只需要添加或更新变化的那一层，而不需要重新构建整个镜像。
- 高效的分发：在分发镜像时，只需要传输那些尚未在接收端存在的层，这样大大提高了效率和速度。

## dockerfile

| 关键字         | 作用            | 备注                                                                                                  |
| ----------- | ------------- | --------------------------------------------------------------------------------------------------- |
| **FROM**    | 指定父镜像         | 指定 dockerfile 基于那个 image 构建                                                                         |
| MAINTAINER  | 作者信息          | 用来标明这个 dockerfile 谁写的                                                                               |
| LABEL       | 标签            | 用来标明 dockerfile 的标签 可以使用 Label 代替 Maintainer 最终都是在 docker image 基本信息中可以查看                           |
| **RUN**     | 执行命令          | 执行一段命令 默认是/bin/sh 格式: RUN command 或者 RUN ["command" , "param1","param2"]                            |
| **CMD**     | 容器启动命令        | 提供启动容器时候的默认命令 和 ENTRYPOINT 配合使用.格式 CMD command param1 param2 或者 CMD ["command" , "param1","param2"] |
| ENTRYPOINT  | 入口            | 一般在制作一些执行就关闭的容器中会使用                                                                                 |
| COPY        | 复制文件          | build 的时候复制文件到 image 中                                                                              |
| ADD         | 添加文件          | build 的时候添加文件到 image 中 不仅仅局限于当前 build 上下文 可以来源于远程服务                                                 |
| ENV         | 环境变量          | 指定 build 时候的环境变量 可以在启动的容器的时候 通过 -e 覆盖 格式 ENV name=value                                             |
| ARG         | 构建参数          | 构建参数 只在构建的时候使用的参数 如果有 ENV 那么 ENV 的相同名字的值始终覆盖 arg 的参数                                                |
| VOLUME      | 定义外部可以挂载的数据卷  | 指定 build 的 image 那些目录可以启动的时候挂载到文件系统中 启动容器的时候使用 -v 绑定 格式 VOLUME [" 目录 "]                             |
| EXPOSE      | 暴露端口          | 定义容器运行的时候监听的端口 启动容器的使用 -p 来绑定暴露端口 格式: EXPOSE 8080 或者 EXPOSE 8080/udp                                |
| WORKDIR     | 工作目录          | 指定容器内部的工作目录 如果没有创建则自动创建 如果指定/ 使用的是绝对地址 如果不是/开头那么是在上一条 workdir 的路径的相对路径                              |
| USER        | 指定执行用户        | 指定 build 或者启动的时候 用户 在 RUN CMD ENTRYPONT 执行的时候的用户                                                    |
| HEALTHCHECK | 健康检查          | 指定监测当前容器的健康监测的命令 基本上没用 因为很多时候 应用本身有健康监测机制                                                           |
| ONBUILD     | 触发器           | 当存在 ONBUILD 关键字的镜像作为基础镜像的时候 当执行 FROM 完成之后 会执行 ONBUILD 的命令 但是不影响当前镜像 用处也不怎么大                         |
| STOPSIGNAL  | 发送信号量到宿主机     | 该 STOPSIGNAL 指令设置将发送到容器的系统调用信号以退出。                                                                  |
| SHELL       | 指定执行脚本的 shell | 指定 RUN CMD ENTRYPOINT 执行命令的时候 使用的 shell                                                             |

```
FROM centos:7
MAINTAINER noby <1326981297@qq.com>
RUN yum install -y vim
VORKDIR /usr
CMD /bin/bash
```

- 命名 springboot_dockerfile

```
FROM java:8
MAINTAINER noby <1326981297@qq.com>
ADD xxx.jar app.jar
CMD java -jar app.jar
```

`docker build -f ./springboot_dockerfile -t springboot .`

## docker compose

- docker-compose.yml 是文件的默认名，通常不更改
    - `docker compose -f docker-compose1.yml up`
        - 可指定启动的文件
- docker compose 服务启动后，会在 docker 下创建新的 bridge 网络 dockerfile_default 用于 docker compose 中的容器通信
- `docker compose up`
    - 创建镜像，创建并运行容器
- `docker compose down`
    - 停止并关闭容器，它会删除所有相关的容器、网络和卷。
- `docker compose start`
    - 运行容器
- `docker compose stop`
    - 停止容器

```yml
version: '3'
services:
    nginx:
        image: nginx:1.22
        ports: # 宿主机和容器的端口映射
                        - 80:80
        links: # 使用--link指令连接其他容器
                        - springboot
        volumes: # 数据卷挂载
                        - /Users/noby/dockervolume/nginx/html:/usr/share/nginx/html
                        - /Users/noby/dockervolume/nginx/logs:/var/log/nginx
                        - /Users/noby/dockervolume/nginx/conf:/etc/nginx
    springboot:
        image: springboot
        expose: # 端口暴露给dockerfile_default，宿主机不可访问，仅该网络的容器可访问
                        - "8080"
        links:
                        - mysql: db # 将mysql容器重命名为db，这样在springboot中就可以使用db访问mysql
        depends_on: # 在指定容器之后启动
                        - mysql
    mysql:
        image: mysql:5.7
        volumes:
                        - /Users/noby/dockervolume/mysql/log:/var/log/mysql
                        - /Users/n
                        - oby/dockervolume/mysql/data:/var/lib/mysql
                        - /Users/noby/dockervolume/mysql/conf:/etc/mysql/conf.d
        environment:
            MYSQL_ROOT_PASSWORD: root
        expose:
                        - "3306"
```

## docker 命令

### docker info

- Display system-wide information
- Usage: docker info [OPTIONS]
- Options:
    - -f, --format string Format the output using the given Go template

### docker run

- 解释：docker run 命令为多个 docker 命令组合而来的一个综合命令，其执行过程分以下几步：第一步：在本地库中查询是否存在该 IMAGE，若存在执行第二步。若不存在，则执行 search 命令在 docker hub 中查询是否存在该 IMAGE，若存在，pull 该 IMAGE 到本地库，执行第二步。若不存在，给出错误提示，命令执行结束；第二步：执行 create 命令根据本地库的该 Image 生成 Container；第三步：执行 start 命令运行该 Container
- Run a command in a new container
- Usage: docker run [OPTIONS] IMAGE [COMMAND] [ARG…]
- Options:
    - -d, --detach Run container in background and print container ID
    - -i, --interactive Keep STDIN open even if not attached
        - 指示 docker 要在容器上打开一个标准的输入接口
    - -t, --tty Allocate a pseudo-TTY
        - 为容器分配一个伪终端
    - -p, --publish list Publish a container's port(s) to the host
    - ​--name string,Assign a name to the container
    - ​--rm,Automatically remove the container when it exits
    - --platform string,Set platform if server is multi-platform capable
        - 拉取的镜像的平台，如基于苹果 Silicon 芯片的 mac 电脑可添加 `--platform linux/arm64/v8` 参数制定镜像的平台
- eg:
    - `docker run --name ubuntu ubuntu:15.10 /bin/echo "Hello world"`
        - 基于 ubnuntu:15.10 镜像生成容器 ubuntu，并且该容器用于执行 `/bin/echo` 命令 (该命令也是存在 ubuntu 容器中的命令)，并且该命令的参数为 `"Hello world"`(默认 ubuntu 容器执行 `/bin/bash` 命令)
    - `docker run -it -p 9090:8080 --name=tomcat8 tomcat:8.0`
        - 基于 tomcat:8.0 镜像生成容器，该容器名为 tomcat8，该容器的端口 8080 映射到宿主机的端口 9090，本次的启动方式为打开一个标准的输入接口，并且打开分配一个伪终端，并且默认 tomcat 容器用于执行 `catalina.sh` 命令 (该命令也是存在容器中的命令)(tomcat 容器基于 linux 制作)，并且该命令的参数为 `run`(在未执行命令和参数的前提下默认执行该命令和参数)(tomcat 的 startup.sh 和 shutdown.sh 内部也使用的是 catalina.sh 命令)(此时的 9090 不需要宿主机防火墙开启次端口的访问)
    - `docker run -d --name clash --restart always -p 7890:7890 -p 7891:7891 -p 9090:9090 -v /mydata/clash/config.yaml:/root/.config/clash/config.yaml -v /root/clash/ui:/ui dreamacro/clash`

### docker search

- Search the Docker Hub for images
- Usage: docker search [OPTIONS] TERM
- Options:
- eg:
    - `docker search hello-world`
        - 在 docker hub 中检索关键字包括 hello-world 的镜像，该镜像为 docker 的官方测试镜像
    - `docker search tomcat`
        - 在 docker hub 中检索关键字包括 tomcat 的镜像

### docker pull

- Pull an image or a repository from a registry
- sage: docker pull [OPTIONS] NAME[:TAG|@DIGEST]
- Options:
- eg:
    - `docker pull hello-world`
        - 从 docker hub 中拉取 hello-world 镜像，若未指定镜像的版本即为最新版 (latest)
    - `docker pull ubuntu:15.10`
        - 从 docker hub 中拉取 ubuntu 镜像，版本为 15.10
    - `docker pull mysql:5.7`
    - `docker pull redis:7`
    - `docker pull nginx:1.22`
    - `docker pull rabbitmq:3.9-management`
    - `docker pull elasticsearch:7.17.3`
    - `docker pull logstash:7.17.3`
    - `docker pull kibana:7.17.3`
    - `docker pull mongo:4`
    - `docker pull minio/minio`

### docker images

- List images
- Usage: docker images [OPTIONS] [REPOSITORY[:TAG]]
- Options:
    - -a, --all Show all images (default hides intermediate images)
        - 显示包括中间镜像在内的所有镜像，中间层镜像是其它镜像所依赖的镜像。这些无标签镜像不应该删除，否则会导致上层镜像因为依赖丢失而出错。
    - -f, --filter filter Filter output based on conditions provided
    - -q, --quiet Only show image IDs
- eg:
    - `docker images`
        - 显示所有顶层镜像 (顶层镜像为我们直接使用到的镜像。中间层镜像是构建过程中的临时层，它们包含每个构建步骤的结果。这些中间层镜像在构建完成后并不直接对外提供服务，而是被最终的顶层镜像所引用。顶层镜像包含了所有构建步骤的结果，并且是我们最终使用和部署的镜像。)
    - `docker images -qa`
        - 显示所有镜像的 id(可用于删除所有镜像)

### docker create

- Create a new container
- Usage: docker create [OPTIONS] IMAGE [COMMAND] [ARG…]
- Options:
    - -i, --interactive Keep STDIN open even if not attached
        - 指示 docker 要在容器上打开一个标准的输入接口
    - -t, --tty Allocate a pseudo-TTY
        - 为容器分配一个伪终端
    - -p, --publish list Publish a container's port(s) to the host
    - -e, --env list Set environment variables
    - -v, --volume list Bind mount a volume
    - ​ --name string Assign a name to the container
    - ​ --network network Connect a container to a network
- eg:
    - `docker create --name ubuntu ubuntu:15.10 /bin/sh -c "while true;do echo hello world;sleep 1; done"`
        - 创建循环输出 hello world 的容器
    - `docker create -p 9090:8080 --name tomcat9jdk8 tomcat:9-jdk8`
        - 基于 tomcat:9-jdk8 镜像生成容器，该容器名为 tomcat9jdk8 ，该容器的端口 8080 映射到宿主机的端口 9090，本次的启动方式为打开一个标准的输入接口，并且打开分配一个伪终端，并且默认 tomcat 容器用于执行 `catalina.sh` 命令 (该命令也是存在容器中的命令)(tomcat 容器基于 linux 制作)，并且该命令的参数为 `run`(在未执行命令和参数的前提下默认执行该命令和参数)(tomcat 的 startup.sh 和 shutdown.sh 内部也使用的是 catalina.sh 命令)(此时的 9090 不需要宿主机防火墙开启次端口的访问)
    - `docker create -p 8080:8080 -v /Users/noby/dockervolume/tomcat/webapps:/usr/local/tomcat/webapps --name tomcat9jdk8 tomcat:9-jdk8`
        - 基于 tomcat:9-jdk8 镜像生成容器，并创建数据卷 (目录挂载)，宿主机中目录的内容与容器中的目录的内容一致，其中一方的改动将影响另一方
    - `docker create --network mybridge -v /Users/noby/dockervolume/tomcat/webapps:/usr/local/tomcat/webapps --name tomcat9jdk8 tomcat:9-jdk8`
        - 基于 tomcat:9-jdk8 镜像生成容器，并创建数据卷 (目录挂载)，并连接自定义的网络 (自定义的网络可以实现使用容器名实现容器中间的通信)(默认为连接 docker0 网络，该网络无法实现使用容器名实现容器直接的通信)
    - `docker create --name mysql -p 3306:3306 -v /var/dockervolume/mysql/conf:/etc/mysql/conf.d -v /var/dockervolume/mysql/log:/var/log/mysql -v /var/dockervolume/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123 mysql:5.7`
        - MySQL(5.7.19) 的默认配置文件是 /etc/mysql/my.cnf 文件。如果想要自定义配置，建议向 /etc/mysql/conf.d 目录中创建 .cnf 文件。新建的文件可以任意起名，只要保证后缀名是 cnf 即可。新建的文件中的配置项可以覆盖 /etc/mysql/my.cnf 中的配置项。
        - 在容器中运行 `mysql -uroot -p DATABASE < ***.sql` 将数据库的数据写入容器
    - `docker create --name mysql \ --network mybridge \ -v /Users/noby/dockervolume/mysql/conf:/etc/mysql/conf.d \ -v /Users/noby/dockervolume/mysql/data:/var/lib/mysql \ -e MYSQL_ROOT_PASSWORD=123 \ mysql:5.7`
        - 容器的通信方式为自定义网络，连接到 mybridge 网络
        - 在容器中运行 `mysql -uroot -p DATABASE < ***.sql` 将数据库的数据写入容器
    - `docker create -p 6379:6379 --name redis -v /var/dockervolume/redis/data:/data -v /var/dockervolume/redis/conf/redis.conf:/etc/redis/redis.conf redis`
    - `docker run -p 27017:27017 --name mongo -v /var/dockervolume/mongo/db:/data/db -d mongo:4`
    - `docker create --name nginx \ --network mybridge \ -v /Users/noby/dockervolume/nginx/nginx.conf:/etc/nginx/nginx.conf \ nginx`
        - 容器的通信方式为自定义网络，连接到 mybridge 网络
        - /etc/nginx/nginx.conf 为 nginx 的默认配置文件
        - /etc/nginx/conf.d 为 nginx 的配置文件目录，该目录下的配置文件可以覆盖默认配置文件
    - `docker create --name nginx \ -p 80:80 \ -v /Users/noby/dockervolume/nginx/nginx.conf:/etc/nginx/nginx.conf \ nginx`
        - /etc/nginx/nginx.conf 为 nginx 的默认配置文件
        - /etc/nginx/conf.d 为 nginx 的配置文件目录，该目录下的配置文件可以覆盖默认配置文件

```sh
upstream myweb{
  server tomcat:8080 weight=5;
  server tomcat2:8080;
}

server {
  listen       80;
  server_name  43.139.179.52;

  location / {
      #root   /usr/share/nginx/html;
      #index  index.html index.htm;

      proxy_pass http://myweb;
  }
}
```

### docker ps

- List containers
- Usage: docker ps [OPTIONS]
- Options:
    - -a, --all Show all containers (default shows just running)
    - -f, --filter filter Filter output based on conditions provided
    - -q, --quiet Only display container IDs
- eg：
    - `docker ps`
        - 显示运行的容器
    - `docker ps -a`
        - 显示所有的容器
    - `docker pa -aq`
        - 显示所有的容器的 id(可用于删除所有容器)

### docker container

(该命令是在 docker ps 基础上后增加的，更加全面，部分命令功能同 docker ps)

- Manage containers
- Usage: docker container COMMAND
- Commands:
    - ls,List containers
    - port,List port mappings or a specific mapping for the container

### docker start

- Start one or more stopped containers
- Usage: docker start [OPTIONS] CONTAINER [CONTAINER…]
- Options:
    - -i, --interactive Attach container's STDIN
        - 指示 docker 要在容器上打开一个标准的输入接口
- eg:
    - `docker start -i tomcat8`
        - 交互界面运行 tomcat8 容器
    - `docekr start tomcat8`
        - 运行 tomcat8 容器

### docker stop

- Stop one or more running container
- Usage: docker stop [OPTIONS] CONTAINER [CONTAINER…]
- Options:

### docker exec

- Run a command in a running container
- Usage: docker exec [OPTIONS] CONTAINER COMMAND [ARG…]
- Options:
    - -d, --detach Detached mode: run command in the background
    - -i, --interactive Keep STDIN open even if not attached
        - 指示 docker 要在容器上打开一个标准的输入接口
    - -t, --tty Allocate a pseudo-TTY
        - 为容器分配一个伪终端
- eg:
    - `docker exec -it tomcat8 /bin/bash`
        - 对 tomcat8 执行 bash 命令，该命令进入 tomcat8 容器内部，并将 -i 和 -t 连接起来，使得在 -t 的伪终端输入的命令可以传入容器中执行 (/bin/bash 可简化为 bash)

### docker top

- Display the running processes of a container
- Usage: docker top CONTAINER [ps OPTIONS]
- Aliases:
    - docker container top, docker top

### docker logs

- Usage: docker logs [OPTIONS] CONTAINER
- Fetch the logs of a container
- Aliases:
    - docker container logs, docker logs
- Options: - --details Show extra details provided to logs
    - -f, --follow Follow log output
        - --since string Show logs since timestamp (e.g. "2013-01-02T13:23:37Z") or relative
    - -n, --tail string Number of lines to show from the end of the logs (default "all")
    - -t, --timestamps Show timestamps
- eg:
    - `docker logs -f elasticsearch`
        - 查看 es 日志

### docker rm

- Remove one or more containers
- Usage: docker rm [OPTIONS] CONTAINER [CONTAINER…]
- Options:
    - -f, --force Force the removal of a running container (uses SIGKILL)
- eg:
    - `docker rm -f $(docker images -aq)`
        - 删除所有容器，即使在运行的容器

### docker rmi

- Remove one or more images
- Usage: docker rmi [OPTIONS] IMAGE [IMAGE…]
- Options:
    - -f, --force Force removal of the image
- eg:
    - `docker rmi -f $(docker ps -aq)`
        - 删除所有的容器，即使在运行的容器

### docker cp

- Copy files/folders between a container and the local filesystem
- Usage:
    - docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|
    - docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH
- Options:
- eg：
    - `docker cp /usr/local/myweb/servletSum.war tomcat8:/usr/local/tomcat/webapps`
        - 将宿主机中的文件复制到 tomcat8 容器的指定路径
    - `docker cp tomcat8:/usr/local/tomcat/webapps/servletSum.war /usr/local/myweb`
        - 将 tomcat8 容器中的文件复制到宿主机的指定路径

### docker inspect

- Return low-level information on Docker objects
- Usage: docker inspect [OPTIONS] NAME|ID [NAME|ID…]
- eg:
    - `docker inspect tomcat9jdk8`
        - 用于查看 Mounts 中的数据卷

### docker volume ls

- List volumes
- Usage: docker volume ls [OPTIONS]
- eg:
    - `docker volume ls`
        - 用于查看 docker 所有的数据卷

### docker volume inspect

- Display detailed information on one or more volumes
- Usage: docker volume inspect [OPTIONS] VOLUME [VOLUME…]
- Options:
    - -f, --format string Format output using a custom template:
- eg:
    - `docker volume inspect mysql`

### docker network

- Manage networks
- Usage: docker network COMMAND
- Commands:
    - connect Connect a container to a network
    - create Create a network
    - disconnect Disconnect a container from a network
    - inspect Display detailed information on one or more networks
    - ls List networks
    - rm Remove one or more networks
- eg:
    - docker network create -d bridge mybridge
        - 创建一个名为 mybridge 的 bridge 网络 (在未指定种类的情况下默认为 bridge)
        - -d：参数指定 Docker 网络类型，有 bridge、overlay。
    - docker network ls
        - 查看已存在的网络 (DRIVER 为网络的种类，有 bridge、host、null 三种)
    - docker network connect mybridge tomcat9jdk8
        - 将 tomcat9jdk8 容器与 mybridge 网络间接在一起
    - docker network inspect mybridge
        - 查看 mybridge 网络的详细信息，"Containers" 查看加入该网络的容器
    - docker network rm mybridge
        - 删除 mybridge 网络

### docker export

- Export a container's filesystem as a tar archive
- Usage: docker export [OPTIONS] CONTAINER
- eg:
    - `docker export 7691a814370e > ubuntu.tar`
        - 把容器 id 为 7691a814370e 的容器打包为 ubuntu.tar 文件到当前路径

### docker import

- Import the contents from a tarball to create a filesystem image
- Usage: docker import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]
- eg:
    - `cat ubuntu.tar | docker import - test/ubuntu:v1.0`
        - 把当前路径 ubuntu.tar 解析为名为 test/ubuntu:v1.0 的 docker 镜像导入

### docker save

- Usage: docker save [OPTIONS] IMAGE [IMAGE…]
- Save one or more images to a tar archive (streamed to STDOUT by default)
- Aliases:
    - docker image save, docker save
- Options:
    - -o, --output string Write to a file, instead of STDOUT
- eg：
    - `docker save -o alist.tar alist`

### docker load

- Usage: docker load [OPTIONS]
- Load an image from a tar archive or STDIN
- Aliases:
    - docker image load, docker load
- Options:
    - -i, --input string Read from tar archive file, instead of STDIN
    - -q, --quiet Suppress the load output
- eg:
    - `docker load -i alist.tar`

### docker update

- eg:
    - `docker update --restart=always <容器ID>`
        - 自启动
    - `docker update --restart=no <容器ID>`
        - 关闭某个容器的自启动
    - `docker inspect --format='{{.Name}} {{.HostConfig.RestartPolicy.Name}}' $(docker ps -aq)`
        - 查看当前自启动的容器
        - --format：这个选项允许使用 Go 的模板语言来指定输出的格式。这对于提取特定的信息非常有用。`{{.Name}} {{.HostConfig.RestartPolicy.Name}}`：这是一个模板字符串，告诉 docker inspect 命令只输出每个容器的名称 `（.Name）` 和重启策略 `（.HostConfig.RestartPolicy.Name）`。
        - $()：这是 Bash 和其他类Unix shell中的命令替换功能。它会执行括号内的命令，然后将输出结果（在这种情况下是所有容器的ID）作为字符串返回。这意味着 $(docker ps -aq) 会被替换成所有容器 ID 的列表。

### docker commit

- eg:
    - `docker commit -m="add databases" -a="noby" <容器ID> mysql:v1`
        - 此操作将会把现在正在运行的<容器 ID>生成镜像 mysql:v1 存在本地镜像仓库
        - 这些修改包括容器中正在运行的进程、修改的文件系统、新增的文件、安装新的软件包、修改了配置文件等。不包括数据库数据。

### docker build

- Usage: docker buildx build [OPTIONS] PATH | URL | -
- Start a build
- Aliases:
    - docker buildx build, docker buildx b
- Options:
    - -f, --file string Name of the Dockerfile (default: "PATH/Dockerfile")
    - -t, --tag stringArray Name and optionally a tag (format: "name:tag")
- eg: - `docker build -f ./springboot-dockerfile -t app:1 .` - 通过自己定义的 springboot-dockerfile 文件构建了一个名为 app:1 的 docker 镜像

docker pull --platform linux/x86_64 mysql:5.7
docker pull redis:7
docker pull nginx:1.22
docker pull rabbitmq:3.9-management
docker pull elasticsearch:7.17.3
docker pull logstash:7.17.3
docker pull kibana:7.17.3
docker pull mongo:4
docker pull minio/minio

#### mysql

docker run -p 3306:3306 --name mysql \
-v /Users/noby/dockervolume/mysql/log:/var/log/mysql \
-v /Users/noby/dockervolume/mysql/data:/var/lib/mysql \
-v /Users/noby/dockervolume/mysql/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql:5.7

#### redis

docker run -p 6379:6379 --name redis \
-v /Users/noby/dockervolume/redis/data:/data \
-d redis:7 redis-server --appendonly yes

#### nginx

docker run -p 80:80 --name nginx \
-v /Users/noby/dockervolume/nginx/html:/usr/share/nginx/html \
-v /Users/noby/dockervolume/nginx/logs:/var/log/nginx \
-d nginx:1.22

docker container cp nginx:/etc/nginx /Users/noby/dockervolume/nginx/
mv nginx conf
docker stop nginx
docker rm nginx

docker run -p 80:80 --name nginx \
-v /Users/noby/dockervolume/nginx/html:/usr/share/nginx/html \
-v /Users/noby/dockervolume/nginx/logs:/var/log/nginx \
-v /Users/noby/dockervolume/nginx/conf:/etc/nginx \
-d nginx:1.22

#### rabbitmq

docker run -p 5672:5672 -p 15672:15672 --name rabbitmq \
-v /Users/noby/dockervolume/rabbitmq/data:/var/lib/rabbitmq \
-d rabbitmq:3.9-management

docker run -p 5672:5672 -p 15672:15672 --name rabbitmq \
-v /Users/noby/dockervolume/rabbitmq/data:/var/lib/rabbitmq \
-d rabbitmq:3-management

#### elasticsearch

sysctl -w vm.max_map_count=262144

docker run -p 9200:9200 -p 9300:9300 --name elasticsearch \
-e "discovery.type=single-node" \
-e "cluster.name=elasticsearch" \
-e "ES_JAVA_OPTS=-Xms512m -Xmx1024m" \
-v /Users/noby/dockervolume/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
-v /Users/noby/dockervolume/elasticsearch/data:/usr/share/elasticsearch/data \
-d elasticsearch:7.17.3

chmod 777 /Users/noby/dockervolume/elasticsearch/data/

https://github.com/medcl/elasticsearch-analysis-ik/releases

#### logstatsh

```
input {
 tcp {
   mode => "server"
   host => "0.0.0.0"
   port => 4560
   codec => json_lines
   type => "debug"
 }
 tcp {
   mode => "server"
   host => "0.0.0.0"
   port => 4561
   codec => json_lines
   type => "error"
 }
 tcp {
   mode => "server"
   host => "0.0.0.0"
   port => 4562
   codec => json_lines
   type => "business"
 }
 tcp {
   mode => "server"
   host => "0.0.0.0"
   port => 4563
   codec => json_lines
   type => "record"
 }
}
filter{
 if [type] == "record" {
   mutate {
     remove_field => "port"
     remove_field => "host"
     remove_field => "@version"
   }
   json {
     source => "message"
     remove_field => ["message"]
   }
 }
}
output {
 elasticsearch {
   hosts => "es:9200"
   index => "mall-%{type}-%{+YYYY.MM.dd}"
 }
}

```

docker run --name logstash -p 4560:4560 -p 4561:4561 -p 4562:4562 -p 4563:4563 \
--link elasticsearch:es \
-v /Users/noby/dockervolume/logstash/logstash.conf:/usr/share/logstash/pipeline/logstash.conf \
-d logstash:7.17.3

logstash-plugin install logstash-codec-json_lines

#### kibana

docker run --name kibana -p 5601:5601 \
--link elasticsearch:es \
-e "elasticsearch.hosts=http://es:9200" \
-d kibana:7.17.3

#### mongodb

docker run -p 27017:27017 --name mongo \
-v /Users/noby/dockervolume/mongo/db:/data/db \
-d mongo:4

#### minio

docker run -p 9090:9000 -p 9001:9001 --name minio \
-v /Users/noby/dockervolume/minio/data:/data \
-e MINIO_ROOT_USER=minioadmin \
-e MINIO_ROOT_PASSWORD=minioadmin \
-d minio/minio server /data --console-address ":9001"

docker run -d \
 --name es \
 -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
 -e "discovery.type=single-node" \
 -v /Users/noby/dockervolume/es/data:/usr/share/elasticsearch/data \
 -v /Users/noby/dockervolume/es/plugins:/usr/share/elasticsearch/plugins \
 --privileged \
 --network es-net \
 -p 9200:9200 \
 -p 9300:9300 \
elasticsearch:7.12.1

docker run -d \
 --name es \
 -p 9200:9200 \
 -p 9300:9300 \
elasticsearch:7.12.1

docker run -d \
--name kb \
-e ELASTICSEARCH_HOSTS=http://es:9200 \
--network=es-net \
-p 5601:5601 \
kibana:7.12.1

#### zoffline

docker create --name zwift-offline -p 443:443 -p 80:80 -p 3024:3024/udp -p 3025:3025 -p 54:53/udp -v /Users/noby/dockervolume/zwift-offline/storage:/usr/src/app/zwift-offline/storage -e TZ=Asia/Shanghai zoffline/zoffline

python3 scripts/get_profile.py -u "tanyang338@gmail.com"

python3 scripts/strava_auth.py --client-id 09bd596c577ae6d7126f453dac18b589961f3d83 --client-secret 025939c2ffb3f96325878edda8b2351c529f759e

#### alist

docker create --name=alist xhofe/alist:latest -v /Users/noby/dockervolume/alist:/opt/alist/data -p 5244:5244 -e PUID=0 -e PGID=0 -e UMASK=022

#### OpenWebUI

docker create \
    --name open-webui \
    -p 3000:8080 \
    --add-host=host.docker.internal:host-gateway \
    -v /Users/noby/dockervolume/open-webui:/app/backend/data \
    ghcr.io/open-webui/open-webui:main
