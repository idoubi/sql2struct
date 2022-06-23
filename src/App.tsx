import React, { useState, useEffect } from 'react'
import fs from 'vite-plugin-fs/browser';
import Editor from "./components/editor/Editor"
import Toolbar from './components/toolbar/Toolbar';
import { pregSqlStatement } from './lib/sql';
import { genGoStructCode } from './lib/gostruct';
import { SqlTable } from './lib/type.d';
import { defaultGoStructOptions, defaultGoStructTags } from './lib/option';
import './App.less';

export default () => {
  const [sqlCode, setSqlCode] = useState(`paste sql statement from "show create table tabel_name\G"`)

  fs.readFile('src/demo.sql').then((content) => {
    setSqlCode(content)
  });

  const [sqlTable, setSqlTable] = useState({} as SqlTable)

  const [goStructCode, setGoStructCode] = useState(`type TableName struct`)

  const [goStructTags, setGoStructTags] = useState(defaultGoStructTags)


  // go struct option change handler
  const goStructOptionOnChange = (tags: any[]) => {
    setGoStructTags(tags)
  }

  // sql code change handler
  const sqlCodeOnChange = (code: string) => {
    setSqlCode(code)
  }

  // render go struct code
  const renderGoStructCode = () => {
    if (!sqlTable || !sqlTable.name || !sqlTable.fields) {
      setGoStructCode(`invalid sql`)
      return
    }
    const goStructCode = genGoStructCode(sqlTable, goStructTags)
    if (!goStructCode) {
      setGoStructCode(`gen go struct failed`)
      return
    }
    setGoStructCode(goStructCode)
  }

  // after go struct tags changed
  useEffect(() => {
    renderGoStructCode()
  }, [goStructTags])

  // after sql code changed
  useEffect(() => {
    const sqlTable = pregSqlStatement(sqlCode)
    if (!sqlTable) {
      setSqlTable(null)
      return
    }
    setSqlTable(sqlTable)
  }, [sqlCode])

  // after sql table changed
  useEffect(() => {
    renderGoStructCode()
  })

  return <div className="app">
    <div className="wrapper">
      <div className="header">
        <h1>SQL2Struct</h1>
      </div>
      <div className="main">
        <div className="sqlarea">
          <Toolbar languages={{ "sql": "SQL" }} />
          <Editor codeLanguage='sql' code={sqlCode} onChange={sqlCodeOnChange} />
        </div>
        <div className="structarea">
          <Toolbar languages={{ "go": "Go Struct" }} options={defaultGoStructOptions} optionValues={goStructTags} optionOnChange={goStructOptionOnChange} />
          <Editor codeLanguage='go' code={goStructCode} />
        </div>
      </div>
    </div>
  </div>
}