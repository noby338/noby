---
title: day04 Mybatis多表查询关系、连表查询、分布查询、缓存
icon: write
category:
  - JavaWeb
  - MyBatis
tag:
  - JavaWeb
  - MyBatis
  - 多表查询
  - 多对一查询
  - 一对多查询
  - 多对多查询
  - 连表查询
  - 分步查询
  - 缓存
sticky: false
star: false
article: true
timeline: true
---

### mybaits 的配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?><!--文档类型说明-->
<!--导入第三方约束文件，表示本文件在准守xml语法的同时还要准守这里的mybatis-3-config.dtd(mybatis的主配置文件)文件中制定的语法-->
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd"><!--dtd文件为约束文件，作为下面xml文件的规范-->
<configuration>
    <!--导入properties文件，可省略-->
    <properties resource="db.properties"/>
    <settings>
        <!--开启延迟加载-->
        <!--是否开启延迟加载。如果开启，当查询结果中有关联对象时，不会立即查询关联对象，而是等到使用时再查询。
        可以减少数据库的查询次数和网络带宽的占用，提高程序的性能和效率。默认为 false。-->
        <setting name="lazyLoadingEnabled" value="true"/>
        <!--是否开启积极的延迟加载。则表示启用激进延迟加载。这种方式下，MyBatis会在访问某些数据时自动加载相关的数据，以便在后续使用中更加高效。
        但是，如果数据结构非常复杂或者数据量非常大，那么自动加载的数据可能会很多，从而导致程序变慢。因此，在使用这种方式时需要谨慎，需要根据实际情况进行配置和调整。默认为false-->
        <setting name="aggressiveLazyLoading" value="false"/>
        <!--启用全局二级缓存-->
        <setting name="cacheEnabled" value="true"/>
        <!--开启驼峰转换-->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>

    <!--实体类设置别名-->
    <typeAliases>
        <!--单个配置某个全限定名-->
        <!--        <typeAlias type="entity.Student" alias="Student"></typeAlias>-->        <!--统一配置某个包下的全限定名为类的类名-->
        <package name="note.entity"/>
    </typeAliases>

    <!--导入插件-->
    <!--    <plugins>-->    <!--        &lt;!&ndash;pagehelper插件(分页查询插件)&ndash;&gt;-->
    <!--        <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>-->    <!--    </plugins>-->
    <!-- environments：指定配置环境。例如开发、测试、生产环境 -->
    <environments default="development"><!--指定默认配置环境为开发环境-->
        <environment id="development"><!--配置环境，可能有多个-->
            <transactionManager type="JDBC"/><!--事务管理器(用jdbc的事务管理器来管理)-->
            <!--配置数据源：数据库来自哪里 -->
            <dataSource type="POOLED"><!--POOLED：连接池，采用连接池的方式获取连接-->
                <!--四大参数：properties文件的key使用，分级区分，避免命名冲突-->
                <property name="driver" value="${jdbc.driver}"/><!--这里的${driver}来自properties-->
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <!--统一配置某个包下的xml映射文件（xml的文件名是根据接口名创建），使用该方法的映射文件名和接口名必须相同-->
        <package name="note.dao"/>
    </mappers>
</configuration>
```

### 数据库的 properties

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/stage2?useUnicode=true&characterEncoding=utf8
jdbc.username=root
jdbc.password=123
```

### log4j 的配置 properties

