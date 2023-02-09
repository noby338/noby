#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

git add .
git commit -m "$1"
git push git@github.com:noby338/noby.git master

# 进入生成的文件夹
cd src/.vuepress/dist

git init
git add .
git commit -m "$1"
# 密码为123
# git push -f git@43.139.179.52:/home/www/website/ts.git master
git push -f git@github.com:noby338/noby338.github.io.git master

cd -

#ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDHbK8Ar3iPgBNQ5B0K6YbelklwAsk8S2IItPte/jt6eoHI29R1j9e0CCHRF3YJDd0bhZTtHFL8B+iflGKVcI+v8BMBuQKH/B9IR0ER5LSy/guaTJ6sjo+mNJ01DQ1mTsq4mx8cvXVikPBY50S2S2BzmtagsOn6/uXNrEszhRJ1d75bbXaHdMN4RRSBuaDfhquyG3QIM0xu3QEMWp8fueOqyu7GhWQmXynqNvR1VO6CddenLALs+SCPlLhZO0rowvzkEYlim8DwK1czakc6flA+PMlOeNwzep7EN7nN39uc0FgF2Kke3Vvbe8p1OJZ9NKd8jrZgUcNINUgNJrfO1o/KyxSa0L8+SSUDuRHqmYywYlm59DA71ste0Mutx8YpnXAhdYwA+koBFHp8cB7Q2OGCT/9QBCZdMdJU4Fr9+tQOK7kHSs1MsX/bk5GlG/t5IsKMY3ttm4AvAqshOu2HFsj/thwGaqAa0G59dilR3Gwv1HmfkOc2ASpPOHIe6EeIEds= 1326981297@qq.com
#echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDHbK8Ar3iPgBNQ5B0K6YbelklwAsk8S2IItPte/jt6eoHI29R1j9e0CCHRF3YJDd0bhZTtHFL8B+iflGKVcI+v8BMBuQKH/B9IR0ER5LSy/guaTJ6sjo+mNJ01DQ1mTsq4mx8cvXVikPBY50S2S2BzmtagsOn6/uXNrEszhRJ1d75bbXaHdMN4RRSBuaDfhquyG3QIM0xu3QEMWp8fueOqyu7GhWQmXynqNvR1VO6CddenLALs+SCPlLhZO0rowvzkEYlim8DwK1czakc6flA+PMlOeNwzep7EN7nN39uc0FgF2Kke3Vvbe8p1OJZ9NKd8jrZgUcNINUgNJrfO1o/KyxSa0L8+SSUDuRHqmYywYlm59DA71ste0Mutx8YpnXAhdYwA+koBFHp8cB7Q2OGCT/9QBCZdMdJU4Fr9+tQOK7kHSs1MsX/bk5GlG/t5IsKMY3ttm4AvAqshOu2HFsj/thwGaqAa0G59dilR3Gwv1HmfkOc2ASpPOHIe6EeIEds= 1326981297@qq.com" >> ~/.ssh/authorized_keys