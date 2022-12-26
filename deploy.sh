#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd src/.vuepress/dist

git init
git add .
git commit -m 'deploy'
git push -f git@43.139.179.52:/home/www/website/ts.git master

cd -