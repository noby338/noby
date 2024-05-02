---
title: day02 css
icon: write
category:
    - Css
tag:
    - Css
sticky: false
star: false
article: true
timeline: true
---

## Css 选择器

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CssSelectorNote</title>
    <style>
        /* 基本选择器 */

        /* 标签选择器：选择当前页面上的所有该标签名的标签 */
        p {
            color: rebeccapurple;
        }

        /* 类选择器：选择当前页面上的所有该类名的所有标签*/
        .redText {
            color: red;
        }

        /* id选择器：选择该id的标签，只能选择一个*/
        #p1 {
            color: rgb(12, 127, 54);
        }

        /*
          优先级：id > class > 标签
        */






        /* 扩展选择器 */

        /* 全局选择器 */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
                        -moz-user-select: none;
                        -khtml-user-select: none;
            user-select: none;
            font-family: system-ui;
        }

        /* 并集选择器 */
        #id1,
        #id2 {
            background-color: cadetblue;
        }

        /* 子元素选择器:筛选选择器2的父元素选择器1(只能为直接子元素)*/
        #fu>p {
            background-color: aquamarine;
        }

        /* 后代选择器:筛选选择器1元素下的选择器2元素(可以是选择器1 的所有后代中的选择器2)*/
        #fu p {
            background-color: blue;
        }

        /* 属性选择器：[type]匹配设置了type属性的元素，可指定属性的值 */
        [type] {
            background-color: aquamarine;
        }

        [type="password"] {
            background-color: beige;
        }

        input[type="button"] {
            background-color: rgb(255, 0, 191);
        }



        /*  伪类选择器：选择一些元素具有的状态

            链接伪类选择器：
            link：初始化的状态
            lisited：被访问过的状态

            动态伪类选择器：
            active：正点击被按下状态
            hover：鼠标悬浮状态
            focus：获得焦点的状态
        */
        a:link {
            color: pink;
        }

        a:hover {
            color: red;
        }

        a:active {
            color: yellow;
        }

        a:visited {
            color: green;
        }

        input[type="number"]:focus {
            width: 24%;
        }

        /* 结构伪类选择器：
            e:first-child <!-- 匹配父元素中的第一个子元素e -->
    	     e:last-child <!-- 匹配父元素中的最后一个子元素e -->
    	     e:nth-child(n) <!-- 匹配父元素中的第n个子元素e -->even偶数 odd基数
         */
        li:first-child {
            background-color: antiquewhite;
        }
        li:nth-child(even) {
            background-color: aqua;
        }
        li:nth-child(3) {
            background-color: aquamarine;
        }

        /* 伪元素选择器 */
        .note::before {
            content: "brfore";
            color: brown;
        }

        .note::after {
            content: "after";
            color: darkblue;
        }

    </style>
</head>

<body>
    <!-- 标签选择器 -->
    <p>通过标签选择器设置CSS</p>

    <!-- 类选择器 -->
    <p class="redText">通过类选择器设置CSS</p>
    <h3 class="redText">通过类选择器设置CSS</h3>
    <b class="redText">通过类选择器设置CSS</b>

    <!-- id选择器 -->
    <p id="p1" class="redText">通过id选择器设置CSS</p>

    <!-- 子元素选择器和后代选择器 -->
    <div id="fu">
        <a href="">
            <p>一些文字</p>
        </a>
    </div>

    <!-- 并集选择器 -->
    <p id="id1">并集选择器</p>
    <p id="id2">并集选择器</p>

    <!-- 属性选择器 -->
    <input type="text">
    <input type="password">
    <input type="button" value="按钮">

    <!-- 伪类选择器 -->
    <a href="#">伪类选择器</a>
    <input type="number">\
    <ul>
        <li>选项1</li>
        <li>选项2</li>
        <li>选项3</li>
        <li>选项4</li>
    </ul>

    <!-- 伪元素选择器 -->
    <p class="note">伪元素选择器</p>
</body>

