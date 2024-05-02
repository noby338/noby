---
title: windows链接的使用
icon: write
category:
    - Windows
tag:
    - Windows
sticky: false
star: false
article: true
timeline: true
---

## 链接的使用

- dir：查看路径下的目录、文件、链接
- hard link（硬链接）：不可跨分区，只可作用于文件
    - eg: `mklink /h "D:\null\text4.txt" "D:\null\text3.txt"`
        - 新建文件 text4.txt 为文件 text3.txt 的硬链接
- junction point（directory hard link）（软链接）：可跨分区，只可作用于目录，只能使用绝对路径。即使创建 junction point 时使用了相对路径，保存到 NTFS 中时将隐式转换成绝对路径。（linux 中没有该类链接）
    - eg: `mklink /j "D:\null\B" "D:\null\A" `
    - eg: `mklink /j "D:\VSCodeProjects\noby\src\codenotes\javase" "D:\markdown\javaSE"`
    - eg: `mklink /j "D:\VSCodeProjects\noby\src\codenotes\linux" "D:\markdown\linux"`
    - eg: `mklink /j "D:\VSCodeProjects\noby\src\codenotes\windows" "D:\markdown\windows"`
    - eg: `mklink /j "D:\VSCodeProjects\noby\src\codenotes\sql" "D:\markdown\sql"`
    - eg: `mklink /j "D:\VSCodeProjects\noby\src\codenotes\git" "D:\markdown\git"`
    - eg: `mklink /j "D:\VSCodeProjects\noby\src\codenotes\web" "D:\markdown\web"`
    - eg: `mklink /j "D:\VSCodeProjects\noby\src\codenotes\javaWeb" "D:\markdown\javaWeb"`
    - eg: `mklink /j "D:\VSCodeProjects\noby\src\codenotes\spring" "D:\markdown\spring"`
    - eg: `mklink /j "D:\VSCodeProjects\noby\src\codenotes\distributed" "D:\markdown\distributed"`
        - 新建目录 B 为为目录 A 的软链接
- symbolic link（符号链接）：可跨分区，可作用于目录和文件，可使用相对路径和绝对路径
    - eg: `mklink /d "D:\null\D" "D:\null\C" `
        - 新建目录 D 为为目录 C 的符号链接
    - eg: `mklink "D:\null\C\text2.txt" "D:\null\A\text.txt" `
        - 新建文件 text2.txt 为文件 text.txt 的符号链接
