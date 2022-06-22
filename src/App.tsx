import React, { useState } from 'react'
import Editor from "./components/editor/Editor"
import { pregSqlStatement } from './lib/sql';
import './App.less';
import { genGoStructCode } from './lib/gostruct';
import { SqlTable } from './lib/type.d';

export default () => {
  const demoSql = `paste sql statement from "show create table tabel_name"`

  const [sqlCode] = useState(demoSql)
  const [gostructCode, setGostructCode] = useState(`type TableName struct`)

  const sqlCodeChange = (code: string) => {
    console.log('sql code is:', code)

    const sqlTable = pregSqlStatement(code)
    if (!sqlTable) {
      setGostructCode(`invalid sql`);
      return
    }

    const goStructCode = genGoStructCode(sqlTable as SqlTable)
    if (!goStructCode) {
      setGostructCode(`gen go struct failed`)
      return
    }

    setGostructCode(goStructCode)
  }

  return <div className="app">
    <div className="wrapper">
      <div className="header">
        <h1>SQL2Struct</h1>
      </div>
      <div className="main">
        <div className="sqlarea">
          <Editor codeLanguage='sql' code={sqlCode} onChange={sqlCodeChange} />
        </div>
        <div className="structarea">
          <Editor codeLanguage='go' code={gostructCode} />
        </div>
      </div>
    </div>
  </div>
}