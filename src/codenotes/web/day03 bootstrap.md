---
title: day03 bootstrap
icon: write
category:
  - Bootstrap
tag:
  - Bootstrap
sticky: false
star: false
article: true
timeline: true
---
## Boostrap

- 官网：https://v3.bootcss.com/components/#dropdowns

- 核心文件：

  - bootstrap.min.css				Bootstrap4 核心 CSS 文
  - jquery.min.js					jQuery文件。务必在bootstrap.min.js 之前引入
  - popper.min.js 					用于弹窗、提示、下拉菜单
  - bootstrap.min.js				最新的 Bootstrap4 核心 JavaScript 文件

  

### Boostrap的样式

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>bootstrap</title>
    <link rel="stylesheet" href="bootstrap.min.css">
    <script src="jquery.min.js"></script>
    <script src="popper.min.js"></script>
    <script src="bootstrap.min.js"></script>
</head>

<body style="height: 2000px;">
    <!-- bootStrap的自定义标签 -->
    <br><br><br>
    <h3>bootStrap的自定义标签</h3>
    <small>small</small><br>
    <mark>mark</mark><br>
    <code>code</code><br>
    <strong>strong</strong>

    <!-- 
        在boostrap中的两种容器
        大容器：container-fluid
        小容器；container
     -->

    <!-- bootstrap的自定义选择器 -->
    <div class="container-fluid"></div>
    <div class="container">
        <h3>bootstrap的自定义选择器</h3>
        <!-- 字体大小 -->
        <p class="display-4">bootstrap的h1</p>
        <p class="display-6">bootstrap的h6</p>

        <!-- 对齐方式 -->
        <p class="text-center">text-center</p>
        <p class="text-left">text-left</p>
        <p class="text-right">text-right</p>

        <!-- 字体颜色 -->
        <p class="text-primary">text-primary</p>
        <p class="text-danger">text-danger</p>
        <p class="text-info">text-info</p>
        <p class="text-success">text-success</p>
        <p class="text-warning">text-warning</p>
        <p class="text-dark">text-dark</p>

        <!-- 背景颜色 -->
        <p class="a bg-primary text-light">text-light</p>


        <!-- 表格 -->
        <table class="table table-striped table-hover table-bordered table-primary">
            <!-- 
                table           对表格做了基础的处理
                table-striped   带条纹表格
                table-bordered  带边框的表格
                table-hover     添加鼠标悬停效果
                table-dark      表格颜色
            -->
            <tr class="table-dark">
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
            </tr>
            <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
            </tr>
        </table>

        <!-- 按钮 -->
        <!-- 
            btn表示为表格
            btn-primary表示颜色
            btn-outline-danger表示边框颜色
            btn-link以超链接的形式展示按钮
            btn-block表示块级按钮
         -->
        <button class="btn btn-primary">基础按钮</button>
        <button class="btn btn-outline-danger">带边框按钮</button>
        <button class="btn btn-link">超链接按钮</button>
        <button class="btn btn-block">块级按钮</button>
        <button class="btn btn-sm">小按钮</button>
        <button class="btn btn-lg">大按钮</button>

        <!-- 按钮组，将多个按钮合并在一起 -->
        <div class="btn-group">
            <button class="btn btn-success">按钮1</button>
            <button class="btn btn-primary">按钮2</button>
            <button class="btn btn-warning">按钮3</button>
        </div>

        <!-- 下拉菜单 -->
        <div class="dropdown">
            <!-- dropdown表示为下拉菜单 -->
            <button class="btn btn-outline-success dropdown-toggle" data-toggle="dropdown">下拉菜单</button>
            <!-- 
                dropdown-toggle显示下拉图标
            -->
            <div class="dropdown-menu">
                <a href="http://www.cctv.com" class="dropdown-item">cctv</a>
                <a href="http://www.taobao.com" class="dropdown-item">淘宝</a>
                <a href="http://www.sina.com" class="dropdown-item">新浪</a>
            </div>
        </div>
    </div>
</body>

</html>
```



### Boostrap的栅格系统

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BoostrapGridNote</title>

    <!-- 导入bootstrap需要引入的css和js文件 -->
    <link rel="stylesheet" href="bootstrap.min.css">
    <script src="jquery.min.js"></script>
    <script src="popper.min.js"></script>
    <script src="bootstrap.min.js"></script>
    <style>
        div {
            border: 2px solid red;
        }
    </style>
</head>

<body>
    <!-- container-fluid 表示bootstrap中的大容器，它的宽度默认填满父容器(父容器为bootstrap的容器则不能填满) -->
    <!-- 容器的子标签最好为一个row -->
    <div class="container-fluid">
        <!-- row表示bootstrap中的行，每一行都有12个小的列 -->
        <div class="row">
            <!-- container表示bootstrap中的小容器 -->
            <div class="container">
                <div class="row">
                    <!-- col表示列，col-5表示定义一个占5个小列的单元格 -->
                    <div class="col-5" style="height: 80px;">
                    </div>
                    <!-- offset-4表示该单元格向右偏移4个小列 -->
                    <div class="col-3 offset-4" style="height: 80px;">
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="container">
                <div class="row">
                    <div class="col-7" style="height: 30px;">
                    </div>
                    <div class="col-4 offset-1" style="height: 30px;">
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="container">
                <div class="row">
                    <div class="col-3" style="height: 30px;">
                    </div>
                    <div class="col-4" style="height: 30px;">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">

        <div class="row">
            <div class="col-9">
                <div class="row">
                    <div class="col-4" style="height: 40px;"></div>
                    <div class="col-2 offset-6" style="height: 40px;"></div>
                </div>
                <div class="row"> 
                    <!-- 响应式布局
                        col-xs-12 浏览器宽度匹配手机宽度时，该单元格占12小列
                        col-sm-6 浏览器宽度匹配平板宽度时，该单元格占6小列
                        col-md-3 浏览器宽度匹配电脑宽度时，该单元格占3小列
                     -->
                    <div class="col-xs-12 col-sm-6 col-md-3" style="height: 260px;"></div>
                    <div class="col-xs-12 col-sm-6 col-md-3" style="height: 260px;"></div>
                    <div class="col-xs-12 col-sm-6 col-md-3" style="height: 260px;"></div>
                    <div class="col-xs-12 col-sm-6 col-md-3" style="height: 260px;"></div>
                    <div class="col-xs-12 col-sm-6 col-md-3" style="height: 260px;"></div>
                    <div class="col-xs-12 col-sm-6 col-md-3" style="height: 260px;"></div>
                    <div class="col-xs-12 col-sm-6 col-md-3" style="height: 260px;"></div>
                </div>

            </div>
            <div class="col-3">
                <div class="row" style="height: 30px;">
                
                </div>
                <div class="row" style="height: 200px;">

                    <div class="col-7" style="height: 160px;"></div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
```

