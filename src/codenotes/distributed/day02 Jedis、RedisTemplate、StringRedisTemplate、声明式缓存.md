---
title: day02 Jedis、RedisTemplate、StringRedisTemplate、声明式缓存
icon: write
category:
    - Distributed
tag:
    - Distributed
sticky: false
star: false
article: true
timeline: true
---

## Jedis

```java
package priv.noby.redis;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.util.Map;
/**
 * jedis 的使用(java 使用 redis 的原生用法)
 */@SpringBootTest
class RedisAPITests {
    /**
     * jedis 的基本使用
     */
    @Test
    void redis() {
        Jedis jedis = new Jedis("192.168.122.128", 6379);
        jedis.auth("123");
        jedis.set("str", "info");
        String str = jedis.get("str");
        System.out.println("str = " + str);

        jedis.hset("hash", "h1", "1");
        jedis.hset("hash", "h2", "2");
        jedis.hset("hash", "h3", "3");
        Map<String, String> hash = jedis.hgetAll("hash");
        System.out.println("hash = " + hash);

        System.out.println(jedis.keys("*"));

        jedis.close();

    }

    /**
     * jedis 配置连接池
     */
    @Test
    void redis2() {
        //连接池配置
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxTotal(50);//设置最大连接数
        jedisPoolConfig.setMaxIdle(10);//设置最大空闲
        //连接池对象
        //final GenericObjectPooLConfig pooLConfig,连接池配置
        //final String host,int port,主机端口
        //int timeout, final String password 等待时间密码
        JedisPool jedisPooL = new JedisPool(jedisPoolConfig, "192.168.122.128", 6379, 2000, "123");
        Jedis jedis = jedisPooL.getResource();
        jedis.set("pool", "info");
        String pool = jedis.get("pool");
        System.out.println("pool = " + pool);
        jedis.close();
    }
}
```

## StringRedisTemplate,RedisTemplate