```properties
# 这段代码是使用log4j进行日志输出的配置。

# log4j打印的日志等级(低到高)：ALL<=TRACE(最细的内容)<DEBUG(调试信息)<INFO(普通信息)<WARN(警告信息)<ERROR(错误信息)<FATAL(严重错误)<OFF
# rootLogger表示在所有环境均生效的配置，OFF表示在所有环境下不显示
log4j.rootLogger=OFF

# note.dao表示在当前类生效的配置，这个类的日志级别设置为debug，并将日志输出到CONSOLE这个appender中。
# 虽然前面设置了log4j.rootLogger=OFF，但这行配置将覆盖前面的配置，前面的配置为了去掉警告提示。
log4j.logger.note.dao=DEBUG,CONSOLE

# 表示定义了一个名为CONSOLE的appender，它的类型是ConsoleAppender，即将日志输出到控制台。
log4j.appender.CONSOLE=org.apache.log4j.ConsoleAppender
# 表示定义了CONSOLE这个appender的输出格式，这里使用的是PatternLayout，即按照指定的格式输出日志信息。
log4j.appender.CONSOLE.layout=org.apache.log4j.PatternLayout
# 表示指定了输出格式的具体内容，%m表示输出日志信息，%t表示输出线程名，%c表示输出日志所在的类的全限定名（%c{1}表示输出日志所在类的简称，即类名去掉包名后的名称），%l表示日志输出的位置信息，%n表示换行。
log4j.appender.CONSOLE.layout.ConversionPattern=%p %c{1}:%L - %m%n


# 指定了日志输出的方式为每天生成一个日志文件
log4j.appender.FILE=org.apache.log4j.DailyRollingFileAppender
# 表示定义了FILE这个appender的输出格式，这里使用的是PatternLayout，即按照指定的格式输出日志信息。
log4j.appender.FILE.layout=org.apache.log4j.PatternLayout
# 指定了日志输出的格式，其中%d表示日期，%p表示日志级别，%m表示日志信息，%t表示线程名，%c表示类名，%l表示日志输出的位置信息，%n表示换行。
log4j.appender.FILE.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} [%p] %m [%t] %c [%l]%n
# 指定了日志输出的文件路径
log4j.appender.FILE.File=file.log
```

### 生成 sqlssesion 的工具类

```java
package note.util;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

/**
 * @Description 用于创建数据库链接的工具类
 * @Author Noby
 * @Date 2023/3/21 12:42
 */public class SqlSessionUtil {
    static SqlSessionFactory sqlSessionFactory= null;
    public static SqlSession getSqlSession(){
        if (sqlSessionFactory == null) {
            InputStream inputStream = null;
            try {
                inputStream = Resources.getResourceAsStream("mybatisConfig.xml");
            } catch (IOException e) {
                e.printStackTrace();
            }
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        }
        return sqlSessionFactory.openSession(false); //如果不设置参数或者参数为false就是手动提交事务，参数设置为true就是自动提交事务
    }
}
```

### entity 实体类

```java
package note.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Class {
    private Integer id;
    private String name;
    private List<Teacher> teachers;
}
```

```java

package note.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClassTeacherMap {
    private Integer id;
    private Integer avrScore;
    private Class aClass;
    private Teacher teacher;
}
```

```java
package note.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Dep {
    private Integer id;
    private String name;
    private List<Emp> empList;
}
```

```java
package note.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Emp {
    private Integer id;
    private String name;
    private Dep dep;
}
```

```java
package note.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {
    private Integer id;
    private String name;
    private List<Class> classes;
}
```

### dao 接口

```java
package note.dao;

import note.entity.Class;

public interface ClassDao {
    Class selectClassById(int cid);
    Class selectClassById2(int cid);
}
```

```java
package note.dao;

import note.entity.ClassTeacherMap;

public interface ClassTeacherMapDao {
    ClassTeacherMap selectClaTeaById(int id);
    ClassTeacherMap selectClaTeaById2(int id);
}
```

```java
package note.dao;

import note.entity.Dep;

public interface DepDao {
    Dep selectDepById(int id);
    Dep selectDepById2(int id);
}
```

```java
package note.dao;

import note.entity.Emp;

public interface EmpDao {
    Emp selectEmpById(int id);
    Emp selectEmpById2(int id);
}
```

