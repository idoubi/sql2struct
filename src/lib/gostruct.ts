import { defaultFieldMaps } from "./option";
import { kv, GoStructField, GoStruct, SqlField, SqlTable } from "./type.d"
import { camelCase } from "./util";

// gen go struct code from sql table object
export const genGoStructCode = (sqlTable: SqlTable, tags: Array<string>): string | null => {
    const goSturct = toGoStruct(sqlTable, tags)
    if (!goSturct) {
        return null
    }

    let goStructCode = formatGoStruct(goSturct)
    if (!goStructCode) {
        return null
    }

    goStructCode += `\n\n// TableName 表名称\nfunc (*${goSturct.name}) TableName() string {
    return "${sqlTable.name}"        
}`
    return goStructCode
}

// get go struct field type from sql field type
export const getGoStructFieldType = (sqlFieldType: string): string | null => {
    const goStructFieldType = defaultFieldMaps[sqlFieldType as keyof kv]
    if (!goStructFieldType) {
        return null
    }

    return goStructFieldType
}

// transfer sql table to go struct
export const toGoStruct = (sqlTable: SqlTable, tags: Array<string>): GoStruct | null => {
    let fields: Array<GoStructField> = [];
    sqlTable.fields.map((sqlField: SqlField) => {
        let tagKv: kv = {}
        tags.forEach((tag) => {
            tagKv[tag] = sqlField.name
        })
        let field: GoStructField = {
            name: camelCase(sqlField.name),
            type: getGoStructFieldType(sqlField.type) as string,
            comment: sqlField.comment,
            tags: tagKv
        }
        fields.push(field)
    })

    let struct: GoStruct = {
        name: camelCase(sqlTable.name),
        fields: fields,
        comment: sqlTable.comment
    }

    return struct
}

// format go struct object to string
export const formatGoStruct = (struct: GoStruct): string => {
    let content = `// ${struct.name} ${struct.comment}\ntype ${struct.name} struct {`

    struct.fields.map((item) => {
        content += `\n\t${item.name} ${item.type}`

        if (item.tags && Object.keys(item.tags).length > 0) {
            content += ` \``
            let tagArr: Array<string> = []
            for (const k in item.tags) {
                const v = item.tags[k as keyof kv]
                tagArr.push(`${k}:"${v}"`)
            }
            content += `${tagArr.join(" ")}\``
        }

        if (item.comment) {
            content += ` // ${item.comment}`
        }
    })
    content += `
}`

    return content
}