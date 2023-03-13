---
title: git
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
### git在linux中的安装

* yum install git

### 将服务器设置为git的远程库

```bash
  # 添加一个名为 git 的用户
  adduser git
  # 设置 git 用户的密码
  passwd git
  # 提权
  sudo visudo
  # 在文件里写入
  git ALL=(ALL:ALL) ALL
  # 保存提出，然后切换到 git 用户
  su - git
  
  # 创建并进入代码仓库目录
  mkdir -p /home/www/website cd $_
  # 赋予 git 用户权限
  sudo chown git:git /home/www/website
  # 创建代码目录并进入
  mkdir ts.git && cd $_
  # 专门用来创建远程仓库的初始化，git仓库通常以*.git命名。这种仓库只包括 git 版本控制相关的文件，不含工作区（不设置hooks即为不能在远程库修改工作区）
  git --bare init
  # 所以我们需要借助一个 hooks，在有代码提交到该仓库的时候，将提交的代码迁移到其他目录，这里我们在 ts.git 同级目录下创建了一个 ts 文件夹，用于存放提交的源代码文件：
  # 进入 hooks 目录
  cd hooks
  # 创建并编辑 post-receive 文件
  vim post-receive
  # 这里是 post-receive 写入的内容
  #!/bin/bash
  git --work-tree=/home/www/website/ts checkout -f
  # 赋予执行权限
  chmod +x post-receive
  # 退出目录到 ts.git 同级目录并创建文件
  cd ../../ && mkdir ts
  
  # 推送到该远程库
  git push -f -u git@192.168.122.128:/home/www/website/ts.git master
  
  # 设置远程库的公钥
  # 进入主目录
  cd /home/git
  # 进入 .ssh 目录
  cd .ssh
  # 创建 authorized_keys 文件，写入公钥（本地位于~/.ssh/id_rsa.pub）
  vim authorized_keys
  # 给相关文件添加执行权限
  chmod 600 /home/git/.ssh/authorized_keys
  chmod 700 /home/git/.ssh
  ```

