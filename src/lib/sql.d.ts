export declare enum FieldType {

}

export declare interface Field {
    name: string
    type: string
    comment: string
    attributes?: string
}

export declare interface Table {
    name: string
    fields: Array<Field>
}