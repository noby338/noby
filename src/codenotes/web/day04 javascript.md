---
title: day04 javascript
icon: write
category:
  - Js
tag:
  - Js
sticky: false
star: false
article: true
timeline: true
---
## JavaScript

* 脚本语言：调用其他第三方实现某功能(调用浏览器)

* js代码边编译边执行（这种方式称为解释，对应Java中的编译）

* js中字符串推荐使用单引号

* JavaScript 代码是由浏览器中的 JavaScript 解析器来执行的。JavaScript 解析器在运行 JavaScript 代码的时候分为两步：预解析和代码执行。

* javascript中的同步和异步

* 先执行执行栈中的同步任务。

  异步任务（回调函数）放入任务队列中。

  一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取任务队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行。

* ![{40DCB19F-6204-4C17-9DDB-1695CA4E4245}](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/%7B40DCB19F-6204-4C17-9DDB-1695CA4E4245%7D.png)

  * 同步
  * 异步
    * 普通事件，如 click、resize 等
    * 资源加载，如 load、error 等
    * 定时器，包括 setInterval、setTimeout 等

* script与html结合方式

1. 内部JS：

   定义`<script>`，标签体内容就是js代码

  2. 外部JS：

     定义`<script>`，通过src属性引入外部的js文件

     * 例如：`<script src="./..">	</script>`
     * css引入方式：`<link rel="stylesheet" href="css/a.css">`
     * html超链接引入方式：`<a href="www....." target="_blank">我是一个链接</a>`	
     * html图片引入方式：`<img src="../html&css&js/image/jiangwai_1.jpg">`

#### JSON

- 定义：JSON 英文全称 JavaScript Object Notation，是一种轻量级的数据交换格式。(他就是js中的一种特殊的对象)

- 作用：JSON 是用于存储和传输数据的格式，通常用于服务端向网页传递数据 。

- 常用的两种json格式：

  - 以{}包含数据，表示该数据是一个对象

    ```js
      let JSONObject= {
          "name":"CCTV",
          "url":"www.cctv.com"
      };
      ```

  - 以[]包含数据，表示该数据时一个数组

    ```js
      let sites = [
          { "name":"CCTV" , "url":"www.cctv.com" }, 
          { "name":"google" , "url":"www.google.com" }, 
          { "name":"微博" , "url":"www.weibo.com" }
      ];
      ```

### ECMAScript

#### API

##### Number 对象方法

| 方法             | 解释                                               | 案例                                                         |
| ---------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| toExponential(x) | 把对象的值转换为指数计数法                         | var num = 5.56789;var n=num.toExponential()n 输出结果:5.56789e+0 |
| toFixed(x)       | 把数字转换为字符串，结果的小数点后有指定位数的数字 | var num = 5.56789;var n=num.toFixed(2);n 输出结果:5.57       |
| toPrecision(x)   | 把数字格式化为指定的长度                           | var num = new Number(13.3714);var n=num.toPrecision(2);n 输出结果:13 |
| toString()       | 把数字转换为字符串，使用指定的基数                 |                                                              |
| valueOf()        | 返回一个 Number 对象的基本数字值                   |                                                              |

##### Date 对象方法

