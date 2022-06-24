import { kv } from "../../lib/type"

export declare interface ToolbarProps {
    languages: kv
    options?: kv
    optionValues?: Array<string>
    optionOnChange?: (value: any[]) => void
    buttons?: JSX.Element
}