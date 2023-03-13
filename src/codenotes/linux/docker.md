---
title: docker
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
### 菜鸟教程

* 网址

  ```
  https://www.runoob.com/docker/centos-docker-install.html
  ```

### 安装

* 官方安装脚本自动安装

  ```
  curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
  ```

* 设置阿里云镜像(阿里云镜像获取地址：https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors，登陆后，左侧菜单选中镜像加速器就可以看到你的专属地址了：)

  ```
  https://628s02d9.mirror.aliyuncs.com
  ```

  * 在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）：

    ```
    {"registry-mirrors":["https://628s02d9.mirror.aliyuncs.com/"]}
    ```

  * 重新启动服务

    ```
    systemctl restart docker
    ```

* 设置开机启动

  ```
  systemctl enable docker
  ```

* 启动

  ```
  systemctl start docker
  ```

* 查看状态

  ```
  systemctl status docker
  ```

### docker自带教程

* 命令

  ```
  docker [OPTIONS] --help
  eg:docker --help
  eg:docker ps --help
  ```

* 根据镜像生成后台启动容器

  ```
  docker run -d IAMGE [COMMAND]
  ```

  ```
  eg:
  runoob@runoob:~$ docker run -d ubuntu:15.10 /bin/sh -c "while true; do echo hello world; sleep 1; done"
  2b1b7a428627c51ab8810d541d759f072b4fc75487eed05812646b8534a2fe63
  ```

  


### docker中的核心概念

* 镜像：类似java中的类，他是生成可运行的容器的标准。镜像为联合文件系统(Union File System)，是一组文件，是分层结构，每层是一个基本的镜像文件。
  * eg:
    * tomcat:8.0
      * 他内部未集成jdk，不可直接运行java的项目，默认的start参数为`catalina.sh run`(在未执行命令和参数的前提下默认执行该命令和参数)(tomcat的startup.sh和shutdown.sh内部也使用的是catalina.sh命令)
    * tomcat:9-jdk8
      * 继承了jdk8的tomcat9，可以直接运行jar包
    * hello-world
      * docker的测试镜像
    * ubuntu:15.10
      * 默认的启动参数为`/bin/bash`
* 容器：类似java中的对象，他是由镜像创建而成，包含代码、运行时环境、系统工具、系统库和设置运行的容器，直接运行的对象，每个镜像生成的容器都有一个默认的启动命令，容器的命令都是基于自己容器内部的文件，如：tomcat 执行`start`启动后默认执行`catalina.sh run` 运行webapps中的项目；ubuntu执行`start`启动后默认执行`/bin/bash` 进入容器的内部(需要指定-it，否则容器会闪退)。也可以在创建容器时指定一个启动命令，之后`start`该容器则会执行该自定义参数。如：ubuntu执行`start`启动后设置执行`/bin/echo hello` 打印hello(需要指定-i打印到控制台，否则打印到日志文件)。创建后的容器将会一直存在，一个镜像可以生成多个相同的容器。大部分docker的容器基本都是基于linux制作而成
  * 状态：
    * “created”，表示已创建；
    * “restarting”，表示重启中；
    * “running”，表示运行中；
      * 正在运行的容器可执行 docker exec -it CONTAINER /bin/bash 进入容器的内部操作容器中的文件
    * “removing”，表示迁移中；
    * “paused”，表示暂停状态；
    * “exited”，表示停止等等。
* 仓库：存储镜像的地方
  * 分类：
    * 中央仓库: docker hub	docker官方存储docker镜像的服务器
    * 阿里云镜像
    * 本地服务器

### docker 的网络设置

- docker中容器通信的三种方式
  - 容器的ip地址
  - 宿主机的ip:宿主机映射到容器的端口
  - 容器名(需要使用自定义的网桥)

### docker 命令

* docker info
  * Display system-wide information
  * Usage:  docker info [OPTIONS]
  * Options:
    * -f, --format string   Format the output using the given Go template

