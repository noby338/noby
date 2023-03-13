import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as p,c as l,b as n,d as s,a as i,e as a,r as c}from"./app.b62a36f4.js";const o={},u=a('<h2 id="覆盖重写" tabindex="-1"><a class="header-anchor" href="#覆盖重写" aria-hidden="true">#</a> 覆盖重写</h2><ul><li>重写的条件： <ol><li>发生在具有继承关系的两个类中</li><li>方法名、参数列表完全与被重写的方法相同。</li><li>子类方法的返回值必须小于等于父类方法的返回值范围。(jdk1.5及以上 支持返回改变为原<em>类型</em>的子类)</li><li>子类抛出的异常范围需小于等于父类</li><li>子类访问修饰符范围需大于等于父类（public&gt;protected&gt;default&gt;private）</li></ol></li></ul><h2 id="重写的重载的区别" tabindex="-1"><a class="header-anchor" href="#重写的重载的区别" aria-hidden="true">#</a> 重写的重载的区别</h2><ul><li>重写：存在继承关系的两个类中，子类对父类的方法重新实现。即函数名和参数都一样，只是函数的实现体不一样。(private 和 final 修饰的方法不可被重写)</li><li>重载：同一个类中，根据参数列表的不同定义多个相同函数名的不同函数，以实现不同的功能</li></ul><h2 id="package" tabindex="-1"><a class="header-anchor" href="#package" aria-hidden="true">#</a> package</h2>',5),d=n("li",null,[n("p",null,"定义：包其实就是一个文件夹，会在同一个包去放相同、类似的代码，对代码进行分门别类的管理、维护")],-1),k={href:"http://xxx.xxx.xxx",target:"_blank",rel:"noopener noreferrer"},r=a("<li><p>规范：</p><ul><li><p>团队项目：</p><ul><li>team.团队名.项目名.模块名.</li><li>com.公司名.项目名.模块名.</li></ul></li><li><p>个人项目：</p><ul><li><p>indi ：</p><p>个体项目，指个人发起，但非自己独自完成的项目，可公开或私有项目，copyright主要属于发起者。</p><p>包名为“indi.发起者名.项目名.模块名.……”。</p></li><li><p>pers ：</p><p>个人项目，指个人发起，独自完成，可分享的项目，copyright主要属于个人。</p><p>包名为“pers.个人名.项目名.模块名.……”。</p></li><li><p>priv ：</p><p>私有项目，指个人发起，独自完成，非公开的私人使用的项目，copyright属于个人。</p><p>包名为“priv.个人名.项目名.模块名.……”。</p></li><li><p>onem ：</p><p>与“indi”相同，推荐使用“indi”。</p></li></ul></li></ul></li>",1),v=a(`<h2 id="java修饰符" tabindex="-1"><a class="header-anchor" href="#java修饰符" aria-hidden="true">#</a> java修饰符</h2><h3 id="访问修饰符" tabindex="-1"><a class="header-anchor" href="#访问修饰符" aria-hidden="true">#</a> 访问修饰符</h3><ul><li>定义：在java中，对类、属性、方法有不同级别的访问控制权限的修饰符</li><li>注意： 访问修饰符可以修饰 类、接口、成员变量、成员方法，但是protected和private不可以修饰外部类和接口</li></ul><table><thead><tr><th>访问权限</th><th>同一个类</th><th>同一个包</th><th>不同包子类</th><th>不同包非子类</th></tr></thead><tbody><tr><td>public</td><td>是</td><td>是</td><td>是</td><td>是</td></tr><tr><td>protected</td><td>是</td><td>是</td><td>是</td><td>否</td></tr><tr><td>default</td><td>是</td><td>是</td><td>否</td><td>否</td></tr><tr><td>private</td><td>是</td><td>否</td><td>否</td><td>否</td></tr></tbody></table><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">priv<span class="token punctuation">.</span>noby<span class="token punctuation">.</span>b</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">priv<span class="token punctuation">.</span>noby<span class="token punctuation">.</span>a<span class="token punctuation">.</span></span><span class="token class-name">Fu</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Zi</span> <span class="token keyword">extends</span> <span class="token class-name">Fu</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Zi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        new Fu().show();//报错</span>
        <span class="token comment">//在子类中，子类实例可以访问其从父类继承而来的 protected 方法，而不能访问父类实例的protected方法</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">priv<span class="token punctuation">.</span>noby<span class="token punctuation">.</span>a</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Fu</span> <span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="非访问修饰符" tabindex="-1"><a class="header-anchor" href="#非访问修饰符" aria-hidden="true">#</a> 非访问修饰符</h3><h4 id="final修饰符" tabindex="-1"><a class="header-anchor" href="#final修饰符" aria-hidden="true">#</a> final修饰符</h4><ol><li>用来修饰一个变量 <ol><li>如果变量为基本数据类型，则该引用为常量，该值无法修改；</li><li>如果变量为引用数据类型，比如对象、数组，则该对象、数组本身可以修改，但指向该对象或数组的地址的引用不能修改。</li><li>如果变量为局部变量，则在第一次赋值有效。</li><li>如果变量为成员变量，则必须当场赋值，否则编译会报错。</li></ol></li><li>当使用final修饰方法时，这个方法将成为最终方法，无法被子类重写。但是，该方法仍然可以被继承。</li><li>当用final修饰类时，该类成为最终类，无法被继承。简称为“断子绝孙类”。</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">note</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FinalNote</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//region final修饰基本数据类型</span>
        <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">NUM</span><span class="token punctuation">;</span><span class="token comment">//final修饰的变量一般为大写(该变量变为常量)</span>
        <span class="token constant">NUM</span> <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span><span class="token comment">//final常量只有第一次赋值才会成功</span>
<span class="token comment">//        NUM = 2;//final常量的初值不能被改变</span>
        <span class="token comment">//endregion</span>

        <span class="token comment">//region final修饰引用数据类型</span>
        <span class="token keyword">final</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> names <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">//        names = new String[4];//final修饰的引用数据类型其引用不可更改</span>
        names<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;noby&quot;</span><span class="token punctuation">;</span>
        names<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;kace&quot;</span><span class="token punctuation">;</span><span class="token comment">//引用里面的数据可以更改</span>
        <span class="token comment">//endregion</span>
        <span class="token class-name">Teacher</span> t <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Teacher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t<span class="token punctuation">.</span><span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//仍然可以使用父类的方法(可以继承)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
<span class="token comment">//    private final String name;//final修饰的成员变量必须赋初值</span>
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">say</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;说....&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
<span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Teacher</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token comment">//1. final修饰的方法不能被重写，但此方法仍然被继承</span>
    <span class="token comment">/*@Override
    public void say() {
        System.out.println(&quot;老师在一本正经的说...&quot;);
    }*/</span>
<span class="token punctuation">}</span>

<span class="token comment">//class EnglishTeacher extends Teacher {}//final修饰的类不能被继承</span>



</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="static修饰符" tabindex="-1"><a class="header-anchor" href="#static修饰符" aria-hidden="true">#</a> static修饰符</h4><ul><li>修饰成员变量：该属性属于类</li><li>修饰成员方法：该方法通过类调用</li><li>可修饰内部类：静态内部类</li><li>代码块：静态代码块</li><li>导入某指定静态资源：import static 这两个关键字连用可以指定导入某个类中的指定静态资源。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">note</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StaticNote</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Circle</span> d <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        d<span class="token punctuation">.</span>r <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token comment">//region 静态属性的值存储在类中，通过类名访问</span>
        <span class="token class-name">Circle</span><span class="token punctuation">.</span>area <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span><span class="token comment">//这里的Circle指的不是类，而是该类的字节码文件对象</span>
        <span class="token comment">//endregion</span>

        <span class="token comment">//region 静态方法通过类名调用</span>
        <span class="token class-name">Circle</span><span class="token punctuation">.</span><span class="token function">getPI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//endregion</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">double</span> <span class="token constant">PI</span> <span class="token operator">=</span> <span class="token number">3.14</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> r<span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token keyword">double</span> area<span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token keyword">void</span> getPI <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//region 静态方法不可以访问非静态属性</span>
<span class="token comment">//        System.out.println(r);</span>
        <span class="token comment">//endregion</span>

        <span class="token comment">//region 静态方法可以访问静态属性</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token constant">PI</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//endregion</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> getr <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//region 成员方法可以访问非静态属性</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//endregion</span>

        <span class="token comment">//region 成员方法可以访问静态属性</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token constant">PI</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//endregion</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代码块" tabindex="-1"><a class="header-anchor" href="#代码块" aria-hidden="true">#</a> 代码块</h2><ul><li>定义：在类中或者方法中,使用{}括起来的一段代码,就称它是代码块。</li></ul><ul><li>静态代码块</li><li>非静态代码块</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">note</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CodeBlockNote</span> <span class="token punctuation">{</span><span class="token comment">//代码块</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">Block</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Block</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Block</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

    <span class="token comment">//region 静态代码块</span>
    <span class="token comment">/*
    静态代码块在第一次使用该类时执行，且只执行一次
     */</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;静态代码块执行&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        System.out.println(this.name);静态代码块不能访问非静态属性</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Block</span><span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//endregion</span>

    <span class="token comment">//region 非静态代码块</span>
    <span class="token comment">/*
    非静态代码块在调用构造方法前执行，构造方法被调用几次，就执行几次
    经常用来在创建对象之前做准备工作
     */</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;非静态代码块执行&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Block</span><span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//endregion</span>

    <span class="token keyword">public</span> <span class="token class-name">Block</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;无参构造方法执行&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="类加载" tabindex="-1"><a class="header-anchor" href="#类加载" aria-hidden="true">#</a> 类加载</h2><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220120205246868.png" alt="image-20220120205246868"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">note</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * 类的生命周期
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> initializationClass <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token comment">//        System.out.println(&quot;Zi.name = &quot; + Zi.name);</span>
        <span class="token comment">/*
        被动引用：引用父类的静态字段，只会引起父类的初始化，而不会引起子类的初始化。
        Fu的静态代码块
        Zi.name = fuName
         */</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">new</span> <span class="token class-name">Zi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">/*
        Fu的静态代码块,Fu.name=null 静态变量在准备阶段附初值，该值非java程序中的值，而为jvm的默认值。java程序的赋值阶段在初始化阶段
        Zi的静态代码块
        Fu的非静态代码块
        Fu构造方法执行
        Zi的非静态代码块
        Zi构造方法执行
         */</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Fu</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">/*
        前面在创建子类字节码文件对象时已经创建父类的而字节码文件对象，静态代码块仅在类初始化时才会执行，所以这里不会执行父类的静态代码块
        Fu的非静态代码块
        Fu构造方法执行
         */</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Fu</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span><span class="token comment">//没有static修饰的成员变量或者成员方法都是类同非静态代码块 他们都是在创建对象时创建(构造函数之前)</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token comment">/*
        静态代码块的意义在于给静态变量赋初值，
        相比较直接在静态变量的声明后面赋初值，
        静态代码块可以根据逻辑语句给静态变量赋不同的初值
         */</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Fu的静态代码块，name=&quot;</span><span class="token operator">+</span><span class="token class-name">Fu</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">&quot;fuName&quot;</span><span class="token punctuation">;</span><span class="token comment">//static修饰的成员变量或者成员方法都是在类的生命周期的准备阶段创建并附初值为null，而赋值阶段为初始化阶段，该阶段静态代码块和静态赋值语句都是顺序执行</span>
    <span class="token class-name">Fu</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Fu构造方法执行&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Fu的非静态代码块&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Zi</span> <span class="token keyword">extends</span> <span class="token class-name">Fu</span><span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Zi的静态代码块&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Zi的非静态代码块&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">Zi</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Zi构造方法执行&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jvm虚拟内存" tabindex="-1"><a class="header-anchor" href="#jvm虚拟内存" aria-hidden="true">#</a> jvm虚拟内存</h2><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220212165618860.png" alt="image-20220212165618860"></p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/2453238-20210801120735671-790804759.png" alt="2453238-20210801120735671-790804759.png"></p><p><strong>程序计数器</strong>：（Program Counter Register）也叫PC寄存器。程序计数器是一块较小的内存空间，可以看作是当前线程所执行的字节码的行号指示器</p><p><strong>本地方法栈</strong>：为虚拟机使用到的本地Native方法服务时的栈帧，和虚拟机栈类似</p><p><strong>堆</strong>：所有通过new创建的对象都放在该区域中，程序主要操作的区域</p><p><strong>栈</strong>：存放局部变量、局部引用</p><p>这些区域都是针对虚拟内存的分区，不是真正的物理内存，虚拟内存可以当做是想象出来的内存，不是真实存在的。</p><h3 id="类的生命周期" tabindex="-1"><a class="header-anchor" href="#类的生命周期" aria-hidden="true">#</a> 类的生命周期</h3><p>定义：一个类从被加载到虚拟机内存中开始，到被垃圾回收机制回收的过程为类的生命周期，其中验证、准备、解析统称为连接。加载、连接、初始化称为类加载，类加载强调一个jvm能够直接使用所需的类，所以类必须完成初始化。</p><ol><li><p>加载</p><ul><li><p>解释：通过全限定类名来获取定义此类在硬盘上class文件，通过字节流加载进内存，生成字节码文件对象；</p><ul><li>通过全限定类名来获取定义此类的二进制字节流。</li><li>将这个字节流所代表的静态存储结构转化为方法区的运行时数据结构。</li><li>在内存中生成一个代表这个类的 字节码对象，作为方法区这个类的各种数据的访问入口。</li></ul></li></ul></li><li><p>验证</p><ul><li>解释：确保Class文件字节流包含的信息中符合《Java虚拟机规范》的全部约束要求，并且不会危害虚拟机自身的安全。 <ul><li><p>文件格式验证</p></li><li><p>元数据验证：是否存在父类，父类的继承链是否正确，抽象类是否实现了其父类或接口之中要求实现的所有方法，字段、方法是否与父类产生矛盾等。保证不存在不符合 Java 语言规范的元数据信息。</p></li><li><p>字节码验证：通过数据流和控制流分析，确定程序语义是合法的、符合逻辑的。例如保证跳转指令不会跳转到方法体以外的字节码指令上。</p></li><li><p>符号引用验证：在解析阶段中发生，保证可以将符号引用转化为直接引用。</p></li></ul></li></ul></li><li><p>准备</p><ul><li>解释：方法区中为类变量（静态变量）分配内存并设置其初始值。初值为jvm默认的初值，而不是我们在程序中设定的初值。</li></ul></li><li><p>解析</p><ul><li>解释：常量池内的符号引用转化为直接引用的过程。解析动作主要针对类或接口、字段、类方法、接口方法、方法类型、方法句柄和调用点限定符 7 类符号引用进行。</li></ul></li><li><p>初始化</p><ul><li>解释：是类加载的最后一步，而也是到了该阶段，才真正开始执行类中定义的java程序代码(字节码)，之前的动作都由虚拟机主导。区别于对象的初始化，类的初始化所做的一起都是基于类变量或类语句的。主动引用该类会触发类的初始化。 <ul><li>会自上而下运行静态代码块或静态赋值语句（非静态代码块和构造方法会在使用阶段通过实例化对象执行）</li><li>如果为实例化为一个对象，则会执行成员变量、非静态代码块和构造函数。</li><li>如果存在父类，则父类先进行初始化。</li></ul></li></ul></li><li><p>使用</p><ul><li>主动引用：会触发类的初始化 <ul><li>通过new关键字实例化对象、读取或设置类的静态变量、调用类的静态方法。</li><li>通过反射方式执行new关键字实例化对象、读取或设置类的静态变量、调用类的静态方法。</li><li>初始化子类的时候，会触发父类的初始化。</li><li>作为程序入口直接运行时（也就是直接调用main方法）。</li></ul></li><li>被动引用：不会触发类的初始化 <ul><li>引用父类的静态变量，只会引起父类的初始化，而不会引起子类的初始化。</li><li>定义该类的类数组，不会引起类的初始化。</li><li>引用类的常量，不会引起类的初始化。</li></ul></li></ul></li><li><p>卸载</p><ul><li>该类所有的实例都已经被回收，也就是Java堆中不存在该类的任何实例；</li><li>加载该类的ClassLoader已经被回收；</li><li>该类对应的java.lang.Class对象没有在任何地方被引用，无法在任何地方通过反射访问该类的方法。</li></ul></li></ol><h2 id="类加载器" tabindex="-1"><a class="header-anchor" href="#类加载器" aria-hidden="true">#</a> 类加载器</h2><ul><li><p>定义：加载.class文件的东西</p></li><li><p>作用：将本地磁盘的.class字节码文件加载进内存，形成.class字节码文件对象</p></li><li><p>类加载器的分类：</p><ul><li>引导类加载器：</li><li>扩展类加载器(ExtClassLoader)：加载jdk中的jre中lib中的ext中资源文件</li><li>系统内加载器(AppClassLoader)：加载classpath路径(是指.class文件存放的文件夹，默认 在bin中)下的资源文件</li></ul></li><li><p>类加载器的分成关系</p><ul><li>上层：引导类加载器</li><li>中层：扩展类加载器</li><li>下层：系统类加载器</li></ul></li><li><p>类加载器的委托机制(加载顺序)</p><ul><li>首先任何类的字节码文件开始都是由系统类加载器来加载，但是由于委托机制，所以系统类加载器会委托给上一层类加载器来加载，即扩展类加载器来加载，由于委托机制，扩展类加载器会委托给上一层类加载器来加载，即引导类加载器来加载，引导类加载器没有上一层，就在自己的片区去加载，如果找到就正常加载，如果没有找到，就让下一层继续加载，如果扩展类加载器再自己的片区找到了，就正常加载，如果没找到，就让下一层继续加载，就是最后会让系统类加载器来加载，如果找到了就正常加载，如果没有找到则会报异常。</li></ul></li><li><p>各个加载器加载的资源</p></li></ul>`,33);function m(b,h){const e=c("ExternalLinkIcon");return p(),l("div",null,[u,n("ul",null,[d,n("li",null,[n("p",null,[s("基本结构："),n("a",k,[s("xxx.xxx.xxx"),i(e)]),s(".....")])]),r]),v])}const w=t(o,[["render",m],["__file","day08 jvm虚拟内存、类加载、修饰符.html.vue"]]);export{w as default};