### 接口的 mapper

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!--导入第三方约束文件，表示本文件在准守xml语法的同时还要准守这里的mybatis-3-mapper.dtd(mybatis的映射文件)文件中制定的语法-->
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="note.dao.ClassDao"><!--命名空间，一般为映射文件实体类的全限定名-->
    <!--中间表连表查询-->
    <select id="selectClassById" resultMap="classMap">
        select class_teacher_map.id  id,
               class_teacher_map.cid cid,               class_teacher_map.tid tid,               avr_score,               class.name            cname,               teacher.name          tname        from class_teacher_map,             class,             teacher        where class_teacher_map.cid = class.id          and class_teacher_map.tid = teacher.id          and class.id = #{id};    </select>
    <resultMap id="classMap" type="Class">
        <id property="id" column="cid"/>
        <result property="name" column="cname"/>
        <collection property="teachers" ofType="Teacher">
            <id property="id" column="tid"/>
            <result property="name" column="tname"/>
        </collection>    </resultMap>
    <!--中间表分步查询-->
    <select id="selectClassById2" resultMap="classMap2">
        select *
        from class        where id = #{id}    </select>
    <resultMap id="classMap2" type="class">
        <id property="id" column="id"/>
        <result property="name" column="name"/>
        <collection property="teachers" column="id" ofType="teacher" select="selectTeacherByCid"/>
    </resultMap>    <select id="selectTeacherByCid" resultType="teacher">
        select tid id, name
        from class_teacher_map,teacher        where class_teacher_map.tid = teacher.id          and cid = #{id}    </select>
</mapper>
```

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!--导入第三方约束文件，表示本文件在准守xml语法的同时还要准守这里的mybatis-3-mapper.dtd(mybatis的映射文件)文件中制定的语法-->
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="note.dao.ClassTeacherMapDao"><!--命名空间，一般为映射文件实体类的全限定名-->
    <!--多对多查询方式，连表查询一步-->
    <select id="selectClaTeaById" resultMap="classTeacherMapMap">
        select class_teacher_map.id id, class_teacher_map.cid cid, class_teacher_map.tid tid, class_teacher_map.avr_score avr_score, class.name cname, teacher.name tname
        from class_teacher_map,             class,             teacher        where class_teacher_map.cid = class.id          and class_teacher_map.tid = teacher.id          and class_teacher_map.id = #{id};    </select>
    <resultMap id="classTeacherMapMap" type="ClassTeacherMap">
        <id column="id" property="id"/>
        <result column="avr_score" property="avrScore"/>
        <association property="aClass" javaType="Class">
            <id column="cid" property="id"/>
            <result column="cname" property="name"/>
        </association>
        <association property="teacher" javaType="Teacher">
            <id column="tid" property="id"/>
            <result column="tname" property="name"/>
        </association>
    </resultMap>

    <!--分步查询-->
    <select id="selectClaTeaById2" resultMap="classTeacherMapMap2">
        select *
        from class_teacher_map        where class_teacher_map.id = #{id};    </select>
    <resultMap id="classTeacherMapMap2" type="ClassTeacherMap">
        <id column="id" property="id"/>
        <result column="avr_score" property="avrScore"/>
        <association property="aClass" javaType="Class" select="selectClassByCid" column="cid"/>
        <association property="teacher" javaType="Teacher" select="selectTeacherByTid" column="tid"/>
    </resultMap>
    <select id="selectClassByCid" resultType="Class">
        select *
        from class        where id = #{cid};    </select>
    <select id="selectTeacherByTid" resultType="Teacher">
        select *
        from teacher        where id = #{tid};    </select>
</mapper>
```

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!--导入第三方约束文件，表示本文件在准守xml语法的同时还要准守这里的mybatis-3-mapper.dtd(mybatis的映射文件)文件中制定的语法-->
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="note.dao.DepDao"><!--命名空间，一般为映射文件实体类的全限定名-->
    <!--一对多查询（使用连接一步查询）-->
    <select id="selectDepById" resultMap="depMap">
        select dep.id, dep.name, emp.id eid, emp.name ename
        from dep,             emp        where dep.id = emp.did          and dep.id = 1    </select>
    <resultMap id="depMap" type="Dep">
        <id property="id" column="id"/>
        <result property="name" column="name"/>
        <collection property="empList" ofType="Emp">
            <id property="id" column="eid"/>
            <result property="name" column="ename"/>
        </collection>
    </resultMap>

    <!--一对多查询（分步查询）-->
    <select id="selectDepById2" resultMap="depMap2">
        select *
        from dep        where id = #{id}    </select>
    <resultMap id="depMap2" type="Dep">
        <id property="id" column="id"/>
        <result property="name" column="name"/>
        <collection property="empList" column="id" ofType="Emp" select="selectEmpById"/>
    </resultMap>
    <select id="selectEmpById" resultType="Emp">
        select *
        from emp        where did = #{id}    </select>


