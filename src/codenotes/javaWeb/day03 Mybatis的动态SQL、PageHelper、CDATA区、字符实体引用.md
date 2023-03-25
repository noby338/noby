---
title: day03 Mybatis的动态SQL、PageHelper、CDATA区、字符实体引用
icon: write
category:
  - JavaWeb
  - MyBatis
tag:
  - JavaWeb
  - 动态SQL
  - PageHelper
  - CDATA区
  - 字符实体引用
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

    <!--实体类设置别名-->
    <typeAliases>
        <!--单个配置某个全限定名-->
<!--        <typeAlias type="entity.Student" alias="Student"></typeAlias>-->
        <!--统一配置某个包下的全限定名为类的类名-->
        <package name="note.entity"/>
    </typeAliases>

    <!--导入插件-->
<!--    <plugins>-->
<!--        &lt;!&ndash;pagehelper插件(分页查询插件)&ndash;&gt;-->
<!--        <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>-->
<!--    </plugins>-->

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
    <mappers><!--加载解析的映射文件(sql)-->
        <!--单个配置某个xml映射文件-->
<!--        <mapper resource="note/dao/StudentDao.xml"></mapper>-->
<!--        <mapper resource="note/dao/Student1Dao.xml"></mapper>-->
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

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private Integer id;
    private String name;
    private Boolean gender;
    private Date birthday;

    public Student(String name,Boolean gender,Date birthday) {
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
    }
}
```

```java

package note.entity;

import lombok.Data;

import java.util.List;

/**
 * @Description 用于分页查询的实体类
 * @Author Noby
 * @Date 2023/3/21 12:22
 */@Data
public class Page {
    private int pageNum;//当前页
    private int pageSize;//每页的大小
    private int pages;//总页数
    private int total;//总条数
    private List<Student> data;//当前页的数据

}
```

### dao 接口

```java
package note.dao;

import note.entity.Page;
import note.entity.Student;

import java.util.List;

public interface StudentDao {

    /**
     * 通过SQL动态语句if实现数据库的查找
     * @param student
     * @return
     */
    List<Student> selectStudentByIf(Student student);

    /**
     * 通过SQL动态语句where实现数据库的查找
     * @param student
     * @return
     */
    List<Student> selectStudentByWhere(Student student);

    /**
     * 通过SQL动态语句choose实现数据库的查找
     * @param student
     * @return
     */
    List<Student> selectStudentByChoose(Student student);

    /**
     * 通过SQL动态语句foreach实现数据库的查找
     * @param ints
     * @return
     */
    List<Student> selectStudentByArray(int[] ints);

    /**
     * 通过SQL语句的复用实现数据库的查找
     * @param id
     * @return
     */
    Student selectStudentByFragment(int id);

    /**
     * 通过SQL动态语句if实现数据库的修改
     * @param student
     * @return
     */
    boolean updateStudentByIf(Student student);

    /**
     * 自定义实现分页查询
     * bind标签的使用
     * @param page
     * @return
     */
    List<Student> selectByPage(Page page);

    /**
     * 通过实体引用转义字符
     * @return
     */
    List<Student> selectStudentByLt();

