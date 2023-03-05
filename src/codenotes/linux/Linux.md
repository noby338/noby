---
# 当前页面内容标题
title: Linxu
# 当前页面图标
icon: write
# 分类
category:
  - 代码笔记
  - Linux
# 标签
tag:
  - 代码笔记
  - Linux
sticky: 1
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

###  目录结构

* | 文件夹               | 英文全称                               | 文件夹作用                                                   |
  | -------------------- | -------------------------------------- | ------------------------------------------------------------ |
  | **/bin -> /usr/bin** | Binaries                               | 存放系统常用命令的目录，所有用户都可以执行。这些命令和系统启动无关，单人维护模式下还能够被操作的指令 |
  | /boot                | Boot                                   | 存放系统开机启动加载程序的Linux核心文件。                    |
  | /dev                 | Devices                                | 所有的装置和接口设备的存放位置                               |
  | **/etc**             | Editable Text Configuration Chest      | 存放配置文件的目录                                           |
  | **/home**            | Home                                   | 一般用户的根目录(root用户的根目录位于 root)                  |
  | /lib -> /usr/lib     | Library                                | 存放系统程序运行所需的共享库                                 |
  | /lost+found          | Lost And Found                         | 存放一些系统出错的检查结果                                   |
  | /media               | Media                                  | 挂载目录。 挂载媒体设备，如软盘和光盘                        |
  | /mnt                 | Mount                                  | 挂载目录。临时文件系统的安装点，默认挂载光驱和软驱的目录     |
  | **/opt**             | Optional Application Software Packages | 可选应用软件包，第三方安装的软件保存位置，存放软件安装包。(以前的linux放在 /usr/local，如今也有这样的习惯) |
  | /proc                | Processes                              | 虚拟文件系统，数据保存在内存中，存放当前进程信息             |
  | **/root**            | Root                                   | 存放root用户的相关文件,root用户的家目录。宿主目录，超级用户  |
  | **/run**             | Run                                    | 里面的东西是系统运行时需要的, 不能随便删除. 但是重启的时候应该抛弃. 下次系统运行时重新生成 |
  | /sbin -> /usr/sbin   | Superuser Binaries                     | 保存和系统环境设置相关的命令，只有超级用户可以使用这些命令，有些命令可以允许普通用户查看。 |
  | /srv                 | Server                                 | 服务数据目录                                                 |
  | /sys                 | System                                 | 文件系统                                                     |
  | **/tmp**             | Temporary                              | 存放临时文件                                                 |
  | **/usr**             | Unix Software Resources                | Unix软件目录，存放所有命令、库、手册页等                     |
  | **/var**             | Variable                               | 是储存各种变化的文件，比如log等等                            |
  | **/usr/local**       | Local                                  | 安装第三方软件的安装目录，一般是通过编译源码的方式安装的程序。 |
  | **/usr/local/src**   | Source                                 | 安装第三方软件的源码目录，一般是通过编译源码的方式安装的程序。 |
  | /misc                | Miscellaneous Device                   | 挂载目录。 挂载NFS服务                                       |

* | 文件               | 文件的作用                                       |
  | ------------------ | ------------------------------------------------ |
  | /etc/profile       | 系统整体的配置文件（jdk的配置文件配置在此）      |
  | ~/.bash_profile    | 某个用户的配置文件                               |
  | /etc/rc.d/rc.local | 设置开机自动执行脚本(需将该文件需改为可执行文件) |
  | ~/.bashrc          | 该用户bash的配置文件                             |
  | /etc/bashrc        | bash的配置文件                                   |
  | /etc/passwd        | 账户信息                                         |
  | /etc/shadow        | 账户的密码                                       |
  | /etc/group         | 群组信息                                         |
  | /etc/gshadow       | 群组的密码                                       |

  

### 常用快捷键

* [Tab]：
  * 在指令后面表示，指令补全提示
    * eg:`dat [Tab]`
      * 当dat开头的命令仅仅为一个时，直接补全命令
    * eg: `d [Tab][Tab]`
      * 当d开头的命令不仅仅为一个时，一个[Tab]键将不能补全，使用两次[Tab]键将可列出所有符合规则的指令

  * 在文件后面表示，文件补全提示
    * eg:`cd 目录部分文件名[Tab]`
      * 当符合要求的文件名仅仅为一个时，直接补全文件名

  * 在选项后面表示，选项补全，该功能需要安装bash-completion命令补全增强软件包
    * eg:`date --[Tab][Tab]`
      * 什么都不输入的情况下，按[Tab]两次列出所有选项
* [ctrl]+[c]:
  * 强制退出当前程序
* [ctrl]+[d]:
  * 退出当前程序
* [shift]+[pagedown]/[pageup]
  * 命令行上下翻页
* [ctrl]+[pagedown]/[pageup]
  * 上下行移动
* [Alt]+[Backspace]
  * 命令行环境下，删除光标之前的当前词
* [Ctrl]+[U]
  * 从光标处删除文本直到行首
* [Ctrl]+[L] 
  * 清屏
* [Ctrl]+[R] 
  * 按字符串寻找历史命令(继续Ctrl R 切换匹配项)
* [Ctrl]+[Z]
  * 把当前进程放到后台（之后可用''fg''命令回到前台）
* [Ctrl]+[w] 
  * 删除词

### linux中的文件

- linux中的文件没有强制要求扩展名，但通常会以一定的规则指定扩展名，使他人了解文件的可能用途
  - .sh 
    - 脚本或批处理文件（sh表示shell）
  - .tar .tar.gz .zip .tgz 表示gunzip和tar生成的压缩文件
  - .html 表示网页文件

### 命令帮助

* 指令的 --help求助说明
  * eg: `date --help`
* man page
  * eg: `man date`
* info page 
  * eg: `info date`

### 命令的组成

* `command [-options] parameter1 parameter2 ...`
  * command为指令的名称，例如变换工作目录的指令为cd等等；一行指令中第一个输入的部分绝对是指令(command)或可执行文件（例如批次脚本，script)
  * 中刮号[]并不存在于实际的指令中，而加入选项设定时，通常选项前会带 - 号，（有时也会带+号）例如 -h；有时候会使用选项的完整全名，则选项前带有 -- 符号，例如 --help;
  * parameter1、parameter2 为依附在选项后面的参数，作为command的参数；
  * 指令，选项，参数之间空格符来分隔，不论空几格shll都视为一格；
  * 按下[Enter]按键后，该指令就立即执行。[Enter]按键代表着一行指令的开始启动。
  * 指令太长的时候不方便观看时，可以使用反斜杠 \ +[Enter] ，使指令连续到下一行。
  * 其他：
    * 在Linux系统中，英文大小写字母是不一样的。举例来说，cd与CD并不同。
