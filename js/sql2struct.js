new Vue({
    el: '#app',
    data() {
        return {
            cache: null,
            sqlContent: '',
            structContent: '',
            activeIndex: '1',
            typeMap: getTypeMap(),
            typeMapStr: '',
            useGorm: true,
            useSqlx: true,
            useJson: true,
            useForm: true,
            dialogFormVisible: false
        }
    },
    created() {
        var message = {
            act: 'getOptions'
        }
        var that = this
        // 获取缓存数据
        chrome.runtime.sendMessage(message, function(res) {
            if (!res) { // 不存在缓存数据
                // 初始配置数据
                var data = {
                    useGorm: that.useGorm,
                    useSqlx: that.useSqlx,
                    useJson: that.useJson,
                    useForm: that.useForm,
                    typeMap: that.typeMap
                }
                that.setCache(data)
                for (var k in that.typeMap) {
                    that.typeMapStr += k + ': ' + that.typeMap[k] + '\n'
                }
                return
            }
            var obj = JSON.parse(res)
            if (obj.useGorm != undefined) {
                that.useGorm = obj.useGorm
            }
            if (obj.useSqlx != undefined) {
                that.useSqlx = obj.useSqlx
            }
            if (obj.useJson != undefined) {
                that.useJson = obj.useJson
            }
            if (obj.useForm != undefined) {
                that.useForm = obj.useForm
            }
            if (obj.typeMap != undefined) {
                that.typeMap = obj.typeMap
                for (var k in obj.typeMap) {
                    that.typeMapStr += k + ': ' + obj.typeMap[k] + '\n'
                }
            }
        })
    },
    watch: {
        sqlContent(val) {
            if (!val) {
                this.structContent = ''
                return
            }
            var res = val.match(/\`[\w_]+\`\s+[\w_\(\)]+(\s+|\,)/g)
            if (!res) {
                this.structContent = 'invalid sql'
                return
            }
            var types = this.typeMap
            var structResult = 'type '
            for (var i = 0, len = res.length; i < len; i++) {
                var field = res[i].match(/\`(.+)\`\s+(tinyint|smallint|int|mediumint|bigint|float|double|decimal|varchar|char|text|mediumtext|longtext|datetime|time|date|enum|set|blob)?/)
                if (i == 0) {   // 第一个字段为数据表名称
                    if (field && field[1] != undefined && field[2] == undefined) {
                        var tbName = titleCase(field[1])
                        structResult += tbName + ' struct {'
                        continue
                    } else {
                        return
                    }
                } else {  // 数据表字段
                    if (field && field[1] != undefined && field[2] != undefined) {
                        if (types[field[2]] != undefined) {
                            var fieldName = titleCase(field[1])
                            var fieldType = types[field[2]]
                            var fieldJsonName = field[1].toLowerCase()
                            if (fieldName.toLowerCase() == 'id') {
                                fieldName = 'ID'
                            }
                            structResult += '\n\t' + fieldName + ' ' + fieldType + ' '
                            structArr = []
                            if (this.useGorm) {
                                structArr.push('gorm:"column:'+ fieldJsonName +'"')
                            }
                            if (this.useSqlx) {
                                structArr.push('db:"column:'+ fieldJsonName +'"')
                            }
                            if (this.useJson) {
                                structArr.push('json:"' + fieldJsonName + '"')
                            }
                            if (this.useForm) {
                                structArr.push('form:"' + fieldJsonName + '"')
                            }
                            if (structArr.length > 0) {
                                structResult += '`'+structArr.join(' ')+'`'
                            }
                        } else {
                            continue
                        }
                    } else {
                        continue
                    }
                }
            }
            structResult += '\n}'
            this.structContent = structResult
        },
        typeMapStr(val) {
            var typeArr = val.split('\n')
            var typeMap = {}
            for (var i = 0, len = typeArr.length; i < len; i++) {
                var itemArr = typeArr[i].split(/\:\s+/)
                if (itemArr[0] != undefined && itemArr[1] != undefined) {
                    typeMap[itemArr[0]] = itemArr[1]
                }
            }
            this.typeMap = typeMap
            var data = {
                useGorm: this.useGorm,
                useSqlx: this.useSqlx,
                useJson: this.useJson,
                useForm: this.useForm,
                typeMap: this.typeMap
            }
            this.setCache(data)
        },
        useGorm(val) {
            this.useGorm = val
            var data = {
                useGorm: this.useGorm,
                useSqlx: this.useSqlx,
                useJson: this.useJson,
                useForm: this.useForm,
                typeMap: this.typeMap
            }
            this.setCache(data)
        },
        useSqlx(val) {
            this.useSqlx = val
            var data = {
                useGorm: this.useGorm,
                useSqlx: this.useSqlx,
                useJson: this.useJson,
                useForm: this.useForm,
                typeMap: this.typeMap
            }
            this.setCache(data)
        },
        useJson(val) {
            this.useJson = val
            var data = {
                useGorm: this.useGorm,
                useSqlx: this.useSqlx,
                useJson: this.useJson,
                useForm: this.useForm,
                typeMap: this.typeMap
            }
            this.setCache(data)
        },
        useForm(val) {
            this.useForm = val
            var data = {
                useGorm: this.useGorm,
                useSqlx: this.useSqlx,
                useJson: this.useJson,
                useForm: this.useForm,
                typeMap: this.typeMap
            }
            this.setCache(data)
        }
    },
    methods: {
      handleSelect(key, keyPath) {
        
      },
      setCache(data) {
        var message = {
            act: 'setOptions',
            data: JSON.stringify(data)
        }
        chrome.runtime.sendMessage(message, function(res) {
            //console.log(res)
        })
      }
    }
})

// 首字母大写
function titleCase(str) {

  var array = str.toLowerCase().split("_");
  for (var i = 0; i < array.length; i++){
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  var string = array.join("");

  return string;
}

// 类型映射
function getTypeMap() {
    return {
        'tinyint': 'int64',
        'smallint': 'int64',
        'int': 'int64',
        'mediumint': 'int64',
        'bigint': 'int64',
        'float': 'float64',
        'double': 'float64',
        'decimal': 'float64',
        'char': 'string',
        'varchar': 'string',
        'text': 'string',
        'mediumtext': 'string',
        'longtext': 'string',
        'time': 'time.Time',
        'date': 'time.Time',
        'datetime': 'time.Time',
        'timestramp': 'int64',
        'enum': 'string',
        'set': 'string',
        'blob': 'string' 
    }
}