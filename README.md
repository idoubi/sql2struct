# SQL2Struct

> SQL2Struct是一款对golang开发者友好的chrome插件，根据在mysql中创建数据表的sql语句，自动生成golang中的struct，在golang开发者使用诸如gorm之类的框架时，可以很好的把mysql中的数据表与orm的结构体关联起来。

## 使用说明

1. 下载扩展源码

```shell
git clone https://github.com/idoubi/sql2struct.git
```

2. 安装扩展

Chrome浏览器地址栏输入`chrome://extensions/`进入扩展程序管理中心，
点击“加载已解压的扩展程序”，通过源码进行安装。

![](http://blogcdn.idoustudio.com/sql2struct1.png)

3. 在mysql中获取生成数据表的sql语句

```sql
show create table system_user\G;
```

4. 进入插件主页面，把上一步得到的sql语句粘贴至左侧的输入框

5. 复制右侧生成的struct，粘贴至golang代码中即可

![](http://blogcdn.idoustudio.com/sql2struct2.png)

## 配置说明

目前只有三个配置项

- gorm：开启此配置项，则生成struct的时候，每个字段都会包含类似`gorm:column:"id"`这样的信息。
- sqlx：开启此配置项，则生成struct的时候，每个字段都会包含类似`db:column:"id"`这样的信息。
- xorm：开启此配置项，则生成struct的时候，每个字段都会包含类似`xorm:"id"`这样的信息。
- json：开启此配置项，则生成struct的时候，每个字段都会包含类似`json:"id"`这样的信息。
- typeMap：此配置项定义mysql数据表字段类型与go字段类型的映射关系，在数据解析的时候会按照配置的映射关系进行结构体生成。

typeMap默认的映射关系为：

```json
{
    "tinyint": "int64",
    "smallint": "int64",
    "int": "int64",
    "mediumint": "int64",
    "bigint": "int64",
    "float": "float64",
    "double": "float64",
    "decimal": "float64",
    "char": "string",
    "varchar": "string",
    "text": "string",
    "mediumtext": "string",
    "longtext": "string",
    "time": "time.Time",
    "date": "time.Time",
    "datetime": "time.Time",
    "timestramp": "int64",
    "enum": "string",
    "set": "string",
    "blob": "string"
}
```

![](http://qiniu.idoubi.cc/options)

## Todolist

- [ ] 支持更多的mysql类型与go类型的映射
- [ ] 支持自定义要进行转换的字段配置
- [ ] 正则表达式优化
- [ ] 数据表名称复数形式与struct名称单数形式转换
- [ ] 增加主键、索引转换支持

## Contribution

欢迎fork代码、提issue或者是pull request