```java
package priv.noby.redis;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.*;
import priv.noby.redis.entity.Student;

import java.time.Duration;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * Springboot 整合 Redis 的使用
 */
@SpringBootTest
class RedisSpringbootTests {
    @Autowired
    StringRedisTemplate stringRedisTemplate;
    @Autowired
    RedisTemplate<String, Object> redisTemplate;

    /**
     * stringRedisTemplate 配合 objectMapper 类序列化和反序列化的基本使用
     */
    @Test
    void stringRedisTemplate() throws JsonProcessingException {
        ValueOperations<String, String> forValue = stringRedisTemplate.opsForValue();
        HashOperations<String, Object, Object> forHash = stringRedisTemplate.opsForHash();
        ListOperations<String, String> forList = stringRedisTemplate.opsForList();
        SetOperations<String, String> forSet = stringRedisTemplate.opsForSet();
        ZSetOperations<String, String> forZSet = stringRedisTemplate.opsForZSet();
        Student noby = new Student("noby", 20, true);
        ObjectMapper objectMapper = new ObjectMapper();
        //String 类型的 redis 数据类型存储对象需要将对象序列化为 json        forValue.set("nobyJson", objectMapper.writeValueAsString(noby));
        //反序列化
        Student nobyJson = objectMapper.readValue(forValue.get("nobyJson"), Student.class);
        System.out.println("nobyJson = " + nobyJson);
    }

    /**
     * redisTemplate 配合配置类指定数据类型修改序列化器的基本使用
     */
    @Test
    void redisTemplate() {
        ValueOperations<String, Object> forValue = redisTemplate.opsForValue();
        HashOperations<String, Object, Object> forHash = redisTemplate.opsForHash();
        ListOperations<String, Object> forList = redisTemplate.opsForList();
        SetOperations<String, Object> forSet = redisTemplate.opsForSet();
        ZSetOperations<String, Object> forZSet = redisTemplate.opsForZSet();
        Student kace = new Student("kace", 21, true);
        forValue.set("kace", kace);
        Student kace1 = (Student) forValue.get("kace");
        System.out.println("kace1 = " + kace1);
    }

    /**
     * redisTemplate 中的常用 API
     */    @Test
    void redisTemplateAPI() {
        ValueOperations<String, Object> forValue = redisTemplate.opsForValue();
        forValue.set("a", "aa");
        System.out.println("redisTemplate.hasKey(\"a\") = " +
                redisTemplate.hasKey("a"));
        System.out.println("redisTemplate.getExpire(\"a\") = " + redisTemplate.getExpire("a"));
        System.out.println("redisTemplate.expire(\"a\", 30, TimeUnit.SECONDS) = " +
                redisTemplate.expire("a", 30, TimeUnit.SECONDS));
        System.out.println("redisTemplate.delete(\"a\") = " +
                redisTemplate.delete("a"));
        System.out.println("redisTemplate.keys(\"*\") = " +
                redisTemplate.keys("*"));
        System.out.println("redisTemplate.countExistingKeys(redisTemplate.keys(\"*\")) = " +
                redisTemplate.countExistingKeys(redisTemplate.keys("*")));
    }

    /**
     * redisTemplate 中的 String 的使用
     */
    @Test
    void redisTemplateString() {
        ValueOperations<String, Object> opsForValue = redisTemplate.opsForValue();
        //String
        Student s1 = new Student(1, "noby", 20, true);
        Student s2 = new Student(2, "kace", 21, true);
        //存入的时候指定过期时间
        opsForValue.set("student:" + s1.getId(), s1, Duration.ofMinutes(30));
        opsForValue.set("student:" + s2.getId(), s2, 1000, TimeUnit.SECONDS);
        System.out.println("redisTemplate.getExpire(\"student:\"+s1.getId()) = " +
                redisTemplate.getExpire("student:" + s1.getId()));
        System.out.println("redisTemplate.getExpire(\"student:\"+s2.getId()) = " +
                redisTemplate.getExpire("student:" + s2.getId()));
        //存在才能添加 XX        System.out.println("opsForValue.setIfPresent(\"student:\"+s1.getId(), s1) = " +
                opsForValue.setIfPresent("student:" + s1.getId(), s1));
        //不存在才能添加 NX        System.out.println("opsForValue.setIfAbsent(\"student:\"+s1.getId(), s1) = " +
                opsForValue.setIfAbsent("student:" + s1.getId(), s1));

        //自增
        opsForValue.increment("num", 2);
        System.out.println("opsForValue.get(\"num\") = " +
                opsForValue.get("num"));
        opsForValue.set("num2", 1);
        System.out.println("opsForValue.increment(\"num2\",3) = " +
                opsForValue.increment("num2", 3));
    }

    /**
     * redisTemplate 中的 Hash 的使用
     */
    @Test
    void redisTemplateHash() {
        HashOperations<String, Object, Object> opsForHash = redisTemplate.opsForHash();
        //hash 的存值
        opsForHash.put("h", "age1", 11);
        opsForHash.put("h2", "name", "zs");
        opsForHash.put("h2", "age", "11");
        //hget
        System.out.println("opsForHash.get(\"h2\",\"name\") = " + opsForHash.get("h2", "name"));
        System.out.println("opsForHash.get(\"h2\",\"age\") = " + opsForHash.get("h2", "age"));
        //hkeys
        System.out.println("opsForHash.keys(\"h2\") = " + opsForHash.keys("h2"));
        //hvals
        System.out.println("opsForHash.values(\"h2\") = " + opsForHash.values("h2"));
        //hgetall
        System.out.println("opsForHash.entries(\"h2\") = " + opsForHash.entries("h2"));
        //hash 的自增
        System.out.println("opsForHash.increment(\"h\", \"age1\", 1) = " + opsForHash.increment("h", "age1", 1));
    }

    /**
     * redisTemplate 中的 List 的使用
     */
    @Test
    void redisTemplateList() {
        ListOperations<String, Object> opsForList = redisTemplate.opsForList();
        opsForList.rightPushAll("list", "a", "b", "c", "d");
        opsForList.leftPush("list", "0");
        opsForList.rightPush("list", "1");
        //lrange 遍历后 list 还在
        System.out.println("opsForList.range(\"list\", 0, -1) = " + opsForList.range("list", 0, -1));
        //opsForList.range("list", 0, -1) = [0, a, b, c, d, 1]
        Object str;
        //Pop 弹出后 list 删除
        while ((str = opsForList.leftPop("list")) != null) {
            System.out.println("str = " + str);
        }
    }

    /**
     * redisTemplate 中的 Set 的使用
     */
    @Test
    void redisTemplateSet() {
        SetOperations<String, Object> opsForSet = redisTemplate.opsForSet();
        opsForSet.add("s1", "a", "b", "c", "d");
        opsForSet.add("s2", "e", "f", "c", "d");
        System.out.println("opsForSet.members(\"s1\") = " +
                opsForSet.members("s1"));
        System.out.println("opsForSet.members(\"s2\") = " +
                opsForSet.members("s2"));
        System.out.println("opsForSet.isMember(\"s1\", \"0\") = " +
                opsForSet.isMember("s1", "0"));
        //s1 - s2
        System.out.println("opsForSet.difference(\"s1\", \"s2\") = " +
                opsForSet.difference("s1", "s2"));
        System.out.println("opsForSet.differenceAndStore(\"s1\", \"s2\", \"s3\") = " +
                opsForSet.differenceAndStore("s1", "s2", "s3"));
        System.out.println("opsForSet.members(\"s3\") = " +
                opsForSet.members("s3"));
        //s1 + s2
        System.out.println("opsForSet.union(\"s1\",\"s2\") = " +
                opsForSet.union("s1", "s2"));
        //s1 * s2
        System.out.println("opsForSet.intersect(\"s1\",\"s2\") = " +
                opsForSet.intersect("s1", "s2"));
        //随机数
        System.out.println("opsForSet.randomMember(\"s1\") = " +
                opsForSet.randomMember("s1"));
        System.out.println("opsForSet.randomMembers(\"s1\",2) = " +
                opsForSet.randomMembers("s1", 2));
        //随机 pop        System.out.println("opsForSet.pop(\"s1\") = " +
                opsForSet.pop("s1"));
        System.out.println("opsForSet.pop(\"s2\",2) = " +
                opsForSet.pop("s2", 2));
    }

    /**
     * redisTemplate 中的 ZSet 的使用
     */
    @Test
    void redisTemplateZSet() {
        ZSetOperations<String, Object> opsForZSet = redisTemplate.opsForZSet();
        //zadd
        opsForZSet.add("z", "zs", 80);
        opsForZSet.add("z", "ls", 70);
        opsForZSet.add("z", "ww", 90);
        //zrange
        Set<Object> z = opsForZSet.range("z", 0, -1);
        System.out.println("z = " + z);
        //withscores
        Set<ZSetOperations.TypedTuple<Object>> zRangeWithScores = opsForZSet.rangeWithScores("z", 0, -1);
        for(ZSetOperations.TypedTuple<Object> tuple : zRangeWithScores){
            System.out.printf("zRangeWithScores %s:%s",tuple.getValue(),tuple.getScore());
            System.out.println();
        }
    }

}
```