* linux下达指令时，会有两种主要的情况：
  * 输入指令后直接显示结果，然后回到命令提示字符环境；
    * eg:`date`
  * 输入指令后进入到该软件功能的环境，直到输入结束指令(eg:quit,exit)才退出软件回到命令提示字符的环境。
    * eg:`bc`
* bash中，当命令太长时，可使用 /（转义字符）将enter转义，从而达到换行的目的
* 多条命令同时书写可用 ; 隔开

### 常用命令

* reboot: 重启
* sync
  * 更新i-node 表，并将缓冲文件写到硬盘中
* ifconfig: 配置和显示Linux系统网卡的网络参数，查看 IP(centos 最小版，没有网络工具包)
* ip addr: 查看 IP(centos 最小版可用)
* ping: 用来测试主机之间网络的连通性
  * eg: `ping 192.168.1.110`
* netstat: 查看Linux中网络系统状态信息
  * eg: `netstat -anp | grep 3306`
    * 查看3306端口的占用情况
* curl: 利用URL规则在命令行下工作的文件传输工具，查看网络是否能够访问某域名
  * eg: `curl www.baidu.com`
* firewall-cmd: 防火墙设置
  * eg: `firewall-cmd --zone=public --query-port=8080/tcp`
    * 查看端口
  * eg: `firewall-cmd --zone=public --add-port=8080/tcp --permanent`
    * 添加开放端口，–permanent永久生效，没有此参数重启后失效
  * eg: `firewall-cmd --reload`
    * 重新载入--重启防火墙
  * eg: `firewall-cmd --zone=public --remove-port=6379/tcp --permanent`
    * 删除端口
* clear: 终端清屏
* ls(list directory contents): 目录查看
  * 颜色：蓝色为文件夹，白色为一般文件，绿色为可执行文件
  * 选项
    * -a: 全部文件
    * -d: 仅列出文件夹
    * -l: 长数据串列出详细属性
    * -i: 查看inode
    * --time: 
      * mtime(modification time)
        * 文件内容数据修改时间
      * ctime(status time)
        * 文件状态改变的时间
      * atime(access time)
        * 文件内容被读取的时间
  * eg: `ls nobydir`
    *  查看nobydir目录的下的文件列表
  * eg: `ls -l`
    * 查看当前目录的下的目录的详细文件列表(很多发行版可简写为 ll)
  * eg: `ls -al`
    *  查看当前目录的下的隐藏目录的详细信息
  * eg: `ll /etc/man_db.conf;ll --time=atime /etc/man_db.conf;ll --time=ctime /etc/man_db.conf`
    * 查看该文件对应的内容数据修改时间(不加参数的默认状态)，状态数据时间，内容读取时间；多个命令之间可用 ; 号隔开
* pwd(print work directory): 显示路径

  * eg: `pwd `
    * 显示当前位置路径
  * eg: `pwd -P`
    * 显示当前位置路径的真实路径（非链接路径）
* cd(change directory): 目录切换

  * eg: `cd /`
    * 退回到根目录
  * eg: `cd ../`
    *  退回到上级目录(所有的目录都存在 .. 和 . 代表上一层目录和本层目录)
  * eg: `cd ../..`
    *  退回到上两层目录
  * eg: `cd /usr/local/src`
    * 表示进入根目录下的 /usr/local/src 路径
  * eg: `cd local/src`
    * 表示进入当前目录下的 local/src 路径
  * eg: `cd ~(或cd)`
    * 进入本用户的家目录(root 用户的家目录为 /root，非 root 用户的根目录为 /home/用户名)
  * eg: `cd ~用户名`
    * 进入指定用户的家目录
  * eg: `cd -`
    * 退回上次记录径路
* mkdir(make directory): 建立目录

  * eg: `mkdir testdir`
    * 当前路径下建立目录
    * mkdir a && cd $_
  * eg: `mkdir testdir && cd $_`
    * 当前路径下建立目录，并进入该目录，$_ 表示在此之前执行的命令或者脚本的最后一个参数
  * eg: `mkdir -p testdir1/testdir2`
    * 建立多层目录
  * eg: `mkdir -m 755 testnobydir`
    * 建立权限为 755 的目录(不指定默认为755)
* rmdir(remove directory): 删除空目录

  * eg: `rmdir testdir`
    * 删除当前路径下的testdir空目录
  * eg: `rmdir -p testdir1/testdir2`
    * 删除多层空目录
* rm(remove): 删除命令

  * eg: `rm -r testdir`
    * 删除目录及其内部文件及文件夹
  * eg: `rm -f text.txt`
    * 删除该文件且不提示
* cp(copy): 复制

  * 选项
    * -a: 相当于 -dr --preserve=all 的组合，表示来源文件为链接文件时，复制链接文件属性；递归复制；复制所有的属性和文件本身
    * -d: 表示来源文件为链接文件时，复制链接文件属性而非文件本身(不用该选项会造成将文件本身复制过来)
    * -i: 存在相同的目标文件时，询问是否覆盖（很多发行版已经默认加上）
    * -p(--preserve): 将文件和文件属性同时复制（默认为复制文件，属性为默认属性）
    * -r(recursion): 递归复制，通常用作复制目录
    * -u(update): 仅仅在源文件和目标文件不同时（或目标文件不存在时）复制
    * -l(hard link): 建立硬链接
    * -s(soft link): 建立符号链接（快捷方式）
  * eg: `cp ~/.bashrc ~/.bash_history /tmp`
    * 可同时复制多个文件或文件夹到某一个路径下
* rm(remove): 删除

  * 选项
    * -f: 强制，不提醒删除
    * -r: 递归删除
    * -i: 删除前确定（很多的发行版已经默认加上）
  * eg: `rm -rf nobydir`
    * 不提醒删除文件夹及其子文件夹和文件
* mv(move): 移动/重命名

  * 选项
    * -f: 强制，不提醒移动
    * -i: 若存在目标文件，会询问是否覆盖
    * -u(update): 只有源文件比目标文件新（或目标文件不存在时）才覆盖
  * eg: `mv nobydir nobydir2`
    * 将本文件夹下的nobydir更名为nobydir2
  * eg: `mv testdir testdir2 /tmp`
    * 将多个文件夹/文件移动至某个文件夹下
* cat(concatenate)(连续): 文件的查看，输出后回到命令提示符（一次性输出结果）

  * 选项
    * -A: 参看包括特殊符号在内的文本
    * -n: 添加行号（空白显示行号）
    * -b: 添加行号（空白不显示行号）
* more: 文件的查看，进入软件的环境（分页显示）

  * q: 退出软件
  * f(forword)/space: 向下翻页
  * b(backword): 向上翻页
  * enter: 向下翻行
  * /字符串: 向下查找内容
  * :f: 显示文件名及当前行数
