import { ReactNode } from "react"
import { ToolbarProps } from "./type.d"

export default (props: ToolbarProps) => {
    let { languages, options, optionOnChange } = props

    if (!options) {
        options = {}
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
                {Object.keys(options as Object).map((key): ReactNode => {
                    <label htmlFor="">options: </label>
                    let checked: boolean = false
                    if (options && options[key]) {
                        checked = true
                    }

                    console.log(11, key, checked)

                    return <span key={key}>
                        <input type="checkbox" value={key} onChange={optionOnChange} checked={checked} />
                        <label>{key}</label>
                    </span>
                })}
            </div>
        </div >
    )
}