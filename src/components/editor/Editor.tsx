import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { rust } from '@codemirror/lang-rust';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { EditorProps } from "./type.d"
import "./Editor.less"

export default (props: EditorProps) => {
    const { codeLanguage, code, onChange } = props

    return (
        <div className="editor">
            <CodeMirror
                value={code}
                height="100%"
                theme={eclipse}
                extensions={codeLanguage == 'sql' ? [sql({})] : [rust()]}
                onChange={onChange}
            />
        </div>
    );
}