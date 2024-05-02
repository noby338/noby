---
title: day01 html
icon: write
category:
    - Html
tag:
    - Html
sticky: false
star: false
article: true
timeline: true
---

## JavaWeb 理论基础

- 软件的结构：
    - c/s
        - 优点：减轻服务端的压力，而且可以大量保存数据在客户端。
        - 缺点：更新的时候需要用户下载更新包然后再安装，程序员则需要开发客户端与服务端。
    - b/s
        - 优点：软件版本升级的时候不需要用户下载更新包，直接更新服务器的程序即可。程序员则只需要开发服务端而已。
        - 缺点：增加了服务端的压力，bs 结构的软件不能保存大量的 数据在用户机上。
- 网站的类别：
    - 静态网站: 静态网页中的数据都是写死的，如果需要修改网页的内容是需要直接修改网页的代码。 是没有数据库提供数据给它。
    - 动态网站: 动态网站的数据是来自于数据库的，背后是有一个后台程序管理页面中数据的。
- Emmet 语法：
    1. 生成标签 直接输入标签名按 tab 键即可 比如 div 然后 tab 键，就可以生成 `<div></div>`
    2. 如果想要生成多个相同标签 加上 * 就可以了 比如 `div*3` 就可以快速生成 3 个 div
    3. 如果有父子级关系的标签，可以用 > 比如 ul>li 就可以了
    4. 如果有兄弟关系的标签，用 + 就可以了 比如 div+p
    5. 如果生成带有类名或者 id 名字的， 直接写 `.demo` 或者 `#two` tab 键就可以了
    6. 如果生成的 div 类名是有顺序的， 可以用 自增符号 $
    7. 如果想要在生成的标签内部写内容可以用 { } 表示

## HTML

- Hyper Text Markup Language 超文本标记语言
- 作用：开发网页的基础
- 特点：
    - 运行与平台无关，任何浏览器都可运行
    - 不区分大小写
- 结构：

```html
<html> html语言的根标签
    <head></head> 网页的头信息
    <body></body> 网页的体部分
</html><!--  注释的内容  -->
```

- html 标签种类
    - 按照一组标签的数量
        - 双标签 (围堵标签)：有开头和结尾
        - 单标签 (自闭合标签)：只有开头
    - 按照文档中的位置特性
        - 块级标签
        - 行内标签
        - 内联块标签

### 文件标签：构成 html 最基本的标签

- `<!DOCTYPE html>`
    - `!DOCTYPE`: 这是一个文档类型声明的开始部分，用于告诉浏览器文档的类型和版本(html5)。
    - `html`: 这部分指定了文档类型为 HTML（HyperText Markup Language），表示这是一个 HTML 文档。
- html：html 文档的根标签
- head：头标签。用于指定 html 文档的一些属性。引入外部的资源
    - title：标题标签。
    - meta标签在HTML中用于提供关于文档的元数据（metadata）。元数据是描述数据的数据，它提供关于文档的信息，但不会直接显示在页面上。meta标签中的元数据对于搜索引擎优化、页面显示和文档信息的提供非常重要，能够帮助浏览器和搜索引擎正确解释和展示网页内容。一些常见的用途包括：
        - 指定字符集（charset）： `<meta charset="UTF-8">`用于定义文档的字符编码，确保浏览器正确解释文档中的字符。
        - 设置视口（viewport）： `<meta name="viewport" content="width=device-width, initial-scale=1.0">`用于控制页面在移动设备上的显示方式，包括宽度和缩放比例。
        - 描述文档内容： `<meta name="description" content="描述内容">`用于提供关于文档内容的描述，通常用于搜索引擎优化（SEO）。
        - 指定关键词： `<meta name="keywords" content="关键词1, 关键词2, …">`用于指定与文档相关的关键词，也用于SEO。
        - 指定作者、版权等信息： `<meta name="author" content="作者名">、<meta name="copyright" content="版权信息">`等用于提供文档的作者信息和版权信息。
- body：体标签