* docker run
  * 解释：docker run命令为多个docker命令组合而来的一个综合命令，其执行过程分以下几步：第一步：在本地库中查询是否存在该IMAGE，若存在执行第二步。若不存在，则执行search命令在docker hub中查询是否存在该IMAGE，若存在，pull该IMAGE到本地库，执行第二步。若不存在，给出错误提示，命令执行结束；第二步：执行create命令根据本地库的该IMAGIN生成CONTIANER；第三步：执行start命令运行该CONTIANER
  * Run a command in a new container
  * Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
  * Options:
    *   -d, --detach                         Run container in background and print container ID
    *   -i, --interactive                    Keep STDIN open even if not attached
      * 指示 docker 要在容器上打开一个标准的输入接口
    *   -t, --tty                            Allocate a pseudo-TTY
      * 为容器分配一个伪终端
    *   -p, --publish list                   Publish a container's port(s) to the host
    * ​      --name string                    Assign a name to the container
    * ​      --rm                             Automatically remove the container when it exits
  * eg:
    * `docker run --name ubuntu ubuntu:15.10 /bin/echo "Hello world"` 
      * 基于ubnuntu:15.10镜像生成容器ubuntu，并且该容器用于执行 `/bin/echo` 命令(该命令也是存在ubuntu容器中的命令)，并且该命令的参数为 `"Hello world"`(默认ubuntu容器执行`/bin/bash`命令)
    * `docker run -it -p 9090:8080 --name=tomcat8 tomcat:8.0`
      * 基于tomcat:8.0镜像生成容器，该容器名为tomcat8，该容器的端口8080映射到宿主机的端口9090，本次的启动方式为打开一个标准的输入接口，并且打开分配一个伪终端，并且默认tomcat容器用于执行 `catalina.sh` 命令(该命令也是存在容器中的命令)(tomcat容器基于linux制作)，并且该命令的参数为 `run`(在未执行命令和参数的前提下默认执行该命令和参数)(tomcat的startup.sh和shutdown.sh内部也使用的是catalina.sh命令)(此时的9090不需要宿主机防火墙开启次端口的访问)

* docker search
  * Search the Docker Hub for images
  * Usage:  docker search [OPTIONS] TERM
  * Options:
  * eg:
    * `docker search hello-world` 
      * 在docker hub中检索关键字包括hello-world 的镜像，该镜像为docker的官方测试镜像
    * `docker search tomcat` 
      * 在docker hub中检索关键字包括tomcat的镜像

* docker pull

  * Pull an image or a repository from a registry

  * sage:  docker pull [OPTIONS] NAME[:TAG|@DIGEST]

  * Options:

  * eg:

    * `eg:docker pull hello-world` 
      * 从docker hub中拉取hello-world镜像，若未指定镜像的版本即为最新版(latest)
    * `eg:docker pull ubuntu:15.10`  
      * 从docker hub中拉取ubuntu镜像，版本为15.10

    

* docker images

  * List images
  * Usage:  docker images [OPTIONS] [REPOSITORY[:TAG]]
  * Options:
    *  -a, --all             Show all images (default hides intermediate images)
       *  -a显示包括中间镜像在内的所有镜像，中间层镜像是其它镜像所依赖的镜像。这些无标签镜像不应该删除，否则会导致上层镜像因为依赖丢失而出错
    *  -f, --filter filter   Filter output based on conditions provided
    *  -q, --quiet           Only show image IDs
  * eg:
    * `docker images` 
      * 显示所有顶层镜像(顶层镜像为我们直接使用到的镜像，中间层镜像我们可能使用不到，但他们是顶层镜像)
    * `docker images -qa` 
      * 显示所有镜像的id(可用于删除所有镜像)