* less: 文件的查看，进入软件的环境（分页显示）

  * q: 退出软件
  * pagedown: 向下翻页
  * pageup: 向上翻页
  * /字符串: 向下查找内容
  * ?字符串: 向上查找内容
  * n/N: 查找的内容中切换
  * g/G: 第一行和最后一行切换
* head: 文件的查看，查看前几行，输出后回到命令提示符（一次性输出结果）

  * eg: `head /etc/man_db.conf`
    * 查看前10行（默认为10行）
  * eg: `head -n 5 /etc/man_db.conf`
    * 查看前5行
* tail: 文件的查看，查看后几行，输出后回到命令提示符（一次性输出结果）

  * eg: `tail /etc/man_db.conf`
    * 查看后10行（默认为10行）
  * eg: `tail -n 5 /etc/man_db.conf`
    * 查看后5行
  * eg: `head -n 20 /etc/man_db.conf | tail -n 10`
    * 显示11到20行的内容，| 表示管道命令，即为将前面的而结果交给后面执行
* touch: 新建文件，修改文件的时间

  * 选项
    * -a: 仅修订 atime 
    * -c: 仅修改 ctime
    * -d: 修改为指定日期
    * -m: 仅修改 mtime
    * -t: 修改为指定时间
* umask: 指定目前用户在建立文件或目录时候的权限默认值

  * eg: `umask`
    * 权限显示，第一组是特殊权限。后三位数与一般权限有关，文件为666的互补数字，文件夹为777的互补数字。即021代表646文件权限，代表的文件夹权限为756

  * eg: `umask -S`
    * -S 表示Symbolic，可以看到符号类型的方式显示权限

  * eg: `umask 002`
    * 将当前账号的文件权限修改为664，文件夹权限修改为775
* chattr: 设置某个文件的隐藏属性

  * 选项
    * i: 让文件不能修改、删除、更名等，只有root才能设置此属性
    * a: 让文件只能写入，只有root才能设置此属性

  * eg: `chattr +i test.txt`
    * 给 test.txt 添加 i 隐藏属性

  * eg: `chattr -a test.txt`
    * 移除 test.txt 的 a 隐藏属性
* lsattr: 查看某个文件的隐藏属性

  * 选项
    * -a: 将隐藏文件的属性也显示出来
    * -d: 如果接的是目录，仅列出目录本身的属性而非目录内的文件名
    * -R: 连同子目录的数据一同显示

  * eg: `lsattr test.txt`
    * 列出 test.txt 的隐藏属性
* file: 判断文件格式

  * eg: `file ~/.bashrc`
    * 判断该文件的格式
* which: 根据PATH路径搜索命令位置

  * eg: `which ls`
  * eg: `which history`
    * history 为bash内建的指令，不能在PATH中找到
* whereis: 在一些特定的目录中寻找文件和文件名(不能全部找到)

  * 选项
    * -l: 可列出 whereis 会去查询的几个主要目录
    * -b: 只找 binary 格式的文件
    * -m: 只找在说明文件 manual 路径下的文件
* locate: 在已建立的数据库中寻找(/var/lib/mlocate/)

  * 选项
    * -i: 忽略大小写
    * -l: 列出指定行数，列入 -l 5

  * eg: `locate -l 5 passwd`
* find: 在磁盘中查找文件

  * find [PATH] [option] [action]

  * 选项
    * -mtime n: 查找在距今 n 天之前的一天之内被改动的文件(-ctime 为状态改变，-atime为文件内容被读取)
    * -mtime +n: 查找在距今 n 天之前被改动的文件
    * -mtime -n: 查找在具备 n 天之后被改动的文件
    * -newer file: 列出比 file 还要早的文件
    * -user name: 列出某用户的文件
    * -name filename: 列出文件名为filename的文件

  * eg: `find / -mtime 0`
    * 列出根目录之前24h修改的文件

  * eg: `find /etc -newer /etc/passwd`
    * 列出/etc中比/etc/passwd 新的文件

  * eg: `find /home -user noby`
    * 列出/home中noby用户的文件

  * eg: `find / -name passwd`
    * 列出/中的名为passwd的文件
* ln: 建立连接

  * 硬链接：不能跨 filesystem，不能link目录，相同的硬链接连接同一个block，只要删除的不是最后一个连接就不会删除文件对应的block
    * eg: `ln /etc/crontab .`
      * 在当前目录建立同名/etc/crontab 的硬连接

    * eg: `ln /etc/crontab corntab2`
      * 在当前目录建立/etc/crontab 的硬连接corntab2

  * 软连接（符号链接）：只是在原文件上建立了一个指向原文件名的文件
    * eg: `ln /etc/crontab crontab_link`
      * 建立一个软连接在当前目录
* 压缩文件的扩展名
  * .Z: compress程序压缩的文件：
  * .zip: zip程序压缩的文件
  * .gz: gzip程序压缩的文件
  * .bz2: bzip2程序压缩的文件
  * .xz: xz程序压缩的文件
  * .tar: tar程序打包的数据，并没有压缩过
  * .tar.gz: tar程序打包的文件，其中并且经过gzip的压缩（使用最多）
  * .tar.bz2: tar程序打包的文件，其中并且经过bzip2的压缩
  * .tar.xz: tar程序打包的文件，其中并且经过xz的压缩
* gzip: 可以用于.Z .zip .gz 的压缩、解压指令
  * 选项
    * -c: 将压缩的数据输出到屏幕上，可透过数据流冲导向来处理
    * -c: 解压的参数
    * -t: 可以用来检验一个压缩文件的一致性
    * -v: 可以显示出原文件/压缩文件的压缩比等信息
    * -#: #代表数字，代表选择压缩的等级，-1最快，压缩比最差，-9最慢，压缩比最好

  * eg: `gzip -v services`
    * 压缩services并显示信息，压缩后的原文件将不复存在

  * eg: `gzip -d services.gz`
    * 解压services，解压后的原文件将不复存在
  * eg: `gzip -9 -c services > services.gz`
    * 使用最佳压缩比压缩，保留原文件
* zcat/zmore/zless: 在不解压的情况下，读取文本压缩文件的内容，可以用于.Z .zip .gz 的压缩文件
  * eg:  zcat services.gz
    * 在不解压的情况下，读取文本压缩文件的内容
* bzip2: 取代gzip并提供更好的压缩比
  * 选项
    * -c: 将压缩的过程产生的数据输出到屏幕上！
    * d: 解压缩的参数
    * -k: 保留源文件，而不会删除原始的文件喔！
    * -z; 压缩的参数（默认值，可以不加）
    * -v: 可以显示出原文件/压缩文件案的压缩比等信息：
    * -#: 与gzip同样的，都是在计算压缩比的参数，-9最佳，-1最快！

  * eg: `bizp2 -v services`
    * 压缩，并取代原文件

  * eg: `bzip2 -d services.bz2`
    * 解压缩

  * eg: `bzip2 -9 -c services > services.bz2`
    * 最佳压缩比，保留原文件
