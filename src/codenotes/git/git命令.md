---
title: git命令
icon: write
category:
  - git
tag:
  - git
sticky: false
star: false
article: true
timeline: true
---
## git命令：

* git的基础知识学习推荐：[Git教程 - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/896043488029600)

| git指令                                                      | 作用                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `ssh-keygen -t rsa -C <email>`                               | 创建SSH Key，位置位于%HomePath%/.ssh目录，其中的`id_rsa`为私钥，`id_rsa.pub`为公钥(公钥为github填入的参数) |
| `ssh -v git@43.139.179.52`                                   | ssh远程连接指定服务器                                        |
|                                                              |                                                              |
| git config --global user.name "noby"                         | 设置全局用户名(其配置的位置位于%HomePath%\.gitconfig)(--global表示全局，所有的全局配置将写进%HomePath%\.gitconfig) |
| git config --global user.email "1326981297@qq.com"           | 设置全局邮箱(其配置的位置位于%HomePath%\.gitconfig)          |
| git config --global user.name                                | 显示用户名                                                   |
| git config  user.name "noby"                                 | 设置局部用户名(当前文件夹)(仓库级别`--local`(默认不写)，本地配置将写进.git/.gitconfig) |
|                                                              |                                                              |
| `git init`                                                   | 获取本地仓库，生成.git文件夹                                 |
| `git status`                                                 | 查看文件的状态<br />Untracked files:表示工作区的该文件不存在暂存区中<br />Changes not staged for commit:表示工作区的该文件与暂存区中的该文件不同<br />Changes to be committed:表示暂存区的文件与本地库的该文件不同<br />nothing to commit, working tree clean:表示工作区、暂存区、本地库的文件都相同<br />Your branch is ahead of `<name>/<branch>` by 1 commit:表示远程库`<name>/<branch>`的文件与本地库的该文件不同 |
| `git add <file>`                                             | 将工作区文件添加到暂存区由git管理，开始跟踪（track），被添加到暂存区的文件将会一直在暂存区，除非工作区的该文件删除或者使用`git rm --cached <file>`删除暂存区的该文件，多次添加同一文件的不同版本只是在这基础上更新 |
| `git commit -m <message>`                                    | 将暂存区提交到本地仓库                                       |
|                                                              |                                                              |
| `git diff <file>`                                            | 查看工作区文件相对于暂存区文件的不同                         |
| `git diff HEAD -- <file>`                                    | 查看工作区文件相对于本地库文件的不同                         |
| `git ls-files -s``git cat-file -p`                           | 查看暂存区的文件                                             |
| `git rm --cached <file>`                                     | 从暂存区删除某文件                                           |
| `git rm <file>`                                              | 从暂存区和工作区删除某文件                                   |
| `git checkout -- <file>`                                     | 将工作区的该文件恢复成与暂存区的该文件相同                   |
| `git checkout <file>`                                        | 将工作区的该文件恢复成与本地库的该文件相同                   |
| `git reset HEAD <file>`                                      | 将暂存区的该文件恢复成与本地库的该文件相同                   |
| `git log`                                                    | 查看提交日志                                                 |
| `git log --pretty=oneline`                                   | 查看美化的提交日志                                           |
| `git config --global alias.l 'log --pretty=oneline --abbrev-commit --all --graph'` | 设置`l`命令的git别名为：git log --pretty=oneline --abbrev-commit --all --graph，(--global表示全局，所有的全局配置将写进%HomePath%\.gitconfig) (全局级别`--global` 配置，仓库级别`--local`(默认不写)、系统级别 `--system` 亦如此) |
| `git config --global -l \| grep alias `                       | 查看所有的git别名                                            |
| `git config --unset --global alias.l`                        | 取消`l`命令的git别名                                         |
| `git reset --hard commitID`                                  | 目前的本地库版本退回到指定版本库版本（commitID提交日志中查看）(--hard表示将工作区和暂存区的该文件一并退回) |
| `git reset --hard HEAD^`                                     | 目前的本地库版本退回到上一个版本库版本(HEAD^^表示上2个，HEAD~num表示上num个) |
| `git reflog`                                                 | 查看已经删除的提交记录（版本退回后，之后版本的提交日志会被删除，可以通过该方法查看） |
|                                                              |                                                              |
| `.gitignore`                                                 | 文件中输入忽略的文件名或文件夹名（后加/），可以不纳入git的管理，即为在add的阶段忽略该文件或文件夹从工作区添加到暂存区。但.gitignore中的忽略配置将不会删除，已经添加到暂存区的文件或文件夹(可通过`git rm --cached <file>`删除) |
|                                                              |                                                              |
| `git branch`                                                 | 查看分支列表及当前分支                                       |
| `git branch <branch>`                                        | 新建分支`<branch>`                                             |
| `git checkout <branch>`<br />`git switch <branch>`           | 切换分支`<branch>`(swich为新的指令)。当切换分支的时候，Git 会用`<branch>`分支的最后提交的快照替换你的工作区和暂存区的内容。当工作区或暂存区相对当前分支有新的内容时存在不可切换和可切换的两种情况。一，当两个分支文件完全相同时，可以切换，并在行底给出M `<file>` 提示；二，当两个分支的文件不完全相同时，不可以切换，提示需要将工作区和暂存区的文件stash(文件相同不一定commitID相同) |
| `git checkout -b <branch>`<br />`git switch -c <branch>`     | 创建并切换分支`<branch>`                                       |
| `git merge <branch>`                                         | **合并分支**`<branch>`到当前分支：将更新当前分支的内容为当前分支和`<branch>`分支的合并分支，而`<branch>`分支保持不变。合并的原则是同时保留当前分支和`<branch>`分支相对历史共同节点的改动部分；若两分支都存在对共同节点的同一部分的改动，则需要执行手动解决冲突，然后add和commit。若两分支不存在对共同节点的同一部分的改动，则git将会执行快速合并，并自动add和commmit<br />**快速合并**:若两分支不存在对共同节点的同一部分的改动，将执行快速合并，且`<branch>`上相对共同节点的修改部分将代替当前分支的对应部分<br />**解决冲突**:当两分支都存在对共同节点的同一部分的改动则需要手动解决冲突，git会将两个分支的冲突部分汇总到工作区的该文件中，修改工作区文件解决掉冲突后还需add和commit到当前分支，至此当前分支的冲突解决完成， |
| `git merge --no-ff <branch>`                                 | 使用非快速合并自动合并，需要输入commit消息                   |
| `git log --graph`                                            | 查看分支合并图                                               |
| `git merge --abort`                                          | 解决合并冲突的过程中取消合并分支                             |
| `git branch -d <branch>`                                     | 删除分支`<branch>`                                             |
| `git stash`                                                  | 储藏目前分支的暂存区和工作区的工作现场                       |
| `git stash list`                                             | 查看工作现场                                                 |
| `git stash apply <stash>`                                    | 恢复工作现场到当前分支(不会删除储藏的该工作现场)(非当前分支的工作现场也可也恢复到当前分支) |
| `git stash drop <stash>`                                     | 删除工作现场                                                 |
| `git stash pop`                                              | 恢复工作现场到当前分支，同时删除储藏的该工作现场(非当前分支的工作现场也可也恢复到当前分支) |
| `git cherry-pick <commit>`                                   | 当两个分支来自同一个节点时，可复制一个分支commit到当前分支(对当前分支做同样的commit) |
| `git tag <name>`                                             | 标记在当前分支当前点标签                                     |
| `git tag <name> <commitID>`                                  | 在指定commitID打标签                                         |
| `git tag`                                                    | 查看标记的所有标签(标签不是按时间顺序列出，而是按字母排序的。) |
| `git tag -a <tagname> -m <message>`                          | 书写标签详情                                                 |
| `git show <tagname>`                                         | 查看标签信息                                                 |
| `git tag -d <tagname>`                                       | 删除指定标签                                                 |
| `git push <name> <tagname>`                                  | 推送`<tagname>`标签到`<name>`远程库(默认未指定推送标签是不会把标签推送到远程) |
| `git push <name> --tags`                                     | 推送所有标签到`<name>`远程库                                   |
| `git push <name> :refs/tags/<tagname>`                       | 删除`<name>`远程的`<tagname>`标签(前提是删除本地的`<tagname>`标签) |
|                                                              |                                                              |
| `git remote`                                                 | 查看远程库列表                                               |
| `git remote -v`                                              | 当前远程库的信息                                             |
| `git remote add <name> <url>`                                | 添加远程库`<name>`为远程库的名，一般为origin。`<url>`为远程库的地址(`<name>`为本地库为方便关联远程库的url而存在的，使用`<name>`为了在本地使用别名操作该url) |
| `git remote rm <name>`                                       | 解除本地库和远程库`<name>`的关系，并不是物理上删除了远程库     |
| `git push (-u) <name> <branch>`                              | 将本地库的当前分支推送到`<name>`远程库的`<branch>`分支，并且将会在远程库自动合并当前分支到`<name>/<branch>`分支。(-u表示将远程分支`<name>/<branch>`与当前分支关联) |
| `git push <name> <branch> -f`                                | 强制推送到远程仓库(一般为将远程某分支的版本回退)             |
| `git push --all <name> -f `                                  | 将本地的所有分支强制推送到远程(一般为远程库的第一次初始化)   |
| `git pull`                                                   | 将远程分支的对应当前分支拉取到工作区(前提是已经关联当前分支到远程分支)，同时合并(满足快速合并会执行快速合并) |
| `git fetch`                                                  | 从远程获取最新版本到远程仓库副本，同pull的区别在于fetch不会自动merge. 而git pull是从远程获取最新版本并merge到本地仓库. 从安全角度出发，git fetch比git pull更安全，因为我们可以先比较本地与远程的区别后，选择性的合并。通常用于查看其他人正在处理的内容进度<br />`git pull` = `git fetch` + `git merge` |
| `git clone <url>`                                            | 克隆远程的url项目，到当前的路径，注意会在操作git的目录下创建远程项目相同的项目目录 |
| `git branch --set-upstream-to=<name>/<branch> <branch>`      | 将远程分支与本地分支关联                                     |
| `git branch -vv`                                             | 查看本地和远程关联的分支                                     |
| `git rebase`                                                 | rebase操作可以把本地未push的分叉提交历史整理成直线<br />在push某本地分支到远程分支之前，该远程分支若有改变，应先pull到本地merge，再push到远程让github自动合并。但这样做会在本地新建一条用于存放pull下来的分支，该分支用于和本地分支merge。该多余的分支rebase命令优化。优化的原理把merge的过程调整到本地分支的改动之前，这样便不必创建新的分支 |



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