</html>
```

### 所有 CSS 伪元素

| 选择器                                                                         | 例子            | 例子描述                        |
| :----------------------------------------------------------------------------- | :-------------- | :------------------------------ |
| [::after](https://www.w3school.com.cn/cssref/selector_after.asp)               | p::after        | 在每个 `<p>` 元素之后插入内容。 |
| [::before](https://www.w3school.com.cn/cssref/selector_before.asp)             | p::before       | 在每个 `<p>` 元素之前插入内容。 |
| [::first-letter](https://www.w3school.com.cn/cssref/selector_first-letter.asp) | p::first-letter | 选择每个 `<p>` 元素的首字母。   |
| [::first-line](https://www.w3school.com.cn/cssref/selector_first-line.asp)     | p::first-line   | 选择每个 `<p>` 元素的首行。     |
| [::selection](https://www.w3school.com.cn/cssref/selector_selection.asp)       | p::selection    | 选择用户选择的元素部分。        |

### 所有 CSS 伪类

| 选择器                                                                                     | 例子                  | 例子描述                                                         |
| :----------------------------------------------------------------------------------------- | :-------------------- | :--------------------------------------------------------------- |
| [:active](https://www.w3school.com.cn/cssref/selector_active.asp)                          | a:active              | 选择活动的链接。                                                 |
| [:checked](https://www.w3school.com.cn/cssref/selector_checked.asp)                        | input:checked         | 选择每个被选中的 `<input>` 元素。                                |
| [:disabled](https://www.w3school.com.cn/cssref/selector_disabled.asp)                      | input:disabled        | 选择每个被禁用的 `<input>` 元素。                                |
| [:empty](https://www.w3school.com.cn/cssref/selector_empty.asp)                            | p:empty               | 选择没有子元素的每个 `<p>` 元素。                                |
| [:enabled](https://www.w3school.com.cn/cssref/selector_enabled.asp)                        | input:enabled         | 选择每个已启用的 `<input>` 元素。                                |
| [:first-child](https://www.w3school.com.cn/cssref/selector_first-child.asp)                | p:first-child         | 选择作为其父的首个子元素的每个 `<p>` 元素。                      |
| [:first-of-type](https://www.w3school.com.cn/cssref/selector_first-of-type.asp)            | p:first-of-type       | 选择作为其父的首个 `<p>` 元素的每个 `<p>` 元素。                 |
| [:focus](https://www.w3school.com.cn/cssref/selector_focus.asp)                            | input:focus           | 选择获得焦点的 `<input>` 元素。                                  |
| [:hover](https://www.w3school.com.cn/cssref/selector_hover.asp)                            | a:hover               | 选择鼠标悬停其上的链接。                                         |
| [:in-range](https://www.w3school.com.cn/cssref/selector_in-range.asp)                      | input:in-range        | 选择具有指定范围内的值的 `<input>` 元素。                        |
| [:invalid](https://www.w3school.com.cn/cssref/selector_invalid.asp)                        | input:invalid         | 选择所有具有无效值的 `<input>` 元素。                            |
| [:lang(_language_)](https://www.w3school.com.cn/cssref/selector_lang.asp)                  | p:lang(it)            | 选择每个 lang 属性值以 "it" 开头的 `<p>` 元素。                  |
| [:last-child](https://www.w3school.com.cn/cssref/selector_last-child.asp)                  | p:last-child          | 选择作为其父的最后一个子元素的每个 `<p>` 元素。                  |
| [:last-of-type](https://www.w3school.com.cn/cssref/selector_last-of-type.asp)              | p:last-of-type        | 选择作为其父的最后一个 `<p>` 元素的每个 `<p>` 元素。             |
| [:link](https://www.w3school.com.cn/cssref/selector_link.asp)                              | a:link                | 选择所有未被访问的链接。                                         |
| [:not(_selector_)](https://www.w3school.com.cn/cssref/selector_not.asp)                    | :not(p)               | 选择每个非 `<p>` 元素的元素。                                    |
| [:nth-child(_n_)](https://www.w3school.com.cn/cssref/selector_nth-child.asp)               | p:nth-child(2)        | 选择作为其父的第二个子元素的每个 `<p>` 元素。                    |
| [:nth-last-child(_n_)](https://www.w3school.com.cn/cssref/selector_nth-last-child.asp)     | p:nth-last-child(2)   | 选择作为父的第二个子元素的每个 `<p>` 元素，从最后一个子元素计数。  |
| [:nth-last-of-type(_n_)](https://www.w3school.com.cn/cssref/selector_nth-last-of-type.asp) | p:nth-last-of-type(2) | 选择作为父的第二个 `<p>` 元素的每个 `<p>` 元素，从最后一个子元素计数 |
| [:nth-of-type(_n_)](https://www.w3school.com.cn/cssref/selector_nth-of-type.asp)           | p:nth-of-type(2)      | 选择作为其父的第二个 `<p>` 元素的每个 `<p>` 元素。               |
| [:only-of-type](https://www.w3school.com.cn/cssref/selector_only-of-type.asp)              | p:only-of-type        | 选择作为其父的唯一 `<p>` 元素的每个 `<p>` 元素。                 |
| [:only-child](https://www.w3school.com.cn/cssref/selector_only-child.asp)                  | p:only-child          | 选择作为其父的唯一子元素的 `<p>` 元素。                          |
| [:optional](https://www.w3school.com.cn/cssref/selector_optional.asp)                      | input:optional        | 选择不带 "required" 属性的 `<input>` 元素。                      |
| [:out-of-range](https://www.w3school.com.cn/cssref/selector_out-of-range.asp)              | input:out-of-range    | 选择值在指定范围之外的 `<input>` 元素。                          |
| [:read-only](https://www.w3school.com.cn/cssref/selector_read-only.asp)                    | input:read-only       | 选择指定了 "readonly" 属性的 `<input>` 元素。                    |
| [:read-write](https://www.w3school.com.cn/cssref/selector_read-write.asp)                  | input:read-write      | 选择不带 "readonly" 属性的 `<input>` 元素。                      |
| [:required](https://www.w3school.com.cn/cssref/selector_required.asp)                      | input:required        | 选择指定了 "required" 属性的 `<input>` 元素。                    |
| [:root](https://www.w3school.com.cn/cssref/selector_root.asp)                              | root                  | 选择元素的根元素。                                               |
| [:target](https://www.w3school.com.cn/cssref/selector_target.asp)                          | \#news:target         | 选择当前活动的 \#news 元素（单击包含该锚名称的 URL）。           |
| [:valid](https://www.w3school.com.cn/cssref/selector_valid.asp)                            | input:valid           | 选择所有具有有效值的 `<input>` 元素。                            |
| [:visited](https://www.w3school.com.cn/cssref/selector_visited.asp)                        | a:visited             | 选择所有已访问的链接。                                           |

## Css 属性

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PropertyNote</title>
    <style>
        /* 背景 */
        p {
            background-color: aqua;
            /* 背景颜色 */
        }


        #btn {
            background-image: url(resource/jd.png);
            /* 背景图片 */
            /* 图片的路径不需要用双引号 */
            width: 200px;
            height: 60px;
        }

        /* 列表 */
        ul {
            /* 设置选项标记风格  none表示没有标记 */
            list-style-type: none;

            padding: 0;
        }

        li {
            float: left;
            border-right: 1px solid gray;
        }

        li a {
            text-decoration: none;
            background-color: rgba(255, 228, 196, 0.762);
            color: rgb(88, 59, 203);
            /* 设置显示的模式 block 块级(行级)标签 */
            display: block;
            width: 100px;
            text-align: center;
        }

        li:hover {
            background-color: bisque;
        }

        li:active {
            background-color: rgb(147, 128, 100);
        }



        /* 表格 */
        table {
            /* 让相邻的边框合并 */
            border-collapse: collapse;
        }

        table,
        th,
        td {
            /* 参数2：边框的类型
        solid：实线
        dotted：虚线 正方形
        dashed：虚线 长方形
        double：双实线
        groove：沟状
        ridge： 脊状
        inset：下沉
        outset：浮雕
      */
            border: 1px solid red;
        }
    </style>
</head>

<body>
    <p>设置背景颜色</p>

    <button id="btn">确定</button>



    <table>
        <tr>
            <th>id</th>
            <th>名字</th>
            <th>价格</th>
        </tr>
        <tr>
            <td>1001</td>
            <td>长得帅如何与人相处</td>
            <td>100</td>
        </tr>
        <tr>
            <td>1002</td>
            <td>我的极品是前任</td>
            <td>30</td>
        </tr>
    </table>


    <ul>
        <li><a href="#">菜单1</a></li>
        <li><a href="#">菜单2</a></li>
        <li><a href="#">菜单3</a></li>
        <li><a href="#">菜单4</a></li>
        <li><a href="#">菜单5</a></li>
    </ul>

</body>

</html>
```

