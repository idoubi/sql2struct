import { kv } from '../../core/type'

export declare interface ToolbarProps {
  languages: kv
  options?: kv
  optionValues?: string[]
  optionOnChange?: (value: string[]) => void
  buttons?: JSX.Element
}
