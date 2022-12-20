---
# 当前页面内容标题
title: Git命令查询
# 当前页面图标
icon: write
# 分类
category:
  - Git
# 标签
tag:
  - Git
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
# 文档的时间
date: 2022-12-20
---

* 项目目录
  * .git文件夹
    * 本地仓库(版本库)(Repository)
      * 指针
        * HEAD
      * 分支
        * master分支
          * commit时间线
            * commitID3(HEAD指向的)
            * commitID2
            * commitID1
        * A分支
          * commit时间线
    * 暂存区(Stage、index)
  * 工作区(working tree)
* 远程仓库(remote)
  * 分支
    * master分支
      * commit时间线
        * commitID3
        * commitID2
        * commitID1
    * A分支
      * commit时间线

![image-20221103132542796](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221103132542796.png)![image-20221104222117421](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20221104222117421.png)

* 注意：
  * 当本地仓库的版本低于远程仓库的版本时，应该先拉取远程仓库的版本，再推送本地版本
  * 退出 vim 编辑器 :q enter
  * 任何文件的增删改（包括合并分支）都是在本地仓库进行，然后在推送到远程仓库 
  * 新建项目没配置gitignore文件，导致node_modules文件上传到了git仓库。.gitignore文件为忽略还未从工作区添加到暂存区的文件，对于已经推送到远程仓库的node_modules，暂存区中已经存在，直接在.gitignore文件中写入该node_modules并不会删除暂存区中的node_modules，因此需要使用命令删除暂存区中的node_modules.下面是解决方法，可以删除仓库已上传的node_modules文件：
    * git rm -r --cached node_modules
    * git commit -m 'delete node_modules file'
    * git push origin master