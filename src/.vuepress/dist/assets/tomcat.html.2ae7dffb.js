import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c as t,e as c}from"./app.7ab44a57.js";const l={},a=c('<h3 id="tomcat-的安装" tabindex="-1"><a class="header-anchor" href="#tomcat-的安装" aria-hidden="true">#</a> tomcat 的安装</h3><ul><li><p>使用压缩包安装</p><ol><li><p>解压到/usr/local/src/tomcat/</p></li><li><p>开放端口</p><ol><li>查看防火墙的状态: <code>firewall-cmd --zone=public --query-port=8080/tcp</code></li><li>添加开放端口: <code>firewall-cmd --zone=public --add-port=8080/tcp --permanent</code> （–permanent永久生效，没有此参数重启后失效）</li><li>重启防火墙: <code>firewall-cmd --reload</code></li></ol></li></ol></li></ul>',2),i=[a];function r(d,n){return o(),t("div",null,i)}const s=e(l,[["render",r],["__file","tomcat.html.vue"]]);export{s as default};