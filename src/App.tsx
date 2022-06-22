import React, { useState } from 'react'
import Editor from "./components/editor/Editor"
import { PregTable } from './lib/sql2struct';
import './App.less';

export default () => {
  const [sqlCode] = useState(`create table test`)
  const [gostructCode, setGostructCode] = useState(`type Test struct`)

  const sqlCodeChange = (code: string) => {
    console.log('sql code is:', code)

    const table = PregTable(code)
    console.log('table', table)

    const gostructCode = code + ` transfer to go struct`
    setGostructCode(gostructCode)
  }

  return <div className="app">
    <div className="wrapper">
      <div className="header">header</div>
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