```html
  <!--!DOCTYPE html 指定为html5版本 -->
  <!DOCTYPE html>
  <!-- html标签是HTML文档的根标签 -->

  <html lang="en">
  <!-- lang="en" ch 设置语言环境 -->

  <!--head网页的头信息,指定标题、css、JavaScript、屏幕适配-->

  <head>
      <!--设置网页的编码-->
      <meta charset="UTF-8">

      <!-- 指定默认浏览器及引擎 -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">

      <!-- 设置屏幕适配、缩放 -->
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <!-- 网页的标题 -->
      <title>BasicsNote</title>
  </head>

  <!--body网页的主体部分，指定网页的具体的内容-->

  <body>
      <!-- 标题标签 6个   h1到h6   标题字体越来越小 -->
      <h1>大标题</h1>
      <h2>次标题</h2>
      <h6>小标题</h6>

      <!-- 加粗文字标签   b  -->
      <b>加粗文字，主要用来着重强调</b>

      <!-- br 换行标签 -->
      <br>

      <!-- 斜体标签  i -->
      <i>斜体文字，一般是解释、备注</i>

      <!-- 标签之间应该包含关系，不应该是交替关系 -->
      <i><b>加粗并斜体</i></b>

      <!-- font 设置字体大小，字体颜色：但是当今的程序员不经常用 px：像素 -->
      <font style="font-size: 50px;" color="red">
          <b>加粗</b>
      </font>

      <!-- pre标签：按照编写代码的缩进格式进行原样显示 -->
      <pre>
              《笑里藏刀》
                                    -- 向伟
              哈哈哈哈哈,
              哈哈哈哈哈。
              哈哈刀哈哈，
              哈哈哈哈哈。
          </pre>

      <!-- p：段落标签 -->
      <!-- &nbsp; 空格 (若想输入多个空格，需要使用多个，而不是多个space键)-->
      <p>哈哈&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;哈哈 哈</p>

      <!-- a：超链接标签，用来进行页面跳转 -->

      <a href="http://baidu.com" target="_blank">
          <!-- href：指定跳转到哪个页面、网站、网址，值可以是本地的，也可以是网络的， -->
          <!-- target表示是否开启新的页面
                  _self	默认。在相同的框架中打开被链接文档。默认为该选项
                  _blank	在新窗口中打开被链接文档。
                            -->
          跳转到百度
      </a><br>



      <!--图片标签：img
          width/height:    这是等比例压缩的尺寸(不是将原图片进行剪切)
          src：指定图片的地址（路径），可以是本地，也可以是网络
          alt：当图片加载失败时，要显示的文本
                    -->
      <img src="resource/1.jpg" alt="这是一张图片" width="200px" height="50px"><br>

      <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.2qqtouxiang.com%2Fpic%2FTX9669_01.jpg&refer=http%3A%2F%2Fimg.2qqtouxiang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649304242&t=9241f7036cc6f66bbe39fabe4d02a042"
          alt=""><br>
      <br>

      <!-- 超链接中可以嵌套图片，实现点击图片跳转到链接 -->
      <a href="http://baidu.com">
          <img src="resource/1.jpg" alt="可以实现跳转的图片">
      </a><br>

      <!-- 音频标签 controls 显示播放控件-->
      <audio controls>
          <!-- src音频文件路径，本地网络 -->
          <source src="resource/music.mp3">
      </audio><br>

      <!-- 视频 -->
      <video controls>
          <source src="resource/mov_bbb.mp4">
      </video><br>
  </body>

  </html>
```

### 文本标签：和文本有关的标签

- 注释：<!-- 注释内容 -->
- HTML 字符实体：因为在html页面解析的过程中，一些特殊的符号会被浏览器解析成为一个有单独意义的内容，如"<"会被解析为标签的开始，所以引入了符号实体来表示这些不能直接输入表示的字符
    - `&nbsp;`空格
    - `&lt;`小于号`<`
    - `&gt;`大于号`>`
    - `&copy;`权符号`©`
- `<h1>` to` <h6>`：标题标签
    - h1~h6: 字体大小逐渐递减
- `<p>`：段落标签
- `</br>`：换行标签
- `<hr>`：展示一条水平线
    - 属性：
        - color：颜色
        - width：宽度
        - size：高度
        - align：对其方式
            - center：居中
            - left：左对齐
            - right：右对齐
- `<b>`：字体加粗
- `<i>`：字体斜体
- `<strong>` 或者 ` <em>` 意味着你要呈现的文本是重要的，所以要突出显示。
- `<center>`: 文本居中
- `<pre>`：可将元素内容中的空格保留

    ```html
    <pre>
        此例演示如何使用 pre 标签
        对空行和    空格
        进行控制
    </pre>
    ```