```java
package priv.noby.redis.configuration;

import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.RedisSerializer;


@Configuration
public class RedisConfiguration {
    /**
     * 修改默认的序列化为 json 序列化
     * <String, Object> 为自定义
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate();
        template.setConnectionFactory(redisConnectionFactory);
        //统一修改数据类型序列化器
//        template.setDefaultSerializer(RedisSerializer.json());

        //指定数据类型修改序列化器
        template.setKeySerializer(RedisSerializer.string());
        template.setValueSerializer(RedisSerializer.json());
        template.setHashKeySerializer(RedisSerializer.string());
        template.setHashValueSerializer(RedisSerializer.json());
        return template;
    }

    /**
     * 修改 spring 声明式缓存的序列化方式
     */
    @Bean
    public RedisCacheConfiguration redisCacheConfiguration() {
        RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig();
        //修改默认的序列化器，变双冒号为单冒号
        redisCacheConfiguration = redisCacheConfiguration.
                serializeKeysWith(
                        RedisSerializationContext.SerializationPair.
                                fromSerializer(RedisSerializer.string())).
                serializeValuesWith(
                        RedisSerializationContext.SerializationPair.
                                fromSerializer(RedisSerializer.json())
                );
        return redisCacheConfiguration;
    }

    /**
     * 分布式锁
     */
    @Bean
    public RedissonClient redissonClient(){
        Config config=new Config();
        config.useSingleServer()
                .setAddress("redis://192.168.122.128:6379")
                .setPassword("123");
        return Redisson.create(config);
    }
}
```

## 声明式缓存

### service

