import React, { useState } from 'react'
import Editor from "./components/editor/Editor"
import { pregSqlStatement } from './lib/sql';
import './App.less';
import { genGoStructCode } from './lib/gostruct';
import { Options, SqlTable } from './lib/type.d';
import Toolbar from './components/toolbar/Toolbar';

export default () => {
  let [goStructOpts, setGoStructOpts] = useState({
    "json": true,
    "xml": false,
    "gorm": false,
    "xorm": false,
    "mapstructure": false
  } as Options)

  const goStructOptionOnChange = (e: any) => {
    console.log(e.target.value, e.currentTarget.checked)
    const key: string = e.target.value
    const value: boolean = e.currentTarget.checked

    let newOpts = goStructOpts
    newOpts[key] = value
    console.log(newOpts)
    setGoStructOpts(newOpts)
  }

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
          <Toolbar languages={{ "sql": "SQL" }} />
          <Editor codeLanguage='sql' code={sqlCode} onChange={sqlCodeChange} />
        </div>
        <div className="structarea">
          <Toolbar languages={{ "go": "Go Struct" }} options={goStructOpts} optionOnChange={goStructOptionOnChange} />
          <Editor codeLanguage='go' code={gostructCode} />
        </div>
      </div>
    </div>
  </div>
}