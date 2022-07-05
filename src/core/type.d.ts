// declare custom type: kv
export declare interface kv {
  [key: string]: string
}

// declare sql field
export declare interface SqlField {
  name: string
  type: string
  comment?: string
  attributes?: string
}

// declare sql table
export declare interface SqlTable {
  name: string
  fields: Array<SqlField>
  comment?: string
}

// declare go struct field
export declare interface GoStructField {
  name: string
  type: string
  comment?: string
  tags?: kv
}

// declare go struct
export declare interface GoStruct {
  name: string
  fields: Array<GoStructField>
  comment?: string
}
