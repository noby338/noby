---
title: ELK
icon: write
category:
  - Linux
tags:
  - Linux
  - ELK
  - Elasticsearch
  - Logstash
  - Kibana
sticky: false
star: false
article: true
timeline: true
---
## elasticsearch

- 定义：Elasticsearch 是基于 JSON 的 DSL（Domain Specific Language）来定义查询。
1. Mysql：
  - 擅长事务类型操作，可以确保数据的安全和一致性
- Elasticsearch：
  - 擅长海量数据的搜索、分析、计算
  - 对查询性能要求较高的搜索需求

| **MySQL** | **Elasticsearch** | **说明**                                                                           |
| --------- | ----------------- | ---------------------------------------------------------------------------------- |
| Table     | Index             | 索引(index)，就是文档的集合，类似数据库的表(table)                                 |
| Row       | Document          | 文档（Document），就是一条条的数据，类似数据库中的行（Row），文档都是 JSON 格式    |
| Column    | Field             | 字段（Field），就是 JSON 文档中的字段，类似数据库中的列（Column）                  |
| Schema    | Mapping           | Mapping（映射）是索引中文档的约束，例如字段类型约束。类似数据库的表结构（Schema）  |
| SQL       | DSL               | DSL 是 elasticsearch 提供的 JSON 风格的请求语句，用来操作 elasticsearch，实现 CRUD |

### 安装

- es 安装成功在 plugin 目录中放入 ik 和 pinyin 插件，之后重启测试插件是否成功

```json
## 测试插件是否安装成功
POST /_analyze
{
  "text": ["如家酒店"],
  "analyzer": "pinyin"
}
POST /_analyze
{
  "text": ["如家酒店"],
  "analyzer": "ik_max_word"
}
```

### 索引库

- mapping 映射属性
  - type：字段数据类型，常见的简单类型有：
    - 字符串：text（可分词的文本）、keyword（精确值，例如：品牌、国家、ip 地址）、completion（可自动补全类型）
    - 数值：long、integer、short、byte、double、float、
    - 布尔：boolean
    - 日期：date
    - 对象：object
  - index：是否创建索引，默认为 true
  - analyzer：使用哪种分词器
  - properties：该字段的子字段

```json
{     
  "age": 21,     //类型为 integer；参与搜索，因此需要index为true；无需分词器
  "weight": 52.1,     //类型为float；参与搜索，因此需要index为true；无需分词器
  "isMarried": false,     //类型为boolean；参与搜索，因此需要index为true；无需分词器
  "info": "一个爱唱跳rap的阳光男孩", //类型为字符串，需要分词，因此是text；参与搜索，因此需要index为true；分词器可以用ik_smart
  "email": "noby@gmail.com", //类型为字符串，但是不需要分词，因此是keyword；不参与搜索，因此需要index为false；无需分词器
  "score": [99.1, 99.5, 98.9],     //虽然是数组，但是我们只看元素的类型，类型为float；参与搜索，因此需要index为true；无需分词器
  "name": {         //类型为object，需要定义多个子属性
    "firstName": "诺",         //类型为字符串，但是不需要分词，因此是keyword；参与搜索，因此需要index为true；无需分词器
    "lastName": "比"     //类型为字符串，但是不需要分词，因此是keyword；参与搜索，因此需要index为true；无需分词器
    }
}
```

```json


## 索引库操作
# 创建索引库
PUT /person
{
  "mappings": {
    "properties": {
      "info":{
        "type": "text",
        "analyzer": "ik_smart"
        },
      "email":{
        "type": "keyword",
        "index": "false"
        },
      "name":{
        "properties":{
          "firstName":{
            "type":"keyword"
          },
          "lastName": {
            "type": "keyword"
          }
        }
      }
    }
  }
}
# 查询索引库
GET /person
# 修改索引库，只能添加字段，不能修改和删除字段
PUT /person/_mapping
{
  "properties":{
    "age":{
      "type":"integer",
      "index": "false"
    }
  }
}
# 删除索引库
DELETE /person

```

### 文档

#### 文档的 curd

