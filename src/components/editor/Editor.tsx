import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { EditorProps } from "./Editor.d"
import "./Editor.less"

export default (props: EditorProps) => {
    const { codeLanguage, code, onChange } = props
    console.log('code language', codeLanguage)

    return (
        <CodeMirror
            value={code}
            height="100%"
            extensions={[sql({})]}
            onChange={onChange}
        />
    );
}