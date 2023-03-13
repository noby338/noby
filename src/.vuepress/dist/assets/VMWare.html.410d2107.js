import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as n,e as l}from"./app.b62a36f4.js";const p={},s=l('<ul><li><p>VMware</p><ul><li>用于 window 安装其他系统的虚拟机</li><li>快照： <ul><li>用于备份系统</li></ul></li></ul></li><li><p>安装步骤</p><ul><li><p>VMWare装好以后，系统会多两块虚拟网卡 VMnet1 直接禁用 VMnet8 这个是给NAT模式时</p></li><li><p>进入BISO，启用主板的虚拟化设置</p></li><li><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621144721.png" alt="image-20220621144721757"></p><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621144800.png" alt="image-20220621144800290"></p><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621144826.png" alt="image-20220621144826896"></p><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621144849.png" alt="image-20220621144849683"></p><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621144938.png" alt="image-20220621144938688"></p><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621145105.png" alt="image-20220621145105656"></p><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621145255.png" alt="image-20220621145255893"></p><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621145323.png" alt="image-20220621145323729"></p><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621145540.png" alt="image-20220621145540140"></p><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621145621.png" alt="image-20220621145621885"></p><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621145724.png" alt="image-20220621145724138"></p><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621151324.png" alt="image-20220621151324911"></p><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621151524.png" alt="image-20220621151524655"></p><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621151732.png" alt="image-20220621151731946"></p><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621151918.png" alt="image-20220621151918035"></p><p><img src="https://woniumd.oss-cn-hangzhou.aliyuncs.com/java/libaisong/20220621151835.png" alt="image-20220621151835006"></p><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/20220621152038.png" alt="image-20220621152037890"></p></li></ul></li><li><p>网络配置</p><ul><li><p><img src="https://markdown-1308523627.cos.ap-chengdu.myqcloud.com/typora/image-20220725102856808.png" alt="image-20220725102856808"></p></li><li><p>命令：</p><ul><li>查看ip：ipconfig(win)、ifconfig(linux)</li><li>查看网络连接：ping ip</li></ul></li><li><p>三种模式：</p><ul><li><p>桥接模式：</p><ul><li>VMnet0：vm直接连接pc所在的网段</li></ul></li><li><p>NAT模式：</p><ul><li>VMnet8：上一个网段的ip不能访问下一个网段的ip，为实现pc访问vm，网络设置中的VMnet8是用于将pc虚拟成NAT中的子ip，以实现pc和vm同网段，(若没有VMnet8，vm可以ping pc，但pc 不可以 ping vm)</li></ul></li><li><p>仅主机模式：</p><ul><li>VMnet1：类似NAT模式可实现pc和vm的相互访问，vm不能访问外网</li></ul></li></ul></li></ul></li></ul>',1),o=[s];function c(g,m){return a(),n("div",null,o)}const h=i(p,[["render",c],["__file","VMWare.html.vue"]]);export{h as default};