</mapper>
```

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!--导入第三方约束文件，表示本文件在准守xml语法的同时还要准守这里的mybatis-3-mapper.dtd(mybatis的映射文件)文件中制定的语法-->
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="note.dao.EmpDao"><!--命名空间，一般为映射文件实体类的全限定名-->
    <!-- 加上cache标签之后表示当前mapper中产生的数据是"可以"被放到二级缓存中 -->
    <cache readOnly="true"/>
    <!--多对一查询，连接一步查询-->
    <select id="selectEmpById" resultMap="empMap">
        select emp.id,emp.name,dep.id did,dep.name dname
        from emp,             dep        where emp.did = dep.id          and emp.id = #{id};    </select>
    <resultMap id="empMap" type="Emp">
        <id property="id" column="id"/>
        <result property="name" column="name"/>
        <association property="dep" javaType="Dep">
            <id property="id" column="did"/>
            <result property="name" column="dname"/>
        </association>
    </resultMap>

    <!--多对一查询，分步查询-->
    <select id="selectEmpById2" resultMap="empMap2">
        select *
        from emp        where id = #{id};    </select>
    <resultMap id="empMap2" type="Emp">
        <id property="id" column="id"/>
        <result property="name" column="name"/>
        <association property="dep" column="did" javaType="Dep" select="selectDepById"/>
    </resultMap>
    <select id="selectDepById" resultType="Dep">
        select *
        from dep        where id = #{did};    </select>

</mapper>
```

### 测试类

```java
package note.dao;

import note.entity.Class;
import note.util.SqlSessionUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class ClassDaoTest {
    SqlSession sqlSession = null;
    ClassDao mapper = null;

    @Before
    public void setUp() {
        sqlSession = SqlSessionUtil.getSqlSession();
        mapper = sqlSession.getMapper(ClassDao.class);
    }

    @After
    public void tearDown() {
        if (sqlSession != null) {
            sqlSession.close();
        }
    }

    /**
     * 中间表连表查询
     */
    @Test
    public void selectClassById() {
        Class aClass = mapper.selectClassById(1);
        System.out.println(aClass);
    }

    /**
     * 中间表手动映射连表查询
     */
    @Test
    public void selectClassById2() {
        Class aClass = mapper.selectClassById2(1);
        System.out.println(aClass);
    }

}
```

```java
package note.dao;

import note.entity.ClassTeacherMap;
import note.util.SqlSessionUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class ClassTeacherDaoTest {
    SqlSession sqlSession = null;
    ClassTeacherMapDao classTeacherMapDao = null;

    @Before
    public void setUp() {
        sqlSession = SqlSessionUtil.getSqlSession();
        classTeacherMapDao = sqlSession.getMapper(ClassTeacherMapDao.class);
    }

    @After
    public void tearDown() {
        if (sqlSession != null) {
            sqlSession.close();
        }
    }

    /**
     * 多对多一次查询
     */
    @Test
    public void selectClaTeaById() {
        ClassTeacherMap class_teacher = classTeacherMapDao.selectClaTeaById(5);
        System.out.println(class_teacher);
    }

    /**
     * 多对多分步查询
     */
    @Test
    public void selectClaTeaById2() {
        ClassTeacherMap class_teacher = classTeacherMapDao.selectClaTeaById2(5);
        System.out.println(class_teacher);
    }

}
```

