import { GoStruct, GoStructField, kv, SqlField, SqlTable } from './type'
import { camelCase } from './util'

// get go struct field type from sql field type
export const getGoStructFieldType = (sqlFieldType: string, fieldMaps: kv): string | null => {
  const goStructFieldType = fieldMaps[sqlFieldType]
  if (!goStructFieldType) {
    return null
  }

  return goStructFieldType
}

// transfer sql table to go struct
export const toGoStruct = (sqlTable: SqlTable, tags: Array<string>, specialIdentifiers: Array<string>, fieldMaps: kv): GoStruct | null => {
  const fields: Array<GoStructField> = []
  sqlTable.fields.forEach((sqlField: SqlField) => {
    const tagKv: kv = {}
    tags.forEach((tag) => {
      tagKv[tag] = sqlField.name
    })
    const field: GoStructField = {
      name: specialIdentifiers.includes(sqlField.name) ? sqlField.name.toUpperCase() : camelCase(sqlField.name),
      type: getGoStructFieldType(sqlField.type, fieldMaps) as string,
      comment: sqlField.comment,
      tags: tagKv,
    }
    fields.push(field)
  })

  const struct: GoStruct = {
    name: camelCase(sqlTable.name),
    fields,
    comment: sqlTable.comment,
  }

  return struct
}

// format go struct object to string
export const formatGoStruct = (struct: GoStruct): string => {
  let content = `// ${struct.name} ${struct.comment}\ntype ${struct.name} struct {`

  struct.fields.forEach((item) => {
    content += `\n\t${item.name} ${item.type}`

    if (item.tags && Object.keys(item.tags).length > 0) {
      content += ` \``
      const tagArr: Array<string> = []
      Object.keys(item.tags).forEach((key) => {
        const value = item.tags ? item.tags[key] : ''
        tagArr.push(`${key}:"${value}"`)
      })
      content += `${tagArr.join(' ')}\``
    }

    if (item.comment) {
      content += ` // ${item.comment}`
    }
  })
  content += `
}`

  return content
}

// gen go struct code from sql table object
export const genGoStructCode = (
  sqlTable: SqlTable,
  tags: Array<string>,
  specialIdentifiers: Array<string>,
  fieldMaps: kv
): string | null => {
  const goSturct = toGoStruct(sqlTable, tags, specialIdentifiers, fieldMaps)
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