* bzcat/bzmore/bzless/bzgrep:  在不解压的情况下，读取文本压缩文件的内容
  * eg: `bzcat services.bz2`
    * 在不解压的情况下，读取文本压缩文件的内容
* xz: 压缩比更高的压缩、解压软件
  * 选项
    * -d: 解压
    * -r: 测试压缩文件的完整性
    * -l: 列出压缩文件的相关信息
    * -k: 保留原本的文件不删除
    * -c: 将数据由屏幕上输出
    * -#: 调整压缩比

  * eg: `xz -v services`
    * 压缩

  * eg: `xz -l services.xz`
    * 列出压缩文件的信息

  * eg: `xz -d services.xz`
    * 解压缩

  * eg: `xz -k services`
    * 保留原文件压缩
* tar: 打包、压缩指令
  * 选项
    * -c: 建立打包文件，可搭配-v来察看过程中被打包的档名(filename)
    * -t: 察看打包文件的内容含有哪些档名，重点在察看文件名就是了；
    * -x: 解打包或解压缩的功能，可以搭配-C(大写)在特定目录解开。特别留意的是，-c,-t,-x不可同时出现在一串指令列中。
    * -z: 透过gzip的支持进行压缩/解压缩：此时档名最好为.tar.gz
    * -j: 透过bzip2的支持进行压缩/解压缩：此时档名最好为.tar.bz2
    * -J: 透过xz的支持进行压缩/解压缩：此时档名最好为.tar.xz。特别留意，-z,-j,-J不可以同时出现在一串指令列中
    * -v: 在压缩/解压缩的过程中，将正在处理的文件名显示出来！
    * -f filename: -f后面要立刻接要被处理的档名！建议-f单独写一个选项啰！（比较不会忘记）
    * -C 目录: 这个选项用在解压缩，若要在特定目录解压缩，可以使用这个选项。
    * -p(小写): 表示保留备份数据的原本权限与属性，常用于备份
    * -P(大写): 表示保留绝对路径，允许备份数据中含有根目录存在之意

  * eg: `tar -jcv -f filename.tar.bz2 要被压缩的文件或目录`
    * 压缩，-z(.gz),-j(.bz2),-J(.xz)表示解压和压缩的方式，c表示打包，-f表示执行的文件，v表示的处理的过程

  * eg: `tar -jtv -f filename.tar.bz2`
    * 查询，-t表示查看
  * eg: `tar -jxv -f filename.tar.bz2 -C 要解压到的目录`
    * 解压，-x表示解压，-C表示解压的目录
* alias: bash中的命令别名，当前bash生效
  * 编辑~/.bashrc: 该账户alias永久有效
    * eg: `source ~/.bashrc`
      * 刷新文件

  * 编辑/etc/bashrc: 所有用户alias永久生效
    * eg: `source /etc/bashrc`

  * eg: `alias`
    * 查看bash中的别名，其中有一部分是发行版的预设
  * eg: `alias la='ll -al --color=auto'`
    *  添加命令别名
  * eg:  `unalias la`
    *  移除命令别名
* source: 将配置文件的内容读进目前的shell中，source命令通常用于保留、更改当前shell中的环境变量。
  * eg: `source ~/.bashrc`
    * 将更改后的~/.bashrc更新到shell中（否则需要重启）
* history: 查看历史命令 !数字 执行历史命令
  * eg: `history`
    * 查看当前的历史命令，输入 !数字 执行命令

  * eg: `!number`
    * 执行第number命令

  * eg: `!ls`
    * 执行最近的 ls 开头的命令
* test: 查看指定目录下的文件或文件夹是否存在，判断条件，可用 [] 代替
  * -e: 是否存在
  * -f: 该名的文件是否存在
  * -d: 该名的目录是否存在
  * -r: 该名文件是否存在并且具有可读性
  * -w: 该名文件是否存在并且具有可写性
  * -e: 该名文件是否存在并且具有可执行性
  * -a: and
  * -o: or
  * !: 非
  * eg: `test -e noby;echo $?`
    * 某任何类型的文件或文件夹是否存在

  * eg: `test -f text.txt;echo $?`
    * 文件是否存在

  * eg: `test -d nobydir;echo $?`
    * 文件夹是否存在


### vim文件编辑器

* 输入 vimtutor 进入 linux 自带的练习
* vi和vim的区别
  * vi主要用于文本编译
  * vim主要用于程序编写，具有颜色提示和文本补齐，为vi的升级版，vi中的大部分内容和功能都包含

* vim/vi的三种模式
  * 一般模式
    * 编辑模式或底行模式下，按 esc 退出到一般模式
      * 常用命令
        * v: 字符选择
        * V: 行选择
        * [Ctrl] + v: 区块选择
        * [Ctrl] + w: 多窗口条件下，上下键窗口选择，q为删除窗口
        * ZZ: 改动后，保存改动离开。没保存直接离开
        * y数字y(数字yy)：复制行
        * y$：复制光标位置到行末
        * y^：复制光标位置到行首
        * yw：复制当前单词
        * 数字p：粘贴
        * 数字dd：删除行
        * d$：删除光标位置到行末
        * d^：删除光标位置到行首
        * dw：删除单词
        * n/N：跳转查找词
        * u：撤销
        * x：删除字符
        * X：退回字符
        * r：字符替换
        * R：依次替换
        * w：移动到下个词首
        * e：移动到下个词尾
        * b：移动到上个词首
        * gg：移动到文件开头
        * G：移动到文件结尾
        * 数字G：移动到指定行(可通过:set nu命令打开行编号，:set nu为关闭行编号)
  * 编辑模式：行低显示insert
    * i/a/o/I/A/O 进入编辑模式
  * 底行模式：输入:,/,?进入
    * :q!：退出不保存
    * :wq：退出保存
    * :wq!：强制退出保存只读文件
    * :w：保存
    * :w [filename]: 将当前文件另存为filename
    * :n1,n2 w [filename]: 将当前文件的n1到n2行另存为filename
    * :r [filename]: 将其他文件的数据读取到当前文件的光标处
    * :q：退出
    * :! command:占时离开vim执行command显示器结果
    * :/word：向下查找单词
    * :?word:  向上查找单词
    * :n/N: 多文件编辑文件跳转
    * :files: 多文件编辑文件列表查看
    * :sp [filename]: 将filename加入多窗口，不输入时为将该文件再开一个窗口
    * :s/老单词/新单词：本行第一个单词替换
    * :s/老单词/新单词/g：本行所有单词替换
    * :n1,n2s/老单词/新单词/g：n1到n2行所有单词替换
    * :%s/老单词/新单词：所有行第一个单词替换
    * :%s/老单词/新单词/g：所有行所有单词替换
    * :set all: 显示所有的环境设定
