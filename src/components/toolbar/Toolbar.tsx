import { ReactNode } from "react"
import { ToolbarProps } from "./type.d"
import { CheckboxGroup, Button } from '@douyinfe/semi-ui';
import "./Toolbar.less"

export default (props: ToolbarProps) => {
    const { languages, options, optionValues, optionOnChange, buttons } = props

    let checkboxOptions: any[] = []
    if (options) {
        Object.keys(options as Object).map((key) => {
            checkboxOptions.push({
                label: key,
                value: key
            })
        })
    }

    return (
        <div className="toolbar">
            <div className="languages">
                <select name="language" id="">
                    {Object.keys(languages as Object).map((key): ReactNode => {
                        return <option value="{key}" key={key}>{languages[key]}</option>
                    })}
                </select>
            </div>
            <div className="options">
                <CheckboxGroup direction='horizontal' options={checkboxOptions} value={optionValues} onChange={optionOnChange} />
            </div>
            <div className="buttons">
                {buttons}
            </div>
        </div >
    )
}