- `<font>`: 字体标签
    - 属性：
    - color：颜色
    - size：大小
    - face：字体
    - 属性定义：
        - color：
            1. 英文单词：red,green,blue
            2. rgb(值 1，值 2，值 3)：值的范围：0~255 如 rgb(0,0,255)
            3. `#值1值2值3`：值的范围：00~FF 之间。如： `#FF00FF`
        - width：
            1. 数值：width='20' ,数值的单位，默认是 px(像素)
            2. 数值%：占比相对于父元素的比例

### 图片标签

- img：展示图片
    - 属性：
        - src：指定图片的位置
            - ./代表当前目录 ../代表上一级目录

### 列表标签

- 有序列表：
    - `<ol type="A" star="5">:`
        - `li:`
- 无序列表：
    - `<ul type="circle"/"disc"/"square">:`
        - `li:`

    ```html
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>ListNote</title>
      </head>

      <body>
          <!-- 无序列表 -->
          爱好
          <ul type="circle">
              <!-- type设置列表项符号样式
              disc 		圆点
      	    square		方块
      	    circle		空心圆
                            -->
              <li>吃饭</li>
              <li>睡觉</li>
              <li>打游戏</li>
          </ul>

          <!-- 有序列表 -->
          以下老师长得最帅的是()
          <ol type="A" start="3">
              <!-- type 1 A a I i
              start 开始的元素-->
              <li>老谭</li>
              <li>老李</li>
              <li>老范</li>
              <li>小向</li>
          </ol>

      </body>

      </html>
    ```

### 链接标签

- a: 定义一个超链接
    - 属性：
        - href：指定访问资源的 URL(统一资源定位符)
        - target：指定打开资源的方式
            - `_self`: 默认值，在当前页面打开
            - `_blank`：在空白页面打开

### 语义化标签

- html5 中为了提高程序的可读性，提供了一些标签。
- `<header>`：页眉
- `<footer>`：页脚

### 表格标签

- table：定义表格
    - width：宽度
    - border：边框
    - cellpadding：定义内容和单元格的距离
    - cellspacing：定义单元格之间的距离。如果指定为 0，则单元格的线会合为一条
    - bgcolor：背景色
    - align：对齐方式
- tr：定义行
    - bgcolor：背景色
    - align：对齐方式
    - valign="top" 垂直对齐
- td：定义单元格
    - colspan：合并列
    - rowspan：合并行
- th：定义表头单元格
- `<caption>`：表格标题
- `<thead>`：表示表格的头部分
- `<tbody>`：表示表格的体部分
- `<tfoot>`：表示表格的脚部分

```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <!-- table表格标签
      thead：可省略不写，语义化标签，html5中为了提高程序的可读性，提供的一些标签。
      tbody：表体，语义化标签，可省略不写
      tr：表行，代表一行表格
      th/td：一个单元格，th表示表头

        -->
    <table border="1px" style="width: 200px;text-align: center;">
      <!--
      border：用来指定表格的线
      style：用来指定标签的样式（长成什么样）
        width：指定标签的宽度
        text-align：文本对齐方式
          center：居中
          left：居左    默认
          right：居右
        -->
      <thead>
        <tr>
          <th colspan="2"><!-- 表示该单元格向右扩容一个单元格 -->1</th>
          <!-- <th>2</th> -->
          <th>3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- td一个单元格 -->
          <td><!-- 表示该单元格向下扩容一个单元格 -->4</td>
          <td rowspan="2">5</td>
          <td>6</td>
        </tr>
        <tr>
          <td>7</td>
          <!-- <td>8</td> -->
          <td>9</td>
        </tr>
      </tbody>
    </table>

  </body>
  </html>
```

### 表单

- 概念：用于采集用户输入的数据的。用于和服务器进行交互。
- form：用于定义表单的。可以定义一个范围，范围代表采集用户数据的范围
    - 注意：表单项中的数据要想被提交必须指定其 name 属性
    - 属性：
        - action：指定提交数据的 URL
        - method: 指定提交方式
            - 分类：一共 7 种，2 种比较常用
                - get：
                    1. 请求参数会在地址栏中显示。会封装到请求行中
                    2. 请求参数大小是有限制的。
                    3. 不太安全。
                - post：
                    1. 请求参数不会再地址栏中显示。会封装在请求体中
                    2. 请求参数的大小没有限制。
                    3. 较为安全。