* vim编辑器的环境设定
  * 设置配置文件
    * 本机的配置文件位于/etc/vimrc
    * 账户的配置文件位于~/.vimrc

  * 常用的配置
    * :set nu：显示行号 :set nonu：取消行号
    * :syntax on: 进行语法检验
    * :set hlsearch: 高亮反白

### linux shell


* 解释：shell 是作为用户和linux的核心(kernel)之间的交流媒介，是提供用户操作系统的一个接口。shell 可以控制其他应用程序，如ls、vim、tar等指令都是调用应用程序的过程。只要能过操作应用程序的接口都能够称为shell（壳程序），狭义的shell指的是命令行方面的软件（如bash），广义的shell则包括图形接口的软件。
* bash是linux的shell之一。linux的默认shell程序是bash
* 使用者通过命令行或图形界面的方式和shell交流，使之控制kernel，从而kernel控制硬件做出相应的响应
* bash配置文件的位置 ~/.bashrc，配置之后重启生效

  * eg: `export mysrc="/usr/local/src/"`

    * 配置自定义变量
* bash中的符号

  * `#`: 批注符号：这个最常被使用在script当中，视为说明！在后的数据均不执行
  * `\`: 跳脱符号：将「特殊字符或通配符」还原成一般字符
  * `|`: 管线(pipe):分隔两个管线命令的界定，管线命令只可用于接收来自正确的输出，将正确的输出进一步处理，|的后面只可跟可以处理 standard input 的命令，如less,more,head,tail等，ls,cp,mv等不可接收管线命令
    * eg: `last | grep 'root'`

      * last输出登陆信息，找出带'root'的行，并显示出来

    * eg: `grep 'MANPATH' /etc/man_db.conf`

      * 输出带有MANPATH字样的行

  * `;`: 连续指令下达分隔符：连续性命令的界定（注意！与管线命令并不相同）
  * `~`: 用户的家目录
  * `$`: 取用变数前导符：亦即是变量之前需要加的变量取代值
  * `&`: 工作控制((job control):将指令变成背景下工作
  * `&&`: and符号，表示前者命令正确后执行后面命令，否则不执行后面命令。
  * `||`: or符号，表示前者错误时执行后面命令，否则不执行后面命令。
  * `!`: 逻辑运算意义上的「非」not的意思！
  * `/`: 目录符号：路径分隔的符号
  * `>,>>`: 数据流重导向：输出导向，分别是『取代」与『累加」
    * eg: `cat test2.txt > test.txt`

      * 将tset2.txt中的文件数据流输入到test.txt，如果不存在test.txt则创建，如果存在则覆盖原本内容

    * eg: `cat test2.txt >> test.txt`

      * 将tset2.txt中的文件数据流输入到test.txt，如果不存在test.txt则创建，如果存在则追加原本内容

    * eg: `cat test2.txt test3.txt 1> test.txt 2> test0.txt`

      * 不存在test3.txt，程序将会报错，将错误信息传递到test0.txt，正确信息传递到test.txt，1表示正确数据，2表示错误数据
    * eg: `cat > catfile`

      * 数据输出流导向到catfile，由于未指定导向的来源，因此由键盘输入

  * `<,<<`: 数据流重导向：输入导向，将原本需要由键盘输入的内容直接由文件读取

    * `cat > catfile < /.bashrc`

      * 数据流输出导向建立catfile，数据输出流将键盘内容输入导向/.bashrc文件输入

  * `''`: 单引号，不具有变量置换的功能($变为纯文本)
  * `""`: 具有变量置换的功能！($可保留相关功能)
  * ``: 两个符号中间为可以先执行的指令，亦可使用${}
  * `()`: 在中间为子shel‖的起始与结束
  * `{}`: 在中间为命令区块的组合！
* 环境变量

  * 环境变量即为系统的全局变量。常用的环境变量有PATH、HOME、MAIL、SHELL，环境变量为了与自定义变量形成区别，通常是大写。当用户未指定目录的情况下直接执行某指令如 ls 会在$PATH环境变量的值中寻找是否存在该指令，存在即调用对应目录下的指令（存在多个时调用第一个搜寻到的），不同用户的环境变量不相同，使用本目录下的命令的方式为 ./命令名，为了安全起见，本目录(.)不放入到$PATH中
  * eg: `echo $PATH`
    * 查看$PATH环境变量
  * eg: `PATH="${PATH}:/root"`

    * 给环境变量$PATH添加新的内容，将/root目录加入环境变量，$PATH等同${PATH}
  * eg: `env`

    * 查看所有的环境变量
  * eg: `export`

    * 查看所有的环境变量
  * eg: `read bike`

    * -p: 指定输入时提示的信息
    * -t: 指定输入的倒计时，倒计时结束即输入为空
    * 从用户的键盘输入变量
  * eg: `declare -i sum=1+2`

    * -a: 将后面的变量定义为数组
    * -i: 将后面的变量定义为整数
    * -x: 将后面的变量定义为环境变量
    * +x: 将后面的环境变量定义为自定义变量
    * -r: 将后面的变量定义为只读
  * 将变量定义为integer类型，如果直接输入 `sum=1+2` 将会得到'1+2'字符串，变量的类型在不指定的情况下默认为字符串，bash环境中的数值运算只能保留整数
* 变量规则
  * 变量一般为 `${变量}` ，或 `$变量` ，在定义时，可直接使用 变量

    * eg: `echo $myname`

      * 输出自定义变量$myname，未定义为空
    * eg: `myname=noby`

      * 将自定义变量赋值

    * eg: `echo ${myname}`

      * 输出自定义变量$myname，noby

  * 变量与变量内容之间用一个=表示，=两边不能存在空格。变量名以数字和英文字母组成，但不能以数字开头
  * 变量内容可以用" "或' '，" "可以解析变量保有原来的特征，' '只能解析成为纯文本

    * eg: `var="lang is $LANG"; echo $var`

      * 结果为 lang is zh_CN.UTF-8

    * eg: `var='lang is $LANG'; echo $var`

      * 结果为 lang is $LANG

  * 命令执行时，可用$()或``将命令嵌套至其他命令，先执行$()中的命令，再执行外面的命令

    * eg: `echo $(uname -r)` 或 使用`uname -r`

      * 打印系统版本信息，使用`echo uname -r`错误

  * 当变量需要扩充内容时，可以使用`变量=${变量}添加的内容`或`变量="$变量"添加的内容`

    * eg: `myname=${myname}append; echo $myname`

      * 输出自定义变量$myname，未定义为空
  * 若该变量需要在其他子程序执行，则需要以export来是变量变成环境变量（当前的shell中还可以开启一个shell，使用`bash`开启一个新的bash）
    * eg: `export myname`
      * 使得普通变量变为环境变量，环境变量相对普通自定义变量，它可以存在子程序中。

    * eg: `bash`
      * 进入当前bash的子程序

    * eg: `echo $myname`
      * 在子程序中的而$myname仍然生效，如果不export，则父程序中的变量在子程序中不生效

    * eg: `exit`
      * 退出当前程序的子程序

  * 系统的变量通常默认为大写字符，自定义变量通常为小写
    * eg: `echo $PATH`
      * 输出环境变量

    * eg: `echo $myname`
      * 输出自定义变量

  * 取消变量使用unset
    * eg: `unset myname`
      * 释放变量myname
* Shell Script

  * 执行脚本的方法

    * 输入绝对路径，在子shell中执行
    * 输入相对路径，在子shell中执行
    * 将文件放入环境变量PATH某个指定的目录下，如~/bin/，直接输入文件名，在子shell中执行
    * `bash 文件路径`，在子shell中执行
    * `sh 文件路径`，sh为bash的符号链接（软连接），子shell中执行
    * `source 文件名`，在本shell中执行
    * `. 文件名`，在本shell中执行

  * 脚本的开头申明

    * `#!/bin/bash`

      * 说明脚本使用的shell

  * 内置变量

    * $0: 文件名及路径
    * $1: 第一个参数
    * $2: 第二个参数

  * sh: 执行script

    * 选项

      * -n: 不执行script，仅查询语法问题
      * -v: 执行脚本前，将脚本内容输出到屏幕上
      * -x: 将使用到的script内容输出到屏幕上