| 方法                 | 解释                                                         |
| -------------------- | ------------------------------------------------------------ |
| getDate()            | 从 Date 对象返回一个月中的某一天 (1 ~ 31)var d = new Date();document.write(d.getDate()); |
| getDay()             | 从 Date 对象返回一周中的某一天 (0 ~ 6)                       |
| getFullYear()        | 从 Date 对象以四位数字返回年份                               |
| getHours()           | 返回 Date 对象的小时 (0 ~ 23)                                |
| getMinutes()         | 返回 Date 对象的分钟 (0 ~ 59)                                |
| getMonth()           | 从 Date 对象返回月份 (0 ~ 11)                                |
| getSeconds()         | 返回 Date 对象的秒数 (0 ~ 59)                                |
| getTime()            | 返回 1970 年 1 月 1 日至今的毫秒数                           |
| setDate()            | 设置 Date 对象中月的某一天 (1 ~ 31)var d = new Date();d.setDate(15);var x = document.getElementById("demo");x.innerHTML=d; |
| setFullYear()        | 设置 Date 对象中的年份（四位数字）                           |
| setHours()           | 设置 Date 对象中的小时 (0 ~ 23)                              |
| setMinutes()         | 设置 Date 对象中的分钟 (0 ~ 59)                              |
| setMonth()           | 设置 Date 对象中月份 (0 ~ 11)                                |
| setSeconds()         | 设置 Date 对象中的秒钟 (0 ~ 59)                              |
| toDateString()       | 把 Date 对象的日期部分转换为字符串var d = new Date();var n = d.toDateString(); |
| toLocaleDateString() | 根据本地时间格式，把 Date 对象的日期部分转换为字符串         |
| toLocaleTimeString() | 根据本地时间格式，把 Date 对象的时间部分转换为字符串         |
| toLocaleString()     | 据本地时间格式，把 Date 对象转换为字符串                     |
| toString()           | 把 Date 对象转换为字符串                                     |
| toTimeString()       | 把 Date 对象的时间部分转换为字符串                           |

##### Math 对象方法

| 方法             | 解释                        | 案例                                                         |
| ---------------- | --------------------------- | ------------------------------------------------------------ |
| abs(x)           | 返回 x 的绝对值             | 返回一个数的绝对值:Math.abs(-7.25);输出结果:7.25             |
| ceil(x)          | 对数进行上舍入              | Math.ceil(1.4)输出结果:2                                     |
| floor(x)         | 对 x 进行下舍入             |                                                              |
| max(x,y,z,...,n) | 返回 x,y,z,...,n 中的最高值 | 返回两个指定的数中带有较大的值的那个数：Math.max(5,10);输出结果：10 |
| min(x,y,z,...,n) | 返回 x,y,z,...,n中的最低值  |                                                              |
| random()         | 返回 0 ~ 1 之间的随机数     | 返回介于 0（包含） ~ 1（不包含） 之间的一个随机数：Math.random();输出结果：0.29910486307926476 |
| round(x)         | 把数四舍五入为最接近的整数  |                                                              |
| sqrt(x)          | 返回数的平方根              |                                                              |
| pow(x,y)         | 返回 x 的 y 次幂            |                                                              |
| sin(x)           | 返回数的正弦                | 返回数字的正弦值:Math.sin(3);输出结果:0.1411200080598672     |
| cos(x)           | 返回数的余弦                |                                                              |
| tan(x)           | 返回角的正切                |                                                              |

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>ECMAScriptNote</title>
</head>