```json
## 文档操作
# 查询索引库的所有文档
GET /person/_search
# 查询文档
GET /person/_doc/1
GET /book/_doc/1?_source_includes=info,name
# 添加文档
POST /person/_doc/1
{
  "info": "一个爱唱跳rap的阳光男孩",
  "email": "noby@gmail.com",
  "name": {
      "firstName": "诺",
      "lastName": "比"
  }
}
# 添加文档,随机id
POST /person/_doc
{
  "info": "浑元形意太极门弟子",
  "email": "kace@gmail.com",
  "name": {
      "firstName": "凯",
      "lastName": "斯"
  }
}
# 添加文档，强制添加，不存在该文档添加有效，存在该文档则添加失败
POST /person/_doc/1/_create
{
  "info": "test"
}
#修改文档，增量修改，仅修改指定的字段
POST /person/_update/1
{
  "doc": {
    "name": {
        "firstName": "诺2",
        "lastName": "比"
    }
  }
}
# 修改文档，全量修改，当不存在该文档时创建，当存在该文档时全文覆盖
PUT /person/_doc/1
{
  "info": "一个爱唱跳rap的阳光男孩",
  "email": "noby@gmail.com",
  "name": {
      "firstName": "诺3",
      "lastName": "比"
  }
}
# 删除文档，根据id删除
DELETE /person/_doc/1


## 内置脚本painless的使用
POST /person/_doc/3
{
  "age": 1
}
POST /person/_doc/4
{
  "age": 10
}
GET /person/_doc/3
GET /person/_doc/4
# 通过脚本将指定文档的指定字段递增,ctx表示context上下文
POST /person/_doc/3/_update
{
   "script" : "ctx._source.age+=1"
}
# 通过脚本使所有文档的age字段乘以2后输出，并不修改原数据，只是输出
GET /person/_search
{
  "script_fields": {
    "my_doubled_field": {
      "script": {
        "lang": "expression",
        "source": "doc['age'] * multiplier",
        "params": {
          "multiplier": 2
        }
      }
    }
  }
}

```

#### 查询

- 查询的分类
  - match_all 查询所有
  - full text 全文检索：对用户的查询内容分词，然后到已经生成的倒排索引库中匹配
    - match
    - multi_match
  - 精确查询：根据精确词条值查找数据，一般为 keyword、数值、日期
    - ids
    - term
    - range
  - 地理查询（geo）
    - geo_distance
    - geo_bounding_box
  - 复合查询（compound）：将上述查询组合
    - bool
    - function_score

##### 简单查询

```json
GET /hotel
## 简单查询
# 查询所有
GET /hotel/_search
{
  "query": {
    "match_all": {}
  }
}

# 全文检索查询，match,对内容分词后查询
GET /hotel/_search
{
  "query": {
    "match": {
      "name": "如家外滩"
    }
  }
}

# 全文检索查询，multi_match,对内容分词后查询
GET /hotel/_search
{
  "query": {
    "multi_match": {
      "query": "如家外滩" ,
      "fields": ["brand","name","business"]
    }
  }
}

# 精确查询，ids，根据id精确值查询
GET /hotel/_search
{
  "query": {
    "ids": {
      "values": [432335,36934]
    }
  }
}

# 精确查询，term，根据词条精确值查询
GET /hotel/_search
{
  "query": {
    "term": {
      "city": {
        "value": "上海"
      }
    }
  }
}

# 精确查询，range，根据词条范围值查询
GET /hotel/_search
{
  "query": {
    "range": {
      "price": {
        "gte": 100,
        "lte": 200
      }
    }
  }
}

# 精确查询，geo_distance，指定中心点小于某个距离值的所有文档
GET /hotel/_search
{
  "query": {
    "geo_distance": {
      "distance": "5km",
      "location": "31.21,121.5"
    }
  }
}
```

##### 复合查询

function score 查询中包含四部分内容：

- 原始查询条件：query 部分，基于这个条件搜索文档，并且基于 BM25 算法给文档打分，原始算分（query score)
- 过滤条件：filter 部分，符合该条件的文档才会重新算分
- 算分函数：符合 filter 条件的文档要根据这个函数做运算，得到的函数算分（function score），有四种函数
  - weight：函数结果是常量
  - field_value_factor：以文档中的某个字段值作为函数结果
  - random_score：以随机数作为函数结果
  - script_score：自定义算分函数算法