```java
package priv.noby.redis2.service.impl;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import priv.noby.redis2.dao.StudentDao;
import priv.noby.redis2.entity.Student;
import priv.noby.redis2.service.StudentService;

import javax.annotation.Resource;

/**
 * (Student)表服务实现类
 *
 * @author Noby
 * @since 2022-11-11 21:48:40
 *///统一指定该service的所有缓存名(在未@Cacheable中未指定value的情况下)
//@CacheConfig(cacheNames = "student")
@Service("studentService")
public class StudentServiceImpl implements StudentService {
    @Resource
    private StudentDao studentDao;

    /**
     * 通过ID查询单条数据
     *
     * value 为缓存名(为固定值)，和key组合成为整体的Redis中的key
     * key 为缓存名(为请求中的变动值)，和value组成为整体的Redis中的key
     * condition 表示满足条件的使用缓存，否则使用数据库
     *
     * @param id 主键
     * @return 实例对象
     */
    //    @Cacheable(key = "#id", condition = "#id>3")
    @Cacheable(value = "student:id", key = "#id", condition = "#id>3")
    @Override
    public Student queryById(Integer id) {
        return this.studentDao.queryById(id);
    }

    /**
     * 分页查询
     * 再次演示key的作用
     * 来自请求参数student中的gender
     * 通过配置类指定该缓存的ttl
     *     * @param student 筛选条件
     * @param pageRequest      分页对象
     * @return 查询结果
     */
    @Cacheable(value = "student:gender", key = "#student.gender")
    @Override
    public Page<Student> queryByPage(Student student, PageRequest pageRequest) {
        long total = this.studentDao.count(student);
        return new PageImpl<>(this.studentDao.queryAllByLimit(student, pageRequest), pageRequest, total);
    }

    /**
     * 新增数据
     * 将返回的值传入缓存
     * mybatis已经将插入时的生成的参数id返回给了student对象
     *
     * @param student 实例对象
     * @return 实例对象
     */
    @CachePut(value = "student:id", key = "#student.id")
    @Override
    public Student insert(Student student) {
        this.studentDao.insert(student);
        return student;
    }

    /**
     * 修改数据
     *
     * @param student 实例对象
     * @return 实例对象
     */
    @CachePut(value = "student:id", key = "#student.id")
    @Override
    public Student update(Student student) {
        this.studentDao.update(student);
        return this.queryById(student.getId());
    }

    /**
     * 通过主键删除数据
     * beforeInvocation:默认值false：在主业务执行之后执行,true在主业务之前执行
     *
     * @param id 主键
     * @return 是否成功
     */
    @CacheEvict(value = "student:id",key = "#id",beforeInvocation = true)
    @Override
    public boolean deleteById(Integer id) {
        return this.studentDao.deleteById(id) > 0;
    }
}
```

### test

```java
package priv.noby.redis2.service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import priv.noby.redis2.entity.Student;

import javax.annotation.Resource;

/**
 * @author Noby
 * @since 2022/11/11
 */@SpringBootTest
class StudentServiceTest {
    @Resource
    StudentService studentService;

    @Test
    void queryById() {
        System.out.println("第一次查询");
        System.out.println("studentService.queryById(4) = " + studentService.queryById(4));
        System.out.println("第二次查询");
        System.out.println("studentService.queryById(4) = " + studentService.queryById(4));
    }

    /**
     * 不满足 condition 条件直接去数据库查询
     */
    @Test
    void queryById2() {
        System.out.println("第一次查询");
        System.out.println("studentService.queryById(1) = " + studentService.queryById(1));
        System.out.println("第二次查询");
        System.out.println("studentService.queryById(1) = " + studentService.queryById(1));
    }

    /**
     * 条件查询
     * 通过配置类设置该缓存的ttl
     */    @Test
    void queryByPage() {
        Student student = new Student();
        student.setGender(1);
        Page<Student> students = studentService.queryByPage(student, PageRequest.of(1, 3));
        System.out.println("students = " + students.getContent());
    }

    /**
     * 添加操作
     */
    @Test
    void insert() {
        Student student = new Student();
        student.setName("新增的学生");
        student.setAge(20);        student.setGender(1);
        Student insert = studentService.insert(student);
        System.out.println("insert = " + insert);
    }

    /**
     * 修改操作
     */
    @Test
    void update() {
        Student student = new Student();
        student.setName("修改后的学生");
        student.setId(31);
        Student update = studentService.update(student);
        System.out.println("update = " + update);
    }

    /**
     * 删除操作
     *
     */    @Test
    void delete() {
        boolean b = studentService.deleteById(31);
        System.out.println("b = " + b);
    }
}
```

```yml
server:
  port: 8080

logging:
  level:
    priv:
      noby:
        redis2: debug

mybatis:
  type-aliases-package: priv.noby.redis2.entity
  mapper-locations: classpath:/mapper/*Dao.xml

spring:
  application:
    name: redis2
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost/note?serverTimezone=UTC
    username: root
    password: 123
    druid:
#      max-active: 1
#      initial-size: 1
#      min-idle: 1
#      max-wait: 50
      max-active: 50
      initial-size: 10
      min-idle: 10
      max-wait: 100000
  redis:
    host: 192.168.122.128
    port: 6379
    database: 0
    password: 123
    jedis: #  连接池
      pool:
        max-idle: 10
        max-active: 50
```