### 进程管理

* 程序(program)：通常为binary program，放置在储存媒体中（如硬盘、光盘、软盘、磁带等），为实体文
  件的型态存在
* 进程(process)：程序被触发后，执行者的权限与属性、程序的程序代码与所需数据等都会被加载内存中，操作系统并给予这个内存内的单元一个标识符(PID)，可以说，进程就是一个正在运作中的程序。
* 子进程：进入linux系统后，会取得一个bash的shell，然后，我们用这个bash提供的接口去执行另一个指令，例如usr/bin/passwd或者是touch等等，那些另外执行的指令也会被触发成为PID，那个后来执行指令才产生的PID就是子进程了，而在我们原本的bash环境下，就称为父进程了。子进程的权限来自父进程。
  * eg: `bash`
    * eg: `ps -l`
      * PPID为父进程，PID为该进程，可以看到后开的bash的父进程为初始的bash
  * ps(Process Status): 查看进程
    * 选项
      * -l: 查阅当前用户开启的进程
        * F：进程的旗标，4为root，1为仅有复制，没有实际执行
        * S：代表状态
          * R：正在运行
          * S：睡眠状态
          * D：不可唤醒的睡眠状态
          * T：暂停状态
          * Z：僵尸状态，进程卡死
        * C：cpu的占用率
    * eg: `ps -l`
      * 查看当前用户开启的进程
    * eg: `ps -ef | grep redis`
      * 查看redis有关的进程
  * kill: 终止进程
    * eg: `kill PID`
      * 终止进程PID

#### 工作管理

* 可以再一个bash中运行多个进程，这些进程都是该bash的子进程
  * 前景：在可以出现提示字符让你操作的环境就称为前景(foreground)
  * 背景：非前景的其他进程就为背景(background)。需要与其他使用者互动的进程不能放入背景（vim）。背景也不可以使用ctrl+C终止
    * 背景可以设置为暂停和运作
      * ctrl+z: 将当前进程放置背景并暂停
    * eg: `tar -zpcf /tmp/etc.tar.gz /etc &`
      * 让打包压缩命令在背景运行
    * jobs: 观察背景的进程，+表示最后一个放入背景的进程，-表示倒数第二个
      * 选项
        * -l: 列出PID
        * -r: 仅列出正在运行的背景进程
        * -s: 仅列出暂停的背景进程
      * eg: `jobs `
        * 查看背景正在运行的进程
    * fg: 将背景中进程放入前景工作
      * eg: `fg`
        * 取出最后一个放入背景的进程（带+号的）
      * eg: `fg %2`
        * 取出工作号为2的进程
      * eg: `fg -`
        * 取出倒数第二个进程（带-号的）
    * bg: 让背景暂停的进程运行
      * eg: `bg %3`
        * 当工作号为3的进程继续运行

### 服务管理

* 服务（service/daemon/常驻进程/服务）：常驻在内存中一直执行的进程，linux中服务的文件名通常以d结尾

  * systemctl: 服务相关设置
    * status: 查看服务状态
      * eg: `systemctl status mysqld`
    * enable: 设置服务开机自启
      * eg: `systemctl enable mysqld`
    * list-unit-files: 查看所有服务列表
      * eg: `systemctl list-unit-files | grep enabled`: 查看自启服务
    * disable: 取消开机自启
    * start: 开启服务
    * stop: 关闭服务
    * restart: 重启服务
    * is-active: 是否正在运行中
    * is-enable: 是否开机自启
    * poweroff: 关机
    * reboot: 重启