```java
package note.dao;

import note.entity.Dep;
import note.util.SqlSessionUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * 手动映射
 *
 * 接口映射：mybatis为了方便调用SQL、传参提供了接口映射xml的编程方式，用一个接口与对应的xml进行映射，分为手动映射和自动映射
 * 自动映射：mybatis根据结果集的字段名自动得到对应的setter方法名，通过反射调用setter方法给属性赋值完成数据映射
 * 手动映射：指程序员通过配置的方式告诉mybatis哪个字段映射到哪个属性上，例如当字段名与属性名不一致时、自动映射无法完成数据映射时；
 * 注意事项：
 *     1.接口名字最好与对应的mapper文件一致
 *  2.接口最好与mapper文件在同一包下
 *  3.mapper文件的namespace必须是对应接口的全名
 *  4.接口中的方法名与对应SQL的id要保持一致
 *  5.接口的返回值类型要与SQL的结果保持一致
 *  6.在解析mapper文件时用package标签引入，不要用mapper标签
 */
public class DepDaoTest {
    SqlSession sqlSession = null;
    DepDao mapper = null;

    @Before
    public void setUp() {
        sqlSession = SqlSessionUtil.getSqlSession();
        mapper = sqlSession.getMapper(DepDao.class);
    }

    @After
    public void tearDown() {
        if (sqlSession != null) {
            sqlSession.close();
        }
    }


    /**
     *多对一多表查询（使用连接一步查询）
     */
    @Test
    public void selectDepById() {
        Dep dep = mapper.selectDepById(1);
        System.out.println(dep);
    }


    /**
     *多对一多表查询（分步查询）
     */
    @Test
    public void selectDepById2() {
        Dep dep = mapper.selectDepById2(1);
        System.out.println(dep);
    }


}
```

```java
package note.dao;

import note.entity.Emp;
import note.util.SqlSessionUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * 手动映射
 * <p>
 * 接口映射：mybatis为了方便调用SQL、传参提供了接口映射xml的编程方式，用一个接口与对应的xml进行映射，分为手动映射和自动映射
 * 自动映射：mybatis根据结果集的字段名自动得到对应的setter方法名，通过反射调用setter方法给属性赋值完成数据映射
 * 手动映射：指程序员通过配置的方式告诉mybatis哪个字段映射到哪个属性上，例如当字段名与属性名不一致时、自动映射无法完成数据映射时；
 * 注意事项：
 * 1.接口名字最好与对应的mapper文件一致
 * 2.接口最好与mapper文件在同一包下
 * 3.mapper文件的namespace必须是对应接口的全名
 * 4.接口中的方法名与对应SQL的id要保持一致
 * 5.接口的返回值类型要与SQL的结果保持一致
 * 6.在解析mapper文件时用package标签引入，不要用mapper标签
 */
public class EmpDaoTest {
    SqlSession sqlSession = null;
    EmpDao empDao = null;

    @Before
    public void setUp() throws Exception {
        sqlSession = SqlSessionUtil.getSqlSession();
        empDao = sqlSession.getMapper(EmpDao.class);
    }

    @After
    public void tearDown() throws Exception {
        if (sqlSession != null) {
            sqlSession.close();
        }
    }

    @Test
    public void selectEmpByEid() {
        Emp emp = empDao.selectEmpById(2);
        System.out.println(emp);
    }

    /**
     * mybatis使用多表的分布查询
     * 使用延迟加载
     * 打开激进加载：在查询时不会执行其他非该表的sql，当使用到其中一个属性，就会执行所有有关表的sql
     * 关闭激进加载：使用到哪一个属性，就查到哪一个表。
     */
    @Test
    public void selectEmpByEid2() {
        Emp emp = empDao.selectEmpById2(2);
        //使用到名字属性，不需要查询emp表外的其他表
        System.out.println("emp.getName() = " + emp.getName());
        //使用到dep属性，才需要查询dep表
        System.out.println("emp.getDep() = " + emp.getDep());
    }

}
```

### mybaitis 的缓存

