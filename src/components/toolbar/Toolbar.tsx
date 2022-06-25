import { CheckboxGroup } from '@douyinfe/semi-ui'
import { ReactNode } from 'react'
import './Toolbar.less'
import { ToolbarProps } from './type.d'

export default (props: ToolbarProps) => {
  const { languages, options, optionValues, optionOnChange, buttons } = props

  const checkboxOptions: any[] = []
  if (options) {
    Object.keys(options).forEach((key) => {
      checkboxOptions.push({
        label: key,
        value: key,
      })
    })
  }

  return (
    <div className="toolbar">
      <div className="languages">
        <select name="language" id="">
          {Object.keys(languages).map((key): ReactNode => {
            return (
              <option value="{key}" key={key}>
                {languages[key]}
              </option>
            )
          })}
        </select>
      </div>
      <div className="options">
        <CheckboxGroup direction="horizontal" options={checkboxOptions} value={optionValues} onChange={optionOnChange} />
      </div>
      <div className="buttons">{buttons}</div>
    </div>
  )
}
