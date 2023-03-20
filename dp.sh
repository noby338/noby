#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

info=$(date +"%Y/%m/%d %T")

# 生成静态文件
npm run docs:build

git add .
git commit -m "${info}"
git push git@github.com:noby338/noby.git master

# 进入生成的文件夹
cd src/.vuepress/dist

git init
git add .
git commit -m "${info}"
git push -f git@github.com:noby338/noby338.github.io.git master

cd -