- MyBatis 的缓存是一种可选的提高性能的方式，它可以缓存查询结果，避免反复查询数据库，减少与数据库的交互次数，提高系统性能。MyBatis 中的缓存主要分为一级缓存和二级缓存，本质上都是一个内存区域，在不同的作用域内起作用。
  - 一级缓存：一级缓存也称为本地缓存，它是在  `SqlSession`  对象的生命周期内有效。当前  `SqlSession`  内多次查询相同数据，第一次查询后，数据将会被缓存在本地内存中，等待下一次请求使用，从而避免重复查询，降低数据库压力。
    - 一级缓存是 MyBatis 默认开启的，如果某个  `SqlSession`  关闭了或者提交了事务，则该  `SqlSession`  的一级缓存也将被清空。一级缓存是基于对象引用的，查询结果是以  `Map`  为基础进行存储，其中 key 是 SQL 语句和查询条件组成的唯一标识符，value 是对应的查询结果所对应的 Java 对象。
  - 二级缓存：二级缓存也称为全局缓存，它是基于命名空间的缓存，多个  `SqlSession`  可以共享同一个命名空间的缓存数据。二级缓存的作用域是同一个 Mapper（namespace）下。
    - 二级缓存需要通过配置开启，其默认是关闭的。可以设置缓存的实现方式，默认情况下，MyBatis 提供了多种缓存实现，包括延迟加载缓存（LruCache）、FIFO 缓存（FifoCache）、SoftReference 缓存（SoftCache）、弱引用缓存（WeakCache）等。用户也可以自定义缓存实现策略。
- 需要注意的是，缓存虽然可以提高系统性能，但是如果缓存数据过多、过期配置不合理或者缓存策略不当，反而会降低系统性能，甚至导致数据一致性问题。因此，应该根据具体情况和需求选择合适的缓存方案，并进行有效的缓存监控和管理，确保缓存的正常运行和数据一致性。

```java
package note;

import note.dao.EmpDao;
import note.util.SqlSessionUtil;
import org.apache.ibatis.session.SqlSession;

/**
 * @Description mybatis缓存
 * 通过log4j日志查看是否命中缓存
 * @Author Noby
 * @Date 2023/3/21 17:50
 */public class CacheNote {
    public static void main(String[] args) {
        //region 一级缓存(session缓存)(默认开启)
        /*        mybatis为了减少查询次数、提高执行效率它提供了两个缓存(下一个相同数据的查询不再执行SQL语句，而是直接读取上一个缓存记录)
            每一个session都有一个自己的缓存，用来临时存放查询到的数据
            mybatis在查询数据时，是先会去对应的session查询是否有需要的数据，如果有则直接获取到就不再执行SQL
            如果没有则执行SQL，然后将查询到的数据放到对应的session缓存中

            清空session缓存的方式1：
            sqlSession.clearCache();            清空session缓存的方式2：
            sqlSession.commit();        */
        SqlSession sqlSession = SqlSessionUtil.getSqlSession();
        EmpDao EmpDao = sqlSession.getMapper(EmpDao.class);
        System.out.println("第一次查询selectEmpById2(1)---------------");
        System.out.println("EmpDao.selectEmpById2(1) = " + EmpDao.selectEmpById2(1));

        System.out.println("第一次查询selectEmpById2(2)---------------");
        System.out.println("EmpDao.selectEmpById2(2) = " + EmpDao.selectEmpById2(2));

        System.out.println("第二次查询selectEmpById2(2)---------------");
        System.out.println("EmpDao.selectEmpById2(2) = " + EmpDao.selectEmpById2(2));

        System.out.println("第二次查询selectEmpById2(1)---------------");
        System.out.println("EmpDao.selectEmpById2(1) = " + EmpDao.selectEmpById2(1));
        //endregion


        //region 二级缓存(factory缓存)(mapper中指定开启)
        /*            每一个SqlSessionFactory都有一个缓存，
            同一个工厂创建出来的session是可以共享二级缓存中数据的

            存放到二级缓存的方式：
            <!-- mapper标签里加上cache标签之后表示当前mapper中产生的数据是"可以"被放到二级缓存中 -->            <cache readOnly="true"></cache>            session.commit()之后才会存放到二级缓存
        */        sqlSession.commit();//commit后才会存放到factory缓存
        SqlSession sqlSession2 = SqlSessionUtil.getSqlSession();
        EmpDao EmpDao2 = sqlSession2.getMapper(EmpDao.class);

        System.out.println("第三次查询selectEmpById2(1)(不同的sqlSession)---------------");
        System.out.println("EmpDao.selectEmpById2(1) = " + EmpDao2.selectEmpById2(1));
        //endregion

        sqlSession.close();
    }
}
```
