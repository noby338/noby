import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e}from"./app.b62a36f4.js";const t={},i=e(`<h2 id="约束" tabindex="-1"><a class="header-anchor" href="#约束" aria-hidden="true">#</a> 约束</h2><ul><li>定义：限制表中的数据，保证添加到数据表中的数据准确和可靠性！凡是不符合约束的数据，插入时就会失败！ <ul><li>如：性别字段只有男和女，年龄只有正整数；</li></ul></li><li>约束条件在创建表时可以使用， 也可以修改表的时候添加约束条件</li><li>MySQL中的6大约束： <ul><li>默认值约束：可以给字段设置默认值，如果在插入数据时不给该字段赋值，那么就采用默认值</li><li>非空约束：字段的值不能是null(可以没值)</li><li>唯一约束：字段的值是唯一的，该字段不能出现重复的数据</li><li>主键约束：非空+唯一，一般一张表只有一个主键</li><li>自增长约束：新插入的数据的值是在前一条数据的基础上自增而来的</li><li>外键约束：B表中的某个字段的值收到A表某个字段的值的约束</li></ul></li></ul><h3 id="默认值约束" tabindex="-1"><a class="header-anchor" href="#默认值约束" aria-hidden="true">#</a> 默认值约束</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 1、默认值约束：
create table \`user\`(
    id int,
    \`name\` varchar(20),
    gender varchar(20) default &#39;女&#39;
);
insert into \`user\` VALUES(1,&#39;令狐冲&#39;,&#39;男&#39;);
insert into \`user\` (id,\`name\`)VALUE(2,&#39;岳灵珊&#39;);-- 当未填写该字段时，该值使用默认值
insert into \`user\` VALUES(3,&#39;林黛玉&#39;,default);-- 当该字段填写默认值时，使用默认值
select * from \`user\`;


alter table \`user\` modify hoby varchar(20) default &#39;nohoby&#39;;-- 给字段添加默认值约束
desc \`user\`;
alter table \`user\` modify hoby VARCHAR(20);-- 删除默认值约束
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="非空约束" tabindex="-1"><a class="header-anchor" href="#非空约束" aria-hidden="true">#</a> 非空约束</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 2、非空约束
drop table if exists \`user\`;
create table \`user\`(
    id int,
    \`name\` varchar(20) not null, -- 非null
    gender varchar(20) default &#39;女&#39;
);
insert into \`user\` VALUES(1,null,&#39;男&#39;); -- 不可以为null
insert into \`user\` VALUES(2,&#39;&#39;,&#39;男&#39;); -- 可以为&#39;&#39;

alter table \`user\` modify hoby varchar(20) not null; -- 添加not null的字段约束
alter table \`user\` modify hoby varchar(20);-- 删除约束
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="唯一约束" tabindex="-1"><a class="header-anchor" href="#唯一约束" aria-hidden="true">#</a> 唯一约束</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 3、唯一约束
drop table if exists \`user\`;
create table \`user\`(
    id int unique, -- 唯一
    \`name\` varchar(20) not null,
    gender varchar(20) default &#39;女&#39;
);
insert into \`user\` VALUES(1,&#39;令狐冲&#39;,&#39;男&#39;);
insert into \`user\` VALUES(1,&#39;岳灵珊&#39;,&#39;女&#39;);-- 将不能添加已存在的id(该字段设置了唯一约束)
SELECT * from \`user\`;

alter table \`user\` modify id int unique; -- 添加unique的字段约束
alter table \`user\` drop index id;-- 删除唯一约束
desc \`user\`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="主键约束" tabindex="-1"><a class="header-anchor" href="#主键约束" aria-hidden="true">#</a> 主键约束</h3><ul><li>主键约束 = 非空 + 唯一</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 4、主键约束：通常加在int类型的字段上(id)，一般表都有主键
drop table if exists \`user\`;
create table \`user\`(
    id int primary key, -- 主键
    \`name\` varchar(20) not null,
    gender varchar(20) default &#39;女&#39;
);
desc \`user\`;
insert into \`user\` VALUES(1,&#39;令狐冲&#39;,&#39;男&#39;);
insert into \`user\` VALUES(1,&#39;岳灵珊&#39;,&#39;女&#39;);-- 将不能添加已存在的id(该字段设置了主键约束)
insert into \`user\` VALUES(null,&#39;岳不群&#39;,&#39;男&#39;);-- 将不能添加null值的id(该字段设置了主键约束)

alter table \`user\` modify id int primary key; -- 添加primary key的字段约束
alter table \`user\` drop primary key;-- 删除主键约束
alter table \`user\` modify id int;-- 删除null约束
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>联合主键</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 联合主键：将多个字段设置为一个主键</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> teacher<span class="token punctuation">(</span><span class="token comment">-- 记录每位老师不同班级学科成绩</span>
    tid <span class="token keyword">INT</span><span class="token punctuation">,</span> <span class="token comment">-- 工号</span>
	cid <span class="token keyword">INT</span><span class="token punctuation">,</span> <span class="token comment">-- 班级编号</span>
	grade <span class="token keyword">INT</span><span class="token punctuation">,</span>  <span class="token comment">-- 学科成绩</span>
	<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">(</span>tid<span class="token punctuation">,</span>cid<span class="token punctuation">)</span>  <span class="token comment">-- 联合主键</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">insert</span> <span class="token keyword">into</span> teacher <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1001</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">80</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> teacher <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1001</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> teacher <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1001</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">-- 不能插入相同的联合主键</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> teacher<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="自增长约束" tabindex="-1"><a class="header-anchor" href="#自增长约束" aria-hidden="true">#</a> 自增长约束</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 5、自增长约束
drop table if exists \`user\`;
create table \`user\`(
    id int primary key AUTO_INCREMENT, -- 主键约束、自增长约束
    \`name\` varchar(20) not null,
    gender varchar(20) default &#39;女&#39;
)AUTO_INCREMENT = 100;-- 设置自增长的起始值为100
desc \`user\`;
insert into \`user\` VALUES(1001,&#39;令狐冲&#39;,&#39;男&#39;);
insert into \`user\` (\`name\`,gender) VALUE(&#39;岳灵珊&#39;,&#39;女&#39;);-- 自增长约束在插入字段值时可根据最大值记录自动增加1
insert into \`user\` VALUES(default,&#39;岳不群&#39;,&#39;男&#39;);-- 可以填入default，如果第一条记录的di字段值设置为default，则id为默认起始值。
SELECT * FROM \`user\`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="外键约束" tabindex="-1"><a class="header-anchor" href="#外键约束" aria-hidden="true">#</a> 外键约束</h3><ul><li>当表中的默认字段的值受到另外一张表中字段值限制时则可以使用外键约束避免数据问题。</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 6、外键约束
drop table if exists \`user\`;
create table \`user\`(-- 用户表
    id int primary key AUTO_INCREMENT, -- 主键约束、自增长约束
    \`name\` varchar(20) not null,
    gender varchar(20) default &#39;女&#39;
)AUTO_INCREMENT = 100;-- 设置自增长的起始值为100
desc \`user\`;
insert into \`user\` VALUES(default,&#39;noyb&#39;,&#39;男&#39;);
insert into \`user\` VALUES(default,&#39;kace&#39;,&#39;男&#39;);
insert into \`user\` VALUES(default,&#39;july&#39;,&#39;男&#39;);
SELECT * FROM \`user\`;

drop table if exists house;
create table house(-- 房屋表
    id int primary key AUTO_INCREMENT, -- 主键约束、自增长约束
    \`address\` varchar(20) not null,
    \`uid\` int, -- 用户id，值必须为用户表中的id值
    foreign key(\`uid\`) REFERENCES \`user\`(id) on update cascade -- 给uid字段添加外键约束，它的值受到user表中的id的约束
    --  on update cascade 当更新父表时同时更新子表
);
desc house; -- mul 外键约束
insert into house VALUES(default,&#39;chengdu&#39;,100);
insert into house VALUES(default,&#39;beijing&#39;,101);
insert into house VALUES(default,&#39;shanghai&#39;,102);
insert into house VALUES(default,&#39;shengzheng&#39;,103);
select * from house;

-- 删除外键数据
-- 删除父表的数据前应该先删除掉子表的数据
DELETE from house where id = 1;
DELETE from \`user\` where id = 100;

-- 更新外键数据
update \`user\` set id = 2 where id = 102;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="事务" tabindex="-1"><a class="header-anchor" href="#事务" aria-hidden="true">#</a> 事务</h2><ul><li>事务的作用：事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行</li></ul><ul><li><p>存储引擎的概念：在mysql中的数据用各种不同的技术存储在文件（或内存）中。这些技术中的每一种技术都使用不同的存储机制，索引技巧，并且最终提供广泛的不同的功能和能力。可以通过选择不同的技术，可以获得额外的速度或功能，从而改善应用的整体功能。这些不同的技术以及配套的相关功能在mysql中被称为存储引擎（也称为表类型）。</p></li><li><p>常见引擎：在mysql中用的最多的存储引擎有：innodb，bdb，myisam ,memory 等。其中innodb和bdb支持事务而myisam等不支持事务。</p><ul><li>指定引擎创建表格：create table 表名(字段......) engine=innodb;</li></ul></li><li><p>事务的4大特性(ACID)：</p><ul><li>原子性( Atomicity)：原子性是指事务是一个不可再分割的工作单位，事务中的操作要么都发生，要么都不发生</li><li>一致性(Consistency)：一致性是指在事务开始之前和事务结束以后，数据库的完整性约束没有被破坏。这是说数据库事务不能破坏关系数据的完整性以及业务逻辑上的一致性。</li><li>隔离性(Isolation)：隔离性是指并发的事务是相互隔离的。即一个事务内部的操作及正在操作的数据必须封锁起来，不被企图进行修改的事务看到 。</li><li>持久性(Durability)：持久性是指在事务完成以后，该事务所对数据库所作的更改便持久的保存在数据库之中，并不会被回滚。 即使出现了任何事故比如断电等，事务一旦提交，则持久化保存在数据库中。</li></ul></li><li><p>事务的控制语句：</p></li></ul><table><thead><tr><th>语句</th><th>解释</th></tr></thead><tbody><tr><td>BEGIN</td><td>显式地开启一个事务</td></tr><tr><td>START TRANSACTION</td><td>显式地开启一个事务</td></tr><tr><td>COMMIT</td><td>提交事务</td></tr><tr><td>ROLLBACK</td><td>回滚事务</td></tr></tbody></table><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 事务：让执行的多条SQL语句同时失败或成功；</span>

<span class="token keyword">show</span> engines<span class="token punctuation">;</span><span class="token comment">-- 显示引擎</span>

<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">from</span> boy<span class="token punctuation">;</span>
<span class="token keyword">delete</span> <span class="token keyword">from</span> boy <span class="token keyword">WHERE</span> gid <span class="token operator">in</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> boy <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1004</span><span class="token punctuation">,</span><span class="token string">&#39;周杰伦&#39;</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">-- mysql 中如果不提交操作，对表的操作将不会起作用</span>
<span class="token keyword">set</span> autocommit <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span><span class="token comment">-- 设置自动提交关闭(可能会临时存在缓存中，但未提交到数据库中),该设置只设置本次数据库操作(下次打开MySQL自动提交会重新开启)</span>
<span class="token keyword">set</span> autocommit <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span><span class="token comment">-- 设置自动提交开启</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> boy <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1006</span><span class="token punctuation">,</span><span class="token string">&#39;乔丹&#39;</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">commit</span><span class="token punctuation">;</span><span class="token comment">-- 关闭自动提交后可手动提交</span>


<span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> goods<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> goods<span class="token punctuation">(</span>
	id <span class="token keyword">INT</span><span class="token punctuation">,</span>
	<span class="token identifier"><span class="token punctuation">\`</span>name<span class="token punctuation">\`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	num <span class="token keyword">INT</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> goods <span class="token keyword">VALUES</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">&#39;iphone13&#39;</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">&#39;mate40&#39;</span><span class="token punctuation">,</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token string">&#39;宝马520&#39;</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> <span class="token identifier"><span class="token punctuation">\`</span>order<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> <span class="token identifier"><span class="token punctuation">\`</span>order<span class="token punctuation">\`</span></span> <span class="token punctuation">(</span>
    id <span class="token keyword">int</span><span class="token punctuation">,</span>
    gid <span class="token keyword">int</span><span class="token punctuation">,</span>
    num <span class="token keyword">int</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> goods<span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token identifier"><span class="token punctuation">\`</span>order<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>
<span class="token comment">-- 如果在执行某条SQL时出现问题，那就应该回滚 删除缓存数据，不让这些数据生效</span>
<span class="token comment">-- 方式一：通过关闭自动提交后，两条语句执行完后，commit上传</span>
<span class="token keyword">set</span> autocommit <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span><span class="token comment">-- 关闭自动提交</span>
<span class="token comment">-- 业务sql</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> <span class="token identifier"><span class="token punctuation">\`</span>order<span class="token punctuation">\`</span></span> <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">-- 购买iphone13 买了3台</span>
<span class="token keyword">update</span> goods <span class="token keyword">set</span> num <span class="token operator">=</span> num <span class="token operator">-</span> <span class="token number">3</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">commit</span><span class="token punctuation">;</span><span class="token comment">-- 手动提交</span>
<span class="token keyword">set</span> autocommit <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span><span class="token comment">-- 开启自动提交</span>


<span class="token comment">-- 方式二：</span>
<span class="token keyword">begin</span><span class="token punctuation">;</span><span class="token comment">-- 手动开启事务</span>
<span class="token comment">-- 业务sql</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> <span class="token identifier"><span class="token punctuation">\`</span>order<span class="token punctuation">\`</span></span> <span class="token keyword">values</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">-- 购买3台iphone13，写入一条订单记录</span>
<span class="token keyword">update</span> goods <span class="token keyword">set</span> num <span class="token operator">=</span> num <span class="token operator">-</span> <span class="token number">3</span> <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span><span class="token comment">-- 修改商品库存</span>
<span class="token keyword">commit</span><span class="token punctuation">;</span><span class="token comment">-- 如果业务sql不存在问题，则执行该语句(手动提交，写入sql)</span>
<span class="token keyword">rollback</span><span class="token punctuation">;</span><span class="token comment">-- 如果业务sql存在问题，则执行该语句(删除缓存数据，不写入sql)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="索引" tabindex="-1"><a class="header-anchor" href="#索引" aria-hidden="true">#</a> 索引</h2><ul><li>定义：是一种数据库对象，数据库对象是指能够通过create指令创建出来的(database、table、view、index)，索引可以加快搜索速度(增加了b-tree结构)</li><li>以下情况适合添加索引： <ul><li>字段值绝大多数都是不重复的，b-tree结构的构成根据数据的区别排列</li><li>该字段值基本上改动少，当添加新的节点时，b-tree的结构就行需要重构</li></ul></li><li>当一张表不要添加太多索引，索引会消耗大量资源，</li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 索引：是一种数据库对象，数据库对象是指能够通过create指令创建出来的(database、table、view、index)</span>
<span class="token comment">-- 索引可以加快搜索速度</span>



<span class="token comment">-- 创建表</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> book<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> book <span class="token punctuation">(</span>
   id <span class="token keyword">INT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
   <span class="token identifier"><span class="token punctuation">\`</span>name<span class="token punctuation">\`</span></span> <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
   author <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
   detail <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
   price <span class="token keyword">DOUBLE</span><span class="token punctuation">,</span>
   <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>id<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token keyword">ENGINE</span> <span class="token operator">=</span> MYISAM ROW_FORMAT <span class="token operator">=</span> <span class="token keyword">DEFAULT</span><span class="token punctuation">;</span>

<span class="token comment">-- 创建存储过程</span>
<span class="token keyword">DROP</span> <span class="token keyword">PROCEDURE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> BatchInsertBook<span class="token punctuation">;</span>
<span class="token keyword">DELIMITER</span> $
<span class="token keyword">CREATE</span> <span class="token keyword">PROCEDURE</span> BatchInsertBook<span class="token punctuation">(</span><span class="token operator">IN</span> <span class="token keyword">START</span> <span class="token keyword">INT</span><span class="token punctuation">,</span><span class="token operator">IN</span> loop_time <span class="token keyword">INT</span><span class="token punctuation">)</span>
<span class="token keyword">BEGIN</span>
 <span class="token keyword">DECLARE</span> Var <span class="token keyword">INT</span><span class="token punctuation">;</span>
 <span class="token keyword">DECLARE</span> ID <span class="token keyword">INT</span><span class="token punctuation">;</span>
 <span class="token keyword">DECLARE</span> bname <span class="token keyword">VARCHAR</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">SET</span> Var <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
 <span class="token keyword">SET</span> ID<span class="token operator">=</span> <span class="token keyword">START</span><span class="token punctuation">;</span>
      <span class="token keyword">WHILE</span> Var <span class="token operator">&lt;</span> loop_time <span class="token keyword">DO</span>
        <span class="token keyword">SET</span> bname <span class="token operator">=</span> CONCAT<span class="token punctuation">(</span><span class="token string">&#39;java基础入门&#39;</span><span class="token punctuation">,</span>ID<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> book<span class="token punctuation">(</span>id<span class="token punctuation">,</span><span class="token identifier"><span class="token punctuation">\`</span>name<span class="token punctuation">\`</span></span><span class="token punctuation">,</span>author<span class="token punctuation">,</span>detail<span class="token punctuation">,</span>price<span class="token punctuation">)</span> 
		<span class="token keyword">VALUES</span><span class="token punctuation">(</span>ID<span class="token punctuation">,</span>bname<span class="token punctuation">,</span><span class="token string">&#39;zhangsan&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;这本书主要值针对没有Java基础人员的入门教程&#39;</span><span class="token punctuation">,</span><span class="token number">1.23</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">SET</span> ID<span class="token operator">=</span> ID <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
       <span class="token keyword">SET</span> Var <span class="token operator">=</span> Var <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token keyword">END</span> <span class="token keyword">WHILE</span><span class="token punctuation">;</span>
<span class="token keyword">END</span> $

<span class="token comment">-- 禁用索引，加快数据导入速度</span>
<span class="token keyword">ALTER</span>  <span class="token keyword">TABLE</span>  book  <span class="token keyword">DISABLE</span>  <span class="token keyword">KEYS</span><span class="token punctuation">;</span>

<span class="token comment">-- 调用存储过程导入200W条数据</span>
<span class="token keyword">CALL</span> BatchInsertBook<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">500000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 添加索引</span>
<span class="token keyword">ALTER</span>  <span class="token keyword">TABLE</span>  book  <span class="token keyword">ENABLE</span>  <span class="token keyword">KEYS</span><span class="token punctuation">;</span>

<span class="token comment">-- 修改表的引擎为InnoDB</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> book <span class="token keyword">ENGINE</span> <span class="token keyword">INNODB</span><span class="token punctuation">;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="表的设计三范式" tabindex="-1"><a class="header-anchor" href="#表的设计三范式" aria-hidden="true">#</a> 表的设计三范式</h2><ul><li>定义：在对数据库进行设计时为了方便后期代码业务的实现，通常会在设计数据库时遵守一些规范，这些规范称之为范式。</li></ul><h3 id="第一范式" tabindex="-1"><a class="header-anchor" href="#第一范式" aria-hidden="true">#</a> 第一范式</h3><ul><li>数据表的列不可再分。</li><li>例如：下表中的选课字段可以再分为对应的学科，所以不满足第一范式</li></ul><table><thead><tr><th>*<em>学号</em></th><th>*<em>姓名</em></th><th><strong>选课</strong></th></tr></thead><tbody><tr><td>10001</td><td>张三</td><td>数学，语文，英语</td></tr><tr><td>10002</td><td>李四</td><td>语文，英语</td></tr><tr><td>10003</td><td>王五</td><td>语文，英语，历史</td></tr></tbody></table><h3 id="第二范式" tabindex="-1"><a class="header-anchor" href="#第二范式" aria-hidden="true">#</a> 第二范式</h3><ul><li>满足第一范式的前提下，并且表中非主键列不存在对主键的部分依赖。</li><li>例如：下表中，学号和课程构成联合主键，成绩同时依赖于学号和课程，但课程学分只依赖于课程(课程是主键的一部分)</li></ul><table><thead><tr><th>学号</th><th>课程</th><th>成绩</th><th>课程学分</th></tr></thead><tbody><tr><td>10001</td><td>数学</td><td>100</td><td>6</td></tr><tr><td>10001</td><td>语文</td><td>90</td><td>2</td></tr><tr><td>10001</td><td>英语</td><td>85</td><td>3</td></tr><tr><td>10002</td><td>数学</td><td>90</td><td>6</td></tr><tr><td>10003</td><td>数学</td><td>99</td><td>6</td></tr><tr><td>10004</td><td>语文</td><td>89</td><td>2</td></tr></tbody></table><p>如需满足第二范式，需将表拆分：</p><p>学生选课表：</p><table><thead><tr><th>*<em>学号</em></th><th>*<em>课程</em></th><th><strong>成绩</strong></th></tr></thead><tbody><tr><td>10001</td><td>数学</td><td>100</td></tr><tr><td>10001</td><td>语文</td><td>90</td></tr><tr><td>10001</td><td>英语</td><td>85</td></tr><tr><td>10002</td><td>数学</td><td>90</td></tr><tr><td>10003</td><td>数学</td><td>99</td></tr><tr><td>10004</td><td>语文</td><td>89</td></tr></tbody></table><p>课程信息表：</p><table><thead><tr><th>*<em>课程</em></th><th><strong>课程学分</strong></th></tr></thead><tbody><tr><td>数学</td><td>6</td></tr><tr><td>语文</td><td>3</td></tr><tr><td>英语</td><td>2</td></tr></tbody></table><h3 id="第三范式" tabindex="-1"><a class="header-anchor" href="#第三范式" aria-hidden="true">#</a> 第三范式</h3><ul><li>满足第二范式的同时，表中的列不存在对非主键列的传递依赖。</li><li>例如：下面的学生信息表，虽然满足第二范式，所有字段都依赖主键（学号），但是，表中存在一个传递依赖，(学号）-&gt;(班级）-&gt;（班主任）。也就是说，（班主任）这个非主键列依赖于另外一个非主键列 （班级）。所以不符号第三范式。</li></ul><table><thead><tr><th>*<em>学号</em></th><th>*<em>姓名</em></th><th>*<em>性别</em></th><th>*<em>班级</em></th><th><strong>班主任</strong></th></tr></thead><tbody><tr><td>10001</td><td>张三</td><td>男</td><td>一班</td><td>小王</td></tr><tr><td>10002</td><td>李四</td><td>男</td><td>一班</td><td>小王</td></tr><tr><td>10003</td><td>王五</td><td>男</td><td>二班</td><td>小李</td></tr><tr><td>10004</td><td>张小三</td><td>男</td><td>二班</td><td>小李</td></tr></tbody></table><p>如需满足第三范式，需将表拆分：</p><p>学生信息表：</p><table><thead><tr><th>*<em>学号</em></th><th>*<em>姓名</em></th><th>*<em>性别</em></th><th><strong>班级</strong></th></tr></thead><tbody><tr><td>10001</td><td>张三</td><td>男</td><td>一班</td></tr><tr><td>10002</td><td>李四</td><td>男</td><td>一班</td></tr><tr><td>10003</td><td>王五</td><td>男</td><td>二班</td></tr><tr><td>10004</td><td>张小三</td><td>男</td><td>二班</td></tr></tbody></table><p>班级信息表：</p><table><thead><tr><th>*<em>班级</em></th><th><strong>班主任</strong></th></tr></thead><tbody><tr><td>一班</td><td>小王</td></tr><tr><td>二班</td><td>小李</td></tr></tbody></table>`,46),l=[i];function p(d,o){return s(),a("div",null,l)}const u=n(t,[["render",p],["__file","day27 约束、事务、索引、表的设计三范式.html.vue"]]);export{u as default};
