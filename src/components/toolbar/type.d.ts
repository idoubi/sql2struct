import { kv, Options } from "../../lib/type"

export declare interface ToolbarProps {
    languages: kv
    options?: Options
    optionOnChange?(any): void
}