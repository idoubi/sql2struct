import { SqlField, SqlTable } from './type'

// preg match table name from sql statement
export const pregTableName = (sql: string): string | null => {
  const reg = /create\s+table\s+`(.+)`/gi
  const res = reg.exec(sql)

  if (!res || res.length < 2) {
    return null
  }

  return res[1]
}

// preg mat table comment from sql statement
export const pregTableComment = (sql: string): string | null => {
  const reg = /\)\s*[engine|charset]?.*comment\s*=\s*'(.*)'/gi
  const res = reg.exec(sql)

  if (!res || res.length < 2) {
    return null
  }

  return res[1]
}

// preg match table fields from sql statement
export const pregTableFields = (sql: string): Array<SqlField> | null => {
  const reg =
    /`(.+)`\s+(tinyint|smallint|int|mediumint|bigint|float|double|decimal|varchar|char|tinytext|text|mediumtext|longtext|datetime|time|date|enum|set|blob|timestamp){1}(.*)/gi
  const res = sql.matchAll(reg)

  if (!res) {
    return null
  }

  const fields: Array<SqlField> = []

  for (const item of res) {
    if (item && item.length >= 4) {
      const field: SqlField = {
        name: item[1],
        type: item[2],
        attributes: item[3],
      }

      const comment = /comment\s+'(.*)'/i.exec(item[3])
      if (comment && comment.length > 1) {
        ;[, field.comment] = comment
      }

      fields.push(field)
    }
  }

  return fields
}

// preg match sql statement to get sql table
export const pregSqlStatement = (sql: string): SqlTable | null => {
  const tableName = pregTableName(sql)
  if (!tableName) {
    return null
  }

  const tableFields = pregTableFields(sql)
  if (!tableFields) {
    return null
  }

  const table: SqlTable = {
    name: tableName,
    fields: tableFields,
  }

  const tableComment = pregTableComment(sql)
  if (tableComment) {
    table.comment = tableComment
  }

  return table
}