<body>
    <!-- 
        JavaScript代码写法有两种方式：
        1.html文件script标签中：    script可以放在html中的任何位置（head、body）
        2.可以将js单独放在JavaScript的文件中  xx.js文件
   -->


    <script>
        // 单行注释
        /* 多行注释 */
        // 向浏览器上输出信息
        // document：当前文件本身对象
        // write()：向当前页面的body标签中插入字符串，如果字符串中有标签，也会解析成对应的标签

        //region 变量
        /* 
        js中的变量为推断类型：变量的类型由值的类型决定，而不是在声明中指明
        js是动态语言，其变量类型可变
        声明一个变量有两种方式：原因是JavaScript不同版本中声明方式有些不同
        第一种：通过var声明一个变量   ES5版本及之前版本中常用的写法
        第二种：通过let声明一个变量   ES6版本新特性
        
        */
        var age = 10;
        console.log(typeof age + "<br>");//typeof  获取变量的类型 
        var age = 3.14;//var可重复声明

        // 在ES6版本及之后通过let来声明变量
        let name = "李四";
        console.log(typeof name + "<br>");
        name = 6;//变量的类型由值的类型决定，而不是在声明中指明,js是动态语言，其变量类型可变
        console.log(typeof name + "<br>");
        // let name = "wang";//let不可重复声明
        //endregion


        //region 数据类型 基本数据类型：Number,String,Boolean,Null,Undefined 混合数据类型：object
        // 1.number  所有的数字都属于number
        let money = 100000;
        console.log(typeof money + "<br>");
        let n = 0.1 + 0.2;//0.30000000000000004 小数的运算可能产生精度问题
        n = n.toFixed(3);// 保留小数点后两位   四舍五入
        let str = n.toString();// 将number对象转换成string

        // 2.string  字符串类型
        let uname = "老马";
        console.log(typeof name + "<br>");

        // 3.布尔类型
        let isMan = true;
        console.log(typeof isMan + "<br>");

        // 4.空类型
        let girlFirend = null;
        console.log(typeof girlFirend + "<br>");//object null类型被当做一个空对象引用

        // 5.未定义类型  undefined
        let array = new Array();
        console.log(typeof array[0] + "<br>");//undefined

        // 6.object类型
        let students = new Array();
        console.log(typeof students + "<br>");//object

        //对象的创建
        var star = {//字面量创建（还可用 new Object 和 构造函数创建）
            name: 'pink',
            age: 18,
            sex: '男',
            sayHi: function () {
                alert('大家好啊~');
            }
        };
        console.log(star.name);//对象的调用
        star.hobby = "riding";//给对象添加属性
        console.log(star.hobby);

        var andy = new Object();// new Object 创建
        andy.name = 'pink';
        andy.age = 18;
        andy.sex = '男';
        andy.sayHi = function () {
            alert('大家好啊~');
        }

        function Person(name, age) {
            this.name = name;
            this.age = age;
            this.show = function () {
                console.log("My name is " + name + ",I'm " + age + " years old!")
            }
        }

        let noby = new Person("noby", 18);
        noby.show();


        //endregion

        //region 运算符
        // 比较运算符  ==    !=     >    <   >=  <=
        // == !=只会比较值，并不关心值的类型
        console.log(5 == '5');
        console.log(5 != '5');

        // ===绝对等：类型和值都得相同     !== 绝对不等：值或类型只要有一个不同就是绝对不能
        console.log(5 === '5');
        //endregion

        //region 数组 在JavaScript中数据创建方式有3种
        let weight = new Array();  // 空数组

        let friends = new Array("老马", "老范", "老谭");

        let cars = ["自行车", "摩托车", "汽车"];//java的数组用{}表示

        let flag = friends.push("noby");//向数组的最后添加元素，返回添加之后的数组长度
        console.log(flag)
        flag = friends.unshift("kace");//向数组的最前面添加元素，返回添加之后的数组长度
        console.log(flag);

        console.log(friends);//可以直接打印


        flag = friends.pop();//删除数组的最后一个元素，返回被删除的元素
        console.log(flag)
        flag = friends.shift();//删除数组的第一个元素，返回被删除的元素
        console.log(flag)

        console.log(friends);


        cars.reverse();//将数组翻转，不需要接收返回值
        console.log(cars)

        console.log(cars.indexOf("自行车"));//获取数组中指定元素的索引值


        //endregion

        //region 函数
        /* 
        相较于java的不同：
        有参方法的参数直接写名字，不需要指定类型，类型由实参决定
        不需要定义返回值类型，返回值由return决定
        return可以省略不写
         */

        //定义方法1：
        function add(n, m) {
            return n + m;
        }
        add(1, 2);

        //定义方法2：
        let fun = function () {
            console.log(2222);
        }

        //定义方法3： 立即执行函数
        /* (function () {
            console.log(111);
        })() */


        //定义方法4：箭头函数
        let fun1 = () => console.log(3333);//只有一行语句时可省略return
        let fun2 = x => console.log(x);//只有一个参数时可省略()
        // endregion



        //region API
        //number
        parseInt("123abc");//将字符串转换为整数，可去掉其中的其他字符
        parseFloat("123.4abc");//将字符串转换为浮点数，可去掉其中的其他字符
        Number("123");
        "12" - 0;//转换为int，隐式转换

        // Math
        Math.abs(Math.PI)
        Math.ceil(Math.PI)
        Math.floor(Math.PI)
        Math.max(1, 2, 3, 4, 5, 6, 7, 8, 9)
        Math.min(1, 2, 3, 4, 5, 6, 7, 8, 9)
        Math.floor((Math.random() * 10))// 生成随机数 [0,1)

        // Date
        let time = new Date();
        new Date('2019-5-1 18:31:11');//有参构造
        new Date('2019/5/1');//有参构造


        console.log(time);//Sat Mar 12 2022 15:05:36 GMT+0800 (中国标准时间)
        console.log(time.toDateString());//Sat Mar 12 2022
        console.log(time.toLocaleDateString());//2022/3/12
        console.log(time.toLocaleTimeString());//15:05:36
        console.log(time.getFullYear()); // 返回当前日期的年  2019
        console.log(time.getMonth() + 1); // 月份 从0开始
        console.log(time.getDate()); // 日期
        console.log(time.getDay()); // 星期 周一返回的是 1 周六返回的是 6 但是 周日返回的是 0	
        //endregion

        //region for循环遍历
        /*
            forin：可遍历数组，对象，可获取键(索引、属性)和值(元素、属性值)
            forof：遍历数组，得到的就是数组中的元素,不能遍历对象
            foreach: 可遍历数组元素，索引，数组对象，不可遍历伪数组和对象
        */
        let list = ["张三", "李四", "王五", "赵六"];
        let student = {
            name : "noby",
            age : 14,
            show : function () {
                console.log("My name is " + name + ",I'm " + age + " years old")
            }

        }

        for (let key in list) {
            console.log("key=" + key, "list[key]=" + list[key])
        }

        for (let key in student) {
            console.log("key=" + key, "student[key]=" + student[key])
        }

        for (let key of list) {
            console.log("key=" + key)
        }

        /* for (let key of student) {
            console.log("key=" + key)
        } */

        list.forEach(function (value, index, array) {
            console.log('value = ' + value + ' index = ' + index + ' array = ' + array);
        })

       /*  student.forEach(function (value, index, array) {
            console.log('value = ' + value + ' index = ' + index + ' array = ' + array);
        }) */
        //endregion
    </script>
