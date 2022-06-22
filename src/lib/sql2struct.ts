import { Field, Table } from './sql'

export const PregTable = (sql: string): Table | null => {
    const tableName = PregTableName(sql)
    if (!tableName) {
        return null
    }

    const tableFields = PregTableFields(sql)
    if (!tableFields) {
        return null
    }

    const table: Table = {
        name: tableName,
        fields: tableFields
    }

    return table
}

export const PregTableName = (sql: string): string | null => {
    const reg = /CREATE\s+TABLE\s+\`(.+)\`/gi
    const res = reg.exec(sql)

    if (!res || res.length < 2) {
        return null
    }

    return res[1]
}

export const PregTableFields = (sql: string): Array<Field> | null => {
    const reg = /\`(.+)\`\s+(tinyint|smallint|int|mediumint|bigint|float|double|decimal|varchar|char|text|mediumtext|longtext|datetime|time|date|enum|set|blob|timestamp){1}(.*)/gi
    const res = reg.exec(sql)

    if (!res) {
        return null
    }

    console.log(res)

    return []
}