- 运算模式：算分函数的结果、原始查询的相关性算分，两者之间的运算方式，包括：
  - multiply：相乘
  - replace：用 function score 替换 query score
  - 其它，例如：sum、avg、max、min

boolean 复合查询是一个或多个查询子句的组合，每一个子句就是一个子查询。子查询的组合方式有：

- must：必须匹配每个子查询，类似“与”
- should：选择性匹配子查询，类似“或”
- must_not：必须不匹配，不参与算分，类似“非”
- filter：必须匹配，不参与算分

```json
## 复合查询
# function_score复合查询，query为查询的结果，functions为算分函数，boost_mode为加权模式
GET /hotel/_search
{
  "query": {
    "function_score": {
      "query": {
        "match": {
          "all": "外滩"
        }
      },
      "functions": [
        {
          "filter": {
            "term": {
              "brand": "如家"
            }
          },
          "weight": 10
        }
      ],
      "boost_mode": "sum"
    }
  }
}

# boolean复合查询，搜索名字包含“如家”，价格不高于400，在坐标31.21,121.5周围10km范围内的酒店。
GET /hotel/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "name": "如家"
          }
        }
      ],
      "must_not": [
        {
          "range": {
            "price": {
              "gt" :400
            }
          }
        }
      ],
      "filter": [
        {
          "geo_distance": {
            "distance": "10km",
            "location": {
              "lat": 31.21,
              "lon": 121.5
            }
          }
        }
      ]
    }
  }
}


```

##### 搜索结果的处理

```json
## 结果排序，排序后所有的结果分数都是null
# sort排序，先按照评分降序，再按价格升序
GET /hotel/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "score": "desc"
    },
    {
      "price": "asc"
    }
  ]
}
# sort排序，按照到 121.6122,31.0346 位置的举例排序
GET /hotel/_search
{
  "query" : {
    "match_all": {}
  },
  "sort": [
    {
      "_geo_distance": {
        "location": {
          "lat": 31.0346,
          "lon": 121.6122
        },
        "order": "asc",
        "unit": "km"
      }
    }
  ]
}

## 结果分页
GET /hotel/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "price": "asc"
    }
  ],
  "from": 0,
  "size": 5
}

# 结果高亮。查询条件，高亮一定要使用全文检索查询。默认情况下，高亮的字段，必须与搜索指定的字段一致，否则无法高亮。如果要对非搜索字段高亮，则需要添加一个属性：required_field_match=false
GET /hotel/_search
{
  "query": {
    "match": {
      "all": "如家"
    }
  },
  "highlight": {
    "fields": {
      "name": {
        "require_field_match": "false"
      }
    }
  }
}
```

#### 聚合

聚合常见的有三类：

- 桶（Bucket）聚合：用来对文档做分组
  - TermAggregation：按照文档字段值分组，例如按照品牌值分组、按照国家分组
  - Date Histogram：按照日期阶梯分组，例如一周为一组，或者一月为一组
- 度量（Metric）聚合：用以计算一些值，比如：最大值、最小值、平均值等
  - Avg：求平均值
  - Max：求最大值
  - Min：求最小值
  - Stats：同时求 max、min、avg、sum 等
- 管道（pipeline）聚合：其它聚合的结果为基础做聚合

> 注意：参加聚合的字段必须是 keyword、日期、数值、布尔类型

