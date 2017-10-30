# SQL2Struct

> SQL2Struct是一款对golang开发者友好的chrome插件，根据在mysql中创建数据表的sql语句，自动生成golang中的struct，在golang开发者使用诸如gorm之类的框架时，可以很好的把mysql中的数据表与orm的结构体关联起来。

## 使用说明

1. 下载chrome扩展文件：[点击下载](http://qiniu.idoubi.cc/sql2struct.crx)

2. 安装扩展

![](http://qiniu.idoubi.cc/install.png)

3. 在mysql中获取生成数据表的sql语句


`show create table users\G;`

![](http://qiniu.idoubi.cc/Sql.png)

4. 进入插件主页面，把上一步得到的sql语句粘贴至左侧的输入框

5. 复制右侧生成的struct，粘贴至golang代码中即可

![](http://qiniu.idoubi.cc/plugin)

## 配置说明

目前只有三个配置项

- gorm：开启此配置项，则生成struct的时候，每个字段都会包含类似`gorm:column:"id"`这样的信息。
- json：开启此配置项，则生成struct的时候，每个字段都会包含类似`json:"id"`这样的信息。
- typeMap：此配置项定义mysql数据表字段类型与go字段类型的映射关系，在数据解析的时候会安装配置的映射关系进行结构体生成。

![](http://qiniu.idoubi.cc/options)

## Todolist

- [ ] 支持更多的mysql类型与go类型的映射
- [ ] 支持自定义要进行转换的字段配置
- [ ] 正则表达式优化
- [ ] 数据表名称复数形式与struct名称单数形式转换

## Contribution

欢迎fork代码、提issue或者是pull request