</body>

</html>
```



### DOM

* 定义：（Document Object Model，简称 DOM）文档对象模型 ，是 W3C 组织推荐的处理可扩展标记语言（HTML或者XML）的标准编程接口。

#### DOM树 

* 包括文档Document、元素Element、节点Node（网页的所有东西都是节点，如标签、属性Attribute、文本Text、注释Comment等）

![image-20210927122254173](https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20210927122254173.png)

#### 	节点的三个基本属性

 * nodeType（节点类型）
   * 元素节点  nodeType  为 1
   * 属性节点  nodeType  为 2
   * 文本节点  nodeType  为 3 （文本节点包含文字、空格、换行等）
 * nodeName（节点名称）
 * nodeValue（节点值）

#### 一些常用的 HTML DOM 方法

| 方法                     | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| getElementById()         | 返回带有指定 ID 的元素。                                     |
| getElementsByTagName()   | 返回包含带有指定标签名称的所有元素的节点列表（集合/节点数组）。 |
| getElementsByClassName() | 返回包含带有指定类名的所有元素的节点列表。                   |
| appendChild()            | 把新的子节点添加到指定节点。                                 |
| removeChild()            | 删除子节点。                                                 |
| replaceChild()           | 替换子节点。                                                 |
| insertBefore()           | 在指定的子节点前面插入新的子节点。                           |
| createAttribute()        | 创建属性节点。                                               |
| createElement()          | 创建元素节点。                                               |
| createTextNode()         | 创建文本节点。                                               |
| getAttribute()           | 返回指定的属性值。                                           |
| setAttribute()           | 把指定属性设置或修改为指定的值。                             |

#### dom事件 

* 使用addEventlistener不用on
* 按钮禁用：this.disable = true;

##### 	1.  点击事件：

 	1. onclick：单击事件
 	2. ondblclick：双击事件

##### 	2.  焦点事件（没有冒泡）

1. onblur：失去焦点
2. onfocus:元素获得焦点。

##### 3. 加载事件：

1. onload：一张页面或一幅图像完成加载。

##### 4. 鼠标事件：

1. onmousedown	鼠标按钮被按下。
2. onmouseup	鼠标按键被松开。
3. onmousemove	鼠标被移动。
4. onmouseover	鼠标移到某元素之上。
5. onmouseout	鼠标从某元素移开。
6. oncontextmenu 用于取消默认的上下文菜单（搭配事件对象preventDefault，实现禁止鼠标右击菜单）
7. onselectstart  禁止鼠标选中（搭配事件对象preventDefault，实现禁止鼠标右击菜单）		

##### 5. 键盘事件：

1. onkeydown	某个键盘按键被按下。	
2. onkeyup		某个键盘按键被松开。
3. onkeypress	某个键盘按键被按下并松开。

##### 6. 文本事件

1. onchange	域的内容被改变。
2. onselect	文本被选中。

##### 7. 表单事件：

1. onsubmit	确认按钮被点击。
2. onreset	重置按钮被点击。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>DOMNote</title>
    <style>
        .li1 {
            background-color: antiquewhite;
        }

        .li2 {
            background-color: aqua;
        }

        #li1 {
            color: rgb(242, 255, 0);
        }
    </style>
</head>

<body>
    <!-- 获取标签对象 -->
    <p id="pid" class="pclass"></p>

    <!-- innerhtml和innertext的区别 -->
    <p id="p1">
        <b>加粗文字</b>
    </p><br>

    <!-- 事件 -->
    <!-- 方式1 -->
    <button onclick="method1()">button上填入onclick属性添加事件</button> <br><!-- 传统绑定事件，只能绑定一个事件，新的事件会覆盖以前的事件 -->
    <!-- 方式2 -->
    <button id="btn11">button通过addEventListener添加事件</button> <br>
    <button id="btn22">事件解绑</button> <br>

    <!-- 创建、修改、添加、删除节点 -->
    <button id="btn1">创建并添加节点</button>
    <button id="btn2">insertAdjacentHTML</button>
    <button id="btn3">通过添加class属性修改样式</button>
    <button id="btn4">通过修改元素的style属性修改样式</button>
    <button id="btn5">克隆</button>
    <button id="btn6">删除节点</button>
    <button id="btn7">修改元素内容</button>
    <button id="btn8">操作元素属性</button>
    <button id="btn9">删除元素属性</button>

    <ul id="ul">
        <li id="li">
            li
        </li>
        <li>
            li1
        </li>
        <li>
            li2
        </li>
    </ul>
    <script>
        //region 获取标签对象
        document.getElementById("pid").innerText = "pid";
        document.getElementsByClassName("pclass")[0].innerText += " pclass";
        document.getElementsByTagName("p")[0].innerText += " p";

        document.querySelector("#pid").innerHTML += "<b> pid</b>";
        document.querySelectorAll(".pclass")[0].innerHTML += "<b> pclass</b>";
        document.querySelectorAll("p")[0].innerHTML += "<b> p</b>";

        document.body;// 获取body 元素 
        document.documentElement;// 获取html 元素


        //innerhtml和innertext的区别
        console.log(document.querySelector("#p1").innerText);//获取文本，不包含子标签
        console.log(document.querySelector("#p1").innerHTML);//innerHTML获取子标签及文本

        document.getElementById("p1").innerText += "<i>斜体</i>";//设置内容时innerText不会解析字符串中的标签
        document.getElementById("p1").innerHTML += "<i>斜体</i>";//设置内容时innerHTML会解析字符串中的标签

        //endregion



        //region 事件

        document.querySelector("#btn11").addEventListener("click", method1);//method添加上()会立即执行，不添加括号表示click事件发生时执行
        /* 
            相较于onclick方法：addeventlistener 可以同时添加多个事件
         */
        document.querySelector("#btn22").addEventListener("click", function () {
            document.querySelector("#btn1").removeEventListener('click', method1); //事件的解绑
        })

        function method1() {
            alert("点击");
        }
        //endregion


        //region 节点操作
        let li = document.querySelector("#li");
        let ul = document.querySelector("#ul");

        document.querySelector("#btn1").addEventListener("click", function () {//创建、添加节点
            li = document.createElement("li");
            let text = document.createTextNode("创建并添加节点");

            li.appendChild(text);
            ul.appendChild(li);//父节点中添加子节点,放在所有子节点的最后面
        })

        document.querySelector("#btn2").addEventListener("click", function () {//创建、添加节点 insertAdjacentHTML
            li = '<li class="liactive">insertAdjacentHTML</li>';//这里的li是字符串，不在是一个标签对象
            ul.insertAdjacentHTML('beforeend', li);//将文本解析为HTML
            /* 
                'beforebegin'：元素自身的前面。
                'afterbegin'：插入元素内部的第一个子节点之前。
                'beforeend'：插入元素内部的最后一个子节点之后。
                'afterend'：元素自身的后面。 
            */
            li = document.querySelector(".liactive");//让li从新指向标签对象
        })

        document.querySelector("#btn3").addEventListener("click", function () {//修改样式 方式1
            //设置属性值，参数1：属性名   参数2：属性值
            li.setAttribute("class", "li1");
        })

        document.querySelector("#btn4").addEventListener("click", function () {//修改样式 方式2
            li.style.color = "red";
        })

        document.querySelector("#btn5").addEventListener("click", function () {//复制节点
            ul.appendChild(li.cloneNode(true));//true深拷贝，克隆li包括p3中的内容 false浅拷贝，只克隆li标签
        })

        document.querySelector("#btn6").addEventListener("click", function () {//删除节点
            ul.removeChild(ul.children[0]);
        })
        document.querySelector("#btn7").addEventListener("click", function () {//修改元素内容
            li.innerHTML = "<b>带有标签的文字</b>";
        })

        document.querySelector("#btn8").addEventListener("click", function () {//操作元素属性
            li.className = "li2";
            li.id = "li1";
        })

        document.querySelector("#btn9").addEventListener("click", function () {//删除元素属性
            li.removeAttribute("id");
            // li.remove(); 表示移除自己
        })

        for(let value of document.querySelectorAll("li")) {//事件对象
            value.addEventListener("click",function(e) {
            let thisDiv = e.target;//e.target表示点点击的对象
            thisDiv.style.backgroundColor = "red";
        });
        }
        
        //endregion

        //region 通过节点层级关系获取节点对象
        li.parentNode;//li的父节点
        ul.children;//ul的子元素节点集
        ul.childNodes;//ul的所有子节点(包括文本等)
        ul.firstElementChild;//ul的子节点集中的第一个节点
        ul.lastElementChild;//ul的子节点集中的最后一个节点
        li.previousElementSibling;//li的上一个兄弟节点
        li.nextElementSibling;//li的下一个兄弟节点
        //endregion

    </script>
</body>

</html>
```