```json
## 聚合
# 桶聚合，按照品牌名称聚合查询，聚合的三要素是聚合名称、聚合类型、聚合字段，size为指定显式文档的条数
GET /hotel/_search
{
  "size": 0,
  "aggs": {
    "brandAgg": {
      "terms": {
        "field": "brand",
        "size": 10
      }
    }
  }
}

# 桶聚合，设置桶的排序字段和排序方式
GET /hotel/_search
{
  "size": 0,
  "aggs": {
    "brandAgg": {
      "terms": {
        "field": "brand",
        "size": 10,
        "order": {
          "_count": "asc"
        }
      }
    }
  }
}


# 桶聚合，限定聚合范围
GET /hotel/_search
{
  "query": {
    "range": {
      "price": {
        "lte": 200
      }
    }
  },
  "size": 0,
  "aggs": {
    "brandAgg": {
      "terms": {
        "field": "brand",
        "size": 10,
        "order": {
          "_count": "asc"
        }
      }
    }
  }
}

# 度量聚合，stats，在桶聚合中的嵌套聚合
GET /hotel/_search
{
  "size": 0,
  "aggs": {
    "brandAgg": {
      "terms": {
        "field": "brand",
        "size": 10
      },
      "aggs": {
        "scoreAgg": {
          "stats": {
            "field": "score"
          }
        }
      }
    }
  }
}

# 嵌套聚合，根据平均值排序
GET /hotel/_search
{
  "size": 0,
  "aggs": {
    "brandAgg": {
      "terms": {
        "field": "brand",
        "size": 10,
        "order": {
          "scoreAgg.avg": "desc"
        }
      },
      "aggs": {
        "scoreAgg": {
          "stats": {
            "field": "score"
          }
        }
      }
    }
  }
}


```

#### 分词

- 分词执行的三个过程
  - character filters
    - 做删除多余字符、替换字符等处理
  - tokenizer
    - 将文本按照一定的规则切割成词条。例如 keyword、ik_smart
  - tokenizer filter
    - 将 tokenizer 处理后的文本进行大小写转换、同义词处理、拼音处理（pinyin 插件）等

```json
## 测试插件是否安装成功
POST /_analyze
{
  "text": ["如家酒店"],
  "analyzer": "pinyin"
}
POST /_analyze
{
  "text": ["如家酒店"],
  "analyzer": "ik_max_word"
}


## 声明自定义分词器，analyzer自定义分词器，自定义tokenizer filter，mapping中的analyzer表示添加文档的时候使用的分词器，search_analyzer表示搜索的时候使用的分词器
PUT /test
{
  "settings": {
    "analysis": {
      "analyzer": {
        "my_analyzer": {
          "tokenizer": "ik_max_word",
          "filter": "py"
        }
      },
      "filter": {
        "py": {
          "type": "pinyin",
		      "keep_full_pinyin": false,
          "keep_joined_full_pinyin": true,
          "keep_original": true,
          "limit_first_letter_length": 16,
          "remove_duplicated_term": true,
          "none_chinese_pinyin_tokenize": false
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "analyzer": "my_analyzer",
        "search_analyzer": "ik_smart"
      }
    }
  }
}

# 自定义分词器测试
POST /test/_analyze
{
  "text": ["如家酒店还不错"],
  "analyzer": "my_analyzer"
}

# 当搜索和添加都使用拼音，添加同音词语存在的问题，删除上一个索引库中的"search_analyzer":"ik_smart"会出现问题，搜索的狮子而会出现虱子。因此拼音分词器只适合在创建倒排索引的时候使用，而在搜索的时候不适用。
POST /test/_doc/1
{
  "id":1,
  "name":"狮子"
}
POST /test/_doc/2
{
  "id":2,
  "name":"虱子"
}
GET /test/_search
{
  "query": {
    "match_all": {}
  }
}
GET /test/_search
{
  "query": {
    "match": {
      "name": "掉入狮子笼怎么办？"
    }
  }
}
```

#### 自动补全

- 使用自动补全功能的字段必须是 completion 类型
- 字段的内容一般是用来补全的多个词条形成的数组

```json
## 自动补全
# 创建索引库，使用自动补全功能的字段必须是 completion 类型，字段的内容一般是用来补全的多个词条形成的数组
PUT test2
{
  "mappings": {
    "properties": {
      "title":{
        "type": "completion"
      }
    }
  }
}
# 示例数据
POST test2/_doc
{
  "title": ["Sony", "WH-1000XM3"]
}
POST test2/_doc
{
  "title": ["SK-II", "PITERA"]
}
POST test2/_doc
{
  "title": ["Nintendo", "switch"]
}
# 自动补全查询
GET /test2/_search
{
  "suggest": {
    "title_suggest": {
      "text": "s",
      "completion": {
        "field": "title",
        "skip_duplicates": true,
        "size": 10
      }
    }
  }
}
```

#### 集群

```json
# 查看集群中的索引
GET /_cat/indices?v
# 查看集群的健康状况
GET /_cat/health?v
```