- 表单项标签：
    - input：可以通过 type 属性值，改变元素展示的样式
        - type 属性：
            - text：文本输入框，默认值
                - placeholder：指定输入框的提示信息，当输入框的内容发生变化，会自动清空提示信息
            - password：密码输入框
            - radio: 单选框
                - 注意
                    1. 要想让多个单选框实现单选的效果，则多个单选框的 name 属性值必须一样。
                    2. 一般会给每一个单选框提供 value 属性，指定其被选中后提交的值
                    3. checked 属性，可以指定默认值
            - checkbox：复选框
                - 注意
                    1. 一般会给每一个单选框提供 value 属性，指定其被选中后提交的值
                    2. checked 属性，可以指定默认值
            - file：文件选择框
            - hidden：隐藏域，用于提交一些信息。
            - 按钮：
                - submit：提交按钮。可以提交表单
                - button：普通按钮
                - image：图片提交按钮
                    - src 属性指定图片的路径
            - label：指定输入项的文字描述信息
                - 注意
                    1. label 的 for 属性一般会和 input 的 id 属性值 对应。如果对应了，则点击 label 区域，会让 input 输入框获取焦点。
    - select: 下拉列表
        - 子元素：option，指定列表项
    - textarea：文本域
        - cols：指定列数，每一行有多少个字符
        - rows：默认多少行​

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>FormNote</title>
    </head>
    <body>
      <!-- form：form标签、表单，用来将数据提交到指定服务器 -->
      <form action="https://www.baidu.com/s">
        <!-- action：提交的地址 #表示不提交任何地址值 -->
        <input type="text" placeholder="百度内容" name="word"> <br>
        <input type="password" name="pwd"> <br>
        <!-- 提交按钮 -->
        <input type="submit" value="提交表单">
        <!-- 将当前form表单中其它的输入框中的内容清空 -->
        <input type="reset" value="重置表单">
      </form>
    </body>
    </html>
    ```

    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>InputNote</title>
    </head>

    <body>
        <!-- 文本数据框
        input
          type文本框的类型
            text:文本输入框
            password：密码输入框
            radio：单选按钮
            checkbox：多选按钮
            file：文件选择器
            date：日期选择器
            color：颜色选择器
            button：按钮
            email：邮箱输入框  某些浏览器会自动检测输入的是否是邮箱
            number：数字选择器

          placeholder：提示内容
            -->
        <input type="text" placeholder="账号"> <br>
        <input type="password" placeholder="密码"> <br>
        <!-- radio标签通过name进行分组，在同一组的才会形成互斥 -->
        <input type="radio" name="gender">男 <br>
        <input type="radio" name="gender">女 <br>
        <!-- 多选 -->
        <h5>爱好</h5>
        <input type="checkbox" name="hoby">唱歌 <br>
        <input type="checkbox" name="hoby">打篮球 <br>
        <input type="checkbox" name="hoby">跳舞 <br>
        <input type="checkbox" name="hoby">rap <br>
        <!-- 文件选择器 -->
        <input type="file" accept=".png"> <!-- accept 只允许png文件 --><br>
        <!-- 日期选择器 -->
        <input type="date"> <br>
        <!-- 颜色选择器 -->
        <input type="color"> <br>
        <!-- 按钮 -->
        <input type="button" value="确定"> <br>
        <button>取消</button> <br>
        <!-- 邮箱 -->
        <input type="email"> <br>
        <!-- 数字 -->
        <input type="number" value="1"><br>
    </body>

    </html>
    ```

### 框架标签

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FramesetNote</title>
</head>
<!-- 框架标签：将页面拆分几个部分
    拆分方式：按行拆分、按列拆分
-->
<frameset rows="60%,*">
  <frame src="BasicsNote.html"></frame>
  <frameset cols="20%,70%,*">
    <frame src="LIstNote.html"></frame>
    <frame src="TableNote.html"></frame>
    <frame src="InputNote.html"></frame>
  </frameset>
</frameset>
</html>
```