### BOM

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>BOMNote</title>
</head>

<body>
    <!-- 弹窗 -->
    <button id="btn1">alert</button>
    <button id="btn2">confirm</button>
    <button id="btn3">prompt</button>

    <!-- 定时器 -->
    <p id="time"></p>
    <button id="btn4">开启定时器</button>
    <button id="btn5">关闭定时器</button>

    <script>
        //region 弹窗
        document.querySelector("#btn1").addEventListener("click", () => alert("alert"));
        document.querySelector("#btn2").addEventListener("click", con);
        document.querySelector("#btn3").addEventListener("click", pro);

        function con() {
            let flag = confirm("confirm");
            console.log(flag);
        }

        function pro() {
            let string = prompt("prompt");
            console.log(string)
        }
        //endregion

        //region 定时器
        let serial = null;//定时器的编号

        document.querySelector("#btn4").addEventListener("click",() => interval(true));//直接写interval(true)会在未点击的情况下调用该函数
        document.querySelector("#btn5").addEventListener("click",() => interval(false));
        function interval(flag) {
            if (flag) {
                /* 
                    开启定时器
                    参数1：定时器调用的方法（业务、功能）
                    参数2：周期时间（毫秒）
                    返回值：定时器的编号 
                */
                serial = setInterval("setTime()", 1000);
            } else {
                clearInterval(serial); // 停止定时器
            }
        }
        function setTime() {
            let date = new Date();
            let time = date.toLocaleTimeString();
            document.querySelector("#time").innerText = time;
        }
        //endregion
    </script>
</body>

</html>
```





