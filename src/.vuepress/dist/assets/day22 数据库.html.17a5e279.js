import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as i,b as n,d as s,a as e,e as p,r as c}from"./app.b62a36f4.js";const o={},d=p(`<h2 id="数据库-database" tabindex="-1"><a class="header-anchor" href="#数据库-database" aria-hidden="true">#</a> 数据库(Database)</h2><ul><li>定义：数据库全称，数据库管理系统，存储数据和获取数据的软件fdfajjsadfkjertqeuriwe4j\\ <ul><li>数据库中的概念： <ul><li>数据库：数据库管理系统，指软件(如MySQL、Oracle)</li><li>数据库：MySQL中的database(文件夹)</li></ul></li></ul></li><li>容器(数组、集合)存储数据无法实现永久存储(程序停止后数据消失)</li><li>io流技术，存储到本地文件(更改时需要遍历文件中的所有数据，效率低下，修改数据麻烦)</li><li>名词解释 <ul><li>表：数据库中的文件</li><li>数据库：MySQL中的database(文件夹)</li><li>字段又称为属性，二维表的一列称为一个字段（属性）</li><li>字段类型也是数据类型，如int,char,varchar,bit等等。</li><li>字段宽度表示这个字段能存储的最大长度。</li><li>记录就是表格中的每一行</li><li>字段值就是字段列中的记录。</li><li><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220228210121910.png" alt="image-20220228210121910"></li></ul></li><li>分类： <ul><li><p>关系型数据库：把复杂的数据结构归结为简单的二元关系（即二维表格形式）</p><ul><li>MySQL(重点)：(Oracle公司) 5版本免费。新版本收费</li><li>Oracle：(Oracle公司)</li><li>DB2：(IBM公司)</li><li>SQL Server：微软公司</li></ul></li><li><p>非关系型数据库：键值存储数据库、列存储（Column-oriented）数据库、面向文档（Document-Oriented）数据库、图形数据库等数据库的总称</p><ul><li><p>Redis</p></li><li><p>MongoDB</p></li><li><p>HBase</p></li><li><p>Neo4J</p></li></ul></li></ul></li></ul><h2 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> MySQL</h2><ul><li>打开MySQL服务 <ul><li>搜索里输入服务，找到mysql打开</li><li>运行窗口输入service.msc，找到mysql打开</li><li>net start mysql</li></ul></li><li>停止MySQL服务 <ul><li>net stop mysql</li></ul></li><li>登录MySQL <ul><li>mysql -uroot -p123</li></ul></li><li>退出MySQL <ul><li>exit</li></ul></li></ul><h2 id="sql基础语法" tabindex="-1"><a class="header-anchor" href="#sql基础语法" aria-hidden="true">#</a> SQL基础语法</h2><ul><li>Structured Query Language 结构化查询语言</li></ul><table><thead><tr><th>数据库名</th><th>解释</th></tr></thead><tbody><tr><td>information schema</td><td>数据库元数据，基础数据</td></tr><tr><td>mysql</td><td>配置数据库，其中包含用户信息（账户、密码）</td></tr><tr><td>performance schema</td><td>运行数据，日志文件，运行情况</td></tr><tr><td>test</td><td>测试数据库</td></tr></tbody></table><ul><li><p>SQL工业化标准：使用SQL 工业化标准做出来的sql语句，可以操作任何数据库，通用</p></li><li><p>常见的数据类型</p><ul><li>数值日期</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">date</span> ： 日期值。只包含年月日
	eg ：birthday <span class="token keyword">date</span> ： 
<span class="token keyword">datetime</span> ： 混合日期和时间值。包含年月日时分秒
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>字符串</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">char</span> ： 定长字符串。
	优点：存储性能高
	缺点：浪费空间
	eg ： name <span class="token keyword">char</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>  如果存储的数据字符个数不足<span class="token number">10</span>个，也会占<span class="token number">10</span>个的空间，最多 <span class="token number">255</span> 个字符
<span class="token keyword">varchar</span> ： 变长字符串。
	优点：节约空间
	缺点：存储性能底
	eg ： name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> 如果存储的数据字符个数不足<span class="token number">10</span>个，那就数据字符个数是几就占几个的空间	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li></li></ul><table><thead><tr><th>类型</th><th>解释</th></tr></thead><tbody><tr><td>float</td><td>浮点型</td></tr><tr><td>double</td><td>双精度类型</td></tr><tr><td>decimal(5,2)</td><td>小数类型</td></tr><tr><td>tinytext</td><td>存放最大长度为 255 个字符的字符串</td></tr><tr><td>text</td><td>存放最大长度为 65,535 个字符的字符串</td></tr><tr><td>mediumtext</td><td>存放最大长度为 16,777,215 个字符的字符串</td></tr><tr><td>longtext</td><td>存放最大长度为 4,294,967,295 个字符的字符串</td></tr><tr><td>date</td><td>日期，格式：%Y-%m-%d</td></tr><tr><td>datetime</td><td>日期时间组合，日期和时间的组合。格式：%Y-%m-%d hh:mm:ss</td></tr><tr><td>timetamp</td><td>时间戳，timestamp 值使用 Unix 纪元(&#39;1970-01-01 00:00:00&#39; UTC) 至今的描述来存储。格式：%Y-%m-%d hh:mm:ss</td></tr><tr><td>time</td><td>时间int :整数</td></tr></tbody></table></li><li><p>注意：SQL语句除了登录和退出指令，其他指令都要在指令末位加上&quot;;&quot;</p></li><li><p>注释为：</p><ul><li><p>单行注释: -- 注释内容 或 #注释内容(MySQL 特有)</p><blockquote><p>注意：使用-- 添加单行注释时，--后面一定要加空格，而#没有要求。</p></blockquote></li><li><p>多行注释: /* 注释 */</p></li></ul></li><li><p>\`\`为转义字符</p></li><li><p>分类：</p><ul><li><p>DDL：数据库定义语言</p><ul><li>可以操作数据库管理系统中数据库和表的结构</li><li>create 创建</li><li>drop 删除</li><li>alter 修改表的结构</li></ul></li><li><p>*DML：数据库操作语言</p><ul><li>可以操作数据库中表中的数据的 增、删、改</li><li>INSERT 插入</li><li>UPDATE 更新</li><li>DELETE 删除</li></ul></li><li><p>*DQL：数据库查询语言</p><ul><li><p>可以操作数据库中表中的数据的 查</p></li><li><p>SELECT &lt;字段名表&gt;</p></li><li><p>FROM &lt;表或视图名&gt;</p></li><li><p>WHERE &lt;查询条件&gt;</p></li></ul></li><li><p>DCL：数据库控制语言</p><ul><li>可以操作用户的等级、权限，用户密码等功能</li><li>GRANT、COMMIT 、ROLLBACK</li></ul></li></ul></li></ul><h3 id="ddl-数据库定义语言" tabindex="-1"><a class="header-anchor" href="#ddl-数据库定义语言" aria-hidden="true">#</a> DDL：数据库定义语言</h3><table><thead><tr><th>代码</th><th>解释</th></tr></thead><tbody><tr><td>mysql -u root -p</td><td>mysql调用mySQL安装目录bin文件夹下的mysql.exe程序，-u root 登录root用户，-p 输入密码</td></tr><tr><td>exit</td><td>退出MySQL</td></tr><tr><td>show databases；</td><td>查询数据库</td></tr><tr><td>show tables;</td><td>查看当前数据库的表</td></tr><tr><td>show create database 数据库名</td><td>显示数据库创建信息</td></tr><tr><td>show create table 表名</td><td>显示表的创建信息</td></tr><tr><td>CREATE DATABASE IF NOT EXISTS 数据库名称;</td><td>数据库的增加判断</td></tr><tr><td>create database 数据库名 default character set utf8</td><td>创建数据库的同时指定该数据库编码</td></tr><tr><td>create table 表名(<br>字段名 字段类型,<br>字段名 字段类型<br>)</td><td>创建表</td></tr><tr><td>drop database 数据库名</td><td>删除数据库</td></tr><tr><td>drop table 表名</td><td>删除表</td></tr><tr><td>drop table if exists 表名;</td><td>删除表，该语法可以避免报错</td></tr><tr><td>alter database 数据库名 default character set utf8</td><td>修改数据库默认编码</td></tr><tr><td>set names gbk</td><td>临时设置MySQL编码</td></tr><tr><td>use 数据库名</td><td>选中数据库</td></tr><tr><td>desc 表名</td><td>查看表的结构</td></tr><tr><td>alter table 表名 add (column) 字段名 字段类型 (after 字段名)</td><td>添加字段(在某个字段之后)</td></tr><tr><td></td><td></td></tr><tr><td>alter table 表名 change 被修改字段名 新字段名 字段类型</td><td>修改字段名、类型(注意：当有字段值存在时，不能修改字段类型)</td></tr><tr><td>alter table 表名 modify (column) 字段名 字段类型;</td><td>修改字段类型</td></tr><tr><td>alter table 表名 drop (column) 字段名</td><td>删除字段</td></tr><tr><td>alter table 旧表名 rename (to) 新表名</td><td>重命名</td></tr><tr><td>rename table 旧表名 to 新表名</td><td>重命名</td></tr><tr><td>truncate 表名</td><td>保留字段，删除所有记录。(删除原表，创建一张字段相同的无记录空表，属于DDL的sql语句)</td></tr></tbody></table><h3 id="dml-数据库操作语言" tabindex="-1"><a class="header-anchor" href="#dml-数据库操作语言" aria-hidden="true">#</a> DML：数据库操作语言</h3><table><thead><tr><th>代码</th><th>解释</th></tr></thead><tbody><tr><td>SELECT @@identity;</td><td>@@identity会记录上一条insert语句添加数据的自增主键值 (数据库中@@开头的是系统变量 )</td></tr><tr><td>insert into 表名 values(字段值1，字段值2，字段值3)，<br>(字段值1，字段值2，字段值3)</td><td>插入数据(所有字段)</td></tr><tr><td>insert into 表名(字段名1，字段名2) value(字段值1，字段值2)</td><td>插入数据(部分字段)</td></tr><tr><td>update 表名 set 字段名 = 字段值,字段名 = 字段值 where 条件</td><td>通过指定条件修改字段值</td></tr><tr><td>delete from 表名 (where 条件)</td><td>保留字段，删除所有记录。(删除满足条件的记录)</td></tr></tbody></table><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">show</span> <span class="token keyword">databases</span> <span class="token punctuation">;</span><span class="token comment">-- 查看库中的表</span>
<span class="token keyword">use</span> db1<span class="token punctuation">;</span><span class="token comment">-- 使用该数据库</span>


<span class="token comment"># DDL</span>
<span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> student <span class="token punctuation">;</span><span class="token comment">-- 删除存在的表</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> student <span class="token punctuation">(</span>
    id <span class="token keyword">int</span><span class="token punctuation">,</span><span class="token comment">-- 整型，四个字节</span>
    name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">-- 可变长字符串（字符串宽度小于等于10即可）</span>
    gender <span class="token keyword">char</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">-- 不可变长字符串</span>
    birthday <span class="token keyword">date</span><span class="token punctuation">,</span><span class="token comment">-- date表示日期，tatetime表示日期和时间</span>
    score <span class="token keyword">double</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">-- 5表示数据的总长度，2表示小数点后面的位数</span>
    email <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    tel <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">status</span> <span class="token keyword">tinyint</span><span class="token comment">-- 小整型，1个字节</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">desc</span> student<span class="token punctuation">;</span><span class="token comment">-- 查看表的结构</span>
<span class="token keyword">alter</span> <span class="token keyword">table</span> student <span class="token keyword">rename</span> person<span class="token punctuation">;</span><span class="token comment">-- 修改字段名</span>
<span class="token keyword">alter</span> <span class="token keyword">table</span> person <span class="token keyword">rename</span> <span class="token keyword">to</span> student<span class="token punctuation">;</span> <span class="token comment">-- 修改字段名</span>
<span class="token keyword">alter</span> <span class="token keyword">table</span> student <span class="token keyword">add</span> address <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">-- 添加字段</span>
<span class="token keyword">alter</span> <span class="token keyword">table</span> student <span class="token keyword">modify</span> address <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">-- 修改字段名</span>
<span class="token keyword">alter</span> <span class="token keyword">table</span> student change address addr <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">-- 修改字段名和字段类型</span>
<span class="token keyword">alter</span> <span class="token keyword">table</span> student <span class="token keyword">drop</span> addr<span class="token punctuation">;</span><span class="token comment">-- 删除字段</span>

<span class="token comment"># DML</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> student<span class="token punctuation">(</span>id<span class="token punctuation">,</span>name<span class="token punctuation">)</span> <span class="token keyword">value</span> <span class="token punctuation">(</span><span class="token boolean">null</span><span class="token punctuation">,</span><span class="token string">&#39;noby&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">-- 插入记录部分字段（value和values无区别）</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> student <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">&#39;李四&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;1999-11-12&#39;</span><span class="token punctuation">,</span><span class="token number">88.88</span><span class="token punctuation">,</span><span class="token string">&#39;lisi@itcast.cn&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;13888888888&#39;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">-- 插入记录的简写，插入全部字段</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> student <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">&#39;李四&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;1999-11-11&#39;</span><span class="token punctuation">,</span><span class="token number">88.88</span><span class="token punctuation">,</span><span class="token string">&#39;lisi@itcast.cn&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;13888888888&#39;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token string">&#39;李四&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;1999-11-11&#39;</span><span class="token punctuation">,</span><span class="token number">88.88</span><span class="token punctuation">,</span><span class="token string">&#39;lisi@itcast.cn&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;13888888888&#39;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token string">&#39;李四&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;1999-11-11&#39;</span><span class="token punctuation">,</span><span class="token number">88.88</span><span class="token punctuation">,</span><span class="token string">&#39;lisi@itcast.cn&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;13888888888&#39;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">delete</span> <span class="token keyword">from</span> student <span class="token keyword">where</span> name <span class="token operator">=</span> <span class="token string">&#39;李四&#39;</span><span class="token punctuation">;</span><span class="token comment">-- 删除字段</span>
<span class="token keyword">update</span> student <span class="token keyword">set</span> name <span class="token operator">=</span> <span class="token string">&#39;赵六&#39;</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span><span class="token comment">-- 修改字段</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dql-数据库查询语言" tabindex="-1"><a class="header-anchor" href="#dql-数据库查询语言" aria-hidden="true">#</a> DQL：数据库查询语言</h3><p>DQL 的完整语法：</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> 
    字段列表
<span class="token keyword">FROM</span> 
    表名列表 
<span class="token keyword">WHERE</span> 
    条件列表
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
    分组字段
<span class="token keyword">HAVING</span>
    分组后条件
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span>
    排序字段
<span class="token keyword">LIMIT</span>
    分页限定
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="单表查询" tabindex="-1"><a class="header-anchor" href="#单表查询" aria-hidden="true">#</a> 单表查询</h4><table><thead><tr><th>代码</th><th>解释</th></tr></thead><tbody><tr><td>select * form 表名</td><td>查询表的所有字段</td></tr><tr><td>select distinct 字段1，字段2 from 表名</td><td>当查询的结果中的字段1和字段2都相同时，只显示一项</td></tr><tr><td>select 字段1，字段2...... from 表名</td><td>查询指定字段</td></tr><tr><td>select 字段1 as 别名，字段2 as 别名</td><td>给查询的结果起别名（as可以省略）</td></tr><tr><td>select 字段名，字段名..... from 表名 where 条件;</td><td>条件查询</td></tr><tr><td>select 字段名，字段名..... from 表名 字段 like 通配符;</td><td>模糊查询 _表示一个字符 %表示多个字符</td></tr><tr><td>select 字段... from 表名 order by 字段1 排序方式，字段2 排序方式;</td><td>按照某个排序方式对某个字段进行排序查询，desc（降序），asc（升序，默认值），当字段1的排序相同时再进行字段2的排序</td></tr><tr><td>select 字段... from 表名 limit 起始索引，页大小</td><td>分页查询</td></tr><tr><td>count (字段) 统计非空数据的条数(相同数据也计数)<br>avg (字段) 计算结果的平均值<br>sum (字段) 求和<br>max (字段) 最大值<br>min (字段) 最小值4</td><td>聚合查询：对查询出来数据做统计操作<br>如：select max(sal),min(sal), avg(sal),sum(sal) from emp;</td></tr><tr><td>group by 字段<br>如：select avg(sal) from emp group by deptno;</td><td>分组查询：将结果集按照指定的字段值一样的记录看作同一组，配合聚合函数使用可以对每组的数据进行统计并得出结果</td></tr><tr><td>group by 字段 having 聚合函数条件判断语句<br>如：select max(sal),deptno from emp group by deptno having avg(sal)&gt;2000;</td><td>如果想要将聚合函数作为查询条件，不能直接跟在where后面，需要将聚合函数写在having子句中；having必须跟在group by子句之后,作用是添加过滤条件将不满足的分组去除；<br>查看部门平均工资高于2000的这些部门的最高工资是多少</td></tr></tbody></table><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># DQL</span>
<span class="token comment">/*
 DQL完整语法：
SELECT
    字段列表
FROM
    表名列表
WHERE
    条件列表
GROUP BY
    分组字段
HAVING
    分组后条件
ORDER BY
    排序字段
LIMIT
    分页限定
 */</span>
<span class="token comment">-- 导入数据</span>
<span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> stu<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> stu <span class="token punctuation">(</span>
                     id <span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token comment">-- 编号</span>
                     name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">-- 姓名</span>
                     age <span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token comment">-- 年龄</span>
                     sex <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">-- 性别</span>
                     address <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">-- 地址</span>
                     math <span class="token keyword">double</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">-- 数学成绩</span>
                     english <span class="token keyword">double</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">-- 英语成绩</span>
                     hire_date <span class="token keyword">date</span> <span class="token comment">-- 入学时间</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> stu<span class="token punctuation">(</span>id<span class="token punctuation">,</span>NAME<span class="token punctuation">,</span>age<span class="token punctuation">,</span>sex<span class="token punctuation">,</span>address<span class="token punctuation">,</span>math<span class="token punctuation">,</span>english<span class="token punctuation">,</span>hire_date<span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">&#39;马运&#39;</span><span class="token punctuation">,</span><span class="token number">55</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;杭州&#39;</span><span class="token punctuation">,</span><span class="token number">66</span><span class="token punctuation">,</span><span class="token number">78</span><span class="token punctuation">,</span><span class="token string">&#39;1995-09-01&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">&#39;马花疼&#39;</span><span class="token punctuation">,</span><span class="token number">45</span><span class="token punctuation">,</span><span class="token string">&#39;女&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;深圳&#39;</span><span class="token punctuation">,</span><span class="token number">98</span><span class="token punctuation">,</span><span class="token number">87</span><span class="token punctuation">,</span><span class="token string">&#39;1998-09-01&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">&#39;马斯克&#39;</span><span class="token punctuation">,</span><span class="token number">55</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;香港&#39;</span><span class="token punctuation">,</span><span class="token number">56</span><span class="token punctuation">,</span><span class="token number">77</span><span class="token punctuation">,</span><span class="token string">&#39;1999-09-02&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token string">&#39;柳白&#39;</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token string">&#39;女&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;湖南&#39;</span><span class="token punctuation">,</span><span class="token number">76</span><span class="token punctuation">,</span><span class="token number">65</span><span class="token punctuation">,</span><span class="token string">&#39;1997-09-05&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token string">&#39;柳青&#39;</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;湖南&#39;</span><span class="token punctuation">,</span><span class="token number">86</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token string">&#39;1998-09-01&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token string">&#39;刘德花&#39;</span><span class="token punctuation">,</span><span class="token number">57</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;香港&#39;</span><span class="token punctuation">,</span><span class="token number">99</span><span class="token punctuation">,</span><span class="token number">99</span><span class="token punctuation">,</span><span class="token string">&#39;1998-09-01&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token string">&#39;张学右&#39;</span><span class="token punctuation">,</span><span class="token number">22</span><span class="token punctuation">,</span><span class="token string">&#39;女&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;香港&#39;</span><span class="token punctuation">,</span><span class="token number">99</span><span class="token punctuation">,</span><span class="token number">99</span><span class="token punctuation">,</span><span class="token string">&#39;1998-09-01&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span><span class="token string">&#39;德玛西亚&#39;</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;南京&#39;</span><span class="token punctuation">,</span><span class="token number">56</span><span class="token punctuation">,</span><span class="token number">65</span><span class="token punctuation">,</span><span class="token string">&#39;1994-09-02&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token comment"># 基础查询</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu<span class="token punctuation">;</span><span class="token comment">-- 查询所有字段，开发中尽量不用</span>
<span class="token keyword">select</span> name 名字<span class="token punctuation">,</span>age <span class="token keyword">as</span> 年龄<span class="token punctuation">,</span>sex <span class="token keyword">from</span> stu <span class="token punctuation">;</span><span class="token comment">-- 给查询的结果起别名</span>
<span class="token keyword">select</span> name<span class="token punctuation">,</span>age <span class="token keyword">from</span> stu <span class="token keyword">where</span> age <span class="token operator">&gt;</span> <span class="token number">20</span><span class="token punctuation">;</span><span class="token comment">-- 条件查询</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> hire_date <span class="token operator">between</span> <span class="token string">&#39;1998-1-1&#39;</span> <span class="token operator">and</span> <span class="token string">&#39;1998-12-31&#39;</span><span class="token punctuation">;</span><span class="token comment">-- 范围（包含两头）</span>
<span class="token keyword">select</span> name<span class="token punctuation">,</span>age <span class="token keyword">from</span> stu <span class="token keyword">where</span> age <span class="token operator">in</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">,</span><span class="token number">22</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">select</span> name<span class="token punctuation">,</span>english <span class="token keyword">from</span> stu <span class="token keyword">where</span> english <span class="token operator">is</span> <span class="token boolean">null</span><span class="token punctuation">;</span><span class="token comment">-- 等于空的查询方法</span>
<span class="token keyword">select</span> name <span class="token keyword">from</span> stu <span class="token keyword">where</span> name <span class="token operator">like</span> <span class="token string">&#39;柳_&#39;</span><span class="token punctuation">;</span><span class="token comment">-- 模糊查询</span>
<span class="token keyword">select</span> name<span class="token punctuation">,</span>hire_date <span class="token keyword">from</span> stu <span class="token keyword">where</span> hire_date <span class="token operator">like</span> <span class="token string">&#39;%09%&#39;</span><span class="token punctuation">;</span><span class="token comment">-- 模糊查询</span>
<span class="token keyword">select</span> <span class="token keyword">distinct</span> name<span class="token punctuation">,</span>age<span class="token punctuation">,</span>sex <span class="token keyword">from</span> stu <span class="token keyword">where</span> age <span class="token operator">=</span> <span class="token number">55</span><span class="token punctuation">;</span><span class="token comment">-- distinct可去除查询结果中的相同记录</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">order</span> <span class="token keyword">by</span> math <span class="token keyword">desc</span><span class="token punctuation">,</span>english <span class="token keyword">asc</span><span class="token punctuation">;</span><span class="token comment">-- 排序，desc表示降序，asc表示升序（默认），当math字段的记录相同时通过English字段进行排序</span>


<span class="token comment"># 聚合函数</span>
<span class="token comment">-- 所有的聚合函数中null都不参与运算</span>
<span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">from</span> stu<span class="token punctuation">;</span> <span class="token comment">-- 统计记录的条数一般用*</span>
<span class="token keyword">select</span> <span class="token function">max</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span><span class="token punctuation">,</span>name <span class="token keyword">from</span> stu<span class="token punctuation">;</span><span class="token comment">-- 可以输入其他字段</span>
<span class="token keyword">select</span> <span class="token function">min</span><span class="token punctuation">(</span>english<span class="token punctuation">)</span> <span class="token keyword">from</span> stu<span class="token punctuation">;</span><span class="token comment">-- min计算中不统计null值</span>
<span class="token keyword">select</span> <span class="token function">avg</span><span class="token punctuation">(</span>english<span class="token punctuation">)</span> <span class="token keyword">from</span> stu<span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token function">sum</span><span class="token punctuation">(</span>english<span class="token punctuation">)</span> <span class="token keyword">from</span> stu<span class="token punctuation">;</span>

<span class="token comment"># 分组查询</span>
<span class="token comment">-- 注意：分组之后，查询的字段为聚合函数和分组字段，查询其他字段无意义</span>
<span class="token comment">-- 查询男同学和女同学各自的数学平均分，以及各自人数</span>
<span class="token keyword">select</span> sex<span class="token punctuation">,</span><span class="token function">avg</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">from</span> stu <span class="token keyword">group</span> <span class="token keyword">by</span> sex<span class="token punctuation">;</span><span class="token comment">-- 这里的分组字段为sex，查询中输入其他字段将无意义</span>
<span class="token comment">-- 查询男同学和女同学各自的数学平均分，以及各自人数，要求：分数低于70分的不参与分组</span>
<span class="token keyword">select</span> sex<span class="token punctuation">,</span><span class="token function">avg</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> math <span class="token operator">&gt;</span> <span class="token number">70</span> <span class="token keyword">group</span> <span class="token keyword">by</span> sex<span class="token punctuation">;</span><span class="token comment">-- where math &gt; 70 分组前的条件限定（表示参与分组的条件）</span>
<span class="token comment">-- 查询男同学和女同学各自的数学平均分，以及各自人数，要求：分数低于70分的不参与分组，分组之后人数大2</span>
<span class="token keyword">select</span> sex<span class="token punctuation">,</span><span class="token function">avg</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">from</span> stu <span class="token keyword">where</span> math <span class="token operator">&gt;</span> <span class="token number">70</span> <span class="token keyword">group</span> <span class="token keyword">by</span> sex <span class="token keyword">having</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">2</span><span class="token punctuation">;</span><span class="token comment">-- having count(*) &gt; 2 分组后的过滤条件（显示分组的条件）</span>
<span class="token comment">/*
where和having区别：
·执行时机不一样：where是分组之前进行限定，不满足where条件，则不参与分组，而having是分组之后对结果进行过滤。
·可判断的条件不一样：where不能对聚合函数进行判断，having可以。
执行顺序：where&gt;聚合函数&gt;having
 */</span>

<span class="token comment"># 分页查询</span>
<span class="token comment">-- 其实索引=（页码-1）*每页条数</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">limit</span> <span class="token number">0</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">;</span><span class="token comment">-- 0表示查询的起始记录（0开始），3表示显示的条数</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">limit</span> <span class="token number">3</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">;</span><span class="token comment">-- 第二页</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> stu <span class="token keyword">limit</span> <span class="token number">6</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">;</span><span class="token comment">-- 第三页</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sql高级语法" tabindex="-1"><a class="header-anchor" href="#sql高级语法" aria-hidden="true">#</a> SQL高级语法</h2><h4 id="多表查询" tabindex="-1"><a class="header-anchor" href="#多表查询" aria-hidden="true">#</a> 多表查询</h4><ul><li><p>联合多张表查询数据即关联查询，查询的结果集中的字段来自多张表，关联查询的重点是连接条件,数据库是根据连接条件对表中的数据做关联然后查询内容的</p></li><li><p>笛卡尔积：关联查询通常要加连接条件,不写连接条件会出现&quot;笛卡尔积”，笛卡尔积通常是一个无意义的结果集，笛卡尔积是将关联查询表中的数据一一连接一遍而产生的结果集，数据量为关联查询表数据量的乘积</p></li><li><p>连接查询</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220426193628033.png" alt="image-20220426193628033"></p><ul><li>内连接查询 ：相当于查询AB交集数据</li><li>外连接查询 <ul><li>左外连接查询 ：相当于查询A表所有数据和交集部门数据</li><li>右外连接查询 ： 相当于查询B表所有数据和交集部分数据</li></ul></li></ul></li><li><p>子查询</p><ul><li>子查询根据查询结果不同，作用不同 <ul><li>子查询语句结果是单行单列，子查询语句作为条件值，使用 = != &gt; &lt; 等进行条件判断</li><li>子查询语句结果是多行单列，子查询语句作为条件值，使用 in 等关键字进行条件判断</li><li>子查询语句结果是多行多列，子查询语句作为虚拟表</li></ul></li></ul></li></ul>`,22),u=n("thead",null,[n("tr",null,[n("th",null,"代码"),n("th",null,"解释")])],-1),r=n("tr",null,[n("td",null,"SELECT * FROM emp,dept WHERE emp.deptno = dept.deptno;"),n("td",null,"通过关联字消除笛卡尔积")],-1),m=n("tr",null,[n("td",null,"select e.ename,e.deptno,d.dname from emp e,dept d where e.deptno=d.deptno;"),n("td",null,"对于查询的某个字段在多张表上同时存在，我们可以使用表名或表别名来指定该字段来自哪张表")],-1),k=n("tr",null,[n("td",null,[s("SELECT * FROM zhangsan,lisi WHERE zhangsan."),n("code",null,"name"),s(" = lisi."),n("code",null,"name"),s(";")]),n("td",null,"通过关联字段做等值判断")],-1),v=n("tr",null,[n("td"),n("td")],-1),b={href:"http://zhangsan.name",target:"_blank",rel:"noopener noreferrer"},E={href:"http://lisi.name",target:"_blank",rel:"noopener noreferrer"},y=n("td",null,"内连接：查询出两张表中的共同数据",-1),T=n("tr",null,[n("td",null,"SELECT * FROM boy LEFT OUTER JOIN girl ON boy.gid = girl.gid;"),n("td",null,"左外连接：将左边表的所有数据查询出来，然后与右表的数据进行匹配，匹配不上的用null进行匹配")],-1),w=n("tr",null,[n("td",null,"SELECT * FROM boy RIGHT OUTER JOIN girl ON boy.gid = girl.gid;"),n("td",null,"右外连接：将右边表的所有数据查询出来，然后与左表的数据进行匹配，匹配不上的用null进行匹配")],-1),R=n("tr",null,[n("td",null,"(SELECT * FROM boy) UNION ALL (SELECT * FROM girl);"),n("td",null,"全外连接：两张表的所有数据都查询出来")],-1),g=n("tr",null,[n("td",null,"SELECT e.ename,m.ename FROM emp e,emp m WHERE e.mgr = m.empno;"),n("td",null,"自连接：在有些情况下查询数据时需要将一张表当做两张表来使用，然后才能查询出指定的内容；")],-1),S=n("tr",null,[n("td"),n("td",null,"子查询：将一条SQL查询出来的结果作为另一条SQL的查询条件来使用")],-1),L=n("tr",null,[n("td",null,"(SELECT MAX(sal) sal,deptno FROM emp GROUP BY deptno) AS m_sal"),n("td",null,"将查询出来的结果作为一张表来使用")],-1),A=p(`<div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># 多表查询</span>
<span class="token comment">-- 导入数据</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> emp<span class="token punctuation">;</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> dept<span class="token punctuation">;</span>
<span class="token comment">-- 创建部门表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> dept<span class="token punctuation">(</span>
                     did <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
                     dname <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 创建员工表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> emp <span class="token punctuation">(</span>
                     id <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
                     name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                     gender <span class="token keyword">CHAR</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">-- 性别</span>
                     salary <span class="token keyword">DOUBLE</span><span class="token punctuation">,</span> <span class="token comment">-- 工资</span>
                     join_date <span class="token keyword">DATE</span><span class="token punctuation">,</span> <span class="token comment">-- 入职日期</span>
                     dep_id <span class="token keyword">INT</span><span class="token punctuation">,</span>
                     <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>dep_id<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> dept<span class="token punctuation">(</span>did<span class="token punctuation">)</span> <span class="token comment">-- 外键，关联部门表(部门表的主键)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 添加部门数据</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dept <span class="token punctuation">(</span>dname<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">&#39;研发部&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token string">&#39;市场部&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token string">&#39;财务部&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token string">&#39;销售部&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 添加员工数据</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>name<span class="token punctuation">,</span>gender<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>join_date<span class="token punctuation">,</span>dep_id<span class="token punctuation">)</span> <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token string">&#39;孙悟空&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token number">7200</span><span class="token punctuation">,</span><span class="token string">&#39;2013-02-24&#39;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">&#39;猪八戒&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token number">3600</span><span class="token punctuation">,</span><span class="token string">&#39;2010-12-02&#39;</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">&#39;唐僧&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token number">9000</span><span class="token punctuation">,</span><span class="token string">&#39;2008-08-08&#39;</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">&#39;白骨精&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;女&#39;</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">,</span><span class="token string">&#39;2015-10-07&#39;</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">&#39;蜘蛛精&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;女&#39;</span><span class="token punctuation">,</span><span class="token number">4500</span><span class="token punctuation">,</span><span class="token string">&#39;2011-03-14&#39;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">&#39;小白龙&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token number">2500</span><span class="token punctuation">,</span><span class="token string">&#39;2011-02-14&#39;</span><span class="token punctuation">,</span><span class="token boolean">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token punctuation">,</span> dept<span class="token punctuation">;</span><span class="token comment">-- 笛卡尔积 ： 有 A ,B两个集合 取 A,B所有的组合情况</span>

<span class="token comment"># 内连接查询</span>
<span class="token comment">-- 隐式内连接</span>
<span class="token keyword">SELECT</span>
    <span class="token operator">*</span>
<span class="token keyword">FROM</span>
    emp<span class="token punctuation">,</span>
    dept
<span class="token keyword">WHERE</span>
        emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span>

<span class="token comment">-- 查询 emp的 name， gender，dept表的dname</span>
<span class="token keyword">SELECT</span>
    emp<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
    emp<span class="token punctuation">.</span>gender<span class="token punctuation">,</span>
    dept<span class="token punctuation">.</span>dname
<span class="token keyword">FROM</span>
    emp<span class="token punctuation">,</span>
    dept
<span class="token keyword">WHERE</span>
        emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span>

<span class="token comment">-- 给表 起别名</span>
<span class="token keyword">SELECT</span>
    t1<span class="token punctuation">.</span>NAME<span class="token punctuation">,</span>
    t1<span class="token punctuation">.</span>gender<span class="token punctuation">,</span>
    t2<span class="token punctuation">.</span>dname
<span class="token keyword">FROM</span>
    emp t1<span class="token punctuation">,</span>
    dept t2
<span class="token keyword">WHERE</span>
        t1<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> t2<span class="token punctuation">.</span>did<span class="token punctuation">;</span>


<span class="token comment">-- 显式内连接</span>

<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token keyword">inner</span> <span class="token keyword">join</span> dept <span class="token keyword">on</span> emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span>

<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> dept <span class="token keyword">inner</span> <span class="token keyword">join</span> emp <span class="token keyword">on</span> emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span>

<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp  <span class="token keyword">join</span> dept <span class="token keyword">on</span> emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span><span class="token comment">-- inner可以省略</span>

<span class="token comment"># 外连接查询</span>
<span class="token comment">-- 左外连接</span>
<span class="token comment">-- 查询emp表所有数据和对应的部门信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token keyword">left</span> <span class="token keyword">outer</span> <span class="token keyword">join</span> dept <span class="token keyword">on</span> emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span><span class="token comment">-- outer可以省略</span>


<span class="token comment">-- 右外连接</span>
<span class="token comment">-- 查询dept表所有数据和对应的员工信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token keyword">right</span> <span class="token keyword">join</span> dept <span class="token keyword">on</span> emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span>

<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> dept <span class="token keyword">left</span> <span class="token keyword">join</span> emp <span class="token keyword">on</span> emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span><span class="token comment">-- 左外连接和右外连接的可以互换</span>

<span class="token comment"># 子查询</span>
<span class="token comment">-- 查询工资高于猪八戒的员工信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token keyword">where</span> salary <span class="token operator">&gt;</span> <span class="token punctuation">(</span><span class="token keyword">select</span> salary <span class="token keyword">from</span> emp <span class="token keyword">where</span> name <span class="token operator">=</span> <span class="token string">&#39;猪八戒&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">-- 子查询语句结果是单行单列，子查询语句作为条件值，使用 =  !=  &gt;  &lt;  等进行条件判断</span>

<span class="token comment">-- 查询 &#39;财务部&#39; 和 &#39;市场部&#39; 所有的员工信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token keyword">where</span> dep_id <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token keyword">select</span> did <span class="token keyword">from</span> dept <span class="token keyword">where</span> dname <span class="token operator">in</span><span class="token punctuation">(</span><span class="token string">&#39;财务部&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;市场部&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">-- 子查询语句结果是多行单列，子查询语句作为条件值，使用 in 等关键字进行条件判断</span>

<span class="token comment">-- 查询入职日期是 &#39;2011-11-11&#39; 之后的员工信息和部门信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token keyword">where</span> join_date <span class="token operator">&gt;</span> <span class="token string">&#39;2011-11-11&#39;</span> <span class="token punctuation">)</span> t1<span class="token punctuation">,</span> dept <span class="token keyword">where</span> t1<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span><span class="token comment">-- 子查询语句结果是多行多列，子查询语句作为虚拟表</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h2><ul><li><p>日期、时间： | 函数 | 解释 | | ------------------- | ---------------------------------------- | | sysdate() | 获取当前日期和时间 | | curdate() | 获取当前日期 | | curtime() | 获取当前时间 | | now() | 获取当前日期和时间 | | current_timestamp() | 获取当前时间戳，控制台打印时间而非时间戳 |</p></li><li><p>字符串 | 函数 | 解释 | | -------- | ---------- | | concat() | 连接 | | length() | 长度 | | lower() | 转换为小写 | | upper() | 转换为大写 | | trim() | 去空白 | | ltrim() | 去左边空格 | | rtrim() | 去右边空格 |</p></li><li><p>null</p></li></ul><table><thead><tr><th>ifnull(num,0)</th><th>判断num是否为null，为空返回0，否则返回num</th></tr></thead><tbody><tr><td>if(x,y,z)</td><td>判断x是否为null，如果为null返回z，否则返回y</td></tr></tbody></table><ul><li>null的判断不能用 = 或 != ，而是 is 和 is not</li><li>任何数据和null的操作得到的都是null</li><li>SQL语句中的条件判断</li></ul><table><thead><tr><th>语句</th><th>解释</th></tr></thead><tbody><tr><td>=,&gt;,&lt;,&gt;=,&lt;=,!=,&lt;&gt;</td><td></td></tr><tr><td>(not) between...and...</td><td>(不)在……和……之间</td></tr><tr><td>(not) in(a，b，c)</td><td>(不)在(a，b，c)之中</td></tr><tr><td>and,&amp;&amp;</td><td>并且</td></tr><tr><td>or,ll</td><td>或者</td></tr><tr><td>is (not) null</td><td>(不)是null值 (判断null值不能用 = 或者 !=)</td></tr><tr><td>distinct</td><td>去除重复</td></tr><tr><td>as</td><td>作为</td></tr><tr><td>select 字段 from 表名 where 字段 like &#39;%字符1_字符2_&#39;</td><td>模糊查询，%表示多个字符，_表示一个字符，这两个字符之间可以任意组合</td></tr></tbody></table><h2 id="约束" tabindex="-1"><a class="header-anchor" href="#约束" aria-hidden="true">#</a> 约束</h2><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># SQL高级</span>
<span class="token comment"># 约束</span>
<span class="token comment"># 表与表之间的一对多关系</span>
<span class="token comment">-- 部门表（主表）</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> dept<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> dept<span class="token punctuation">(</span>
     id <span class="token keyword">int</span> <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token keyword">auto_increment</span><span class="token punctuation">,</span>
     dep_name <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
     addr <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 添加 2 个部门</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> dept<span class="token punctuation">(</span>dep_name<span class="token punctuation">,</span>addr<span class="token punctuation">)</span> <span class="token keyword">values</span>
<span class="token punctuation">(</span><span class="token string">&#39;研发部&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;广州&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">&#39;销售部&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;深圳&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">desc</span> dept<span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> dept<span class="token punctuation">;</span>


<span class="token comment">-- 员工表(从表)，创建从表前应该先创建主表</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> emp<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> emp <span class="token punctuation">(</span>
     id <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">auto_increment</span><span class="token punctuation">,</span> <span class="token comment">-- 员工id，主键（非空和唯一），且自增长</span>
     ename <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">UNIQUE</span><span class="token punctuation">,</span> <span class="token comment">-- 员工姓名，非空并且唯一</span>
     joindate <span class="token keyword">DATE</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token punctuation">,</span> <span class="token comment">-- 入职日期，非空</span>
     salary <span class="token keyword">DOUBLE</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token punctuation">,</span> <span class="token comment">-- 工资，非空</span>
     bonus <span class="token keyword">DOUBLE</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">-- 奖金，如果没有奖金默认为0</span>
     dep_id <span class="token keyword">int</span><span class="token punctuation">,</span>

    <span class="token comment">-- 添加外键 dep_id,关联 dept 表的id主键</span>
     <span class="token keyword">CONSTRAINT</span> fk_emp_dept <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span><span class="token punctuation">(</span>dep_id<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> dept<span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token comment">-- fk_emp_dept为外键名称</span>
<span class="token punctuation">)</span><span class="token keyword">AUTO_INCREMENT</span> <span class="token number">100</span><span class="token punctuation">;</span><span class="token comment">-- 设置自增长的起始值</span>

<span class="token comment">-- 删除外键</span>
<span class="token comment"># alter table emp drop FOREIGN key fk_emp_dept;</span>

<span class="token comment">-- 建完表后，添加外键</span>
<span class="token comment"># alter table emp add CONSTRAINT fk_emp_dept FOREIGN key(dep_id) REFERENCES dept(id);</span>

<span class="token comment">-- 添加员工,dep_id 表示员工所在的部门</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp <span class="token punctuation">(</span>ename<span class="token punctuation">,</span> joindate<span class="token punctuation">,</span> salary<span class="token punctuation">,</span>bonus<span class="token punctuation">,</span>dep_id<span class="token punctuation">)</span> <span class="token keyword">values</span>
<span class="token punctuation">(</span><span class="token string">&#39;张三&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;1999-11-11&#39;</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">&#39;李四&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;1999-11-11&#39;</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">&#39;王五&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;1999-11-11&#39;</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">&#39;赵六&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;1999-11-11&#39;</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>id<span class="token punctuation">,</span>ename<span class="token punctuation">,</span>joindate<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>bonus<span class="token punctuation">,</span>dep_id<span class="token punctuation">)</span> <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">&#39;张三&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;1999-11-11&#39;</span><span class="token punctuation">,</span><span class="token number">8800</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">-- 指定自增长后还是可以手动赋值</span>
<span class="token keyword">desc</span> emp<span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp<span class="token punctuation">;</span>

<span class="token comment">/*
   外键约束:
      * 外键用来让两个表的数据之间建立链接，保证数据的一致性和完整性

   -- 创建表时添加外键约束
   CREATE TABLE 表名(
       列名 数据类型,
       …
       [CONSTRAINT] [外键名称] FOREIGN KEY(外键列名) REFERENCES 主表(主表列名)
   );

   -- 建完表后添加外键约束
   ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段名称) REFERENCES 主表名称(主表列名称);

   -- 删除约束
   ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;
*/</span>


<span class="token comment"># 表的多对多关系</span>
<span class="token comment">/*
   多对多：
      * 如：订单 和 商品
      * 一个商品对应多个订单，一个订单包含多个商品

   实现方式：建立第三张中间表，中间表至少包含两个外键，分别关联两方主键

*/</span>
<span class="token comment">-- 订单表</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> tb_order<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> tb_order<span class="token punctuation">(</span>
                         id <span class="token keyword">int</span> <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token keyword">auto_increment</span><span class="token punctuation">,</span>
                         payment <span class="token keyword">double</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                         payment_type <span class="token keyword">TINYINT</span><span class="token punctuation">,</span>
                         <span class="token keyword">status</span> <span class="token keyword">TINYINT</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 商品表</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> tb_goods<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> tb_goods<span class="token punctuation">(</span>
                         id <span class="token keyword">int</span> <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token keyword">auto_increment</span><span class="token punctuation">,</span>
                         title <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                         price <span class="token keyword">double</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 订单商品中间表</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> tb_order_goods<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> tb_order_goods<span class="token punctuation">(</span>
                               id <span class="token keyword">int</span> <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token keyword">auto_increment</span><span class="token punctuation">,</span>
                               order_id <span class="token keyword">int</span><span class="token punctuation">,</span>
                               goods_id <span class="token keyword">int</span><span class="token punctuation">,</span>
                               count <span class="token keyword">int</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 建完表后，添加外键</span>
<span class="token keyword">alter</span> <span class="token keyword">table</span> tb_order_goods <span class="token keyword">add</span> <span class="token keyword">CONSTRAINT</span> fk_order_id <span class="token keyword">FOREIGN</span> <span class="token keyword">key</span><span class="token punctuation">(</span>order_id<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> tb_order<span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">alter</span> <span class="token keyword">table</span> tb_order_goods <span class="token keyword">add</span> <span class="token keyword">CONSTRAINT</span> fk_goods_id <span class="token keyword">FOREIGN</span> <span class="token keyword">key</span><span class="token punctuation">(</span>goods_id<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> tb_goods<span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多表查询-1" tabindex="-1"><a class="header-anchor" href="#多表查询-1" aria-hidden="true">#</a> 多表查询</h2><ul><li><p>连接查询</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220426193628033.png" alt="image-20220426193628033"></p><ul><li>内连接查询 ：相当于查询AB交集数据</li><li>外连接查询 <ul><li>左外连接查询 ：相当于查询A表所有数据和交集部门数据</li><li>右外连接查询 ： 相当于查询B表所有数据和交集部分数据</li></ul></li></ul></li><li><p>子查询</p><ul><li>子查询根据查询结果不同，作用不同 <ul><li>子查询语句结果是单行单列，子查询语句作为条件值，使用 = != &gt; &lt; 等进行条件判断</li><li>子查询语句结果是多行单列，子查询语句作为条件值，使用 in 等关键字进行条件判断</li><li>子查询语句结果是多行多列，子查询语句作为虚拟表</li></ul></li></ul></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment"># 多表查询</span>
<span class="token comment">-- 导入数据</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> emp<span class="token punctuation">;</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> dept<span class="token punctuation">;</span>
<span class="token comment">-- 创建部门表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> dept<span class="token punctuation">(</span>
                     did <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
                     dname <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 创建员工表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> emp <span class="token punctuation">(</span>
                     id <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
                     name <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                     gender <span class="token keyword">CHAR</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">-- 性别</span>
                     salary <span class="token keyword">DOUBLE</span><span class="token punctuation">,</span> <span class="token comment">-- 工资</span>
                     join_date <span class="token keyword">DATE</span><span class="token punctuation">,</span> <span class="token comment">-- 入职日期</span>
                     dep_id <span class="token keyword">INT</span><span class="token punctuation">,</span>
                     <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>dep_id<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> dept<span class="token punctuation">(</span>did<span class="token punctuation">)</span> <span class="token comment">-- 外键，关联部门表(部门表的主键)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 添加部门数据</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dept <span class="token punctuation">(</span>dname<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">&#39;研发部&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token string">&#39;市场部&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token string">&#39;财务部&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token string">&#39;销售部&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 添加员工数据</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp<span class="token punctuation">(</span>name<span class="token punctuation">,</span>gender<span class="token punctuation">,</span>salary<span class="token punctuation">,</span>join_date<span class="token punctuation">,</span>dep_id<span class="token punctuation">)</span> <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token string">&#39;孙悟空&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token number">7200</span><span class="token punctuation">,</span><span class="token string">&#39;2013-02-24&#39;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">&#39;猪八戒&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token number">3600</span><span class="token punctuation">,</span><span class="token string">&#39;2010-12-02&#39;</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">&#39;唐僧&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token number">9000</span><span class="token punctuation">,</span><span class="token string">&#39;2008-08-08&#39;</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">&#39;白骨精&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;女&#39;</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">,</span><span class="token string">&#39;2015-10-07&#39;</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">&#39;蜘蛛精&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;女&#39;</span><span class="token punctuation">,</span><span class="token number">4500</span><span class="token punctuation">,</span><span class="token string">&#39;2011-03-14&#39;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token string">&#39;小白龙&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">,</span><span class="token number">2500</span><span class="token punctuation">,</span><span class="token string">&#39;2011-02-14&#39;</span><span class="token punctuation">,</span><span class="token boolean">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token punctuation">,</span> dept<span class="token punctuation">;</span><span class="token comment">-- 笛卡尔积 ： 有 A ,B两个集合 取 A,B所有的组合情况</span>

<span class="token comment"># 内连接查询</span>
<span class="token comment">-- 隐式内连接</span>
<span class="token keyword">SELECT</span>
    <span class="token operator">*</span>
<span class="token keyword">FROM</span>
    emp<span class="token punctuation">,</span>
    dept
<span class="token keyword">WHERE</span>
        emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span>

<span class="token comment">-- 查询 emp的 name， gender，dept表的dname</span>
<span class="token keyword">SELECT</span>
    emp<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
    emp<span class="token punctuation">.</span>gender<span class="token punctuation">,</span>
    dept<span class="token punctuation">.</span>dname
<span class="token keyword">FROM</span>
    emp<span class="token punctuation">,</span>
    dept
<span class="token keyword">WHERE</span>
        emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span>

<span class="token comment">-- 给表 起别名</span>
<span class="token keyword">SELECT</span>
    t1<span class="token punctuation">.</span>NAME<span class="token punctuation">,</span>
    t1<span class="token punctuation">.</span>gender<span class="token punctuation">,</span>
    t2<span class="token punctuation">.</span>dname
<span class="token keyword">FROM</span>
    emp t1<span class="token punctuation">,</span>
    dept t2
<span class="token keyword">WHERE</span>
        t1<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> t2<span class="token punctuation">.</span>did<span class="token punctuation">;</span>


<span class="token comment">-- 显式内连接</span>

<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token keyword">inner</span> <span class="token keyword">join</span> dept <span class="token keyword">on</span> emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span>

<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> dept <span class="token keyword">inner</span> <span class="token keyword">join</span> emp <span class="token keyword">on</span> emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span>

<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp  <span class="token keyword">join</span> dept <span class="token keyword">on</span> emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span><span class="token comment">-- inner可以省略</span>

<span class="token comment"># 外连接查询</span>
<span class="token comment">-- 左外连接</span>
<span class="token comment">-- 查询emp表所有数据和对应的部门信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token keyword">left</span> <span class="token keyword">outer</span> <span class="token keyword">join</span> dept <span class="token keyword">on</span> emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span><span class="token comment">-- outer可以省略</span>


<span class="token comment">-- 右外连接</span>
<span class="token comment">-- 查询dept表所有数据和对应的员工信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token keyword">right</span> <span class="token keyword">join</span> dept <span class="token keyword">on</span> emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span>

<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> dept <span class="token keyword">left</span> <span class="token keyword">join</span> emp <span class="token keyword">on</span> emp<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span><span class="token comment">-- 左外连接和右外连接的可以互换</span>

<span class="token comment"># 子查询</span>
<span class="token comment">-- 查询工资高于猪八戒的员工信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token keyword">where</span> salary <span class="token operator">&gt;</span> <span class="token punctuation">(</span><span class="token keyword">select</span> salary <span class="token keyword">from</span> emp <span class="token keyword">where</span> name <span class="token operator">=</span> <span class="token string">&#39;猪八戒&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">-- 子查询语句结果是单行单列，子查询语句作为条件值，使用 =  !=  &gt;  &lt;  等进行条件判断</span>

<span class="token comment">-- 查询 &#39;财务部&#39; 和 &#39;市场部&#39; 所有的员工信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token keyword">where</span> dep_id <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token keyword">select</span> did <span class="token keyword">from</span> dept <span class="token keyword">where</span> dname <span class="token operator">in</span><span class="token punctuation">(</span><span class="token string">&#39;财务部&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;市场部&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">-- 子查询语句结果是多行单列，子查询语句作为条件值，使用 in 等关键字进行条件判断</span>

<span class="token comment">-- 查询入职日期是 &#39;2011-11-11&#39; 之后的员工信息和部门信息</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token keyword">where</span> join_date <span class="token operator">&gt;</span> <span class="token string">&#39;2011-11-11&#39;</span> <span class="token punctuation">)</span> t1<span class="token punctuation">,</span> dept <span class="token keyword">where</span> t1<span class="token punctuation">.</span>dep_id <span class="token operator">=</span> dept<span class="token punctuation">.</span>did<span class="token punctuation">;</span><span class="token comment">-- 子查询语句结果是多行多列，子查询语句作为虚拟表</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 这是注释：关键字可以先输入一部分然后按tab键自动补全
-- 表的操作
-- 在创建表、操作表之前需要先告知MySQL操作的是哪个数据
USE java87;	-- 选中java87数据库进行操作

-- 新建表
-- 创建表的格式：
-- create table 表名(
-- 	字段名 字段类型,
-- 	字段名 字段类型,
-- 	...
-- );
-- field：字段   类似于类中的属性    字段类型：字段的类型，类似于属性类型

CREATE TABLE student(
	id INT,   -- int 整数   默认能够存储11位的整数
	NAME VARCHAR(20),  -- varchar(20)   字符串，长度为20的字符
	gender VARCHAR(2)
);

-- 通过SQL方式查看当前数据库下有哪些表格。
SHOW TABLES;

-- 查看表的结构
DESC student;

-- 删除表
DROP TABLE student;

-- 直接修改表的结构

-- 添加字段
ALTER TABLE student ADD COLUMN age INT;

-- 修改字段名字、类型 sex     
ALTER TABLE student CHANGE gender sex VARCHAR(30);

-- 删除字段
ALTER TABLE student DROP COLUMN age;

-- 插入数据  MySQL双引号、单引号都可以表示字符串  值的顺序要与字段顺序保持一致
INSERT INTO student VALUES(1001,&#39;小明&#39;,&#39;男&#39;);

-- 插入数据两种方式
-- 给所有的字段赋值：插入数据时需要给定所有字段的值，如果不给定插入失败
--    insert into table values(值1,值2,.....)
--    Column count doesn&#39;t match value count at row 1  字段个数与值的个数不匹配
INSERT INTO student VALUES(1002,&#39;小强&#39;);  -- 插入失败
-- 给部分字段赋值：
--    insert into table(字段1,字段2...) value(值1，值2...);
--    未插入字段值为null
INSERT INTO student(id,NAME) VALUE(1003,&#39;小丽&#39;);


-- 批量插入
INSERT INTO student VALUES(1004,&#39;刘备&#39;,&#39;男&#39;),(1005,&#39;貂蝉&#39;,&#39;女&#39;),(1006,&#39;东方不败&#39;,NULL);


-- 更新数据
-- update 表名 set 字段名 = 值 where 条件;   通过指定的条件修改数据
UPDATE student SET sex = &#39;男&#39; WHERE id = 1006;   -- sql中=与Java中的 == 一样

UPDATE student SET sex = &#39;女&#39; WHERE NAME = &#39;东方不败&#39;;

UPDATE student SET NAME=&#39;令狐冲&#39;,sex=&#39;男&#39; WHERE id = 1006;  -- 也可以同时修改多个字段的值


-- 删除数据
-- delete from 表名 where 条件;	  根据条件删除满足条件的数据
DELETE FROM student WHERE id = 1006;

DELETE FROM student WHERE sex = &#39;男&#39;;


-- 查询表中所有的数据
SELECT * FROM student;


-- ----------------------------------------查询-------------------------------------------
-- 快速中在数据库查找出我们想要的数据
-- 格式：
-- select 字段名,字段名,... from 表名 where 条件;
-- 从表的数量上来划分，查询可以分为单表查询、多表查询
-- 查询的数据来自一张		单边查询
-- 查询的数据来自多张表   	多表查询

-- 单表查询
DROP TABLE dept;
CREATE TABLE dept
(deptno INT(2)  NOT NULL   AUTO_INCREMENT,
dname VARCHAR(14) ,
loc VARCHAR(13),
PRIMARY KEY (deptno)
 ) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 ;

DROP TABLE emp;
CREATE TABLE emp
       (empno INT(4)  NOT NULL AUTO_INCREMENT,
ename VARCHAR(10),
job VARCHAR(9),
mgr INT(4),
hiredate DATE,
sal DOUBLE(7,2),
comm DOUBLE(7,2),
PRIMARY KEY (empno),
deptno INT(2),
CONSTRAINT fk_deptno FOREIGN KEY(deptno) REFERENCES dept (deptno))
ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO dept VALUES
(10,&#39;ACCOUNTING&#39;,&#39;NEW YORK&#39;);
INSERT INTO dept VALUES (20,&#39;RESEARCH&#39;,&#39;DALLAS&#39;);
INSERT INTO dept VALUES
(30,&#39;SALES&#39;,&#39;CHICAGO&#39;);
INSERT INTO dept VALUES
(40,&#39;OPERATIONS&#39;,&#39;BOSTON&#39;);
INSERT INTO emp VALUES
(7369,&#39;SMITH&#39;,&#39;CLERK&#39;,7902,STR_TO_DATE(&#39;17-12-1980&#39;,&#39;%d-%m-%Y&#39;),800,NULL,20);
INSERT INTO emp VALUES
(7499,&#39;ALLEN&#39;,&#39;SALESMAN&#39;,7698,STR_TO_DATE(&#39;20-2-1981&#39;,&#39;%d-%m-%Y&#39;),1600,300,30);
INSERT INTO emp VALUES
(7521,&#39;WARD&#39;,&#39;SALESMAN&#39;,7698,STR_TO_DATE(&#39;22-2-1981&#39;,&#39;%d-%m-%Y&#39;),1250,500,30);
INSERT INTO emp VALUES
(7566,&#39;JONES&#39;,&#39;MANAGER&#39;,7839,STR_TO_DATE(&#39;2-4-1981&#39;,&#39;%d-%m-%Y&#39;),2975,NULL,20);
INSERT INTO emp VALUES
(7654,&#39;MARTIN&#39;,&#39;SALESMAN&#39;,7698,STR_TO_DATE(&#39;28-9-1981&#39;,&#39;%d-%m-%Y&#39;),1250,1400,30);
INSERT INTO emp VALUES
(7698,&#39;BLAKE&#39;,&#39;MANAGER&#39;,7839,STR_TO_DATE(&#39;1-5-1981&#39;,&#39;%d-%m-%Y&#39;),2850,NULL,30);
INSERT INTO emp VALUES
(7782,&#39;CLARK&#39;,&#39;MANAGER&#39;,7839,STR_TO_DATE(&#39;9-6-1981&#39;,&#39;%d-%m-%Y&#39;),2450,NULL,10);
INSERT INTO emp VALUES
(7788,&#39;SCOTT&#39;,&#39;ANALYST&#39;,7566,STR_TO_DATE(&#39;13-JUL-87&#39;)-85,3000,NULL,20);
INSERT INTO emp VALUES
(7839,&#39;KING&#39;,&#39;PRESIDENT&#39;,NULL,STR_TO_DATE(&#39;17-11-1981&#39;,&#39;%d-%m-%Y&#39;),5000,NULL,10);
INSERT INTO emp VALUES
(7844,&#39;TURNER&#39;,&#39;SALESMAN&#39;,7698,STR_TO_DATE(&#39;8-9-1981&#39;,&#39;%d-%m-%Y&#39;),1500,0,30);
INSERT INTO emp VALUES
(7876,&#39;ADAMS&#39;,&#39;CLERK&#39;,7788,STR_TO_DATE(&#39;13-JUL-87&#39;)-51,1100,NULL,20);
INSERT INTO emp VALUES
(7900,&#39;JAMES&#39;,&#39;CLERK&#39;,7698,STR_TO_DATE(&#39;3-12-1981&#39;,&#39;%d-%m-%Y&#39;),950,NULL,30);
INSERT INTO emp VALUES
(7902,&#39;FORD&#39;,&#39;ANALYST&#39;,7566,STR_TO_DATE(&#39;3-12-1981&#39;,&#39;%d-%m-%Y&#39;),3000,NULL,20);
INSERT INTO emp VALUES
(7934,&#39;MILLER&#39;,&#39;CLERK&#39;,7782,STR_TO_DATE(&#39;23-1-1982&#39;,&#39;%d-%m-%Y&#39;),1300,NULL,10);

DROP TABLE bonus;
CREATE TABLE bonus
(
ename VARCHAR(10) ,
job VARCHAR(9)  ,
sal DECIMAL(10,2),
comm DECIMAL(10,2)
)ENGINE=INNODB DEFAULT CHARSET=utf8;

DROP TABLE salgrade;
CREATE TABLE salgrade
      ( grade INT(10),
losal INT(10),
hisal INT(10) )ENGINE=INNODB DEFAULT CHARSET=utf8;
INSERT INTO salgrade VALUES (1,700,1200);
INSERT INTO salgrade VALUES (2,1201,1400);
INSERT INTO salgrade VALUES (3,1401,2000);
INSERT INTO salgrade VALUES (4,2001,3000);
INSERT INTO salgrade VALUES (5,3001,9999);
COMMIT;


SHOW TABLES;  -- 查看表
-- bonus   奖金，记录员工的奖金
--    	ename  	员工名
-- 	job	职位
-- 	sal	薪资
-- 	comm	提成

-- dept    部门表
-- 	deptno	部门编号
-- 	dname	部门名
-- 	loc	部门所在城市

-- emp	   员工表
-- 	empno	员工号
-- 	ename	员工名
-- 	job	岗位
-- 	mgr	当前员工的领导的工号
-- 	hiredate	入职日期
-- 	sal	薪资
-- 	comm	提成
-- 	deptno	所在部门的编号

-- salgrade	薪资等级表
-- 	grade	工资等级
-- 	losal	该等级的最低薪资
-- 	hisal	该等级的最高工资

-- emp dept

SELECT * FROM emp;

DESC salgrade;


-- 查询的基本用法
-- 1.查询指定表中的所有数据
-- select * from 表;         * 代表所有字段
SELECT * FROM emp;

-- 2.查询部分字段的数据
-- select 字段1,字段2,... from 表
-- 查询出所有员工的名字及薪资
SELECT ename,sal FROM emp;

-- 3.条件查询
-- select 字段 from 表 where 条件;
-- 查询smith的岗位及其薪资
SELECT ename,job,sal FROM emp WHERE ename = &#39;smith&#39;;

-- 4.按照某个字段进行升序、降序排序
-- select 字段... from 表格 order by 字段;   通过by后面的字段进行排序
SELECT ename,sal FROM emp ORDER BY sal;     -- 默认升序

SELECT ename,sal FROM emp ORDER BY sal DESC;  -- 降序


-- -------------------------------- 条件查询 -----------------------------------
-- 基本语法
-- select 字段... from 表 where 条件;
-- 根据条件的个数将条件查询分为两种：单条件查询和多条件查询
-- 单条件：只有一个查询条件
-- 多条件：多个查询条件

-- 单条件
-- 案例：找出所有工资高于2000的员工新名及薪资    =    &gt;    &gt;=    &lt;    &lt;=   !=
SELECT ename,sal FROM emp WHERE sal &gt; 3000;

-- 案例：找出所有10号部门的员工姓名及薪资
SELECT ename,sal FROM emp WHERE deptno = 10;

-- 练习：找出10号部门所有员工姓名及薪资然后按照薪资进行降序排序
-- 注意：ORDER BY通常放在最后
SELECT ename,sal FROM emp WHERE deptno = 10 ORDER BY sal DESC;


-- 多条件
-- 条件之间通过and或者or进行拼接    and表示并且  or表示或者
-- select 字段... from 表 where 条件1  条件2  ....
-- 案例：查找出薪资大于1000但是低于2000的员工姓名、薪资
SELECT ename,sal FROM emp WHERE sal &gt; 1000 AND sal &lt; 2000;

-- 案例：找出30号部门薪资大于2000的员工姓名及薪资
SELECT ename,sal FROM emp WHERE deptno=30 AND sal &gt; 2000;

-- 练习：找出10、20号部门所有薪资低于2000的员工姓名及薪资
SELECT ename,sal,deptno FROM emp WHERE (deptno=10 OR deptno=20) AND sal&lt;2000;


-- 范围查询
-- between 值1 and 值2            [值1,值2]
SELECT ename,sal FROM emp WHERE sal BETWEEN 1000 AND 2000;

SELECT ename,sal FROM emp WHERE sal BETWEEN 1000 AND 2000 ORDER BY sal;

-- 练习：找出30号部门薪资在1000到2000之间所有员工的新名、薪资
SELECT ename,sal FROM emp WHERE deptno=30 AND sal &gt;=1000 AND sal &lt;=2000;

SELECT ename,sal FROM emp WHERE deptno=30 AND sal BETWEEN 1000 AND 2000;


-- 查询出10号、30号部门的所有员工姓名、部门号
SELECT ename,deptno FROM emp WHERE deptno=10 OR deptno=30;

-- in、
-- in(值1,值2,....)  判断哪些数据在in列表中一样的
-- not in(值1,值2,...)  不在列表中的数据
SELECT ename,deptno FROM emp WHERE deptno IN(10,30);

-- 查询不是10号、30号部门员工的姓名、职位
SELECT ename,deptno FROM emp WHERE deptno!=10 AND deptno!=30;

SELECT ename,deptno FROM emp WHERE deptno NOT IN(10,30);


-- in  not  经常用来进行批量修改、删除、更新数据


-- 日期操作
-- 在MySQL提供了一些关于时间操作的函数（方法）
-- sysdate()	获取当前系统时间  	日期+时间
-- curdate()	获取当前日期		日期
-- curtime()	获取当前时间		时间
-- now()	获取当前时间		日期+时间
-- current_timestamp()	获取当前时间戳
SELECT SYSDATE();
SELECT CURDATE();
SELECT CURTIME();
SELECT NOW();
SELECT CURRENT_TIMESTAMP();

-- 通过   \`关键字\`  转义关键字
CREATE TABLE person(
	id INT,
	\`name\` VARCHAR(20),
	birthday DATE 		-- 生日
);

-- 插入日期
-- 自己指定：通过字符串插入   yyyy-MM-dd hh:mm:ss
-- 获取到系统时间

INSERT INTO person VALUES(1,&#39;钢铁侠&#39;,&#39;2000-12-23&#39;);
INSERT INTO person VALUES(2,&#39;baby&#39;,CURDATE());
INSERT INTO person VALUES(3,&#39;雷神&#39;,NOW()); -- 如果字段的类型只有日期，时间部分会丢失掉


SELECT * FROM person;


CREATE TABLE \`order\`(
	id INT,	-- 订单编号
	detail VARCHAR(30), -- 订单详情
	ordertime DATETIME	-- 下单时间   DATETIME：日期+时间
);

INSERT INTO \`order\` VALUES(1,&#39;不要辣椒&#39;,NOW());

SELECT * FROM \`order\`;


-- ---------------------------------字符串--------------------------------
-- 1.字符串的拼接  concat()函数
SELECT CONCAT(ename,sal) FROM emp;

SELECT CONCAT(ename,job) FROM emp;

SELECT CONCAT(ename,sal,job) FROM emp;

SELECT CONCAT(&#39;姓名:&#39;,ename,&#39;薪资：&#39;,sal,&#39;岗位：&#39;,job) FROM emp;

-- 2.获取字符串的长度  length(字段)
SELECT LENGTH(ename) FROM emp;

-- 3.大小写转换
-- lower()  小写
-- upper()  大写
SELECT LOWER(ename) FROM emp;

-- 4.去除多余的空白符
-- trim()   去掉前后多余的空格
-- ltrim()  left trim  去掉左边多余的空格
-- rtrim()  right trim 去掉右边多余的空格

SELECT * FROM \`order\`;

INSERT INTO \`order\` VALUES(1,&#39;    少加盐     &#39;,NOW());

SELECT TRIM(detail) FROM \`order\`;
SELECT LTRIM(detail) FROM \`order\`;
SELECT RTRIM(detail) FROM \`order\`;


-- 关于null值的操作
-- null是MySQL中一种比较特殊的值，除开null之外其他的所有的值都能使用 = != &gt; &lt; &gt;= !=这些操作
-- 但是null不行

SELECT * FROM student;

-- 找出所有没有性别的学生：性别的值为null
SELECT * FROM student WHERE sex = NULL;   -- 所有数据与null进行比较结果都为false

-- 如果想要与null进行比较，需要使用 is null或者is not null
-- is null   	判断是null
-- is not	判断不是null
SELECT * FROM student WHERE sex IS NULL;
SELECT * FROM student WHERE sex IS NOT NULL;

-- null值与其它值做任何操作结果都是null，例如字符串与null进行拼接得到的是null
SELECT CONCAT(ename,NULL) FROM emp;

SELECT * FROM emp;

-- 查询出所有员工的月薪 = sal + comm    null与任何值进行四则运算得到的值也是null
SELECT ename,sal + comm FROM emp;

-- ifnull(n,m)   如果n的值为null，则得到m的值，否则得到n的值    有点类似于  ?:

SELECT ename,sal + IFNULL(comm,0) FROM emp;

-- if(x,y,z)     判断x的值是否为null，如果为空则返回z，否则返回y
-- 查询所有员工名字及是否有提成，有提成显示提成的数字，否则显示0

SELECT ename,sal + IF(comm,comm,0) FROM emp;

-- null怎么用
-- 不能做大小值的比较   =  != &gt; &lt; 都不行
-- null不能直接与数字进行四则运算，因为所有与null进行四则运算得到的结果都为null  ifnull、if
-- null也不能与字符串直接拼接等操作，得到的还是null

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 模糊查询：like 看起来像
-- 用法
-- select 字段 from 表 where 字段 like &#39;子串&#39;;
-- like有两个通配符
-- _   代表任意一个字符
-- %   代表任意多个字符，可以是0个，也可以是多个

USE java87;

CREATE TABLE phone(
	id INT,
	\`name\` VARCHAR(20)
);
INSERT INTO phone VALUES(1,&#39;苹果8&#39;),(2,&#39;苹果13&#39;),(3,&#39;华为mate&#39;),(4,&#39;华为荣耀&#39;);

-- 查询name中包含苹果子串的数据
SELECT id,\`name\` FROM phone WHERE \`name\` LIKE &#39;%苹果%&#39;;

-- 查找以3结尾的
SELECT * FROM phone WHERE \`name\` LIKE &#39;%耀&#39;;

-- 查询第二个字符为果的数据
SELECT * FROM phone WHERE \`name\` LIKE &#39;_果%&#39;;

-- 查找倒数第二个字符为荣的数据
SELECT * FROM phone WHERE \`name\` LIKE &#39;%荣_&#39;;

-- 只要包含华、为两个字的都查询出来
SELECT * FROM phone WHERE \`name\` LIKE &#39;%华%为%&#39;;



-- 去重：去除重复的内容，只保留一个数据
SELECT * FROM emp;

-- 请查询出有员工部门的部门号
SELECT DISTINCT(deptno) FROM emp;

-- 查看所有员工都有些哪些职位
SELECT DISTINCT(job) FROM emp;



-- 聚合查询：对查询出来的数据做统计操作
-- 这些统计操作主要包括：
-- count()		统计数据的条数
-- avg()		计算结果的平均值
-- sum()		求和
-- max()		最大值
-- min()		最小值
-- 聚合函数执行的时机：是在查询出数据之后，然后对这些数据进行操作
-- 聚合函数执行时是得先要查询出这些数据，然后再对数据进行操作

-- 查询所有员工的平均薪资
-- 会先查询出所有员工的薪资，再进行求平均值
SELECT AVG(sal) FROM emp;

-- 查看所有员工的总薪资
SELECT SUM(sal) FROM emp;

-- 查询最高薪资
SELECT MAX(sal) FROM emp;

-- 查询20号部门的平均薪资
-- 先查询出20号部门的所有薪资，然后再进行求平均值
SELECT AVG(sal) FROM emp WHERE deptno = 20;


-- 统计员工人数
SELECT * FROM emp;

SELECT COUNT(empno) FROM emp;

SELECT COUNT(ename) FROM emp;

-- 统计有多少条记录
SELECT COUNT(*) FROM emp;


SELECT COUNT(\`name\`) FROM student;

SELECT * FROM student;

INSERT INTO student VALUES(1004,&#39;小丽&#39;,&#39;女&#39;);



-- 分组查询   group by
-- 查询出每一个部门的平均薪资
SELECT AVG(sal) FROM emp WHERE deptno = 20;
SELECT AVG(sal) FROM emp WHERE deptno = 10;
SELECT AVG(sal) FROM emp WHERE deptno = 30;
-- 分组查询：按照某个指定的字段将所有的数据进行分组，然后分别操作
SELECT deptno,AVG(sal) FROM emp GROUP BY deptno;

-- 查询每个职位的最高薪资
SELECT MAX(sal) FROM emp GROUP BY job;

SELECT sal FROM emp GROUP BY job;

SELECT * FROM emp;


-- 找出谁的工资高于所在部门的平均薪资
SELECT ename,sal FROM emp WHERE sal &gt; AVG(sal) GROUP BY deptno;
-- 将聚合函数作为了查询条件去查询数据，此处聚合函数的使用时机出了问题

-- 聚合函数执行时机：先要查询出数据，然后对数据进行操作

-- having子句：如果想要将聚合函数作为查询条件，需要将聚合函数写在having自居中

SELECT ename,sal FROM emp GROUP BY deptno HAVING sal &gt; AVG(sal);

-- 查询出哪些部门的平均薪资大于2000
-- 先通过部门号进行分组，求平均自，然后再对平均值进行判断
SELECT deptno,AVG(sal) FROM emp GROUP BY deptno HAVING AVG(sal) &gt; 2000; 

-- 查询出部门平均薪资高于2000这些部门中的最高薪资。
SELECT deptno,MAX(sal) FROM emp GROUP BY deptno HAVING AVG(sal) &gt; 2000; 


-- 聚合函数不能用在where后面，不能作为查询条件，如果要作为条件需要放在having子句后边，对结果
-- 进行过滤

--              11:15继续


-- --------------------------------多表查询--------------------------------
-- 案例：查询出每名员工的姓名及其所在部门的名字
-- 部门名字来自dept表
SELECT * FROM emp;
SELECT * FROM dept;

-- 基本的格式：select 字段 from 表1,表2;


SELECT * FROM emp,dept;

-- 笛卡尔积：在进行多表查询时如果不指定查询条件，MySQL会自动将两张表中的数据进行一一匹配
-- 得到数据，假设A表有n行数据，B表有m行数据，查询出来的结果就有n * m行数据
-- 问题就是笛卡尔积中出现了大量的垃圾数据，怎么将这些垃圾数据清理掉了
-- 处理方式：通过两张表相同字段进行等值判断进行处理

SELECT * FROM emp,dept WHERE emp.deptno = dept.deptno;

SELECT ename,dname FROM emp,dept WHERE emp.deptno = dept.deptno;


-- 练习：查询出在NEW YORK工作的员工姓名
-- 通过第一个条件将笛卡尔积中的垃圾数据清理掉，再通过第二个条件将不是new york的数据清理掉
SELECT ename,loc FROM emp,dept WHERE emp.deptno = dept.deptno AND loc = &#39;new york&#39;;


-- 内连接：查询出两张表中共同数据
-- 查询出两个人共同的好友
CREATE TABLE zhangsan(
	id INT,
	\`name\` VARCHAR(20)
);
CREATE TABLE lisi(
	id INT,
	\`name\` VARCHAR(20)
);
INSERT INTO zhangsan VALUES(1001,&#39;wangwu&#39;),(1002,&#39;zhaoliu&#39;),(1003,&#39;sunqi&#39;);
INSERT INTO lisi VALUES(1002,&#39;zhaoliu&#39;),(1004,&#39;wangba&#39;);


-- 编写SQL查询出zhangsan和lisi的共同分好友
SELECT * FROM zhangsan;
SELECT * FROM lisi;

-- 通过关联字段做等值判断，过滤垃圾数据
SELECT * FROM zhangsan,lisi WHERE zhangsan.name = lisi.name;

-- 通过内连接的方式查询出两张表相同的数据
-- 语法：select 字段 from 表1 inner join 表2 on 条件;
SELECT * FROM zhangsan INNER JOIN lisi ON zhangsan.name = lisi.name;


-- 外连接
-- 分类：
-- 左外连接：将左边表的所有数据查询出来，然后与右表的数据进行匹配，匹配不上的则用null进行匹配
-- 右外连接：将右边表的所有数据查询出来，用左表的数据进行匹配，匹配不上的用null进行匹配
-- 全外连接：将两张表所有的数据都进行匹配，匹配不上的用null进行匹配


CREATE TABLE boy(
	id INT,
	NAME VARCHAR(20),
	gid INT
);
INSERT INTO boy VALUES(1001,&#39;杨过&#39;,1),(1002,&#39;梁山伯&#39;,2),(1003,&#39;屌丝男&#39;,3);
CREATE TABLE girl(
	id INT,
	NAME VARCHAR(20),
	gid INT
);
INSERT INTO girl VALUES(2001,&#39;小龙女&#39;,1),(2002,&#39;祝英台&#39;,2),(1004,&#39;死宅女&#39;,4);
SELECT * FROM boy;
SELECT * FROM girl;

-- 查询出两张表中人物的匹配结果
SELECT * FROM boy,girl WHERE boy.gid = girl.gid;
SELECT * FROM boy INNER JOIN girl ON boy.gid = girl.gid;

-- 左外连接
-- 语法：select 字段 from 左表 left outer join 右表 on 条件;
SELECT * FROM boy LEFT OUTER JOIN girl ON boy.gid = girl.gid;   

-- 右外
SELECT * FROM boy RIGHT OUTER JOIN girl ON boy.gid = girl.gid;

-- 全外连接：将两张表的所有数据都查询出来  不会进行数据匹配
(SELECT * FROM boy) UNION ALL (SELECT * FROM girl);


-- 在MySQL连接主要分为5种
-- 内连接   inner join on	查询出两张表的相同部分
-- 左外	    left outer join on	将左表全部查询出来
-- 右外	    right outer join on 将右表全部查询出来
-- 全外     union all           将两张表的所有数据查询出来，不会进行数据匹配
-- 自连接   自己连接自己

-- 自连接：自己连接自己，在有些情况下查询数据时需要将一张表当做两张表来使用，然后才能查询出指定的内容
-- 案例：在emp表中查询出所有员工的姓名及其领导的姓名
SELECT * FROM emp;

SELECT ename,ename FROM emp;

-- 将emp表当做两张表来使用：员工表   领导表
-- 怎么区分这两个表：通过取别名的方式，取别名就是在表名后加上空格再加别名

SELECT e.ename,m.ename FROM emp e,emp m WHERE e.mgr = m.empno;

-- 得到笛卡尔积
SELECT * FROM emp e,emp m WHERE e.mgr = m.empno;


SELECT ename,ename FROM emp WHERE ;



SELECT * FROM emp,dept;

SELECT * FROM emp,dept WHERE emp.deptno = dept.deptno;

-- 笛卡尔积
SELECT * FROM emp e,emp m;

SELECT * FROM emp e,emp m WHERE e.mgr = m.empno;

SELECT e.ename,m.ename FROM emp e,emp m WHERE e.mgr = m.empno;

-- 自连接 + 外连接
SELECT e.ename,m.ename FROM emp e LEFT OUTER JOIN emp m ON e.mgr = m.empno;

SELECT * FROM emp;


-- ---------------------------子查询-------------------
-- 将一条SQL查询出来的结果作为另一条SQL的查询条件来使用
-- 一条SQL中包含另一条SQL   SQL嵌套
-- 找出工资比 allen 高的员工的姓名及其工资
-- 思路：先找出Allen的工资是多少，然后用其他人的工资与他的工资进行比较
SELECT sal FROM emp WHERE ename = &#39;allen&#39;;

SELECT ename,sal FROM emp WHERE sal &gt; Allen的;

SELECT ename,sal FROM emp WHERE sal &gt; (SELECT sal FROM emp WHERE ename = &#39;allen&#39;);


-- 练习：找出与ford同部门的员工
-- 先找出ford在哪个部门
SELECT deptno FROM emp WHERE ename = &#39;ford&#39;;

SELECT ename FROM emp WHERE deptno = ford的部门号

SELECT ename FROM emp WHERE deptno = (SELECT deptno FROM emp WHERE ename = &#39;ford&#39;);


-- 练习：找出比所有员工平均薪资高的员工姓名及薪资
-- 找出比公司平均工资高的员工

SELECT ename,sal FROM emp WHERE sal &gt; (SELECT AVG(sal) FROM emp);


-- 找出工资最高员工的姓名及薪资
SELECT ename,sal FROM emp WHERE sal = (SELECT MAX(sal) FROM emp);

-- 找出每个部门中薪资最高的是谁

-- 找出每个部门最高的薪资是多少
SELECT MAX(sal) FROM emp GROUP BY deptno;

-- 在MySQL可以查询出来的结果当做一张表来使用

(SELECT MAX(sal) FROM emp GROUP BY deptno) AS sal_table;  -- 将查询出来的结果当做sal_table表

SELECT * FROM sal_table;

SELECT e.ename,e.sal FROM emp e,((SELECT MAX(sal) sal FROM emp GROUP BY deptno) AS sal_table)  WHERE e.sal = sal_table.sal;



SELECT * FROM emp;

















-- 先查询出每个部门的最高薪资是多少，然后用所用员工的薪资与这些薪资进行比较，如果一样则是对应部门中最高
-- 薪资的人

-- 先查询出每个部门的最高薪资，然后将结果当做最高薪资表  通过as进行取名
SELECT * FROM (SELECT MAX(sal) sal,deptno FROM emp GROUP BY deptno) AS m_sal;  -- 最高工资表

-- 用员工表与最高工资表进行连表查询
SELECT e.ename,e.sal FROM emp e,最高工资表 WHERE e.sal = 最高工资;


-- 除了判断薪资是否一样还得判断部门是否一样  因为存在不同部门但薪资一样的情况
SELECT e.ename,e.sal 
FROM 
emp e,(SELECT MAX(sal) sal,deptno FROM emp GROUP BY deptno) AS m_sal 
WHERE e.sal = m_sal.sal AND e.deptno = m_sal.deptno;


-- AS     作为，可以将查询出来的结果作为一张表、视图来使用
-- 查询出所有员工的姓名及其所在工作的城市
-- 将查询出来的结果当做一张临时表使用
(SELECT ename,loc FROM emp,dept WHERE emp.deptno = dept.deptno) AS e_loc;

-- 将查询出来的结果生成一张真实存在的表
-- 通过将子查询的结果创建一张表
CREATE TABLE e_loc (SELECT ename,loc FROM emp,dept WHERE emp.deptno = dept.deptno);

SELECT * FROM e_loc;

SHOW TABLES;




-- 查询出每个部门中工资最高的员工
CREATE TABLE e_m_table (SELECT e.ename,e.sal 
FROM 
emp e,(SELECT MAX(sal) sal,deptno FROM emp GROUP BY deptno) AS m_sal 
WHERE e.sal = m_sal.sal AND e.deptno = m_sal.deptno);



-- 为了简化SQL语句，可以通过视图的方式来进行简化

-- 创建视图
-- create view 视图名字 as SQL语句;   SQL语句通常情况是select语句
CREATE TABLE e_loc (SELECT ename,loc FROM emp,dept WHERE emp.deptno = dept.deptno);

SELECT * FROM e_loc;

SELECT * FROM dept;

UPDATE dept SET loc = &#39;chengdu&#39; WHERE deptno = 10;


-- 创建视图
SELECT ename,loc FROM emp,dept WHERE emp.deptno = dept.deptno;

CREATE VIEW emp_dept_view 
AS 
SELECT ename,loc FROM emp,dept WHERE emp.deptno = dept.deptno;

SELECT * FROM emp_dept_view;

-- 可以简单的认为通过视图进行查询其实就是调用了对应的SQL语句


SELECT * FROM dept;


-- 删除视图
DROP VIEW emp_dept_view;


-- 关于视图的增删改操作
-- 通过视图是可以对数据进行增删改的操作，前提条件是该视图只建立在一张表，如果视图是建立在多张表上则不行


CREATE TABLE goodman(
	id INT,
	\`name\` VARCHAR(20)
);
CREATE TABLE badman(
	id INT,
	\`name\` VARCHAR(20),
	gid INT
);
INSERT INTO goodman VALUES(1001,&#39;唐僧&#39;),(1002,&#39;葫芦娃&#39;),(1003,&#39;喜羊羊&#39;);
INSERT INTO badman VALUES(2001,&#39;白骨精&#39;,1001),(2002,&#39;蛇精&#39;,1002),(2003,&#39;灰太狼&#39;,1003);

SELECT * FROM goodman;
SELECT * FROM badman;

-- 创建视图
CREATE VIEW good_view AS SELECT \`name\` FROM goodman;

SELECT * FROM good_view;

-- 可以通过视图更新原表中的数据
UPDATE good_view SET \`name\`=&#39;孙悟空&#39; WHERE \`name\`=&#39;唐僧&#39;;

-- 可以通过视图向表中插入数据
INSERT INTO good_view VALUES(&#39;奥特曼&#39;);

-- 可以通过视图删除数据
DELETE FROM good_view WHERE \`name\` = &#39;奥特曼&#39;;

SELECT * FROM goodman;

-- 创建一个视图建立在两张表上
CREATE VIEW good_bad_view 
AS 
SELECT g.name gname,b.name bname FROM goodman g,badman b WHERE g.id = b.gid;

SELECT * FROM good_bad_view;

INSERT INTO good_bad_view VALUES(&#39;奥特曼&#39;,&#39;小怪兽&#39;);

DELETE FROM good_bad_view WHERE gname = &#39;奥特曼&#39;;


-- 总结视图：最大的作用就是用来简化查询操作的，一般情况下不会用来进行增删改的操作



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>导入用来联系的表</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> dept<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> dept
<span class="token punctuation">(</span>deptno <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>  <span class="token operator">NOT</span> <span class="token boolean">NULL</span>   <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
dname <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">14</span><span class="token punctuation">)</span> <span class="token punctuation">,</span>
loc <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">13</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>deptno<span class="token punctuation">)</span>
 <span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8 <span class="token punctuation">;</span>

<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> emp<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> emp
       <span class="token punctuation">(</span>empno <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>  <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
ename <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
job <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
mgr <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
hiredate <span class="token keyword">DATE</span><span class="token punctuation">,</span>
sal <span class="token keyword">DOUBLE</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
comm <span class="token keyword">DOUBLE</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>empno<span class="token punctuation">)</span><span class="token punctuation">,</span>
deptno <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token keyword">CONSTRAINT</span> fk_deptno <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span><span class="token punctuation">(</span>deptno<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> dept <span class="token punctuation">(</span>deptno<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8<span class="token punctuation">;</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dept <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token string">&#39;ACCOUNTING&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;NEW YORK&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dept <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token string">&#39;RESEARCH&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;DALLAS&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dept <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span><span class="token string">&#39;SALES&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;CHICAGO&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> dept <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">40</span><span class="token punctuation">,</span><span class="token string">&#39;OPERATIONS&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;BOSTON&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">7369</span><span class="token punctuation">,</span><span class="token string">&#39;SMITH&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;CLERK&#39;</span><span class="token punctuation">,</span><span class="token number">7902</span><span class="token punctuation">,</span>STR_TO_DATE<span class="token punctuation">(</span><span class="token string">&#39;17-12-1980&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;%d-%m-%Y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">800</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">7499</span><span class="token punctuation">,</span><span class="token string">&#39;ALLEN&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;SALESMAN&#39;</span><span class="token punctuation">,</span><span class="token number">7698</span><span class="token punctuation">,</span>STR_TO_DATE<span class="token punctuation">(</span><span class="token string">&#39;20-2-1981&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;%d-%m-%Y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">1600</span><span class="token punctuation">,</span><span class="token number">300</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">7521</span><span class="token punctuation">,</span><span class="token string">&#39;WARD&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;SALESMAN&#39;</span><span class="token punctuation">,</span><span class="token number">7698</span><span class="token punctuation">,</span>STR_TO_DATE<span class="token punctuation">(</span><span class="token string">&#39;22-2-1981&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;%d-%m-%Y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">1250</span><span class="token punctuation">,</span><span class="token number">500</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">7566</span><span class="token punctuation">,</span><span class="token string">&#39;JONES&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;MANAGER&#39;</span><span class="token punctuation">,</span><span class="token number">7839</span><span class="token punctuation">,</span>STR_TO_DATE<span class="token punctuation">(</span><span class="token string">&#39;2-4-1981&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;%d-%m-%Y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">2975</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">7654</span><span class="token punctuation">,</span><span class="token string">&#39;MARTIN&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;SALESMAN&#39;</span><span class="token punctuation">,</span><span class="token number">7698</span><span class="token punctuation">,</span>STR_TO_DATE<span class="token punctuation">(</span><span class="token string">&#39;28-9-1981&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;%d-%m-%Y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">1250</span><span class="token punctuation">,</span><span class="token number">1400</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">7698</span><span class="token punctuation">,</span><span class="token string">&#39;BLAKE&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;MANAGER&#39;</span><span class="token punctuation">,</span><span class="token number">7839</span><span class="token punctuation">,</span>STR_TO_DATE<span class="token punctuation">(</span><span class="token string">&#39;1-5-1981&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;%d-%m-%Y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">2850</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">7782</span><span class="token punctuation">,</span><span class="token string">&#39;CLARK&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;MANAGER&#39;</span><span class="token punctuation">,</span><span class="token number">7839</span><span class="token punctuation">,</span>STR_TO_DATE<span class="token punctuation">(</span><span class="token string">&#39;9-6-1981&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;%d-%m-%Y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">2450</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">7788</span><span class="token punctuation">,</span><span class="token string">&#39;SCOTT&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;ANALYST&#39;</span><span class="token punctuation">,</span><span class="token number">7566</span><span class="token punctuation">,</span>STR_TO_DATE<span class="token punctuation">(</span><span class="token string">&#39;13-JUL-87&#39;</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">85</span><span class="token punctuation">,</span><span class="token number">3000</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">7839</span><span class="token punctuation">,</span><span class="token string">&#39;KING&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;PRESIDENT&#39;</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span>STR_TO_DATE<span class="token punctuation">(</span><span class="token string">&#39;17-11-1981&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;%d-%m-%Y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">5000</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">7844</span><span class="token punctuation">,</span><span class="token string">&#39;TURNER&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;SALESMAN&#39;</span><span class="token punctuation">,</span><span class="token number">7698</span><span class="token punctuation">,</span>STR_TO_DATE<span class="token punctuation">(</span><span class="token string">&#39;8-9-1981&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;%d-%m-%Y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">1500</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">7876</span><span class="token punctuation">,</span><span class="token string">&#39;ADAMS&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;CLERK&#39;</span><span class="token punctuation">,</span><span class="token number">7788</span><span class="token punctuation">,</span>STR_TO_DATE<span class="token punctuation">(</span><span class="token string">&#39;13-JUL-87&#39;</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">51</span><span class="token punctuation">,</span><span class="token number">1100</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">7900</span><span class="token punctuation">,</span><span class="token string">&#39;JAMES&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;CLERK&#39;</span><span class="token punctuation">,</span><span class="token number">7698</span><span class="token punctuation">,</span>STR_TO_DATE<span class="token punctuation">(</span><span class="token string">&#39;3-12-1981&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;%d-%m-%Y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">950</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">7902</span><span class="token punctuation">,</span><span class="token string">&#39;FORD&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;ANALYST&#39;</span><span class="token punctuation">,</span><span class="token number">7566</span><span class="token punctuation">,</span>STR_TO_DATE<span class="token punctuation">(</span><span class="token string">&#39;3-12-1981&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;%d-%m-%Y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">3000</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> emp <span class="token keyword">VALUES</span>
<span class="token punctuation">(</span><span class="token number">7934</span><span class="token punctuation">,</span><span class="token string">&#39;MILLER&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;CLERK&#39;</span><span class="token punctuation">,</span><span class="token number">7782</span><span class="token punctuation">,</span>STR_TO_DATE<span class="token punctuation">(</span><span class="token string">&#39;23-1-1982&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;%d-%m-%Y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">1300</span><span class="token punctuation">,</span><span class="token boolean">NULL</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> bonus<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> bonus
<span class="token punctuation">(</span>
ename <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">,</span>
job <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">)</span>  <span class="token punctuation">,</span>
sal <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
comm <span class="token keyword">DECIMAL</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8<span class="token punctuation">;</span>

<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> salgrade<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> salgrade
      <span class="token punctuation">(</span> grade <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
losal <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
hisal <span class="token keyword">INT</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">INNODB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8<span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> salgrade <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">700</span><span class="token punctuation">,</span><span class="token number">1200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> salgrade <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1201</span><span class="token punctuation">,</span><span class="token number">1400</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> salgrade <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">1401</span><span class="token punctuation">,</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> salgrade <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">2001</span><span class="token punctuation">,</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> salgrade <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">3001</span><span class="token punctuation">,</span><span class="token number">9999</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">COMMIT</span><span class="token punctuation">;</span>


<span class="token keyword">SHOW</span> <span class="token keyword">TABLES</span><span class="token punctuation">;</span>  <span class="token comment">-- 查看表</span>
<span class="token comment">-- bonus   奖金，记录员工的奖金</span>
<span class="token comment">--    	ename  	员工名</span>
<span class="token comment">-- 	job	职位</span>
<span class="token comment">-- 	sal	薪资</span>
<span class="token comment">-- 	comm	提成</span>

<span class="token comment">-- dept    部门表</span>
<span class="token comment">-- 	deptno	部门编号</span>
<span class="token comment">-- 	dname	部门名</span>
<span class="token comment">-- 	loc	部门所在城市</span>

<span class="token comment">-- emp	   员工表</span>
<span class="token comment">-- 	empno	员工号</span>
<span class="token comment">-- 	ename	员工名</span>
<span class="token comment">-- 	job	岗位</span>
<span class="token comment">-- 	mgr	当前员工的领导的工号</span>
<span class="token comment">-- 	hiredate	入职日期</span>
<span class="token comment">-- 	sal	薪资</span>
<span class="token comment">-- 	comm	提成</span>
<span class="token comment">-- 	deptno	所在部门的编号</span>

<span class="token comment">-- salgrade	薪资等级表</span>
<span class="token comment">-- 	grade	工资等级</span>
<span class="token comment">-- 	losal	该等级的最低薪资</span>
<span class="token comment">-- 	hisal	该等级的最高工资</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql的安装" tabindex="-1"><a class="header-anchor" href="#mysql的安装" aria-hidden="true">#</a> MYSQL的安装</h2><p>１、打开下载的mysql安装文件,双击运行mysql-5.5.40-win32.msi。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image001.jpg" alt="img"></p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image002.jpg" alt="img"></p><p>２、选择安装类型，有“Typical（默认）”、“Complete（完全）”、“Custom（用户自定义）”三个选项，选择“Custom”，按“next”键继续。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image003.jpg" alt="img"></p><p>３、在“Developer Components（开发者部分）”上左键单击，选择“This feature,</p><p>and all subfeatures, will be installed on local hard drive.”，即“此部分，及下属子部分内容，全部安装在本地硬盘上”。在上面的“MySQL Server（mysql服务器）”、“Client Programs（mysql客户端程序）”、“Documentation（文档）”也如此操作，以保证安装所有文件。点选“Change...”，手动指定安装目录。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image004.jpg" alt="img"></p><p>4、填上安装目录，我的是 “E:\\software\\install\\mysql\\”，也建议不要放在与操作系统同一分区，这样可以防止系统备份还原的时候，数据被清空。按“OK”继续。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image005.jpg" alt="img"></p><p>确认一下先前的设置，如果有误，按“Back”返回重做。按“Install”开始安装。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image006.jpg" alt="img"></p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image007.jpg" alt="img"></p><p>５、正在安装中，请稍候，安装完成后会出现成功界面，点击成功“next”之后，出现以下界面。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image008.jpg" alt="img"></p><p>这里询问是否继续配置MySQL数据的参数，勾选上，然后点击“Finish”</p><h3 id="mysql的配置" tabindex="-1"><a class="header-anchor" href="#mysql的配置" aria-hidden="true">#</a> MYSQL的配置</h3><p>１、安装完成了，出现如下界面将进入mysql配置向导。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image009.jpg" alt="img"></p><p>２、选择配置方式，“Detailed Configuration（手动精确配置）”、“Standard Configuration（标准配置）”，我们选择“Detailed Configuration”，方便熟悉配置过程。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image010.jpg" alt="img"></p><p>３、选择服务器类型，“Developer Machine（开发测试类，mysql占用很少资源）”、“Server Machine（服务器类型，mysql占用较多资源）”、“Dedicated MySQL Server Machine（专门的数据库服务器，mysql占用所有可用资源）”</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image011.jpg" alt="img"></p><p>４、选择mysql数据库的大致用途，“Multifunctional Database（通用多功能型，好）”、“Transactional Database Only（服务器类型，专注于事务处理，一般）”、“Non-Transactional Database Only（非事务处理型，较简单，主要做一些监控、记数用，对MyISAM数据类型的支持仅限于non-transactional），按“Next”继续。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image012.jpg" alt="img"></p><p>５、选择网站并发连接数，同时连接的数目，“Decision Support(DSS)/OLAP（20个左右）”、“Online Transaction Processing(OLTP)（500个左右）”、“Manual Setting（手动设置，自己输一个数）”。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image013.jpg" alt="img"></p><p>６、是否启用TCP/IP连接，设定端口，如果不启用，就只能在自己的机器上访问mysql数据库了，在这个页面上，您还可以选择“启用标准模式”（Enable Strict Mode），这样MySQL就不会允许细小的语法错误。如果是新手，建议您取消标准模式以减少麻烦。但熟悉MySQL以后，尽量使用标准模式，因为它可以降低有害数据进入数据库的可能性。按“Next”继续</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image014.jpg" alt="img"></p><p>７、就是对mysql默认数据库语言编码进行设置（重要），一般选UTF-8，按 “Next”继续。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image015.jpg" alt="img"></p><p>８、选择是否将mysql安装为windows服务，还可以指定Service Name（服务标识名称），是否将mysql的bin目录加入到Windows PATH（加入后，就可以直接使用bin下的文件，而不用指出目录名，比如连接，“mysql.exe -uusername -ppassword;”就可以了，不用指出mysql.exe的完整地址，很方便），我这里全部打上了勾，Service Name不变。按“Next”继续。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image016.jpg" alt="img"></p><p>９、询问是否要修改默认root用户（超级管理）的密码。“Enable root access from remote machines（是否允许root用户在其它的机器上登陆，如果要安全，就不要勾上，如果要方便，就勾上它）”。最后“Create An Anonymous Account（新建一个匿名用户，匿名用户可以连接数据库，不能操作数据，包括查询）”，一般就不用勾了，设置完毕，按“Next”继续。</p><p>用户名和密码统一设置成：</p><p>用户名:root</p><p>用户密码：root</p><p>１０、确认设置无误，按“Execute”使设置生效，即完成MYSQL的安装和配置。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image017.jpg" alt="img"></p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image018.jpg" alt="img"></p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/clip_image019.jpg" alt="img"></p><p>MySQL安装图解</p><p>一、MYSQL的安装 １、打开下载的mysql安装文件,双击运行mysql-5.5.40-win32.msi。</p><p>２、选择安装类型，有“Typical（默认）”、“Complete（完全）”、“Custom（用户自定义）”三个选项，选择“Custom”，按“next”键继续。</p><p>３、在“Developer Components（开发者部分）”上左键单击，选择“This feature, and all subfeatures, will be installed on local hard drive.”，即“此部分，及下属子部分内容，全部安装在本地硬盘上”。在上面的“MySQL Server（mysql服务器）”、“Client Programs（mysql客户端程序）”、“Documentation（文档）”也如此操作，以保证安装所有文件。点选“Change...”，手动指定安装目录。</p><p>4、填上安装目录，我的是 “E:\\software\\install\\mysql\\”，也建议不要放在与操作系统同一分区，这样可以防止系统备份还原的时候，数据被清空。按“OK”继续。</p><p>确认一下先前的设置，如果有误，按“Back”返回重做。按“Install”开始安装。</p><p>５、正在安装中，请稍候，安装完成后会出现成功界面，点击成功“next”之后，出现以下界面。</p><p>这里询问是否继续配置MySQL数据的参数，勾选上，然后点击“Finish”</p><p>二、MYSQL的配置 １、安装完成了，出现如下界面将进入mysql配置向导。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101343609.png" alt="image-20220225101343609"></p><p>２、选择配置方式，“Detailed Configuration（手动精确配置）”、“Standard Configuration（标准配置）”，我们选择“Detailed Configuration”，方便熟悉配置过程。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101417882.png" alt="image-20220225101417882"></p><p>３、选择服务器类型，“Developer Machine（开发测试类，mysql占用很少资源）”、“Server Machine（服务器类型，mysql占用较多资源）”、“Dedicated MySQL Server Machine（专门的数据库服务器，mysql占用所有可用资源）”</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101431398.png" alt="image-20220225101431398"></p><p>４、选择mysql数据库的大致用途，“Multifunctional Database（通用多功能型，好）”、“Transactional Database Only（服务器类型，专注于事务处理，一般）”、“Non-Transactional Database Only（非事务处理型，较简单，主要做一些监控、记数用，对MyISAM数据类型的支持仅限于non-transactional），按“Next”继续。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101446981.png" alt="image-20220225101446981"></p><p>５、选择网站并发连接数，同时连接的数目，“Decision Support(DSS)/OLAP（20个左右）”、“Online Transaction Processing(OLTP)（500个左右）”、“Manual Setting（手动设置，自己输一个数）”。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101511161.png" alt="image-20220225101511161"></p><p>６、是否启用TCP/IP连接，设定端口，如果不启用，就只能在自己的机器上访问mysql数据库了，在这个页面上，您还可以选择“启用标准模式”（Enable Strict Mode），这样MySQL就不会允许细小的语法错误。如果是新手，建议您取消标准模式以减少麻烦。但熟悉MySQL以后，尽量使用标准模式，因为它可以降低有害数据进入数据库的可能性。按“Next”继续</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101526903.png" alt="image-20220225101526903"></p><p>７、就是对mysql默认数据库语言编码进行设置（重要），一般选UTF-8，按 “Next”继续。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101541427.png" alt="image-20220225101541427"></p><p>８、选择是否将mysql安装为windows服务，还可以指定Service Name（服务标识名称），是否将mysql的bin目录加入到Windows PATH（加入后，就可以直接使用bin下的文件，而不用指出目录名，比如连接，“mysql.exe -uusername -ppassword;”就可以了，不用指出mysql.exe的完整地址，很方便），我这里全部打上了勾，Service Name不变。按“Next”继续。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101555313.png" alt="image-20220225101555313"></p><p>９、询问是否要修改默认root用户（超级管理）的密码。“Enable root access from remote machines（是否允许root用户在其它的机器上登陆，如果要安全，就不要勾上，如果要方便，就勾上它）”。最后“Create An Anonymous Account（新建一个匿名用户，匿名用户可以连接数据库，不能操作数据，包括查询）”，一般就不用勾了，设置完毕，按“Next”继续。 用户名和密码统一设置成： 用户名:root 用户密码：root</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101630281.png" alt="image-20220225101630281"></p><p>10、确认设置无误，按“Execute”使设置生效，即完成MYSQL的安装和配置。</p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101645518.png" alt="image-20220225101645518"></p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220225101658952.png" alt="image-20220225101658952"></p><p>注意：设置完毕，按“Finish”后有一个比较常见的错误，就是不能“Start service”，一般出现在以前有安装mysql的服务器上，解决的办法，先保证以前安装的mysql服务器彻底卸载掉了；不行的话，检查是否按上面一步所说，之前的密码是否有修改，照上面的操作；如果依然不行，将mysql安装目录下的data文件夹备份，然后删除，在安装完成后，将安装生成的 data文件夹删除，备份的data文件夹移回来，再重启mysql服务就可以了，这种情况下，可能需要将数据库检查一下，然后修复一次，防止数据出错。</p>`,88);function N(O,h){const a=c("ExternalLinkIcon");return l(),i("div",null,[d,n("table",null,[u,n("tbody",null,[r,m,k,v,n("tr",null,[n("td",null,[s("SELECT * FROM zhangsan INNER JOIN lisi ON "),n("a",b,[s("zhangsan.name"),e(a)]),s(" = "),n("a",E,[s("lisi.name"),e(a)]),s(";")]),y]),T,w,R,g,S,L])]),A])}const M=t(o,[["render",N],["__file","day22 数据库.html.vue"]]);export{M as default};
