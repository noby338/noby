---
title: Ubuntu
icon: write
category:
  - Linux
tag:
  - Linux
  - Ubuntu
sticky: false
star: false
article: true
timeline: true
---
## 系统的安装

- 在 ubuntu 的官网下载 iso 文件
- 通过 balenaEtcher-Portable 软件将系统烧录到 u 盘
- 在 windows 中分配一个 60GB 的新磁盘，不需要格式化
- 重启电脑进入 bios，关闭安全启动，重启
- 进入 windows10 设置，恢复，高级启动，立即重新启动
- 进入 windows 的高级启动，使用设备，Linpus lite，进入 u 盘启动
- 不要联网，安装类型选择其他类型，分配 60GB 的分区，引导区为 512MB（efi），内存交换区为 10GB（swap），根挂载点为剩下的空间（ext4）
- 安装启动引导器的设备选择引导区
- 安装

## 遇到的常见问题

- ibus 在 idea 中无法使用
  1. 点击 Help，Edit Custom VM options...
  2. 添加“-Drecreate.x11.input.method=true”
  3. 重启 idea

## 我在 ubuntu 中做过的设置

- 将 windows D 盘的文件系统挂载到了 linux /mnt/data 目录

  - `sudo mount -t ntfs-3g /dev/sda4 /mnt/data`
    - 该命令用于将 ntfs 类型的 d 盘挂载到 ext4 的 linux（仅仅作用于此次登陆，重启后失效）
  - `/dev/sda4 /mnt/data ntfs-3g defaults 0 0` 写入 /etc/fstab
    - 用于每次重启后的自动挂载

- 禁用了笔记本电脑键盘（xinput 需要在 xorg 下执行，在注销系统后选择）

  - 通过`xinput list`命令列出所有的输入设备
    - 通过`xinput disable 18`或`xinput disable "AT Translated Set 2 keyboard"`禁用了`AT Translated Set 2 keyboard`，该禁用仅仅对当前生效，需要命令加入启动项

- 开机自启设置方法
  - `sudo cp /usr/share/applications/fcitx.desktop /etc/xdg/autostart/`
    - 将某个应用的 desktop 文件设置到/etc/xdg/autostart/目录中
- 关闭 noby 用户敏感操作的安全验证
  - `sudo visudo`
  - `%sudo ALL=(ALL:ALL) ALL`下添加`noby ALL=(ALL) NOPASSWD: ALL`

## 软件的安装

### 常用软件

#### gnome 扩展

- `sudo apt install chrome-gnome-shell`
- vitals

#### ubuntu-cleaner

- `apt-get install ubuntu-cleaner`

#### ibus-rime

- `sudo apt install ibus-rime`
  - `sudo apt install librime-data-double-pinyin`

1. 重启 ibus:`ibus-daemon -drx`
2. 设置的输入源中添加 rime
3. ~/.config/ibus/rime 下增加配置文件 default.custom.yaml

```
patch:
    schema_list:
        - schema: double_pinyin_flypy # 小鹤双拼
    menu:
        page_size: 5
    switcher/hotkeys: #关闭模式切换
```

4.  ~/.config/ibus/rime 下 z 增加配置文件 ibus_rime.custom.yaml

```
style:
    horizontal: true
```

5. 默认使用简体,在~/.config/ibus/rime/user.yaml 中添加

```
var:
  option:
    simplification: true
```

6. 重启 ibus:`ibus-daemon -drx`
7. 修改了词库
8. 模式选择:`Ctrl + ~` `
9. 命令切换中英文
   - `ibus engine rime - Rime`
   - `ibus engine xkb:us::eng`

### 开发软件

#### java

- 命令安装
  - `sudo apt-get install openjdk-8-jdk`

#### maven

- 命令安装
  - `sudo apt install maven`
#### Navicat

快到期之前，可以把之前连接的数据库通过 文件->导出连接，备份之前的数据库连接即可，下次激活后可以直接导入连接。Navicat Premium 16的试用期只有14天，执行下面两个命令，即可无限使用。

1、关闭Navicat程序  
2、删除如下2个文件：

```bash
rm -rf ~/.config/navicat
rm -rf ~/.config/dconf/user
```

```perl
lsof | grep navicat | grep \\.config  #用于列出当前系统打开navicat的工具
```

再次重新启动navicat即可。


