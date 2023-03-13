import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e as p}from"./app.7ab44a57.js";const t={},e=p(`<h2 id="递归" tabindex="-1"><a class="header-anchor" href="#递归" aria-hidden="true">#</a> 递归</h2><p>递归程序的设计的条件</p><ol><li>需要return</li><li>需要是结束条件有接近真(接近return)的操作</li><li>函数需要调用自己</li></ol><p>特点：</p><ul><li>开辟过多空间，大量消耗内存，程序设计中如果有其他方法可以解决该问题，应该避免递归调用</li><li>有些功能只能通过递归函数实现</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">note</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Arrays</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RecursionNote</span> <span class="token punctuation">{</span><span class="token comment">//递归算法</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//region 算出十进制对应的二进制</span>
        <span class="token function">binary</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//endregion</span>

        <span class="token comment">//region 汉诺盘</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">hanoi</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//endregion</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">binary</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">||</span> n <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 程序没有必要继续向下执行了</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>   <span class="token comment">// 让当前函数提前结束</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 执行到这里说明n不是1或者0</span>
        <span class="token comment">// 除2取余</span>
        <span class="token keyword">int</span> shang <span class="token operator">=</span> n <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>

        <span class="token comment">// 函数调用自己计算商的二进制</span>
        <span class="token function">binary</span><span class="token punctuation">(</span>shang<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span> yu <span class="token operator">=</span> n <span class="token operator">%</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>yu<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">hanoi</span><span class="token punctuation">(</span><span class="token class-name">String</span> src<span class="token punctuation">,</span><span class="token class-name">String</span> temp<span class="token punctuation">,</span><span class="token class-name">String</span> dest<span class="token punctuation">,</span><span class="token keyword">int</span> n<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 只有一个盘子，从src移动到dest</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>src <span class="token operator">+</span><span class="token string">&quot; -&gt; &quot;</span> <span class="token operator">+</span> dest<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//结束当前程序</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//第一步将上面n-1个从</span>
        <span class="token function">hanoi</span><span class="token punctuation">(</span>src<span class="token punctuation">,</span> dest<span class="token punctuation">,</span> temp<span class="token punctuation">,</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//第二步将最后一个从A移动到C</span>
        <span class="token function">hanoi</span><span class="token punctuation">(</span>src<span class="token punctuation">,</span> temp<span class="token punctuation">,</span> dest<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//第三步从B移动到C，A作为中转</span>
        <span class="token function">hanoi</span><span class="token punctuation">(</span>temp<span class="token punctuation">,</span> src<span class="token punctuation">,</span> dest<span class="token punctuation">,</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),c=[e];function o(i,l){return s(),a("div",null,c)}const r=n(t,[["render",o],["__file","day06 递归.html.vue"]]);export{r as default};
