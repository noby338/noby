### Filter

* JavaWeb的三大组件之一(Servlet、Filter、LIstener)
* 作用：过滤器可以把对资源(jsp、html、servlet、目录等)的请求拦截下来，从而实现一些特殊的功能。过滤器一般完成一些通用的操作，比如：权限控制、统一编码处理、敏感字符处理等等…
* 拦截器的拦截顺序为拦截器类名的自然排序

### Listener

* JavaWeb的三大组件之一(Servlet、Filter、LIstener)

* 作用：监听器可以监听就是在application,session,request:三个对象创建、销毁或者往其中添加修改删除
  属性时自动执行代码的功能组件

* 分类

  * ServletContextListener 用于对ServletContexti对象进行监听（创建、销毁）

  * ServletContextAttributeListener 对ServletContexti对象中属性的监听（增删改属性）

  * HttpSessionListener 对Session对象的整体状态的监听（创建、销毁）

  * HttpSessionAttributeListener 对Session对象中的属性监听（增删改属性）

  * HttpSessionBindingListener 监听对象于Session的绑定和解除

  * HttpSessionActivationListener 对Session数据的钝化和活化的监听

  * ServletRequestListener 对Requesti对象进行监听（创建、销毁）】

  * ServletRequestAttributeListener 对Requesti对象中属性的监听（增删改属性）