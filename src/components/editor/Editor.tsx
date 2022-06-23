import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { EditorProps } from "./type.d"
import "./Editor.less"

export default (props: EditorProps) => {
    const { codeLanguage, code, onChange } = props

    return (
        <div className="editor">
            <CodeMirror
                value={code}
                height="100%"
                extensions={[sql({})]}
                onChange={onChange}
            />
        </div>
    );
}