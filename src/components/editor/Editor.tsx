import { rust } from '@codemirror/lang-rust'
import { sql } from '@codemirror/lang-sql'
import { eclipse } from '@uiw/codemirror-theme-eclipse'
import CodeMirror from '@uiw/react-codemirror'
import './Editor.less'
import { EditorProps } from './type.d'

export default (props: EditorProps) => {
  const { codeLanguage, code, placeholder, onChange } = props

  return (
    <div className="editor">
      <CodeMirror
        value={code}
        height="100%"
        theme={eclipse}
        placeholder={placeholder}
        extensions={codeLanguage === 'sql' ? [sql({})] : [rust()]}
        onChange={onChange}
      />
    </div>
  )
}