* docker create
  * Create a new container

  * Usage:  docker create [OPTIONS] IMAGE [COMMAND] [ARG...]

  * Options:
    *   -i, --interactive                    Keep STDIN open even if not attached
        * 指示 docker 要在容器上打开一个标准的输入接口
    *   -t, --tty                            Allocate a pseudo-TTY
        * 为容器分配一个伪终端
    *   -p, --publish list                   Publish a container's port(s) to the host
    *   -e, --env list                       Set environment variables
    *   -v, --volume list                    Bind mount a volume
    * ​      --name string                    Assign a name to the container
    * ​      --network network                Connect a container to a network
    
  * eg:
    * `docker create --name ubuntu ubuntu:15.10 /bin/sh -c "while true;do echo hello world;sleep 1; done"`
      * 创建循环输出hello world的容器
    
    * `docker create -p 9090:8080 --name tomcat9jdk8 tomcat:9-jdk8`
      * 基于tomcat:9-jdk8镜像生成容器，该容器名为tomcat9jdk8 ，该容器的端口8080映射到宿主机的端口9090，本次的启动方式为打开一个标准的输入接口，并且打开分配一个伪终端，并且默认tomcat容器用于执行 `catalina.sh` 命令(该命令也是存在容器中的命令)(tomcat容器基于linux制作)，并且该命令的参数为 `run`(在未执行命令和参数的前提下默认执行该命令和参数)(tomcat的startup.sh和shutdown.sh内部也使用的是catalina.sh命令)(此时的9090不需要宿主机防火墙开启次端口的访问)
    
    * `docker create -p 8080:8080 -v /usr/local/dockervolume/tomcat/webapps:/usr/local/tomcat/webapps --name tomcat9jdk8 tomcat:9-jdk8`
    
      * 基于tomcat:9-jdk8镜像生成容器，并创建数据卷(目录挂载)，宿主机中目录的内容与容器中的目录的内容一致，其中一方的改动将影响另一方
    
    * `docker create --network mybridge -v /usr/local/dockervolume/tomcat/webapps:/usr/local/tomcat/webapps --name tomcat9jdk8 tomcat:9-jdk8`
    
      * 基于tomcat:9-jdk8镜像生成容器，并创建数据卷(目录挂载)，并连接自定义的网络(自定义的网络可以实现使用容器名实现容器中间的通信)(默认为连接docker0网络，该网络无法实现使用容器名实现容器直接的通信)
    
    * `docker create --name mysql \
      -p 3306:3306 \
      -v /usr/local/dockervolume/mysql/conf:/etc/mysql/conf.d \
      -v /usr/local/dockervolume/mysql/data:/var/lib/mysql \
      -e MYSQL_ROOT_PASSWORD=123 \
      mysql:5.7`
    
      * MySQL(5.7.19)的默认配置文件是 /etc/mysql/my.cnf 文件。如果想要自定义配置，建议向 /etc/mysql/conf.d 目录中创建 .cnf 文件。新建的文件可以任意起名，只要保证后缀名是 cnf 即可。新建的文件中的配置项可以覆盖 /etc/mysql/my.cnf 中的配置项。
      * 在容器中运行`mysql -uroot -p DATABASE < ***.sql`将数据库的数据写入容器
    
    * `docker create --name mysql \
      --network mybridge \
      -v /usr/local/dockervolume/mysql/conf:/etc/mysql/conf.d \
      -v /usr/local/dockervolume/mysql/data:/var/lib/mysql \
      -e MYSQL_ROOT_PASSWORD=123 \
      mysql:5.7`
    
      * 容器的通信方式为自定义网络，连接到mybridge网络
      * 在容器中运行`mysql -uroot -p DATABASE < ***.sql`将数据库的数据写入容器
    
    * `docker create --name nginx \
      -p 80:80 \
      -v /usr/local/dockervolume/nginx/nginx.conf:/etc/nginx/nginx.conf \
      nginx`
    
      * /etc/nginx/nginx.conf 为nginx的默认配置文件
    
      * /etc/nginx/conf.d 为nginx的配置文件目录，该目录下的配置文件可以覆盖默认配置文件
    
      ```
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
    
        
    
    * `docker create --name nginx \
      --network mybridge \
      -v /usr/local/dockervolume/nginx/nginx.conf:/etc/nginx/nginx.conf \
      nginx`
    
      * 容器的通信方式为自定义网络，连接到mybridge网络
      * /etc/nginx/nginx.conf 为nginx的默认配置文件
      * /etc/nginx/conf.d 为nginx的配置文件目录，该目录下的配置文件可以覆盖默认配置文件

* docker ps
  * List containers
  * Usage:  docker ps [OPTIONS]
  * Options:
    * -a, --all             Show all containers (default shows just running)
    * -f, --filter filter   Filter output based on conditions provided
    *  -q, --quiet           Only display container IDs
  * eg：
    * `docker ps` 
      * 显示运行的容器
    * `docker ps -a`
      * 显示所有的容器
    * `docker pa -aq` 
      * 显示所有的容器的id(可用于删除所有容器)

* docker container(该命令是在docker ps基础上后增加的，更加全面，部分命令功能同docker ps)

  * Manage containers
  * Usage:  docker container COMMAND
  * Commands:
    * ls          List containers
    * port        List port mappings or a specific mapping for the container

* docker start 
  * Start one or more stopped containers
  * Usage:  docker start [OPTIONS] CONTAINER [CONTAINER...]
  * Options:
    *   -i, --interactive          Attach container's STDIN
        *   指示 docker 要在容器上打开一个标准的输入接口
  * eg:
    * `docker start -i tomcat8`
      * 交互界面运行tomcat8容器
    * `docekr start tomcat8`
      * 运行tomcat8容器

* docker stop

  * Stop one or more running container
  * Usage:  docker stop [OPTIONS] CONTAINER [CONTAINER...]
  * Options:

* docker exec
  * Run a command in a running container
  * Usage:  docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
  * Options:
    *   -d, --detach               Detached mode: run command in the background
    *   -i, --interactive          Keep STDIN open even if not attached
        *   指示 docker 要在容器上打开一个标准的输入接口
    *   -t, --tty                  Allocate a pseudo-TTY
        *   为容器分配一个伪终端
  * eg:
    * `docker exec -it tomcat8 /bin/bash`
      * 对tomcat8执行bash命令，该命令进入tomcat8容器内部，并将-i和-t连接起来，使得在-t的伪终端输入的命令可以传入容器中执行(/bin/bash可简化为bash)

* docker logs

  * Fetch the logs of a container
  * Usage:  docker logs [OPTIONS] CONTAINER

* docker rm

  * Remove one or more containers
  * Usage:  docker rm [OPTIONS] CONTAINER [CONTAINER...]
  * Options:
    * -f, --force     Force the removal of a running container (uses SIGKILL)
  * eg:
    * `docker rm -f $(docker images -aq)` 
      * 删除所有镜像，即使在运行的容器

* docker mri
  * Remove one or more images
  * Usage:  docker rmi [OPTIONS] IMAGE [IMAGE...]
  * Options:
    * -f, --force      Force removal of the image
  * eg:
    * `docker rmi -f $(docker ps -aq)` 
      * 删除所有的容器，即使在运行的容器

* docker cp
  * Copy files/folders between a container and the local filesystem
  * Usage:  
    * docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|
    * docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH
  * Options:
  * eg：
    * `docker cp /usr/local/myweb/servletSum.war tomcat8:/usr/local/tomcat/webapps` 
      * 将宿主机中的文件复制到tomcat8容器的指定路径
    * `docker cp tomcat8:/usr/local/tomcat/webapps/servletSum.war /usr/local/myweb` 
      * 将tomcat8容器中的文件复制到宿主机的指定路径

* docker inspect

  * Return low-level information on Docker objects
  * Usage:  docker inspect [OPTIONS] NAME|ID [NAME|ID...]
  * eg:
    * `docker inspect tomcat9jdk8`
      * 用于查看Mounts中的数据卷

* docker volume ls

  * List volumes
  * Usage:  docker volume ls [OPTIONS]
  * eg:
    * `docker volume ls`
      * 用于查看docker所有的数据卷

* docker network

  * Manage networks
  * Usage:  docker network COMMAND
  * Commands:
    * connect     Connect a container to a network
    * create      Create a network
    * disconnect  Disconnect a container from a network
    * inspect     Display detailed information on one or more networks
    * ls          List networks
    * rm          Remove one or more networks
  * eg:
    * docker network create -d bridge mybridge
      * 创建一个名为mybridge的bridge网络(在未指定种类的情况下默认为bridge)
    * docker network ls
      * 查看已存在的网络(DRIVER为网络的种类，有bridge、host、null三种)
    * docker network connect mybridge tomcat9jdk8
      * 将tomcat9jdk8容器与mybridge网络间接在一起
    * docker network inspect mybridge
      * 查看mybridge网络的详细信息，"Containers"查看加入该网络的容器
    * docker network rm mybridge
      * 删除mybridge网络

* docker export
  * Export a container's filesystem as a tar archive
  * Usage:  docker export [OPTIONS] CONTAINER
  * eg:
    * `docker export 7691a814370e > ubuntu.tar`
      * 把容器id为7691a814370e 的容器打包为ubuntu.tar文件到当前路径
* docker import
  * Import the contents from a tarball to create a filesystem image
  * Usage:  docker import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]
  * eg:
    * `cat ubuntu.tar | docker import - test/ubuntu:v1.0`
      * 把当前路径ubuntu.tar解析为名为test/ubuntu:v1.0的docker镜像导入
