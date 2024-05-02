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

## 安装 hexo

- hexo 的安装基于 npm 或者 cnpm
    - `npm install -g hexo-cli`

## 使用 hexo

- 查看版本
    - `hexo -v`
- 创建 hexo 项目（在空文件夹中）
    - `hexo init`
- 启动博客（在项目文件夹中）
    - `hexo start`
- 通过命令写博客
    - `hexo new "noby test"`
- 通过复制 md 文件添加文章
    - \source\_posts\noby-test.md
- 清理
    - `hexo clean`
- 生成
    - `hexo generate`

## 部署到 github

- 命名 github 仓库
    - `noby338.github.io`
- 安装 hexo github 部署插件
    - `npm install --save hexo-deployer-git`
- 设置 _config.yml

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

## 主题的使用

- 主题网址
    - `github.com/litten/hexo-theme-yilia`
- 克隆 github 上的主题
    - `git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia`
- 切换主题，修改配置文件 _config.yml

  ```yml
    theme: yilia
    ```