## 网页布局方式

- 普通流（标准流）
    - 块级元素会独占一行，从上向下顺序排列。
    - 行内元素会按照顺序，从左到右顺序排列，碰到父元素边缘则自动换行。
- 浮动
    - 浮动元素会脱离标准流 (脱标)
    - 浮动的元素会一行内显示并且元素顶部对齐
    - 浮动的元素会具有行内块元素的特性
- 定位
    - 定位 = 定位模式 + 边偏移 。
    - 子级是绝对定位的话，父级要用相对定位。
        - 子级绝对定位，不会占有位置，可以放到父盒子里面的任何一个地方，不会影响其他的兄弟盒子。
        - 父盒子需要加定位限制子盒子在父盒子内显示。
        - 父盒子布局时，需要占有位置，因此父亲只能是相对定位。
    - 静态定位
        - 静态定位按照标准流特性摆放位置，它没有边偏移，即默认状态为静态定位
    - 相对定位
        - 它是相对于自己原来的位置来移动的。
        - 原来在标准流的位置继续占有，后面的盒子仍然以标准流的方式对待它。
    - 绝对定位
        - 如果没有祖先元素或者祖先元素没有定位，则以浏览器为准定位（Document 文档）。
        - 如果祖先元素有定位（相对、绝对、固定定位），则以最近一级的有定位祖先元素为参考点移动位置。
        - 绝对定位不再占有原先的位置。（脱标）
    - 固定定位
        - 以浏览器的可视窗口为参照点移动元素。
        - 固定定位也是脱标的，固定定位不在占有原先的位置。

## 盒子模型

- 一个标签由 4 个部分组成
    - margin：外边距
    - border：边框
    - padding：内边距
    - content：内容部分

## Emmet 语法

1. 生成标签 直接输入标签名 按 tab 键即可 比如 div 然后 tab 键， 就可以生成 <div></div>
2. 如果想要生成多个相同标签 加上 * 就可以了 比如 div*3 就可以快速生成 3 个 div
3. 如果有父子级关系的标签，可以用 > 比如 ul > li 就可以了
4. 如果有兄弟关系的标签，用 + 就可以了 比如 div+p
5. 如果生成带有类名或者 id 名字的， 直接写 .demo 或者 \#two tab 键就可以了
6. 如果生成的 div 类名是有顺序的， 可以用 自增符号 $
7. 如果想要在生成的标签内部写内容可以用 { } 表示
