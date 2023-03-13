---
title: hexo
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
### 安装hexo

- hexo的安装基于npm或者cnpm
  - `npm install -g hexo-cli`

### 使用hexo

- 查看版本
  - `hexo -v`
- 创建hexo项目（在空文件夹中）
  - `hexo init`
- 启动博客（在项目文件夹中）
  - `hexo start`
- 通过命令写博客
  - `hexo new "noby test"`
- 通过复制md文件添加文章
  - \source\_posts\noby-test.md
- 清理
  - `hexo clean`
- 生成
  - `hexo generate`

### 部署到github

- 命名github仓库

  - `noby338.github.io`

- 安装hexo github部署插件

  - `npm install --save hexo-deployer-git`

- 设置_config.yml

  ```yml
    # Deployment
    ## Docs: https://hexo.io/docs/one-command-deployment
    deploy:
      type: git
      repo: git@github.com:noby338/noby338.github.io.git
      branch: master
    ```

- 部署

  - `hexo deploy`

### 主题的使用

* 主题网址

  * `github.com/litten/hexo-theme-yilia`

* 克隆github上的主题

  * `git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia`

* 切换主题，修改配置文件_config.yml

  ```yml
    theme: yilia
    ```