* 目录

  * /usr/lib/systemd/system/:
    * 使用CentOS官方提供的软件安装后，默认的启动脚本配置文件都放在这里，这里的数据尽量不要修改。要修改时，请到/etc/systemd/system底下修改较佳！

  * /run/systemd/system/:
    * 系统执行过程中所产生的服务脚本，这些脚本的优先序要比/usr/ib/systemd/system/高！

  * /etc/systemd/system/:
    * 管理员依据主机系统的需求所建立的执行脚本，其实这个目录有点像以前/etc/rc.d/rc5.d/Sxx之类的功能！执行优先序又比run/systemd/system/高喔！

  * /etc/sysconfig/*:
    * 几乎所有的服务都会将初始化的一些选项设定写入到这个目录下，举例来说，mandb所要更新的man page索引中，需要加入的参数就写入到此目录下的man-db当中喔！而网络的设定则写在
      /etc/sysconfig/network-scripts/这个目录内。所以，这个目录内的文件也是挺重要的；

  * /var/lib/:
    * 些会产生数据的服务都会将他的数据写入到var/lib/目录中。举例来说，数据库管理系统Mariadb的数据库默认就是写入var/lib/mysql/这个目录下啦！

  * /run/:
    * 放置了好多daemon的暂存档，包括lock file以及PID file等等。

### 文件及文件夹的权限

* 权限rwx
  * 文件
    * r 可读
    * w 可写
    * x 可执行
  * 文件夹
    * r 可列出该文件夹下的文件名（可列出但不代表可进入）(可在其他目录列出该目录的文件列表名）
    * w 可移动、复制、新建、删除、重复名，文件、文件夹
    * x 拥有进入该文件夹的权限（可进入不代表可列出文件列表）
* 查看文件信息

  * ls -al 

    * -rwxr-xr-x.  1 root root    31 7月  27 2022 hello.sh
      * -
        * 当该位置为-时为文件，为d时为文件夹，为l时为符号链接，b表示可供存储的设备，c表示装置文件里面的串行端口设备，如键盘。
      * rwx r-x r-x 
        * rwx
          * 文件所有者 可读 可写 可执行(二进制为111，十进制为7)，当为文件夹时，文件夹的所有文件权限都等同该文件夹描述的权限
        * 第一个r-x
          * 文件所属群组 可读 不可写 可执行(二进制为101，十进制为5)
        * 第二个r-x 
          * 其他成员 可读 不可写 可执行(二进制为101，十进制为5)
      * 1
        * 硬连接连接数，表示有多少文件名连接到这个inode
      * 第一个root
        * 文件拥有者
      * 第二个root
        * 文件所属群组
      * 31
        * 文件的大小(Bytes)
      * 7月 27 2022
        * 最后的修改时间
      * hello.sh
        * 文件名（以.开头的文件或文件夹为隐藏）
* 修改文件权限

  * eg: `chmod u=rwx,g=rx,o=rx hello.sh`
    * 修改所有者、所属群组、其他用户的读、写、执行的权限
  * eg: `chmod u+r,g-w,o+x hello.sh`
    * 表示所有者添加读属性，所属群组移除写权限，其他用户添加执行权限，可用a表示所有者、所属群组和其他用户
  * eg: `chmod 755 hello.sh`
    * 使用10进制表示
  * eg: `chmod -R 755 hello`
    * 若hello为目录，-R表示递归，作用于该文件夹下的所有的文件
* 修改所属用户与组
  * eg: `chown noby:root hello.sh `
    * 将文件修改为noby为所有者，root为所属群组
  * eg:  `chown -R noby hello`
    * 直接修改所有者，若hello为目录，可使用-R递归表示修改所有子文件和文件夹
  * eg: `chown :users hello.sh`
    * 直接修改所属组

### 用户管理

* 账户信息存在于 /etc/passwd 当中，账户的密码存在于 /etc/shadow ，群组信息存在于 /etc/group 当中，群组的密码存在于 /etc/gshadow 当中
  * eg: `grep noby /etc/passwd /etc/shadow /etc/group /etc/gshadow`
    * 查看以下文件noby相关的行

  * eg: `head -n 1 /etc/passwd`
    * `root:x:0:0:root:/root:/bin/bash`
      * root 为用户名
      * x 为密码，为加密内容，存在于 /etc/shadow 中
      * 0 为UID，用户ID
      * 0 为GID，群组ID（初始群组）
      * root 为该账号说明
      * /root 为家目录
      * /bin/bash 为shell目录
  * eg: `head -n 1 /etc/group`
    * `root:x:0:`
      * root 表示群组名称
      * x 表示群组密码
      * 0 表示GID
      * 最后表示其他位于该群组的用户，因为root为初始群组，所以省略。若noby是除root以外的其他用户（有效群组），则会显示`root:x:0:noby`
  * eg: `cat /etc/shadow | grep user1`
* id: 查看系统用户及群组
  * eg: `id noby`
    * 查看noby的账户信息及群组
* group: 查看用户的群组
  * eg: `groups`
    * 查看当前登陆用户的群组，第一个为初始群组

  * eg: `touch test.txt`
    * 建立的文件的群组权限默认为初始群组
* newgrp: 设置初始群组
  * eg: `newgrp users`
    * 将users设置为初始群组，其他的群组为有效群组
* useradd: 建立新账号
  * eg: `useradd noby` 
    * 建立账号noby，一般默认带有-m，表示建立家目录
* userdel: 删除账号
  * eg: `userdel noby`
    * 删除账号noby

  * eg: `userdel -r noby`
    * 删除账号noby，和其家目录
* passwd: 设置密码
  * eg: `passwd noby`
    * 设置noby的密码，root具有修改其他账户密码的权限，且可以设置过简单的密码

  * eg: `passwd`
    * 设置root的密码
* su: 用户的切换，用户切换时，会在当前的shell中开启另一个子shell，可以使用exit退出当前的子shell（或ctrl+d）
  * eg: `su`
    * 切换到root用户，以non-login shell的方式
  * eg: `su noby`
    * 切换到noby，以non-login shell的方式
      * eg: `env | grep PATH`
        * `PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/usr/local/src/java/jdk1.8.0_221/bin:/root/bin`该种方式切换后的环境变量仍然是之前的登陆用户的（root），并没有随之修改
  * eg: `su -`
    * 以login shell的方式切换到root
  * eg: `su - noby`
    * 以login shell的方式切换到noby
      * eg: `env | grep PATH`
        * `PATH=/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/usr/local/src/java/jdk1.8.0_221/bin:/home/noby/.local/bin:/home/noby/bin`环境变量随之修改
* sudo: 使当前用户以其他用户的权限执行命令，其他用户执行root权限需在 /etc/sudoers 规范
  * 选项
    * -u: 指定切换的用户
    * -b: 放到背景中执行

  * eg: `sudo -u noby touch nobyfile`
    * root用户以noby的身份执行命令，建立的文件的所有者为noby

  * eg: `sudo touch nobyfile`
    * 其他用户以root的身份执行命令
* visudo: 以vi编辑sudo文件，使某个账号具有以root的身份执行命令的权限
  * eg: `visudo`
    * eg: `noby    ALL=(ALL)       ALL`
      * root下面添加noby，使noby具有利用sudo执行root的所有权限(100行)
    * eg: `user1	ALL =(root)    /usr/bin/passwd`
      * 使user1具有利用sudo执行root的passwd命令的权限

### 软件的安装

#### tarball（压缩文件）

* 源代码安装通过编译源代码得到软件包。优点是可以自定制软件包，缺点是比较复杂。使用打包文件安装的软件源码存放在：/usr/local/src/，安装的位置默认放在：/usr/local/（通常自定义为/usr/local/软件目录）

* C语言编译运行的过程

  * 编写源程序

    * 子程序

      * ```sh
        [root@centos7 tmp]# cat tips.c
        #include <stdio.h>
        int tips(void)
        {
        		printf("该软件的功能是计算90度的正弦值:\n");
        }
        ```

      * 

    * 主程序，加入其他子程序，加入其他库文件

      * ```sh
        [root@centos7 tmp]# cat sin.c
        #include <stdio.h>
        #include <math.h>
        int main(void)
        {
                float value;
                value = sin(3.14 / 2);
                tips();
                printf("sin(3.14 / 2)=%f\n",value);
        }
        ```

  * 将源程序编译为目标文件 *.o

    * `gcc -c sin.c tips.c`

  * 将多个目标文件、外部库文件（位于 /lib 和 /linb64 中）链接为二进制可执行文件 sin

    * `gcc -o sin sin.o tips.o`

* 使用make命令和makefile文件简化编译和链接过程

  * ```sh
    [root@centos7 tmp]# cat makefile
    main: sin.o tips.o
            gcc -o sin sin.o tips.o
    clean:
            rm -f sin sin.o tips.o
    ```

  * eg: `make`

    * 执行 main

  * eg: `make main`

    * 执行 main

  * eg: `make clean`

    * 执行 clean

* 安装的步骤

  * 下载：将Tarball（tar的打包文件）由厂商的网页下载到/usr/local/src目录；
  * 解压：将Tarball解开，产生很多的源代码文件、INSTALL/README的安装步骤文件以及侦测程序文件configure/config；
  * 建立makefile：通过config/configure自动侦测程序，建立makefile文件。
    * 通过`./configure`生成的makefile默认的安装位置为 /usr/local 。
      * 该目录方便命令的使用。（/usr/local/bin已经包含在PATH中）
      * 该目录方便man page的搜索
    * 通过`./configure --prefix=/usr/local/软件名目录`可指定安装位置生成makefile
      * 该目录更加方便软件的升级和卸载，但/usr/local/软件名目录/bin不包含在PATH中，不方便命令的下达
  * 编译：通过`make main`或`make`指令执行makefile中的编译和链接
    * 以gcc进行原始码的编译（会产生目标文件object files):
    * 以gcc进行函式库、主、子程序的链接，以形成主要的binary file;
  * 安装：由于产生的可执行文件仍然在当前目录下，需要通过`make install`将上述的binary file以及相关的配置文件安装至自己的主机上面。

* 卸载的步骤：

  * 源码目录执行 `make uninstall`
  * 删除相应的安装目录

#### RPM和yum

* RPM(RedHat Package Manager)：是以一种数据库记录的方式来将你所需要的软件安装到你的Linux系统的一套管理机制。由于己经编译完成并且打包完毕，所以软件传输与安装上很方便（不需要再重新编译）。由于安装时软件的信息都已经记录RPM数据库上，很方便查询、升级与反安装。

* yum：是一个专门为了解决包依赖关系而存在的软件包管理器（即软件B的使用必须依赖软件A，其实所有的软件管理几乎都有这方面的情况存在），他的使用依赖底层的RPM，相比较RPM可以自动处理个软件的依赖关系

  * 当客户端有软件安装的需求时，客户端主机会主动的向网络上面的yum服务器的软件库网址下载清单列表，然后透过列表列表的数据与本机RPM数据库(/var/lib/rpm/)己存在的软件数据相比较，就能使用RPM一口气在线下载并安装所有需要的具有相依属性的软件了。

* | **RPM** 包**默认安装**路径 | 含义                            |
  | :------------------------- | :------------------------------ |
  | /etc/                      | 配置文件安装目录，如/etc/my.cfg |
  | /usr/bin/                  | 可执行的命令安装目录            |
  | /usr/lib/                  | 程序所使用的函数库保存位置      |
  | /usr/share/doc/            | 基本的软件使用手册保存位置      |

##### 命令

* rpm: rpm管理指令，可安装、升级、卸载、查询，安装可选择url和本地.rmp文件
  * 选项
    * -i: 安装，通常使用-ivh
    * -v: 观看更详细的安装信息画面
    * -h: 以安装信息列显示安装进度
    * --prefix: 指定安装目录
    * -U: 升级软件包（没安装时会安装），通常使用-Uvh
    * -F: 已经安装时升级软件包（没安装时不会安装）,通常使用-Fvh
    * -q: 仅查询，后面接的软件名称是否有安装
    * -qa: 列出所有的，已经安装在本机Linux系统上面的所有软件名称
    * -qi: 列出该软件的详细信息(information),包含开发商、版本与说明等
    * -gl: 列出该软件所有的文件与目录所在完整文件名(1ist)
    * -gc: 列出该软件的所有配置文件（找出在/tc/底下的檔名而已）
    * -qd: 列出该软件的所有说明文件（找出与man有关的文件而已)
    * -qR: 列出与该软件有关的相依软件所含的文件(Required的意思)
    * -qf: 由后面接的文件名，找出该文件属于哪一个已安装的软件
    * -V: 验证该软件的文件是否被改动过
    * -e: 卸载某软件
    * --rebuilddb: 重建rpm数据库(/var/lib/rpm/)
    * --nodeps: 强制执行
  * eg: `rpm -ivh http://website.name/path/pkgname.rpm`
    * 通过rpm在线安装到默认目录
  * eg: `rpm -ivh --prefix='/usr/local/pkgname' http://website.name/path/pkgname.rpm`
    * 通过rpm在线安装到指定目录
  * eg: `rpm -q logrotate`
    * 是否安装该软件
  * eg: `rpm -qa | grep docker`
    * 列出所有包含docker的软件
  * eg: `rpm -ql logrotate`
    * 属于该软件所提供的所有目录与文件
  * eg: `rpm -qi logrotate`
    * 列出该软件的详细说明
  * eg: `rpm -qc logrotate`
    * 列出该软件的配置文件
  * eg: `rpm -qd logrotate`
    * 列出该软件的说明文档
  * eg: `rpm -qR logrotate`
    * 若要成功安装该软件，还需要什么文件
  * eg: `rpm -qf /bin/sh`
    * 该目录是由那个软件提供的
  * eg: `rpm -V logrotate`
    * 验证该软件是否被改动过

* yum: yum管理指令

  * 选项
    * -y: 当yum要等待用户输入时，这个选项可以自动提供yes的响应。
    * -installroot: 设置软件安装的路径
    * -list: 列出远程库的yum软件
    * install: 安装软件
    * update: 更新软件
    * remove: 卸载软件

  * eg: `yum list | grep pam-devel`
    * 查看远程库中与mysql有关的软件


  * eg: `yum install -y pam-devel`
    * 安装pam-devel，确认安装

  * eg: `yum remove pam-devel`
    * 卸载pam-devel

### linux的文件系统

* data block
  * 作用：实际记录文件内容的地方，可设置为1k、2k、4k
* inode table
  * 作用：记录文件的属性、权限，文件所有block对应的位置
* superblock
  * 作用：记录整个文件系统的地方，如block与inode的使用量、总量，block和inode的大小
* 文件：一个文件占用一个inode和至少一个block，inode记录该文件的属性和权限，block记录实际内容
* 文件夹：一个文件夹占用一个inode和一个block，inode记录文件夹的属性和权限，block记录文件夹中存在的文件名、文件inode number列表。（因此文件夹存在r权限即使不存在x权限也可查看其中的文件名列表），文件的文件名只与目录有关。