    /**
     * 通过Cdata区转义字符
     * @return
     */
    List<Student> selectStudentByCdata();
}
```

### 接口的 mapper

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--导入第三方约束文件，表示本文件在准守xml语法的同时还要准守这里的mybatis-3-mapper.dtd(mybatis的映射文件)文件中制定的语法-->
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="note.dao.StudentDao"><!--命名空间，一般为映射文件实体类的全限定名-->

    <!--动态SQL实现查找-->
    <select id="selectStudentByIf" resultType="note.entity.Student">
        select * from student where 1 = 1
        <if test="id != null and id != ''">
            and id like '%' #{id} '%'
        </if>
        <if test="name != null and name != ''">
            and name like '%' #{name} '%'
        </if>
        <if test="gender != null and gender != ''">
            and gender like '%' #{gender} '%'
        </if>
    </select>

    <select id="selectStudentByWhere" resultType="note.entity.Student">
        select * from student
        <where>
            <if test="id != null and id != ''">
                and id=#{id}
            </if>
            <if test="name != null and name != ''">
                and name like '%' #{name} '%'
            </if>
            <if test="gender != null and gender != ''">
                and gender=#{gender}
            </if>
        </where>
    </select>

    <!--choose对应java的switch-->
    <!--when对应java的case-->
    <!--otherwise对应java的default-->
    <select id="selectStudentByChoose" resultType="note.entity.Student">
        select * from student
        <where>
            <choose>
                <when test="id != null and id != ''">
                    and id=#{id}
                </when>
                <when test="name != null and name != ''">
                    and name like '%' #{name} '%'
                </when>
                <when test="gender != null and gender != ''">
                    and gender=#{gender}
                </when>
                <otherwise>
                    and 1 = !1
                </otherwise>
            </choose>
        </where>
    </select>
    <!--通过动态SQL实现for循环-->
    <select id="selectStudentByArray" resultType="note.entity.Student">
        select * from student
        <if test="array != null and array.length !=0">
            where id in
            <foreach collection="array" item="id" open="(" close=")" separator=",">
                #{id}
            </foreach>
        </if>
    </select>

    <!--SQL复用-->
    <select id="selectStudentByFragment" resultType="note.entity.Student">
        select <include refid="res"/> from student where id=#{id}
    </select>
    <!--可以多个sql语句调用该语句，减少重复代码的书写-->
    <sql id="res">
        id,name,gender,birthday
    </sql>


    <!--动态SQL实现查找-->
    <update id="updateStudentByIf">
        update student set
        <if test="name != null and name != ''">
            name=#{name}
        </if>
        <if test="gender != null">
            and gender=#{gender}
        </if>
        <if test="birthday != null">
            and birthday=#{birthday}
        </if>
        where id=#{id}
    </update>

    <!--使用自己的对象实现分页查询，bind标签的使用-->
    <select id="selectByPage" resultType="Student">
        <!--SQL中的计算标签bind，SQL中不支持直接计算-->
        <bind name="startRow" value="(pageNum - 1) * pageSize"/>
        select * from student limit #{startRow},#{pageSize}
    </select>

    <!--字符实体引用-->
    <!--CDATA区里的所有内容都会被解析器忽略。(idea输入大写CD提示)-->
    <select id="selectStudentByLt" resultType="note.entity.Student">
        select *
        from student        where id &lt; 5
    </select>

    <!--CDATA区-->
    <!--CDATA区里的所有内容都会被解析器忽略。(idea输入大写CD提示)-->
    <select id="selectStudentByCdata" resultType="note.entity.Student">
        select *
        from student        where id         <![CDATA[                  <          ]]>              5    </select>


</mapper>
```

### 测试类

```java
package note.dao;

import note.entity.Page;
import note.entity.Student;
import note.util.SqlSessionUtil;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.util.List;

/**
 * 动态sql的使用
 */
public class StudentDaoTest {
    private SqlSession sqlSession = SqlSessionUtil.getSqlSession();
    private StudentDao studentDao = sqlSession.getMapper(StudentDao.class);
    /**
     * 通过if动态SQL实现数据库的查找
     */
    @Test
    public void selectStudentByIf() {
        Student student = new Student();
        student.setName("冬梅");
        List<Student> students = studentDao.selectStudentByIf(student);
        System.out.println("students = " + students);
        sqlSession.close();
    }

    /**
     * 通过where,if动态SQL实现数据库的查找
     */
    @Test
    public void selectStudentByWhere() {
        Student student = new Student();
        student.setName("张");
        student.setGender(false);
        List<Student> students = studentDao.selectStudentByWhere(student);
        System.out.println("students = " + students);
        sqlSession.close();
    }

    /**
     * 通过Choose动态SQL实现数据库的查找
     */
    @Test
    public void selectStudentByChoose() {
        Student student = new Student();
        student.setName("张");
        student.setId(2);
        List<Student> students = studentDao.selectStudentByChoose(student);
        System.out.println("students = " + students);
        sqlSession.close();
    }
    /**
     * 通过foreach动态SQL实现数据库的查找
     */
    @Test
    public void selectStudentByArray() {
        List<Student> students = studentDao.selectStudentByArray(new int[]{1, 3, 5});
        System.out.println(students);
    }
    /**
     * 通过sql复用动态SQL实现数据库的查找
     */
    @Test
    public void selectStudentByFragment() {
        Student student = studentDao.selectStudentByFragment(1);
        System.out.println(student);
    }

    /**
     * 通过if动态SQL实现数据库的修改
     */
    @Test
    public void updateStudentByIf() {
        Student student = new Student();
        student.setId(1);
        student.setName("noby1");
        boolean b = studentDao.updateStudentByIf(student);
        System.out.println(b);
        sqlSession.close();
    }

    /**
     * bind标签
     * 使用自己的类实现分页查询
     */
    @Test
    public void testSelectRangeBirthdayByEntity() {
        Page page = new Page();
        page.setPageNum(1);
        page.setPageSize(4);
        List<Student> students = studentDao.selectByPage(page);
        System.out.println("students = " + students);
        sqlSession.close();

    }

    /**
     * 通过实体引用转义字符
     */
    @Test
    public void selectStudentByLt() {
        List<Student> students = studentDao.selectStudentByLt();
        System.out.println("students = " + students);
    }

    /**
     * 通过Cdata区转义字符
     */
    @Test
    public void selectStudentByCdata() {
        List<Student> students = studentDao.selectStudentByCdata();
        System.out.println("students = " + students);
    }
}
```
